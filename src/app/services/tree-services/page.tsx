'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  FULL_SERVICES,
  IMAGES,
  PHONE,
  PHONE_HREF,
  EMAIL,
  COMPANY,
  REVIEWS,
  REVIEW_STATS,
  CERTS,
  EST_YEAR,
} from '@/shared/constants'
import ServiceAreaLinks from '@/components/ServiceAreaLinks'

/* ─────────────────────────────────────────────
   TREE SERVICES LANDING PAGE — Ironclad Theme
   Dark bg (#1a1c1a, #141614, #0d0f0d)
   Forest green accent (#4a7c59), warm tan (#c2a878)
   ───────────────────────────────────────────── */

// metadata moved to layout or removed — can't export from 'use client'

/* ── Icon Components ── */

function StarIcon() {
  return (
    <svg className="w-5 h-5 text-[#c2a878]" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-5 h-5 text-[#4a7c59] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}

/* ── Pain Point Icons ── */

function DeadBranchIcon() {
  return (
    <svg className="w-8 h-8 text-[#4a7c59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  )
}

function StormIcon() {
  return (
    <svg className="w-8 h-8 text-[#4a7c59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
}

function OvergrownIcon() {
  return (
    <svg className="w-8 h-8 text-[#4a7c59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function WrongTreeIcon() {
  return (
    <svg className="w-8 h-8 text-[#4a7c59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
  )
}

/* ── Process Step Numbers ── */

function StepNumber({ n }: { n: number }) {
  return (
    <div className="w-14 h-14 rounded-full border-2 border-[#4a7c59] flex items-center justify-center shrink-0">
      <span className="font-display text-xl font-bold text-[#4a7c59]">{n}</span>
    </div>
  )
}

/* ── Green Check ── */

function GreenCheck() {
  return (
    <svg className="w-6 h-6 text-[#4a7c59] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

/* ── Shield / Certification Icon ── */

function ShieldIcon() {
  return (
    <svg className="w-10 h-10 text-[#4a7c59]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
}

/* ── FAQ Accordion Item ── */

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="font-display text-lg font-bold uppercase">{q}</span>
        <ChevronDown open={open} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-48 pb-5' : 'max-h-0'}`}
      >
        <p className="text-gray-400 leading-relaxed">{a}</p>
      </div>
    </div>
  )
}

/* ── Service benefit mapping ── */

const SERVICE_BENEFITS: Record<string, string> = {
  'Tree Removal':
    'Every removal is overseen by an ISA Certified Arborist who evaluates the safest approach for your property. We protect your structures, landscaping, and underground utilities throughout the process.',
  'Tree Trimming':
    'Proper pruning promotes healthy growth, reduces storm risk, and restores clearance for your home, driveway, and walkways. We follow ISA best practices — no topping, no damage.',
  'Palm Pruning':
    'Florida palms need regular maintenance. We remove dead fronds, seed pods, and basal sprouts to keep your palms healthy and your property looking sharp.',
  'Tree Installation':
    'Right tree, right place. We select species suited for Central Florida soil and climate, then install them with proper root care so they thrive for decades.',
}

/* ── Service images ── */

const SERVICE_IMAGES = [IMAGES.tree2, IMAGES.tree8, IMAGES.tree9, IMAGES.tree3]

const SERVICE_SLUGS = [
  '/services/tree-services/tree-removal',
  '/services/tree-services/tree-trimming',
  '/services/tree-services/palm-pruning',
  '/services/tree-services/tree-installation',
]

/* ── Main Page Component ── */

export default function TreeServicesPage() {
  const treeService = FULL_SERVICES.tree

  const painPoints = [
    {
      icon: <DeadBranchIcon />,
      title: 'Dead Branches Threatening Your Roof',
      desc: 'Hanging deadwood, cracked limbs, and decaying branches put your home, vehicles, and family at risk every time the wind picks up.',
      href: '/services/tree-services/dangerous-trees',
    },
    {
      icon: <StormIcon />,
      title: 'Storm-Damaged Trees Need Professional Removal',
      desc: 'Leaning trees, split trunks, and uprooted root plates require a certified professional, not someone with a chainsaw and a prayer.',
      href: '/services/tree-services/storm-damage',
    },
    {
      icon: <OvergrownIcon />,
      title: 'Overgrown Trees Blocking Light or Views',
      desc: 'Trees that have outgrown their space steal sunlight from your home and yard, crowd structures, and reduce curb appeal.',
      href: '/services/tree-services/overgrown-trees',
    },
    {
      icon: <WrongTreeIcon />,
      title: 'Wrong Tree in the Wrong Place',
      desc: 'Roots cracking your driveway. Branches tangled in power lines. A tree that should never have been planted there in the first place.',
      href: '/services/tree-services/wrong-tree-wrong-place',
    },
  ]

  const faqs = [
    {
      q: 'How much does tree removal cost?',
      a: 'It depends on the size, location, and complexity of the tree. A small tree in an open yard costs significantly less than a large oak next to your house. We provide free on-site estimates with honest, no-pressure pricing.',
    },
    {
      q: 'How long does tree work take?',
      a: 'Most single-tree jobs are completed in one day. Larger removals or multi-tree projects may take 2 to 3 days. We will give you a realistic timeline during your estimate.',
    },
    {
      q: 'Do I need a permit to remove a tree?',
      a: 'Some municipalities in Volusia County require permits for certain tree species or sizes. We can advise you on whether your project requires a permit and help guide you through the process.',
    },
    {
      q: 'Do you offer stump grinding?',
      a: 'Yes. We can grind stumps down below grade so you can replant, resod, or repurpose the area. Stump grinding can be included in your removal quote or done as a standalone service.',
    },
    {
      q: 'Do you offer emergency tree service?',
      a: 'Yes. Storm damage, fallen trees, and hazardous limbs do not wait for business hours. Call us and we will get there as soon as conditions safely allow.',
    },
    {
      q: 'What areas do you serve?',
      a: 'DeLand, DeLeon Springs, Orange City, Deltona, and surrounding Central Florida communities. If you are nearby, give us a call and we will let you know.',
    },
  ]

  const galleryImages = [
    { src: IMAGES.tree5, alt: 'Tree removal in DeLand FL' },
    { src: IMAGES.tree2, alt: 'Professional tree trimming' },
    { src: IMAGES.tree8, alt: 'Large tree removal project' },
    { src: IMAGES.tree9, alt: 'Palm pruning and maintenance' },
    { src: IMAGES.tree3, alt: 'Tree installation Central Florida' },
    { src: IMAGES.tree10, alt: 'Completed tree work project' },
  ]

  return (
    <div className="min-h-screen bg-[#1a1c1a] text-white font-sans">

      {/* ── Breadcrumb ── */}
      <nav className="bg-[#0d0f0d] py-3 px-4">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#c2a878] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-[#c2a878] transition-colors">Services</Link>
          <span>/</span>
          <span className="text-[#c2a878]">Tree Services</span>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════
          1. HERO SECTION
          ═══════════════════════════════════════════ */}
      <section className="relative min-h-[600px] flex items-center overflow-hidden">
        <img
          src={IMAGES.tree5}
          alt="ISA Certified Arborist tree services in DeLand Florida"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-28">
          <p className="text-[#c2a878] font-display uppercase tracking-[0.2em] text-sm mb-4">
            {COMPANY} &mdash; ISA Certified Arborist
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wide leading-tight max-w-3xl">
            Your Trees Deserve<br />a Certified Arborist.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
            ISA Certified tree removal, trimming, and care for homes and businesses
            across Central Florida.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#4a7c59] hover:bg-[#3d6a4b] text-white font-display uppercase font-bold tracking-wider px-8 py-4 text-lg transition-colors"
            >
              Get My Free Tree Estimate
            </Link>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-[#c2a878] text-white font-display uppercase font-bold tracking-wider px-8 py-4 text-lg transition-colors"
            >
              <PhoneIcon />
              Or Call {PHONE}
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <GreenCheck />
              <span>ISA Certified Arborist</span>
            </span>
            <span className="flex items-center gap-1.5">
              <GreenCheck />
              <span>TRAQ Qualified</span>
            </span>
            <span className="flex items-center gap-1.5">
              <GreenCheck />
              <span>Licensed &amp; Insured</span>
            </span>
            <span className="flex items-center gap-1.5">
              <StarIcon />
              <span className="text-[#c2a878] font-bold">{REVIEW_STATS.stars} Stars</span>
              <span>({REVIEW_STATS.count} reviews)</span>
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          2. PROBLEM / PAIN SECTION
          ═══════════════════════════════════════════ */}
      <section className="bg-[#141614] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#c2a878] font-display uppercase tracking-[0.2em] text-sm mb-3 text-center">
            Common Risks
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center mb-4">
            Don&rsquo;t Risk Your Property or Safety
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-14">
            Trees add value to your property &mdash; until they become a liability. These problems
            get worse with every storm season.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {painPoints.map((p, i) => (
              <Link key={i} href={p.href} className="group flex gap-5 bg-[#1a1c1a] p-6 rounded-sm border border-white/5 hover:border-[#4a7c59]/40 transition-all duration-300">
                <div className="shrink-0">{p.icon}</div>
                <div>
                  <h3 className="font-display text-lg font-bold uppercase mb-2 group-hover:text-[#4a7c59] transition-colors">{p.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm mb-3">{p.desc}</p>
                  <span className="inline-flex items-center gap-1 text-[#4a7c59] text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#4a7c59] hover:bg-[#3d6a4b] text-white font-display uppercase font-bold tracking-wider px-8 py-4 transition-colors"
            >
              Get My Free Tree Estimate
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3. SERVICES DETAIL SECTION
          ═══════════════════════════════════════════ */}
      <section className="bg-[#1a1c1a] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#c2a878] font-display uppercase tracking-[0.2em] text-sm mb-3">
            What We Do
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase mb-14">
            Tree Services
          </h2>

          <div className="space-y-16">
            {treeService.items.map((item, i) => (
              <div
                key={item.name}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
              >
                {/* Image */}
                <div className="md:w-1/2">
                  <div className="relative overflow-hidden">
                    <img
                      src={SERVICE_IMAGES[i]}
                      alt={item.name}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-[#4a7c59] px-3 py-1">
                      <span className="font-display text-sm font-bold uppercase tracking-wider">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    {item.name === 'Tree Removal' && (
                      <div className="absolute bottom-4 right-4 bg-black/70 px-3 py-1.5 flex items-center gap-2">
                        <ShieldIcon />
                        <span className="font-display text-xs font-bold uppercase tracking-wider text-[#c2a878]">
                          ISA Certified
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Text */}
                <div className="md:w-1/2">
                  <h3 className="font-display text-2xl font-bold uppercase mb-3">{item.name}</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">{item.desc}</p>
                  <p className="text-gray-400 leading-relaxed text-sm border-l-2 border-[#4a7c59] pl-4 mb-6">
                    {SERVICE_BENEFITS[item.name]}
                  </p>
                  <Link
                    href={SERVICE_SLUGS[i]}
                    className="inline-flex items-center gap-2 text-[#4a7c59] font-semibold uppercase tracking-wider text-sm hover:gap-3 transition-all"
                  >
                    Learn More About {item.name}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          4. PROCESS SECTION
          ═══════════════════════════════════════════ */}
      <section className="bg-[#0d0f0d] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#c2a878] font-display uppercase tracking-[0.2em] text-sm mb-3 text-center">
            Simple Process
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 text-center max-w-xl mx-auto mb-14">
            No runaround. No surprises. Here&rsquo;s how we handle your tree project.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Call or Request an Estimate',
                desc: 'Tell us about your trees. We will discuss the scope and schedule a time to assess your property.',
              },
              {
                step: 2,
                title: 'We Assess Your Trees',
                desc: 'Our ISA Certified Arborist evaluates the health, risk, and best approach for every tree on the job.',
              },
              {
                step: 3,
                title: 'We Quote — Honest & Fair',
                desc: 'Transparent pricing. No hidden fees, no surprise charges. You approve before we start.',
              },
              {
                step: 4,
                title: 'We Execute Safely',
                desc: 'Professional crew, proper equipment, certified arborist on-site. Your property stays protected.',
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="flex justify-center mb-4">
                  <StepNumber n={s.step} />
                </div>
                <h3 className="font-display text-lg font-bold uppercase mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#4a7c59] hover:bg-[#3d6a4b] text-white font-display uppercase font-bold tracking-wider px-8 py-4 transition-colors"
            >
              Get My Free Tree Estimate
            </Link>
            <a
              href={PHONE_HREF}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-[#c2a878] text-white font-display uppercase font-bold tracking-wider px-8 py-4 transition-colors"
            >
              <PhoneIcon />
              {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          5. ISA CERTIFICATION CALLOUT
          ═══════════════════════════════════════════ */}
      <section className="bg-[#141614] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left — content */}
            <div>
              <p className="text-[#c2a878] font-display uppercase tracking-[0.2em] text-sm mb-3">
                Certified Expertise
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase mb-6">
                What ISA Certified Means for Your Trees
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                An ISA Certified Arborist has passed a rigorous international exam covering tree biology,
                diagnosis, maintenance, safety, and management. Not every tree company has one. We do.
              </p>

              <div className="space-y-5">
                <div className="flex gap-4 items-start">
                  <ShieldIcon />
                  <div>
                    <h3 className="font-display font-bold uppercase mb-1">ISA Certified Arborist (FL-9491A)</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Internationally recognized credential proving expertise in tree care science. Our arborist
                      follows evidence-based practices, not guesswork.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <ShieldIcon />
                  <div>
                    <h3 className="font-display font-bold uppercase mb-1">TRAQ Qualified</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Tree Risk Assessment Qualification means we systematically evaluate tree hazards using
                      the ISA risk assessment framework. We identify problems before they become emergencies.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <ShieldIcon />
                  <div>
                    <h3 className="font-display font-bold uppercase mb-1">Why It Matters</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Improper pruning, bad cuts, and incorrect removal techniques cause lasting damage to trees
                      and property. A certified arborist protects your investment with every cut.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — image + stats */}
            <div>
              <div className="relative overflow-hidden mb-6">
                <img
                  src={IMAGES.tree5}
                  alt="ISA Certified Arborist at work in Central Florida"
                  className="w-full h-80 md:h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-display text-2xl font-bold uppercase text-[#c2a878]">
                    {CERTS[0]}
                  </p>
                  <p className="text-gray-300 text-sm mt-1">{CERTS[1]}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#1a1c1a] border border-white/5 p-4 text-center">
                  <p className="font-display text-2xl font-bold text-[#4a7c59]">ISA</p>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mt-1">Certified</p>
                </div>
                <div className="bg-[#1a1c1a] border border-white/5 p-4 text-center">
                  <p className="font-display text-2xl font-bold text-[#4a7c59]">TRAQ</p>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mt-1">Qualified</p>
                </div>
                <div className="bg-[#1a1c1a] border border-white/5 p-4 text-center">
                  <p className="font-display text-2xl font-bold text-[#4a7c59]">{REVIEW_STATS.stars}</p>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mt-1">Star Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          6. SOCIAL PROOF / REVIEWS
          ═══════════════════════════════════════════ */}
      <section className="bg-[#1a1c1a] py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Star rating header */}
          <div className="text-center mb-14">
            <div className="flex justify-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>
            <p className="font-display text-5xl font-bold text-[#c2a878] mb-2">
              {REVIEW_STATS.stars}
            </p>
            <p className="text-gray-400">
              {REVIEW_STATS.count} Verified Google Reviews
            </p>
          </div>

          {/* Review cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-[#141614] border border-white/5 p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <StarIcon key={j} />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed text-sm mb-4">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#4a7c59] flex items-center justify-center font-display font-bold text-sm">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm">{r.name}</p>
                    <p className="text-gray-500 text-xs">{r.source} Review</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7. GALLERY STRIP
          ═══════════════════════════════════════════ */}
      <section className="bg-[#0d0f0d] py-12">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-[#c2a878] font-display uppercase tracking-[0.2em] text-sm mb-6 text-center">
            Recent Tree Work
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {galleryImages.map((img, i) => (
              <div key={i} className="aspect-square overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          8. FAQ SECTION
          ═══════════════════════════════════════════ */}
      <section className="bg-[#141614] py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#c2a878] font-display uppercase tracking-[0.2em] text-sm mb-3 text-center">
            Common Questions
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="divide-y divide-white/10 border-t border-white/10">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-400 mb-4">Have a question that isn&rsquo;t listed here?</p>
            <a
              href={PHONE_HREF}
              className="text-[#4a7c59] font-display font-bold uppercase hover:text-[#c2a878] transition-colors"
            >
              Call us at {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          9. FINAL CTA SECTION
          ═══════════════════════════════════════════ */}
      <section className="relative py-24 px-4 overflow-hidden">
        <img
          src={IMAGES.tree8}
          alt="Professional tree services in Central Florida"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase mb-4">
            Protect Your Property.<br />Call a Certified Arborist.
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
            Free estimates. ISA Certified. Licensed and insured. The right way to take care of your trees.
          </p>

          {/* Phone prominent */}
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-3 text-3xl md:text-4xl font-display font-bold text-[#c2a878] hover:text-white transition-colors mb-8"
          >
            <PhoneIcon />
            {PHONE}
          </a>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-[#4a7c59] hover:bg-[#3d6a4b] text-white font-display uppercase font-bold tracking-wider px-10 py-4 text-lg transition-colors"
            >
              Get My Free Tree Estimate
            </Link>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center border-2 border-white/30 hover:border-[#c2a878] text-white font-display uppercase font-bold tracking-wider px-10 py-4 text-lg transition-colors"
            >
              Email {EMAIL}
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          SERVICE AREAS
          ═══════════════════════════════════════════ */}
      <ServiceAreaLinks service="tree" />

      {/* ═══════════════════════════════════════════
          OTHER SERVICES + FOOTER LINKS
          ═══════════════════════════════════════════ */}
      <section className="bg-[#0d0f0d] py-10 px-4 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 text-sm mb-3 font-display uppercase tracking-widest">
            Other Services
          </p>
          <div className="flex justify-center gap-6">
            <Link
              href="/services/site-work"
              className="text-[#c2a878] hover:text-white font-display font-bold uppercase tracking-wider transition-colors"
            >
              Site Work
            </Link>
            <span className="text-gray-600">|</span>
            <Link
              href="/services/fencing"
              className="text-[#c2a878] hover:text-white font-display font-bold uppercase tracking-wider transition-colors"
            >
              Fencing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
