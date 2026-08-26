import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/fencing/wood-fencing'
const TITLE = 'Wood Fence Installation in DeLand & Central Florida'
const DESCRIPTION =
  'Wood board, privacy, barbed wire, field fence, and horse fence installation in DeLand and Central Florida. Built to last. Free estimates.'
const OG_IMAGE = '/photos/fence5.jpeg'

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
        alt: 'Wood fence installation in DeLand and Central Florida',
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
    q: 'How much does wood fencing cost per linear foot in Central Florida?',
    a: 'Wood fence pricing varies based on style, height, and terrain. Board fencing typically starts lower than privacy fencing. We provide free on-site estimates so you get an accurate price for your specific property and layout.',
  },
  {
    q: 'How long does it take to install a wood fence?',
    a: 'Most residential wood fence projects are completed within 1-3 days depending on the total linear footage and terrain. Larger agricultural or horse fencing projects may take a week or more. We give you a timeline at your site visit.',
  },
  {
    q: 'What types of wood do you use for fencing in Florida?',
    a: 'We primarily use pressure-treated pine for durability in Florida\'s humid climate. Cedar is also available for a premium natural look. All lumber is rated for ground contact and treated to resist rot, insects, and moisture.',
  },
  {
    q: 'How do I maintain my wood fence in Florida\'s weather?',
    a: 'We recommend staining or sealing your fence every 2-3 years to protect against UV, rain, and humidity. Regular inspections for loose boards or leaning posts will extend the life of your fence significantly.',
  },
  {
    q: 'Do I need a permit for a wood fence in DeLand?',
    a: 'Most fence installations in Volusia County require a permit. We handle the permitting process as part of our service so you don\'t have to worry about code compliance, setbacks, or height restrictions.',
  },
]

const schemas = [
  serviceSchema({
    serviceType: 'Wood Fencing',
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
    { name: 'Wood Fencing', url: PAGE_URL },
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
