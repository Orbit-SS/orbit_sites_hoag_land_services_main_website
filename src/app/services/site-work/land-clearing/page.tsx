import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/site-work/land-clearing'
const TITLE = 'Land Clearing in DeLand, FL — From Single Lots to Hundreds of Acres'
const DESCRIPTION =
  'Professional land clearing for residential, commercial, and agricultural property in DeLand and Central Florida. Free estimates. Licensed & insured.'
const OG_IMAGE = '/photos/site1.JPEG'

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
        alt: 'Land clearing in DeLand FL',
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
    q: 'How much does land clearing cost per acre in Central Florida?',
    a: 'Costs vary based on vegetation density, tree size, debris volume, and access. Light brush clearing on a flat residential lot starts lower than heavy hardwood removal on unimproved acreage. We provide free on-site estimates so you get an accurate number before any work begins.',
  },
  {
    q: 'How long does it take to clear a residential lot?',
    a: 'A standard quarter-acre residential lot with moderate vegetation typically takes one to two days. Larger parcels or heavily wooded acreage can take a week or more. We will give you a clear timeline after the site walk.',
  },
  {
    q: 'What happens to the trees, stumps, and debris after clearing?',
    a: 'We haul off or chip all vegetation debris. Stumps can be ground below grade or fully removed depending on your project needs. We leave your site clean, level, and ready for the next phase of development.',
  },
  {
    q: 'Do I need permits to clear my land in Volusia County?',
    a: 'Permit requirements depend on the municipality, lot size, and whether protected species or wetlands are present. We help identify what is needed during the site walk and can coordinate with local authorities on your behalf.',
  },
  {
    q: 'Is there a minimum lot size you will clear?',
    a: 'No. We clear everything from small residential lots to multi-hundred-acre commercial parcels. Whether you have a quarter acre or three hundred acres, we have the equipment and crew to handle it.',
  },
]

const schemas = [
  serviceSchema({
    serviceType: 'Land Clearing',
    name: 'Land Clearing in DeLand & Central Florida',
    description: DESCRIPTION,
    url: PAGE_URL,
    image: OG_IMAGE,
  }),
  faqSchema(FAQS),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Site Work', url: '/services/site-work' },
    { name: 'Land Clearing', url: PAGE_URL },
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
