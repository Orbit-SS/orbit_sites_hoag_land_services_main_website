import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/tree-services/palm-pruning'
const TITLE = 'Palm Pruning & Maintenance in Central Florida'
const DESCRIPTION =
  'Professional palm pruning — dead frond removal, fruit cluster removal, and sprout clearing. Keep your palms healthy in DeLand and Central Florida.'
const OG_IMAGE = '/photos/tree14.JPEG'

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
        alt: 'Professional palm pruning in Central Florida',
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
  { q: 'How often should palms be pruned?', a: 'Most palms in Central Florida benefit from pruning once or twice per year. Over-pruning is harmful — we only remove dead and dying fronds, fruit clusters, and sprouts. Our arborist will recommend the right frequency for your specific palm species.' },
  { q: 'How much does palm pruning cost?', a: 'Palm pruning typically ranges from $75-$250 per palm depending on height, species, and accessibility. Multi-palm and recurring service discounts are available. We quote exact pricing during your free property assessment.' },
  { q: 'Does over-pruning hurt palms?', a: 'Yes. Removing green fronds — sometimes called "hurricane cutting" — actually weakens the palm and makes it more vulnerable to storm damage and nutrient deficiency. We follow best practices and only remove fronds below the 9 o\'clock position.' },
  { q: 'What is the best season to prune palms?', a: 'In Florida, palms can be pruned year-round. However, late spring through early summer is often preferred because it removes seed pods before they drop and addresses dead fronds from winter.' },
  { q: 'Do you offer commercial palm maintenance?', a: 'Yes. We maintain palms for HOAs, commercial properties, and apartment complexes throughout Volusia County. We offer recurring service contracts with scheduled visits for consistent, clean results.' },
]

const schemas = [
  serviceSchema({
    serviceType: 'Palm Pruning',
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
    { name: 'Palm Pruning', url: PAGE_URL },
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
