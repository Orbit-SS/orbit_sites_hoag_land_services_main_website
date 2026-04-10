'use client'
import Link from 'next/link'
import { useState } from 'react'
import { IMAGES, PHONE, PHONE_HREF, COMPANY, REVIEWS, REVIEW_STATS, CERTS, EST_YEAR } from '@/shared/constants'

const FAQS = [
  {
    q: 'What are the signs I have a drainage problem?',
    a: 'Standing water after rain that takes more than 24 hours to drain, soggy areas in your yard, water pooling against your foundation, erosion channels forming in your soil, and musty smells near your home are all indicators. If water is going where it should not, you have a drainage problem.',
  },
  {
    q: 'How much does drainage and grading work cost?',
    a: 'Costs depend on the scope of the problem. A simple regrading of a residential yard costs less than installing a full drainage system with culverts and swales on a multi-acre property. We assess your specific situation and give you a firm number before work begins.',
  },
  {
    q: 'How long does a grading project take?',
    a: 'Most residential grading and drainage projects take two to five days depending on the size of the area and the complexity of the drainage solution. Larger commercial projects with extensive earthwork can take a week or more. We provide a clear timeline upfront.',
  },
  {
    q: 'Do I need permits for grading and drainage work?',
    a: 'Permit requirements vary by municipality and the scope of work. Projects that alter natural drainage patterns, work near wetlands, or involve significant earth-moving often require permits. We help identify what is needed and can coordinate with local authorities.',
  },
  {
    q: 'Will regrading fix my flooding problem?',
    a: 'In most cases, yes. Proper grading directs water away from structures and toward appropriate drainage points. Combined with swales, culverts, or French drains where needed, we can solve the vast majority of residential and commercial flooding issues.',
  },
]

const STEPS = [
  { num: '01', title: 'Call Us', desc: 'Describe your drainage or grading issue. Photos and videos of standing water help.' },
  { num: '02', title: 'Site Assessment', desc: 'We evaluate the terrain, drainage patterns, and soil conditions on your property.' },
  { num: '03', title: 'Grade & Drain', desc: 'Our crew reshapes the land and installs drainage solutions to move water where it belongs.' },
  { num: '04', title: 'Protected', desc: 'Your structures are safe, your land drains properly, and the problem is solved.' },
]

const CROSS_LINKS = [
  { name: 'Erosion Control', href: '/services/site-work/erosion-control' },
  { name: 'Land Clearing', href: '/services/site-work/land-clearing' },
  { name: 'Land Preparation', href: '/services/site-work/land-preparation' },
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
          <span className="text-[#c2a878]">Drainage &amp; Grading</span>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMAGES.site9})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0f0d]/80 via-[#0d0f0d]/60 to-[#0d0f0d]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center py-24">
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {CERTS.slice(0, 3).map((c) => (
              <span key={c} className="text-xs font-sans bg-[#4a7c59]/20 text-[#4a7c59] border border-[#4a7c59]/30 px-3 py-1 rounded-full">{c}</span>
            ))}
          </div>
          <h1 className="font-display text-4xl md:text-6xl uppercase tracking-tight text-white mb-6">
            Drainage &amp; Grading Problems? We Fix the Foundation.
          </h1>
          <p className="font-sans text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Standing water, erosion, and uneven terrain are destroying your property from the ground up. Professional grading and drainage solutions stop the damage and protect your investment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Grading Estimate
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
            Water Goes Where You Let It
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Poor drainage and improper grading cause damage that compounds over time. These are the problems we see every week in Central Florida.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Standing Water After Rain', desc: 'Water pools in your yard for days after a storm. It breeds mosquitoes, kills grass, and turns your property into a swamp that nobody wants to deal with.' },
              { title: 'Foundation at Risk', desc: 'Water pooling against your home or building erodes the soil under your foundation. Over time this causes settling, cracking, and structural damage that costs tens of thousands to repair.' },
              { title: 'Erosion Washing Away Soil', desc: 'Every rain event carries more of your topsoil downhill. Channels form, ruts deepen, and your property gradually loses the soil it needs to support vegetation and structures.' },
              { title: 'Flooded Driveways & Roads', desc: 'Improperly graded driveways and access roads turn into rivers during storms. Water erodes the surface, creates potholes, and makes your property inaccessible.' },
              { title: 'Uneven Terrain', desc: 'Humps, dips, and slopes in the wrong direction make your property difficult to use and maintain. Mowing, building, and even walking become a challenge.' },
              { title: 'Neighbor Runoff Problems', desc: 'Development on adjacent properties changes drainage patterns. Water that never came onto your land before is now flowing straight toward your structures.' },
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
                How We Solve Your Drainage Problems
              </h2>
              <p className="font-sans text-gray-300 leading-relaxed mb-4">
                {COMPANY} provides professional grading and drainage solutions for residential and commercial properties across Central Florida. We use GPS-guided equipment to reshape your terrain with precision, ensuring water flows away from structures and toward proper discharge points.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed mb-4">
                Our drainage solutions include swales to channel surface water, culverts to move water under driveways and roads, French drains for subsurface water management, and full-property regrading to establish proper slope. Every project is engineered to handle the heavy rainfall Central Florida receives.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed mb-6">
                Whether your problem is a soggy backyard or a commercial site that floods every time it rains, we have the equipment and the experience to fix it permanently.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Professional Grading', 'Swale Installation', 'Culvert Systems', 'French Drains', 'Slope Correction', 'Driveway Grading'].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#4a7c59] rounded-full shrink-0" />
                    <span className="font-sans text-sm text-gray-300">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img src={IMAGES.site9} alt="Grading equipment on property" className="rounded w-full h-48 object-cover" />
              <img src={IMAGES.site11} alt="Drainage solution installation" className="rounded w-full h-48 object-cover" />
              <img src={IMAGES.site12} alt="Finished grading project" className="rounded w-full h-48 object-cover col-span-2" />
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
            From soggy mess to properly drained property. We diagnose the problem and fix it right.
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
            Fix Your Drainage Before It Gets Worse
          </h2>
          <p className="font-sans text-white/80 mb-8 max-w-xl mx-auto">
            Every rain makes the problem bigger. Tell us about your property and we will give you a straight answer on what it takes to fix it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-white text-[#0d0f0d] hover:bg-gray-100 font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Grading Estimate
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
