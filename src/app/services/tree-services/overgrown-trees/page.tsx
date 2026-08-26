import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/tree-services/overgrown-trees'
const TITLE = 'Overgrown Tree Trimming in Central Florida'
const DESCRIPTION =
  'Reclaim your light, views, and roof clearance. Professional canopy reduction and selective trimming in DeLand and Central Florida.'
const OG_IMAGE = '/photos/tree5.JPEG'

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
        alt: 'Overgrown tree trimming in Central Florida',
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
  { q: 'Will trimming hurt the tree?', a: 'Not when done correctly. Our ISA Certified Arborist follows ANSI A300 pruning standards, making proper cuts at the right locations. We never top trees or remove more than the tree can handle in a single session.' },
  { q: 'How much of the canopy can you remove?', a: 'Industry best practice is to remove no more than 25% of a tree\'s live canopy in a single pruning cycle. Our arborist will recommend the right amount based on species, health, and your goals.' },
  { q: 'When is the best time of year to trim?', a: 'In Central Florida, most trees can be pruned year-round. However, some species respond better to pruning during their dormant season. Our arborist will advise on the best timing for your specific trees.' },
  { q: 'How much does tree trimming cost?', a: 'Trimming costs depend on the number of trees, their size, access, and how much work each needs. Single tree trimming often ranges from $200-$1,500. We provide a free on-site estimate with no surprises.' },
  { q: 'How often should trees be trimmed?', a: 'Most trees benefit from pruning every 2-5 years depending on species and growth rate. Fast-growing trees like oaks may need attention every 2-3 years. We can set up a maintenance schedule after your first service.' },
]

const schemas = [
  serviceSchema({
    serviceType: 'Tree Trimming',
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
    { name: 'Overgrown Trees', url: PAGE_URL },
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
