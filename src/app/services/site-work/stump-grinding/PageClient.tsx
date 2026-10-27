'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { IMAGES, PHONE, PHONE_HREF, COMPANY, REVIEWS, REVIEW_STATS, CERTS, EST_YEAR } from '@/shared/constants'
import Breadcrumbs from '@/components/Breadcrumbs'
import SpecialtyAreaLinks from '@/components/SpecialtyAreaLinks'

const FAQS = [
  {
    q: 'What is the difference between stump grinding and stump removal?',
    a: 'Grinding chews the stump down below ground level with a cutting wheel and leaves the root ball in place to rot. Removal pulls the whole stump and the major roots out with an excavator, which leaves a much bigger hole but a genuinely clear footprint. Grinding is right for a lawn or a flower bed. Removal is right where something is going to be built, paved, or trenched through.',
  },
  {
    q: 'How deep do you grind a stump?',
    a: 'Six to twelve inches below grade for most residential work, which is enough to lay sod or plant over the top. If you are putting in a new tree in the same spot we go deeper and pull more of the root plate, because a new root system will not establish through old wood.',
  },
  {
    q: 'How much does stump grinding cost in Volusia County?',
    a: 'It comes down to diameter, how many you have, and whether the machine can reach them. One stump in an open front yard is a quick job. Six stumps behind a fence with a narrow gate takes longer and needs smaller equipment. We quote a firm price after a look, not an hourly rate that moves on you.',
  },
  {
    q: 'Can you get a grinder into my back yard?',
    a: 'Usually. We run machines that fit through a standard gate and track across grass without tearing it apart. If access is genuinely too tight we will tell you that on the site walk and talk through the alternatives rather than turning up and failing.',
  },
  {
    q: 'What happens to the grindings?',
    a: 'You can keep them. The chips and soil make a good mulch and most people want them spread back over the hole or used on a bed. If you would rather they went, we haul them off and backfill with clean fill so the ground is level and ready to seed.',
  },
  {
    q: 'Do you grind stumps you did not remove the tree from?',
    a: 'Yes. Plenty of our stump work is on trees someone else took down, or on stumps that have been sitting for years. An old weathered stump often grinds easier than a fresh one.',
  },
  {
    q: 'Will the roots keep growing after grinding?',
    a: 'No. Once the stump is ground below grade the tree cannot photosynthesize and the remaining roots die off and break down over the next few seasons. A few species throw suckers from the root line for a while, and we will tell you if yours is one of them.',
  },
]

const STEPS = [
  { num: '01', title: 'Send a Photo', desc: 'A picture and a rough diameter is usually enough for us to price it.' },
  { num: '02', title: 'We Check Access', desc: 'Gate width, slope, irrigation and utilities. That decides which machine comes.' },
  { num: '03', title: 'Grind', desc: 'Down below grade, with the area tarped so chips do not end up across the yard.' },
  { num: '04', title: 'Backfill or Mulch', desc: 'Grindings spread back and levelled, or hauled off and filled with clean soil.' },
]

const CROSS_LINKS = [
  { name: 'Tree Removal', href: '/services/tree-services/tree-removal' },
  { name: 'Land Clearing', href: '/services/site-work/land-clearing' },
  { name: 'Land Preparation', href: '/services/site-work/land-preparation' },
]

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main className="bg-[#0d0f0d] text-gray-100">
      <Breadcrumbs crumbs={[
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services' },
        { name: 'Site Work', url: '/services/site-work' },
        { name: 'Stump Grinding', url: '/services/site-work/stump-grinding' },
      ]} />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.site9})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0f0d]/80 via-[#0d0f0d]/60 to-[#0d0f0d]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-24">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {CERTS.slice(0, 3).map((c) => (
              <span key={c} className="text-xs font-sans bg-[#4a7c59]/20 text-[#5d9c70] border border-[#4a7c59]/30 px-3 py-1 rounded-full">{c}</span>
            ))}
          </div>
          <h1 className="font-display text-4xl md:text-6xl uppercase tracking-tight text-white mb-6">
            Stump Grinding &amp; Stump Removal.
          </h1>
          <p className="font-sans text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            The tree is gone and the stump is still there. We grind it below grade so you can mow straight over it, lay sod, or build on the spot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Stump Quote
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
            Reasons People Call Us About a Stump
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-2xl mx-auto mb-12">
            A stump is rarely just ugly. It is usually in the way of something you are trying to do.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'You Cannot Mow Around It', desc: 'Every pass means going round it, and the mower deck has found it at least once. Ground below grade, the stump stops existing as far as your mower is concerned.' },
              { title: 'Replanting in the Same Spot', desc: 'A new tree will not root through old wood. We take the root plate out properly so the replacement actually establishes.' },
              { title: 'Building, Paving or Fencing', desc: 'A fence post line, a shed pad, or a driveway cannot run through a stump. That is a removal job rather than a grind.' },
              { title: 'Termites and Carpenter Ants', desc: 'A rotting stump near the house is a food source and a nest site. Taking it out removes the attraction.' },
              { title: 'Selling the Property', desc: 'Stumps read as deferred maintenance to a buyer and to an inspector. A clean yard shows better and inspects cleaner.' },
              { title: 'Clearing a Whole Lot', desc: 'Dozens of stumps after a clearing job. We grind in bulk and grade the ground flat behind us in the same visit.' },
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
                Grinding or Full Removal, Whichever the Job Needs
              </h2>
              <p className="font-sans text-gray-300 leading-relaxed mb-4">
                {COMPANY} does both, and the right answer depends on what is going on that ground afterwards. For a lawn, a bed, or anything you just want to stop looking at, grinding is faster, cheaper and leaves far less mess. The wheel takes the stump down six to twelve inches below grade and the root ball breaks down on its own.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed mb-4">
                Where a foundation, a driveway, a pool or a utility trench is going in, that root plate is a problem and it has to come out. We bring an excavator, pull the stump and the major roots whole, and backfill with clean fill so you have a compactable surface rather than a void that settles in two years.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed mb-6">
                We check for irrigation lines, septic, lighting and utilities before the wheel touches anything. Tyler Hoag is an ISA Certified Arborist, so if there is a question about whether a tree beside the stump is also failing, you get a straight answer rather than a sales pitch.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Grinding Below Grade', 'Full Root Plate Removal', 'Multiple Stumps', 'Tight Back Yard Access', 'Grindings Hauled Off', 'Backfill & Level'].map((s) => (
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
                  src={IMAGES.site9}
                  alt="Stump grinding equipment working on a Central Florida property"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="relative rounded w-full h-48 overflow-hidden">
                <Image
                  src={IMAGES.site11}
                  alt="Stump and root plate removed with an excavator"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="relative rounded w-full h-48 col-span-2 overflow-hidden">
                <Image
                  src={IMAGES.site15}
                  alt="Ground levelled and ready to seed after stump work"
                  fill
                  sizes="(max-width: 640px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-4">
            How It Works
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-xl mx-auto mb-12">
            Most stump jobs are done inside a morning.
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
            Send Us a Photo of the Stump
          </h2>
          <p className="font-sans text-white/80 mb-8 max-w-xl mx-auto">
            A picture and a rough size is usually all we need to give you a number.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-white text-[#0d0f0d] hover:bg-gray-100 font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Stump Quote
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
            Related Services
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
      <SpecialtyAreaLinks service="site" specialty="Stump Grinding" />
    </main>
  )
}
