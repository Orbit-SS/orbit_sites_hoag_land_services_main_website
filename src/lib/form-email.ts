// Form-notification email via Resend.
//
// Both public form routes (/api/contact, /api/join) send through here so the
// transport, the sender identity and the failure behavior live in one place.
// The routes keep their own branded HTML — this only carries it.
//
// Replaces the previous Brevo integration, which sent from
// leads@servicestorm.io: a Service Storm address on every lead Tyler received.
// Mail now comes from the client's own domain, matching the other sites.
//
// Env (set on Vercel — Production + Preview):
//   RESEND_API_KEY      re_… from the shared Service Storm Resend account
//   FORM_FROM_EMAIL     "From:" shown to the recipient. Must be on a domain
//                       verified in Resend or the send is rejected outright.
//   FORM_NOTIFY_EMAIL   where leads land. Defaults to Tyler.
//   LEAD_TRACKING_EMAIL Service Storm's lead-tracking recipients, added to the
//                       To line. Comma-separated. See getLeadTrackingRecipients.
//   CONTACT_CC_EMAIL    legacy agency copy, kept for compatibility. Prefer
//                       LEAD_TRACKING_EMAIL; set this empty to disable.
//   FORM_NOTIFY_OVERRIDE  test escape hatch — see below.

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

const DEFAULT_NOTIFY = 'tyler@hlsdeland.com'

// Until send.hlsdeland.com is verified, Resend's sandbox sender is the only
// address that works, and it can ONLY deliver to addresses verified on the
// Resend account. Deploying without FORM_FROM_EMAIL set therefore degrades
// loudly (a 502 the route reports) rather than silently dropping leads.
const SANDBOX_FROM = 'Hoag Land Services <onboarding@resend.dev>'

export type FormEmailResult =
  | { ok: true }
  | { ok: false; status: number; error: string }

/**
 * Resolve the notification recipient at request time.
 *
 * FORM_NOTIFY_OVERRIDE reroutes every submission away from Tyler to an address
 * we control. This exists because the previous stack had no such guard: running
 * the form locally emailed the live client. Set it before testing, delete it
 * after, and delivery falls back to Tyler automatically.
 */
export function getNotifyRecipients(): string[] {
  const override = process.env.FORM_NOTIFY_OVERRIDE?.trim()
  const raw = override || process.env.FORM_NOTIFY_EMAIL?.trim() || DEFAULT_NOTIFY
  const client = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)

  // While testing, the override means exactly one recipient and nothing else.
  if (override) return client

  return [...client, ...getLeadTrackingRecipients(client)]
}

/**
 * Service Storm's per-client lead-tracking recipients, matching the pattern
 * AXE Engineering, Cooler Door Parts, WeLightKC and Precision CNC already use.
 *
 * These go on the **To** line beside the client, not in CC. That difference is
 * why Hoag's leads stopped reaching Orbit: Orbit only ingests from its own
 * seven mailboxes, and until 27 Oct 2026 no Hoag lead carried one of them
 * anywhere on the message. Tyler kept getting his leads the whole time; we
 * simply had no copy, and the client record showed nothing after 30 Sep.
 *
 * Comma-separated. Unset = nothing added, same as the other sites.
 */
export function getLeadTrackingRecipients(exclude: string[] = []): string[] {
  const seen = new Set(exclude.map((s) => s.toLowerCase()))
  return (process.env.LEAD_TRACKING_EMAIL ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter((s) => {
      if (!s || seen.has(s.toLowerCase())) return false
      seen.add(s.toLowerCase())
      return true
    })
}

/**
 * Agency copy. Carried over from the Brevo implementation (commit 16d2a39):
 * leads also go to Service Storm so one is not lost if the client mailbox
 * misses it. `?? ` not `|| ` — setting CONTACT_CC_EMAIL to an empty string is
 * how you deliberately turn the copy off.
 *
 * Suppressed while FORM_NOTIFY_OVERRIDE is set, so a test send goes to exactly
 * one place rather than quietly copying the agency inbox as well.
 */
export function getCcRecipients(primary: string[]): string[] {
  if (process.env.FORM_NOTIFY_OVERRIDE?.trim()) return []
  const cc = process.env.CONTACT_CC_EMAIL ?? 'spencer@servicestorm.io'
  const seen = new Set(primary.map((s) => s.toLowerCase()))
  return cc
    .split(',')
    .map((s) => s.trim())
    .filter((s) => {
      // An address already on the To line must not be repeated in CC. Before
      // 27 Oct 2026 the tracking alias lived here alone, so this now dedupes
      // against it rather than sending twice during the changeover.
      if (!s || seen.has(s.toLowerCase())) return false
      seen.add(s.toLowerCase())
      return true
    })
}

export function fromAddress(): string {
  return process.env.FORM_FROM_EMAIL?.trim() || SANDBOX_FROM
}

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY)
}

export async function sendFormEmail(opts: {
  subject: string
  html: string
  /** Plain-text alternative. Without it, spam filters score the mail worse. */
  text: string
  /** Submitter's address, so a reply from Tyler reaches the customer. */
  replyTo?: string
  /** Recipient override. Used by the blocked-submission notice, which goes to
   *  the tracking alias only — never to the client. */
  to?: string[]
}): Promise<FormEmailResult> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { ok: false, status: 0, error: 'RESEND_API_KEY not set' }

  const to = opts.to ?? getNotifyRecipients()
  const cc = opts.to ? [] : getCcRecipients(to)

  const body: Record<string, unknown> = {
    from: fromAddress(),
    to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
  }
  if (cc.length) body.cc = cc
  if (opts.replyTo) body.reply_to = opts.replyTo

  let res: Response
  try {
    res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  } catch (e) {
    return { ok: false, status: 0, error: `network: ${String(e)}` }
  }

  if (res.status >= 200 && res.status < 300) return { ok: true }

  let detail = ''
  try {
    detail = JSON.stringify(await res.json())
  } catch {
    detail = await res.text().catch(() => '')
  }
  return { ok: false, status: res.status, error: detail.slice(0, 500) }
}

/** Escape user input before it goes into the HTML email body. */
export function esc(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
