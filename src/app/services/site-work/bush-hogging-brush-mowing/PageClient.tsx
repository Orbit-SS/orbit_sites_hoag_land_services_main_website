'use client'
import Link from 'next/link'
import { useState } from 'react'
import { IMAGES, PHONE, PHONE_HREF, COMPANY, REVIEWS, REVIEW_STATS, CERTS, EST_YEAR } from '@/shared/constants'
import Breadcrumbs from '@/components/Breadcrumbs'

const FAQS = [
  {
    q: "What's the difference between bush hogging and brush mowing?",
    a: "Bush hogging is the colloquial term for cutting with a heavy rotary mower pulled behind a tractor — great for grass, weeds, and saplings up to about 2 inches. Brush mowing is the broader category and usually means heavier equipment for material a bush hog can't handle. In practice, the words get used interchangeably. We handle both ends of the spectrum and pick the equipment based on what's actually growing on your property.",
  },
  {
    q: 'How much does bush hogging cost per acre in Central Florida?',
    a: "It depends on vegetation density, terrain, access, and how long it's been since the property was last mowed. A flat pasture mowed annually costs far less per acre than five-year-overgrown acreage we have to flail-mow. We provide free on-site estimates so you get a firm number before any work starts. Most jobs are quoted as a flat rate, not by the hour.",
  },
  {
    q: 'Can you bush hog wet or low-lying fields?',
    a: "Sometimes — depends on standing water depth and soil saturation. We've worked plenty of Central Florida properties with seasonal wet spots. We assess during the site walk and either time the work for drier conditions or bring tracked equipment that can handle softer ground. We won't tear up your field for the sake of finishing on time.",
  },
  {
    q: 'How often should I have my pasture or field mowed?',
    a: 'Most working pastures benefit from at least one mowing per year — typically late summer or fall. Hayfields are different and follow the harvest schedule. Vacant lots and conservation acreage often get mowed once or twice a year to stay manageable. We can set up a recurring schedule if you want it handled without having to call every year.',
  },
  {
    q: 'Do you mow small residential lots or just acreage?',
    a: "Both. We bush hog and brush mow lots from a quarter-acre up to hundreds of acres. For very small flat lots, a regular lawn service is usually a better fit. For anything that's too rough, too tall, or too wooded for a standard mower, we're the call.",
  },
]

const HERO_PILLS = [
  { label: 'Bush Hogging', anchor: 'bush-hogging' },
  { label: 'Brush Mowing', anchor: 'brush-mowing' },
  { label: 'Field Mowing', anchor: 'field-mowing' },
  { label: 'Overgrown Lots', anchor: 'overgrown-lots' },
  { label: 'Vegetation Mgmt', anchor: 'vegetation-management' },
  { label: 'Land Clearing Support', anchor: 'land-clearing-support' },
]

const PROBLEMS = [
  {
    title: "Field Hasn't Been Mowed in Years",
    desc: 'Pastures and hay fields turn into chest-high brush fast. The longer you wait, the more it costs.',
  },
  {
    title: 'Pasture Lost to Brush',
    desc: "If your livestock are forcing trails through scrub, the field's already half-gone. We bring it back.",
  },
  {
    title: 'Fence Lines Eating the Fence',
    desc: 'Vines and saplings on the fence line tear down barbed wire and split posts. Mow it back before you have to rebuild.',
  },
  {
    title: 'Vacant Lot Code Violation',
    desc: 'Counties and HOAs cite overgrown lots. We mow them down to compliant height — fast.',
  },
  {
    title: 'Selling Acreage, Need It Walkable',
    desc: "Buyers and appraisers can't value land they can't walk. Brush mowing makes the property show its size.",
  },
  {
    title: 'Wildfire Fuel Around Your Home',
    desc: 'Dry brush within 30 feet of a structure is fuel. Mowing creates defensible space before fire season.',
  },
]

const SUBSERVICES = [
  {
    id: 'bush-hogging',
    title: 'Bush Hogging',
    desc: 'Rotary cutter pulled behind a tractor: the workhorse of rural Central Florida vegetation management. We bush hog pastures, hayfields, fence lines, and overgrown acreage on properties from one acre to several hundred. Grass, weeds, brambles, and saplings up to about 2 inches go down in one pass. We work residential, agricultural, and commercial parcels.',
    image: '/photos/hoag/hay-field-mowing-central-florida.jpeg',
  },
  {
    id: 'brush-mowing',
    title: 'Brush Mowing',
    desc: "Heavier than bush hogging: purpose-built for material a rotary cutter can't chew. We use flail mowers and forestry-grade equipment to cut brush, light scrub, briars, and small saplings up to about 4 inches. Ideal for lots that have gone untouched for 5+ years where bush hogging alone won't get you down to dirt.",
    image: '/photos/hoag/pasture-mowing-volusia-county.jpeg',
    imagePos: 'center bottom',
    imageAlt: 'Freshly mowed hay pasture behind a farm gate in Volusia County FL, with the finished field visible to the tree line',
  },
  {
    id: 'field-mowing',
    title: 'Field Mowing',
    desc: 'Routine and one-time field mowing for pastures, hay fields, and large open lots. We cut at the height you want: grazing height, conservation height, or knocked flat for resale. Repeat mowing on a schedule keeps fields productive and prevents the brush comeback that turns a one-day job into a one-week job.',
    image: '/photos/hoag/right-of-way-mowing-pipeline-fl.jpeg',
  },
  {
    id: 'overgrown-lots',
    title: 'Overgrown Lot Cleanup',
    desc: 'Vacant lots that have been neglected for years need more than mowing: they need a plan. We assess the lot, identify trees worth keeping, and get the rest mowed flat. For code-violation lots and pre-sale cleanup, we work fast and leave the property in a condition you can defend or list immediately.',
    image: '/photos/hoag/bush-hogging-deland-fl.jpeg',
  },
  {
    id: 'vegetation-management',
    title: 'Vegetation Management',
    desc: "Ongoing or scheduled vegetation control for properties that can't go feral again. HOA-adjacent acreage, conservation easements, commercial setbacks, agricultural right-of-ways, and seasonal mowing programs. We set up a maintenance schedule that keeps the property to spec without you having to chase us.",
    image: '/photos/hoag/trail-mowing-central-florida-01.jpeg',
  },
  {
    id: 'land-clearing-support',
    title: 'Light Land Clearing Support',
    desc: "When mowing alone won't cut it (literally) we step up to forestry mulching, brush removal, and small-tree clearing as part of the same job. Think of this as the bridge between brush mowing and full land clearing.",
    image: '/photos/hoag/trail-mowing-central-florida-02.jpeg',
    linkLandClearing: true,
  },
]

const STEPS = [
  { num: '01', title: 'Call', desc: 'Tell us what you need mowed and how big the property is. Photos help.' },
  { num: '02', title: 'Site Walk', desc: 'We walk the property, identify what equipment fits the job, and give you a firm estimate.' },
  { num: '03', title: 'Mow', desc: 'Our crew shows up with the right machine and gets it cut — usually in one day for residential, longer for acreage.' },
  { num: '04', title: 'Done', desc: "Property mowed flat, debris cleaned up if specified, ready for whatever's next." },
]

const WHY_CARDS = [
  {
    title: 'Right Equipment',
    desc: "Tractors, rotary cutters, flail mowers, forestry mulchers. We bring the machine that finishes the job — not the one that's available.",
  },
  {
    title: 'Local & Family-Owned',
    desc: 'Born and based in DeLeon Springs. Tyler Hoag answers the phone. No call centers, no franchise scripts.',
  },
  {
    title: 'No Subcontractors',
    desc: 'Our own crew runs every job. No middlemen, no surprise faces on your property.',
  },
  {
    title: 'Licensed & Insured',
    desc: 'Fully licensed and insured in Florida. Your property is covered start to finish.',
  },
]

const SERVICE_AREA_LINKS = [
  { label: 'Bush Hogging in DeLand', href: '/services/site-work/deland' },
  { label: 'Brush Mowing in DeLeon Springs', href: '/services/site-work/deleon-springs' },
  { label: 'Field Mowing in Barberville', href: '/services/site-work/barberville' },
  { label: 'Bush Hogging in Pierson', href: '/services/site-work/pierson' },
  { label: 'Brush Mowing in Seville', href: '/services/site-work/seville' },
  { label: 'Overgrown Lot Mowing in Astor', href: '/services/site-work/astor' },
  { label: 'Bush Hogging in Crescent City', href: '/services/site-work/crescent-city' },
  { label: 'Brush Mowing in Lake Helen', href: '/services/site-work/lake-helen' },
  { label: 'Vegetation Management in Pomona Park', href: '/services/site-work/pomona-park' },
  { label: 'Bush Hogging in Altoona', href: '/services/site-work/altoona' },
  { label: 'Brush Mowing in Umatilla', href: '/services/site-work/umatilla' },
]

const CROSS_LINKS = [
  { name: 'Land Clearing', href: '/services/site-work/land-clearing' },
  { name: 'Forestry Mulching', href: '/services/site-work/environmental-services' },
  { name: 'Earthworks & Excavation', href: '/services/site-work/earthworks-excavation' },
  { name: 'Drainage & Grading', href: '/services/site-work/drainage-grading' },
  { name: 'Land Preparation', href: '/services/site-work/land-preparation' },
  { name: 'Overgrown Land Clearing', href: '/services/site-work/overgrown-land-clearing' },
]

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main className="bg-[#0d0f0d] text-gray-100">
      <Breadcrumbs crumbs={[
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services' },
        { name: 'Site Work', url: '/services/site-work' },
        { name: 'Bush Hogging & Brush Mowing', url: '/services/site-work/bush-hogging-brush-mowing' },
      ]} />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/photos/hoag/bush-hogging-deland-fl.jpeg)` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0f0d]/80 via-[#0d0f0d]/60 to-[#0d0f0d]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-24">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {CERTS.slice(0, 3).map((c) => (
              <span key={c} className="text-xs font-sans bg-[#4a7c59]/20 text-[#4a7c59] border border-[#4a7c59]/30 px-3 py-1 rounded-full">{c}</span>
            ))}
          </div>
          <h1 className="font-display text-4xl md:text-6xl uppercase tracking-tight text-white mb-6">
            Bush Hogging &amp; Brush Mowing in Central Florida
          </h1>
          <p className="font-sans text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            From overgrown fields to fence lines that haven&apos;t seen a tractor in years — our bush hogging and brush mowing crews clear it with the right equipment for the job. One call, one crew, one clean property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Mowing Estimate
            </Link>
            <a href={PHONE_HREF} className="inline-block border-2 border-[#c2a878] text-[#c2a878] hover:bg-[#c2a878] hover:text-[#0d0f0d] font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Call {PHONE}
            </a>
          </div>
          <p className="mt-6 text-sm text-gray-400 font-sans">
            {REVIEW_STATS.stars}-Star Rating ({REVIEW_STATS.count} Google Reviews) &middot; Est. {EST_YEAR}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {HERO_PILLS.map((p) => (
              <a key={p.anchor} href={`#${p.anchor}`} className="text-xs font-sans bg-white/5 hover:bg-[#4a7c59]/30 text-gray-300 border border-white/10 hover:border-[#4a7c59]/50 px-3 py-1 rounded-full transition-colors">
                {p.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* When You Need This Service */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-4">
            When You Need Bush Hogging or Brush Mowing
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-2xl mx-auto mb-12">
            If one of these sounds like your property, you need more than a lawn mower. You need real equipment and a crew that gets it done.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROBLEMS.map((p) => (
              <div key={p.title} className="bg-[#1a1c1a] border border-[#4a7c59]/10 p-6 rounded">
                <h3 className="font-display text-lg uppercase text-[#c2a878] mb-2">{p.title}</h3>
                <p className="font-sans text-gray-300 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution / What We Actually Do */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl uppercase text-white mb-6">
                What&apos;s the Difference — and What We Actually Do
              </h2>
              <p className="font-sans text-gray-300 leading-relaxed mb-4">
                Bush hogging and brush mowing are the same job to most folks — cutting down vegetation that&apos;s too thick for a lawn mower. The terms get used interchangeably, but there&apos;s a technical difference. Bush hogging uses a heavy rotary cutter pulled behind a tractor — it eats grass, saplings up to 2 inches, and dense brush in one pass. Brush mowing is the broader category: anything from a flail mower on smaller acreage to a forestry-grade disc mulcher on really gnarly material.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed mb-4">
                {COMPANY} runs the right equipment for whatever your property throws at us. Standard rotary cutters for fields and pastures. Heavier flail mowers for material with embedded debris. Forestry mulchers when the brush has turned into a wall of small trees. We assess the job during the site walk and bring the machine that finishes it in one trip — not three.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed mb-6">
                Every job ends with the property mowed flat, debris cleaned up if needed, and a clear path forward — whether that&apos;s grazing, building, selling, or just being able to walk your own land again.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Bush Hogging', 'Brush Mowing', 'Field Mowing', 'Overgrown Lot Cleanup', 'Vegetation Management', 'Light Land Clearing Support'].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#4a7c59] rounded-full shrink-0" />
                    <span className="font-sans text-sm text-gray-300">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img src="/photos/hoag/hay-field-mowing-central-florida.jpeg" alt="Hoag Land Services bush hogging a Central Florida hay field" className="rounded w-full h-48 object-cover" />
              <img src="/photos/hoag/right-of-way-mowing-pipeline-fl.jpeg" alt="Brush mowing along a Central Florida right-of-way and pipeline corridor" className="rounded w-full h-48 object-cover" />
              <img src="/photos/hoag/bush-hogging-deland-fl.jpeg" alt="Skid steer with brush cutter clearing an overgrown DeLand lot: before and after in one frame" className="rounded w-full h-48 object-cover col-span-2" />
            </div>
          </div>
        </div>
      </section>

      {/* Subservice Sections */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-4">
            Our Vegetation Management Services
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Six related services, one crew, one estimate. Here&apos;s what we handle.
          </p>
          <div className="space-y-16">
            {SUBSERVICES.map((sub, idx) => (
              <div key={sub.id} id={sub.id} className={`grid md:grid-cols-2 gap-8 items-center ${idx % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
                <img
                  src={sub.image}
                  alt={sub.imageAlt ?? `${sub.title} on Central Florida property`}
                  className="w-full h-64 object-cover rounded"
                  style={sub.imagePos ? { objectPosition: sub.imagePos } : undefined}
                />
                <div>
                  <h3 className="font-display text-2xl uppercase text-[#c2a878] mb-3">{sub.title}</h3>
                  <p className="font-sans text-gray-300 leading-relaxed">
                    {sub.desc}
                    {sub.linkLandClearing && (
                      <> For the heavy stuff, see our <Link href="/services/site-work/land-clearing" className="text-[#4a7c59] hover:underline">Land Clearing page</Link>.</>
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
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-4">
            How It Works
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-xl mx-auto mb-12">
            Four steps from overgrown to mowed. No runaround.
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

      {/* Why Choose */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-4">
            Why {COMPANY}
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Since {EST_YEAR}, we&apos;ve built a reputation on showing up, doing what we said, and not leaving until it&apos;s right.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CARDS.map((w) => (
              <div key={w.title} className="bg-[#1a1c1a] border border-[#4a7c59]/10 p-6 rounded">
                <h3 className="font-display text-lg uppercase text-[#c2a878] mb-2">{w.title}</h3>
                <p className="font-sans text-gray-300 text-sm leading-relaxed">{w.desc}</p>
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

      {/* Service Area */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-4">
            Service Area — Where We Mow
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Born in DeLeon Springs, working across Volusia, Lake, and Putnam counties.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
            {SERVICE_AREA_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="block bg-[#1a1c1a] hover:bg-[#1a1c1a]/70 border border-[#4a7c59]/10 hover:border-[#4a7c59]/40 p-4 rounded text-center transition-colors">
                <span className="font-sans text-sm text-gray-300">{link.label}</span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-center font-sans text-gray-400">
            Don&apos;t see your town?{' '}
            <Link href="/service-areas" className="text-[#4a7c59] hover:underline">See full service area →</Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#0d0f0d] py-20">
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
                  <span className="text-[#4a7c59] text-xl shrink-0">{openFaq === i ? '−' : '+'}</span>
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
            Ready to Reclaim Your Property?
          </h2>
          <p className="font-sans text-white/80 mb-8 max-w-xl mx-auto">
            Tell us about the land you need mowed and we&apos;ll walk it, give you a straight estimate, and get the job done on your timeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-white text-[#0d0f0d] hover:bg-gray-100 font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Mowing Estimate
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
