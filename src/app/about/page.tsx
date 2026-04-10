'use client'

import Link from 'next/link'
import {
  ABOUT,
  CERTS,
  IMAGES,
  PHONE,
  PHONE_HREF,
  EMAIL,
  SERVICE_AREA,
  LOCATION,
  EST_YEAR,
  COMPANY,
  OWNER,
} from '@/shared/constants'

/* ─────────────────────────────────────────────
   ABOUT PAGE — Ironclad Design Theme
   Dark bg (#1a1c1a, #141614, #0d0f0d)
   Forest green accent (#4a7c59), warm tan (#c2a878)
   ───────────────────────────────────────────── */

const SERVICE_AREAS = [
  'DeLand',
  'DeLeon Springs',
  'Orange City',
  'Deltona',
  'Lake Helen',
  'Pierson',
  'Barberville',
  'Seville',
  'Volusia County',
  'Surrounding Central Florida',
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#1a1c1a] text-white font-sans">

      {/* ── Hero Banner ── */}
      <section className="relative h-[50vh] min-h-[340px] flex items-center justify-center overflow-hidden">
        <img
          src={IMAGES.og}
          alt="Hoag Land Services job site"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider">
            About Hoag Land Services
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Local, experienced land services in Central Florida
          </p>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="bg-[#141614] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#c2a878] font-display uppercase tracking-widest text-sm mb-2">
            Our Story
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase mb-12">
            {ABOUT.headline}
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: paragraphs */}
            <div className="space-y-6">
              {ABOUT.paragraphs.map((p, i) => (
                <p key={i} className="text-gray-300 leading-relaxed text-base md:text-lg">
                  {p}
                </p>
              ))}
            </div>

            {/* Right: photo */}
            <div className="relative">
              <img
                src={IMAGES.site7}
                alt="Hoag Land Services project"
                className="w-full rounded-lg shadow-2xl object-cover aspect-[4/3]"
              />
            </div>
          </div>

          {/* Certifications */}
          <div className="mt-16 grid sm:grid-cols-2 gap-4">
            {CERTS.map((cert, i) => (
              <div key={i} className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[#4a7c59] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-300">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meet the Owner ── */}
      <section className="bg-[#1a1c1a] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[300px_1fr] gap-12 items-center">
            {/* Photo */}
            <div className="relative mx-auto md:mx-0">
              <img
                src="/Tyler-hoag.png"
                alt={`${OWNER}, CEO and Founder`}
                className="w-64 h-64 md:w-[300px] md:h-[300px] rounded-lg object-cover object-top shadow-2xl"
              />
              <div className="absolute inset-0 rounded-lg ring-2 ring-[#4a7c59]/30" />
            </div>

            {/* Bio */}
            <div>
              <p className="text-[#c2a878] font-display uppercase tracking-widest text-sm mb-2">
                Meet the Owner
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase mb-2">
                {OWNER}
              </h2>
              <p className="text-[#4a7c59] font-semibold text-lg mb-6">
                CEO / Founder
              </p>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-4">
                With over a decade of experience in utility forestry and construction, Tyler built {COMPANY} from a single tractor into a full-service operation serving Central Florida. As an ISA Certified Arborist and Tree Risk Assessment Qualified professional, he brings expert-level knowledge to every project.
              </p>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                Tyler personally oversees every job, ensuring the highest standards of safety, quality, and professionalism. His hands-on approach and deep understanding of the land have earned the trust of residential and commercial clients across the region.
              </p>

              {/* Credential badges */}
              <div className="flex flex-wrap gap-3 mt-8">
                {['ISA Certified Arborist', 'TRAQ Qualified', `Est. ${EST_YEAR}`].map((badge) => (
                  <span
                    key={badge}
                    className="px-4 py-2 bg-[#4a7c59]/15 border border-[#4a7c59]/40 rounded text-sm text-[#4a7c59] font-semibold uppercase tracking-wide"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Service Area ── */}
      <section className="bg-[#0d0f0d] py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#c2a878] font-display uppercase tracking-widest text-sm mb-2">
            Where We Work
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase mb-4">
            Service Area
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-12">
            Serving DeLand, DeLeon Springs, and surrounding Central Florida areas.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {SERVICE_AREAS.map((area) => (
              <div
                key={area}
                className="px-4 py-3 bg-[#1a1c1a] border border-[#4a7c59]/20 rounded-lg text-center flex items-center justify-center min-h-[52px]"
              >
                <span className="text-gray-200 text-sm leading-tight">{area}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-center gap-2 text-gray-400">
            <svg className="w-5 h-5 text-[#4a7c59]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>Based in {LOCATION}</span>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#1a1c1a] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase mb-6">
            Ready to Walk Through Your Property?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            We will come out, walk the site with you, and give you an honest assessment of the work involved.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-[#4a7c59] hover:bg-[#3d6b4a] text-white font-display uppercase tracking-wider text-lg font-bold rounded transition-colors"
          >
            Request a Walkthrough
          </Link>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-400 text-sm">
            <a href={PHONE_HREF} className="hover:text-[#4a7c59] transition-colors">
              {PHONE}
            </a>
            <span className="hidden sm:inline">|</span>
            <a href={`mailto:${EMAIL}`} className="hover:text-[#4a7c59] transition-colors">
              {EMAIL}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
