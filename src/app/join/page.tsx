import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import {
  webPageSchema,
  breadcrumbSchema,
  jsonLd,
} from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/join'

export const metadata: Metadata = {
  title: 'Join Our Team: Careers in DeLand & Central Florida',
  description:
    'Hiring equipment operators, tree crew, and fence installers in DeLand and Central Florida. Apply today to join our family-owned, ISA Certified team.',
  alternates: { canonical: `${SITE_URL}${PAGE_URL}` },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Hoag Land Services',
    title: 'Join Our Team: Careers in DeLand & Central Florida',
    description:
      'Hiring equipment operators, tree crew, and fence installers in DeLand and Central Florida. Apply today to join our family-owned, ISA Certified team.',
    url: `${SITE_URL}${PAGE_URL}`,
    images: [
      {
        url: '/team-crew.JPEG',
        width: 1200,
        height: 630,
        alt: 'Hoag Land Services crew — join our team in DeLand, FL',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Join Our Team: Careers in DeLand & Central Florida',
    description:
      'Hiring equipment operators, tree crew, and fence installers in DeLand & Central Florida. Apply today.',
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
    name: 'Join Our Team: Careers in DeLand & Central Florida',
    description:
      'Career opportunities at Hoag Land Services — equipment operators, tree crew, and fence installers across DeLand & Central Florida.',
    url: '/join',
    image: '/team-crew.JPEG',
  }),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Join Our Team', url: '/join' },
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
