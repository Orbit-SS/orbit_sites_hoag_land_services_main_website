// Re-encode the photographs sitting at /public root.
//
// These were missed by reencode-photo-library.mjs, which only walks
// public/photos. They are the three team photos used on /about, /join and as
// Open Graph share images — 21.6MB between them, the largest single lump of
// unoptimised bytes left in the repo.
//
// Same invariants as the photos/ encoder:
//  - JPEG-family files keep their EXACT filename including case. These paths are
//    referenced in 12 places across page metadata, JSON-LD and PageClient files,
//    so preserving names means zero code churn.
//  - sharp strips metadata by default, which also removes the GPS coordinates a
//    camera original carries for a customer's property.
//
// Files with real transparency are skipped — re-encoding them to JPEG would
// flatten the alpha onto black. Tyler-hoag.png is the only one, and it is not
// referenced anywhere in src/, so it is left alone rather than converted.
//
// DRY=1 node scripts/reencode-public-root.mjs   -> report only, no writes
import sharp from 'sharp'
import { readdir, stat, rename, rm, writeFile } from 'node:fs/promises'
import { join, extname } from 'node:path'

const DIR = 'public'
const DRY = process.env.DRY === '1'
const MAX_EDGE = 1920
const QUALITY = 80

const entries = await readdir(DIR, { withFileTypes: true })
let before = 0
let after = 0

for (const e of entries) {
  if (!e.isFile()) continue
  const ext = extname(e.name).toLowerCase()
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue

  const src = join(DIR, e.name)
  const meta = await sharp(src).metadata()

  // Anything genuinely transparent stays as it is.
  if (meta.hasAlpha) {
    const stats = await sharp(src).ensureAlpha().extractChannel(3).stats()
    if (stats.channels[0].min < 255) {
      console.log(`SKIP  ${e.name.padEnd(24)} (real transparency)`)
      continue
    }
  }

  const st = await stat(src)
  if (st.size < 400 * 1024) {
    console.log(`SKIP  ${e.name.padEnd(24)} (already ${(st.size / 1024).toFixed(0)}KB)`)
    continue
  }

  const buf = await sharp(src, { failOn: 'none' })
    .rotate()
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toBuffer()

  before += st.size
  after += buf.length
  const pct = Math.round((1 - buf.length / st.size) * 100)
  console.log(
    `${e.name.padEnd(24)} ${(st.size / 1048576).toFixed(2).padStart(6)}MB -> ${(buf.length / 1024).toFixed(0).padStart(5)}KB  (-${pct}%)`
  )

  if (!DRY) {
    const tmp = join(DIR, `.tmp-${e.name}`)
    await writeFile(tmp, buf)
    await rm(src)
    await rename(tmp, src)
  }
}

if (before) {
  console.log('')
  console.log(
    `TOTAL  ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(2)}MB  (-${Math.round((1 - after / before) * 100)}%)`
  )
}
if (DRY) console.log('\n(dry run - nothing written)')
