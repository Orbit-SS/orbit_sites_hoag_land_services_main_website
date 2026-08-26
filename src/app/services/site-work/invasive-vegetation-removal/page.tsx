import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/site-work/invasive-vegetation-removal'
const TITLE = 'Invasive Vegetation Removal in Central Florida'
const DESCRIPTION =
  'Brazilian pepper, Chinese tallow, and other invasives choking your land — we remove them. Invasive species removal in DeLand & Central Florida.'
const OG_IMAGE = '/photos/site12.jpeg'

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
        alt: 'Invasive vegetation removal in Central Florida',
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
    q: 'What are the most common invasive species in Central Florida?',
    a: 'Brazilian pepper, Chinese tallow, Australian pine, melaleuca, cogon grass, and air potato are the most common invasives we deal with in the DeLand and Central Florida area. These species spread aggressively, choke out native vegetation, and are extremely difficult to control without professional equipment and treatment.',
  },
  {
    q: 'How much does invasive vegetation removal cost?',
    a: 'Cost depends on the species, density of infestation, acreage, and whether follow-up herbicide treatment is needed. A small residential lot with scattered Brazilian pepper costs less than a multi-acre parcel completely overrun with multiple invasive species. We assess your property and provide a firm number.',
  },
  {
    q: 'Do you use herbicide safely around water and wildlife?',
    a: 'Yes. We use EPA-approved herbicides applied by trained technicians following all label requirements and environmental regulations. We select products appropriate for the site conditions, including options safe for use near water bodies, wetlands, and areas with wildlife activity.',
  },
  {
    q: 'How do you prevent invasive species from growing back?',
    a: 'Mechanical removal alone is rarely enough. We combine forestry mulching with targeted herbicide application to kill root systems and prevent regrowth. For ongoing management, we offer follow-up treatments to catch any re-sprouts before they re-establish. The first year after removal is critical.',
  },
  {
    q: 'How long does invasive removal take?',
    a: 'Initial removal on a residential lot typically takes two to four days. Larger properties with heavy infestations can take a week or more for the mechanical phase, plus follow-up herbicide treatments over the following months. We provide a full timeline including follow-up visits during the estimate.',
  },
]

const schemas = [
  serviceSchema({
    serviceType: 'Invasive Species Removal',
    name: 'Invasive Vegetation Removal in Central Florida',
    description: DESCRIPTION,
    url: PAGE_URL,
    image: OG_IMAGE,
  }),
  faqSchema(FAQS),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Site Work', url: '/services/site-work' },
    { name: 'Invasive Vegetation Removal', url: PAGE_URL },
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
