import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/tree-services/dangerous-trees'
const TITLE = 'Hazardous Tree Removal — TRAQ-Qualified Arborist'
const DESCRIPTION =
  'Leaning, dead, or structurally compromised trees evaluated by an ISA Tree Risk Assessment Qualified arborist in DeLand and Central Florida.'
const OG_IMAGE = '/photos/tree9.jpeg'

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
        alt: 'Hazardous tree removal by TRAQ-qualified arborist in DeLand FL',
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
  { q: 'How do I tell if a tree is dangerous?', a: 'Warning signs include visible lean toward structures, large dead branches, cracks or splits in the trunk, fungal growth at the base, and roots lifting out of the ground. If you notice any of these, call for an arborist assessment — it is the only way to know for certain.' },
  { q: 'How much does hazard tree removal cost?', a: 'Hazard tree removal typically ranges from $800 to $5,000+ depending on tree size, proximity to structures, and complexity of the rigging required. We provide a free on-site estimate with transparent, all-inclusive pricing.' },
  { q: 'Do you offer emergency tree service?', a: 'Yes. For trees that pose an immediate threat to life or property, we mobilize as quickly as possible. Call us directly and describe the situation — we prioritize genuine emergencies.' },
  { q: 'Will my homeowners insurance cover hazard tree removal?', a: 'Many policies cover tree removal if the tree has already caused damage or is an imminent threat. We recommend contacting your adjuster. Our detailed arborist assessment report can support your claim.' },
  { q: 'Is stump removal included?', a: 'Stump grinding is available as an add-on. Many homeowners choose to include it so the hazard is completely eliminated and the area can be replanted or graded.' },
]

const schemas = [
  serviceSchema({
    serviceType: 'Hazardous Tree Removal',
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
    { name: 'Dangerous Trees', url: PAGE_URL },
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
