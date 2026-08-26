import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/site-work/drainage-grading'
const TITLE = 'Drainage & Grading Solutions in Central Florida'
const DESCRIPTION =
  'Fix standing water, erosion, and uneven terrain. Professional drainage and grading services in DeLand and Central Florida.'
const OG_IMAGE = '/photos/site11.JPG'

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
        alt: 'Drainage and grading work in Central Florida',
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
    q: 'What are the signs I have a drainage problem?',
    a: 'Standing water after rain that takes more than 24 hours to drain, soggy areas in your yard, water pooling against your foundation, erosion channels forming in your soil, and musty smells near your home are all indicators. If water is going where it should not, you have a drainage problem.',
  },
  {
    q: 'How much does drainage and grading work cost?',
    a: 'Costs depend on the scope of the problem. A simple regrading of a residential yard costs less than installing a full drainage system with culverts and swales on a multi-acre property. We assess your specific situation and give you a firm number before work begins.',
  },
  {
    q: 'How long does a grading project take?',
    a: 'Most residential grading and drainage projects take two to five days depending on the size of the area and the complexity of the drainage solution. Larger commercial projects with extensive earthwork can take a week or more. We provide a clear timeline upfront.',
  },
  {
    q: 'Do I need permits for grading and drainage work?',
    a: 'Permit requirements vary by municipality and the scope of work. Projects that alter natural drainage patterns, work near wetlands, or involve significant earth-moving often require permits. We help identify what is needed and can coordinate with local authorities.',
  },
  {
    q: 'Will regrading fix my flooding problem?',
    a: 'In most cases, yes. Proper grading directs water away from structures and toward appropriate drainage points. Combined with swales, culverts, or French drains where needed, we can solve the vast majority of residential and commercial flooding issues.',
  },
]

const schemas = [
  serviceSchema({
    serviceType: 'Site Grading & Drainage',
    name: 'Drainage & Grading Solutions in Central Florida',
    description: DESCRIPTION,
    url: PAGE_URL,
    image: OG_IMAGE,
  }),
  faqSchema(FAQS),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Site Work', url: '/services/site-work' },
    { name: 'Drainage & Grading', url: PAGE_URL },
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
