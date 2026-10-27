'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { IMAGES, PHONE, PHONE_HREF, COMPANY, REVIEWS, REVIEW_STATS, CERTS, EST_YEAR } from '@/shared/constants'
import Breadcrumbs from '@/components/Breadcrumbs'
import SpecialtyAreaLinks from '@/components/SpecialtyAreaLinks'

const FAQS = [
  {
    q: 'How much does it cost to demolish a mobile home in Volusia County?',
    a: 'The drivers are size, what is still inside it, and how far the trucks have to travel to the landfill. A stripped single wide on an open lot is straightforward. A double wide full of contents, with a carport, a deck and a skirting wall, is a bigger job. We walk it and give you a flat price with the disposal included, so there is no second invoice after the dumpster is weighed.',
  },
  {
    q: 'Do I need a permit to demolish a mobile home?',
    a: 'In most of Volusia County yes, and the utility disconnects have to be signed off before anything comes down. We handle the demolition permit and coordinate the power, water and gas disconnects as part of the job. If the unit is in a park, the park owner usually has their own requirements on top and we work to those too.',
  },
  {
    q: 'Can you take out several units in a park at once?',
    a: 'Yes, and it is usually cheaper per unit that way. Mobilizing the machine and the trucks once across six lots costs far less than six separate trips. If you are clearing or repositioning a park, talk to us about the whole scope rather than one lot at a time.',
  },
  {
    q: 'What happens to the pad, the piers and the tie-downs?',
    a: 'They come out unless you tell us to leave them. Piers, anchors, skirting footers and the old pad all get removed and hauled, and we grade the lot flat behind us. If you are setting a new unit on the same spot we can leave the pad and work around it.',
  },
  {
    q: 'Do you handle the contents, or does it need to be empty first?',
    a: 'We can take it as it stands. Most of the units we are called to still have furniture, appliances and personal effects in them. It affects the price because it affects the disposal weight, so tell us what is in there and we will price it properly rather than guessing.',
  },
  {
    q: 'What about asbestos or other regulated material?',
    a: 'Older units can contain regulated material, and Florida requires a survey before demolition on many of them. We will tell you straight if your unit is in the age band where that applies, and we will not start a teardown that needs a survey until the survey is done.',
  },
  {
    q: 'How long does a mobile home demolition take?',
    a: 'A single unit with clear access is normally a one-day job including haul off. Multiple units, restricted access, or a lot that needs grading and fill afterwards runs longer, and we give you the schedule up front.',
  },
]

const STEPS = [
  { num: '01', title: 'Walk the Lot', desc: 'Size, contents, access, and whether the unit is old enough to need a survey.' },
  { num: '02', title: 'Permits & Disconnects', desc: 'We pull the demolition permit and line up the power, water and gas sign-offs.' },
  { num: '03', title: 'Tear Down & Haul', desc: 'Unit, skirting, carport, deck and steps. Loaded out and weighed in at the landfill.' },
  { num: '04', title: 'Clear the Pad', desc: 'Piers, anchors and footers out, lot graded flat and ready to re-set or sell.' },
]

const CROSS_LINKS = [
  { name: 'Demolition', href: '/services/site-work/demolition' },
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
        { name: 'Mobile Home Demolition', url: '/services/site-work/mobile-home-demolition' },
      ]} />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.site12})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0f0d]/80 via-[#0d0f0d]/60 to-[#0d0f0d]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-24">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {CERTS.slice(0, 3).map((c) => (
              <span key={c} className="text-xs font-sans bg-[#4a7c59]/20 text-[#5d9c70] border border-[#4a7c59]/30 px-3 py-1 rounded-full">{c}</span>
            ))}
          </div>
          <h1 className="font-display text-4xl md:text-6xl uppercase tracking-tight text-white mb-6">
            Mobile Home Demolition &amp; Removal.
          </h1>
          <p className="font-sans text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Single wides, double wides, and whole rows of park lots. Torn down, hauled off, and the pad left flat and ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Teardown Price
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
            Who Calls Us About a Mobile Home
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Usually it is a unit nobody can rent, sell, or insure, sitting on ground somebody needs back.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Park Owners Clearing Lots', desc: 'Abandoned units are costing you a lot that could be earning. We clear them in batches so the per-unit price drops and the row comes back into service together.' },
              { title: 'Storm or Fire Damaged Units', desc: 'Once the insurer has done their part the unit still has to physically go. We tear down and haul the whole thing including the debris field around it.' },
              { title: 'Inherited Property', desc: 'A family lot with an old unit on it that nobody wants and nobody can sell. Clear the lot and the land is worth what the land is worth.' },
              { title: 'Replacing with a New Unit', desc: 'The old one has to come off before the new one can be set. We can leave the pad and the utility runs where you want them kept.' },
              { title: 'Code Enforcement Pressure', desc: 'Volusia and the cities will cite a derelict unit, and the fines compound. Removal ends it rather than deferring it.' },
              { title: 'Selling the Land', desc: 'A buyer discounts hard for a teardown they have to organize. A cleared, graded lot sells on its own merits.' },
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
                One Crew, One Price, Lot Left Clean
              </h2>
              <p className="font-sans text-gray-300 leading-relaxed mb-4">
                {COMPANY} takes a mobile home teardown end to end. We pull the demolition permit, line up the utility disconnects, and then the unit, the skirting, the carport, the deck and the steps all come down and go out on our trucks. Disposal is in the price, so the number you agree is the number you pay.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed mb-4">
                What separates a finished job from a half-finished one is the ground afterwards. Piers, anchors, footers and the old pad come out, and we grade the lot flat so it is ready to re-set a unit, build on, or sell. Plenty of teardown outfits leave that part for somebody else.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed mb-6">
                We own the machines and run our own crew, which is why multiple units in one park cost noticeably less per lot than calling it in one at a time. If you have a row to clear, bring us the whole row.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Single & Double Wides', 'Contents Included', 'Permit & Disconnects', 'Multi-Unit Park Clearouts', 'Piers, Anchors & Pad', 'Lot Graded Flat'].map((s) => (
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
                  src={IMAGES.site12}
                  alt="Excavator working a demolition on a Central Florida lot"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="relative rounded w-full h-48 overflow-hidden">
                <Image
                  src={IMAGES.site14}
                  alt="Demolition debris loaded for haul off"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="relative rounded w-full h-48 col-span-2 overflow-hidden">
                <Image
                  src={IMAGES.site15}
                  alt="Lot graded flat after a teardown"
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
            Most single units are down, loaded and gone inside a day.
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
            Get the Lot Back
          </h2>
          <p className="font-sans text-white/80 mb-8 max-w-xl mx-auto">
            Tell us how many units and roughly what is in them, and we will price the teardown with the haul off included.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-white text-[#0d0f0d] hover:bg-gray-100 font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Teardown Price
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
      <SpecialtyAreaLinks service="site" specialty="Mobile Home Demolition" />
    </main>
  )
}
