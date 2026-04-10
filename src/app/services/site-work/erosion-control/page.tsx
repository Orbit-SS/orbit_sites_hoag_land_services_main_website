'use client'
import Link from 'next/link'
import { useState } from 'react'
import { IMAGES, PHONE, PHONE_HREF, EMAIL, COMPANY, REVIEWS, REVIEW_STATS, CERTS, EST_YEAR, FULL_SERVICES } from '@/shared/constants'

const FAQS = [
  {
    q: 'How much does erosion control installation cost?',
    a: 'Costs depend on the scope of work, linear footage of silt fence, number and size of swales or culverts, and site conditions. We provide a detailed estimate after assessing your property so you know exactly what to expect.',
  },
  {
    q: 'Do I need a permit for erosion control in Volusia County?',
    a: 'Most construction and land disturbance projects require an erosion and sediment control plan as part of the permitting process. We help identify requirements and ensure your project meets all local and state compliance standards.',
  },
  {
    q: 'How often does silt fence need to be maintained?',
    a: 'Silt fence should be inspected after every significant rain event and at regular intervals during construction. We provide both installation and ongoing maintenance to keep your site compliant throughout the project.',
  },
  {
    q: 'What happens if I do not install erosion control on my construction site?',
    a: 'Failing to install proper erosion control can result in fines from local code enforcement, stop-work orders, damage to neighboring properties, and environmental violations. It is not optional on most permitted projects.',
  },
  {
    q: 'When is erosion control needed?',
    a: 'Erosion control is required any time land is disturbed — during land clearing, grading, excavation, construction, and any activity that exposes bare soil. It is also needed for ongoing properties with slope or drainage issues.',
  },
]

const STEPS = [
  { num: '01', title: 'Assess', desc: 'We evaluate your site for drainage patterns, soil type, slopes, and compliance requirements.' },
  { num: '02', title: 'Plan', desc: 'We design an erosion control plan that meets local regulations and protects your property.' },
  { num: '03', title: 'Install', desc: 'Silt fence, swales, culverts, and drainage structures are installed by our experienced crew.' },
  { num: '04', title: 'Maintain', desc: 'We provide ongoing inspection and maintenance to keep you compliant through project completion.' },
]

const CROSS_LINKS = [
  { name: 'Land Clearing', href: '/services/site-work/land-clearing' },
  { name: 'Earthworks & Excavation', href: '/services/site-work/earthworks-excavation' },
  { name: 'Environmental Services', href: '/services/site-work/environmental-services' },
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
          <span className="text-[#c2a878]">Erosion Control</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.site6})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0f0d]/80 via-[#0d0f0d]/60 to-[#0d0f0d]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-24">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {CERTS.slice(0, 3).map((c) => (
              <span key={c} className="text-xs font-sans bg-[#4a7c59]/20 text-[#4a7c59] border border-[#4a7c59]/30 px-3 py-1 rounded-full">{c}</span>
            ))}
          </div>
          <h1 className="font-display text-4xl md:text-6xl uppercase tracking-tight text-white mb-6">
            Erosion Control Services in Central Florida
          </h1>
          <p className="font-sans text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Protect your property and stay compliant with professional silt fence, swale, and culvert installation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Erosion Control Estimate
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
            Erosion Doesn&apos;t Wait
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Every rain event moves more soil off your property. If you are dealing with any of these problems, it is time to act before things get worse.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Soil Washing Away', desc: 'Exposed soil on your construction site or property is being carried off by rain, creating ruts, gullies, and sediment deposits where they do not belong.' },
              { title: 'Compliance Requirements', desc: 'Your project permit requires erosion and sediment control measures. Without proper installation and maintenance, you risk fines and stop-work orders.' },
              { title: 'Drainage Issues', desc: 'Water flows in the wrong direction, pools in unwanted areas, and undermines structures. Your property needs proper swales and drainage infrastructure.' },
              { title: 'Stormwater Management', desc: 'Uncontrolled stormwater runoff is damaging your property and potentially violating environmental regulations. You need a system that handles it properly.' },
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
                Professional Erosion &amp; Sediment Control
              </h2>
              <p className="font-sans text-gray-300 leading-relaxed mb-4">
                {COMPANY} installs and maintains erosion control systems that keep your property compliant and your soil where it belongs. We handle silt fence installation along construction perimeters, swale grading for proper water flow, and culvert installation for drainage crossings.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed mb-4">
                Our work meets all Volusia County and state of Florida requirements for erosion and sediment control on construction sites. We install Best Management Practices (BMPs) that pass inspection the first time and maintain them throughout your project lifecycle.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed mb-6">
                Beyond construction compliance, we also solve erosion problems on existing properties — stabilizing slopes, redirecting water flow, and installing permanent drainage solutions that protect your land for years to come.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Silt Fence Install', 'Silt Fence Maintenance', 'Swale Construction', 'Culvert Installation', 'Stormwater Mgmt', 'Slope Stabilization'].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#4a7c59] rounded-full shrink-0" />
                    <span className="font-sans text-sm text-gray-300">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img src={IMAGES.site6} alt="Erosion control installation" className="rounded w-full h-48 object-cover" />
              <img src={IMAGES.site11} alt="Silt fence and drainage" className="rounded w-full h-48 object-cover" />
              <img src={IMAGES.site11} alt="Completed erosion control" className="rounded w-full h-48 object-cover col-span-2" />
            </div>
          </div>
        </div>
      </section>

      {/* Results Gallery */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-4">
            Compliant Erosion Control Installations
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Silt fence, swales, culverts, and drainage solutions installed across Volusia County construction sites and properties.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[IMAGES.site6, IMAGES.site11].map((src, i) => (
              <img key={i} src={src} alt={`Erosion control project ${i + 1}`} className="rounded w-full h-56 object-cover hover:opacity-90 transition-opacity" />
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
            From assessment to ongoing maintenance, we keep your site compliant through every phase.
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
            Since {EST_YEAR}, we have kept Central Florida construction sites compliant with properly installed and maintained erosion control.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Code Compliant', desc: 'We know what Volusia County and the state of Florida require. Your erosion control passes inspection the first time.' },
              { title: 'Install & Maintain', desc: 'We do not just install and leave. We maintain your erosion control throughout your project to keep you compliant.' },
              { title: 'Own Crew', desc: 'Our team does every installation. No subcontractors, no delays, no miscommunication on your site.' },
              { title: 'Licensed & Insured', desc: 'Fully licensed and insured. We stand behind every installation with accountability you can count on.' },
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
              { val: '100%', label: 'Inspection Pass Rate' },
              { val: 'Full', label: 'Install & Maintenance' },
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
            Protect Your Property from Erosion
          </h2>
          <p className="font-sans text-white/80 mb-8 max-w-xl mx-auto">
            Whether you need construction-site compliance or a permanent drainage solution, we will assess your property and give you a clear plan and estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-white text-[#0d0f0d] hover:bg-gray-100 font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Erosion Control Estimate
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
