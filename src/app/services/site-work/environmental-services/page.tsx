'use client'
import Link from 'next/link'
import { useState } from 'react'
import { IMAGES, PHONE, PHONE_HREF, EMAIL, COMPANY, REVIEWS, REVIEW_STATS, CERTS, EST_YEAR, FULL_SERVICES } from '@/shared/constants'

const FAQS = [
  {
    q: 'What is forestry mulching and how does it work?',
    a: 'Forestry mulching uses a specialized machine with a rotating drum and carbide teeth to grind standing trees, brush, and stumps into a layer of mulch that stays on the ground. It clears land in a single pass without burning, hauling, or piling debris. The mulch layer helps prevent erosion and returns nutrients to the soil.',
  },
  {
    q: 'What invasive species do you treat in Central Florida?',
    a: 'We commonly treat Brazilian pepper, Chinese tallow, melaleuca, Australian pine, and other invasive species found in Volusia County and surrounding areas. Treatment methods include mechanical removal, cut-stump herbicide application, and basal bark treatments depending on the species and site conditions.',
  },
  {
    q: 'Are the herbicides you use safe for surrounding vegetation?',
    a: 'We use targeted application methods — cut-stump treatment and basal bark application — that deliver herbicide directly to the target species without broadcast spraying. This protects surrounding native vegetation while effectively eliminating invasive trees and plants.',
  },
  {
    q: 'Do I need permits for work near wetlands?',
    a: 'Work in or near wetlands typically requires permits from the St. Johns River Water Management District and potentially the Army Corps of Engineers. We help identify what is needed and work within all regulatory requirements to keep your project compliant.',
  },
  {
    q: 'How much does forestry mulching cost per acre?',
    a: 'Cost depends on vegetation density, tree size, terrain, and access. Light brush and small trees cost less per acre than heavy hardwood stands. We provide a firm estimate after walking the property so you know exactly what your project will cost.',
  },
]

const STEPS = [
  { num: '01', title: 'Assess', desc: 'We survey your property, identify species, and evaluate terrain and access.' },
  { num: '02', title: 'Plan', desc: 'We develop a treatment plan with methods, timeline, and environmental compliance.' },
  { num: '03', title: 'Treat', desc: 'Our crew executes the plan — mulching, removal, herbicide treatment, or road construction.' },
  { num: '04', title: 'Monitor', desc: 'We follow up to verify treatment effectiveness and address any regrowth.' },
]

const CROSS_LINKS = [
  { name: 'Land Clearing', href: '/services/site-work/land-clearing' },
  { name: 'Earthworks & Excavation', href: '/services/site-work/earthworks-excavation' },
  { name: 'Erosion Control', href: '/services/site-work/erosion-control' },
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
          <span className="text-[#c2a878]">Environmental Services</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.site5})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0f0d]/80 via-[#0d0f0d]/60 to-[#0d0f0d]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-24">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {CERTS.slice(0, 3).map((c) => (
              <span key={c} className="text-xs font-sans bg-[#4a7c59]/20 text-[#4a7c59] border border-[#4a7c59]/30 px-3 py-1 rounded-full">{c}</span>
            ))}
          </div>
          <h1 className="font-display text-4xl md:text-6xl uppercase tracking-tight text-white mb-6">
            Environmental &amp; Forestry Services in Central Florida
          </h1>
          <p className="font-sans text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Forestry mulching, invasive species mitigation, herbicide treatments, and wetland access road construction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Environmental Services Estimate
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

      {/* Pain Points */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-4">
            Invasives Don&apos;t Manage Themselves
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Invasive species spread fast, wetland regulations are strict, and overgrown land gets worse every season. If any of these sound familiar, it is time to call in a professional crew.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Invasive Trees Taking Over', desc: 'Brazilian pepper, Chinese tallow, and other invasive species are choking out native vegetation and spreading across your property. Every season you wait, the problem gets worse and more expensive to fix.' },
              { title: 'Need Forestry Mulching', desc: 'You have dense brush, small trees, or overgrown land that needs to be cleared without the cost of hauling and disposal. Forestry mulching handles it in a single pass and leaves the mulch in place.' },
              { title: 'Wetland Access Required', desc: 'Your project requires access roads through or adjacent to wetland areas. You need a crew that understands environmental regulations and can build compliant access without violations.' },
              { title: 'Environmental Compliance', desc: 'Your property has environmental requirements from the water management district, county, or state. You need treatment plans and documentation that satisfy regulators.' },
            ].map((p) => (
              <div key={p.title} className="bg-[#1a1c1a] border border-[#4a7c59]/10 p-6 rounded">
                <h3 className="font-display text-lg uppercase text-[#c2a878] mb-2">{p.title}</h3>
                <p className="font-sans text-gray-300 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl uppercase text-white mb-6">
                Forestry &amp; Environmental Solutions
              </h2>
              <p className="font-sans text-gray-300 leading-relaxed mb-4">
                {COMPANY} provides specialized environmental and forestry services for landowners, developers, and government agencies across Central Florida. Our forestry mulching equipment grinds standing vegetation into a protective mulch layer in a single pass — no burning, no hauling, no debris piles.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed mb-4">
                For invasive species, we combine mechanical removal with targeted herbicide treatments including cut-stump and basal bark application. We identify species, develop treatment plans, and follow up to ensure the invasives do not return. Our ISA Certified Arborist brings expert knowledge of tree species identification and treatment methods.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed mb-6">
                When your project requires wetland access, we construct right-of-way roads that meet all environmental permitting requirements. From initial assessment through monitoring, we handle the entire process so you stay compliant and on schedule.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Forestry Mulching', 'Forestry Mowing', 'Invasive Tree Removal', 'Herbicide Treatment', 'Wetland Access Roads', 'Right of Way Clearing'].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#4a7c59] rounded-full shrink-0" />
                    <span className="font-sans text-sm text-gray-300">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img src={IMAGES.site5} alt="Forestry mulching" className="rounded w-full h-48 object-cover" />
              <img src={IMAGES.site15} alt="Environmental services" className="rounded w-full h-48 object-cover" />
              <img src={IMAGES.site15} alt="Completed forestry project" className="rounded w-full h-48 object-cover col-span-2" />
            </div>
          </div>
        </div>
      </section>

      {/* Results Gallery */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-4">
            Environmental &amp; Forestry Results
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Forestry mulching, invasive species mitigation, and land management projects across Central Florida.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[IMAGES.site5, IMAGES.site15].map((src, i) => (
              <img key={i} src={src} alt={`Environmental project ${i + 1}`} className="rounded w-full h-56 object-cover hover:opacity-90 transition-opacity" />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-4">
            How It Works
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-xl mx-auto mb-12">
            From species identification to follow-up monitoring, we handle every phase of environmental management.
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

      {/* Why Us */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-4">
            Why {COMPANY}
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-xl mx-auto mb-12">
            Since {EST_YEAR}, we have combined arborist expertise with heavy forestry equipment to solve environmental challenges across Central Florida.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'ISA Certified', desc: 'Our ISA Certified Arborist identifies species accurately and prescribes the right treatment for every situation.' },
              { title: 'Specialized Equipment', desc: 'Forestry mulchers, mowers, and application equipment purpose-built for environmental and forestry work.' },
              { title: 'Regulatory Knowledge', desc: 'We understand water management district rules, county requirements, and environmental permitting processes.' },
              { title: 'Full Service', desc: 'From assessment through monitoring, we handle every phase. No subcontractors, no gaps in accountability.' },
            ].map((w) => (
              <div key={w.title} className="bg-[#1a1c1a] border border-[#4a7c59]/10 p-6 rounded text-center">
                <h3 className="font-display text-lg uppercase text-[#4a7c59] mb-2">{w.title}</h3>
                <p className="font-sans text-gray-400 text-sm">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 border-y border-[#4a7c59]/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: `${new Date().getFullYear() - EST_YEAR}+`, label: 'Years in Business' },
              { val: '5.0', label: 'Google Rating' },
              { val: 'ISA', label: 'Certified Arborist' },
              { val: 'Full', label: 'Assess to Monitor' },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl text-[#4a7c59]">{s.val}</div>
                <div className="font-sans text-sm text-gray-400 mt-1">{s.label}</div>
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

      {/* FAQ */}
      <section className="py-20">
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
            Take Back Your Land
          </h2>
          <p className="font-sans text-white/80 mb-8 max-w-xl mx-auto">
            Whether you need invasive species removed, forestry mulching, or wetland access built, tell us about your property and we will develop a plan that works.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-white text-[#0d0f0d] hover:bg-gray-100 font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Environmental Services Estimate
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
            Other Site Work Services
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
