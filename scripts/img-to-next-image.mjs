// Convert fixed-height raw <img> cards to next/image with `fill`.
//
// Why this shape is safe to script and the others are not: every tag it touches
// already declares BOTH a width (w-full) and a height (h-NN), so the wrapper it
// gets is already sized — which is exactly what `fill` requires. No layout has
// to be guessed at.
//
// Class routing, which is the part that must not be wrong:
//   layout/spacing/rounding -> wrapper   (col-span-*, mt-*, rounded*, w-*, h-*)
//   painting/animation      -> Image     (object-*, hover:*, group-hover:*,
//                                         transition*, duration*, shadow*)
// Rounding moves to the wrapper WITH overflow-hidden, or a filled image paints
// square corners straight over the radius. `key` moves to the wrapper, since
// that becomes the outermost element inside a .map().
//
// Attributes are read with a brace-aware scanner, NOT a regex. An earlier regex
// version cut `alt={`... ${i + 1}`}` at the first `}` — inside the template
// substitution — and emitted an unterminated template literal. Nested braces and
// template literals are common in these files, so the parser has to track depth.
//
// Run with --dry to preview.
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, relative } from 'node:path'

const ROOT = new URL('../src/', import.meta.url).pathname.replace(/^\//, '')
const DRY = process.argv.includes('--dry')

const IMAGEY = /^(object-|hover:|group-hover:|transition|duration-|shadow|opacity-|scale-)/

/** Scan from `<img` to its closing `/>`, respecting strings, templates, braces. */
function readTag(s, start) {
  let i = start + 4
  let depth = 0
  while (i < s.length) {
    const c = s[i]
    if (c === '"' || c === "'") {
      const q = c
      i++
      while (i < s.length && s[i] !== q) i += s[i] === '\\' ? 2 : 1
      i++
      continue
    }
    if (c === '`') {
      i++
      let td = 0
      while (i < s.length) {
        if (s[i] === '\\') { i += 2; continue }
        if (s[i] === '`' && td === 0) break
        if (s[i] === '$' && s[i + 1] === '{') { td++; i += 2; continue }
        if (s[i] === '}' && td > 0) td--
        i++
      }
      i++
      continue
    }
    if (c === '{') { depth++; i++; continue }
    if (c === '}') { depth--; i++; continue }
    if (depth === 0 && c === '/' && s[i + 1] === '>') return { end: i + 2, text: s.slice(start, i + 2) }
    if (depth === 0 && c === '>') return null // not self-closing; leave alone
    i++
  }
  return null
}

/** Parse `name="v"` / `name={expr}` pairs out of a tag body. */
function parseAttrs(tag) {
  const body = tag.slice(4, tag.length - 2)
  const out = {}
  let i = 0
  while (i < body.length) {
    while (i < body.length && /\s/.test(body[i])) i++
    const nm = /^[A-Za-z_][\w:-]*/.exec(body.slice(i))
    if (!nm) break
    const name = nm[0]
    i += name.length
    while (i < body.length && /\s/.test(body[i])) i++
    if (body[i] !== '=') { out[name] = true; continue }
    i++
    while (i < body.length && /\s/.test(body[i])) i++
    if (body[i] === '"' || body[i] === "'") {
      const q = body[i]; let j = i + 1
      while (j < body.length && body[j] !== q) j += body[j] === '\\' ? 2 : 1
      out[name] = { kind: 'str', value: body.slice(i + 1, j) }
      i = j + 1
    } else if (body[i] === '{') {
      let j = i + 1, d = 1
      while (j < body.length && d > 0) {
        const c = body[j]
        if (c === '"' || c === "'") { const q = c; j++; while (j < body.length && body[j] !== q) j += body[j] === '\\' ? 2 : 1; j++; continue }
        if (c === '`') {
          j++; let td = 0
          while (j < body.length) {
            if (body[j] === '\\') { j += 2; continue }
            if (body[j] === '`' && td === 0) break
            if (body[j] === '$' && body[j + 1] === '{') { td++; j += 2; continue }
            if (body[j] === '}' && td > 0) td--
            j++
          }
          j++; continue
        }
        if (c === '{') d++
        else if (c === '}') d--
        if (d === 0) break
        j++
      }
      out[name] = { kind: 'expr', value: body.slice(i + 1, j) }
      i = j + 1
    } else break
  }
  return out
}

const emit = (a) => (a.kind === 'str' ? JSON.stringify(a.value) : `{${a.value}}`)

const files = []
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) await walk(p)
    else if (e.name.endsWith('.tsx')) files.push(p)
  }
}
await walk(ROOT)

let converted = 0
const skipped = []

for (const p of files) {
  const orig = await readFile(p, 'utf8')
  const rel = relative(ROOT, p).replace(/\\/g, '/')
  let s = '', cursor = 0, touched = 0

  for (let idx = orig.indexOf('<img', 0); idx !== -1; idx = orig.indexOf('<img', cursor)) {
    const tag = readTag(orig, idx)
    if (!tag) { s += orig.slice(cursor, idx + 4); cursor = idx + 4; continue }
    const a = parseAttrs(tag.text)
    const cls = a.className && a.className.kind === 'str' ? a.className.value : ''

    const fits = /\bw-full\b/.test(cls) && /\bh-\d+\b/.test(cls) && /\bobject-cover\b/.test(cls)
    if (!fits || !a.src || !a.alt) {
      skipped.push(`${rel}: ${cls || '(no static className)'}`)
      s += orig.slice(cursor, tag.end); cursor = tag.end; continue
    }

    const wrap = [], img = []
    for (const c of cls.split(/\s+/).filter(Boolean)) (IMAGEY.test(c) ? img : wrap).push(c)
    if (wrap.some((c) => c.startsWith('rounded'))) wrap.push('overflow-hidden')
    wrap.unshift('relative')

    const sizes = /col-span-2/.test(cls)
      ? '(max-width: 640px) 100vw, 66vw'
      : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'

    const indent = ' '.repeat(Math.max(0, idx - orig.lastIndexOf('\n', idx) - 1))
    const keyAttr = a.key ? ` key=${emit(a.key)}` : ''
    const styleAttr = a.style ? `\n${indent}    style=${emit(a.style)}` : ''

    s += orig.slice(cursor, idx)
    s += `<div${keyAttr} className="${wrap.join(' ')}">
${indent}  <Image
${indent}    src=${emit(a.src)}
${indent}    alt=${emit(a.alt)}
${indent}    fill
${indent}    sizes="${sizes}"
${indent}    className="${img.join(' ')}"${styleAttr}
${indent}  />
${indent}</div>`
    cursor = tag.end
    touched++
  }
  s += orig.slice(cursor)

  if (touched) {
    if (!/^import Image from 'next\/image'/m.test(s)) {
      s = /^'use client'\n/.test(s)
        ? s.replace(/^('use client'\n)/, `$1\nimport Image from 'next/image'\n`)
        : `import Image from 'next/image'\n` + s
    }
    converted += touched
    if (!DRY) await writeFile(p, s)
    console.log(`${String(touched).padStart(3)}  ${rel}`)
  }
}

console.log(`\n${DRY ? 'WOULD CONVERT' : 'CONVERTED'}: ${converted}`)
if (skipped.length) {
  console.log(`\nSKIPPED (${skipped.length}) — by hand:`)
  for (const x of skipped) console.log('  ' + x)
}
