'use client'
import Link from 'next/link'
import { useState } from 'react'
import { IMAGES, PHONE, PHONE_HREF, EMAIL, COMPANY, REVIEWS, REVIEW_STATS, CERTS, EST_YEAR, FULL_SERVICES } from '@/shared/constants'

const FAQS = [
  {
    q: 'How much does excavation and grading cost?',
    a: 'Pricing depends on soil conditions, volume of material being moved, site access, and project scope. A small building pad on a cleared lot costs less than grading a multi-acre commercial site. We provide detailed estimates after a site survey so there are no surprises.',
  },
  {
    q: 'How long does a typical earthworks project take?',
    a: 'Simple grading or a residential building pad can be completed in one to three days. Larger projects involving road construction, pond excavation, or extensive soil replacement can take one to several weeks. We provide a timeline during the planning phase.',
  },
  {
    q: 'What soil types can you work with in Central Florida?',
    a: 'We work with all soil conditions found in Central Florida including sandy soil, clay, muck, and fill dirt. Our equipment handles everything from soft wetland-adjacent soils to compacted hardpan. We assess soil conditions during the survey and plan accordingly.',
  },
  {
    q: 'Do I need permits for excavation work?',
    a: 'Most excavation and grading projects in Volusia County require permits, especially those involving stormwater management, fill material, or work near wetlands. We help identify what is needed and coordinate with local permitting authorities.',
  },
  {
    q: 'What equipment do you use for earthworks?',
    a: 'We operate excavators, track loaders, bulldozers, dump trucks, and compaction equipment. The specific equipment depends on the project. We always bring the right machines for the soil type and scope of work.',
  },
]

const STEPS = [
  { num: '01', title: 'Survey', desc: 'We assess your site, evaluate soil conditions, and understand your project goals.' },
  { num: '02', title: 'Plan', desc: 'We develop a grading plan with clear specs, timeline, and a firm estimate.' },
  { num: '03', title: 'Excavate', desc: 'Our crew moves earth with precision — cut, fill, compact, and shape to spec.' },
  { num: '04', title: 'Grade', desc: 'Final grading ensures proper drainage, elevation, and a surface ready for construction.' },
]

const CROSS_LINKS = [
  { name: 'Land Clearing', href: '/services/site-work/land-clearing' },
  { name: 'Erosion Control', href: '/services/site-work/erosion-control' },
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
          <span className="text-[#c2a878]">Earthworks &amp; Excavation</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.site4})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0f0d]/80 via-[#0d0f0d]/60 to-[#0d0f0d]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-24">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {CERTS.slice(0, 3).map((c) => (
              <span key={c} className="text-xs font-sans bg-[#4a7c59]/20 text-[#4a7c59] border border-[#4a7c59]/30 px-3 py-1 rounded-full">{c}</span>
            ))}
          </div>
          <h1 className="font-display text-4xl md:text-6xl uppercase tracking-tight text-white mb-6">
            Earthworks &amp; Excavation Services in DeLand, FL
          </h1>
          <p className="font-sans text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Soil removal, grading, building pads, roads, ponds, and right of ways — precision earth moving for your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Excavation Estimate
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
            The Ground Doesn&apos;t Shape Itself
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Whether you are building, grading, or solving drainage problems, you need a crew with the equipment and experience to move earth right.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Uneven Terrain', desc: 'Your property has slopes, low spots, or rough ground that makes construction impossible. The site needs to be cut, filled, and graded to spec before anything can be built.' },
              { title: 'Drainage Problems', desc: 'Water pools in the wrong places, erodes the soil, and creates muddy, unusable areas. Proper grading and swale construction solves it permanently.' },
              { title: 'Need a Building Pad', desc: 'Builders need a flat, compacted, properly elevated surface before they pour a foundation. Without it, your project stalls.' },
              { title: 'Road Access Needed', desc: 'Your property is landlocked or the existing access is unusable. You need a properly graded road or driveway built from scratch.' },
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
                Precision Earth Moving
              </h2>
              <p className="font-sans text-gray-300 leading-relaxed mb-4">
                {COMPANY} handles every phase of earthworks from initial soil removal to final grade. We build building pads to exact elevation specs, construct access roads and driveways, excavate ponds and retention areas, and grade sites for proper drainage and stormwater flow.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed mb-4">
                Our crew operates excavators, bulldozers, track loaders, dump trucks, and compaction equipment. We work with all Central Florida soil conditions — sandy fill, clay, muck, and hardpan. Every cut and fill is planned, executed, and verified to ensure your site meets engineering specifications.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed mb-6">
                Whether you need a single residential building pad or a full commercial site graded with road infrastructure, we deliver the finished grade your project demands.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Site Grading', 'Building Pads', 'Road Construction', 'Pond Excavation', 'Soil Replacement', 'Right of Ways'].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#4a7c59] rounded-full shrink-0" />
                    <span className="font-sans text-sm text-gray-300">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img src={IMAGES.site9} alt="Excavation project" className="rounded w-full h-48 object-cover" />
              <img src={IMAGES.site12} alt="Grading work" className="rounded w-full h-48 object-cover" />
              <img src={IMAGES.site4} alt="Earthworks equipment" className="rounded w-full h-48 object-cover col-span-2" />
            </div>
          </div>
        </div>
      </section>

      {/* Results Gallery */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-4">
            Precision Earthworks Results
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Building pads, road construction, grading, and pond excavation across Central Florida properties.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[IMAGES.site4, IMAGES.site9, IMAGES.site12].map((src, i) => (
              <img key={i} src={src} alt={`Excavation project ${i + 1}`} className="rounded w-full h-48 object-cover hover:opacity-90 transition-opacity" />
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
            Every earthworks project follows a structured process to ensure accuracy and efficiency.
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
            Since {EST_YEAR}, we have delivered precision earthworks across Central Florida with our own equipment and our own crew.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Right Equipment', desc: 'Excavators, dozers, track loaders, and dump trucks. We match the machine to the material and the scope.' },
              { title: 'ISA Certified', desc: 'When earthworks cross paths with trees and roots, our certified arborist ensures nothing is damaged that should not be.' },
              { title: 'Own Crew', desc: 'Every operator and laborer works for us directly. No subs, no delays, no miscommunication.' },
              { title: 'Fully Licensed', desc: 'Licensed and insured in Florida. We pull permits, coordinate with engineers, and deliver to specification.' },
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
              { val: 'All', label: 'Soil Types Handled' },
              { val: '0', label: 'Subcontractors Used' },
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
            Ready to Move Earth?
          </h2>
          <p className="font-sans text-white/80 mb-8 max-w-xl mx-auto">
            Tell us about your project and we will survey the site, develop a plan, and give you a firm estimate with a clear timeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-white text-[#0d0f0d] hover:bg-gray-100 font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Excavation Estimate
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
