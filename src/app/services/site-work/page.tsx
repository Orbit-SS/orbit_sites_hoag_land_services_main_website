'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  FULL_SERVICES,
  IMAGES,
  PHONE,
  PHONE_HREF,
  EMAIL,
  COMPANY,
  REVIEWS,
  REVIEW_STATS,
  CERTS,
  EST_YEAR,
} from '@/shared/constants'
import ServiceAreaLinks from '@/components/ServiceAreaLinks'

/* ─────────────────────────────────────────────
   SITE WORK LANDING PAGE — Ironclad Theme
   Dark bg (#1a1c1a, #141614, #0d0f0d)
   Forest green accent (#4a7c59), warm tan (#c2a878)
   ───────────────────────────────────────────── */

// metadata moved to layout or removed — can't export from 'use client'

/* ── Icon Components ── */

function StarIcon() {
  return (
    <svg className="w-5 h-5 text-[#c2a878]" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-5 h-5 text-[#4a7c59] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}

/* ── Pain Point Icons ── */

function OvergrownIcon() {
  return (
    <svg className="w-8 h-8 text-[#4a7c59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

function DrainageIcon() {
  return (
    <svg className="w-8 h-8 text-[#4a7c59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  )
}

function BuildIcon() {
  return (
    <svg className="w-8 h-8 text-[#4a7c59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )
}

function InvasiveIcon() {
  return (
    <svg className="w-8 h-8 text-[#4a7c59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  )
}

/* ── Process Step Numbers ── */

function StepNumber({ n }: { n: number }) {
  return (
    <div className="w-14 h-14 rounded-full border-2 border-[#4a7c59] flex items-center justify-center shrink-0">
      <span className="font-display text-xl font-bold text-[#4a7c59]">{n}</span>
    </div>
  )
}

/* ── Differentiator Check ── */

function GreenCheck() {
  return (
    <svg className="w-6 h-6 text-[#4a7c59] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

/* ── FAQ Accordion Item ── */

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="font-display text-lg font-bold uppercase">{q}</span>
        <ChevronDown open={open} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40 pb-5' : 'max-h-0'}`}
      >
        <p className="text-gray-400 leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

/* ── Service benefit mapping ── */

const SERVICE_BENEFITS: Record<string, string> = {
  'Land Clearing':
    'Whether you are preparing for a home build, opening pasture, or developing commercial property, we clear it efficiently with heavy equipment so your project stays on schedule.',
  'Earthworks & Excavation':
    'Proper grading and drainage prevent costly problems down the road. We shape the land to exact specs so your foundation, driveway, or pond is built on solid ground.',
  'Erosion Control':
    'Protect your investment and stay compliant. Our erosion solutions keep soil in place during and after construction, preventing runoff and environmental issues.',
  'Environmental Services':
    'Invasive species and overgrown vegetation decrease property value and create fire risk. We restore your land with mulching, targeted herbicide, and responsible clearing.',
}

/* ── Service images ── */

const SERVICE_IMAGES = [IMAGES.site4, IMAGES.site7, IMAGES.site9, IMAGES.site10]

const SERVICE_SLUGS = [
  '/services/site-work/land-clearing',
  '/services/site-work/earthworks-excavation',
  '/services/site-work/erosion-control',
  '/services/site-work/environmental-services',
]

/* ── Main Page Component ── */

export default function SiteWorkPage() {
  const siteService = FULL_SERVICES.site

  const painPoints = [
    {
      icon: <OvergrownIcon />,
      title: 'Overgrown, Unusable Land',
      desc: 'Dense brush, fallen trees, and years of neglect have made your property inaccessible and unproductive.',
      href: '/services/site-work/overgrown-land-clearing',
    },
    {
      icon: <DrainageIcon />,
      title: 'Drainage & Grading Problems',
      desc: 'Standing water, erosion, or uneven terrain that threatens structures, driveways, and foundations.',
      href: '/services/site-work/drainage-grading',
    },
    {
      icon: <BuildIcon />,
      title: 'Ready to Build, but the Land Isn\'t',
      desc: 'You have plans, permits, or a vision, but the property needs clearing and grading before anything can start.',
      href: '/services/site-work/land-preparation',
    },
    {
      icon: <InvasiveIcon />,
      title: 'Invasive Vegetation Taking Over',
      desc: 'Brazilian pepper, Chinese tallow, and other invasives choking out native species and reducing property value.',
      href: '/services/site-work/invasive-vegetation-removal',
    },
  ]

  const faqs = [
    {
      q: 'How much does land clearing cost?',
      a: 'It depends on acreage, terrain, vegetation density, and access. We provide free on-site estimates with honest, no-pressure pricing tailored to your specific property.',
    },
    {
      q: 'How long does it take?',
      a: 'Most residential lots are completed in 1 to 3 days. Larger commercial parcels and multi-phase projects vary based on scope. We will give you a realistic timeline upfront.',
    },
    {
      q: 'Do you handle permits?',
      a: 'We can advise on permitting requirements for your area and project type. We work with local municipalities regularly and know the process.',
    },
    {
      q: 'What areas do you serve?',
      a: 'DeLand, DeLeon Springs, Orange City, Deltona, and surrounding Central Florida communities. If you are nearby, give us a call and we will let you know.',
    },
    {
      q: 'Do you do the work yourselves?',
      a: 'Yes. Our own crew and our own equipment, start to finish. We do not subcontract your project out to strangers.',
    },
  ]

  const differentiators = [
    { title: 'Heavy Equipment Ready', desc: 'We own our machines. No rental delays, no excuses.' },
    { title: 'ISA Certified Arborist on Every Job', desc: 'Expert tree assessment and environmentally responsible clearing.' },
    { title: 'Licensed & Insured', desc: 'Full liability coverage. Your property and our crew are protected.' },
    { title: 'No Subcontractors', desc: 'Our crew, start to finish. You know who is on your property.' },
    { title: 'Free Estimates, Honest Pricing', desc: 'We walk your property, give you a real number, and stick to it.' },
    { title: `Est. ${EST_YEAR} - Proven Track Record`, desc: 'Years of heavy site work across Central Florida. We have done this before.' },
  ]

  const galleryImages = [
    { src: IMAGES.site1, alt: 'Land clearing project in DeLand FL' },
    { src: IMAGES.site4, alt: 'Excavation and grading work' },
    { src: IMAGES.site7, alt: 'Site preparation for construction' },
    { src: IMAGES.site8, alt: 'Heavy equipment on job site' },
    { src: IMAGES.site9, alt: 'Completed site work project' },
    { src: IMAGES.site10, alt: 'Land cleared and graded' },
  ]

  return (
    <div className="min-h-screen bg-[#1a1c1a] text-white font-sans">

      {/* ── Breadcrumb ── */}
      <nav className="bg-[#0d0f0d] py-3 px-4">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#c2a878] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-[#c2a878] transition-colors">Services</Link>
          <span>/</span>
          <span className="text-[#c2a878]">Site Work</span>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════
          1. HERO SECTION
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        <img
          src={IMAGES.site1}
          alt="Professional land clearing and site work in DeLand Florida"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-28">
          <p className="text-[#c2a878] font-display uppercase tracking-[0.2em] text-sm mb-4">
            {COMPANY} &mdash; {siteService.tagline}
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide leading-tight max-w-3xl">
            Clear Your Land.<br />Build Your Vision.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
            From single residential lots to hundred-acre commercial parcels &mdash; we bring the
            heavy equipment and expertise to get your land ready for what&rsquo;s next.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#4a7c59] hover:bg-[#3d6a4b] text-white font-display uppercase font-bold tracking-wider px-8 py-4 text-lg transition-colors"
            >
              Get My Free Site Estimate
            </Link>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-[#c2a878] text-white font-display uppercase font-bold tracking-wider px-8 py-4 text-lg transition-colors"
            >
              <PhoneIcon />
              Or Call {PHONE}
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <GreenCheck />
              <span>ISA Certified</span>
            </span>
            <span className="flex items-center gap-1.5">
              <GreenCheck />
              <span>Licensed &amp; Insured</span>
            </span>
            <span className="flex items-center gap-1.5">
              <GreenCheck />
              <span>Est. {EST_YEAR}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <StarIcon />
              <span className="text-[#c2a878] font-bold">{REVIEW_STATS.stars} Stars</span>
              <span>({REVIEW_STATS.count} reviews)</span>
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. PROBLEM / PAIN SECTION
          ═══════════════════════════════════════════ */}
      <section className="bg-[#141614] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#c2a878] font-display uppercase tracking-[0.2em] text-sm mb-3 text-center">
            Common Challenges
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center mb-4">
            Is Your Property Holding You Back?
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-14">
            Whether you&rsquo;re a homeowner, developer, or rancher, these problems don&rsquo;t solve themselves.
            The longer you wait, the worse they get.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {painPoints.map((p, i) => (
              <Link key={i} href={p.href} className="group flex gap-5 bg-[#1a1c1a] p-6 rounded-sm border border-white/5 hover:border-[#4a7c59]/40 transition-all duration-300">
                <div className="shrink-0">{p.icon}</div>
                <div>
                  <h3 className="font-display text-lg font-bold uppercase mb-2 group-hover:text-[#4a7c59] transition-colors">{p.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm mb-3">{p.desc}</p>
                  <span className="inline-flex items-center gap-1 text-[#4a7c59] text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#4a7c59] hover:bg-[#3d6a4b] text-white font-display uppercase font-bold tracking-wider px-8 py-4 transition-colors"
            >
              Get My Free Site Estimate
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. SERVICES DETAIL SECTION
          ═══════════════════════════════════════════ */}
      <section className="bg-[#1a1c1a] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#c2a878] font-display uppercase tracking-[0.2em] text-sm mb-3">
            What We Do
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase mb-14">
            Site Work Services
          </h2>

          <div className="space-y-16">
            {siteService.items.map((item, i) => (
              <div
                key={item.name}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
              >
                {/* Image */}
                <div className="md:w-1/2">
                  <div className="relative overflow-hidden">
                    <img
                      src={SERVICE_IMAGES[i]}
                      alt={item.name}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-[#4a7c59] px-3 py-1">
                      <span className="font-display text-sm font-bold uppercase tracking-wider">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div className="md:w-1/2">
                  <h3 className="font-display text-2xl font-bold uppercase mb-3">{item.name}</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">{item.desc}</p>
                  <p className="text-gray-400 leading-relaxed text-sm border-l-2 border-[#4a7c59] pl-4 mb-6">
                    {SERVICE_BENEFITS[item.name]}
                  </p>
                  <Link
                    href={SERVICE_SLUGS[i]}
                    className="inline-flex items-center gap-2 text-[#4a7c59] font-semibold uppercase tracking-wider text-sm hover:gap-3 transition-all"
                  >
                    Learn More About {item.name}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. PROCESS SECTION
          ═══════════════════════════════════════════ */}
      <section className="bg-[#0d0f0d] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#c2a878] font-display uppercase tracking-[0.2em] text-sm mb-3 text-center">
            Simple Process
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 text-center max-w-xl mx-auto mb-14">
            No runaround. No surprises. Here&rsquo;s how we get your land ready.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Call or Request an Estimate',
                desc: 'Tell us about your project. We will discuss the scope and schedule a site visit.',
              },
              {
                step: 2,
                title: 'We Walk Your Property',
                desc: 'Free on-site assessment. Honest pricing. No pressure, no obligations.',
              },
              {
                step: 3,
                title: 'We Get to Work',
                desc: 'Our crew brings the iron and gets it done right, on time, and on budget.',
              },
              {
                step: 4,
                title: 'Your Land, Ready',
                desc: 'Site cleared, graded, and ready for the next phase of your project.',
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="flex justify-center mb-4">
                  <StepNumber n={s.step} />
                </div>
                <h3 className="font-display text-lg font-bold uppercase mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#4a7c59] hover:bg-[#3d6a4b] text-white font-display uppercase font-bold tracking-wider px-8 py-4 transition-colors"
            >
              Get My Free Site Estimate
            </Link>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-[#c2a878] text-white font-display uppercase font-bold tracking-wider px-8 py-4 transition-colors"
            >
              <PhoneIcon />
              {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. WHY CHOOSE US
          ═══════════════════════════════════════════ */}
      <section className="bg-[#141614] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#c2a878] font-display uppercase tracking-[0.2em] text-sm mb-3 text-center">
            The {COMPANY} Difference
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center mb-14">
            Why Choose Us
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((d, i) => (
              <div key={i} className="flex gap-4 items-start bg-[#1a1c1a] p-6 border border-white/5">
                <GreenCheck />
                <div>
                  <h3 className="font-display font-bold uppercase mb-1">{d.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. SOCIAL PROOF / REVIEWS
          ═══════════════════════════════════════════ */}
      <section className="bg-[#1a1c1a] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Star rating header */}
          <div className="text-center mb-14">
            <div className="flex justify-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
            <p className="font-display text-5xl font-bold text-[#c2a878] mb-2">
              {REVIEW_STATS.stars}
            </p>
            <p className="text-gray-400">
              {REVIEW_STATS.count} Verified Google Reviews
            </p>
          </div>

          {/* Review cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-[#141614] border border-white/5 p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <StarIcon key={j} />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed text-sm mb-4">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#4a7c59] flex items-center justify-center font-display font-bold text-sm">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{r.name}</p>
                    <p className="text-gray-500 text-xs">{r.source} Review</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. GALLERY STRIP
          ═══════════════════════════════════════════ */}
      <section className="bg-[#0d0f0d] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[#c2a878] font-display uppercase tracking-[0.2em] text-sm mb-6 text-center">
            Recent Projects
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {galleryImages.map((img, i) => (
              <div key={i} className="aspect-square overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          8. FAQ SECTION
          ═══════════════════════════════════════════ */}
      <section className="bg-[#141614] py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#c2a878] font-display uppercase tracking-[0.2em] text-sm mb-3 text-center">
            Common Questions
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="divide-y divide-white/10 border-t border-white/10">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-400 mb-4">Have a question that isn&rsquo;t listed here?</p>
            <a
              href={PHONE_HREF}
              className="text-[#4a7c59] font-display font-bold uppercase hover:text-[#c2a878] transition-colors"
            >
              Call us at {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          9. FINAL CTA SECTION
          ═══════════════════════════════════════════ */}
      <section className="relative py-24 px-4 overflow-hidden">
        <img
          src={IMAGES.site8}
          alt="Site work in progress"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase mb-4">
            Ready to Clear Your Land?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
            Free estimates. No pressure. Just honest pricing from a local crew that does the work themselves.
          </p>

          {/* Phone prominent */}
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-3 text-3xl md:text-4xl font-display font-bold text-[#c2a878] hover:text-white transition-colors mb-8"
          >
            <PhoneIcon />
            {PHONE}
          </a>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#4a7c59] hover:bg-[#3d6a4b] text-white font-display uppercase font-bold tracking-wider px-10 py-4 text-lg transition-colors"
            >
              Get My Free Estimate
            </Link>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center border-2 border-white/30 hover:border-[#c2a878] text-white font-display uppercase font-bold tracking-wider px-10 py-4 text-lg transition-colors"
            >
              Email {EMAIL}
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICE AREAS
          ═══════════════════════════════════════════ */}
      <ServiceAreaLinks service="site" />

      {/* ═══════════════════════════════════════════
          OTHER SERVICES + FOOTER LINKS
          ═══════════════════════════════════════════ */}
      <section className="bg-[#0d0f0d] py-10 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm mb-3 font-display uppercase tracking-widest">
            Other Services
          </p>
          <div className="flex justify-center gap-6">
            <Link
              href="/services/tree-services"
              className="text-[#c2a878] hover:text-white font-display font-bold uppercase tracking-wider transition-colors"
            >
              Tree Services
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              href="/services/fencing"
              className="text-[#c2a878] hover:text-white font-display font-bold uppercase tracking-wider transition-colors"
            >
              Fencing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
