import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/site-work/earthworks-excavation'
const TITLE = 'Earthworks & Excavation Services in Central Florida'
const DESCRIPTION =
  'Soil removal, grading, building pads, roads, ponds, and right-of-ways. Professional excavation and earthworks in DeLand & Central Florida.'
const OG_IMAGE = '/photos/site4.jpeg'

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
        alt: 'Earthworks and excavation in Central Florida',
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
    q: 'How much does excavation and grading cost?',
    a: 'Pricing depends on soil conditions, volume of material being moved, site access, and project scope. A small building pad on a cleared lot costs less than grading a multi-acre commercial site. We provide detailed estimates after a site survey so there are no surprises.',
  },
  {
    q: 'How long does a typical earthworks project take?',
    a: 'Simple grading or a residential building pad can be completed in one to three days. Larger projects involving road construction, pond excavation, or extensive soil replacement can take one to several weeks. We provide a timeline during the planning phase.',
  },
  {
    q: 'What soil types can you work with in Central Florida?',
    a: 'We work with all soil conditions found in Central Florida including sandy soil, clay, muck, and fill dirt. Our equipment handles everything from soft wetland-adjacent soils to compacted hardpan. We assess soil conditions during the survey and plan accordingly.',
  },
  {
    q: 'Do I need permits for excavation work?',
    a: 'Most excavation and grading projects in Volusia County require permits, especially those involving stormwater management, fill material, or work near wetlands. We help identify what is needed and coordinate with local permitting authorities.',
  },
  {
    q: 'What equipment do you use for earthworks?',
    a: 'We operate excavators, track loaders, bulldozers, dump trucks, and compaction equipment. The specific equipment depends on the project. We always bring the right machines for the soil type and scope of work.',
  },
]

const schemas = [
  serviceSchema({
    serviceType: 'Excavation',
    name: 'Earthworks & Excavation in Central Florida',
    description: DESCRIPTION,
    url: PAGE_URL,
    image: OG_IMAGE,
  }),
  faqSchema(FAQS),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Site Work', url: '/services/site-work' },
    { name: 'Earthworks & Excavation', url: PAGE_URL },
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
