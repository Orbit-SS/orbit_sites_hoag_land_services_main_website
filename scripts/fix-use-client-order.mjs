// Repair: the Image import was prepended above the 'use client' directive in
// files whose directive line ends with CRLF, which the placement regex missed.
// 'use client' must be the first expression in the file.
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, relative } from 'node:path'

const ROOT = new URL('../src/', import.meta.url).pathname.replace(/^\//, '')
const files = []
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) await walk(p)
    else if (e.name.endsWith('.tsx')) files.push(p)
  }
}
await walk(ROOT)

let fixed = 0
for (const p of files) {
  const s = await readFile(p, 'utf8')
  const m = s.match(/^import Image from 'next\/image'\r?\n(\r?\n)?('use client'\r?\n)/)
  if (!m) continue
  const rest = s.slice(m[0].length)
  const nl = s.includes('\r\n') ? '\r\n' : '\n'
  await writeFile(p, `'use client'${nl}${nl}import Image from 'next/image'${nl}${rest}`)
  console.log('fixed', relative(ROOT, p).replace(/\\/g, '/'))
  fixed++
}
console.log('\nfixed:', fixed)
