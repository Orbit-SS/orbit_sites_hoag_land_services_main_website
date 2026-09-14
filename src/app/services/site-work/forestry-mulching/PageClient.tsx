'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { IMAGES, PHONE, PHONE_HREF, COMPANY, REVIEWS, REVIEW_STATS, CERTS, EST_YEAR } from '@/shared/constants'
import Breadcrumbs from '@/components/Breadcrumbs'
import SpecialtyAreaLinks from '@/components/SpecialtyAreaLinks'

const FAQS = [
  {
    q: 'What is forestry mulching, and how is it different from land clearing?',
    a: 'Forestry mulching grinds standing brush, palmetto and small trees into a layer of mulch that stays on the ground. Nothing is piled, burned or hauled away. Traditional land clearing pushes vegetation into piles and removes it, usually along with the root mat and topsoil. Mulching is faster, cheaper per acre, and leaves the soil in place, which is why it is the first choice for thinning, trails, fence lines and lots that do not need to be scraped to dirt.',
  },
  {
    q: 'How much does forestry mulching cost per acre in Central Florida?',
    a: 'It depends on how dense the growth is, the size of the trees in it, and how easy the property is to reach. Light palmetto and brush runs far cheaper per acre than a lot full of 8-inch oaks. We walk every property before quoting and give a firm number, not an hourly rate. Because there is no hauling or dump fees, mulching usually comes in well under a full clear.',
  },
  {
    q: 'What size trees can a forestry mulcher handle?',
    a: 'Our drum mulcher takes brush, palmetto, saplings and trees up to roughly 8 inches in diameter in a single pass. Larger trees are cut first and the stumps ground, or we bring in the excavator if the job is really a land-clearing job. We tell you which one you have during the site walk.',
  },
  {
    q: 'Does forestry mulching remove the stumps?',
    a: 'It grinds them down to or slightly below grade, but it does not pull the root ball. For most uses, such as pasture, trails, fire breaks or a cleaner lot, that is exactly what you want, because the roots hold the soil. If you are building on the spot, we grub the stumps out as part of land preparation instead.',
  },
  {
    q: 'Is forestry mulching allowed near wetlands and conservation areas in Volusia County?',
    a: 'Often it is the preferred method, because it does not disturb the soil or require burning. Wetland buffers, environmental easements and protected tree species still apply, and some parcels need a permit or a survey before any clearing. We have worked plenty of properties near the St. Johns and Lake Woodruff, and we will tell you up front if your lot needs paperwork before the machine shows up.',
  },
  {
    q: 'How long does the mulch layer last, and will the brush grow back?',
    a: 'The mulch breaks down over one to three seasons and feeds the soil while it does. Palmetto and some scrub will try to come back from the roots; a follow-up pass a year later, or a bush-hogging schedule, keeps it down. We can set that up so you are not calling every year.',
  },
]

const HERO_PILLS = [
  { label: 'Forestry Mulching', anchor: 'forestry-mulching' },
  { label: 'Palmetto & Underbrush', anchor: 'palmetto-underbrush' },
  { label: 'Lot Thinning', anchor: 'lot-thinning' },
  { label: 'Trails & Fence Lines', anchor: 'trails-fence-lines' },
  { label: 'Fire Breaks', anchor: 'fire-breaks' },
  { label: 'Invasive Removal', anchor: 'invasive-removal' },
]

const PROBLEMS = [
  {
    title: "Can't Walk Your Own Land",
    desc: 'Palmetto and vines have closed the lot in. You bought acreage and can see none of it. Mulching opens it up in a day, and you keep the trees worth keeping.',
  },
  {
    title: 'Burn Ban, No Burn Pile',
    desc: 'Volusia and Lake counties restrict open burning for much of the year. Mulching leaves nothing to burn and nothing to haul.',
  },
  {
    title: 'Lot Needs Clearing, Not Scraping',
    desc: 'A full clear strips the topsoil and leaves a mud lot. If you are not pouring a slab on it, mulching gets you a usable property without the erosion.',
  },
  {
    title: 'Fence Line Swallowed by Scrub',
    desc: 'Wax myrtle and saplings on the line are tearing down wire and rotting posts. A mulcher runs the fence line clean without touching the fence.',
  },
  {
    title: 'Wildfire Fuel Around the House',
    desc: 'Dry palmetto within 30 feet of a structure is fuel. A mulched break gives you defensible space and a firebreak that actually holds.',
  },
  {
    title: 'Selling Acreage Nobody Can See',
    desc: 'Buyers and appraisers cannot value land they cannot walk. Mulched trails and a cleared frontage let the property show its size.',
  },
]

const SUBSERVICES = [
  {
    id: 'forestry-mulching',
    title: 'Forestry Mulching',
    desc: 'A forestry mulcher is a tracked machine with a rotating drum and carbide teeth. It drives into standing brush and small trees and grinds them, stumps and all, into a mulch layer that stays on the ground. No piles, no burning, no dump trucks. We run it on properties from a single lot to hundreds of acres across DeLand and Central Florida.',
    image: '/photos/hoag/land-clearing-lake-shore-deland-fl.jpeg',
    imagePos: 'center bottom',
    imageAlt: 'Forestry mulching along a lake shore in DeLand FL, with the mulched ground and the retained trees both visible',
  },
  {
    id: 'palmetto-underbrush',
    title: 'Palmetto & Underbrush Removal',
    desc: 'Saw palmetto is the default ground cover on Central Florida sand ridges, and it does not mow. A mulcher shreds palmetto, wax myrtle, briars and vines to the ground in one pass and leaves the canopy trees standing. This is the job most DeLand and DeLeon Springs acreage actually needs.',
    image: '/photos/hoag/bush-hogging-deland-fl.jpeg',
    imageAlt: 'Overgrown DeLand lot half cleared by a tracked mulcher: dense palmetto on one side, open ground on the other',
  },
  {
    id: 'lot-thinning',
    title: 'Lot Thinning & Selective Clearing',
    desc: 'You keep the live oaks, the big pines and the shade; we take everything underneath. Selective mulching turns a wall of scrub into a park-like lot without the cost of a full clear. We flag the keepers with you during the site walk so there is no guesswork on the day.',
    image: '/photos/hoag/trail-mowing-central-florida-01.jpeg',
  },
  {
    id: 'trails-fence-lines',
    title: 'Trails, Fence Lines & Access Roads',
    desc: 'Mulched trails for hunting land, equestrian property and large parcels; fence-line clearing that runs the wire without damaging it; and access lanes so equipment, well drillers or surveyors can reach the back of the property. Width to your spec, usually cut in a day.',
    image: '/photos/hoag/trail-mowing-central-florida-02.jpeg',
  },
  {
    id: 'fire-breaks',
    title: 'Fire Breaks & Defensible Space',
    desc: 'Central Florida burns in the dry months. A mulched break around structures, along property lines and beside pine plantations removes the ladder fuel that carries a ground fire into the canopy. Mulch left on the ground holds moisture and does not flash the way standing palmetto does.',
    image: '/photos/hoag/right-of-way-mowing-pipeline-fl.jpeg',
  },
  {
    id: 'invasive-removal',
    title: 'Invasive Vegetation Removal',
    desc: 'Brazilian pepper, Chinese tallow, cogon grass and camphor take over disturbed Central Florida land fast. Mulching knocks them down; paired with a herbicide treatment it keeps them from coming back. For wetland-adjacent parcels this is usually the only method that does not disturb the soil.',
    image: '/photos/hoag/tree-protection-zone-arborist-central-fl.jpeg',
    linkLandClearing: true,
  },
]

const STEPS = [
  { num: '01', title: 'Call', desc: 'Tell us roughly how many acres, what is growing on it, and what you want it for. Photos help.' },
  { num: '02', title: 'Site Walk', desc: 'We walk the property with you, flag the trees you keep, and give you a firm estimate, not a per-hour guess.' },
  { num: '03', title: 'Mulch', desc: 'The machine arrives on our own trailer and grinds the lot. Most residential parcels are done in a day; acreage takes longer.' },
  { num: '04', title: 'Done', desc: 'Property open, mulch on the ground, nothing to burn or haul. Ready for pasture, a build, a fence or just walking.' },
]

const WHY_CARDS = [
  {
    title: 'Purpose-Built Mulcher',
    desc: 'A tracked forestry mulcher with a carbide drum, not a skid steer with an attachment it is too light for. It finishes the job in one trip.',
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
  { label: 'Forestry Mulching in DeLand', href: '/services/site-work/deland' },
  { label: 'Forestry Mulching in DeLeon Springs', href: '/services/site-work/deleon-springs' },
  { label: 'Palmetto Clearing in Pierson', href: '/services/site-work/pierson' },
  { label: 'Forestry Mulching in Barberville', href: '/services/site-work/barberville' },
  { label: 'Lot Thinning in Lake Helen', href: '/services/site-work/lake-helen' },
  { label: 'Forestry Mulching in Astor', href: '/services/site-work/astor' },
  { label: 'Underbrush Removal in Seville', href: '/services/site-work/seville' },
  { label: 'Forestry Mulching in Crescent City', href: '/services/site-work/crescent-city' },
  { label: 'Forestry Mulching in Deltona', href: '/services/site-work/deltona' },
  { label: 'Fire Break Mulching in Paisley', href: '/services/site-work/paisley' },
  { label: 'Forestry Mulching in Umatilla', href: '/services/site-work/umatilla' },
]

const CROSS_LINKS = [
  { name: 'Land Clearing', href: '/services/site-work/land-clearing' },
  { name: 'Bush Hogging & Brush Mowing', href: '/services/site-work/bush-hogging-brush-mowing' },
  { name: 'Invasive Vegetation Removal', href: '/services/site-work/invasive-vegetation-removal' },
  { name: 'Overgrown Land Clearing', href: '/services/site-work/overgrown-land-clearing' },
  { name: 'Land Preparation', href: '/services/site-work/land-preparation' },
  { name: 'Environmental Services', href: '/services/site-work/environmental-services' },
]

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main className="bg-[#0d0f0d] text-gray-100">
      <Breadcrumbs crumbs={[
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services' },
        { name: 'Site Work', url: '/services/site-work' },
        { name: 'Forestry Mulching', url: '/services/site-work/forestry-mulching' },
      ]} />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/photos/hoag/land-clearing-lake-shore-deland-fl.jpeg)` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0f0d]/80 via-[#0d0f0d]/60 to-[#0d0f0d]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-24">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {CERTS.slice(0, 3).map((c) => (
              <span key={c} className="text-xs font-sans bg-[#4a7c59]/20 text-[#5d9c70] border border-[#4a7c59]/30 px-3 py-1 rounded-full">{c}</span>
            ))}
          </div>
          <h1 className="font-display text-4xl md:text-6xl uppercase tracking-tight text-white mb-6">
            Forestry Mulching in DeLand &amp; Central Florida
          </h1>
          <p className="font-sans text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Palmetto, underbrush and small trees ground in place. No burn pile, no dump trucks, no stripped topsoil. Keep the trees you want and get your land back in a day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Mulching Estimate
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
            When Forestry Mulching Is the Right Call
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-2xl mx-auto mb-12">
            If one of these sounds like your property, you probably do not need a full clear. You need a mulcher and a crew that knows which trees to leave.
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
                Forestry mulching is the middle ground between mowing and clearing. A bush hog handles grass and saplings; a land-clearing crew pushes everything into piles and hauls it off along with the topsoil. A forestry mulcher does something different: it drives into standing brush and trees up to about 8 inches, grinds them into a mulch layer, and leaves that layer on the ground. Nothing is burned, nothing is hauled, and the soil stays put.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed mb-4">
                {COMPANY} runs a tracked forestry mulcher with a carbide drum — the machine built for this, not a skid steer with an attachment it is too light for. On the site walk we flag the trees you keep, work out whether the job is mulching or true land clearing, and bring the equipment that finishes it in one trip. On Central Florida sand ridges covered in saw palmetto, that machine is usually the whole answer.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed mb-6">
                Every job ends with the property open, a clean mulch layer on the ground that holds the soil and feeds it as it breaks down, and a clear path forward — pasture, a build pad, a fence line, a trail, or just being able to walk your own land again.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Forestry Mulching', 'Palmetto & Underbrush', 'Lot Thinning', 'Trails & Fence Lines', 'Fire Breaks', 'Invasive Removal'].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#4a7c59] rounded-full shrink-0" />
                    <span className="font-sans text-sm text-gray-300">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative rounded w-full h-48 overflow-hidden">
                <Image
                  src="/photos/hoag/land-clearing-lake-shore-deland-fl.jpeg"
                  alt="Forestry mulching along a DeLand FL lake shore, mulched ground with retained canopy trees"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="relative rounded w-full h-48 overflow-hidden">
                <Image
                  src="/photos/hoag/trail-mowing-central-florida-01.jpeg"
                  alt="Mulched trail cut through Central Florida woods for property access"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="relative rounded w-full h-48 col-span-2 overflow-hidden">
                <Image
                  src="/photos/hoag/bush-hogging-deland-fl.jpeg"
                  alt="Overgrown DeLand lot half mulched: dense palmetto on one side, open ground on the other"
                  fill
                  sizes="(max-width: 640px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>
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
                <div className="relative w-full h-64 rounded overflow-hidden">
                  <Image
                    src={sub.image}
                    alt={sub.imageAlt ?? `${sub.title} on Central Florida property`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    style={sub.imagePos ? { objectPosition: sub.imagePos } : undefined}
                  />
                </div>
                <div>
                  <h3 className="font-display text-2xl uppercase text-[#c2a878] mb-3">{sub.title}</h3>
                  <p className="font-sans text-gray-300 leading-relaxed">
                    {sub.desc}
                    {sub.linkLandClearing && (
                      <> For the heavy stuff, see our <Link href="/services/site-work/land-clearing" className="text-[#5d9c70] hover:underline">Land Clearing page</Link>.</>
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
            Four steps from overgrown to open. No runaround.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s) => (
              <div key={s.num} className="text-center">
                <div className="text-5xl font-display text-[#5d9c70]/30 mb-2">{s.num}</div>
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
                <p className="font-sans text-sm text-gray-400">{r.name} &middot; {r.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-4">
            Service Area — Where We Mulch
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
            <Link href="/service-areas" className="text-[#5d9c70] hover:underline">See full service area →</Link>
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
                  <span className="text-[#5d9c70] text-xl shrink-0">{openFaq === i ? '−' : '+'}</span>
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
            Tell us about the land you need opened up and we&apos;ll walk it, flag the trees you keep, give you a straight estimate, and get the job done on your timeline.
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
      <SpecialtyAreaLinks service="site" specialty="Forestry Mulching" />
    </main>
  )
}
