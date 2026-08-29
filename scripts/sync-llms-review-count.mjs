// Keeps the review count in public/llms*.txt in step with REVIEW_STATS.
//
// These files are hand-written prose, so they stay as static files rather than
// becoming route handlers. But the review count inside them had drifted: the
// constant said 40 while the published files still said 33, which meant every
// AI engine reading llms.txt was being handed a stale number.
//
// Runs on prebuild, so the published files cannot drift from the constant again.
import { readFile, writeFile } from 'node:fs/promises'

const constants = await readFile('src/shared/constants.ts', 'utf8')
const m = constants.match(/REVIEW_STATS\s*=\s*\{\s*stars:\s*([\d.]+)\s*,\s*count:\s*(\d+)/)
if (!m) { console.error('sync-llms: could not read REVIEW_STATS'); process.exit(1) }
const [, stars, count] = m

let changed = 0
for (const f of ['public/llms.txt', 'public/llms-full.txt']) {
  const before = await readFile(f, 'utf8')
  // Matches "5.0 stars, 33 reviews" and "5.0 stars from 33 reviews".
  const after = before.replace(
    /([\d.]+) stars(,| from) (\d+) reviews/g,
    `${stars} stars$2 ${count} reviews`,
  )
  if (after !== before) {
    await writeFile(f, after)
    console.log(`sync-llms: updated ${f} -> ${stars} stars, ${count} reviews`)
    changed++
  }
}
console.log(changed ? `sync-llms: ${changed} file(s) updated` : 'sync-llms: already in sync')
