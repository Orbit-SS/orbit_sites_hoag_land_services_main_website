'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  IMAGES,
  PHONE,
  PHONE_HREF,
  COMPANY,
  REVIEWS,
  REVIEW_STATS,
  CERTS,
  EST_YEAR,
} from '@/shared/constants'

/* ─────────────────────────────────────────────
   OVERGROWN TREES — Pain-Point Landing Page
   Ironclad Theme
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

function StepNumber({ n }: { n: number }) {
  return (
    <div className="w-14 h-14 rounded-full border-2 border-[#4a7c59] flex items-center justify-center shrink-0">
      <span className="font-display text-xl font-bold text-[#4a7c59]">{n}</span>
    </div>
  )
}

const PROBLEMS = [
  { icon: '!', title: 'Blocking Sunlight', desc: 'Overgrown canopies turn bright yards into dark caves. Your lawn dies, your garden struggles, and your home feels gloomy.' },
  { icon: '#', title: 'Branches on the Roof', desc: 'Limbs scraping your roof and clogging gutters cause moisture damage, mold, and expensive repairs you should not have to make.' },
  { icon: 'X', title: 'Killing Your Grass', desc: 'Dense canopy coverage starves turf of the sunlight it needs. No amount of fertilizer fixes a light problem.' },
  { icon: '~', title: 'Blocking Views', desc: 'You bought the property for the view or the open feel — overgrown trees have slowly taken that away.' },
  { icon: '>', title: 'Overgrown Canopy', desc: 'Trees that have not been maintained in years develop heavy, unbalanced canopies that are more likely to fail in storms.' },
]

const SOLUTIONS = [
  'Professional crown reduction to restore shape and light',
  'Selective limb removal — only what the tree needs',
  'Canopy lifting for clearance over structures and walkways',
  'Deadwood removal to reduce storm risk',
  'Proper pruning cuts that promote healthy regrowth',
  'ISA Certified Arborist oversight on every job',
]

const PROCESS = [
  { step: 'Call or Contact', desc: 'Tell us what is bothering you — blocked light, scraping branches, overgrown canopy. We schedule a visit.' },
  { step: 'Arborist Walkthrough', desc: 'Our ISA Certified Arborist evaluates each tree, recommends the right pruning approach, and gives you a clear estimate.' },
  { step: 'Professional Trimming', desc: 'Crew executes the plan using proper pruning techniques — no topping, no hacking. Just clean, healthy cuts.' },
  { step: 'Enjoy Your Yard', desc: 'More light, better views, cleaner roofline. We haul all debris and leave your property looking its best.' },
]

const FAQS = [
  { q: 'Will trimming hurt the tree?', a: 'Not when done correctly. Our ISA Certified Arborist follows ANSI A300 pruning standards, making proper cuts at the right locations. We never top trees or remove more than the tree can handle in a single session.' },
  { q: 'How much of the canopy can you remove?', a: 'Industry best practice is to remove no more than 25% of a tree\'s live canopy in a single pruning cycle. Our arborist will recommend the right amount based on species, health, and your goals.' },
  { q: 'When is the best time of year to trim?', a: 'In Central Florida, most trees can be pruned year-round. However, some species respond better to pruning during their dormant season. Our arborist will advise on the best timing for your specific trees.' },
  { q: 'How much does tree trimming cost?', a: 'Trimming costs depend on the number of trees, their size, access, and how much work each needs. Single tree trimming often ranges from $200-$1,500. We provide a free on-site estimate with no surprises.' },
  { q: 'How often should trees be trimmed?', a: 'Most trees benefit from pruning every 2-5 years depending on species and growth rate. Fast-growing trees like oaks may need attention every 2-3 years. We can set up a maintenance schedule after your first service.' },
]

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="bg-[#1a1c1a] text-gray-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-[#0d0f0d] border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-[#c2a878] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-[#c2a878] transition-colors">Services</Link>
            <span>/</span>
            <Link href="/services/tree-services" className="hover:text-[#c2a878] transition-colors">Tree Services</Link>
            <span>/</span>
            <span className="text-[#c2a878]">Overgrown Trees</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.tree5})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f0d]/95 via-[#0d0f0d]/80 to-[#0d0f0d]/40" />
        <div className="relative max-w-6xl mx-auto px-4 py-24 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              {CERTS.slice(0, 2).map((cert) => (
                <span key={cert} className="text-xs bg-[#4a7c59]/20 text-[#4a7c59] border border-[#4a7c59]/30 px-3 py-1 rounded-full">{cert}</span>
              ))}
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white mb-6">
              Overgrown Trees Blocking Light &amp; Views? We Fix That.
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Years of unchecked growth turn beautiful trees into problems. Our ISA Certified Arborist restores your canopy with professional pruning — more light, better views, healthier trees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wider px-8 py-4 rounded transition-colors text-lg font-bold">
                Get My Trimming Estimate
              </Link>
              <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 border-2 border-[#c2a878] text-[#c2a878] hover:bg-[#c2a878]/10 font-display uppercase tracking-wider px-8 py-4 rounded transition-colors">
                <PhoneIcon /> {PHONE}
              </a>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <div className="flex">{Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}</div>
              <span className="text-sm text-gray-400">{REVIEW_STATS.stars} stars — {REVIEW_STATS.count} Google Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Deep-Dive */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center mb-4 text-white">
            What Overgrown Trees Are Costing You
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Neglected trees do not just look bad — they cause real damage to your property and lifestyle.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROBLEMS.map((p) => (
              <div key={p.title} className="bg-[#1a1c1a] border border-white/5 rounded-lg p-6 hover:border-[#4a7c59]/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#4a7c59]/10 flex items-center justify-center mb-4">
                  <span className="font-display text-xl font-bold text-[#4a7c59]">{p.icon}</span>
                </div>
                <h3 className="font-display text-lg font-bold uppercase text-white mb-2">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="bg-[#1a1c1a] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white mb-6">
                Professional Pruning That Restores Your Landscape
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                We do not hack trees back — we shape them. Crown reduction, canopy lifting, and selective trimming restore light, views, and structure while keeping your trees healthy for years to come.
              </p>
              <ul className="space-y-3">
                {SOLUTIONS.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <span className="text-[#4a7c59] mt-1 shrink-0">&#10003;</span>
                    <span className="text-gray-300">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src={IMAGES.tree7} alt="Professional tree trimming and canopy reduction" className="rounded-lg w-full h-64 object-cover" />
              <img src={IMAGES.tree11} alt="Overgrown tree pruning in DeLand FL" className="rounded-lg w-full h-64 object-cover mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#0d0f0d] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center text-white mb-4">
            How We Restore Overgrown Trees
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">From dark, cluttered yard to open, beautiful landscape.</p>
          <div className="grid md:grid-cols-4 gap-8">
            {PROCESS.map((p, i) => (
              <div key={p.step} className="text-center">
                <div className="flex justify-center mb-4"><StepNumber n={i + 1} /></div>
                <h3 className="font-display text-lg font-bold uppercase text-white mb-2">{p.step}</h3>
                <p className="text-gray-400 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-1 mb-3">{Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white mb-2">
              {REVIEW_STATS.stars} Stars From {REVIEW_STATS.count} Reviews
            </h2>
            <p className="text-gray-400">Real feedback from real customers across Volusia County.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-[#1a1c1a] border border-white/5 rounded-lg p-6">
                <div className="flex gap-1 mb-3">{Array.from({ length: r.rating }).map((_, i) => <StarIcon key={i} />)}</div>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed italic">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#4a7c59]/20 flex items-center justify-center">
                    <span className="text-[#4a7c59] text-sm font-bold">{r.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{r.name}</p>
                    <p className="text-gray-500 text-xs">{r.source} Review</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#0d0f0d] py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center text-white mb-12">
            Overgrown Tree FAQ
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-white/5 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-display text-base font-semibold uppercase text-white pr-4">{faq.q}</span>
                  <ChevronDown open={openFaq === i} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white mb-4">
            Get Your Light and Views Back
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            A free on-site estimate from our ISA Certified Arborist. We will walk your property, evaluate each tree, and recommend exactly what it needs — no upselling, no pressure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wider px-8 py-4 rounded transition-colors text-lg font-bold">
              Get My Trimming Estimate
            </Link>
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 border-2 border-[#c2a878] text-[#c2a878] hover:bg-[#c2a878]/10 font-display uppercase tracking-wider px-8 py-4 rounded transition-colors">
              <PhoneIcon /> {PHONE}
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-6">Serving DeLand, DeLeon Springs &amp; Central Florida since {EST_YEAR}</p>
        </div>
      </section>

      {/* Cross-Links */}
      <section className="bg-[#1a1c1a] py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-2xl font-bold uppercase text-center text-white mb-8">Related Tree Services</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <Link href="/services/tree-services/tree-trimming" className="group bg-[#141614] border border-white/5 rounded-lg p-6 hover:border-[#4a7c59]/30 transition-colors text-center">
              <h3 className="font-display text-lg font-bold uppercase text-white mb-2 group-hover:text-[#4a7c59] transition-colors">Tree Trimming</h3>
              <p className="text-gray-400 text-sm">Routine pruning to keep your trees healthy and maintained.</p>
            </Link>
            <Link href="/services/tree-services/dangerous-trees" className="group bg-[#141614] border border-white/5 rounded-lg p-6 hover:border-[#4a7c59]/30 transition-colors text-center">
              <h3 className="font-display text-lg font-bold uppercase text-white mb-2 group-hover:text-[#4a7c59] transition-colors">Dangerous Trees</h3>
              <p className="text-gray-400 text-sm">Hazard assessment and safe removal of threatening trees.</p>
            </Link>
            <Link href="/services/tree-services/wrong-tree-wrong-place" className="group bg-[#141614] border border-white/5 rounded-lg p-6 hover:border-[#4a7c59]/30 transition-colors text-center">
              <h3 className="font-display text-lg font-bold uppercase text-white mb-2 group-hover:text-[#4a7c59] transition-colors">Wrong Tree, Wrong Place</h3>
              <p className="text-gray-400 text-sm">Remove problem trees and replace with the right species.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
