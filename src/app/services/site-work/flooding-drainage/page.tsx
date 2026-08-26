import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/site-work/flooding-drainage'
const TITLE = 'Flooding & Drainage Solutions in Central Florida'
const DESCRIPTION =
  'Drainage and flooding solutions in DeLand and Central Florida — swales, French drains, culverts, regrading. Stop water damage and standing water on your property.'
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
        alt: 'Drainage and flooding solutions on a Central Florida property',
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
    q: "Why is my yard flooding even when I have gutters?",
    a: "Gutters move water off your roof — they don't fix the slope, soil, or low spots in your yard. If water is pooling around your foundation, eroding your driveway, or sitting on the lawn for days, the problem is in how your property handles the water once it hits the ground. That's drainage work, not a gutter issue. We walk the property, find the source, and fix it.",
  },
  {
    q: "How much do drainage solutions cost in Central Florida?",
    a: "It depends on the scope. A simple swale to redirect runoff is a one-day job. Multiple French drains, regrading a yard, and installing a culvert is a different conversation. We give honest, no-pressure estimates after walking your property so you know exactly what the fix costs before any work begins.",
  },
  {
    q: "Will a French drain solve my flooding problem?",
    a: "Sometimes — and sometimes you need more than that. A French drain handles chronic soggy spots and subsurface water. Surface flooding from heavy rain often needs swales, regrading, or larger drainage systems. We don't sell you a French drain if the problem is bigger than that. We tell you what'll actually work.",
  },
  {
    q: "Do I need a permit for drainage work on my property?",
    a: "Depends on the scope and location. Residential swales and basic regrading usually don't require permits. Larger culvert installations, work near wetlands, or anything tying into county drainage systems often does. We know the local rules and handle the paperwork when permits are needed — no surprises mid-project.",
  },
  {
    q: "Can you fix damage that's already happened from flooding?",
    a: "Yes. We regrade washed-out areas, rebuild driveways the storms ate, repair erosion damage, and install drainage so the same thing doesn't happen next storm. We don't do interior water damage restoration — that's a different trade — but anything from the foundation out, we handle.",
  },
  {
    q: "How fast can you get out for storm-related flooding?",
    a: "Hurricane and major storm work is first-come, first-served in Central Florida — every drainage and site-work company gets slammed at the same time. Call as soon as you see the problem. We prioritize emergencies where water is actively threatening structures and work through the queue from there.",
  },
]

const schemas = [
  serviceSchema({
    serviceType: 'Drainage and Flood Mitigation',
    name: 'Flooding & Drainage Solutions in Central Florida',
    description: DESCRIPTION,
    url: PAGE_URL,
    image: OG_IMAGE,
  }),
  faqSchema(FAQS),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Site Work', url: '/services/site-work' },
    { name: 'Flooding & Drainage', url: PAGE_URL },
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
