// One-shot compressor for the /public/photos/hoag batch.
// Every input becomes a JPEG (photos should be JPEG, not palette PNG).
// Resizes to max 1920px on the long edge, quality 88 mozjpeg, EXIF orientation
// baked in. Deletes the source and writes the new .jpg next to it.
import sharp from 'sharp'
import { readdir, stat, rename, rm } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'

const DIR = new URL('../public/photos/hoag/', import.meta.url).pathname.replace(/^\//, '')

const files = await readdir(DIR)
for (const f of files) {
  if (f.startsWith('.tmp-')) continue
  const src = join(DIR, f)
  const st = await stat(src)
  if (!st.isFile()) continue
  const ext = extname(f).toLowerCase()
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue

  const stem = basename(f, ext)
  const outName = `${stem}.jpeg`
  const outPath = join(DIR, outName)
  const tmp = join(DIR, `.tmp-${outName}`)

  const before = st.size
  await sharp(src, { failOn: 'none' })
    .rotate()
    .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 88, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(tmp)

  const stAfter = await stat(tmp)
  await rm(src)
  await rename(tmp, outPath)
  const pct = Math.round((1 - stAfter.size / before) * 100)
  console.log(`${f.padEnd(52)} ${(before / 1024).toFixed(0).padStart(6)}KB -> ${(stAfter.size / 1024).toFixed(0).padStart(6)}KB (-${pct}%) -> ${outName}`)
}
console.log('done')
