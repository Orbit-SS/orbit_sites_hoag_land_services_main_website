import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import {
  organizationSchema,
  webPageSchema,
  breadcrumbSchema,
  jsonLd,
} from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/about'

export const metadata: Metadata = {
  title: 'About Us: Family-Owned Land Service in DeLand, FL',
  description:
    'Meet Tyler Hoag, ISA Certified Arborist and founder of our family-owned land clearing, tree, and fencing company serving Central Florida since 2017.',
  alternates: { canonical: `${SITE_URL}${PAGE_URL}` },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Hoag Land Services',
    title: 'About Us: Family-Owned Land Service in DeLand, FL',
    description:
      'Meet Tyler Hoag, ISA Certified Arborist and founder of our family-owned land clearing, tree, and fencing company serving Central Florida since 2017.',
    url: `${SITE_URL}${PAGE_URL}`,
    images: [
      {
        url: '/team-family.JPEG',
        width: 1200,
        height: 630,
        alt: 'The Hoag family — owners of Hoag Land Services in DeLand, FL',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us: Family-Owned Land Service in DeLand, FL',
    description:
      'Meet Tyler Hoag, ISA Certified Arborist and founder of Hoag Land Services — family-owned, serving Central Florida since 2017.',
    images: ['/team-family.JPEG'],
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
  organizationSchema(),
  webPageSchema({
    name: 'About Hoag Land Services',
    description:
      'The story of Hoag Land Services — ISA Certified Arborist owner Tyler Hoag, founded 2017, serving DeLand, DeLeon Springs, and Central Florida.',
    url: '/about',
    image: '/team-family.JPEG',
  }),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
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
