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
  CERTS,
  EST_YEAR,
  FULL_SERVICES,
} from '@/shared/constants'

/* ─────────────────────────────────────────────
   ALUMINUM FENCING LANDING PAGE — Ironclad Theme
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
    q: 'How much does aluminum fencing cost?',
    a: 'Aluminum fencing is a mid-range option — more affordable than wrought iron but higher than basic wood. The exact cost depends on height, style, and total footage. We provide a free on-site estimate with a clear breakdown so there are no surprises.',
  },
  {
    q: 'Does aluminum fencing meet Florida pool code requirements?',
    a: 'Yes. We install aluminum fencing that meets Florida\'s pool barrier code, including the required 48-inch minimum height, maximum 4-inch picket spacing, and self-closing/self-latching gate hardware. We ensure your installation passes inspection.',
  },
  {
    q: 'What color options are available for aluminum fencing?',
    a: 'Aluminum fencing comes in black, bronze, white, and several other powder-coated finishes. Black is the most popular for its classic, elegant appearance. All colors are applied with a durable powder coating that resists chipping, peeling, and fading.',
  },
  {
    q: 'How does aluminum compare to wrought iron fencing?',
    a: 'Aluminum gives you the same elegant look as wrought iron at a fraction of the cost and weight — and it never rusts. Wrought iron requires regular painting and rust treatment, while aluminum is virtually maintenance-free in Florida\'s coastal climate.',
  },
  {
    q: 'Will aluminum fencing work with my HOA requirements?',
    a: 'Aluminum fencing is one of the most HOA-friendly options available. Its clean, professional look meets the aesthetic standards of most communities. We can work with your HOA\'s specific guidelines on height, style, and color to ensure approval.',
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
          <span className="text-[#c2a878]">Aluminum Fencing</span>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.fence1})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f0d]/95 via-[#0d0f0d]/80 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 w-full">
          <div className="max-w-2xl">
            {/* Trust badges */}
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
              Aluminum Fence Installation in DeLand, FL
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Elegant, durable aluminum fencing for estates, pools, and residential/commercial communities.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#4a7c59] hover:bg-[#3d6749] text-white font-display uppercase tracking-wider px-8 py-4 rounded transition-colors text-sm font-bold">
                Get My Aluminum Fence Estimate
              </Link>
              <a href={PHONE_HREF} className="inline-flex items-center gap-2 border-2 border-[#c2a878] text-[#c2a878] hover:bg-[#c2a878]/10 font-display uppercase tracking-wider px-8 py-4 rounded transition-colors text-sm font-bold">
                <PhoneIcon /> {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pain Points ── */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center text-white mb-4">
            Need Security Without Blocking the View?
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            If any of these describe your property, aluminum fencing is the answer.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Pool Safety', desc: 'Florida law requires a barrier around your pool. You need code-compliant fencing that passes inspection.' },
              { title: 'Elegant Aesthetic', desc: 'You want a fence that enhances your property\'s appearance — not a solid wall that makes it feel closed in.' },
              { title: 'HOA Requirements', desc: 'Your community has specific fence standards. You need an option that looks professional and meets the rules.' },
              { title: 'Security + Visibility', desc: 'You want to keep people out and pets in — without blocking sight lines, breezes, or natural light.' },
            ].map((item, i) => (
              <div key={i} className="bg-[#1a1c1a] border border-white/5 rounded-lg p-6 hover:border-[#4a7c59]/30 transition-colors">
                <div className="w-12 h-12 bg-[#4a7c59]/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#4a7c59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-bold uppercase text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Install ── */}
      <section className="bg-[#1a1c1a] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white mb-6">
                Aluminum Fencing for Every Application
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                From estate perimeters to pool enclosures, our aluminum fencing combines security with sophistication. Every installation is powder-coated, rust-proof, and built to meet Florida building codes.
              </p>
              <ul className="space-y-4">
                {[
                  'Estate and residential perimeter fencing',
                  'Pool enclosures meeting Florida barrier code (48" min, 4" spacing)',
                  'Residential community and subdivision fencing',
                  'Commercial property security fencing',
                  'Self-closing, self-latching gates with heavy-duty hardware',
                  'Decorative finials, rings, and scrollwork options',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <GreenCheck />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src={IMAGES.fence1} alt="Aluminum fence around estate" className="rounded-lg w-full h-48 object-cover" />
              <img src={IMAGES.fence2} alt="Aluminum pool fence installation" className="rounded-lg w-full h-48 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="bg-[#0d0f0d] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center text-white mb-12">
            Why Aluminum Stands Above the Rest
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { title: 'No Rust', desc: 'Aluminum doesn\'t corrode — even in Florida\'s salt air and humidity. No rust stains, no flaking.' },
              { title: 'Elegant Look', desc: 'Classic picket profiles and finial options give your property an upscale, timeless appearance.' },
              { title: 'Pool Code', desc: 'Meets Florida pool barrier requirements out of the box — proper height, spacing, and gate hardware.' },
              { title: 'Low Maintenance', desc: 'Powder-coated finish lasts for years. No painting, no staining — just an occasional rinse.' },
              { title: 'See-Through Security', desc: 'Keeps your property secure while preserving sight lines, breezes, and open feel.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-[#4a7c59]/10 border border-[#4a7c59]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-[#4a7c59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-display text-lg font-bold uppercase text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center text-white mb-4">
            How It Works
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">From consultation to final inspection.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Call', desc: 'Describe your property and goals — pool fence, estate perimeter, community fencing — and we\'ll schedule a visit.' },
              { step: 2, title: 'Design', desc: 'We measure, review codes and HOA requirements, select the right style and height, and present your quote.' },
              { step: 3, title: 'Install', desc: 'Posts set in concrete, panels secured, gates hung with self-closing hardware — clean, efficient work.' },
              { step: 4, title: 'Inspect', desc: 'We walk the finished fence with you, test every gate, and confirm the installation meets code and your standards.' },
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
            <p className="text-gray-400">Trusted by property owners across Central Florida.</p>
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
            Aluminum Fencing FAQs
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
            Get a Premium Fence Without the Premium Hassle
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Free on-site estimate for aluminum fencing. We handle design, permitting, installation, and inspection — you just enjoy the result.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#4a7c59] hover:bg-[#3d6749] text-white font-display uppercase tracking-wider px-8 py-4 rounded transition-colors text-sm font-bold">
              Get My Aluminum Fence Estimate
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
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Link href="/services/fencing/wood-fencing" className="group bg-[#141614] border border-white/5 rounded-lg overflow-hidden hover:border-[#4a7c59]/40 transition-colors">
              <img src={IMAGES.fence5} alt="Wood fence installation" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-5">
                <h3 className="font-display text-lg font-bold uppercase text-white mb-1">Wood Fencing</h3>
                <p className="text-gray-400 text-sm">Affordable board, privacy, and horse fencing for Florida properties.</p>
              </div>
            </Link>
            <Link href="/services/fencing/vinyl-fencing" className="group bg-[#141614] border border-white/5 rounded-lg overflow-hidden hover:border-[#4a7c59]/40 transition-colors">
              <img src={IMAGES.fence7} alt="Vinyl fence installation" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-5">
                <h3 className="font-display text-lg font-bold uppercase text-white mb-1">Vinyl Fencing</h3>
                <p className="text-gray-400 text-sm">Zero maintenance privacy and picket fencing that never needs painting.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
