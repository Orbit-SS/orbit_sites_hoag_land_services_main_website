// Copy blocked form submissions to the lead-tracking alias.
//
// The anti-spam layer rejects junk before any notification is sent, which is
// correct for the client but leaves a blind spot: if the honeypot or the timing
// floor ever catches a real person, nobody finds out. This mails what was
// blocked, and why, to the tracking inbox only — never to the client.
//
// Env:
//   SPAM_NOTIFY_EMAIL   where blocked submissions go. Comma-separated.
//                       Unset = feature off, nothing is sent.
//   SPAM_NOTIFY_MAX_PER_HOUR  default 12; see the cap below.

import { sendFormEmail, esc } from './form-email'

/**
 * Blocked submissions are, by definition, mostly bots — and a bot run is a
 * flood, not a trickle. Without a cap a single afternoon could burn the whole
 * Resend monthly quota on junk and take the real lead notifications down with
 * it. The cap keeps the audit signal (you still see that blocking is
 * happening, and a sample of what) while bounding the cost.
 *
 * In-memory, therefore per serverless instance and reset by cold starts. That
 * is deliberate: this is a spend guard, not an accounting system.
 */
const recentNotices: number[] = []

function underRateCap(): boolean {
  const max = Number(process.env.SPAM_NOTIFY_MAX_PER_HOUR || 12)
  const now = Date.now()
  const hourAgo = now - 60 * 60 * 1000
  while (recentNotices.length && recentNotices[0] < hourAgo) recentNotices.shift()
  if (recentNotices.length >= max) return false
  recentNotices.push(now)
  return true
}

export function getSpamNoticeRecipients(): string[] {
  return (process.env.SPAM_NOTIFY_EMAIL ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

/**
 * Best-effort: the caller ignores the result. A failure here must never change
 * what the form returns, or a bot could tell the trap fired.
 */
export async function notifyBlockedSubmission(opts: {
  /** 'honeypot' | 'too_fast' */
  reason: string
  /** Which form, e.g. 'Estimate Request'. */
  formName: string
  /** The raw submitted payload. */
  payload: Record<string, unknown>
}): Promise<void> {
  const to = getSpamNoticeRecipients()
  if (!to.length) return
  if (!underRateCap()) return

  const why =
    opts.reason === 'honeypot'
      ? 'Filled the hidden honeypot field, which is invisible to real users.'
      : opts.reason === 'too_fast'
        ? 'Submitted in under 2.5 seconds — faster than a person can type the fields.'
        : opts.reason

  // Dump every field as submitted. Reviewing these is the whole point, so
  // nothing is filtered out — including the trap fields themselves.
  const entries = Object.entries(opts.payload).map(
    ([k, v]) => [k, String(v ?? '')] as [string, string],
  )

  const rows = entries
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 14px 6px 0;font-family:monospace;font-size:12px;color:#8a948a;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:6px 0;font-family:monospace;font-size:12px;color:#2b332b;vertical-align:top;white-space:pre-wrap">${esc(v) || '<em style="color:#b9c0b9">(empty)</em>'}</td></tr>`,
    )
    .join('')

  const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:640px">
  <div style="background:#7a2e2e;color:#fff;padding:16px 20px">
    <div style="font-size:11px;letter-spacing:.11em;text-transform:uppercase;opacity:.8">Blocked before sending &middot; hlsdeland.com</div>
    <div style="font-size:19px;font-weight:700;padding-top:4px">${esc(opts.formName)} &mdash; ${esc(opts.reason)}</div>
  </div>
  <div style="background:#fdf6f6;border:1px solid #f0dede;border-top:none;padding:14px 20px">
    <p style="margin:0;font-size:14px;color:#5a3232">${esc(why)}</p>
    <p style="margin:8px 0 0;font-size:13px;color:#8a6a6a">The client was <strong>not</strong> emailed. If this looks like a real person, that is a false positive worth acting on.</p>
  </div>
  <div style="background:#fff;border:1px solid #eceee9;border-top:none;padding:16px 20px">
    <table style="border-collapse:collapse;width:100%">${rows}</table>
  </div>
</div>`

  const text = [
    `BLOCKED SUBMISSION — ${opts.formName} (${opts.reason})`,
    'hlsdeland.com',
    '',
    why,
    'The client was NOT emailed. If this looks like a real person, it is a false positive.',
    '',
    ...entries.map(([k, v]) => `${k}: ${v || '(empty)'}`),
  ].join('\n')

  try {
    await sendFormEmail({
      to,
      subject: `[Blocked: ${opts.reason}] ${opts.formName} — hlsdeland.com`,
      html,
      text,
    })
  } catch {
    // Swallowed on purpose — see the doc comment.
  }
}
