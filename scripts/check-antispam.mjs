// Every submission below actually arrived on hlsdeland.com. The spam ones all
// cleared the honeypot and the timing trap; the real ones are customers who
// must never be blocked. Run after touching src/lib/antispam.ts:
//
//     npx tsx scripts/check-antispam.mjs
//
// Each row is [who, message, propertyLocation].
import { spamReason } from '../src/lib/antispam.ts'

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
console.log(bad === 0 ? '\nall correct' : `\n${bad} WRONG`)
process.exit(bad === 0 ? 0 : 1)
