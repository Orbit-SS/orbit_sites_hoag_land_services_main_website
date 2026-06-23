import type { Metadata } from 'next'
import FencingPageClient from './page-client'

const title = 'Fence Company DeLand FL | Wood, Vinyl & Aluminum Fencing'
const description =
  'Fence installation in DeLand and Central Florida: wood privacy fencing, vinyl fencing, aluminum fencing, farm fencing, fence replacement, and property boundaries.'
const canonical = 'https://www.hlsdeland.com/services/fencing'

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
        url: '/photos/fence5.jpeg',
        width: 1200,
        height: 630,
        alt: 'Fence installation by Hoag Land Services in Central Florida',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/photos/fence5.jpeg'],
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
  name: 'Fencing Services',
  serviceType: [
    'Wood fencing',
    'Vinyl fencing',
    'Aluminum fencing',
    'Privacy fencing',
    'Farm fencing',
    'Fence replacement',
  ],
  provider: { '@id': 'https://www.hlsdeland.com/#organization' },
  areaServed: [
    { '@type': 'City', name: 'DeLand, FL' },
    { '@type': 'City', name: 'Palm Coast, FL' },
    { '@type': 'AdministrativeArea', name: 'Volusia County, FL' },
    { '@type': 'AdministrativeArea', name: 'Central Florida' },
  ],
  url: canonical,
  description,
}

export default function FencingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <FencingPageClient />
    </>
  )
}
