'use client'
import Link from 'next/link'
import { useState } from 'react'
import { IMAGES, PHONE, PHONE_HREF, EMAIL, COMPANY, REVIEWS, REVIEW_STATS, CERTS, EST_YEAR, FULL_SERVICES } from '@/shared/constants'

const FAQS = [
  {
    q: 'How much does land clearing cost per acre in Central Florida?',
    a: 'Costs vary based on vegetation density, tree size, debris volume, and access. Light brush clearing on a flat residential lot starts lower than heavy hardwood removal on unimproved acreage. We provide free on-site estimates so you get an accurate number before any work begins.',
  },
  {
    q: 'How long does it take to clear a residential lot?',
    a: 'A standard quarter-acre residential lot with moderate vegetation typically takes one to two days. Larger parcels or heavily wooded acreage can take a week or more. We will give you a clear timeline after the site walk.',
  },
  {
    q: 'What happens to the trees, stumps, and debris after clearing?',
    a: 'We haul off or chip all vegetation debris. Stumps can be ground below grade or fully removed depending on your project needs. We leave your site clean, level, and ready for the next phase of development.',
  },
  {
    q: 'Do I need permits to clear my land in Volusia County?',
    a: 'Permit requirements depend on the municipality, lot size, and whether protected species or wetlands are present. We help identify what is needed during the site walk and can coordinate with local authorities on your behalf.',
  },
  {
    q: 'Is there a minimum lot size you will clear?',
    a: 'No. We clear everything from small residential lots to multi-hundred-acre commercial parcels. Whether you have a quarter acre or three hundred acres, we have the equipment and crew to handle it.',
  },
]

const STEPS = [
  { num: '01', title: 'Call', desc: 'Tell us about your property and what you need cleared.' },
  { num: '02', title: 'Site Walk', desc: 'We walk the property, assess vegetation, and provide a firm estimate.' },
  { num: '03', title: 'Clear', desc: 'Our crew mobilizes heavy equipment and clears your land efficiently.' },
  { num: '04', title: 'Ready', desc: 'Your property is clean, grubbed, and ready for the next phase.' },
]

const CROSS_LINKS = [
  { name: 'Earthworks & Excavation', href: '/services/site-work/earthworks-excavation' },
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
          <span className="text-[#c2a878]">Land Clearing</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.site1})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0f0d]/80 via-[#0d0f0d]/60 to-[#0d0f0d]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-24">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {CERTS.slice(0, 3).map((c) => (
              <span key={c} className="text-xs font-sans bg-[#4a7c59]/20 text-[#4a7c59] border border-[#4a7c59]/30 px-3 py-1 rounded-full">{c}</span>
            ))}
          </div>
          <h1 className="font-display text-4xl md:text-6xl uppercase tracking-tight text-white mb-6">
            Professional Land Clearing in Central Florida
          </h1>
          <p className="font-sans text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            From single residential lots to hundred-acre commercial parcels — cleared, grubbed, and ready for what&apos;s next.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Land Clearing Estimate
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
            Your Land Won&apos;t Clear Itself
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-2xl mx-auto mb-12">
            If any of these sound familiar, you need a land clearing crew that shows up with real equipment and gets it done right the first time.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Overgrown Land Blocking Development', desc: 'You have plans for your property, but dense brush, trees, and undergrowth are standing in the way. Nothing moves forward until the land is cleared.' },
              { title: 'Can\'t Build Until the Land Is Cleared', desc: 'Builders, contractors, and inspectors all need a clean pad before they can start. Delays in clearing mean delays in everything else.' },
              { title: 'Brush and Debris Everywhere', desc: 'Years of neglect have left your property buried under fallen trees, invasive growth, and accumulated debris that makes the land unusable.' },
              { title: 'Need It Done Fast and Right', desc: 'You are on a timeline. Whether it is a construction schedule, a closing date, or a county deadline, you need a crew that can mobilize quickly and deliver.' },
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
                Complete Land Clearing Services
              </h2>
              <p className="font-sans text-gray-300 leading-relaxed mb-4">
                {COMPANY} provides full-service land clearing for residential lots, commercial development sites, agricultural parcels, and everything in between. Our crew operates heavy equipment including excavators, track loaders, brush cutters, forestry mulchers, and stump grinders to handle any terrain and vegetation type found in Central Florida.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed mb-4">
                For residential projects, we carefully clear lots while preserving trees you want to keep, removing stumps below grade, and leaving a clean surface ready for building. For commercial parcels, we clear hundreds of acres efficiently with equipment staged on-site and a crew that works until the job is done.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed mb-6">
                Every project includes debris removal and site cleanup. We do not leave piles behind. When we are finished, your land is grubbed, level, and ready for the next contractor to step in.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Residential Lots', 'Commercial Parcels', 'Brush & Undergrowth', 'Tree & Stump Removal', 'Debris Hauling', 'Selective Clearing'].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#4a7c59] rounded-full shrink-0" />
                    <span className="font-sans text-sm text-gray-300">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img src={IMAGES.site7} alt="Land clearing project" className="rounded w-full h-48 object-cover" />
              <img src={IMAGES.site8} alt="Heavy equipment clearing" className="rounded w-full h-48 object-cover" />
              <img src={IMAGES.site10} alt="Cleared residential lot" className="rounded w-full h-48 object-cover col-span-2" />
            </div>
          </div>
        </div>
      </section>

      {/* Results Gallery */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-4">
            Our Work Speaks for Itself
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-2xl mx-auto mb-12">
            From overgrown residential lots to multi-acre commercial parcels, here is what cleared and ready looks like.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[IMAGES.site1, IMAGES.site7, IMAGES.site8, IMAGES.site10].map((src, i) => (
              <img key={i} src={src} alt={`Land clearing project ${i + 1}`} className="rounded w-full h-40 object-cover hover:opacity-90 transition-opacity" />
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
            Four steps from overgrown to ready. We keep it simple and move fast.
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
            Since {EST_YEAR}, we have built our reputation on showing up with the right equipment, the right crew, and getting the job done without excuses.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Heavy Equipment', desc: 'Excavators, track loaders, forestry mulchers, and stump grinders. We bring the right machine for every job.' },
              { title: 'ISA Certified', desc: 'Our ISA Certified Arborist ensures trees are handled correctly, whether they are being removed or preserved.' },
              { title: 'No Subcontractors', desc: 'Our own crew does every job. No middlemen, no surprises, no finger-pointing.' },
              { title: 'Licensed & Insured', desc: 'Fully licensed and insured in the state of Florida. Your property is protected from start to finish.' },
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
              { val: '100s', label: 'Acres Cleared' },
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
            Ready to Clear Your Land?
          </h2>
          <p className="font-sans text-white/80 mb-8 max-w-xl mx-auto">
            Tell us about your property and we will walk it, give you a straight estimate, and get your land cleared on schedule.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-white text-[#0d0f0d] hover:bg-gray-100 font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Land Clearing Estimate
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
