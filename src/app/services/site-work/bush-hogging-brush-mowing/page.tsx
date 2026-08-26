import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/site-work/bush-hogging-brush-mowing'
const TITLE = 'Bush Hogging & Brush Mowing in DeLand, FL'
const DESCRIPTION =
  'Bush hogging and brush mowing for overgrown lots, fields, pastures, and acreage in DeLand and Central Florida. Free estimates. Licensed & insured.'
const OG_IMAGE = '/photos/site3.jpeg'

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
        alt: 'Bush hogging and brush mowing on overgrown Central Florida acreage',
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
    q: "What's the difference between bush hogging and brush mowing?",
    a: "Bush hogging is the colloquial term for cutting with a heavy rotary mower pulled behind a tractor — great for grass, weeds, and saplings up to about 2 inches. Brush mowing is the broader category and usually means heavier equipment for material a bush hog can't handle. In practice, the words get used interchangeably. We handle both ends of the spectrum and pick the equipment based on what's actually growing on your property.",
  },
  {
    q: 'How much does bush hogging cost per acre in Central Florida?',
    a: "It depends on vegetation density, terrain, access, and how long it's been since the property was last mowed. A flat pasture mowed annually costs far less per acre than five-year-overgrown acreage we have to flail-mow. We provide free on-site estimates so you get a firm number before any work starts. Most jobs are quoted as a flat rate, not by the hour.",
  },
  {
    q: 'Can you bush hog wet or low-lying fields?',
    a: "Sometimes — depends on standing water depth and soil saturation. We've worked plenty of Central Florida properties with seasonal wet spots. We assess during the site walk and either time the work for drier conditions or bring tracked equipment that can handle softer ground. We won't tear up your field for the sake of finishing on time.",
  },
  {
    q: 'How often should I have my pasture or field mowed?',
    a: 'Most working pastures benefit from at least one mowing per year — typically late summer or fall. Hayfields are different and follow the harvest schedule. Vacant lots and conservation acreage often get mowed once or twice a year to stay manageable. We can set up a recurring schedule if you want it handled without having to call every year.',
  },
  {
    q: 'Do you mow small residential lots or just acreage?',
    a: "Both. We bush hog and brush mow lots from a quarter-acre up to hundreds of acres. For very small flat lots, a regular lawn service is usually a better fit. For anything that's too rough, too tall, or too wooded for a standard mower, we're the call.",
  },
]

const schemas = [
  serviceSchema({
    serviceType: 'Brush Mowing',
    name: 'Bush Hogging & Brush Mowing Services in Central Florida',
    description: DESCRIPTION,
    url: PAGE_URL,
    image: OG_IMAGE,
  }),
  faqSchema(FAQS),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Site Work', url: '/services/site-work' },
    { name: 'Bush Hogging & Brush Mowing', url: PAGE_URL },
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
