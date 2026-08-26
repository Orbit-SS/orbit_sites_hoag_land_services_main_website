import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import {
  localBusinessSchema,
  webPageSchema,
  breadcrumbSchema,
  jsonLd,
} from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/contact'

export const metadata: Metadata = {
  title: 'Contact Us: Free Estimate in DeLand, FL',
  description:
    'Get a free estimate for land clearing, tree service, or fencing in Central Florida. Call (386) 561-0003 or send a message and we will follow up promptly.',
  alternates: { canonical: `${SITE_URL}${PAGE_URL}` },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Hoag Land Services',
    title: 'Contact Us: Free Estimate in DeLand, FL',
    description:
      'Get a free estimate for land clearing, tree service, or fencing in Central Florida. Call (386) 561-0003 or send a message and we will follow up promptly.',
    url: `${SITE_URL}${PAGE_URL}`,
    images: [
      {
        url: '/photos/site7.JPG',
        width: 1200,
        height: 630,
        alt: 'Hoag Land Services site work — get a free estimate in DeLand, FL',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us: Free Estimate in DeLand, FL',
    description:
      'Free estimates for land clearing, tree service, or fencing in Central Florida. Call (386) 561-0003.',
    images: ['/photos/site7.JPG'],
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
  localBusinessSchema({ url: '/contact', image: '/photos/site7.JPG' }),
  webPageSchema({
    name: 'Contact Hoag Land Services',
    description:
      'Request a free estimate for land clearing, tree service, or fencing in DeLand & Central Florida.',
    url: '/contact',
    image: '/photos/site7.JPG',
  }),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ]),
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
