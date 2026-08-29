'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { IMAGES, PHONE, PHONE_HREF, COMPANY } from '@/shared/constants'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Join', href: '/join' },
  { label: 'Contact', href: '/contact' },
]

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change. Deferred so the state update never
  // lands during render, and cleaned up if the route changes again first.
  useEffect(() => {
    const timer = window.setTimeout(() => setMobileOpen(false), 0)
    return () => window.clearTimeout(timer)
  }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#1a1c1a]/95 backdrop-blur-md shadow-lg'
            : 'bg-[#1a1c1a]/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              {/* This logo is above the fold on every page and next/image
                  lazy-loads by default, so it needs to be told to load early.
                  It does NOT get `preload` (formerly `priority`).
                  node_modules/next/dist/docs/.../image.md says not to preload
                  "when you have multiple images that could be considered the
                  LCP element depending on the viewport" — which is exactly this
                  site: a preloaded hero AND a preloaded logo compete, and the
                  logo still measured 1,423-1,549ms of Load Delay on /about and
                  /services because a preload queues the fetch without raising
                  its priority. The docs' own recommendation for this case is
                  loading="eager" or fetchPriority="high". At 2KB it costs
                  nothing to give it both. */}
              <Image
                src={IMAGES.logo}
                alt={COMPANY}
                width={48}
                height={48}
                loading="eager"
                fetchPriority="high"
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
              />
              {/* aria-hidden, not alt="" on the image: this span is hidden below
                  sm, so blanking the alt would leave the link with no
                  accessible name at all on mobile. The alt carries the name;
                  "HLS" is a visual abbreviation of the same thing. */}
              <span
                aria-hidden="true"
                className="hidden sm:block font-display text-lg uppercase tracking-wider text-white font-bold"
              >
                HLS
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium uppercase tracking-wider transition-colors duration-200 ${
                    isActive(link.href)
                      ? 'text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#4a7c59] rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Phone CTA + Hamburger */}
            <div className="flex items-center gap-3">
              <a
                href={PHONE_HREF}
                className="hidden md:inline-flex items-center gap-2 bg-[#4a7c59] hover:bg-[#3d6a4a] text-white px-5 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {PHONE}
              </a>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile slide-in menu */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-[#141614] shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Mobile links */}
        <div className="px-6 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-3 rounded-lg text-sm font-medium uppercase tracking-wider transition-colors duration-200 ${
                isActive(link.href)
                  ? 'bg-[#4a7c59]/20 text-[#5d9c70]'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile phone */}
        <div className="px-6 pt-6 border-t border-white/10 mx-6">
          <a
            href={PHONE_HREF}
            className="flex items-center justify-center gap-2 bg-[#4a7c59] hover:bg-[#3d6a4a] text-white px-5 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider transition-colors duration-200 w-full"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            {PHONE}
          </a>
        </div>
      </div>
    </>
  )
}
