import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/fencing/aluminum-fencing'
const TITLE = 'Aluminum Fence Installation — Pools, Estates & Commercial'
const DESCRIPTION =
  'Durable aluminum fencing for pools, estates, and commercial properties in DeLand and Central Florida. Code-compliant pool barriers. Free estimates.'
const OG_IMAGE = '/photos/fence8.jpeg'

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
        alt: 'Aluminum fence installation for pools, estates, and commercial properties',
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
    q: 'How much does aluminum fencing cost?',
    a: 'Aluminum fencing is a mid-range option — more affordable than wrought iron but higher than basic wood. The exact cost depends on height, style, and total footage. We provide a free on-site estimate with a clear breakdown so there are no surprises.',
  },
  {
    q: 'Does aluminum fencing meet Florida pool code requirements?',
    a: 'Yes. We install aluminum fencing that meets Florida\'s pool barrier code, including the required 48-inch minimum height, maximum 4-inch picket spacing, and self-closing/self-latching gate hardware. We ensure your installation passes inspection.',
  },
  {
    q: 'What color options are available for aluminum fencing?',
    a: 'Aluminum fencing comes in black, bronze, white, and several other powder-coated finishes. Black is the most popular for its classic, elegant appearance. All colors are applied with a durable powder coating that resists chipping, peeling, and fading.',
  },
  {
    q: 'How does aluminum compare to wrought iron fencing?',
    a: 'Aluminum gives you the same elegant look as wrought iron at a fraction of the cost and weight — and it never rusts. Wrought iron requires regular painting and rust treatment, while aluminum is virtually maintenance-free in Florida\'s coastal climate.',
  },
  {
    q: 'Will aluminum fencing work with my HOA requirements?',
    a: 'Aluminum fencing is one of the most HOA-friendly options available. Its clean, professional look meets the aesthetic standards of most communities. We can work with your HOA\'s specific guidelines on height, style, and color to ensure approval.',
  },
]

const schemas = [
  serviceSchema({
    serviceType: 'Aluminum Fencing',
    name: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    image: OG_IMAGE,
  }),
  faqSchema(FAQS),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Fencing', url: '/services/fencing' },
    { name: 'Aluminum Fencing', url: PAGE_URL },
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
