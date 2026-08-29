'use client'

import Image from 'next/image'

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
import Breadcrumbs from '@/components/Breadcrumbs'

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
      <Breadcrumbs crumbs={[
        { name: 'Home', url: '/' },
        { name: 'About', url: '/about' },
      ]} />

      {/* ── Hero: Family-Forward ── */}
      <section className="bg-gradient-to-b from-[#0d0f0d] to-[#141614] py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">

            {/* Left: title + intro */}
            <div className="text-center md:text-left order-2 md:order-1">
              <p className="text-[#c2a878] font-display uppercase tracking-widest text-sm mb-3">
                Family-Owned & Operated
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider mb-5">
                About Hoag Land Services
              </h1>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6">
                Local, experienced land services in Central Florida — rooted in family, built on hard work.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4a7c59]/15 border border-[#4a7c59]/30 text-sm text-gray-200">
                  <svg className="w-4 h-4 text-[#4a7c59]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Est. 2017
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4a7c59]/15 border border-[#4a7c59]/30 text-sm text-gray-200">
                  <svg className="w-4 h-4 text-[#4a7c59]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  ISA Certified Arborist
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4a7c59]/15 border border-[#4a7c59]/30 text-sm text-gray-200">
                  <svg className="w-4 h-4 text-[#4a7c59]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Licensed & Insured
                </span>
              </div>
            </div>

            {/* Right: family photo — full, never cropped */}
            <div className="order-1 md:order-2">
              <div className="relative rounded-xl overflow-hidden shadow-2xl ring-1 ring-[#4a7c59]/20 bg-[#0d0f0d]">
                {/* Intrinsic width/height, not `fill` — this one must never be
                    cropped, so it keeps its own aspect ratio. */}
                <Image
                  src="/team-family.JPEG"
                  alt="The Hoag family and crew under a Central Florida oak"
                  width={3255}
                  height={4883}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-full h-auto block"
                />
              </div>
              <p className="text-center mt-3 text-sm text-[#c2a878] font-display uppercase tracking-widest">
                The Hoag Family
              </p>
            </div>

          </div>
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
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="/team-log.JPEG"
                alt="HLS team carrying a log — built on hard work"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
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
              <div className="relative w-64 h-64 md:w-[300px] md:h-[300px] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="/team-crew.JPEG"
                  alt={`${OWNER} (center) with the HLS crew`}
                  fill
                  sizes="300px"
                  className="object-cover object-top"
                />
              </div>
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
