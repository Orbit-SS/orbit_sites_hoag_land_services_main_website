'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  IMAGES,
  PHONE,
  PHONE_HREF,
  EMAIL,
  COMPANY,
  REVIEWS,
  REVIEW_STATS,
  EST_YEAR,
} from '@/shared/constants'

/* ─────────────────────────────────────────────
   PRIVACY FENCING LANDING PAGE — Ironclad Theme
   ───────────────────────────────────────────── */

function StarIcon() {
  return (
    <svg className="w-5 h-5 text-[#c2a878]" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg className={`w-5 h-5 text-[#4a7c59] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

const FAQS = [
  {
    q: 'Is wood or vinyl better for a privacy fence?',
    a: 'Both work well for privacy. Wood is more affordable upfront and offers a natural look that suits Florida properties. Vinyl costs more initially but requires zero maintenance and never rots. We install both and can help you decide based on your budget and preferences.',
  },
  {
    q: 'How much does a privacy fence cost in Central Florida?',
    a: 'Privacy fence pricing depends on linear footage, material (wood or vinyl), height, terrain, and gate requirements. We provide free on-site estimates with transparent pricing so you know exactly what to expect before we start.',
  },
  {
    q: 'Are there height restrictions for privacy fences in Volusia County?',
    a: 'Most residential areas in Volusia County allow 6-foot fences in rear and side yards. Front yard fencing is typically limited to 4 feet. We handle permitting and know the local codes, so your fence will be compliant from day one.',
  },
  {
    q: 'Will my HOA allow a privacy fence?',
    a: 'Many HOAs have specific requirements for fence style, material, and color. We work with HOA guidelines regularly and can help you choose an option that meets your association\'s rules while still giving you the privacy you need.',
  },
  {
    q: 'How long does it take to install a privacy fence?',
    a: 'Most residential privacy fence installations take 1-3 days depending on the total footage and terrain. We clear the fence line, set posts in concrete, and build the panels on site. You\'ll have a timeline before we start.',
  },
]

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main className="bg-[#1a1c1a] text-gray-100">
      {/* ── Breadcrumb ── */}
      <nav className="bg-[#0d0f0d] border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center gap-1 text-sm text-gray-400">
          <Link href="/" className="hover:text-[#c2a878] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-[#c2a878] transition-colors">Services</Link>
          <span>/</span>
          <Link href="/services/fencing" className="hover:text-[#c2a878] transition-colors">Fencing</Link>
          <span>/</span>
          <span className="text-[#c2a878]">Privacy Fencing</span>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.fence5})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f0d]/95 via-[#0d0f0d]/80 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 w-full">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-[#4a7c59]/20 border border-[#4a7c59]/40 text-[#4a7c59] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded">
                Licensed & Insured
              </span>
              <span className="bg-[#c2a878]/20 border border-[#c2a878]/40 text-[#c2a878] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded">
                Est. {EST_YEAR}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-300">
                <StarIcon /> {REVIEW_STATS.stars} ({REVIEW_STATS.count} reviews)
              </span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-[1.1] text-white mb-4">
              Need Privacy? We Build Fences That Block It All.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Wood and vinyl privacy fencing for DeLand, DeLeon Springs, and Central Florida properties. Solid panels, custom gates, and full fence line clearing included.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#4a7c59] hover:bg-[#3d6749] text-white font-display uppercase tracking-wider px-8 py-4 rounded transition-colors text-sm font-bold">
                Get My Privacy Fence Estimate
              </Link>
              <a href={PHONE_HREF} className="inline-flex items-center gap-2 border-2 border-[#c2a878] text-[#c2a878] hover:bg-[#c2a878]/10 font-display uppercase tracking-wider px-8 py-4 rounded transition-colors text-sm font-bold">
                <PhoneIcon /> {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem Deep-Dive ── */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center text-white mb-4">
            Your Backyard Should Be Yours
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            If any of these sound familiar, a privacy fence is the fix.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Neighbors Can See Everything', desc: 'Every time you step outside, you feel like you\'re being watched. There\'s zero separation between your yard and theirs.' },
              { title: 'No Backyard Privacy', desc: 'You can\'t relax, grill, or let the kids play without feeling exposed to the street or neighboring properties.' },
              { title: 'Street Noise & Traffic', desc: 'A solid fence creates a sound barrier between your outdoor living space and busy roads or loud neighbors.' },
              { title: 'Want a Private Outdoor Space', desc: 'You want a backyard that actually feels like an extension of your home — enclosed, secure, and peaceful.' },
            ].map((item, i) => (
              <div key={i} className="bg-[#1a1c1a] border border-white/5 rounded-lg p-6 hover:border-[#4a7c59]/30 transition-colors">
                <div className="w-12 h-12 bg-[#4a7c59]/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#4a7c59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-bold uppercase text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Solution ── */}
      <section className="bg-[#1a1c1a] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white mb-6">
                Privacy Fencing That Actually Works
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                We build wood and vinyl privacy fences designed to completely block the view. Six-foot minimum height, solid panels with no gaps, and custom gate options. Before we build, we clear the fence line so your new fence sits clean and straight.
              </p>
              <ul className="space-y-4">
                {[
                  'Solid wood privacy panels — 6ft and 8ft options',
                  'Vinyl privacy fencing — zero maintenance, never rots',
                  'Custom gate installation for driveways and side yards',
                  'Full fence line clearing before installation',
                  'Posts set in concrete for Florida storm resistance',
                  'Permitting handled for Volusia County and surrounding areas',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <GreenCheck />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src={IMAGES.fence7} alt="Privacy fence installation" className="rounded-lg w-full h-48 object-cover" />
              <img src={IMAGES.fence9} alt="Solid panel privacy fencing" className="rounded-lg w-full h-48 object-cover" />
              <img src={IMAGES.fence5} alt="Completed privacy fence project" className="rounded-lg w-full h-48 object-cover col-span-2" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center text-white mb-4">
            How We Build Your Privacy Fence
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">Four steps from first call to total privacy.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Call Us', desc: 'Tell us about your property and what you need screened off. We\'ll ask a few quick questions to prepare.' },
              { step: 2, title: 'Site Visit', desc: 'We walk the property, measure the fence line, discuss wood vs vinyl, and give you a written estimate on the spot.' },
              { step: 3, title: 'Clear & Build', desc: 'We clear the fence line, set posts in concrete, and build your privacy fence — typically completed in 1-3 days.' },
              { step: 4, title: 'Final Walk', desc: 'We inspect every panel and gate with you to make sure the fence is straight, solid, and exactly what you wanted.' },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <StepNumber n={item.step} />
                <h3 className="font-display text-lg font-bold uppercase text-white mt-4 mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social Proof ── */}
      <section className="bg-[#1a1c1a] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white mb-2">
              {REVIEW_STATS.stars} Stars — {REVIEW_STATS.count} Google Reviews
            </h2>
            <p className="text-gray-400">Real reviews from real Central Florida property owners.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((review, i) => (
              <div key={i} className="bg-[#141614] border border-white/5 rounded-lg p-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => <StarIcon key={j} />)}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
                <p className="text-[#c2a878] font-bold text-sm">{review.name}</p>
                <p className="text-gray-500 text-xs">{review.source} Review</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-[#0d0f0d] py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center text-white mb-12">
            Privacy Fencing FAQs
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-white/5 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-bold text-white text-sm">{faq.q}</span>
                  <ChevronDown open={openFaq === i} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white mb-4">
            Ready for Real Privacy?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Get a free on-site estimate. We&apos;ll walk your property, discuss your options, and give you an honest price — no pressure, no surprises.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#4a7c59] hover:bg-[#3d6749] text-white font-display uppercase tracking-wider px-8 py-4 rounded transition-colors text-sm font-bold">
              Get My Privacy Fence Estimate
            </Link>
            <a href={PHONE_HREF} className="inline-flex items-center gap-2 border-2 border-[#c2a878] text-[#c2a878] hover:bg-[#c2a878]/10 font-display uppercase tracking-wider px-8 py-4 rounded transition-colors text-sm font-bold">
              <PhoneIcon /> {PHONE}
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            Or email us directly at{' '}
            <a href={`mailto:${EMAIL}`} className="text-[#c2a878] hover:underline">{EMAIL}</a>
          </p>
        </div>
      </section>

      {/* ── Cross-Links ── */}
      <section className="bg-[#0d0f0d] border-t border-white/5 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-2xl font-bold uppercase text-center text-white mb-8">
            Explore Other Fencing Options
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Link href="/services/fencing/wood-fencing" className="group bg-[#141614] border border-white/5 rounded-lg overflow-hidden hover:border-[#4a7c59]/40 transition-colors">
              <img src={IMAGES.fence3} alt="Wood fence installation" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-5">
                <h3 className="font-display text-lg font-bold uppercase text-white mb-1">Wood Fencing</h3>
                <p className="text-gray-400 text-sm">Board, privacy, barbed wire, and horse fence built for Florida.</p>
              </div>
            </Link>
            <Link href="/services/fencing/vinyl-fencing" className="group bg-[#141614] border border-white/5 rounded-lg overflow-hidden hover:border-[#4a7c59]/40 transition-colors">
              <img src={IMAGES.fence7} alt="Vinyl fence installation" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-5">
                <h3 className="font-display text-lg font-bold uppercase text-white mb-1">Vinyl Fencing</h3>
                <p className="text-gray-400 text-sm">Zero maintenance privacy and picket fencing that never needs painting.</p>
              </div>
            </Link>
            <Link href="/services/fencing/fence-replacement" className="group bg-[#141614] border border-white/5 rounded-lg overflow-hidden hover:border-[#4a7c59]/40 transition-colors">
              <img src={IMAGES.fence6} alt="Fence replacement" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-5">
                <h3 className="font-display text-lg font-bold uppercase text-white mb-1">Fence Replacement</h3>
                <p className="text-gray-400 text-sm">Old fence falling apart? We remove it and build a better one.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
