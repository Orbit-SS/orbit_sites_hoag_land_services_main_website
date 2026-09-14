import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

// Built 2026-09-14. "deland forestry mulching" was earning ~120 impressions a
// quarter with no page to land on — Search Console sent it to the site-work
// parent at position 22. This URL returned "unknown to Google" on inspection.
const PAGE_URL = '/services/site-work/forestry-mulching'
const TITLE = 'Forestry Mulching in DeLand, FL | Hoag Land Services'
const DESCRIPTION =
  'Forestry mulching in DeLand and Central Florida: brush, palmetto and small trees ground in place, no burning or hauling. Free on-site estimates. Licensed & insured.'
const OG_IMAGE = '/photos/hoag/land-clearing-lake-shore-deland-fl.jpeg'

export const metadata: Metadata = {
  title: { absolute: TITLE },
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
        alt: 'Forestry mulching on a wooded DeLand, FL parcel by Hoag Land Services',
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
    q: 'What is forestry mulching, and how is it different from land clearing?',
    a: 'Forestry mulching grinds standing brush, palmetto and small trees into a layer of mulch that stays on the ground. Nothing is piled, burned or hauled away. Traditional land clearing pushes vegetation into piles and removes it, usually along with the root mat and topsoil. Mulching is faster, cheaper per acre, and leaves the soil in place — which is why it is the first choice for thinning, trails, fence lines and lots that do not need to be scraped to dirt.',
  },
  {
    q: 'How much does forestry mulching cost per acre in Central Florida?',
    a: 'It depends on how dense the growth is, the size of the trees in it, and how easy the property is to reach. Light palmetto and brush runs far cheaper per acre than a lot full of 8-inch oaks. We walk every property before quoting and give a firm number, not an hourly rate. Because there is no hauling or dump fees, mulching usually comes in well under a full clear.',
  },
  {
    q: 'What size trees can a forestry mulcher handle?',
    a: 'Our drum mulcher takes brush, palmetto, saplings and trees up to roughly 8 inches in diameter in a single pass. Larger trees are cut first and the stumps ground, or we bring in the excavator if the job is really a land-clearing job. We tell you which one you have during the site walk.',
  },
  {
    q: 'Does forestry mulching remove the stumps?',
    a: 'It grinds them down to or slightly below grade, but it does not pull the root ball. For most uses — pasture, trails, fire breaks, a cleaner lot — that is exactly what you want, because the roots hold the soil. If you are building on the spot, we grub the stumps out as part of land preparation instead.',
  },
  {
    q: 'Is forestry mulching allowed near wetlands and conservation areas in Volusia County?',
    a: 'Often it is the preferred method, because it does not disturb the soil or require burning. Wetland buffers, environmental easements and protected tree species still apply, and some parcels need a permit or a survey before any clearing. We have worked plenty of properties near the St. Johns and Lake Woodruff, and we will tell you up front if your lot needs paperwork before the machine shows up.',
  },
  {
    q: 'How long does the mulch layer last, and will the brush grow back?',
    a: 'The mulch breaks down over one to three seasons and feeds the soil while it does. Palmetto and some scrub will try to come back from the roots; a follow-up pass a year later, or a bush-hogging schedule, keeps it down. We can set that up so you are not calling every year.',
  },
]

const schemas = [
  serviceSchema({
    serviceType: 'Forestry Mulching',
    name: 'Forestry Mulching Services in DeLand and Central Florida',
    description: DESCRIPTION,
    url: PAGE_URL,
    image: OG_IMAGE,
  }),
  faqSchema(FAQS),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Site Work', url: '/services/site-work' },
    { name: 'Forestry Mulching', url: PAGE_URL },
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
