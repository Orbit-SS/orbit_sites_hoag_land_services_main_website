'use client'
import Link from 'next/link'
import { useState } from 'react'
import { IMAGES, PHONE, PHONE_HREF, COMPANY, REVIEWS, REVIEW_STATS, CERTS, EST_YEAR } from '@/shared/constants'
import Breadcrumbs from '@/components/Breadcrumbs'

const FAQS = [
  {
    q: "Why is my yard flooding even when I have gutters?",
    a: "Gutters move water off your roof — they don't fix the slope, soil, or low spots in your yard. If water is pooling around your foundation, eroding your driveway, or sitting on the lawn for days, the problem is in how your property handles the water once it hits the ground. That's drainage work, not a gutter issue. We walk the property, find the source, and fix it.",
  },
  {
    q: "How much do drainage solutions cost in Central Florida?",
    a: "It depends on the scope. A simple swale to redirect runoff is a one-day job. Multiple French drains, regrading a yard, and installing a culvert is a different conversation. We give honest, no-pressure estimates after walking your property so you know exactly what the fix costs before any work begins.",
  },
  {
    q: "Will a French drain solve my flooding problem?",
    a: "Sometimes — and sometimes you need more than that. A French drain handles chronic soggy spots and subsurface water. Surface flooding from heavy rain often needs swales, regrading, or larger drainage systems. We don't sell you a French drain if the problem is bigger than that. We tell you what'll actually work.",
  },
  {
    q: "Do I need a permit for drainage work on my property?",
    a: "Depends on the scope and location. Residential swales and basic regrading usually don't require permits. Larger culvert installations, work near wetlands, or anything tying into county drainage systems often does. We know the local rules and handle the paperwork when permits are needed — no surprises mid-project.",
  },
  {
    q: "Can you fix damage that's already happened from flooding?",
    a: "Yes. We regrade washed-out areas, rebuild driveways the storms ate, repair erosion damage, and install drainage so the same thing doesn't happen next storm. We don't do interior water damage restoration — that's a different trade — but anything from the foundation out, we handle.",
  },
  {
    q: "How fast can you get out for storm-related flooding?",
    a: "Hurricane and major storm work is first-come, first-served in Central Florida — every drainage and site-work company gets slammed at the same time. Call as soon as you see the problem. We prioritize emergencies where water is actively threatening structures and work through the queue from there.",
  },
]

const PROBLEMS = [
  { title: 'Water Pooling Near the Foundation', desc: 'Standing water against the house siding is a slow-motion problem. It rots wood, cracks slabs, and floods crawl spaces. We grade away from the structure and add drainage to keep water moving past it.' },
  { title: 'Washed-Out Driveways', desc: "Every heavy rain takes more of your driveway with it. The culvert is too small, the slope is wrong, or there's no drainage where the water hits. We fix all three." },
  { title: "Soggy Yards That Won't Dry", desc: "Yards that stay wet for days after a storm have a drainage problem the topsoil can't fix on its own. French drains and regrading move that water out." },
  { title: 'Drainage Backing Up in Storms', desc: "If your existing drains can't keep up during heavy rain, the system is undersized or clogged. We upsize, clear, or replace as needed." },
  { title: 'Property Flooding After Hurricanes', desc: "Big storms expose every drainage weakness. Standing water in fields, washed-out access, eroded slopes. We rebuild and reinforce so the next one doesn't do the same damage." },
  { title: 'Driveway and Culvert Problems', desc: 'Failing culverts, wrong-sized pipes, eroded shoulders. We install and replace driveway culverts to spec — sized for the actual water volume.' },
]

const STEPS = [
  { num: '01', title: 'Walk the Property', desc: 'We come out and see the problem firsthand during a storm event if possible, or look for the telltale signs.' },
  { num: '02', title: 'Find the Source', desc: 'Most flooding has a cause upstream of where you see the problem. We trace it back.' },
  { num: '03', title: 'Design the Fix', desc: 'Swales, drains, regrading, culverts — whatever the property actually needs. No upsell.' },
  { num: '04', title: 'Install', desc: 'Heavy equipment in, work done right, debris hauled.' },
  { num: '05', title: 'Test', desc: 'We watch what the next rain does. If something needs adjustment, we come back.' },
]

const WHY_CHOOSE = [
  { title: 'We Find the Real Cause', desc: 'Symptoms get fixed by guessing. Causes get fixed by walking the property and understanding the water flow.' },
  { title: 'Right Equipment for Florida Soils', desc: "Sandy, clay, mucky, wet — Central Florida soils vary by the half-mile. We bring equipment matched to what's actually in the ground." },
  { title: 'Storm-Tested Designs', desc: 'We design for the worst storms, not the average ones. The fix has to hold up to a 6-inch downpour, not just an afternoon shower.' },
  { title: 'Licensed & Insured', desc: 'Fully licensed and insured in Florida. We handle permits where needed and stand behind every install.' },
]

const SERVICE_AREA_LINKS = [
  { label: 'Drainage Solutions in DeLand', href: '/services/site-work/deland' },
  { label: 'Flood Fix in DeLeon Springs', href: '/services/site-work/deleon-springs' },
  { label: 'Drainage in Barberville', href: '/services/site-work/barberville' },
  { label: 'Storm Damage Repair in Pierson', href: '/services/site-work/pierson' },
  { label: 'Drainage in Seville', href: '/services/site-work/seville' },
  { label: 'Flood Fix in Astor', href: '/services/site-work/astor' },
  { label: 'Drainage in Crescent City', href: '/services/site-work/crescent-city' },
  { label: 'Standing Water Fix in Lake Helen', href: '/services/site-work/lake-helen' },
  { label: 'Drainage in Pomona Park', href: '/services/site-work/pomona-park' },
  { label: 'Drainage in Altoona', href: '/services/site-work/altoona' },
  { label: 'Drainage Solutions in Umatilla', href: '/services/site-work/umatilla' },
]

const CROSS_LINKS = [
  { name: 'Drainage & Grading', href: '/services/site-work/drainage-grading' },
  { name: 'Erosion Control', href: '/services/site-work/erosion-control' },
  { name: 'Earthworks & Excavation', href: '/services/site-work/earthworks-excavation' },
  { name: 'Land Clearing', href: '/services/site-work/land-clearing' },
]

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main className="bg-[#0d0f0d] text-gray-100">
      <Breadcrumbs crumbs={[
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services' },
        { name: 'Site Work', url: '/services/site-work' },
        { name: 'Flooding & Drainage', url: '/services/site-work/flooding-drainage' },
      ]} />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.site11})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0f0d]/80 via-[#0d0f0d]/60 to-[#0d0f0d]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-24">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {CERTS.slice(0, 3).map((c) => (
              <span key={c} className="text-xs font-sans bg-[#4a7c59]/20 text-[#4a7c59] border border-[#4a7c59]/30 px-3 py-1 rounded-full">{c}</span>
            ))}
          </div>
          <h1 className="font-display text-4xl md:text-6xl uppercase tracking-tight text-white mb-6">
            Standing Water? Flooding After Storms? We Fix the Drainage.
          </h1>
          <p className="font-sans text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Central Florida is flat, sandy, and gets hammered by rain — between summer afternoon storms and hurricane season, drainage problems show up fast. We find the source and fix it so the water actually goes somewhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Drainage Estimate
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

      {/* The Pain — Common Problems We Solve */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-4">
            Where The Water Is Going Wrong
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Standing water doesn&apos;t just look bad — it damages structures, kills landscaping, breeds mosquitoes, and gets worse every storm. These are the problems we fix.
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

      {/* What We Do — Solution */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl uppercase text-white mb-6">
                Real Drainage Fixes, Not Quick Patches
              </h2>
              <p className="font-sans text-gray-300 leading-relaxed mb-4">
                Most drainage problems look small until the next storm. A soggy spot becomes a sinkhole. A pooled corner becomes a flooded foundation. A washed-out driveway becomes impassable. We don&apos;t put a band-aid on the symptom — we walk the property, trace where the water actually comes from, and design a fix that handles the worst storms, not just the average one.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed mb-4">
                {COMPANY} handles the full range of residential and commercial drainage work in Central Florida. Swale grading to redirect surface runoff. French drains for chronic soggy spots. Culvert installation and replacement for driveways. Regrading to fix the slope. Dry wells where the soil drains well enough to use them. Erosion control to protect what we just installed.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed mb-6">
                Every job ends with the water moving where it should go and the property protected for the next round of storms — not just dried out for today.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Swale Grading', 'French Drains', 'Culvert Installation', 'Regrading & Slope Correction', 'Dry Wells', 'Erosion Control'].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#4a7c59] rounded-full shrink-0" />
                    <span className="font-sans text-sm text-gray-300">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img src={IMAGES.site11} alt="Drainage and flooding solutions on a Central Florida property" className="rounded w-full h-48 object-cover" />
              <img src={IMAGES.site6} alt="Driveway grading and drainage work in progress" className="rounded w-full h-48 object-cover" />
              <img src={IMAGES.site8} alt="Heavy equipment regrading a flooded property" className="rounded w-full h-48 object-cover col-span-2" />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-4">
            How We Fix It
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-xl mx-auto mb-12">
            Five steps from problem to permanent fix.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
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
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-4">
            Why {COMPANY}
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Drainage work is technical. If it&apos;s done wrong, the next storm shows it. Here&apos;s why folks call us instead of guessing.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE.map((w) => (
              <div key={w.title} className="bg-[#1a1c1a] border border-[#4a7c59]/10 p-6 rounded">
                <h3 className="font-display text-lg uppercase text-[#c2a878] mb-2">{w.title}</h3>
                <p className="font-sans text-gray-300 text-sm leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-[#141614] py-20">
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
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-4">
            Service Area — Where We Fix Drainage
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Born in DeLeon Springs, working across Volusia, Lake, and Putnam counties.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICE_AREA_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block bg-[#1a1c1a] border border-[#4a7c59]/10 hover:border-[#4a7c59]/40 p-5 rounded transition-colors"
              >
                <span className="font-sans text-sm text-[#c2a878]">{link.label}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/service-areas" className="font-sans text-sm text-[#4a7c59] hover:text-[#c2a878] transition-colors">
              Don&apos;t see your town? See full service area &rarr;
            </Link>
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
            Stop The Standing Water
          </h2>
          <p className="font-sans text-white/80 mb-8 max-w-xl mx-auto">
            Tell us what&apos;s flooding and we&apos;ll walk the property, find the source, and fix it before the next storm.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-white text-[#0d0f0d] hover:bg-gray-100 font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Drainage Estimate
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
