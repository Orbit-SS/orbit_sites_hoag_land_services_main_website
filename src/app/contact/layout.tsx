import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Contact Hoag Land Services' },
  description:
    'Request a free estimate from Hoag Land Services for land clearing, tree service, site work, fencing, grading, drainage, and storm cleanup in Central Florida.',
  alternates: { canonical: 'https://www.hlsdeland.com/contact' },
  openGraph: {
    type: 'website',
    title: 'Contact Hoag Land Services',
    description:
      'Request a free estimate for land clearing, tree service, site work, fencing, grading, drainage, and storm cleanup in Central Florida.',
    url: 'https://www.hlsdeland.com/contact',
    siteName: 'Hoag Land Services',
    locale: 'en_US',
    images: [
      {
        url: '/photos/site7.JPG',
        width: 1200,
        height: 630,
        alt: 'Contact Hoag Land Services for a free estimate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Hoag Land Services',
    description:
      'Request a free estimate for land clearing, tree service, site work, fencing, grading, drainage, and storm cleanup in Central Florida.',
    images: ['/photos/site7.JPG'],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
