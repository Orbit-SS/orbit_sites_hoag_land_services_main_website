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
   STORM DAMAGE — Pain-Point Landing Page
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
  { icon: '!', title: 'Trees Down on Your Roof', desc: 'A fallen tree on your home is an emergency. Water damage starts immediately, and the structural risk grows every hour.' },
  { icon: '#', title: 'Driveway Blocked', desc: 'A tree across the driveway means you cannot get in or out. We clear access fast so your household can function.' },
  { icon: 'X', title: 'Power Lines Down', desc: 'Storm-felled trees tangled in power lines are extremely dangerous. Our crew coordinates with utilities for safe removal.' },
  { icon: '~', title: 'Split Trunks & Hanging Limbs', desc: 'Partially split trees and widow-makers are unstable and unpredictable. Professional rigging prevents secondary damage.' },
  { icon: '>', title: 'Insurance Claim Needed', desc: 'You need documentation, photos, and a professional assessment to file your storm damage claim. We provide all of it.' },
]

const SOLUTIONS = [
  'Rapid emergency response for storm-damaged properties',
  'Safe removal of fallen trees from structures and vehicles',
  'Debris hauling and complete property cleanup',
  'Coordination with insurance adjusters and documentation',
  'Hazard limb removal to prevent secondary damage',
  'Full property restoration after severe weather events',
]

const PROCESS = [
  { step: 'Call Now', desc: 'Describe the situation. We triage storm calls by severity and dispatch crews to the most urgent sites first.' },
  { step: 'Rapid Assessment', desc: 'Our arborist evaluates the damage on-site, identifies hazards, and creates a safe removal plan.' },
  { step: 'Emergency Removal', desc: 'Crew mobilizes with chainsaws, rigging, and heavy equipment to safely remove trees and debris.' },
  { step: 'Full Cleanup', desc: 'Every branch, every log, every leaf. We restore your property and provide documentation for insurance.' },
]

const FAQS = [
  { q: 'How fast can you respond after a storm?', a: 'We begin mobilizing immediately after conditions are safe. Response times depend on storm severity and call volume, but we prioritize trees on structures, blocking access, or near power lines. Most emergency calls are addressed within 24-48 hours.' },
  { q: 'Do you work with homeowners insurance?', a: 'Yes. We provide detailed documentation including photos, arborist reports, and itemized invoices that insurance companies require. We can also meet with your adjuster on-site if needed.' },
  { q: 'How much does storm damage cleanup cost?', a: 'Storm cleanup costs vary widely based on the number of trees, proximity to structures, and debris volume. Single tree removals may run $500-$3,000, while full property cleanups can be more. Insurance often covers storm damage — we help with that process.' },
  { q: 'Do you offer after-hours emergency service?', a: 'Yes. For genuine emergencies — trees on homes, blocking the only exit, or creating immediate danger — call us anytime. We will assess the situation and dispatch as quickly as conditions allow.' },
  { q: 'Is debris cleanup and hauling included?', a: 'Yes. Our storm damage service includes complete debris removal and hauling. We leave your property clean and clear. If you want to keep firewood, let us know and we will cut it to size.' },
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
            <span className="text-[#c2a878]">Storm Damage</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.tree9})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f0d]/95 via-[#0d0f0d]/80 to-[#0d0f0d]/40" />
        <div className="relative max-w-6xl mx-auto px-4 py-24 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs bg-red-900/30 text-red-400 border border-red-500/30 px-3 py-1 rounded-full">Emergency Service Available</span>
              {CERTS.slice(0, 1).map((cert) => (
                <span key={cert} className="text-xs bg-[#4a7c59]/20 text-[#4a7c59] border border-[#4a7c59]/30 px-3 py-1 rounded-full">{cert}</span>
              ))}
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white mb-6">
              Storm Damage? We Clean Up Fast.
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Trees down, limbs on the roof, driveway blocked — we have seen it all after every Florida storm season. Our crew responds fast, removes safely, and handles the insurance paperwork.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wider px-8 py-4 rounded transition-colors text-lg font-bold">
                <PhoneIcon /> Call Now for Storm Cleanup
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 border-2 border-[#c2a878] text-[#c2a878] hover:bg-[#c2a878]/10 font-display uppercase tracking-wider px-8 py-4 rounded transition-colors">
                Request Cleanup Online
              </Link>
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
            What You Are Dealing With After the Storm
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Storm damage is urgent, stressful, and dangerous. Here is what we handle every hurricane season.
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
                Fast, Safe Storm Damage Recovery
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                After a hurricane or severe storm, our crew mobilizes with the heavy equipment, rigging, and expertise to clear your property safely. We work with your insurance company and do not leave until the job is done.
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
              <img src={IMAGES.tree3} alt="Storm damage tree removal in Central Florida" className="rounded-lg w-full h-64 object-cover" />
              <img src={IMAGES.tree10} alt="Emergency tree cleanup after hurricane" className="rounded-lg w-full h-64 object-cover mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#0d0f0d] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center text-white mb-4">
            Our Storm Response Process
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">From emergency call to restored property.</p>
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
            <p className="text-gray-400">Trusted by homeowners across Volusia County — before, during, and after storm season.</p>
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
            Storm Damage FAQ
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
            Storm Hit? We Are Ready.
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Do not wait for the damage to get worse. Call now for emergency storm cleanup — we respond fast, work safe, and help with insurance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wider px-8 py-4 rounded transition-colors text-lg font-bold">
              <PhoneIcon /> Call Now for Storm Cleanup
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 border-2 border-[#c2a878] text-[#c2a878] hover:bg-[#c2a878]/10 font-display uppercase tracking-wider px-8 py-4 rounded transition-colors">
              Request Cleanup Online
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-6">Serving DeLand, DeLeon Springs &amp; Central Florida since {EST_YEAR}</p>
        </div>
      </section>

      {/* Cross-Links */}
      <section className="bg-[#1a1c1a] py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-2xl font-bold uppercase text-center text-white mb-8">Related Tree Services</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <Link href="/services/tree-services/dangerous-trees" className="group bg-[#141614] border border-white/5 rounded-lg p-6 hover:border-[#4a7c59]/30 transition-colors text-center">
              <h3 className="font-display text-lg font-bold uppercase text-white mb-2 group-hover:text-[#4a7c59] transition-colors">Dangerous Trees</h3>
              <p className="text-gray-400 text-sm">Hazard tree assessment and safe removal before disaster strikes.</p>
            </Link>
            <Link href="/services/tree-services/tree-removal" className="group bg-[#141614] border border-white/5 rounded-lg p-6 hover:border-[#4a7c59]/30 transition-colors text-center">
              <h3 className="font-display text-lg font-bold uppercase text-white mb-2 group-hover:text-[#4a7c59] transition-colors">Tree Removal</h3>
              <p className="text-gray-400 text-sm">Safe, professional tree removal by certified arborist.</p>
            </Link>
            <Link href="/services/tree-services/tree-trimming" className="group bg-[#141614] border border-white/5 rounded-lg p-6 hover:border-[#4a7c59]/30 transition-colors text-center">
              <h3 className="font-display text-lg font-bold uppercase text-white mb-2 group-hover:text-[#4a7c59] transition-colors">Tree Trimming</h3>
              <p className="text-gray-400 text-sm">Preventive trimming to reduce storm damage risk.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
