import type { Metadata } from 'next'
import WrongTreeWrongPlacePageClient from './page-client'

const title = 'Wrong Tree in the Wrong Place | Arborist Tree Removal'
const description =
  'ISA Certified Arborist help for trees planted too close to homes, driveways, utilities, and structures in DeLand, Volusia County, and Central Florida.'
const canonical = 'https://www.hlsdeland.com/services/tree-services/wrong-tree-wrong-place'

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
        url: '/photos/tree6.jpeg',
        width: 1200,
        height: 630,
        alt: 'Tree removal for a tree growing in the wrong place',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/photos/tree6.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
}

export default function WrongTreeWrongPlacePage() {
  return <WrongTreeWrongPlacePageClient />
}
