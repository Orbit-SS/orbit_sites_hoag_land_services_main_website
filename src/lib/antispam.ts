// Invisible anti-spam for every public form. Standing Service Storm
// requirement; first shipped on welightkc 2026-07-27, ported here 2026-09-07.
//
// Two layers, neither of which a real user can see or interact with:
//
//   1. A honeypot field, hidden off-screen. Bots fill every field they find;
//      humans never fill this one.
//   2. A submit-timing trap. Bots post near-instantly; a human cannot type a
//      name and a phone number in under 2.5 seconds.
//
// Both run server-side BEFORE any email is sent, so junk never reaches Tyler
// and never burns a Resend send. Blocked submissions get a 200 so a bot cannot
// learn which layer caught it, and are logged so we can confirm the trap works.
//
// Deliberately NOT a friction CAPTCHA. Image puzzles cost real conversions on
// a lead form. If spam persists, escalate to Cloudflare Turnstile, which is
// also invisible to nearly every real user.

/** Plausible-looking name so bots take the bait. autoComplete="off" on the
 *  input keeps browser autofill from filling it for a real user. */
export const HONEYPOT_NAME = 'company_website'

/** Elapsed-time floor. A human filling even the shortest of these forms takes
 *  longer than this, so false positives are negligible. */
export const MIN_FILL_MS = 2500

/** Returns a reason string when the submission looks automated, else null.
 *  Call this before validation and before any send. */
export function spamReason(data: Record<string, unknown>): string | null {
  const honeypot = String(data[HONEYPOT_NAME] ?? '').trim()
  if (honeypot) return 'honeypot'

  // Only judge timing when the client actually reported it. An older cached
  // page, or a submission that arrives without the field, must not be blocked
  // for it — that would silently drop real leads.
  const elapsed = Number(data._elapsedMs ?? 0)
  if (elapsed > 0 && elapsed < MIN_FILL_MS) return 'too_fast'

  return null
}
