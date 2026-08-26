import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/tree-services/tree-removal'
const TITLE = 'Tree Removal by ISA Certified Arborist in DeLand, FL'
const DESCRIPTION =
  'Safe tree removal by an ISA Certified Arborist in DeLand and Central Florida. Licensed, insured, no damage to your property. Free estimates.'
const OG_IMAGE = '/photos/tree2.jpeg'

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
        alt: 'ISA Certified Arborist tree removal in DeLand FL',
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
  { q: 'How much does tree removal cost?', a: 'Tree removal costs vary based on tree size, location, and complexity. Small yard trees may start around $300-$500, while large oaks near structures can range from $1,500-$5,000+. We provide free on-site estimates with transparent pricing — no surprises.' },
  { q: 'How long does tree removal take?', a: 'Most residential tree removals are completed in a single day. Larger or more complex jobs involving crane work or limited access may take two days. We always communicate the expected timeline during your arborist assessment.' },
  { q: 'Is stump grinding included?', a: 'Stump grinding is available as an add-on service. Many customers choose to include it for a clean, finished look. We will quote stump grinding separately so you know the exact cost upfront.' },
  { q: 'Do I need a permit to remove a tree?', a: 'In Volusia County, certain trees may require a permit depending on species, size, and location. Our team handles the permit research for you and will advise if a permit is needed before any work begins.' },
  { q: 'Do you offer emergency tree removal?', a: 'Yes. After hurricanes and major storms, we mobilize quickly for emergency tree removal to clear hazards from homes, driveways, and power lines. Call us anytime for storm damage situations.' },
  { q: 'What happens to the wood after removal?', a: 'We haul away all debris and leave your property clean. If you want to keep firewood or larger sections, just let us know during the estimate and we will cut it to your preference.' },
]

const schemas = [
  serviceSchema({
    serviceType: 'Tree Removal',
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
    { name: 'Tree Removal', url: PAGE_URL },
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
