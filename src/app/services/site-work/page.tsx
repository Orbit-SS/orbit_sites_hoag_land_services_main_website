import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/site-work'
const TITLE = 'Site Work Contractor in DeLand, FL: Clearing, Grading & Drainage'
const DESCRIPTION =
  'Site work contractor in DeLand and Central Florida: land clearing, grading, excavation, drainage, and erosion control. Free on-site estimates.'
const OG_IMAGE = '/photos/site7.JPG'

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
        alt: 'Site work and land clearing in DeLand FL',
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
    q: 'How much does land clearing cost?',
    a: 'It depends on acreage, terrain, vegetation density, and access. We provide free on-site estimates with honest, no-pressure pricing tailored to your specific property.',
  },
  {
    q: 'How long does it take?',
    a: 'Most residential lots are completed in 1 to 3 days. Larger commercial parcels and multi-phase projects vary based on scope. We will give you a realistic timeline upfront.',
  },
  {
    q: 'Do you handle permits?',
    a: 'We can advise on permitting requirements for your area and project type. We work with local municipalities regularly and know the process.',
  },
  {
    q: 'What areas do you serve?',
    a: 'DeLand, DeLeon Springs, Orange City, Deltona, and surrounding Central Florida communities. If you are nearby, give us a call and we will let you know.',
  },
  {
    q: 'Do you do the work yourselves?',
    a: 'Yes. Our own crew and our own equipment, start to finish. We do not subcontract your project out to strangers.',
  },
]

const schemas = [
  serviceSchema({
    serviceType: 'Site Work',
    name: 'Site Work & Land Clearing Services in Central Florida',
    description: DESCRIPTION,
    url: PAGE_URL,
    image: OG_IMAGE,
  }),
  faqSchema(FAQS),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Site Work', url: PAGE_URL },
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
