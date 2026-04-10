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
   PALM PRUNING LANDING PAGE — Ironclad Theme
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

const FAQS = [
  { q: 'How often should palms be pruned?', a: 'Most palms in Central Florida benefit from pruning once or twice per year. Over-pruning is harmful — we only remove dead and dying fronds, fruit clusters, and sprouts. Our arborist will recommend the right frequency for your specific palm species.' },
  { q: 'How much does palm pruning cost?', a: 'Palm pruning typically ranges from $75-$250 per palm depending on height, species, and accessibility. Multi-palm and recurring service discounts are available. We quote exact pricing during your free property assessment.' },
  { q: 'Does over-pruning hurt palms?', a: 'Yes. Removing green fronds — sometimes called "hurricane cutting" — actually weakens the palm and makes it more vulnerable to storm damage and nutrient deficiency. We follow best practices and only remove fronds below the 9 o\'clock position.' },
  { q: 'What is the best season to prune palms?', a: 'In Florida, palms can be pruned year-round. However, late spring through early summer is often preferred because it removes seed pods before they drop and addresses dead fronds from winter.' },
  { q: 'Do you offer commercial palm maintenance?', a: 'Yes. We maintain palms for HOAs, commercial properties, and apartment complexes throughout Volusia County. We offer recurring service contracts with scheduled visits for consistent, clean results.' },
]

const PAIN_POINTS = [
  { icon: '!', title: 'Dead Fronds Hanging', desc: 'Brown, hanging fronds are unsightly and dangerous — they drop in wind, creating hazards for people and vehicles below.' },
  { icon: '#', title: 'Fruit Dropping Everywhere', desc: 'Palm fruit clusters create a mess on driveways, walkways, and roofs. The staining and slipping hazard get worse every week.' },
  { icon: '~', title: 'Sprouts at the Base', desc: 'Unchecked sprouts at the base of palms look neglected and compete for nutrients, weakening the main trunk over time.' },
  { icon: 'X', title: 'Palms Looking Neglected', desc: 'Overgrown palms drag down your entire property appearance. Dead fronds, hanging boots, and seed pods signal deferred maintenance.' },
]

const SERVICES_LIST = [
  'Dead and dying lower frond removal',
  'Fruit cluster and seed pod removal',
  'Sprout removal at base of trunk',
  'Boot and fiber cleanup for cleaner trunk appearance',
  'Palm health assessment by certified arborist',
  'Recurring maintenance programs for residential and commercial',
]

const PROCESS = [
  { step: 'Call', desc: 'Reach out by phone or contact form for a free palm assessment.' },
  { step: 'Assess', desc: 'Our arborist evaluates each palm — species, health, and what needs attention.' },
  { step: 'Prune', desc: 'Professional crew prunes to ISA standards — only dead fronds, fruit, and sprouts removed.' },
  { step: 'Clean', desc: 'All debris hauled away. Your property is left cleaner than we found it.' },
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
            <span className="text-[#c2a878]">Palm Pruning</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.tree14})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f0d]/95 via-[#0d0f0d]/80 to-[#0d0f0d]/40" />
        <div className="relative max-w-6xl mx-auto px-4 py-24 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              {CERTS.slice(0, 2).map((cert) => (
                <span key={cert} className="text-xs bg-[#4a7c59]/20 text-[#4a7c59] border border-[#4a7c59]/30 px-3 py-1 rounded-full">{cert}</span>
              ))}
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white mb-6">
              Palm Pruning &amp; Maintenance in Central Florida
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Professional palm pruning — dead frond removal, fruit cluster removal, and sprout cleanup to keep your palms healthy and your property clean.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wider px-8 py-4 rounded transition-colors text-lg font-bold">
                Get My Palm Pruning Estimate
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

      {/* Pain Points */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center mb-4 text-white">
            Why Your Palms Need Professional Care
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Neglected palms do not just look bad — they drop debris, attract pests, and reduce your property value.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PAIN_POINTS.map((p) => (
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

      {/* What We Do */}
      <section className="bg-[#1a1c1a] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white mb-6">
                Professional Palm Care by a Certified Arborist
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Our ISA Certified Arborist (FL-9491A) knows the difference between proper pruning and the over-cutting that kills palms. We remove only what needs to go — dead fronds, seed pods, and sprouts — leaving your palms healthy, clean, and looking their best.
              </p>
              <ul className="space-y-3">
                {SERVICES_LIST.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <span className="text-[#4a7c59] mt-1 shrink-0">&#10003;</span>
                    <span className="text-gray-300">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src={IMAGES.tree14} alt="Palm pruning by Hoag Land Services" className="rounded-lg w-full h-64 object-cover" />
              <img src={IMAGES.tree15} alt="Professional palm maintenance in Central Florida" className="rounded-lg w-full h-64 object-cover mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#0d0f0d] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Quick, clean, and professional from start to finish.</p>
          <div className="grid md:grid-cols-4 gap-8">
            {PROCESS.map((p, i) => (
              <div key={p.step} className="text-center">
                <div className="flex justify-center mb-4">
                  <StepNumber n={i + 1} />
                </div>
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
            Palm Pruning FAQ
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
            Get Your Palms Looking Sharp Again
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Free estimate for palm pruning — residential or commercial. We will assess your palms and give you a clear price with no hidden fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wider px-8 py-4 rounded transition-colors text-lg font-bold">
              Get My Palm Pruning Estimate
            </Link>
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 border-2 border-[#c2a878] text-[#c2a878] hover:bg-[#c2a878]/10 font-display uppercase tracking-wider px-8 py-4 rounded transition-colors">
              <PhoneIcon /> {PHONE}
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            Serving DeLand, DeLeon Springs &amp; Central Florida since {EST_YEAR}
          </p>
        </div>
      </section>

      {/* Related Tree Services */}
      <section className="bg-[#1a1c1a] py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-2xl font-bold uppercase text-center text-white mb-8">
            Other Tree Services
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <Link href="/services/tree-services/tree-removal" className="group bg-[#141614] border border-white/5 rounded-lg p-6 hover:border-[#4a7c59]/30 transition-colors text-center">
              <h3 className="font-display text-lg font-bold uppercase text-white mb-2 group-hover:text-[#4a7c59] transition-colors">Tree Removal</h3>
              <p className="text-gray-400 text-sm">Safe, certified arborist-led removal for any size tree.</p>
            </Link>
            <Link href="/services/tree-services/tree-trimming" className="group bg-[#141614] border border-white/5 rounded-lg p-6 hover:border-[#4a7c59]/30 transition-colors text-center">
              <h3 className="font-display text-lg font-bold uppercase text-white mb-2 group-hover:text-[#4a7c59] transition-colors">Tree Trimming</h3>
              <p className="text-gray-400 text-sm">Dead limb removal, crown reduction, and clearance trimming.</p>
            </Link>
            <Link href="/services/tree-services/tree-installation" className="group bg-[#141614] border border-white/5 rounded-lg p-6 hover:border-[#4a7c59]/30 transition-colors text-center">
              <h3 className="font-display text-lg font-bold uppercase text-white mb-2 group-hover:text-[#4a7c59] transition-colors">Tree Installation</h3>
              <p className="text-gray-400 text-sm">Palms, hardwoods, and evergreens professionally planted.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
