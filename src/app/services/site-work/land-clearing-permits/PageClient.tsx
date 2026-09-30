'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { PHONE, PHONE_HREF, CERTS, REVIEW_STATS, EST_YEAR } from '@/shared/constants'
import Breadcrumbs from '@/components/Breadcrumbs'
import SpecialtyAreaLinks from '@/components/SpecialtyAreaLinks'
import EstimateForm from '@/components/EstimateForm'

/* ─────────────────────────────────────────────
   CLEARING & TREE REMOVAL PERMITS — Ironclad Theme
   ───────────────────────────────────────────── */

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg className={`w-5 h-5 text-[#5d9c70] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

/* The decision block: the question people actually arrive with. */
const LIKELY_EXEMPT = [
  'The property is zoned residential',
  'A single-family or two-family home is already on it',
  'You occupy the home yourself',
  'The tree is not in a wetland or upland buffer',
]

const LIKELY_NEEDS_PERMIT = [
  'A vacant lot, whether or not you plan to build',
  'Commercial, industrial or any non-residential property',
  'Multi-family, a new subdivision, or a mobile home park',
  'A rented single-family house rather than an owner-occupied one',
  'Any tree in a wetland or an upland buffer, on any lot',
  'A home being demolished and replaced — Volusia states the owner-occupied exemption may not apply',
]

const JURISDICTIONS = [
  {
    where: 'Unincorporated Volusia County',
    towns: 'DeLeon Springs, Pierson, Barberville, Seville, and county land around DeLand',
    rule: 'A permit is required to remove any tree not exempted by the county tree ordinance. Trees of 6 inch DBH and larger are protected within residential setback areas; on non-residential property essentially all trees of 6 inch DBH and larger are protected, and historic trees are protected in the buildable area too.',
  },
  {
    where: 'City of DeLand',
    towns: 'Anything inside the DeLand city limits',
    rule: 'The city runs its own permit through its Building Department. If more than two trees are coming down, the city asks for a survey identifying every tree greater than 6 inches in diameter on the property, with the ones you want removed clearly marked.',
  },
  {
    where: 'Unincorporated Seminole County',
    towns: 'Heathrow, Geneva, Chuluota and surrounding county land',
    rule: 'An arbor permit is required before removing a tree, with exemptions set out in Chapter 60 of the county Land Development Code. Six inch DBH is again the general trigger. Developed single-family lots carry an exemption, but wetland areas on those lots do not.',
  },
  {
    where: 'Seminole cities',
    towns: 'Sanford, Lake Mary, Longwood, Oviedo, Winter Springs',
    rule: 'Incorporated cities run their own arbor ordinances rather than the county one. Same idea, different thresholds and different forms, so the city your parcel sits in is the one that matters.',
  },
]

const FAQS = [
  {
    q: 'Do I need a permit to remove a tree in Volusia County?',
    a: 'It depends on the property, not the tree. Volusia County states that a permit is required to remove any tree that is not exempted by its tree ordinance. The main exemption is for residentially zoned property with a single-family or two-family home already on it that is owner-occupied. Vacant lots, commercial and non-residential property, and multi-family sites are not exempt. If your property sits inside an incorporated city such as DeLand, the city runs its own process instead.',
  },
  {
    q: 'I live in my house. Am I exempt?',
    a: 'Usually, in unincorporated Volusia County, if the property is zoned residential, there is already a single-family or two-family home on it, and you occupy it. Two things override that exemption. Volusia states the exemption may not apply if the home is being demolished and replaced. And trees in wetlands or an upland buffer are never exempt, whoever owns the lot.',
  },
  {
    q: 'What size tree needs a permit?',
    a: 'Six inches is the number to remember. Both Volusia and Seminole County work from a trunk diameter of six inches or more measured at breast height, which is about four and a half feet off the ground and is written as DBH. In Volusia, trees of 6 inch DBH and larger are protected within the setback areas of a residential lot, and essentially all trees of 6 inch DBH and larger are protected on non-residential property. Historic trees are protected in the buildable area as well.',
  },
  {
    q: 'I just bought a vacant lot to build on. What do I actually have to do?',
    a: 'Assume you need approval before anything is cleared. A vacant lot has no owner-occupied exemption to fall back on, so the trees on it are regulated. Work out which authority governs your parcel, get the survey or tree plan they ask for, file before the machines arrive, and keep the approval on site. This is the single most common way an out-of-town builder gets caught out here.',
  },
  {
    q: 'What happens if the lot gets cleared without a permit?',
    a: 'It becomes an expensive problem rather than an impossible one. Jurisdictions in Central Florida can issue stop-work orders, penalties, and mitigation requirements that oblige you to replant or pay into a tree fund based on what was removed. The exact consequence varies by authority and by what came down, which is why an assessment of what was there matters after the fact. It is always cheaper to check first.',
  },
  {
    q: 'Can you handle the permit for me?',
    a: 'We work out which rules apply to your specific address during the site walk and tell you plainly before anything moves, and we handle the filing rather than handing you a form. Where a written arborist opinion is needed to support the application, Tyler Hoag is an ISA Certified Arborist, credential FL-9491A, and Tree Risk Assessment Qualified, so the report comes from the same people doing the work.',
  },
]

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="bg-[#1a1c1a] text-gray-100 min-h-screen">
      <Breadcrumbs crumbs={[
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services' },
        { name: 'Site Work', url: '/services/site-work' },
        { name: 'Clearing Permits', url: '/services/site-work/land-clearing-permits' },
      ]} />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/photos/hoag/land-clearing-lake-shore-deland-fl.jpeg)` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f0d]/95 via-[#0d0f0d]/85 to-[#0d0f0d]/50" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              {CERTS.slice(0, 2).map((cert) => (
                <span key={cert} className="text-xs bg-[#4a7c59]/20 text-[#5d9c70] border border-[#4a7c59]/30 px-3 py-1 rounded-full">{cert}</span>
              ))}
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white mb-6">
              Do You Need a Permit to Clear Land or Remove a Tree?
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Volusia and Seminole County, in plain English. The short version: if you live in the house, you are probably fine. If the lot is empty, or you are about to build on it, assume you are not — and find out before the machines turn up, not after.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#check" className="inline-flex items-center justify-center gap-2 bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wider px-8 py-4 rounded transition-colors text-lg font-bold">
                Check My Property
              </a>
              <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 border-2 border-[#c2a878] text-[#c2a878] hover:bg-[#c2a878]/10 font-display uppercase tracking-wider px-8 py-4 rounded transition-colors">
                <PhoneIcon /> {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The 60-second answer */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center mb-4 text-white">
            The Sixty-Second Answer
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Which side of the line your property sits on decides almost everything. This is for unincorporated Volusia County, which is where most of our work is.
          </p>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-[#1a1c1a] border border-[#4a7c59]/30 rounded-lg p-7">
              <h3 className="font-display text-xl font-bold uppercase text-[#5d9c70] mb-4">Probably exempt</h3>
              <p className="text-gray-400 text-sm mb-5">All four have to be true at once.</p>
              <ul className="space-y-3">
                {LIKELY_EXEMPT.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <span className="text-[#5d9c70] mt-0.5 shrink-0">&#10003;</span>
                    <span className="text-gray-300 text-sm leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#1a1c1a] border border-[#c2a878]/30 rounded-lg p-7">
              <h3 className="font-display text-xl font-bold uppercase text-[#c2a878] mb-4">Expect to need a permit</h3>
              <p className="text-gray-400 text-sm mb-5">Any one of these is enough.</p>
              <ul className="space-y-3">
                {LIKELY_NEEDS_PERMIT.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <span className="text-[#c2a878] mt-0.5 shrink-0">&#33;</span>
                    <span className="text-gray-300 text-sm leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The 6-inch rule */}
      <section className="bg-[#1a1c1a] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white mb-6">
                The Number to Remember Is Six Inches
              </h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Both counties work from the same measurement: trunk diameter of <strong className="text-white">six inches or more at breast height</strong>, roughly four and a half feet off the ground. You will see it written as <strong className="text-white">DBH</strong>.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                In Volusia County, trees of 6 inch DBH and larger are protected inside the setback areas of a residential lot. On non-residential property, essentially all trees of 6 inch DBH and larger are protected. Historic trees are protected in the buildable area as well, not just the setbacks.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Six inches is not a big tree. It is a trunk you can get both hands around. Plenty of people who think they are clearing scrub are actually clearing regulated trees.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Wetlands and upland buffers sit outside all of this. A tree there is regulated regardless of who owns the lot or whether they live on it.
              </p>
            </div>
            <div className="relative rounded-lg w-full h-96 overflow-hidden">
              <Image
                src="/photos/hoag/tree-protection-zone-arborist-central-fl.jpeg"
                alt="Tree protection zone fencing on a Central Florida site before clearing begins"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Which rulebook */}
      <section className="bg-[#0d0f0d] py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center mb-4 text-white">
            Which Rulebook Applies to You
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            There is no single Central Florida tree rule. Each county governs its unincorporated land, and every incorporated city inside it runs its own ordinance instead.
          </p>
          <div className="space-y-4">
            {JURISDICTIONS.map((j) => (
              <div key={j.where} className="bg-[#141614] border border-white/5 rounded-lg p-6">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                  <h3 className="font-display text-lg font-bold uppercase text-white">{j.where}</h3>
                  <span className="text-xs text-[#c2a878]">{j.towns}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{j.rule}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-6 text-center max-w-2xl mx-auto">
            Parcels near a city boundary are the ones that catch people out. An address with a DeLand postal address is not necessarily inside the DeLand city limits, and the two are governed differently.
          </p>
        </div>
      </section>

      {/* The expensive mistake */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white mb-6">
            The Expensive Way to Find Out
          </h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              The pattern is always the same. Somebody buys a lot, gets a good price from a crew with a machine, and has it cleared in a day. The problem surfaces weeks later, when the permit application for the build runs into a question nobody can answer: what was on this lot before?
            </p>
            <p>
              Authorities across Central Florida can issue stop-work orders and require mitigation, which usually means replanting to a specified standard or paying into a tree fund based on what came down. The penalty is not the worst part. The delay is. A build held up while a removal is resolved costs more than the clearing did.
            </p>
            <p>
              It is fixable after the fact, and we do get called in to fix it. But the assessment is harder and the outcome is worse once the evidence is on a truck.
            </p>
          </div>
          <div className="mt-8 bg-[#1a1c1a] border-l-4 border-[#4a7c59] p-6 rounded-r">
            <p className="text-gray-200 leading-relaxed">
              <strong className="text-white">The cheap version of all this</strong> is one phone call before anybody starts. We tell you which authority governs your address, whether the trees on it are regulated, and what the application wants. If it turns out you are exempt, we will tell you that too, and it costs you nothing.
            </p>
          </div>
        </div>
      </section>

      {/* Where the arborist comes in */}
      <section className="bg-[#1a1c1a] py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white mb-6">
            When You Need It in Writing
          </h2>
          <p className="text-gray-300 mb-4 leading-relaxed">
            Some applications turn on a judgement rather than a measurement: whether a tree is genuinely hazardous, whether it is declining beyond saving, whether a protected specimen can reasonably be kept. That judgement has to come from somebody qualified to make it, and it has to be written down.
          </p>
          <p className="text-gray-300 mb-4 leading-relaxed">
            Tyler Hoag is an <Link href="/services/tree-services/certified-arborist" className="text-[#5d9c70] hover:text-[#7ab88a] underline">ISA Certified Arborist</Link> (FL-9491A) and Tree Risk Assessment Qualified, so the assessment supporting your application comes from the same outfit doing the work. HOA architectural review boards ask for the same document, and in gated communities that review usually comes before the county one.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Once the approvals are in hand, the clearing itself is{' '}
            <Link href="/services/site-work/land-clearing" className="text-[#5d9c70] hover:text-[#7ab88a] underline">land clearing</Link>,{' '}
            <Link href="/services/site-work/forestry-mulching" className="text-[#5d9c70] hover:text-[#7ab88a] underline">forestry mulching</Link>{' '}or{' '}
            <Link href="/services/tree-services/tree-removal" className="text-[#5d9c70] hover:text-[#7ab88a] underline">tree removal</Link>, all of it in house.
          </p>
        </div>
      </section>

      {/* Check my property + form */}
      <section id="check" className="bg-[#0d0f0d] py-20 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white mb-6">
                Tell Us the Address, We Will Tell You the Rules
              </h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Send the address and roughly what you are trying to do. We will work out which authority governs the parcel, whether the trees on it are regulated, and what the application is going to want from you.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                If a permit is needed we handle the filing. If you are exempt, we will say so.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Serving DeLand, DeLeon Springs, Orange City, Lake Helen, Pierson, Seville, Barberville and the rest of Volusia County, plus Sanford, Lake Mary and Heathrow in Seminole. Licensed and insured, {REVIEW_STATS.stars} stars from {REVIEW_STATS.count} Google reviews, working here since {EST_YEAR}.
              </p>
            </div>
            <div>
              <EstimateForm
                defaultService="Site Services"
                formType="permit_check"
                context="Clearing Permits"
                idPrefix="pm"
                sentMessage="We will come back to you with which rules apply to that address."
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center text-white mb-12">
            Permit Questions We Get Asked
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-white/5 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-display text-base font-semibold uppercase text-white pr-4">{faq.q}</span>
                  <ChevronDown open={openFaq === i} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-xs leading-relaxed mt-10 text-center">
            This page is a plain-English summary of published county and city requirements, written to help you work out whether you need to ask the question. It is not legal advice, ordinances change, and only the authority governing your parcel can confirm what applies to it. We will help you find out.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#4a7c59] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white mb-4">
            Check Before You Clear
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            One conversation before the machines arrive is cheaper than a mitigation order after them.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#check" className="inline-block bg-white text-[#0d0f0d] hover:bg-gray-100 font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              Check My Property
            </a>
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[#0d0f0d] font-display uppercase tracking-wide px-8 py-4 text-lg transition-colors">
              <PhoneIcon /> {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* Cross links */}
      <section className="bg-[#1a1c1a] py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-2xl font-bold uppercase text-center text-white mb-8">Related Services</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <Link href="/services/tree-services/certified-arborist" className="group bg-[#141614] border border-white/5 rounded-lg p-6 hover:border-[#4a7c59]/30 transition-colors text-center">
              <h3 className="font-display text-lg font-bold uppercase text-white mb-2 group-hover:text-[#5d9c70] transition-colors">Certified Arborist</h3>
              <p className="text-gray-400 text-sm">Written assessments for permits, HOAs and insurers.</p>
            </Link>
            <Link href="/services/site-work/land-clearing" className="group bg-[#141614] border border-white/5 rounded-lg p-6 hover:border-[#4a7c59]/30 transition-colors text-center">
              <h3 className="font-display text-lg font-bold uppercase text-white mb-2 group-hover:text-[#5d9c70] transition-colors">Land Clearing</h3>
              <p className="text-gray-400 text-sm">Lots and acreage cleared, grubbed and left level.</p>
            </Link>
            <Link href="/services/site-work/forestry-mulching" className="group bg-[#141614] border border-white/5 rounded-lg p-6 hover:border-[#4a7c59]/30 transition-colors text-center">
              <h3 className="font-display text-lg font-bold uppercase text-white mb-2 group-hover:text-[#5d9c70] transition-colors">Forestry Mulching</h3>
              <p className="text-gray-400 text-sm">Cleared in place, with the mat left to hold the sand.</p>
            </Link>
          </div>
        </div>
      </section>
      <SpecialtyAreaLinks service="site" specialty="Land Clearing Permits" />
    </div>
  )
}
