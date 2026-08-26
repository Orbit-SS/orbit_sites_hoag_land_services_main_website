import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/fencing/vinyl-fencing'
const TITLE = 'Vinyl Fence Installation in DeLand, FL'
const DESCRIPTION =
  'Low-maintenance vinyl privacy, picket, and ranch-style fencing in Central Florida. Built for Florida weather. Free estimates.'
const OG_IMAGE = '/photos/fence3.jpeg'

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
        alt: 'Vinyl fence installation in DeLand, FL',
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
    q: 'How does vinyl fencing compare in cost to wood?',
    a: 'Vinyl has a higher upfront cost than wood, but the total cost of ownership is lower because vinyl requires zero painting, staining, or sealing over its lifetime. Most homeowners break even within 5-7 years compared to maintaining a wood fence.',
  },
  {
    q: 'How long does vinyl fencing last in Florida?',
    a: 'Quality vinyl fencing lasts 25-30 years or more in Florida\'s climate. Unlike wood, it won\'t rot, warp, split, or attract termites. UV inhibitors are built into the material to prevent fading and yellowing over time.',
  },
  {
    q: 'What color options are available for vinyl fencing?',
    a: 'Vinyl fencing is available in white, tan, almond, gray, and wood-grain textures. White remains the most popular choice for clean curb appeal, while tan and gray options blend well with Florida landscapes.',
  },
  {
    q: 'Can vinyl fencing withstand Florida hurricanes and high winds?',
    a: 'Vinyl fencing is engineered to flex rather than snap in high winds. With properly set posts and quality materials, vinyl fences handle Florida storm seasons well. We set all posts deep in concrete to maximize wind resistance.',
  },
  {
    q: 'What warranty comes with your vinyl fencing?',
    a: 'The vinyl material itself typically carries a manufacturer\'s limited lifetime warranty against cracking, peeling, and discoloration. We also stand behind our installation workmanship — if a post shifts or a panel comes loose, we\'ll fix it.',
  },
]

const schemas = [
  serviceSchema({
    serviceType: 'Vinyl Fencing',
    name: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    image: OG_IMAGE,
  }),
  faqSchema(FAQS),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Fencing', url: '/services/fencing' },
    { name: 'Vinyl Fencing', url: PAGE_URL },
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
