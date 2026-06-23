import type { Metadata } from 'next'
import SiteWorkPageClient from './page-client'

const title = 'Land Clearing & Site Work DeLand FL'
const description =
  'Land clearing, forestry mulching, brush clearing, grading, drainage, and site prep in DeLand, DeLeon Springs, Volusia County, and Central Florida.'
const canonical = 'https://www.hlsdeland.com/services/site-work'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    type: 'website',
    title,
    description,
    url: canonical,
    siteName: 'Hoag Land Services',
    locale: 'en_US',
    images: [
      {
        url: '/photos/site7.JPG',
        width: 1200,
        height: 630,
        alt: 'Hoag Land Services land clearing and site work in Central Florida',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
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

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${canonical}#service`,
  name: 'Land Clearing and Site Work',
  serviceType: [
    'Land clearing',
    'Brush clearing',
    'Forestry mulching',
    'Site preparation',
    'Grading',
    'Drainage',
    'Erosion control',
  ],
  provider: { '@id': 'https://www.hlsdeland.com/#organization' },
  areaServed: [
    { '@type': 'City', name: 'DeLand, FL' },
    { '@type': 'City', name: 'DeLeon Springs, FL' },
    { '@type': 'AdministrativeArea', name: 'Volusia County, FL' },
    { '@type': 'AdministrativeArea', name: 'Central Florida' },
  ],
  url: canonical,
  description,
}

export default function SiteWorkPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <SiteWorkPageClient />
    </>
  )
}
