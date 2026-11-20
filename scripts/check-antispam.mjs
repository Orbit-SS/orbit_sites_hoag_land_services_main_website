// Every submission below actually arrived on hlsdeland.com. The spam ones all
// cleared the honeypot and the timing trap; the real ones are customers who
// must never be blocked. Run after touching src/lib/antispam.ts:
//
//     npx tsx scripts/check-antispam.mjs
//
// Each row is [who, message, propertyLocation].
import { spamReason, pitchSignals, PITCH_THRESHOLD, HONEYPOT_NAME, LEGACY_HONEYPOT_NAME } from '../src/lib/antispam.ts'

const SPAM = [
  ['Joseph Matthews (29 Oct)',
   'If customers are searching for what you offer, your business should show up first. We can make that happen within a day.\nWant to see how easy it is?',
   '91360'],
  ['Megan Draper (31 Oct)', '2026-11-03', '100 SE 2nd St'],
  ['Kayla Osborne (10 Nov)', '2026-11-13', '100 SE 2nd St'],
  // Same sender as 29 Oct. Same zip, same phone, same throwaway domain, and
  // every phrase the old rules matched on has been reworded. This is why the
  // zip rule exists: paraphrase beats phrase matching, it does not move a
  // property from California to Florida.
  ['Marcus Palmer (19 Nov)',
   "Imagine showing up first whenever someone searches for your product or service - that's what we make happen. We launch campaigns in less than 24 hours, and you only pay for results.",
   '91360'],
  // Reached Tyler's inbox on 20 Nov 2026 at 20:15. Cleared the honeypot, the
  // timer, the date rule, the zip rule (he left the property blank) and every
  // phrase in the SEO net, because he never mentions ranking or SEO at all.
  // This is a competitor selling lead generation to our own client.
  ['Ian Crawford (20 Nov, automaxrevenue.com)',
   `Hey,

Hope things are going well. I had a look at Hoag Land Services and I've gotta say, your work looks amazing. You're clearly doing top-tier work in your area.

My team and I help a handful of tree service companies and other home service businesses bring in qualified homeowners who need a tree removed or trimmed and are ready to book, without the usual hassle of chasing leads or endless follow-ups.

We also set up a 24/7 receptionist, so all the jobs we get you are qualified and zero leads slip through your business.

We don't charge retainers. You only pay when we actually get someone booked onto your calendar for a consultation \u2014 no results, no charge.

And no \u2014 this isn't some mass-blasted message. I recorded a quick 3-minute video for you to introduce myself and show how this works in plain English. Can I send it over?

We've already helped other tree services consistently fill their schedules and automate the whole business, so all they have to do is show up and do the job \u2014 some pulling in $20k\u201350k+ extra per month from the appointments we set.

If you're open to chatting, I'd love to hear what your goals are and see if this would be a fit.

Best regards,
Ian`,
   ''],
]

const REAL = [
  ['Ani, Salt Springs', 'Neighbor’s oak overhanging my house. Would like an estimate please? Text is best, thank you :)', '32134'],
  ['Angela Jenkins', 'We are looking to remove a large tree, clear a berm', 'New Smyrna Beach'],
  ['Ranata Pauyo (hero form default)', 'Estimate request from the Ocoee, FL - Tree Services hero page.', '34761'],
  ['Amy Condon (11 Nov, full address in the zip field)', '2.5 acres with matures oaks, one of which recently spontaneously dropped a branch. Would like that tree and others assessed.', '119 Lake Winnemissett Dr., DeLand, FL 32724'],
  ['Sophia (12 Nov, hero form)', 'Estimate request from the Lake Helen, FL - Tree Services hero page.', '32744'],
  ['empty message', '', '32720'],
  ['acreage reply', 'I have about 4 acres off Grand Ave that needs clearing and a pad for a barn.', '32130'],
  ['mentions google reviews', 'Found you on google, saw your reviews. Need a stump ground out.', '32763'],
  ['no zip given at all', 'Need a quote for clearing half an acre.', ''],
  ['edge of the Florida range', 'Palm trimming please.', '34997'],
  ['real customer who mentions their own company', 'We are a property management company and need ongoing tree work across four of our properties. What does your availability look like?', '32763'],
  ['real customer praising the crew', 'Your crew did my neighbour’s lot last month and the work looks great. Can I get on your schedule for about an acre?', '32130'],
  ['real customer asking about price', 'What would you charge per month to keep the back five acres bush hogged?', '32720'],
]

let bad = 0
console.log('SPAM  (want: blocked)')
for (const [who, message, propertyLocation] of SPAM) {
  const r = spamReason({ message, propertyLocation })
  if (!r) bad++
  console.log(`  ${r ? 'BLOCKED ' + r : '*** LET THROUGH ***'}   ${who}`)
}
console.log('\nREAL  (want: allowed)')
for (const [who, message, propertyLocation] of REAL) {
  const r = spamReason({ message, propertyLocation })
  if (r) bad++
  console.log(`  ${r ? '*** FALSE POSITIVE: ' + r + ' ***' : 'allowed'}   ${who}`)
}
// The honeypot itself. A real customer in Groveland was blocked on 19 Nov 2026
// because Chrome autofilled his employer, "OCPS", into a field named
// company_website. The name is now meaningless so nothing can be matched to
// it, but bots must still be caught by either key.
console.log('\nHONEYPOT')
const HP = [
  ['bot fills the current field', { [HONEYPOT_NAME]: 'http://spam.example' }, true],
  ['bot fills the old field from a cached page', { [LEGACY_HONEYPOT_NAME]: 'OCPS' }, true],
  ['the Groveland customer, nothing in either', { message: 'Two oaks dropped branches, and the backyard drains badly.', propertyLocation: '726 Sloans Ridge Rd Groveland, FL 34736' }, false],
]
for (const [who, payload, wantBlocked] of HP) {
  const r = spamReason(payload)
  const ok = wantBlocked ? Boolean(r) : !r
  if (!ok) bad++
  console.log(`  ${ok ? 'ok  ' : '*** WRONG ***  '}${(r || 'allowed').padEnd(18)} ${who}`)
}
console.log(`\nhoneypot field is now "${HONEYPOT_NAME}", was "${LEGACY_HONEYPOT_NAME}"`)


// The margin is the real result. A pitch should clear the threshold well, and
// a customer should score zero, so neither sits anywhere near the line.
console.log(`
PITCH SIGNALS  (blocks at ${PITCH_THRESHOLD})`)
for (const [who, message] of [...SPAM, ...REAL]) {
  const hits = pitchSignals(message)
  console.log(`  ${hits.length >= PITCH_THRESHOLD ? 'BLOCK' : '     '} ${hits.length}  ${who}`)
  if (hits.length) console.log(`          ${hits.join(', ')}`)
}

console.log(bad === 0 ? '\nall correct' : `\n${bad} WRONG`)
process.exit(bad === 0 ? 0 : 1)
