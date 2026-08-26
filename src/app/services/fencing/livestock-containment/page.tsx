import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/fencing/livestock-containment'
const TITLE = 'Livestock & Horse Fencing in Central Florida'
const DESCRIPTION =
  'Field fence, horse fence, barbed wire, and board fencing for agricultural and equestrian properties in DeLand and Central Florida. Free estimates.'
const OG_IMAGE = '/photos/fence10.JPEG'

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
        alt: 'Livestock and horse fencing in Central Florida',
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
    q: 'What type of fence is best for horses in Florida?',
    a: 'Board fence (3-rail or 4-board) is the most popular choice for horse properties in Central Florida. It\'s highly visible, strong enough to contain horses safely, and looks great on the property. We also install no-climb wire for added security.',
  },
  {
    q: 'How much does farm fencing cost per acre?',
    a: 'Cost depends on the perimeter footage, material type, and terrain. A 5-acre square lot has roughly 1,870 linear feet of perimeter. We provide free on-site estimates so you get accurate pricing for your specific property layout.',
  },
  {
    q: 'Do you install barbed wire fencing?',
    a: 'Yes. We install barbed wire fencing for cattle containment and perimeter security on agricultural properties. We follow all local regulations regarding barbed wire placement and setbacks from roads and neighboring residential properties.',
  },
  {
    q: 'What gate options are available for farm fencing?',
    a: 'We install single and double swing gates, drive-through gates for equipment access, and walk-through gates for foot traffic. Gates are built with the same materials as your fence and sized to fit your equipment and vehicles.',
  },
  {
    q: 'How do you maintain farm fencing in Florida?',
    a: 'Wood farm fencing benefits from staining every few years. Wire fencing should be inspected regularly for loose staples and tension. We build with pressure-treated posts and quality hardware to minimize the maintenance you\'ll need long-term.',
  },
]

const schemas = [
  serviceSchema({
    serviceType: 'Agricultural Fencing',
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
    { name: 'Livestock & Horse Fencing', url: PAGE_URL },
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
