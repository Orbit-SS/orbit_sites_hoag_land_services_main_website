import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import {
  serviceSchema,
  webPageSchema,
  breadcrumbSchema,
  jsonLd,
} from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services'

export const metadata: Metadata = {
  title: 'Our Services — Land Clearing, Tree Service & Fencing',
  description:
    'Professional site work, tree care, and fencing for residential and commercial properties in DeLand and Central Florida. ISA Certified Arborist. Free estimates.',
  alternates: { canonical: `${SITE_URL}${PAGE_URL}` },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Hoag Land Services',
    title: 'Our Services — Land Clearing, Tree Service & Fencing',
    description:
      'Professional site work, tree care, and fencing for residential and commercial properties in DeLand and Central Florida. ISA Certified Arborist. Free estimates.',
    url: `${SITE_URL}${PAGE_URL}`,
    images: [
      {
        url: '/photos/site7.JPG',
        width: 1200,
        height: 630,
        alt: 'Hoag Land Services — site work, tree services, and fencing across Central Florida',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services — Land Clearing, Tree Service & Fencing',
    description:
      'Site work, tree care, and fencing for residential and commercial properties in DeLand and Central Florida.',
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
  serviceSchema({
    serviceType: 'Site Work',
    name: 'Site Work & Land Clearing in Central Florida',
    description:
      'Land clearing, earthworks, excavation, grading, drainage, and erosion control for residential and commercial properties.',
    url: '/services/site-work',
    image: '/photos/site1.JPEG',
  }),
  serviceSchema({
    serviceType: 'Tree Services',
    name: 'Tree Services in Central Florida',
    description:
      'ISA Certified Arborist tree removal, trimming, palm pruning, storm cleanup, and tree installation.',
    url: '/services/tree-services',
    image: '/photos/tree5.JPEG',
  }),
  serviceSchema({
    serviceType: 'Fencing',
    name: 'Fencing Installation in Central Florida',
    description:
      'Wood, vinyl, and aluminum fencing for residential, commercial, and agricultural properties — perimeter, pasture, and privacy.',
    url: '/services/fencing',
    image: '/photos/fence5.jpeg',
  }),
  webPageSchema({
    name: 'Our Services — Hoag Land Services',
    description:
      'Land clearing, tree care, and fencing services in DeLand and Central Florida from a family-owned, ISA Certified team.',
    url: '/services',
    image: '/photos/site7.JPG',
  }),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
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
