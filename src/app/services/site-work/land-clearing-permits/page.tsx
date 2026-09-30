import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

/*
 * Built 2026-09-30, and unlike the arborist and stump-grinding gaps this one is
 * NOT backed by existing Search Console demand: permit-intent queries reaching
 * the site over 90 days total 1 impression. That is because there has never
 * been a page for Google to match, so there is nothing to measure yet.
 *
 * The case for building it is Tyler Hoag's own read of his market, given on the
 * 16 Sep call: "They cleared a lot and they didn't follow the permit process
 * and I needed an arborist to fix everything, which is a big thing around here.
 * The counties are clamping down... everyone still operates like it's 2010 and
 * people are paying fines." He is already posting this on social media.
 *
 * Every rule stated on the page is taken from the jurisdiction's own published
 * material and deliberately kept to the parts that are durable. Specific fees,
 * processing times and acreage cut-offs are NOT published here: sources
 * disagreed on them and they change. The page says to confirm the parcel, which
 * is both honest and the reason to call.
 */

const PAGE_URL = '/services/site-work/land-clearing-permits'
const TITLE = 'Tree Removal & Land Clearing Permits in Volusia County'
const DESCRIPTION =
  'Do you need a permit to clear a lot or remove a tree in Volusia or Seminole County? The exemptions, the 6-inch rule, and the mistake that costs builders money.'
const OG_IMAGE = '/photos/hoag/land-clearing-lake-shore-deland-fl.jpeg'

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
        alt: 'Cleared lot on a lake shore in DeLand, Volusia County, Florida',
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

const schemas = [
  serviceSchema({
    serviceType: 'Tree Removal and Land Clearing Permit Assistance',
    name: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    image: OG_IMAGE,
  }),
  faqSchema(FAQS),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Site Work', url: '/services/site-work' },
    { name: 'Clearing Permits', url: PAGE_URL },
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
