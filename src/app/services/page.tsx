'use client'

import Link from 'next/link'
import {
  FULL_SERVICES,
  IMAGES,
  PHONE,
  PHONE_HREF,
  EMAIL,
  CERTS,
  REVIEW_STATS,
  EST_YEAR,
} from '@/shared/constants'

const services = [
  {
    ...FULL_SERVICES.site,
    href: '/services/site-work',
    image: IMAGES.site1,
    cta: 'View Site Services',
  },
  {
    ...FULL_SERVICES.tree,
    href: '/services/tree-services',
    image: IMAGES.tree5,
    cta: 'View Tree Services',
  },
  {
    ...FULL_SERVICES.fence,
    href: '/services/fencing',
    image: IMAGES.fence5,
    cta: 'View Fencing Services',
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#1a1c1a] text-white font-sans">

      {/* ── Hero ── */}
      <section className="relative h-[50vh] min-h-[340px] flex items-center justify-center overflow-hidden">
        <img
          src={IMAGES.site4}
          alt="Hoag Land Services at work"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#1a1c1a]" />
        <div className="relative z-10 text-center px-4">
          <p className="text-[#c2a878] text-sm uppercase tracking-[0.3em] mb-4 font-semibold">
            What We Do
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider">
            Our Services
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Site work, tree services, and fencing for residential &amp; commercial properties across Central Florida.
          </p>
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <section className="bg-[#141614] border-y border-white/5 py-4">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center gap-x-8 gap-y-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-[#c2a878]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-white/70 text-sm">{REVIEW_STATS.stars} Stars ({REVIEW_STATS.count} Reviews)</span>
          </div>
          <span className="text-white/20 hidden sm:inline">|</span>
          <span className="text-white/70 text-sm">ISA Certified Arborist</span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <span className="text-white/70 text-sm">Licensed &amp; Insured</span>
          <span className="text-white/20 hidden sm:inline">|</span>
          <span className="text-white/70 text-sm">Est. {EST_YEAR}</span>
        </div>
      </section>

      {/* ── Service Cards ── */}
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          {services.map((svc, idx) => (
            <Link
              key={svc.name}
              href={svc.href}
              className="group grid md:grid-cols-2 gap-8 items-center"
            >
              {/* Image — alternates left/right */}
              <div className={`relative overflow-hidden rounded-xl ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                <img
                  src={svc.image}
                  alt={svc.name}
                  className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className={idx % 2 === 1 ? 'md:order-1' : ''}>
                <p className="text-[#c2a878] font-display uppercase tracking-widest text-sm mb-2">
                  {String(idx + 1).padStart(2, '0')}
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold uppercase mb-3 group-hover:text-[#4a7c59] transition-colors">
                  {svc.name}
                </h2>
                <p className="text-[#c2a878] text-lg mb-4">{svc.tagline}</p>
                <p className="text-gray-400 leading-relaxed mb-6">{svc.description}</p>

                {/* Sub-services preview */}
                <div className="space-y-2 mb-8">
                  {svc.items.map((item) => (
                    <div key={item.name} className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-[#4a7c59] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300 text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>

                <span className="inline-flex items-center gap-2 text-[#4a7c59] font-semibold uppercase tracking-wider text-sm group-hover:gap-3 transition-all">
                  {svc.cta}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0d0f0d] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase mb-6">
            Ready to Talk About Your Project?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Tell us what you need and we&apos;ll follow up with next steps. Free estimates, no pressure.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-[#4a7c59] hover:bg-[#3d6b4a] text-white font-display uppercase tracking-wider text-lg font-bold rounded transition-colors"
            >
              Get My Free Estimate
            </Link>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#4a7c59]/40 text-white font-display uppercase tracking-wider text-lg rounded hover:bg-[#4a7c59]/10 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {PHONE}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
