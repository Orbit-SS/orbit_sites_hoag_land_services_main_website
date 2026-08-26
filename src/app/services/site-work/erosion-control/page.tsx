import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/site-work/erosion-control'
const TITLE = 'Erosion Control — Silt Fences, Swales & Culverts'
const DESCRIPTION =
  'Erosion control installation and maintenance for Central Florida construction sites. Silt fencing, swales, and culverts to meet county and state requirements.'
const OG_IMAGE = '/photos/site8.JPG'

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
        alt: 'Erosion control silt fence installation in Central Florida',
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
    q: 'How much does erosion control installation cost?',
    a: 'Costs depend on the scope of work, linear footage of silt fence, number and size of swales or culverts, and site conditions. We provide a detailed estimate after assessing your property so you know exactly what to expect.',
  },
  {
    q: 'Do I need a permit for erosion control in Volusia County?',
    a: 'Most construction and land disturbance projects require an erosion and sediment control plan as part of the permitting process. We help identify requirements and ensure your project meets all local and state compliance standards.',
  },
  {
    q: 'How often does silt fence need to be maintained?',
    a: 'Silt fence should be inspected after every significant rain event and at regular intervals during construction. We provide both installation and ongoing maintenance to keep your site compliant throughout the project.',
  },
  {
    q: 'What happens if I do not install erosion control on my construction site?',
    a: 'Failing to install proper erosion control can result in fines from local code enforcement, stop-work orders, damage to neighboring properties, and environmental violations. It is not optional on most permitted projects.',
  },
  {
    q: 'When is erosion control needed?',
    a: 'Erosion control is required any time land is disturbed — during land clearing, grading, excavation, construction, and any activity that exposes bare soil. It is also needed for ongoing properties with slope or drainage issues.',
  },
]

const schemas = [
  serviceSchema({
    serviceType: 'Erosion Control',
    name: 'Erosion Control in Central Florida',
    description: DESCRIPTION,
    url: PAGE_URL,
    image: OG_IMAGE,
  }),
  faqSchema(FAQS),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Site Work', url: '/services/site-work' },
    { name: 'Erosion Control', url: PAGE_URL },
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
