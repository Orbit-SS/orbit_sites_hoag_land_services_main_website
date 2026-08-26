import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/fencing/fence-replacement'
const TITLE = 'Fence Replacement & Removal in DeLand, FL'
const DESCRIPTION =
  'Old, damaged, or storm-wrecked fencing replaced with quality materials in Central Florida. Removal included. Free estimates.'
const OG_IMAGE = '/photos/fence2.JPEG'

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
        alt: 'Fence replacement and removal in DeLand, FL',
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
    q: 'Should I repair my fence or replace it entirely?',
    a: 'If more than 30% of the posts are rotted, the fence is leaning significantly, or the damage is spread across the full length, replacement is almost always the better investment. Patching a failing fence usually just delays the inevitable and costs more in the long run.',
  },
  {
    q: 'How much does fence replacement cost?',
    a: 'Replacement cost depends on total linear footage, material choice (wood, vinyl, or aluminum), terrain, and whether old fence removal is needed. We provide free on-site estimates so you get a clear, honest price before any work begins.',
  },
  {
    q: 'What happens to my old fence when you replace it?',
    a: 'We handle complete removal of the old fence including posts, rails, panels, and concrete footings. All debris is hauled away as part of the project. Your property is left clean and ready for the new fence.',
  },
  {
    q: 'How long does a full fence replacement take?',
    a: 'Most residential fence replacements are completed within 2-4 days. This includes removal of the old fence, post setting, and building the new one. We provide a timeline at your site visit so you know what to expect.',
  },
  {
    q: 'Can I upgrade to a different material when replacing my fence?',
    a: 'Absolutely. Many homeowners take advantage of replacement to upgrade from wood to vinyl, or from chain link to aluminum. We\'ll walk you through all the options and help you choose the best material for your property and budget.',
  },
]

const schemas = [
  serviceSchema({
    serviceType: 'Fence Replacement',
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
    { name: 'Fence Replacement', url: PAGE_URL },
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
