import type { Metadata } from 'next'
import TreeServicesPageClient from './page-client'

const title = 'Tree Service DeLand & Port Orange FL | ISA Certified Arborist'
const description =
  'ISA Certified Arborist tree removal, tree trimming, palm pruning, stump grinding, and storm cleanup in DeLand, Port Orange, Volusia County, and Central Florida.'
const canonical = 'https://www.hlsdeland.com/services/tree-services'

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
        url: '/photos/tree5.JPEG',
        width: 1200,
        height: 630,
        alt: 'ISA Certified Arborist tree services by Hoag Land Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/photos/tree5.JPEG'],
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
  name: 'Tree Services',
  serviceType: [
    'Tree removal',
    'Tree trimming',
    'Palm pruning',
    'Stump grinding',
    'Storm cleanup',
    'Tree risk assessment',
  ],
  provider: { '@id': 'https://www.hlsdeland.com/#organization' },
  areaServed: [
    { '@type': 'City', name: 'DeLand, FL' },
    { '@type': 'City', name: 'Port Orange, FL' },
    { '@type': 'AdministrativeArea', name: 'Volusia County, FL' },
    { '@type': 'AdministrativeArea', name: 'Central Florida' },
  ],
  url: canonical,
  description,
}

export default function TreeServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <TreeServicesPageClient />
    </>
  )
}
