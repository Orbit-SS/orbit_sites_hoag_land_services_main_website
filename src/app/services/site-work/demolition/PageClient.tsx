'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { PHONE, PHONE_HREF, COMPANY, REVIEWS, REVIEW_STATS, CERTS, EST_YEAR } from '@/shared/constants'
import Breadcrumbs from '@/components/Breadcrumbs'
import SpecialtyAreaLinks from '@/components/SpecialtyAreaLinks'

const FAQS = [
  {
    q: 'How much does demolition cost in Central Florida?',
    a: 'Cost depends on the structure type, size, materials, access, and how much debris has to be hauled off. A single-wide mobile home costs less than a concrete slab and pool deck combo. We walk the property, price the exact scope, and give you a firm number before any work starts.',
  },
  {
    q: 'What structures do you demolish?',
    a: 'Small structures: mobile homes, single-wides and double-wides, sheds, outbuildings, barns, detached garages, carports, pool decks, concrete slabs and driveways, and post-storm damaged structures. We do not handle multi-story commercial buildings or anything requiring specialized asbestos remediation.',
  },
  {
    q: 'Do you handle debris hauling and disposal?',
    a: 'Yes. Demolition includes on-site debris breakdown, hauling, and disposal at the appropriate transfer facility. You do not have to arrange separate junk removal or a dumpster. Concrete and clean fill can also be stockpiled on site if you plan to reuse it.',
  },
  {
    q: 'Do I need a permit for demolition in Central Florida?',
    a: 'Most municipalities in Volusia, Lake, and Flagler counties require a demolition permit for anything larger than a small shed. Utility disconnects (power, gas, water) need to be scheduled with the utility company first. We help identify what is needed during the site walk and can coordinate the permit and utility disconnect process on your behalf.',
  },
  {
    q: 'How quickly can you demo my structure?',
    a: 'Most residential demolition jobs (mobile home, shed, small structure) are scheduled within 2 to 4 weeks of estimate acceptance. Emergency post-storm teardowns are faster. Actual demo is usually 1 to 3 days on site plus hauling. Larger concrete removal or barn takedowns can run longer.',
  },
  {
    q: 'Do you demolish pools?',
    a: 'Yes. In-ground pool demolition and pool deck removal are common jobs for us. We can do a full removal (broken up and hauled off, hole backfilled with clean fill) or a partial fill (broken and buried in place where local code allows). We walk you through the options.',
  },
]

const SUBSERVICES = [
  {
    id: 'mobile-home',
    title: 'Mobile Home & Structure Demolition',
    desc: 'Single-wide and double-wide mobile home teardowns, plus sheds, detached garages, carports, and small outbuildings. We disconnect at the utility hookups (or coordinate with the utility company), break the structure down safely, load it out, and haul it away. Site left clean and ready for whatever is next.',
    image: '/photos/hoag/demolition-excavator-central-fl.jpg',
  },
  {
    id: 'concrete-slab',
    title: 'Concrete Slab & Driveway Removal',
    desc: 'Old driveways, foundation slabs, patios, sidewalks, pool decks, and equipment pads. Broken up with the excavator or breaker, hauled off in dump loads. If you want the clean concrete crushed and reused as base or fill on your property, we can arrange that.',
    image: '/photos/hoag/demolition-site-prep-central-fl.jpg',
  },
  {
    id: 'barn-outbuilding',
    title: 'Barn & Outbuilding Takedown',
    desc: 'Wood barns, metal pole barns, workshops, storage sheds, animal enclosures. Careful takedown, salvage of anything worth reusing (metal roofing, siding, framing) if you want it saved, everything else hauled off. Common on rural Volusia and Lake County properties.',
  },
  {
    id: 'pool-demolition',
    title: 'Pool & Pool Deck Removal',
    desc: 'In-ground pool demolition, deck removal, and yard restoration. Full removal (broken up, hauled off, hole backfilled with clean fill and graded) or partial fill (broken and buried in place where local code allows). We walk you through the options during the estimate.',
  },
  {
    id: 'storm-teardown',
    title: 'Post-Storm Damage Teardown',
    desc: 'Hurricane or storm-damaged structures that are past repair. We coordinate with your insurance timeline, document scope, tear the structure down safely, and haul debris. Common on the Volusia coast after tropical weather.',
  },
  {
    id: 'site-prep-demo',
    title: 'Pre-Construction Site Demolition',
    desc: 'Clearing an old structure off a lot before new construction starts. We coordinate with your builder or GC on timing so the pad is ready when they need it. Includes debris hauling and rough grading so the site is truly build-ready, not just cleared.',
    linkLandClearing: true,
  },
]

const STEPS = [
  { num: '01', title: 'Call', desc: 'Tell us what needs to come down and where. Photos help us scope faster.' },
  { num: '02', title: 'Site Walk', desc: 'We walk the property, check access and utilities, and give you a firm price and timeline.' },
  { num: '03', title: 'Permits & Demo', desc: 'We help coordinate permits and utility disconnects, then our crew tears it down.' },
  { num: '04', title: 'Hauled & Clean', desc: 'Debris hauled off to the right facility. Site left clean and graded, ready for the next phase.' },
]

const WHY_CARDS = [
  {
    title: 'Our Own Equipment',
    desc: 'Excavators, skid steers, dump trucks, breakers. We bring the iron; no waiting on a rental yard.',
  },
  {
    title: 'Debris Handled',
    desc: 'You do not have to arrange a dumpster or hauler. Load-out and disposal are part of the price.',
  },
  {
    title: 'Permits Coordinated',
    desc: 'We help identify what the county or city requires and coordinate the paperwork. No guessing.',
  },
  {
    title: 'Licensed & Insured',
    desc: 'Fully licensed and insured in Florida. Full liability coverage on every teardown, big or small.',
  },
]

const SERVICE_AREA_LINKS = [
  { label: 'Demolition in DeLand', href: '/services/site-work/deland' },
  { label: 'Demolition in DeLeon Springs', href: '/services/site-work/deleon-springs' },
  { label: 'Demolition in Lake Helen', href: '/services/site-work/lake-helen' },
  { label: 'Demolition in Pierson', href: '/services/site-work/pierson' },
  { label: 'Demolition in Barberville', href: '/services/site-work/barberville' },
  { label: 'Demolition in Seville', href: '/services/site-work/seville' },
  { label: 'Demolition in Astor', href: '/services/site-work/astor' },
  { label: 'Demolition in Crescent City', href: '/services/site-work/crescent-city' },
  { label: 'Demolition in Pomona Park', href: '/services/site-work/pomona-park' },
  { label: 'Demolition in Altoona', href: '/services/site-work/altoona' },
  { label: 'Demolition in Umatilla', href: '/services/site-work/umatilla' },
  { label: 'Demolition in Daytona Beach', href: '/services/site-work/daytona-beach' },
]

const CROSS_LINKS = [
  { name: 'Land Clearing', href: '/services/site-work/land-clearing' },
  { name: 'Earthworks & Excavation', href: '/services/site-work/earthworks-excavation' },
  { name: 'Land Preparation', href: '/services/site-work/land-preparation' },
  { name: 'Overgrown Land Clearing', href: '/services/site-work/overgrown-land-clearing' },
  { name: 'Site Work Services Hub', href: '/services/site-work' },
]

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main className="bg-[#0d0f0d] text-gray-100">
      <Breadcrumbs crumbs={[
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services' },
        { name: 'Site Work', url: '/services/site-work' },
        { name: 'Demolition', url: '/services/site-work/demolition' },
      ]} />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/photos/hoag/demolition-excavator-central-fl.jpg)`, backgroundPosition: 'center 65%' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0f0d]/80 via-[#0d0f0d]/60 to-[#0d0f0d]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-24">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {CERTS.slice(0, 3).map((c) => (
              <span key={c} className="text-xs font-sans bg-[#4a7c59]/20 text-[#579269] border border-[#4a7c59]/30 px-3 py-1 rounded-full">{c}</span>
            ))}
          </div>
          <h1 className="font-display text-4xl md:text-6xl uppercase tracking-tight text-white mb-6">
            Demolition Contractor in<br />DeLand &amp; Central Florida
          </h1>
          <p className="font-sans text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Mobile homes, sheds, barns, concrete slabs, and pool decks. We tear it down, haul it off, and leave the site clean. Licensed, insured, and permit-ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" data-cta="estimate" className="inline-block bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Demolition Estimate
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

      {/* When You Need Demolition */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-4">
            When You Need Demolition
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-2xl mx-auto mb-12">
            If any of these sound like your property, you need a demolition crew and a hauler in one call.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Old Mobile Home to Remove', desc: 'Aging single-wide or double-wide that needs to come off the lot before you can build or sell.' },
              { title: 'Concrete Slab or Driveway Removal', desc: 'Cracked driveway, foundation slab, pool deck, or patio you want gone and hauled off.' },
              { title: 'Post-Storm Damage Teardown', desc: 'Structure past repair after a hurricane or wind event. Insurance-timeline friendly.' },
              { title: 'Clearing a Lot to Build', desc: 'Old structure has to go before your builder can bring in the new foundation.' },
            ].map((p, i) => (
              <div key={i} className="bg-[#1a1c1a] p-6 border border-white/5 hover:border-[#4a7c59]/40 transition-colors">
                <h3 className="font-display text-lg uppercase text-[#c2a878] mb-2">{p.title}</h3>
                <p className="font-sans text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subservices */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-4">
            What We Demolish
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Six common demolition jobs, one crew, one estimate. Here is what we handle.
          </p>
          <div className="space-y-16">
            {SUBSERVICES.map((sub, idx) => (
              <div key={sub.id} id={sub.id} className={`grid md:grid-cols-2 gap-8 items-center ${idx % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
                {sub.image ? (
                  <div className="relative w-full h-64 rounded overflow-hidden">
                    <Image
                      src={sub.image}
                      alt={`${sub.title} by Hoag Land Services in Central Florida`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                      style={{ objectPosition: 'center 60%' }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-64 bg-[#1a1c1a] border border-white/5 rounded flex items-center justify-center">
                    <span className="font-display text-6xl text-[#579269]/30 uppercase">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                )}
                <div>
                  <h3 className="font-display text-2xl uppercase text-[#c2a878] mb-3">{sub.title}</h3>
                  <p className="font-sans text-gray-300 leading-relaxed">
                    {sub.desc}
                    {sub.linkLandClearing && (
                      <> For raw-land jobs without a structure to remove, see our <Link href="/services/site-work/land-clearing" className="text-[#579269] hover:underline">Land Clearing page</Link>.</>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#0d0f0d] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-12">
            How a Demolition Job Runs
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {STEPS.map((s) => (
              <div key={s.num} className="text-center">
                <div className="font-display text-5xl text-[#579269] mb-3">{s.num}</div>
                <h3 className="font-display text-xl uppercase text-white mb-2">{s.title}</h3>
                <p className="font-sans text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-12">
            Why {COMPANY} for Demolition
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CARDS.map((w, i) => (
              <div key={i} className="bg-[#1a1c1a] p-6 border border-white/5">
                <h3 className="font-display text-lg uppercase text-[#c2a878] mb-3">{w.title}</h3>
                <p className="font-sans text-gray-400 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-[#0d0f0d] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-4">
            What Central Florida Property Owners Say
          </h2>
          <p className="text-[#c2a878] text-center mb-12 font-sans">
            {REVIEW_STATS.stars} Stars &middot; {REVIEW_STATS.count} Verified Google Reviews
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.slice(0, 3).map((r, i) => (
              <div key={i} className="bg-[#141614] p-6 border border-white/5">
                <p className="font-sans text-gray-300 italic leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                <p className="font-display text-sm text-[#c2a878] uppercase">{r.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="bg-[#141614] py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-[#c2a878] font-display uppercase tracking-[0.2em] text-sm mb-3 text-center">
            Where We Demo
          </p>
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-10">
            Demolition Services Across Central Florida
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            {SERVICE_AREA_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="bg-[#1a1c1a] hover:bg-[#141614] border border-white/5 hover:border-[#4a7c59]/40 px-4 py-3 transition-all text-[#c2a878] hover:text-white font-display uppercase tracking-wider"
              >
                {l.label} &rarr;
              </Link>
            ))}
          </div>
          <p className="text-center text-gray-400 text-sm mt-8">
            Don&rsquo;t see your town? <Link href="/service-areas" className="text-[#c2a878] hover:text-white underline">See our full service area &rarr;</Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#0d0f0d] py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-12">
            Common Demolition Questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div key={i} className="border border-white/10 bg-[#141614]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-display uppercase text-white text-base pr-4">{f.q}</span>
                  <span className="font-display text-[#579269] text-2xl leading-none">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
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
            Ready to Tear It Down?
          </h2>
          <p className="font-sans text-white/80 mb-8 max-w-xl mx-auto">
            Tell us what needs to go and where. Free on-site estimate, firm price, debris hauled off.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" data-cta="estimate" className="inline-block bg-white text-[#0d0f0d] hover:bg-gray-100 font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Demolition Estimate
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
      <SpecialtyAreaLinks service="site" specialty="Demolition" />
    </main>
  )
}
