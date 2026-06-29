import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Site Work Contractor in DeLand, FL: Land Clearing & Site Prep',
  description:
    'Professional land clearing, forestry mulching, grading, drainage, excavation, and site preparation in DeLand and Central Florida. Licensed and insured. Free estimates.',
  alternates: {
    canonical: 'https://www.hlsdeland.com/services/site-work',
  },
  openGraph: {
    type: 'website',
    title: 'Site Work Contractor in DeLand, FL: Land Clearing & Site Prep',
    description:
      'Professional land clearing, forestry mulching, grading, drainage, excavation, and site preparation in DeLand and Central Florida.',
    url: 'https://www.hlsdeland.com/services/site-work',
    siteName: 'Hoag Land Services',
    locale: 'en_US',
    images: [
      {
        url: '/photos/site7.JPG',
        width: 1200,
        height: 630,
        alt: 'Land clearing and site work by Hoag Land Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Site Work Contractor in DeLand, FL: Land Clearing & Site Prep',
    description:
      'Land clearing, forestry mulching, grading, drainage, excavation, and site preparation in DeLand and Central Florida.',
    images: ['/photos/site7.JPG'],
  },
}

export default function SiteWorkLayout({ children }: { children: React.ReactNode }) {
  return children
}
