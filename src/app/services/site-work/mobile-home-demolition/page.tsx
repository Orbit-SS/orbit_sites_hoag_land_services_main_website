import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/site-work/mobile-home-demolition'
const TITLE = 'Mobile Home Demolition & Removal in DeLand, FL'
const DESCRIPTION =
  'Mobile home demolition, teardown and haul off in DeLand and Volusia County. Single wides, double wides, park lots and multi-unit clearouts. Free estimates.'
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
        alt: 'Mobile home demolition and haul off by Hoag Land Services',
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
    q: 'How much does it cost to demolish a mobile home in Volusia County?',
    a: 'The drivers are size, what is still inside it, and how far the trucks have to travel to the landfill. A stripped single wide on an open lot is straightforward. A double wide full of contents, with a carport, a deck and a skirting wall, is a bigger job. We walk it and give you a flat price with the disposal included, so there is no second invoice after the dumpster is weighed.',
  },
  {
    q: 'Do I need a permit to demolish a mobile home?',
    a: 'In most of Volusia County yes, and the utility disconnects have to be signed off before anything comes down. We handle the demolition permit and coordinate the power, water and gas disconnects as part of the job. If the unit is in a park, the park owner usually has their own requirements on top and we work to those too.',
  },
  {
    q: 'Can you take out several units in a park at once?',
    a: 'Yes, and it is usually cheaper per unit that way. Mobilizing the machine and the trucks once across six lots costs far less than six separate trips. If you are clearing or repositioning a park, talk to us about the whole scope rather than one lot at a time.',
  },
  {
    q: 'What happens to the pad, the piers and the tie-downs?',
    a: 'They come out unless you tell us to leave them. Piers, anchors, skirting footers and the old pad all get removed and hauled, and we grade the lot flat behind us. If you are setting a new unit on the same spot we can leave the pad and work around it.',
  },
  {
    q: 'Do you handle the contents, or does it need to be empty first?',
    a: 'We can take it as it stands. Most of the units we are called to still have furniture, appliances and personal effects in them. It affects the price because it affects the disposal weight, so tell us what is in there and we will price it properly rather than guessing.',
  },
  {
    q: 'What about asbestos or other regulated material?',
    a: 'Older units can contain regulated material, and Florida requires a survey before demolition on many of them. We will tell you straight if your unit is in the age band where that applies, and we will not start a teardown that needs a survey until the survey is done.',
  },
  {
    q: 'How long does a mobile home demolition take?',
    a: 'A single unit with clear access is normally a one-day job including haul off. Multiple units, restricted access, or a lot that needs grading and fill afterwards runs longer, and we give you the schedule up front.',
  },
]

const schemas = [
  serviceSchema({
    serviceType: 'Demolition',
    name: 'Mobile Home Demolition & Removal in Central Florida',
    description: DESCRIPTION,
    url: PAGE_URL,
    image: OG_IMAGE,
  }),
  faqSchema(FAQS),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Site Work', url: '/services/site-work' },
    { name: 'Mobile Home Demolition', url: PAGE_URL },
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
