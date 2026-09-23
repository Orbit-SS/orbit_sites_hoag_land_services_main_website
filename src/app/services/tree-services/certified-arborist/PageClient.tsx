'use client'

import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import {
  IMAGES,
  PHONE,
  PHONE_HREF,
  REVIEWS,
  REVIEW_STATS,
  CERTS,
  EST_YEAR,
} from '@/shared/constants'
import Breadcrumbs from '@/components/Breadcrumbs'
import SpecialtyAreaLinks from '@/components/SpecialtyAreaLinks'

/* ─────────────────────────────────────────────
   CERTIFIED ARBORIST — Credential Landing Page
   Ironclad Theme
   ───────────────────────────────────────────── */

function StarIcon() {
  return (
    <svg className="w-5 h-5 text-[#c2a878]" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

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

function StepNumber({ n }: { n: number }) {
  return (
    <div className="w-14 h-14 rounded-full border-2 border-[#4a7c59] flex items-center justify-center shrink-0">
      <span className="font-display text-xl font-bold text-[#5d9c70]">{n}</span>
    </div>
  )
}

const CREDENTIALS = [
  {
    code: 'ISA',
    title: 'ISA Certified Arborist — FL-9491A',
    desc: 'Credentialed by the International Society of Arboriculture by examination, and kept current through continuing education. The certification covers tree biology, diagnosis, pruning standards, soil and root management, and safe work practice.',
  },
  {
    code: 'TRAQ',
    title: 'Tree Risk Assessment Qualified',
    desc: 'A separate ISA credential for the formal, documented method of judging how likely a tree is to fail, what it would strike, and how severe that would be. This is the qualification behind a report an HOA board or an adjuster will actually accept.',
  },
  {
    code: 'Z133',
    title: 'ANSI Z133 & A300 Work Practice',
    desc: 'Removals rigged and pruning cuts made to the recognised industry standards, not to whatever is fastest. It is the difference between a tree that recovers from a trim and one that never quite does.',
  },
  {
    code: 'INS',
    title: 'Licensed & Fully Insured',
    desc: 'Current certificates of insurance available for management companies, gate files, and commercial clients on request — before the crew arrives, not after someone asks.',
  },
]

const WHEN_YOU_NEED_ONE = [
  {
    icon: '?',
    title: 'You Are Not Sure the Tree Is Actually Dangerous',
    desc: 'A dramatic lean can be fifty years stable. A perfectly upright oak can be hollow. Guessing costs you either an unnecessary removal or a roof.',
  },
  {
    icon: '#',
    title: 'Your HOA Wants an Arborist Letter',
    desc: 'Architectural review boards routinely ask for a qualified opinion before approving a removal. A signed assessment is what closes that request.',
  },
  {
    icon: '$',
    title: 'You Are Filing an Insurance Claim',
    desc: 'A documented assessment of the tree, the defect, and the failure mode supports a claim far better than a photo and a phone call.',
  },
  {
    icon: '!',
    title: 'The County Needs Justification for a Permit',
    desc: 'Where an ordinance protects a tree, removal usually has to be justified. A risk assessment is the standard form that justification takes.',
  },
  {
    icon: '+',
    title: 'You Are Trying to Save the Tree, Not Remove It',
    desc: 'Decline has causes — construction damage, root severance, soil compaction, over-mulching, the wrong pruning years ago. Some of it is reversible if it is caught.',
  },
  {
    icon: '>',
    title: 'You Are Buying the Property',
    desc: 'Mature trees are an asset until they are a liability. Worth knowing which you are inheriting before closing, not after.',
  },
]

const WHAT_YOU_GET = [
  'Species identification and an assessment of overall condition',
  'Structural defects documented — cavities, included bark, root plate movement, deadwood load',
  'A TRAQ risk rating: likelihood of failure, likely target, consequence',
  'A clear recommendation — monitor, prune, cable, or remove',
  'Written report suitable for HOA, insurer, or permit submission',
  'Permit requirements for your specific address, checked before you file',
]

const PROCESS = [
  { step: 'Tell Us the Situation', desc: 'What the tree is doing, what is under it, and who is asking. That usually decides whether you need a report or just a quote.' },
  { step: 'On-Site Inspection', desc: 'Tyler inspects the tree himself — crown, trunk, root plate, and the site conditions around it. No subcontracted opinion.' },
  { step: 'Findings & Options', desc: 'You get a straight answer on the risk and the realistic options, including the option of doing nothing where that is honestly the right call.' },
  { step: 'Report or Work', desc: 'A written assessment if you need the document, or a scheduled crew if you need the work. Often both.' },
]

const FAQS = [
  {
    q: 'What does an ISA Certified Arborist actually do?',
    a: 'An ISA Certified Arborist is credentialed by the International Society of Arboriculture after examination and has to keep the certification current through continuing education. In practice it means the person evaluating your tree can identify the species, read the signs of decay and structural defect, and tell you whether a tree is genuinely dangerous or just looks alarming. Tyler Hoag is ISA Certified, credential FL-9491A.',
  },
  {
    q: 'What is TRAQ, and why does it matter?',
    a: 'Tree Risk Assessment Qualified is a separate ISA credential covering a formal, documented method for judging the likelihood of a tree failing and what it would hit if it did. It matters because it turns an opinion into a defensible assessment — which is what an HOA board, an insurance adjuster, or a permit reviewer is actually asking for.',
  },
  {
    q: 'Can I get a written arborist report?',
    a: 'Yes. We produce written tree risk assessments for HOA architectural review, insurance claims, permit applications, and pre-purchase inspections. The report documents the tree, the defects found, the risk rating, and the recommended action. If you need it for a specific body, tell us who — the requirements differ.',
  },
  {
    q: 'Do I need a permit to remove a tree in Central Florida?',
    a: 'It depends on where you are and how big the tree is. Volusia County, Seminole County, and the individual cities each run their own arbor ordinances, and most set a trunk diameter above which removal needs a permit. Protected species and environmentally sensitive areas have their own rules. We will tell you at the estimate whether your job needs one, and handle the paperwork.',
  },
  {
    q: 'Is an arborist assessment worth it if I already know I want the tree gone?',
    a: 'Often, no — if the decision is made and the tree is not protected, you want a removal quote, not a report. The assessment earns its keep when the answer is genuinely in question, when a third party needs convincing, or when you are trying to save a tree rather than remove it.',
  },
  {
    q: 'Do you charge for an arborist visit?',
    a: 'Estimates for tree work are free. A formal written assessment is a separate paid service, because it is a document you keep and submit. We will tell you which one you need before you commit to either.',
  },
]

export default function Page() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="bg-[#1a1c1a] text-gray-100 min-h-screen">
      <Breadcrumbs crumbs={[
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services' },
        { name: 'Tree Services', url: '/services/tree-services' },
        { name: 'Certified Arborist', url: '/services/tree-services/certified-arborist' },
      ]} />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/photos/hoag/tree-protection-zone-arborist-central-fl.jpeg)` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d0f0d]/95 via-[#0d0f0d]/80 to-[#0d0f0d]/40" />
        <div className="relative max-w-6xl mx-auto px-4 py-24 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              {CERTS.slice(0, 2).map((cert) => (
                <span key={cert} className="text-xs bg-[#4a7c59]/20 text-[#5d9c70] border border-[#4a7c59]/30 px-3 py-1 rounded-full">{cert}</span>
              ))}
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white mb-6">
              ISA Certified Arborist in Central Florida
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Most tree companies will tell you what a tree costs to remove. Fewer can tell you whether it needs to come down at all. Tyler Hoag is ISA Certified (FL-9491A) and Tree Risk Assessment Qualified — the assessment comes before the chainsaw.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wider px-8 py-4 rounded transition-colors text-lg font-bold">
                Request an Arborist Assessment
              </Link>
              <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 border-2 border-[#c2a878] text-[#c2a878] hover:bg-[#c2a878]/10 font-display uppercase tracking-wider px-8 py-4 rounded transition-colors">
                <PhoneIcon /> {PHONE}
              </a>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <div className="flex">{Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}</div>
              <span className="text-sm text-gray-400">{REVIEW_STATS.stars} stars — {REVIEW_STATS.count} Google Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* The credentials, spelled out */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center mb-4 text-white">
            What the Credentials Mean
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            &ldquo;Certified arborist&rdquo; gets printed on a lot of truck doors. Here is what ours actually covers.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {CREDENTIALS.map((c) => (
              <div key={c.title} className="bg-[#1a1c1a] border border-white/5 rounded-lg p-6 hover:border-[#4a7c59]/30 transition-colors">
                <div className="w-14 h-14 rounded-full bg-[#4a7c59]/10 flex items-center justify-center mb-4">
                  <span className="font-display text-sm font-bold text-[#5d9c70]">{c.code}</span>
                </div>
                <h3 className="font-display text-lg font-bold uppercase text-white mb-2">{c.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When you need one */}
      <section className="bg-[#1a1c1a] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center mb-4 text-white">
            When You Actually Need an Arborist
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Not every tree job needs one. These are the ones that do.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHEN_YOU_NEED_ONE.map((p) => (
              <div key={p.title} className="bg-[#141614] border border-white/5 rounded-lg p-6 hover:border-[#4a7c59]/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#4a7c59]/10 flex items-center justify-center mb-4">
                  <span className="font-display text-xl font-bold text-[#5d9c70]">{p.icon}</span>
                </div>
                <h3 className="font-display text-lg font-bold uppercase text-white mb-2">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What the assessment includes */}
      <section className="bg-[#0d0f0d] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white mb-6">
                What a Tree Risk Assessment Includes
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                A TRAQ assessment is a method, not an opinion. It works through the tree and the site in a fixed order so the conclusion can be checked by someone else — which is exactly why boards, adjusters, and permit reviewers ask for one.
              </p>
              <ul className="space-y-3">
                {WHAT_YOU_GET.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <span className="text-[#5d9c70] mt-1 shrink-0">&#10003;</span>
                    <span className="text-gray-300">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-lg w-full h-64 overflow-hidden">
                <Image
                  src={IMAGES.tree2}
                  alt="ISA Certified Arborist inspecting a mature tree in Central Florida"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="relative rounded-lg w-full h-64 mt-8 overflow-hidden">
                <Image
                  src="/photos/hoag/tree-protection-zone-arborist-central-fl.jpeg"
                  alt="Tree protection zone established during site work in Central Florida"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">From the first call to a document you can hand someone.</p>
          <div className="grid md:grid-cols-4 gap-8">
            {PROCESS.map((p, i) => (
              <div key={p.step} className="text-center">
                <div className="flex justify-center mb-4"><StepNumber n={i + 1} /></div>
                <h3 className="font-display text-lg font-bold uppercase text-white mb-2">{p.step}</h3>
                <p className="text-gray-400 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Permits */}
      <section className="bg-[#1a1c1a] py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white mb-6">
            Permits, Ordinances &amp; Who Is Asking
          </h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              Central Florida does not have one tree rule — it has dozens. Volusia County, Seminole County, and every incorporated city inside them run their own arbor ordinance, and most set a trunk diameter above which a removal needs a permit. Protected species, specimen trees, and environmentally sensitive parcels each carry their own conditions on top.
            </p>
            <p>
              Gated and HOA-governed communities add a second gate entirely. Architectural review generally comes before the county does, and a board asking for &ldquo;an arborist&rsquo;s opinion&rdquo; means a signed assessment, not a quote with a logo on it.
            </p>
            <p>
              We check the requirements for your specific address during the estimate and tell you plainly which approvals your job needs. Where a permit is required, we handle the filing rather than handing you a form and wishing you luck.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-1 mb-3">{Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white mb-2">
              {REVIEW_STATS.stars} Stars From {REVIEW_STATS.count} Reviews
            </h2>
            <p className="text-gray-400">Real feedback from real customers across Central Florida.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.name} className="bg-[#1a1c1a] border border-white/5 rounded-lg p-6">
                <div className="flex gap-1 mb-3">{Array.from({ length: r.rating }).map((_, i) => <StarIcon key={i} />)}</div>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed italic">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#4a7c59]/20 flex items-center justify-center">
                    <span className="text-[#5d9c70] text-sm font-bold">{r.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{r.name}</p>
                    <p className="text-gray-400 text-xs">{r.source} Review</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#0d0f0d] py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-center text-white mb-12">
            Certified Arborist FAQ
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
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#141614] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-white mb-4">
            Get a Straight Answer About Your Tree
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Whether you need a written assessment for someone else or just an honest read for yourself, start with a call. We will tell you which one you actually need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-[#4a7c59] hover:bg-[#3d6a4a] text-white font-display uppercase tracking-wider px-8 py-4 rounded transition-colors text-lg font-bold">
              Request an Arborist Assessment
            </Link>
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 border-2 border-[#c2a878] text-[#c2a878] hover:bg-[#c2a878]/10 font-display uppercase tracking-wider px-8 py-4 rounded transition-colors">
              <PhoneIcon /> {PHONE}
            </a>
          </div>
          <p className="text-gray-400 text-sm mt-6">Serving DeLand, Volusia, Seminole &amp; Central Florida since {EST_YEAR}</p>
        </div>
      </section>

      {/* Cross-Links */}
      <section className="bg-[#1a1c1a] py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-2xl font-bold uppercase text-center text-white mb-8">Related Tree Services</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <Link href="/services/tree-services/dangerous-trees" className="group bg-[#141614] border border-white/5 rounded-lg p-6 hover:border-[#4a7c59]/30 transition-colors text-center">
              <h3 className="font-display text-lg font-bold uppercase text-white mb-2 group-hover:text-[#5d9c70] transition-colors">Dangerous Trees</h3>
              <p className="text-gray-400 text-sm">Hazard trees assessed and removed safely.</p>
            </Link>
            <Link href="/services/tree-services/tree-trimming" className="group bg-[#141614] border border-white/5 rounded-lg p-6 hover:border-[#4a7c59]/30 transition-colors text-center">
              <h3 className="font-display text-lg font-bold uppercase text-white mb-2 group-hover:text-[#5d9c70] transition-colors">Tree Trimming</h3>
              <p className="text-gray-400 text-sm">Crown reduction and structural pruning to standard.</p>
            </Link>
            <Link href="/services/tree-services/tree-removal" className="group bg-[#141614] border border-white/5 rounded-lg p-6 hover:border-[#4a7c59]/30 transition-colors text-center">
              <h3 className="font-display text-lg font-bold uppercase text-white mb-2 group-hover:text-[#5d9c70] transition-colors">Tree Removal</h3>
              <p className="text-gray-400 text-sm">Safe, professional removal when that is the right call.</p>
            </Link>
          </div>
        </div>
      </section>
      <SpecialtyAreaLinks service="tree" specialty="Certified Arborist Services" />
    </div>
  )
}
