import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/site-work/environmental-services'
const TITLE = 'Forestry Mulching & Environmental Services in Central FL'
const DESCRIPTION =
  'Forestry mulching, invasive tree mitigation, herbicide treatment, and wetland right-of-way access. Environmental land management in DeLand & Central Florida.'
const OG_IMAGE = '/photos/site10.JPG'

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
        alt: 'Forestry mulching and environmental services in Central Florida',
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
    q: 'What is forestry mulching and how does it work?',
    a: 'Forestry mulching uses a specialized machine with a rotating drum and carbide teeth to grind standing trees, brush, and stumps into a layer of mulch that stays on the ground. It clears land in a single pass without burning, hauling, or piling debris. The mulch layer helps prevent erosion and returns nutrients to the soil.',
  },
  {
    q: 'What invasive species do you treat in Central Florida?',
    a: 'We commonly treat Brazilian pepper, Chinese tallow, melaleuca, Australian pine, and other invasive species found in Volusia County and surrounding areas. Treatment methods include mechanical removal, cut-stump herbicide application, and basal bark treatments depending on the species and site conditions.',
  },
  {
    q: 'Are the herbicides you use safe for surrounding vegetation?',
    a: 'We use targeted application methods — cut-stump treatment and basal bark application — that deliver herbicide directly to the target species without broadcast spraying. This protects surrounding native vegetation while effectively eliminating invasive trees and plants.',
  },
  {
    q: 'Do I need permits for work near wetlands?',
    a: 'Work in or near wetlands typically requires permits from the St. Johns River Water Management District and potentially the Army Corps of Engineers. We help identify what is needed and work within all regulatory requirements to keep your project compliant.',
  },
  {
    q: 'How much does forestry mulching cost per acre?',
    a: 'Cost depends on vegetation density, tree size, terrain, and access. Light brush and small trees cost less per acre than heavy hardwood stands. We provide a firm estimate after walking the property so you know exactly what your project will cost.',
  },
]

const schemas = [
  serviceSchema({
    serviceType: 'Forestry Mulching',
    name: 'Forestry Mulching & Environmental Services in Central Florida',
    description: DESCRIPTION,
    url: PAGE_URL,
    image: OG_IMAGE,
  }),
  faqSchema(FAQS),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Site Work', url: '/services/site-work' },
    { name: 'Environmental Services', url: PAGE_URL },
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
