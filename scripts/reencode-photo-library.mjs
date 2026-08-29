// Re-encode /public/photos (top level only) for web delivery.
//
// Two rules that matter:
//  1. JPEG-family files keep their EXACT filename, including the original case
//     (.JPG / .JPEG / .jpeg / .jpg). 122 <img> tags reference these paths and
//     most go through src={IMAGES.x}, so preserving names means zero code churn.
//  2. Photographs stored as PNG are converted to .jpeg -- a 33MB PNG of a photo
//     is the wrong container by an order of magnitude. Those references are
//     updated separately in src/shared/constants.ts.
//
// The logo is excluded: it needs alpha and is already 19KB.
// public/photos/hoag/ is excluded: already compressed in July.
//
// sharp strips metadata by default, which also removes the GPS coordinates of
// customer properties that camera originals carry.
//
// DRY=1 node scripts/reencode-photo-library.mjs   -> report only, no writes
import sharp from 'sharp'
import { readdir, stat, rename, rm } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'

const DIR = 'public/photos'
const DRY = process.env.DRY === '1'
const KEEP_AS_IS = new Set(['HLSlogo-nobackground.png'])
const MAX_EDGE = 1920
const QUALITY = 80

const entries = await readdir(DIR, { withFileTypes: true })
let before = 0, after = 0, converted = []

for (const e of entries) {
  if (!e.isFile()) continue
  if (KEEP_AS_IS.has(e.name)) { console.log(`SKIP  ${e.name} (logo, needs alpha)`); continue }
  const ext = extname(e.name).toLowerCase()
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue

  const src = join(DIR, e.name)
  const st = await stat(src)
  const isPng = ext === '.png'
  // PNG photos become .jpeg; everything else keeps its exact original name.
  const outName = isPng ? `${basename(e.name, extname(e.name))}.jpeg` : e.name
  const outPath = join(DIR, outName)
  const tmp = join(DIR, `.tmp-${outName}`)

  let buf
  try {
    buf = await sharp(src, { failOn: 'none' })
      .rotate()
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toBuffer()
  } catch (err) {
    // Not a decodable image. og-image.jpg was a saved 404 HTML page.
    console.log()
    continue
  }

  before += st.size
  after += buf.length
  const pct = Math.round((1 - buf.length / st.size) * 100)
  const rename_note = outName !== e.name ? ` -> ${outName}` : ''
  console.log(
    `${e.name.padEnd(30)} ${(st.size/1048576).toFixed(2).padStart(7)}MB -> ${(buf.length/1024).toFixed(0).padStart(5)}KB  (-${pct}%)${rename_note}`
  )
  if (outName !== e.name) converted.push([e.name, outName])

  if (!DRY) {
    const { writeFile } = await import('node:fs/promises')
    await writeFile(tmp, buf)
    await rm(src)
    await rename(tmp, outPath)
  }
}

console.log('')
console.log(`TOTAL  ${(before/1048576).toFixed(1)}MB -> ${(after/1048576).toFixed(1)}MB  (-${Math.round((1-after/before)*100)}%)`)
if (converted.length) {
  console.log('\nRenamed (references need updating):')
  for (const [a, b] of converted) console.log(`  ${a}  ->  ${b}`)
}
if (DRY) console.log('\n(dry run - nothing written)')
