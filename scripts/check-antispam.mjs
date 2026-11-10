// Check the new rules against the three spam bodies that got through AND the
// three real customer messages, including the hero form's auto-generated one.
import { spamReason } from '../src/lib/antispam.ts'
const SPAM = [
  ["Joseph Matthews (29 Oct)", "If customers are searching for what you offer, your business should show up first. We can make that happen within a day.\nWant to see how easy it is?"],
  ["Megan Draper (31 Oct)", "2026-11-03"],
  ["Kayla Osborne (10 Nov)", "2026-11-13"],
]
const REAL = [
  ["Ani, Salt Springs", "Neighbor’s oak overhanging my house. Would like an estimate please? Text is best, thank you :)"],
  ["Angela Jenkins", "We are looking to remove a large tree, clear a berm"],
  ["Ranata Pauyo (hero form default)", "Estimate request from the Ocoee, FL - Tree Services hero page."],
  ["empty message", ""],
  ["acreage reply", "I have about 4 acres off Grand Ave that needs clearing and a pad for a barn."],
  ["mentions google reviews", "Found you on google, saw your reviews. Need a stump ground out."],
]
let bad = 0
console.log("SPAM  (want: blocked)")
for (const [who, msg] of SPAM) {
  const r = spamReason({ message: msg })
  if (!r) bad++
  console.log(`  ${r ? "BLOCKED " + r : "*** LET THROUGH ***"}   ${who}`)
}
console.log("\nREAL  (want: allowed)")
for (const [who, msg] of REAL) {
  const r = spamReason({ message: msg })
  if (r) bad++
  console.log(`  ${r ? "*** FALSE POSITIVE: " + r + " ***" : "allowed"}   ${who}`)
}
console.log(bad === 0 ? "\nall correct" : `\n${bad} WRONG`)
process.exit(bad === 0 ? 0 : 1)
