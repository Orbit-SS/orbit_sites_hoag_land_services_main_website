import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/site-work/demolition'
const TITLE = 'Demolition Contractor in DeLand & Central Florida'
const DESCRIPTION =
  'Small structure, concrete, and outbuilding demolition in DeLand and Central Florida. Mobile homes, sheds, barns, slabs, pool decks. Licensed, insured, debris hauled off. Free on-site estimates.'
const OG_IMAGE = '/photos/hoag/demolition-excavator-central-fl.jpg'

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
        alt: 'SANY mini excavator on a Central Florida demolition and site prep job under a live oak canopy',
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
    q: 'How much does demolition cost in Central Florida?',
    a: 'Cost depends on the structure type, size, materials, access, and how much debris has to be hauled off. A single-wide mobile home costs less than a concrete slab and pool deck combo. We walk the property, price the exact scope, and give you a firm number before any work starts.',
  },
  {
    q: 'What structures do you demolish?',
    a: 'Small structures: mobile homes, single-wides and double-wides, sheds, outbuildings, barns, detached garages, carports, pool decks, concrete slabs and driveways, and post-storm damaged structures. We do not handle multi-story commercial buildings or anything requiring specialized asbestos remediation.',
  },
  {
    q: 'Do you handle debris hauling and disposal?',
    a: 'Yes. Demolition includes on-site debris breakdown, hauling, and disposal at the appropriate transfer facility. You do not have to arrange separate junk removal or a dumpster. Concrete and clean fill can also be stockpiled on site if you plan to reuse it.',
  },
  {
    q: 'Do I need a permit for demolition in Central Florida?',
    a: 'Most municipalities in Volusia, Lake, and Flagler counties require a demolition permit for anything larger than a small shed. Utility disconnects (power, gas, water) need to be scheduled with the utility company first. We help identify what is needed during the site walk and can coordinate the permit and utility disconnect process on your behalf.',
  },
  {
    q: 'How quickly can you demo my structure?',
    a: 'Most residential demolition jobs (mobile home, shed, small structure) are scheduled within 2 to 4 weeks of estimate acceptance. Emergency post-storm teardowns are faster. Actual demo is usually 1 to 3 days on site plus hauling. Larger concrete removal or barn takedowns can run longer.',
  },
  {
    q: 'Do you demolish pools?',
    a: 'Yes. In-ground pool demolition and pool deck removal are common jobs for us. We can do a full removal (broken up and hauled off, hole backfilled with clean fill) or a partial fill (broken and buried in place where local code allows). We walk you through the options.',
  },
]

const schemas = [
  serviceSchema({
    serviceType: 'Demolition',
    name: 'Demolition Services in Central Florida',
    description: DESCRIPTION,
    url: PAGE_URL,
    image: OG_IMAGE,
  }),
  faqSchema(FAQS),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Site Work', url: '/services/site-work' },
    { name: 'Demolition', url: PAGE_URL },
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
