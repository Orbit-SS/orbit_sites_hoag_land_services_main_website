import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/tree-services'
const TITLE = 'Tree Service in DeLand, FL: Removal, Trimming & Palm Pruning'
const DESCRIPTION =
  'ISA Certified Arborist in DeLand and Central Florida: tree removal, trimming, palm pruning, storm cleanup, and stump grinding. Free on-site estimates.'
const OG_IMAGE = '/photos/tree8.jpeg'

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
        alt: 'ISA Certified Arborist tree services in DeLand FL',
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

const schemas = [
  serviceSchema({
    serviceType: 'Tree Services',
    name: 'Tree Services by ISA Certified Arborist in Central Florida',
    description: DESCRIPTION,
    url: PAGE_URL,
    image: OG_IMAGE,
  }),
  faqSchema(FAQS),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Tree Services', url: PAGE_URL },
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
