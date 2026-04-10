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
   TREE REMOVAL LANDING PAGE — Ironclad Theme
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
  { q: 'How much does tree removal cost?', a: 'Tree removal costs vary based on tree size, location, and complexity. Small yard trees may start around $300-$500, while large oaks near structures can range from $1,500-$5,000+. We provide free on-site estimates with transparent pricing — no surprises.' },
  { q: 'How long does tree removal take?', a: 'Most residential tree removals are completed in a single day. Larger or more complex jobs involving crane work or limited access may take two days. We always communicate the expected timeline during your arborist assessment.' },
  { q: 'Is stump grinding included?', a: 'Stump grinding is available as an add-on service. Many customers choose to include it for a clean, finished look. We will quote stump grinding separately so you know the exact cost upfront.' },
  { q: 'Do I need a permit to remove a tree?', a: 'In Volusia County, certain trees may require a permit depending on species, size, and location. Our team handles the permit research for you and will advise if a permit is needed before any work begins.' },
  { q: 'Do you offer emergency tree removal?', a: 'Yes. After hurricanes and major storms, we mobilize quickly for emergency tree removal to clear hazards from homes, driveways, and power lines. Call us anytime for storm damage situations.' },
  { q: 'What happens to the wood after removal?', a: 'We haul away all debris and leave your property clean. If you want to keep firewood or larger sections, just let us know during the estimate and we will cut it to your preference.' },
]

const PAIN_POINTS = [
  { icon: '!', title: 'Dangerous Leaning Tree', desc: 'A tree leaning toward your home, fence, or power line is a ticking clock. One storm is all it takes.' },
  { icon: '#', title: 'Storm Damage', desc: 'Split trunks, hanging limbs, and uprooted trees after a storm need fast, professional removal before they cause more damage.' },
  { icon: 'X', title: 'Dead Tree Near House', desc: 'Dead trees are unpredictable — they drop limbs without warning and attract pests. Removal protects your property and family.' },
  { icon: '~', title: 'Too Close to Power Lines', desc: 'Trees growing into utility lines are a fire and outage hazard. Certified arborists know how to remove them safely.' },
]

const SERVICES_LIST = [
  'Full tree removal by ISA Certified Arborist',
  'Stump grinding available as add-on',
  'Hazard tree assessment and emergency removal',
  'Storm damage cleanup and debris hauling',
  'Equipment for any size — from small yard trees to massive oaks',
  'Crane-assisted removal for tight or high-risk locations',
]

const PROCESS = [
  { step: 'Call', desc: 'Reach out by phone or contact form for a free consultation.' },
  { step: 'Arborist Assessment', desc: 'Our ISA Certified Arborist evaluates the tree, site conditions, and creates a removal plan.' },
  { step: 'Safe Removal', desc: 'Professional crew executes the removal with proper rigging, equipment, and safety protocols.' },
  { step: 'Clean Site', desc: 'All debris hauled, yard raked, and property left better than we found it.' },
]

const ISA_BENEFITS = [
  { title: 'Safety First', desc: 'Certified arborists follow ANSI Z133 safety standards for every removal, protecting your property and our crew.' },
  { title: 'Proper Techniques', desc: 'Correct rigging, felling angles, and equipment selection prevent damage to surrounding structures and landscaping.' },
  { title: 'Full Insurance', desc: 'Licensed, insured, and bonded — your property is protected from the first cut to the final cleanup.' },
  { title: 'Expert Knowledge', desc: 'ISA training means understanding tree biology, risk assessment, and the safest approach for every situation.' },
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
            <span className="text-[#c2a878]">Tree Removal</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.tree2})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f0d]/95 via-[#0d0f0d]/80 to-[#0d0f0d]/40" />
        <div className="relative max-w-6xl mx-auto px-4 py-24 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              {CERTS.slice(0, 2).map((cert) => (
                <span key={cert} className="text-xs bg-[#4a7c59]/20 text-[#4a7c59] border border-[#4a7c59]/30 px-3 py-1 rounded-full">{cert}</span>
              ))}
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white mb-6">
              Safe, Professional Tree Removal in DeLand, FL
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              ISA Certified Arborist-led tree removal — safe, insured, and damage-free. From small yard trees to the biggest oaks in Volusia County.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wider px-8 py-4 rounded transition-colors text-lg font-bold">
                Get My Tree Removal Estimate
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
            Why Homeowners Call Us
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            These are the situations where putting off tree removal gets expensive — or dangerous.
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
                Complete Tree Removal by a Certified Arborist
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Every removal is led by our ISA Certified Arborist (FL-9491A) who assesses the tree, plans the safest approach, and oversees the entire job. No subcontractors — our crew handles it start to finish.
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
              <img src={IMAGES.tree8} alt="Tree removal work by Hoag Land Services" className="rounded-lg w-full h-64 object-cover" />
              <img src={IMAGES.tree9} alt="Professional tree removal in DeLand" className="rounded-lg w-full h-64 object-cover mt-8" />
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
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">Four simple steps from first call to clean property.</p>
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

      {/* Why ISA Matters */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center text-white mb-4">
            Why ISA Certification Matters
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Not all tree companies are the same. An ISA Certified Arborist brings training, accountability, and expertise that protects your property.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ISA_BENEFITS.map((b) => (
              <div key={b.title} className="bg-[#1a1c1a] border border-white/5 rounded-lg p-6">
                <div className="w-10 h-10 rounded bg-[#4a7c59]/10 flex items-center justify-center mb-4">
                  <span className="text-[#4a7c59] font-bold">&#10003;</span>
                </div>
                <h3 className="font-display text-base font-bold uppercase text-white mb-2">{b.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-[#1a1c1a] py-20">
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
              <div key={r.name} className="bg-[#141614] border border-white/5 rounded-lg p-6">
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
            Tree Removal FAQ
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
            Ready to Remove That Tree?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Get a free, no-obligation estimate from an ISA Certified Arborist. We will walk your property, assess the tree, and give you a straight answer on cost and timeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wider px-8 py-4 rounded transition-colors text-lg font-bold">
              Get My Tree Removal Estimate
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
            <Link href="/services/tree-services/tree-trimming" className="group bg-[#141614] border border-white/5 rounded-lg p-6 hover:border-[#4a7c59]/30 transition-colors text-center">
              <h3 className="font-display text-lg font-bold uppercase text-white mb-2 group-hover:text-[#4a7c59] transition-colors">Tree Trimming</h3>
              <p className="text-gray-400 text-sm">Dead limb removal, crown reduction, and clearance trimming.</p>
            </Link>
            <Link href="/services/tree-services/palm-pruning" className="group bg-[#141614] border border-white/5 rounded-lg p-6 hover:border-[#4a7c59]/30 transition-colors text-center">
              <h3 className="font-display text-lg font-bold uppercase text-white mb-2 group-hover:text-[#4a7c59] transition-colors">Palm Pruning</h3>
              <p className="text-gray-400 text-sm">Frond removal, fruit clusters, and sprout cleanup.</p>
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
