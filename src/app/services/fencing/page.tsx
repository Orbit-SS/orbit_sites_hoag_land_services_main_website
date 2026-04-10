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
   FENCING SERVICES LANDING PAGE — Ironclad Theme
   Dark bg (#1a1c1a, #141614, #0d0f0d)
   Forest green accent (#4a7c59), warm tan (#c2a878)
   ───────────────────────────────────────────── */

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

function GreenCheck() {
  return (
    <svg className="w-6 h-6 text-[#4a7c59] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

function StepNumber({ n }: { n: number }) {
  return (
    <div className="w-14 h-14 rounded-full border-2 border-[#4a7c59] flex items-center justify-center shrink-0">
      <span className="font-display text-xl font-bold text-[#4a7c59]">{n}</span>
    </div>
  )
}

/* ── Pain Point Icons ── */

function NoPrivacyIcon() {
  return (
    <svg className="w-8 h-8 text-[#4a7c59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  )
}

function ContainmentIcon() {
  return (
    <svg className="w-8 h-8 text-[#4a7c59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  )
}

function BrokenFenceIcon() {
  return (
    <svg className="w-8 h-8 text-[#4a7c59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )
}

function PropertyLineIcon() {
  return (
    <svg className="w-8 h-8 text-[#4a7c59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  )
}

/* ── Why Choose Us Icons ── */

function ClearLineIcon() {
  return (
    <svg className="w-10 h-10 text-[#4a7c59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" />
    </svg>
  )
}

function BuildFenceIcon() {
  return (
    <svg className="w-10 h-10 text-[#4a7c59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg className="w-10 h-10 text-[#4a7c59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48 pb-5' : 'max-h-0'}`}
      >
        <p className="text-gray-400 leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

/* ── Service benefit mapping ── */

const SERVICE_BENEFITS: Record<string, string> = {
  'Wood Fencing':
    'From classic board fencing to heavy-duty barbed wire and horse fence, wood remains the most versatile and cost-effective material for Central Florida properties. We build it to last in our climate.',
  'Vinyl Fencing':
    'Zero maintenance, no painting, no rotting. Vinyl fencing holds up against Florida humidity and UV exposure while keeping a clean, consistent look year after year.',
  'Aluminum Fencing':
    'Elegant and durable, aluminum fencing is ideal for pool enclosures, estate perimeters, and HOA communities. It provides security without blocking your view or curb appeal.',
}

/* ── Service images ── */

const SERVICE_IMAGES = [IMAGES.fence3, IMAGES.fence6, IMAGES.fence7]

const SERVICE_SLUGS = [
  '/services/fencing/wood-fencing',
  '/services/fencing/vinyl-fencing',
  '/services/fencing/aluminum-fencing',
]

/* ── Main Page Component ── */

export default function Page() {
  const fenceService = FULL_SERVICES.fence

  const painPoints = [
    {
      icon: <NoPrivacyIcon />,
      title: 'No Privacy from Neighbors',
      desc: 'Your backyard feels like a fishbowl. Every cookout, every conversation, every moment in your own yard is on display. A proper fence gives you your space back.',
      href: '/services/fencing/privacy-fencing',
    },
    {
      icon: <ContainmentIcon />,
      title: 'Livestock or Pets Need Containment',
      desc: 'Horses pushing through old wire. Dogs slipping under gaps. Without reliable fencing, your animals are at risk every single day.',
      href: '/services/fencing/livestock-containment',
    },
    {
      icon: <BrokenFenceIcon />,
      title: 'Old Fence Falling Apart',
      desc: 'Rotting posts, leaning panels, missing boards. A deteriorating fence does not just look bad — it fails at the one job it was built to do.',
      href: '/services/fencing/fence-replacement',
    },
    {
      icon: <PropertyLineIcon />,
      title: 'Property Line Needs Definition',
      desc: 'Unclear boundaries cause neighbor disputes, encroachment issues, and headaches when you sell. A fence draws the line — literally.',
      href: '/services/fencing/property-boundary',
    },
  ]

  const faqs = [
    {
      q: 'How much does fencing cost?',
      a: 'Fencing costs depend on the material, length, terrain, and any line clearing needed. Wood fencing is typically the most affordable, vinyl is mid-range, and aluminum varies based on style. We provide free on-site estimates with straightforward pricing.',
    },
    {
      q: 'How long does fence installation take?',
      a: 'Most residential fence projects are completed in 1 to 3 days depending on the length and terrain. Larger acreage or properties requiring brush clearing may take longer. We give you a realistic timeline during your estimate.',
    },
    {
      q: 'What fence material is best for my property?',
      a: 'It depends on your goals. Wood is versatile and cost-effective for farms and privacy. Vinyl is low-maintenance and ideal for residential yards. Aluminum is great for pool areas and estates. We help you choose the right material during your site visit.',
    },
    {
      q: 'Do I need a permit for a fence?',
      a: 'Some areas in Volusia County require permits for fencing, especially in subdivisions or near waterways. We can advise you on local requirements and help guide you through the process.',
    },
    {
      q: 'Do you clear the fence line before installation?',
      a: 'Yes. This is one of our biggest advantages. Most fence companies require you to have a clear line before they start. We clear brush, trees, and debris ourselves — so you get one crew, one project, one bill.',
    },
    {
      q: 'What areas do you serve?',
      a: 'DeLand, DeLeon Springs, Orange City, Deltona, and surrounding Central Florida communities. If you are nearby, give us a call and we will let you know if we can serve your area.',
    },
  ]

  const galleryImages = [
    { src: IMAGES.fence5, alt: 'Professional fence installation DeLand FL' },
    { src: IMAGES.fence3, alt: 'Wood fencing project Central Florida' },
    { src: IMAGES.fence6, alt: 'Vinyl fencing installation' },
    { src: IMAGES.fence7, alt: 'Aluminum fencing for residential property' },
    { src: IMAGES.fence8, alt: 'Farm and pasture fencing' },
    { src: IMAGES.fence1, alt: 'Completed fencing project' },
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
          <span className="text-[#c2a878]">Fencing</span>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════
          1. HERO SECTION
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        <img
          src={IMAGES.fence5}
          alt="Professional fencing services in DeLand Florida"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-28">
          <p className="text-[#c2a878] font-display uppercase tracking-[0.2em] text-sm mb-4">
            {COMPANY} &mdash; Fencing Services
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide leading-tight max-w-3xl">
            The Right Fence.<br />Built Right the First Time.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
            Wood, vinyl, and aluminum fencing for homes, farms, and commercial
            properties across Central Florida.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#4a7c59] hover:bg-[#3d6a4b] text-white font-display uppercase font-bold tracking-wider px-8 py-4 text-lg transition-colors"
            >
              Get My Free Fence Estimate
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
            Common Problems
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center mb-4">
            Your Property Deserves Better Boundaries
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-14">
            Whether it&rsquo;s privacy, safety, or property value &mdash; the right fence
            solves problems that get worse the longer you wait.
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
              Get My Free Fence Estimate
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
            What We Build
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase mb-14">
            Fencing Services
          </h2>

          <div className="space-y-16">
            {fenceService.items.map((item, i) => (
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
            No runaround. No surprises. Here&rsquo;s how we handle your fence project from
            start to finish.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Call or Request an Estimate',
                desc: 'Tell us about your property and what you need. We will discuss the scope and schedule a time to walk your fence line.',
              },
              {
                step: 2,
                title: 'Site Visit & Measurement',
                desc: 'We walk the property, measure the fence line, evaluate terrain, and discuss the best material and layout for your needs.',
              },
              {
                step: 3,
                title: 'Clear Quote — No Hidden Fees',
                desc: 'You get an honest, itemized quote that includes line clearing if needed. You approve before we start any work.',
              },
              {
                step: 4,
                title: 'We Build Your Fence',
                desc: 'We clear the line, set posts, and build your fence right. One crew handles everything — no subcontractors, no delays.',
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
              Get My Free Fence Estimate
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
          5. WHY CHOOSE US — UNIQUE DIFFERENTIATOR
          ═══════════════════════════════════════════ */}
      <section className="bg-[#141614] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left — content */}
            <div>
              <p className="text-[#c2a878] font-display uppercase tracking-[0.2em] text-sm mb-3">
                Our Advantage
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase mb-6">
                We Clear the Line AND Build the Fence
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Most fence companies show up, look at your overgrown property line, and tell
                you to call someone else to clear it first. That means two companies, two
                schedules, and two bills. We do it all.
              </p>

              <div className="space-y-5">
                <div className="flex gap-4 items-start">
                  <ClearLineIcon />
                  <div>
                    <h3 className="font-display font-bold uppercase mb-1">Line Clearing Included</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Brush, trees, stumps, and debris on your fence line? We clear it ourselves with
                      our own equipment. No waiting on a second contractor.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <BuildFenceIcon />
                  <div>
                    <h3 className="font-display font-bold uppercase mb-1">One Crew, Start to Finish</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      From site work and clearing to post-setting and final build, one team handles
                      your entire project. No handoffs, no miscommunication.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <ShieldIcon />
                  <div>
                    <h3 className="font-display font-bold uppercase mb-1">Land Services Expertise</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      We are a land services company first. We understand terrain, drainage, and
                      property lines &mdash; not just fence panels. That knowledge shows in every build.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — image + stats */}
            <div>
              <div className="relative overflow-hidden mb-6">
                <img
                  src={IMAGES.fence8}
                  alt="Fence line clearing and installation by Hoag Land Services"
                  className="w-full h-80 md:h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-display text-2xl font-bold uppercase text-[#c2a878]">
                    Full-Service Fencing
                  </p>
                  <p className="text-gray-300 text-sm mt-1">Clear, build, and finish &mdash; all in-house</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#1a1c1a] border border-white/5 p-4 text-center">
                  <p className="font-display text-2xl font-bold text-[#4a7c59]">{new Date().getFullYear() - EST_YEAR}+</p>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mt-1">Years</p>
                </div>
                <div className="bg-[#1a1c1a] border border-white/5 p-4 text-center">
                  <p className="font-display text-2xl font-bold text-[#4a7c59]">{REVIEW_STATS.stars}</p>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mt-1">Star Rating</p>
                </div>
                <div className="bg-[#1a1c1a] border border-white/5 p-4 text-center">
                  <p className="font-display text-2xl font-bold text-[#4a7c59]">3</p>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mt-1">Materials</p>
                </div>
              </div>
            </div>
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
            Recent Fence Projects
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
            Fencing FAQ
          </h2>
          <div>
            {faqs.map((f, i) => (
              <FAQItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          9. FINAL CTA
          ═══════════════════════════════════════════ */}
      <section className="bg-[#1a1c1a] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase mb-6">
            Ready for Your New Fence?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Tell us about your property and we will walk the line, give you a clear quote,
            and build it right. No pressure, no obligation &mdash; just honest work.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#4a7c59] hover:bg-[#3d6a4b] text-white font-display uppercase font-bold tracking-wider px-10 py-5 text-lg transition-colors"
            >
              Get My Free Fence Estimate
            </Link>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-[#c2a878] text-white font-display uppercase font-bold tracking-wider px-10 py-5 text-lg transition-colors"
            >
              <PhoneIcon />
              {PHONE}
            </a>
          </div>

          <p className="text-gray-500 text-sm">
            Or email us at{' '}
            <a href={`mailto:${EMAIL}`} className="text-[#c2a878] hover:underline">
              {EMAIL}
            </a>
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CROSS-LINKS TO OTHER SERVICES
          ═══════════════════════════════════════════ */}
      <section className="bg-[#0d0f0d] py-16 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#c2a878] font-display uppercase tracking-[0.2em] text-sm mb-6 text-center">
            More Services
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Site Work */}
            <Link
              href="/services/site-work"
              className="group bg-[#141614] border border-white/5 hover:border-[#4a7c59]/50 p-6 flex gap-5 items-center transition-colors"
            >
              <div className="w-20 h-20 shrink-0 overflow-hidden">
                <img
                  src={IMAGES.site7}
                  alt="Site work services"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold uppercase mb-1 group-hover:text-[#4a7c59] transition-colors">
                  Site Work
                </h3>
                <p className="text-gray-400 text-sm">
                  Land clearing, grading, driveways, and drainage for residential and commercial properties.
                </p>
              </div>
            </Link>

            {/* Tree Services */}
            <Link
              href="/services/tree-services"
              className="group bg-[#141614] border border-white/5 hover:border-[#4a7c59]/50 p-6 flex gap-5 items-center transition-colors"
            >
              <div className="w-20 h-20 shrink-0 overflow-hidden">
                <img
                  src={IMAGES.tree5}
                  alt="Tree services"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold uppercase mb-1 group-hover:text-[#4a7c59] transition-colors">
                  Tree Services
                </h3>
                <p className="text-gray-400 text-sm">
                  ISA Certified tree removal, trimming, palm pruning, and installation.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <ServiceAreaLinks service="fence" />
    </div>
  )
}
