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

/** Deliberately meaningless, so no browser can match it to a stored value.
 *
 *  It used to be `company_website`, with a matching "Company website" label.
 *  On 19 Nov 2026 Chrome matched that to its organization field and autofilled
 *  "OCPS" for a real customer in Groveland, who was then blocked and never
 *  reached Tyler. He had spent five and a half minutes writing the message.
 *  `autoComplete="off"` was already set and Chrome ignored it, which it is
 *  entitled to do. A name that resembles no real field cannot be autofilled.
 *
 *  Bots do not need a plausible name to take the bait. They fill every input
 *  they find, which is the whole premise. */
export const HONEYPOT_NAME = 'hp_check_7f21'

/** The previous name, still rejected server-side. A page cached in someone's
 *  browser before this change posts the old key, and until those expire a bot
 *  on a stale page would otherwise sail through. Humans are safe from it now:
 *  nothing renders a field by this name any more, so only a bot scraping an
 *  old cached form can populate it. */
export const LEGACY_HONEYPOT_NAME = 'company_website'

/** Elapsed-time floor. A human filling even the shortest of these forms takes
 *  longer than this, so false positives are negligible. */
export const MIN_FILL_MS = 2500

/** Returns a reason string when the submission looks automated, else null.
 *  Call this before validation and before any send. */
export function spamReason(data: Record<string, unknown>): string | null {
  const honeypot = String(data[HONEYPOT_NAME] ?? '').trim()
  if (honeypot) return 'honeypot'
  const legacy = String(data[LEGACY_HONEYPOT_NAME] ?? '').trim()
  if (legacy) return 'honeypot_legacy'

  // Only judge timing when the client actually reported it. An older cached
  // page, or a submission that arrives without the field, must not be blocked
  // for it — that would silently drop real leads.
  const elapsed = Number(data._elapsedMs ?? 0)
  if (elapsed > 0 && elapsed < MIN_FILL_MS) return 'too_fast'

  // Layer 3, added 2026-11-10. Three submissions cleared the honeypot and the
  // timer between 29 Oct and 10 Nov and were filed as real leads, one of them
  // tagged Site Services, which is the service we are trying to prove demand
  // for. They are matched on the message body alone, because that is where
  // these two kinds give themselves away past any doubt. Every other field
  // they got right.
  //
  // Deliberately narrow. A missed spam costs Tyler ten seconds; a blocked
  // customer costs him a job. Anything caught here still copies to the
  // tracking alias, so a false positive is visible rather than silent.
  const message = String(data.message ?? '').trim()

  // A bot filling a date picker into the free-text box. Two arrived this way,
  // one of them dated in the future. No customer sends only a date.
  if (message && /^[0-9]{1,4}[-/][0-9]{1,2}[-/][0-9]{1,4}$/.test(message)) {
    return 'date_only_message'
  }

  // The property is in Florida. It is the only place this company works, and
  // the field asks for the PROPERTY's zip, so an out-of-state one is wrong
  // even when the person sending it lives elsewhere.
  //
  // This is the rule that actually holds. On 19 Nov 2026 the same sender that
  // got through on 29 Oct came back having reworded every phrase below, but
  // kept zip 91360 (Thousand Oaks, CA) and the same phone. Paraphrase beats
  // phrase matching; it does not move a property.
  //
  // Only applied to a bare five-digit number. The field accepts "Town or zip
  // code" and real people use it: "New Smyrna Beach" and
  // "119 Lake Winnemissett Dr., DeLand, FL 32724" both arrived as real leads
  // and neither is touched by this.
  const zip = String(data.propertyLocation ?? '').trim()
  if (/^\d{5}$/.test(zip)) {
    const n = Number(zip)
    // Florida is 32003-34997. Anything else is not a property he can work.
    if (n < 32003 || n > 34997) return 'out_of_area_zip'
  }

  // Agencies pitching SEO and web design through the contact form. Matched on
  // claims about the RECIPIENT's own search ranking, which a customer asking
  // about their land has no reason to write. Kept as a second net; the zip
  // rule above is the one that survives rewording.
  const pitch = [
    /\b(seo|search engine optimi[sz]ation)\b/i,
    /your (business|site|website|company) (should|could|will|can) (show up|rank|appear)/i,
    /(first page|top of|page one|rank(ing)? higher) (of|on|in) google/i,
    /\b(we can make that happen|want to see how easy|boost your (traffic|ranking))\b/i,
    /\b(digital marketing|web design) (services|agency|company)\b/i,
    /(show(ing)? up first|rank(ing)? first) (when|whenever|if) (someone|people|customers)/i,
    /\b(launch|run) (your )?campaigns?\b/i,
    /\bthat('s| is) what we (make happen|do)\b/i,
  ]
  if (message && pitch.some((re) => re.test(message))) return 'solicitation'

  return null
}
