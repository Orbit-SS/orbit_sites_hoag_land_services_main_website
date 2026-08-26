import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import {
  webPageSchema,
  breadcrumbSchema,
  jsonLd,
} from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/portfolio'

export const metadata: Metadata = {
  title: 'Portfolio: Land Clearing, Tree & Fence Projects',
  description:
    'Browse real before/after photos of land clearing, tree, and fencing projects completed by Hoag Land Services in DeLand, DeLeon Springs & Central Florida.',
  alternates: { canonical: `${SITE_URL}${PAGE_URL}` },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Hoag Land Services',
    title: 'Portfolio: Land Clearing, Tree & Fence Projects',
    description:
      'Browse real before/after photos of land clearing, tree, and fencing projects completed by Hoag Land Services in DeLand, DeLeon Springs & Central Florida.',
    url: `${SITE_URL}${PAGE_URL}`,
    images: [
      {
        url: '/photos/site7.JPG',
        width: 1200,
        height: 630,
        alt: 'Hoag Land Services project portfolio — Central Florida land clearing, tree, and fencing work',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio: Land Clearing, Tree & Fence Projects',
    description:
      'Real project photos: land clearing, tree work, and fencing in DeLand, DeLeon Springs & Central Florida.',
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
  webPageSchema({
    name: 'Portfolio — Hoag Land Services',
    description:
      'Project portfolio of land clearing, tree service, and fencing work completed across DeLand, DeLeon Springs & Central Florida.',
    url: '/portfolio',
    image: '/photos/site7.JPG',
  }),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Portfolio', url: '/portfolio' },
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
