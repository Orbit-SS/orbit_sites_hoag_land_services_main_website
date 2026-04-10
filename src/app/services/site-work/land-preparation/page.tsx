'use client'
import Link from 'next/link'
import { useState } from 'react'
import { IMAGES, PHONE, PHONE_HREF, COMPANY, REVIEWS, REVIEW_STATS, CERTS, EST_YEAR } from '@/shared/constants'

const FAQS = [
  {
    q: 'What is the typical timeline for site preparation?',
    a: 'A standard residential building pad on a cleared lot takes three to five days. Full site prep on raw acreage including clearing, grading, and access road construction can take one to three weeks depending on size and terrain. We provide a detailed schedule during the estimate.',
  },
  {
    q: 'How much does site preparation cost per acre?',
    a: 'Cost per acre varies significantly based on existing vegetation, terrain, soil conditions, and the scope of prep required. A lightly wooded flat lot costs less than dense hardwood on rolling terrain that needs a building pad and access road. We walk the property and give you a firm price.',
  },
  {
    q: 'Do you work with builders and general contractors?',
    a: 'Yes. We work directly with builders, general contractors, and developers regularly. We understand construction timelines and coordinate our work to keep your project on schedule. We can also work directly from your site plans and engineering drawings.',
  },
  {
    q: 'Do I need permits for site preparation?',
    a: 'Most site preparation work that involves grading, tree removal, or land disturbance requires permits from the local municipality or county. We help identify what is needed during the site walk and can coordinate the permitting process on your behalf.',
  },
  {
    q: 'What is included in your site preparation service?',
    a: 'Full site prep includes clearing and grubbing all vegetation, stump removal, rough grading to establish proper elevation and drainage, building pad preparation, and access road construction if needed. We leave your site ready for the next contractor to mobilize.',
  },
]

const STEPS = [
  { num: '01', title: 'Plans Review', desc: 'Share your building plans and permits. We review what your site needs.' },
  { num: '02', title: 'Site Walk', desc: 'We walk the property, assess terrain, and provide a detailed estimate and timeline.' },
  { num: '03', title: 'Prepare', desc: 'Our crew clears, grades, and shapes your site to spec with heavy equipment.' },
  { num: '04', title: 'Build Ready', desc: 'Your building pad, access road, and drainage are set. The next contractor can start.' },
]

const CROSS_LINKS = [
  { name: 'Land Clearing', href: '/services/site-work/land-clearing' },
  { name: 'Earthworks & Excavation', href: '/services/site-work/earthworks-excavation' },
  { name: 'Drainage & Grading', href: '/services/site-work/drainage-grading' },
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
          <span className="text-[#c2a878]">Land Preparation</span>
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
            Ready to Build? Let Us Prepare Your Land.
          </h1>
          <p className="font-sans text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            You have the plans and the permits. Now you need a crew that can clear, grade, and shape your site so your builder can break ground on schedule.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Site Prep Estimate
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
            Your Builder Is Waiting on You
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Construction cannot start until the land is ready. These are the bottlenecks that delay projects across Central Florida every single week.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Raw Land, No Access', desc: 'Your property has no road in, no clearing, and no way for construction equipment to reach the build site. Everything is on hold until access is established.' },
              { title: 'No Building Pad', desc: 'Your builder needs a level, compacted pad at the right elevation before they can pour a foundation. Without proper grading, construction cannot begin.' },
              { title: 'Trees & Brush in the Way', desc: 'The building footprint, septic field, and driveway location are all covered in vegetation. It all has to come out before anything else happens.' },
              { title: 'Wrong Elevation & Slope', desc: 'The natural terrain does not match what your building plans require. The site needs to be cut, filled, and graded to the correct elevation and drainage slope.' },
              { title: 'Contractor Waiting on Site Prep', desc: 'Your builder, well driller, or septic installer is ready to go but cannot start until the site is prepped. Every day of delay costs money and pushes your timeline.' },
              { title: 'Permits Approved, Clock Ticking', desc: 'Your permits have an expiration window. The longer you wait to start, the closer you get to having to re-file. Site prep needs to happen now.' },
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
                Full Site Preparation, Start to Finish
              </h2>
              <p className="font-sans text-gray-300 leading-relaxed mb-4">
                {COMPANY} handles every phase of site preparation so your builder walks onto a pad that is ready for construction. We start with clearing and grubbing to remove all vegetation, stumps, and organic material from the building footprint and surrounding work area.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed mb-4">
                Next, we grade the site to establish proper elevation for your building pad, septic system, and driveway. We cut high spots, fill low spots, and compact the surface to create a stable base for your foundation. If your property needs an access road, we build that too.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed mb-6">
                We work from your site plans and coordinate with your builder, engineer, or general contractor to ensure everything meets spec. When we are done, your site is ready for the next trade to mobilize without delay.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Clearing & Grubbing', 'Building Pad Grading', 'Access Road Construction', 'Stump Removal', 'Drainage Establishment', 'Fill & Compaction'].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#4a7c59] rounded-full shrink-0" />
                    <span className="font-sans text-sm text-gray-300">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img src={IMAGES.site4} alt="Site preparation in progress" className="rounded w-full h-48 object-cover" />
              <img src={IMAGES.site6} alt="Building pad grading" className="rounded w-full h-48 object-cover" />
              <img src={IMAGES.site15} alt="Completed site preparation" className="rounded w-full h-48 object-cover col-span-2" />
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
            From raw land to build-ready. We keep your construction schedule on track.
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
            Get Your Site Ready to Build
          </h2>
          <p className="font-sans text-white/80 mb-8 max-w-xl mx-auto">
            Send us your plans and we will tell you exactly what it takes to get your site prepped, on budget, and on schedule.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-white text-[#0d0f0d] hover:bg-gray-100 font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Site Prep Estimate
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
