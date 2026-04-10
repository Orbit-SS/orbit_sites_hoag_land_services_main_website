'use client'
import Link from 'next/link'
import { useState } from 'react'
import { IMAGES, PHONE, PHONE_HREF, COMPANY, REVIEWS, REVIEW_STATS, CERTS, EST_YEAR } from '@/shared/constants'

const FAQS = [
  {
    q: 'How much does it cost to clear an overgrown lot?',
    a: 'Pricing depends on lot size, vegetation density, tree count, and accessibility. A heavily overgrown quarter-acre residential lot will cost less than a multi-acre parcel choked with mature hardwoods and invasive brush. We walk the property and give you a firm number before any work starts.',
  },
  {
    q: 'How long does overgrown land clearing take?',
    a: 'Most residential lots with heavy overgrowth take two to four days. Larger parcels with dense canopy and deep brush may take a week or longer. We provide a timeline during the estimate so you know exactly what to expect.',
  },
  {
    q: 'What happens to all the debris after clearing?',
    a: 'We chip brush and small vegetation on-site with our forestry mulcher. Larger trees are cut, processed, and hauled off. Stumps are ground below grade. When we leave, your property is clean and clear with no piles left behind.',
  },
  {
    q: 'Can you save specific trees during the clearing process?',
    a: 'Absolutely. Our ISA Certified Arborist identifies and flags trees worth keeping before any equipment moves in. We work around them carefully to protect root zones and canopy while removing everything else.',
  },
  {
    q: 'Is there a minimum lot size for overgrown clearing?',
    a: 'No minimum. We handle everything from small residential lots buried under years of neglect to large rural parcels that have never been cleared. If equipment can reach it, we can clear it.',
  },
]

const STEPS = [
  { num: '01', title: 'Call Us', desc: 'Describe your property and how overgrown it is. Photos help.' },
  { num: '02', title: 'Site Walk', desc: 'We assess the vegetation, flag trees to keep, and provide a firm estimate.' },
  { num: '03', title: 'Clear It', desc: 'Heavy equipment moves in. Brush, trees, and debris are removed efficiently.' },
  { num: '04', title: 'Clean & Ready', desc: 'Your property is cleared, grubbed, and ready for whatever comes next.' },
]

const CROSS_LINKS = [
  { name: 'Land Clearing', href: '/services/site-work/land-clearing' },
  { name: 'Drainage & Grading', href: '/services/site-work/drainage-grading' },
  { name: 'Invasive Vegetation Removal', href: '/services/site-work/invasive-vegetation-removal' },
]

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main className="bg-[#0d0f0d] text-gray-100">
      {/* Breadcrumb */}
      <nav className="bg-[#141614] border-b border-[#4a7c59]/20">
        <div className="max-w-6xl mx-auto px-4 py-3 text-sm font-sans text-gray-400 flex flex-wrap gap-1">
          <Link href="/" className="hover:text-[#c2a878] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-[#c2a878] transition-colors">Services</Link>
          <span>/</span>
          <Link href="/services/site-work" className="hover:text-[#c2a878] transition-colors">Site Work</Link>
          <span>/</span>
          <span className="text-[#c2a878]">Overgrown Land Clearing</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.site1})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0f0d]/80 via-[#0d0f0d]/60 to-[#0d0f0d]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-24">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {CERTS.slice(0, 3).map((c) => (
              <span key={c} className="text-xs font-sans bg-[#4a7c59]/20 text-[#4a7c59] border border-[#4a7c59]/30 px-3 py-1 rounded-full">{c}</span>
            ))}
          </div>
          <h1 className="font-display text-4xl md:text-6xl uppercase tracking-tight text-white mb-6">
            Overgrown Property? We&apos;ll Clear It Fast.
          </h1>
          <p className="font-sans text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Years of neglect turned your land into a jungle. Dense brush, fallen trees, and tangled undergrowth are killing your property value and creating hazards. We bring heavy equipment and get it done.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Clearing Estimate
            </Link>
            <a href={PHONE_HREF} className="inline-block border-2 border-[#c2a878] text-[#c2a878] hover:bg-[#c2a878] hover:text-[#0d0f0d] font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Call {PHONE}
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-400 font-sans">
            {REVIEW_STATS.stars}-Star Rating ({REVIEW_STATS.count} Google Reviews) &middot; Est. {EST_YEAR}
          </p>
        </div>
      </section>

      {/* Problem Deep-Dive */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-4">
            Overgrown Land Is More Than an Eyesore
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-2xl mx-auto mb-12">
            That neglected property is not just sitting there quietly. It is actively working against you.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Fire Hazard', desc: 'Dry brush and dead vegetation are fuel. One spark from a neighbor, a lightning strike, or equipment can turn your property into an inferno that threatens everything around it.' },
              { title: 'Pest Habitat', desc: 'Overgrown land is a breeding ground for mosquitoes, ticks, snakes, and rodents. The thicker the brush, the more pests call your property home.' },
              { title: 'Decreasing Property Value', desc: 'Every month that passes with untouched overgrowth, your property loses value. Buyers and appraisers see liability, not potential.' },
              { title: 'Inaccessible Land', desc: 'Dense brush and fallen trees make it impossible to walk, inspect, or work on your property. You own land you cannot even use.' },
              { title: 'Fallen Trees & Debris', desc: 'Storm damage and natural decay have left downed trees and limbs scattered everywhere. The mess compounds year after year until heavy equipment handles it.' },
              { title: 'Invasive Species Spreading', desc: 'Invasive plants like Brazilian pepper and Chinese tallow thrive in neglected land. They choke out native species and spread to neighboring properties.' },
            ].map((p) => (
              <div key={p.title} className="bg-[#1a1c1a] border border-[#4a7c59]/10 p-6 rounded">
                <h3 className="font-display text-lg uppercase text-[#c2a878] mb-2">{p.title}</h3>
                <p className="font-sans text-gray-300 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl uppercase text-white mb-6">
                How We Reclaim Your Property
              </h2>
              <p className="font-sans text-gray-300 leading-relaxed mb-4">
                {COMPANY} specializes in turning neglected, overgrown properties back into usable land. We bring excavators, track loaders, forestry mulchers, and brush cutters to handle vegetation that hand crews cannot touch.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed mb-4">
                Our forestry mulching process grinds standing brush, small trees, and undergrowth directly into the soil. This eliminates the need for hauling in many cases and leaves a layer of natural mulch that controls erosion. For larger trees and stumps, we cut, remove, and grind them below grade.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed mb-6">
                When the job is done, your property is clean, clear, and ready for building, fencing, landscaping, or whatever you have planned. No piles. No debris. No follow-up trips needed.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Heavy Equipment Clearing', 'Forestry Mulching', 'Brush & Undergrowth Removal', 'Tree & Stump Grinding', 'Debris Hauling', 'Selective Tree Preservation'].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#4a7c59] rounded-full shrink-0" />
                    <span className="font-sans text-sm text-gray-300">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img src={IMAGES.site7} alt="Overgrown land before clearing" className="rounded w-full h-48 object-cover" />
              <img src={IMAGES.site8} alt="Heavy equipment on overgrown lot" className="rounded w-full h-48 object-cover" />
              <img src={IMAGES.site10} alt="Cleared property result" className="rounded w-full h-48 object-cover col-span-2" />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-4">
            From Overgrown to Ready in Four Steps
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-xl mx-auto mb-12">
            We keep it simple. No runaround, no delays, no surprises.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s) => (
              <div key={s.num} className="text-center">
                <div className="text-5xl font-display text-[#4a7c59]/30 mb-2">{s.num}</div>
                <h3 className="font-display text-xl uppercase text-[#c2a878] mb-2">{s.title}</h3>
                <p className="font-sans text-gray-400 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-4">
            What Our Clients Say
          </h2>
          <p className="font-sans text-center text-[#c2a878] mb-12">
            {REVIEW_STATS.stars}-Star Average &middot; {REVIEW_STATS.count} Google Reviews
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-[#1a1c1a] border border-[#4a7c59]/10 p-6 rounded">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <span key={i} className="text-[#c2a878]">&#9733;</span>
                  ))}
                </div>
                <p className="font-sans text-gray-300 text-sm italic mb-4">&ldquo;{r.text}&rdquo;</p>
                <p className="font-sans text-sm text-gray-500">{r.name} &middot; {r.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div key={i} className="border border-[#4a7c59]/20 rounded overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left bg-[#1a1c1a] hover:bg-[#1a1c1a]/80 transition-colors"
                >
                  <span className="font-sans font-medium text-white pr-4">{f.q}</span>
                  <span className="text-[#4a7c59] text-xl shrink-0">{openFaq === i ? '\u2212' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="p-5 bg-[#141614] border-t border-[#4a7c59]/10">
                    <p className="font-sans text-gray-400 text-sm leading-relaxed">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#4a7c59] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white mb-4">
            Stop Letting Overgrowth Win
          </h2>
          <p className="font-sans text-white/80 mb-8 max-w-xl mx-auto">
            Tell us about your overgrown property and we will walk it, give you a straight estimate, and get it cleared on your timeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-white text-[#0d0f0d] hover:bg-gray-100 font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Clearing Estimate
            </Link>
            <a href={PHONE_HREF} className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#0d0f0d] font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* Cross Links */}
      <section className="bg-[#141614] py-16 border-t border-[#4a7c59]/10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-2xl uppercase text-white text-center mb-8">
            Related Site Work Services
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {CROSS_LINKS.map((cl) => (
              <Link
                key={cl.name}
                href={cl.href}
                className="block bg-[#1a1c1a] border border-[#4a7c59]/10 hover:border-[#4a7c59]/40 p-6 rounded text-center transition-colors"
              >
                <span className="font-display text-lg uppercase text-[#c2a878]">{cl.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
