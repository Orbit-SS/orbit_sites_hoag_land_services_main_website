import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/site-work/land-preparation'
const TITLE = 'Site Prep & Land Preparation in DeLand, FL'
const DESCRIPTION =
  'Site prep and land preparation for new construction in DeLand and Central Florida — clearing, grading, drainage, and access prep. Free estimates.'
const OG_IMAGE = '/photos/site5.jpeg'

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
        alt: 'Site prep and land preparation on a Central Florida construction lot',
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
    q: 'What is the typical timeline for site preparation?',
    a: 'A standard residential building pad on a cleared lot takes three to five days. Full site prep on raw acreage including clearing, grading, and access road construction can take one to three weeks depending on size and terrain. We provide a detailed schedule during the estimate.',
  },
  {
    q: 'How much does site preparation cost per acre?',
    a: 'Cost per acre varies significantly based on existing vegetation, terrain, soil conditions, and the scope of prep required. A lightly wooded flat lot costs less than dense hardwood on rolling terrain that needs a building pad and access road. We walk the property and give you a firm price.',
  },
  {
    q: 'Do you work with builders and general contractors?',
    a: 'Yes. We work directly with builders, general contractors, and developers regularly. We understand construction timelines and coordinate our work to keep your project on schedule. We can also work directly from your site plans and engineering drawings.',
  },
  {
    q: 'Do I need permits for site preparation?',
    a: 'Most site preparation work that involves grading, tree removal, or land disturbance requires permits from the local municipality or county. We help identify what is needed during the site walk and can coordinate the permitting process on your behalf.',
  },
  {
    q: 'What is included in your site preparation service?',
    a: 'Full site prep includes clearing and grubbing all vegetation, stump removal, rough grading to establish proper elevation and drainage, building pad preparation, and access road construction if needed. We leave your site ready for the next contractor to mobilize.',
  },
]

const schemas = [
  serviceSchema({
    serviceType: 'Site Preparation',
    name: 'Site Prep & Land Preparation Services in Central Florida',
    description: DESCRIPTION,
    url: PAGE_URL,
    image: OG_IMAGE,
  }),
  faqSchema(FAQS),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Site Work', url: '/services/site-work' },
    { name: 'Land Preparation', url: PAGE_URL },
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
