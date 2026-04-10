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
   FENCE REPLACEMENT LANDING PAGE — Ironclad Theme
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
    q: 'Should I repair my fence or replace it entirely?',
    a: 'If more than 30% of the posts are rotted, the fence is leaning significantly, or the damage is spread across the full length, replacement is almost always the better investment. Patching a failing fence usually just delays the inevitable and costs more in the long run.',
  },
  {
    q: 'How much does fence replacement cost?',
    a: 'Replacement cost depends on total linear footage, material choice (wood, vinyl, or aluminum), terrain, and whether old fence removal is needed. We provide free on-site estimates so you get a clear, honest price before any work begins.',
  },
  {
    q: 'What happens to my old fence when you replace it?',
    a: 'We handle complete removal of the old fence including posts, rails, panels, and concrete footings. All debris is hauled away as part of the project. Your property is left clean and ready for the new fence.',
  },
  {
    q: 'How long does a full fence replacement take?',
    a: 'Most residential fence replacements are completed within 2-4 days. This includes removal of the old fence, post setting, and building the new one. We provide a timeline at your site visit so you know what to expect.',
  },
  {
    q: 'Can I upgrade to a different material when replacing my fence?',
    a: 'Absolutely. Many homeowners take advantage of replacement to upgrade from wood to vinyl, or from chain link to aluminum. We\'ll walk you through all the options and help you choose the best material for your property and budget.',
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
          <span className="text-[#c2a878]">Fence Replacement</span>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.fence6})` }} />
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
              Old Fence Falling Apart? We Replace It Right.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Full fence removal and replacement in DeLand, DeLeon Springs, and Central Florida. Upgrade your materials, fix it properly, and restore your property.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 bg-[#4a7c59] hover:bg-[#3d6749] text-white font-display uppercase tracking-wider px-8 py-4 rounded transition-colors text-sm font-bold">
                Get My Fence Replacement Estimate
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
            A Failing Fence Only Gets Worse
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            If your fence looks like this, patching it is just wasting money.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Rotting Posts', desc: 'Posts that have rotted at the base can\'t hold the fence up. Once they go, the whole section follows — and it happens faster in Florida\'s humidity.' },
              { title: 'Leaning & Sagging', desc: 'Panels are tilting, rails are pulling away from posts, and the whole fence line looks crooked. It\'s past the point of straightening.' },
              { title: 'Storm Damage', desc: 'Florida storms knock down sections, snap posts, and rip panels loose. A damaged fence rarely survives the next storm without full replacement.' },
              { title: 'Curb Appeal Killer', desc: 'A broken-down fence makes the entire property look neglected. It drags down your home\'s value and makes a bad first impression on anyone who sees it.' },
            ].map((item, i) => (
              <div key={i} className="bg-[#1a1c1a] border border-white/5 rounded-lg p-6 hover:border-[#4a7c59]/30 transition-colors">
                <div className="w-12 h-12 bg-[#4a7c59]/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#4a7c59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
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
                Complete Fence Removal & Replacement
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                We tear out the old fence — posts, concrete, and all — and build a new one from scratch. You pick the material and we handle everything from permitting to final inspection. This is your chance to upgrade.
              </p>
              <ul className="space-y-4">
                {[
                  'Full removal of old fence, posts, and concrete footings',
                  'All debris hauled away — your property left clean',
                  'Replace with wood, vinyl, or aluminum fencing',
                  'New posts set properly in concrete for long-term stability',
                  'Upgrade your material, height, or style during replacement',
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
              <img src={IMAGES.fence10} alt="Fence replacement project" className="rounded-lg w-full h-48 object-cover" />
              <img src={IMAGES.fence7} alt="New fence installation" className="rounded-lg w-full h-48 object-cover" />
              <img src={IMAGES.fence6} alt="Completed fence replacement" className="rounded-lg w-full h-48 object-cover col-span-2" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center text-white mb-4">
            How Fence Replacement Works
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">Four steps from old fence to new fence.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Call Us', desc: 'Tell us what\'s wrong with your current fence. We\'ll ask about the material, footage, and what you\'d like to replace it with.' },
              { step: 2, title: 'Site Visit', desc: 'We inspect the existing fence, assess the damage, take measurements, and give you a written estimate with material options.' },
              { step: 3, title: 'Remove & Rebuild', desc: 'We tear out the old fence completely, set new posts in concrete, and build your replacement fence from the ground up.' },
              { step: 4, title: 'Final Walk', desc: 'We walk the finished fence with you, check every post and gate, and make sure the property is clean and you\'re satisfied.' },
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
            Fence Replacement FAQs
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
            Ready to Replace That Old Fence?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Get a free on-site estimate. We&apos;ll inspect the damage, walk you through your options, and give you an honest price — no pressure, no surprises.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-[#4a7c59] hover:bg-[#3d6749] text-white font-display uppercase tracking-wider px-8 py-4 rounded transition-colors text-sm font-bold">
              Get My Fence Replacement Estimate
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
              <img src={IMAGES.fence5} alt="Wood fence installation" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
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
            <Link href="/services/fencing/aluminum-fencing" className="group bg-[#141614] border border-white/5 rounded-lg overflow-hidden hover:border-[#4a7c59]/40 transition-colors">
              <img src={IMAGES.fence1} alt="Aluminum fence installation" className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="p-5">
                <h3 className="font-display text-lg font-bold uppercase text-white mb-1">Aluminum Fencing</h3>
                <p className="text-gray-400 text-sm">Elegant, rust-free fencing for pools, estates, and communities.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
