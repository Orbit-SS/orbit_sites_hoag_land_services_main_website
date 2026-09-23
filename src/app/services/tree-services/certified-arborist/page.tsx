import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

/*
 * Built 2026-09-23. A 90-day Search Console pull showed 566 impressions across
 * 48 "arborist" queries — "arborist orlando" (119), "certified arborist orlando
 * fl" (49), "arborist assessment and tree services" (41, position 8.9),
 * "arborist sanford" (29) — against no arborist page at all. Those impressions
 * were landing on category and city pages and converting nothing: 2 clicks.
 * Tyler Hoag's credentials were stated on 123 templated pages and given a page
 * of their own on none.
 */

const PAGE_URL = '/services/tree-services/certified-arborist'
const TITLE = 'ISA Certified Arborist in DeLand & Central Florida'
const DESCRIPTION =
  'ISA Certified Arborist (FL-9491A) and TRAQ-qualified tree risk assessments across Central Florida. Written arborist reports for HOAs, insurers, and permits.'
const OG_IMAGE = '/photos/hoag/tree-protection-zone-arborist-central-fl.jpeg'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PAGE_URL}` },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Hoag Land Services',
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PAGE_URL}`,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'ISA Certified Arborist assessing a tree protection zone in Central Florida',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
}

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

const schemas = [
  serviceSchema({
    serviceType: 'Arborist Consulting and Tree Risk Assessment',
    name: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    image: OG_IMAGE,
  }),
  faqSchema(FAQS),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Tree Services', url: '/services/tree-services' },
    { name: 'Certified Arborist', url: PAGE_URL },
  ]),
  webPageSchema({ name: TITLE, description: DESCRIPTION, url: PAGE_URL, image: OG_IMAGE }),
]

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
      <PageClient />
    </>
  )
}
