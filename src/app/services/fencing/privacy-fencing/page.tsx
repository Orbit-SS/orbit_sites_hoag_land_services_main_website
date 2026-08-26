import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/fencing/privacy-fencing'
const TITLE = 'Privacy Fencing in DeLand & Central Florida'
const DESCRIPTION =
  'Wood and vinyl privacy fencing professionally installed in Central Florida. Create a private, secure outdoor space. Free estimates.'
const OG_IMAGE = '/photos/fence6.jpeg'

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
        alt: 'Privacy fence installation in DeLand and Central Florida',
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
    q: 'Is wood or vinyl better for a privacy fence?',
    a: 'Both work well for privacy. Wood is more affordable upfront and offers a natural look that suits Florida properties. Vinyl costs more initially but requires zero maintenance and never rots. We install both and can help you decide based on your budget and preferences.',
  },
  {
    q: 'How much does a privacy fence cost in Central Florida?',
    a: 'Privacy fence pricing depends on linear footage, material (wood or vinyl), height, terrain, and gate requirements. We provide free on-site estimates with transparent pricing so you know exactly what to expect before we start.',
  },
  {
    q: 'Are there height restrictions for privacy fences in Volusia County?',
    a: 'Most residential areas in Volusia County allow 6-foot fences in rear and side yards. Front yard fencing is typically limited to 4 feet. We handle permitting and know the local codes, so your fence will be compliant from day one.',
  },
  {
    q: 'Will my HOA allow a privacy fence?',
    a: 'Many HOAs have specific requirements for fence style, material, and color. We work with HOA guidelines regularly and can help you choose an option that meets your association\'s rules while still giving you the privacy you need.',
  },
  {
    q: 'How long does it take to install a privacy fence?',
    a: 'Most residential privacy fence installations take 1-3 days depending on the total footage and terrain. We clear the fence line, set posts in concrete, and build the panels on site. You\'ll have a timeline before we start.',
  },
]

const schemas = [
  serviceSchema({
    serviceType: 'Privacy Fencing',
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
    { name: 'Privacy Fencing', url: PAGE_URL },
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
