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

/** Domains that have pitched a Service Storm client through a public form.
 *
 *  A sender rewords a message for free. Moving off the domain their own
 *  business runs on costs them something, and when they do move we add the new
 *  one here. Shared across every client site on purpose: these outfits work
 *  down a list. Trusted Virtual Team hit axeengineering.com five times between
 *  September and November 2026 and wewashkc.com once on 19 Nov. */
export const SOLICITOR_DOMAINS = [
  'automaxrevenue.com',
  'jmailservice.com',
  'trustedvirtualteam.com',
  'virtualteamexpert.com',
  'vasdirect.com',
  'vas4hire.com',
  'localcustomers.ai',
  'melottogroup.com',
  'measuredbid.com',
  'christmaslightsupplier.com',
  'ranksindia.com',
  'snplastics.com',
  'dinglin-tech.com',
  'anderson-columbia.org',
  'cienormend.com',
  'enapter-srl.com',
]

/** Each entry is a different thing a sales pitch has to DO, not a phrase it
 *  happens to use. That is the whole point.
 *
 *  Phrase matching has now lost twice. On 10 Nov 2026 I blocked an agency on
 *  its wording; on 19 Nov the same sender returned with every phrase reworded.
 *  On 20 Nov Ian Crawford of automaxrevenue.com reached Tyler with a pitch
 *  containing no ranking claim, no mention of SEO, and no property location at
 *  all, so nothing we had could see it.
 *
 *  A pitch cannot drop these and still be a pitch. It must name itself as a
 *  supplier, it must talk about the recipient's business rather than a piece
 *  of land, it must state terms, and it must ask for the next step. A customer
 *  asking about their trees does none of it. */
const PITCH_SIGNALS: [string, RegExp][] = [
  // "My team and I help a handful of tree service companies..."
  ['offers_service_to_businesses',
   /\b(i|we|my team|our team|our company)\b[^.!?]{0,40}\b(help|helps|helped|work with|partner with|specialis[ez]e in|specialit?z?e in)\b[^.!?]{0,70}\b(business(es)?|compan(y|ies)|contractors?|owners?|clients?|services|pros)\b/i],

  // Talks about the RECIPIENT's business as something to be improved.
  //
  // "calendar" and "schedule" were in this list and came straight back out: a
  // real customer wrote "can I get on your schedule for about an acre?" and
  // scored a point for it. Same for "reviews", "availability", "advice" and
  // "crew", which were never in it. The words left are ones a person hiring a
  // land clearing company has no reason to use.
  ['about_their_business',
   /\byour (business|company|pipeline|revenue|sales|marketing|online presence|brand|goals|offer)\b/i],

  // Commercial terms the sender is offering TO the recipient.
  //
  // A bare "per month" was in here and came out: "what would you charge per
  // month to keep the back five acres bush hogged?" is a real recurring job,
  // and that is the kind of enquiry this site exists to collect.
  ['states_terms',
   /\b(retainers?|no results,? no charge|you only pay|pay only when|commission[- ]based|free trial|no upfront|risk[- ]free)\b|\$\s?\d[\d,]*\s?k\s?[-\u2013]\s?\$?\d/i],

  // Selling leads, bookings or answering services.
  ['sells_leads_or_bookings',
   /\b(qualified (leads?|homeowners?|customers?|prospects?)|book(ed|ing)?\s+(more\s+)?(jobs?|appointments?|calls?)|fill (your|their) (schedule|calendar)|appointment setting|24\/7 receptionist|virtual assistant|chasing leads|endless follow[- ]ups?|leads? slip)\b/i],

  // Asks for the next step, which an estimate request never does.
  ['asks_for_a_meeting',
   /\b(open to (chat|chatting|a (quick )?call)|hop on a call|book a (quick )?call|15[- ]?minute|can i send (it|this|that) over|quick (intro )?video|calendly\.com|let me know if you'?re interested|if you'?re interested or not|would love to hear what your goals)\b/i],
]

/** Returns the names of every pitch signal present in the message. */
export function pitchSignals(message: string): string[] {
  const text = String(message ?? '')
  if (!text.trim()) return []
  return PITCH_SIGNALS.filter(([, re]) => re.test(text)).map(([name]) => name)
}

/** Two signals is a pitch.
 *
 *  Every real submission in scripts/check-antispam.mjs scores zero, including
 *  the ones that mention Google, reviews, and the customer's own company. One
 *  signal on its own is left alone, because a single phrase is exactly what a
 *  sender can reword, and a blocked customer costs Tyler a job. */
export const PITCH_THRESHOLD = 2

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

  // Layer 4, added 20 Nov 2026 after Ian Crawford of automaxrevenue.com
  // reached Tyler with a pitch that none of the rules above could see.
  const email = String(data.email ?? '').trim().toLowerCase()
  const at = email.lastIndexOf('@')
  if (at > -1) {
    const domain = email.slice(at + 1)
    if (SOLICITOR_DOMAINS.some((d) => domain === d || domain.endsWith('.' + d))) {
      return 'solicitor_domain'
    }
  }

  if (message && pitchSignals(message).length >= PITCH_THRESHOLD) {
    return 'solicitation_pitch'
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
