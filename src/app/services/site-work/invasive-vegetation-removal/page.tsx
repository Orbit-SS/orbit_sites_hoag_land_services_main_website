'use client'
import Link from 'next/link'
import { useState } from 'react'
import { IMAGES, PHONE, PHONE_HREF, COMPANY, REVIEWS, REVIEW_STATS, CERTS, EST_YEAR } from '@/shared/constants'

const FAQS = [
  {
    q: 'What are the most common invasive species in Central Florida?',
    a: 'Brazilian pepper, Chinese tallow, Australian pine, melaleuca, cogon grass, and air potato are the most common invasives we deal with in the DeLand and Central Florida area. These species spread aggressively, choke out native vegetation, and are extremely difficult to control without professional equipment and treatment.',
  },
  {
    q: 'How much does invasive vegetation removal cost?',
    a: 'Cost depends on the species, density of infestation, acreage, and whether follow-up herbicide treatment is needed. A small residential lot with scattered Brazilian pepper costs less than a multi-acre parcel completely overrun with multiple invasive species. We assess your property and provide a firm number.',
  },
  {
    q: 'Do you use herbicide safely around water and wildlife?',
    a: 'Yes. We use EPA-approved herbicides applied by trained technicians following all label requirements and environmental regulations. We select products appropriate for the site conditions, including options safe for use near water bodies, wetlands, and areas with wildlife activity.',
  },
  {
    q: 'How do you prevent invasive species from growing back?',
    a: 'Mechanical removal alone is rarely enough. We combine forestry mulching with targeted herbicide application to kill root systems and prevent regrowth. For ongoing management, we offer follow-up treatments to catch any re-sprouts before they re-establish. The first year after removal is critical.',
  },
  {
    q: 'How long does invasive removal take?',
    a: 'Initial removal on a residential lot typically takes two to four days. Larger properties with heavy infestations can take a week or more for the mechanical phase, plus follow-up herbicide treatments over the following months. We provide a full timeline including follow-up visits during the estimate.',
  },
]

const STEPS = [
  { num: '01', title: 'Assessment', desc: 'We identify the invasive species, map the infestation, and develop a removal plan.' },
  { num: '02', title: 'Removal', desc: 'Forestry mulching and mechanical removal eliminate the visible vegetation and root mass.' },
  { num: '03', title: 'Treatment', desc: 'Targeted herbicide application prevents regrowth and kills remaining root systems.' },
  { num: '04', title: 'Restoration', desc: 'Your land is cleared of invasives and ready for native replanting or your next project.' },
]

const CROSS_LINKS = [
  { name: 'Environmental Services', href: '/services/site-work/environmental-services' },
  { name: 'Overgrown Land Clearing', href: '/services/site-work/overgrown-land-clearing' },
  { name: 'Land Clearing', href: '/services/site-work/land-clearing' },
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
          <span className="text-[#c2a878]">Invasive Vegetation Removal</span>
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
            Invasive Species Taking Over? We&apos;ll Restore Your Land.
          </h1>
          <p className="font-sans text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Brazilian pepper, Chinese tallow, and other invasives are choking your property, killing native species, and spreading fast. We remove them and stop them from coming back.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Invasive Removal Estimate
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
            Invasive Plants Do Not Stop on Their Own
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-2xl mx-auto mb-12">
            Every month you wait, the problem doubles. Invasive species are engineered by nature to spread, dominate, and destroy everything around them.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Choking Native Species', desc: 'Invasive plants outcompete native trees, shrubs, and grasses for sunlight, water, and nutrients. Your oaks, palms, and native groundcover are slowly being strangled and replaced.' },
              { title: 'Spreading to Neighbors', desc: 'Birds carry seeds, wind spreads spores, and root systems expand underground. Your invasive problem is becoming your neighbor\'s problem, and they may come after you for it.' },
              { title: 'Decreasing Property Value', desc: 'Land overrun with Brazilian pepper or Chinese tallow is worth less. Appraisers, buyers, and lenders all see invasive-infested land as a liability that requires expensive remediation.' },
              { title: 'Environmental Damage', desc: 'Invasives destroy habitat for native birds, pollinators, and wildlife. They alter soil chemistry, change water flow patterns, and create monocultures that collapse local ecosystems.' },
              { title: 'Impossible to Mow or Maintain', desc: 'Dense invasive growth makes your property impossible to mow, walk, or maintain. Standard lawn equipment cannot handle Brazilian pepper trunks or tallow thickets.' },
              { title: 'County & HOA Violations', desc: 'Some municipalities and HOAs require invasive species management. Failing to control known infestations can result in violations, fines, and forced remediation at your expense.' },
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
                How We Eliminate Invasive Vegetation
              </h2>
              <p className="font-sans text-gray-300 leading-relaxed mb-4">
                {COMPANY} uses a combination of forestry mulching, mechanical removal, and targeted herbicide application to eliminate invasive species from your property. Our approach does not just cut the plants down. It kills the root systems and prevents regrowth.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed mb-4">
                Our forestry mulcher grinds standing invasive vegetation directly into the soil. For larger specimens like mature Brazilian pepper or tallow trees, we cut and remove them with excavators and process the material on-site. Stumps are ground below grade to prevent re-sprouting.
              </p>
              <p className="font-sans text-gray-300 leading-relaxed mb-6">
                After mechanical removal, our trained technicians apply EPA-approved herbicides to cut surfaces and remaining root zones. This follow-up treatment is critical because many invasive species can regenerate from root fragments left in the soil. We offer ongoing management plans to catch any regrowth in the first critical year.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Forestry Mulching', 'Targeted Herbicide', 'Mechanical Removal', 'Stump Grinding', 'Root System Treatment', 'Ongoing Management'].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#4a7c59] rounded-full shrink-0" />
                    <span className="font-sans text-sm text-gray-300">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img src={IMAGES.site5} alt="Invasive vegetation before removal" className="rounded w-full h-48 object-cover" />
              <img src={IMAGES.site3} alt="Forestry mulching invasive species" className="rounded w-full h-48 object-cover" />
              <img src={IMAGES.site14} alt="Property after invasive removal" className="rounded w-full h-48 object-cover col-span-2" />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl uppercase text-white text-center mb-4">
            Our Invasive Removal Process
          </h2>
          <p className="font-sans text-gray-400 text-center max-w-xl mx-auto mb-12">
            Removal is only half the job. Preventing regrowth is what makes it permanent.
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
            Take Your Land Back from Invasives
          </h2>
          <p className="font-sans text-white/80 mb-8 max-w-xl mx-auto">
            The longer you wait, the worse it gets. Tell us about your property and we will put together a plan to remove the invasives and keep them gone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-white text-[#0d0f0d] hover:bg-gray-100 font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Get My Invasive Removal Estimate
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
