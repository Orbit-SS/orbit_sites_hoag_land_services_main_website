import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/tree-services/wrong-tree-wrong-place'
const TITLE = 'Wrong-Tree-Wrong-Place Removal & Replacement'
const DESCRIPTION =
  'Tree too close to your house, pool, or driveway? Roots damaging foundations? ISA Certified Arborist removal and replacement in Central Florida.'
const OG_IMAGE = '/photos/tree7.jpeg'

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
        alt: 'Wrong-tree-wrong-place removal and replacement in Central Florida',
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
  { q: 'How do I know if my tree is in the wrong place?', a: 'Common signs include roots cracking your driveway or foundation, branches hitting the house or power lines, roots invading your plumbing, the tree outgrowing its space, or constant debris in your pool. If the tree is causing more problems than it is worth, it is probably in the wrong place.' },
  { q: 'Can the tree be moved instead of removed?', a: 'Tree transplanting is possible for smaller, younger trees, but it is expensive and has a lower survival rate than planting a new tree. For most mature trees, removal and replacement with the right species is more cost-effective and gives better long-term results.' },
  { q: 'How much does it cost to remove and replace a tree?', a: 'Removal costs depend on tree size and complexity, typically $500-$4,000. Replacement tree installation depends on species and size, usually $200-$1,500 including the tree. We provide a combined estimate covering removal, stump grinding, and new planting.' },
  { q: 'What are the best tree species for Central Florida?', a: 'Our arborist recommends species based on your specific conditions — soil type, sun exposure, space, and goals. Popular choices include live oak for shade, bald cypress for wet areas, crepe myrtle for smaller spaces, and various native palms. We match the tree to the site.' },
  { q: 'Do you offer a warranty on new tree installations?', a: 'Yes. We stand behind our tree installations. Proper species selection, professional planting technique, and aftercare guidance give your new tree the best chance to thrive for decades.' },
]

const schemas = [
  serviceSchema({
    serviceType: 'Tree Removal & Replacement',
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
    { name: 'Wrong Tree, Wrong Place', url: PAGE_URL },
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
