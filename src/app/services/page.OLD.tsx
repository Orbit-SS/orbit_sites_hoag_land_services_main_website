'use client'

import Link from 'next/link'
import {
  FULL_SERVICES,
  IMAGES,
  PHONE,
  PHONE_HREF,
  EMAIL,
  CERTS,
  COMPANY,
} from '@/shared/constants'

/* ─────────────────────────────────────────────
   SERVICES PAGE — Ironclad Design Theme
   Dark bg (#1a1c1a, #141614, #0d0f0d)
   Forest green accent (#4a7c59), warm tan (#c2a878)
   ───────────────────────────────────────────── */

function GreenCheck() {
  return (
    <svg className="w-5 h-5 text-[#4a7c59] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

function ServiceItem({ index, name, desc }: { index: number; name: string; desc: string }) {
  return (
    <div className="flex gap-5">
      <span className="font-display text-[#c2a878] text-2xl font-bold shrink-0 w-10">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div>
        <h3 className="font-display text-xl font-bold uppercase mb-2">{name}</h3>
        <div className="flex items-start gap-3">
          <GreenCheck />
          <p className="text-gray-300 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#1a1c1a] text-white font-sans">

      {/* ── Hero Banner ── */}
      <section className="relative h-[50vh] min-h-[340px] flex items-center justify-center overflow-hidden">
        <img
          src={IMAGES.site4}
          alt="Hoag Land Services site work"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider">
            Our Services
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Simple, straight-forward services for site work, tree work, and fencing.
          </p>
        </div>
      </section>

      {/* ── Site Services ── */}
      <section id="site-services" className="bg-[#141614] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#c2a878] font-display uppercase tracking-widest text-sm mb-2">
            {FULL_SERVICES.site.description}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase mb-12">
            {FULL_SERVICES.site.name}
          </h2>

          {/* Photos row */}
          <div className="grid md:grid-cols-2 gap-6 mb-14">
            <img
              src={IMAGES.site4}
              alt="Site work - heavy equipment"
              className="w-full rounded-lg object-cover aspect-[16/10] shadow-xl"
            />
            <img
              src={IMAGES.site1}
              alt="Site work - land clearing"
              className="w-full rounded-lg object-cover aspect-[16/10] shadow-xl"
            />
          </div>

          {/* Service items */}
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {FULL_SERVICES.site.items.map((item, i) => (
              <ServiceItem key={item.name} index={i} name={item.name} desc={item.desc} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Tree Services ── */}
      <section id="tree-services" className="bg-[#1a1c1a] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#c2a878] font-display uppercase tracking-widest text-sm mb-2">
            {FULL_SERVICES.tree.tagline}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase mb-4">
            {FULL_SERVICES.tree.name}
          </h2>

          {/* ISA Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-3 bg-[#4a7c59]/15 border border-[#4a7c59]/40 rounded-lg mb-12">
            <svg className="w-6 h-6 text-[#4a7c59] shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-[#4a7c59] font-semibold text-sm uppercase tracking-wide">
              ISA Certified Arborist, ISA Tree Risk Assessment Qualified
            </span>
          </div>

          <div className="grid md:grid-cols-[1fr_400px] gap-12 items-start">
            {/* Service items */}
            <div className="space-y-10">
              {FULL_SERVICES.tree.items.map((item, i) => (
                <ServiceItem key={item.name} index={i} name={item.name} desc={item.desc} />
              ))}
            </div>

            {/* Photo */}
            <img
              src={IMAGES.tree5}
              alt="Tree services - certified arborist"
              className="w-full rounded-lg object-cover aspect-[3/4] shadow-xl hidden md:block"
            />
          </div>
        </div>
      </section>

      {/* ── Fencing Services ── */}
      <section id="fence-services" className="bg-[#141614] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#c2a878] font-display uppercase tracking-widest text-sm mb-2">
            {FULL_SERVICES.fence.tagline}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase mb-12">
            {FULL_SERVICES.fence.name}
          </h2>

          <div className="grid md:grid-cols-[400px_1fr] gap-12 items-start">
            {/* Photo */}
            <img
              src={IMAGES.fence5}
              alt="Professional fencing installation"
              className="w-full rounded-lg object-cover aspect-[3/4] shadow-xl hidden md:block"
            />

            {/* Service items */}
            <div className="space-y-10">
              {FULL_SERVICES.fence.items.map((item, i) => (
                <ServiceItem key={item.name} index={i} name={item.name} desc={item.desc} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0d0f0d] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase mb-6">
            Ready to Talk About Your Project?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Reach out for a free estimate. We will walk the property with you and provide honest, upfront pricing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-[#4a7c59] hover:bg-[#3d6b4a] text-white font-display uppercase tracking-wider text-lg font-bold rounded transition-colors"
            >
              Request an Estimate
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
          <p className="mt-6 text-gray-500 text-sm">
            <a href={`mailto:${EMAIL}`} className="hover:text-[#4a7c59] transition-colors">
              {EMAIL}
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}
