import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/tree-services/tree-trimming'
const TITLE = 'Tree Trimming & Pruning in DeLand, FL'
const DESCRIPTION =
  'ISA Certified Arborist tree trimming and pruning in Central Florida. Dead limb removal, canopy reduction, clearance for vehicles and structures.'
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
        alt: 'ISA Certified Arborist tree trimming in DeLand FL',
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
  { q: 'How often should trees be trimmed?', a: 'Most trees benefit from trimming every 2-3 years. Fast-growing species or trees near structures may need annual attention. Our arborist will recommend a schedule based on your specific trees and their growth patterns.' },
  { q: 'How much does tree trimming cost?', a: 'Tree trimming typically ranges from $200-$800 per tree depending on size, species, and the amount of work needed. Multi-tree discounts are available. We provide exact pricing during your free arborist walk-through.' },
  { q: 'When is the best time of year to trim trees?', a: 'In Central Florida, most trees can be trimmed year-round. However, late winter to early spring is often ideal for many species because trees are dormant and it minimizes stress. Our arborist will advise on timing for your specific trees.' },
  { q: 'Will trimming hurt my tree?', a: 'Proper pruning by a certified arborist actually improves tree health. We never remove more than 25% of the canopy at once and follow ISA pruning standards. Topping and lion-tailing — which harm trees — are practices we never use.' },
  { q: 'Are you insured for tree trimming work?', a: 'Yes. We carry full general liability and workers compensation insurance. We are happy to provide a certificate of insurance before any work begins. Your property is fully protected.' },
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
    { name: 'Tree Trimming', url: PAGE_URL },
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
