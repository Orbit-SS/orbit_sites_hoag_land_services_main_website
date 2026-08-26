import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/site-work/overgrown-land-clearing'
const TITLE = 'Overgrown Land Clearing — Reclaim Your Property'
const DESCRIPTION =
  'Years of overgrowth, dense brush, fallen trees — we clear it. Overgrown lot clearing in DeLand and Central Florida. Free estimates.'
const OG_IMAGE = '/photos/site3.jpeg'

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
        alt: 'Overgrown land clearing in Central Florida',
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
    q: 'How much does it cost to clear an overgrown lot?',
    a: 'Pricing depends on lot size, vegetation density, tree count, and accessibility. A heavily overgrown quarter-acre residential lot will cost less than a multi-acre parcel choked with mature hardwoods and invasive brush. We walk the property and give you a firm number before any work starts.',
  },
  {
    q: 'How long does overgrown land clearing take?',
    a: 'Most residential lots with heavy overgrowth take two to four days. Larger parcels with dense canopy and deep brush may take a week or longer. We provide a timeline during the estimate so you know exactly what to expect.',
  },
  {
    q: 'What happens to all the debris after clearing?',
    a: 'We chip brush and small vegetation on-site with our forestry mulcher. Larger trees are cut, processed, and hauled off. Stumps are ground below grade. When we leave, your property is clean and clear with no piles left behind.',
  },
  {
    q: 'Can you save specific trees during the clearing process?',
    a: 'Absolutely. Our ISA Certified Arborist identifies and flags trees worth keeping before any equipment moves in. We work around them carefully to protect root zones and canopy while removing everything else.',
  },
  {
    q: 'Is there a minimum lot size for overgrown clearing?',
    a: 'No minimum. We handle everything from small residential lots buried under years of neglect to large rural parcels that have never been cleared. If equipment can reach it, we can clear it.',
  },
]

const schemas = [
  serviceSchema({
    serviceType: 'Land Clearing',
    name: 'Overgrown Land Clearing in Central Florida',
    description: DESCRIPTION,
    url: PAGE_URL,
    image: OG_IMAGE,
  }),
  faqSchema(FAQS),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Site Work', url: '/services/site-work' },
    { name: 'Overgrown Land Clearing', url: PAGE_URL },
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
