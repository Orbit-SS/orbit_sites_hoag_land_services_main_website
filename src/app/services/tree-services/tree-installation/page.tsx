import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/tree-services/tree-installation'
const TITLE = 'Tree Installation & Planting in DeLand, FL'
const DESCRIPTION =
  'The right tree in the right place. Palm, hardwood, and evergreen installation by an ISA Certified Arborist in Central Florida.'
const OG_IMAGE = '/photos/tree6.jpeg'

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
        alt: 'Tree installation and planting in DeLand FL',
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
  { q: 'What are the best trees for Central Florida?', a: 'Live oaks, bald cypress, southern magnolia, and crape myrtles are excellent hardwood choices. For palms, Sabal palmettos, Sylvester date palms, and Medjool palms thrive here. Our arborist will recommend species based on your soil, sun exposure, and goals.' },
  { q: 'How much does tree installation cost?', a: 'Cost depends on species, size, and quantity. Small trees and palms may start around $200-$500 installed, while large specimen trees can range from $1,000-$5,000+. We provide itemized estimates so you know exactly what you are paying for.' },
  { q: 'Do you offer a warranty on planted trees?', a: 'We stand behind our work. Details on our planting warranty are discussed during consultation and depend on species and conditions. Proper watering during the establishment period is essential for warranty coverage.' },
  { q: 'When is the best time to plant trees in Florida?', a: 'Florida\'s rainy season (June through September) is ideal for planting because regular rainfall helps new trees establish roots. However, with proper irrigation, we can install trees year-round in Central Florida.' },
  { q: 'How much watering do newly planted trees need?', a: 'New trees need regular watering for 6-12 months after planting. We provide specific watering instructions for each species and can set up temporary irrigation if needed. Establishment care is the key to long-term success.' },
]

const schemas = [
  serviceSchema({
    serviceType: 'Tree Planting',
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
    { name: 'Tree Installation', url: PAGE_URL },
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
