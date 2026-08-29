// Read-only survey: enumerate every raw <img> tag and group by className shape.
import { readdir, readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'

const ROOT = new URL('../src/', import.meta.url).pathname.replace(/^\//, '')

async function walk(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(p)))
    else if (e.name.endsWith('.tsx')) out.push(p)
  }
  return out
}

const shapes = new Map()
const perFile = new Map()
let total = 0

for (const p of await walk(ROOT)) {
  const s = await readFile(p, 'utf8')
  for (const m of s.matchAll(/<img\b[\s\S]*?\/>/g)) {
    total++
    const cls = (m[0].match(/className="([^"]*)"/) || [, '(none)'])[1]
    shapes.set(cls, (shapes.get(cls) || 0) + 1)
    const rel = relative(ROOT, p).replace(/\\/g, '/')
    perFile.set(rel, (perFile.get(rel) || 0) + 1)
  }
}

console.log('TOTAL <img> tags:', total)
console.log('\n--- by className shape ---')
for (const [c, n] of [...shapes].sort((a, b) => b[1] - a[1])) {
  console.log(String(n).padStart(4), ' ', c)
}
console.log('\n--- files:', perFile.size, '---')
