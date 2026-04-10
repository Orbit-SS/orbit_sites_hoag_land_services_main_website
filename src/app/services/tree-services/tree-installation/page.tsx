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
   TREE INSTALLATION LANDING PAGE — Ironclad Theme
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
  { q: 'What are the best trees for Central Florida?', a: 'Live oaks, bald cypress, southern magnolia, and crape myrtles are excellent hardwood choices. For palms, Sabal palmettos, Sylvester date palms, and Medjool palms thrive here. Our arborist will recommend species based on your soil, sun exposure, and goals.' },
  { q: 'How much does tree installation cost?', a: 'Cost depends on species, size, and quantity. Small trees and palms may start around $200-$500 installed, while large specimen trees can range from $1,000-$5,000+. We provide itemized estimates so you know exactly what you are paying for.' },
  { q: 'Do you offer a warranty on planted trees?', a: 'We stand behind our work. Details on our planting warranty are discussed during consultation and depend on species and conditions. Proper watering during the establishment period is essential for warranty coverage.' },
  { q: 'When is the best time to plant trees in Florida?', a: 'Florida\'s rainy season (June through September) is ideal for planting because regular rainfall helps new trees establish roots. However, with proper irrigation, we can install trees year-round in Central Florida.' },
  { q: 'How much watering do newly planted trees need?', a: 'New trees need regular watering for 6-12 months after planting. We provide specific watering instructions for each species and can set up temporary irrigation if needed. Establishment care is the key to long-term success.' },
]

const PAIN_POINTS = [
  { icon: '?', title: 'Want Shade but Unsure What to Plant', desc: 'The wrong tree in the wrong place creates expensive problems down the road. Species selection matters more than most people realize.' },
  { icon: 'X', title: 'Wrong Tree Causing Problems', desc: 'Roots cracking foundations, branches hitting the roof, fruit dropping everywhere — the wrong tree is a long-term headache.' },
  { icon: '#', title: 'Need Screening or Privacy', desc: 'Neighbors, roads, or commercial areas too visible from your property. The right trees create natural, attractive privacy screens.' },
  { icon: '$', title: 'Want to Add Property Value', desc: 'Mature, well-placed trees can add 10-15% to property value. Strategic planting is one of the best investments in your landscape.' },
]

const SERVICES_LIST = [
  'Species selection matched to your site, soil, and goals',
  'Site evaluation for sun exposure, drainage, and root space',
  'Professional planting with proper depth and soil preparation',
  'Palms: Sabal palmetto, Sylvester, Medjool, and more',
  'Hardwoods: live oak, bald cypress, magnolia, crape myrtle',
  'Evergreens: holly, cedar, and screening varieties',
  'Post-planting care instructions and establishment guidance',
]

const PROCESS = [
  { step: 'Consult', desc: 'Tell us your goals — shade, privacy, aesthetics, or value. We listen first.' },
  { step: 'Select', desc: 'Our arborist recommends species based on your property, soil conditions, and long-term vision.' },
  { step: 'Plant', desc: 'Professional installation with proper root ball preparation, depth, and staking.' },
  { step: 'Establish', desc: 'We provide watering schedules and care instructions so your new trees thrive.' },
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
            <span className="text-[#c2a878]">Tree Installation</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.tree6})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f0d]/95 via-[#0d0f0d]/80 to-[#0d0f0d]/40" />
        <div className="relative max-w-6xl mx-auto px-4 py-24 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              {CERTS.slice(0, 2).map((cert) => (
                <span key={cert} className="text-xs bg-[#4a7c59]/20 text-[#4a7c59] border border-[#4a7c59]/30 px-3 py-1 rounded-full">{cert}</span>
              ))}
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white mb-6">
              Tree Installation &amp; Planting in DeLand, FL
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              The right tree in the right place — palms, hardwoods, and evergreens professionally installed by a certified arborist.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wider px-8 py-4 rounded transition-colors text-lg font-bold">
                Get My Tree Installation Estimate
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
            Why Homeowners Invest in Tree Planting
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Whether you want shade, privacy, or curb appeal — the right tree changes everything. The wrong one creates problems for decades.
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
                The Right Tree, Planted Right
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Our ISA Certified Arborist (FL-9491A) helps you choose species that will thrive on your property for decades. We evaluate soil conditions, sun exposure, drainage, and your goals before recommending a single tree. Then we plant it properly — correct depth, soil prep, staking, and mulching — so it establishes fast and grows strong.
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
              <img src={IMAGES.tree6} alt="Tree installation by Hoag Land Services" className="rounded-lg w-full h-64 object-cover" />
              <img src={IMAGES.tree7} alt="Professional tree planting in DeLand" className="rounded-lg w-full h-64 object-cover mt-8" />
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
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">From your vision to a thriving landscape — guided by an arborist every step.</p>
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
            Tree Installation FAQ
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
            Plant Something That Lasts
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Get a free consultation with our certified arborist. We will walk your property, discuss your goals, and recommend the perfect trees for your landscape.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wider px-8 py-4 rounded transition-colors text-lg font-bold">
              Get My Tree Installation Estimate
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
            <Link href="/services/tree-services/palm-pruning" className="group bg-[#141614] border border-white/5 rounded-lg p-6 hover:border-[#4a7c59]/30 transition-colors text-center">
              <h3 className="font-display text-lg font-bold uppercase text-white mb-2 group-hover:text-[#4a7c59] transition-colors">Palm Pruning</h3>
              <p className="text-gray-400 text-sm">Frond removal, fruit clusters, and sprout cleanup.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
