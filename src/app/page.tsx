import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/'

export const metadata: Metadata = {
  title: {
    absolute: 'Hoag Land Services | Land Clearing, Tree Service & Fencing in DeLand, FL',
  },
  description:
    'Land clearing, tree service & fencing in DeLand & Central Florida. ISA Certified Arborist, licensed & insured. Free estimates — call today to book your project.',
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Hoag Land Services',
    title: 'Hoag Land Services | Land Clearing, Tree Service & Fencing in DeLand, FL',
    description:
      'Land clearing, tree service & fencing in DeLand & Central Florida. ISA Certified Arborist, licensed & insured. Free estimates — call today to book your project.',
    url: `${SITE_URL}/`,
    images: [
      {
        url: '/team-crew.JPEG',
        width: 1200,
        height: 630,
        alt: 'Hoag Land Services crew — land clearing, tree, and fencing pros in Central Florida',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hoag Land Services | Land Clearing, Tree Service & Fencing in DeLand, FL',
    description:
      'Land clearing, tree service & fencing in DeLand & Central Florida. ISA Certified Arborist, licensed & insured. Free estimates — call today.',
    images: ['/team-crew.JPEG'],
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
}

const schemas = [
  webPageSchema({
    name: 'Hoag Land Services — Land Clearing, Tree Service & Fencing in DeLand, FL',
    description:
      'Family-owned, ISA Certified land clearing, tree service, and fencing for residential & commercial properties across DeLand, DeLeon Springs & Central Florida.',
    url: '/',
    image: '/team-crew.JPEG',
  }),
]

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }}
      />
      <PageClient />
    </>
  )
}
