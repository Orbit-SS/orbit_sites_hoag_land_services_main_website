import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/fencing/property-boundary'
const TITLE = 'Property Boundary Fencing in Central Florida'
const DESCRIPTION =
  'Define your property line clearly with durable boundary fencing in DeLand and Central Florida. Wood, vinyl, or aluminum options. Free estimates.'
const OG_IMAGE = '/photos/fence7.jpeg'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PAGE_URL}` },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Hoag Land Services',
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}${PAGE_URL}`,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Property boundary fencing in Central Florida',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
}

const FAQS = [
  {
    q: 'Do I need a survey before installing a boundary fence?',
    a: 'We strongly recommend having a survey on file. If your property has existing survey pins, we can work from those. If not, we can coordinate with your surveyor to make sure the fence is placed correctly. Building on the wrong line creates legal problems.',
  },
  {
    q: 'What are the setback requirements for boundary fences in Volusia County?',
    a: 'Setback requirements vary by municipality and zoning. Most areas require the fence to be set back slightly from the actual property line. We know the local codes and handle permitting to make sure your fence is compliant.',
  },
  {
    q: 'How much does boundary fencing cost?',
    a: 'Cost depends on the total perimeter footage, material choice, terrain, and clearing needed. We provide free on-site estimates with transparent pricing. There are material options for every budget from basic wire to premium wood or vinyl.',
  },
  {
    q: 'What material is best for a property boundary fence?',
    a: 'It depends on your goal. Wood board fence is the most common for rural properties. Vinyl works well for residential neighborhoods. Aluminum is popular for estates. Wire fencing covers the most ground for the least cost on larger parcels.',
  },
  {
    q: 'Do I need a permit for a boundary fence?',
    a: 'Most fence installations in Volusia County and surrounding areas require a permit. We handle the entire permitting process as part of our service, including code compliance, setbacks, and height restrictions.',
  },
]

const schemas = [
  serviceSchema({
    serviceType: 'Boundary Fencing',
    name: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    image: OG_IMAGE,
  }),
  faqSchema(FAQS),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Fencing', url: '/services/fencing' },
    { name: 'Property Boundary Fencing', url: PAGE_URL },
  ]),
  webPageSchema({ name: TITLE, description: DESCRIPTION, url: PAGE_URL, image: OG_IMAGE }),
]

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schemas) }} />
      <PageClient />
    </>
  )
}
