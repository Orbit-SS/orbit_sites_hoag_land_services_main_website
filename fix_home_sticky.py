import io

p = 'src/app/PageClient.tsx'
s = io.open(p, encoding='utf-8').read()

s = s.replace("import { useEffect, useRef } from 'react'",
              "import { useEffect, useRef, useState } from 'react'\n"
              "import { createPortal } from 'react-dom'", 1)

OLD = """function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-[#141614]/95 backdrop-blur-md border-t border-white/10 p-3">
      <a
        href={PHONE_HREF}
        className="flex items-center justify-center gap-2 w-full bg-[#4a7c59] hover:bg-[#3d6a4a] text-white py-3.5 rounded-lg font-bold uppercase tracking-wider text-sm transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        Call Now &mdash; Free Estimate
      </a>
    </div>
  )
}"""

NEW = """/* Portalled into <body> for the same reason as the one on the location pages:
   declared inline it was position:fixed but laid out thousands of pixels down
   the document, so on a phone it only appeared at the very bottom of the page
   rather than staying on screen. Measured 5,509px in an 844px viewport.

   It also now offers the form as well as the phone. Every button on this bar
   dialled, which left anyone not ready to talk with nowhere to go. */
function StickyMobileCTA() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return createPortal(
    <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-[#141614]/95 backdrop-blur-md border-t border-white/10 p-3 flex items-center gap-2">
      <a
        href={PHONE_HREF}
        className="flex items-center justify-center gap-2 flex-1 bg-[#4a7c59] hover:bg-[#3d6a4a] text-white py-3.5 rounded-lg font-bold uppercase tracking-wider text-sm transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        Call Now
      </a>
      <a
        href="#estimate"
        className="flex items-center justify-center flex-1 border border-[#4a7c59] text-white py-3.5 rounded-lg font-bold uppercase tracking-wider text-sm hover:bg-[#4a7c59]/20 transition-colors"
      >
        Free Estimate
      </a>
    </div>,
    document.body,
  )
}"""

assert OLD in s, 'homepage sticky CTA not found verbatim'
s = s.replace(OLD, NEW, 1)

io.open(p, 'w', encoding='utf-8', newline='').write(s)
print('homepage sticky CTA portalled, and now offers the form as well as the phone')
