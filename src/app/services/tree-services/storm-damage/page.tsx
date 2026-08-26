import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/tree-services/storm-damage'
const TITLE = 'Storm Damage Tree Removal in Central Florida'
const DESCRIPTION =
  "Trees down, leaning, or split after a storm? ISA Certified Arborist storm cleanup in DeLand and Central Florida. We respond as soon as it's safe."
const OG_IMAGE = '/photos/tree3.jpeg'

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
        alt: 'Storm damage tree removal in Central Florida',
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
  { q: 'How fast can you respond after a storm?', a: 'We begin mobilizing immediately after conditions are safe. Response times depend on storm severity and call volume, but we prioritize trees on structures, blocking access, or near power lines. Most emergency calls are addressed within 24-48 hours.' },
  { q: 'Do you work with homeowners insurance?', a: 'Yes. We provide detailed documentation including photos, arborist reports, and itemized invoices that insurance companies require. We can also meet with your adjuster on-site if needed.' },
  { q: 'How much does storm damage cleanup cost?', a: 'Storm cleanup costs vary widely based on the number of trees, proximity to structures, and debris volume. Single tree removals may run $500-$3,000, while full property cleanups can be more. Insurance often covers storm damage — we help with that process.' },
  { q: 'Do you offer after-hours emergency service?', a: 'Yes. For genuine emergencies — trees on homes, blocking the only exit, or creating immediate danger — call us anytime. We will assess the situation and dispatch as quickly as conditions allow.' },
  { q: 'Is debris cleanup and hauling included?', a: 'Yes. Our storm damage service includes complete debris removal and hauling. We leave your property clean and clear. If you want to keep firewood, let us know and we will cut it to size.' },
]

const schemas = [
  serviceSchema({
    serviceType: 'Storm Damage Cleanup',
    name: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    image: OG_IMAGE,
  }),
  faqSchema(FAQS),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Tree Services', url: '/services/tree-services' },
    { name: 'Storm Damage', url: PAGE_URL },
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
