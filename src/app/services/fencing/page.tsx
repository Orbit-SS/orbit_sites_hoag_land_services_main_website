import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/fencing'
const TITLE = 'Fence Contractor in DeLand, FL: Wood, Vinyl & Aluminum'
const DESCRIPTION =
  'Fence contractor in DeLand and Central Florida: wood, vinyl, aluminum, privacy, farm, and property-boundary fencing. Free on-site estimates.'
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
        alt: 'Fence installation in DeLand and Central Florida',
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
    q: 'How much does fencing cost?',
    a: 'Fencing costs depend on the material, length, terrain, and any line clearing needed. Wood fencing is typically the most affordable, vinyl is mid-range, and aluminum varies based on style. We provide free on-site estimates with straightforward pricing.',
  },
  {
    q: 'How long does fence installation take?',
    a: 'Most residential fence projects are completed in 1 to 3 days depending on the length and terrain. Larger acreage or properties requiring brush clearing may take longer. We give you a realistic timeline during your estimate.',
  },
  {
    q: 'What fence material is best for my property?',
    a: 'It depends on your goals. Wood is versatile and cost-effective for farms and privacy. Vinyl is low-maintenance and ideal for residential yards. Aluminum is great for pool areas and estates. We help you choose the right material during your site visit.',
  },
  {
    q: 'Do I need a permit for a fence?',
    a: 'Some areas in Volusia County require permits for fencing, especially in subdivisions or near waterways. We can advise you on local requirements and help guide you through the process.',
  },
  {
    q: 'Do you clear the fence line before installation?',
    a: 'Yes. This is one of our biggest advantages. Most fence companies require you to have a clear line before they start. We clear brush, trees, and debris ourselves — so you get one crew, one project, one bill.',
  },
  {
    q: 'What areas do you serve?',
    a: 'DeLand, DeLeon Springs, Orange City, Deltona, and surrounding Central Florida communities. If you are nearby, give us a call and we will let you know if we can serve your area.',
  },
]

const schemas = [
  serviceSchema({
    serviceType: 'Fence Installation',
    name: 'Fence Installation Services in Central Florida',
    description: DESCRIPTION,
    url: PAGE_URL,
    image: OG_IMAGE,
  }),
  faqSchema(FAQS),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Fencing', url: PAGE_URL },
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
