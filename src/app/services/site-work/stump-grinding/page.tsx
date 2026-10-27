import type { Metadata } from 'next'
import { SITE_URL } from '@/shared/constants'
import { serviceSchema, faqSchema, breadcrumbSchema, webPageSchema, jsonLd } from '@/lib/schema'
import PageClient from './PageClient'

const PAGE_URL = '/services/site-work/stump-grinding'
const TITLE = 'Stump Grinding & Stump Removal in DeLand, FL'
const DESCRIPTION =
  'Stump grinding and full stump removal in DeLand and Volusia County. Ground below grade so you can replant, resod, or build. Free estimates. Licensed & insured.'
const OG_IMAGE = '/photos/site9.JPG'

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
        alt: 'Stump grinding on a Central Florida property by Hoag Land Services',
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
    q: 'What is the difference between stump grinding and stump removal?',
    a: 'Grinding chews the stump down below ground level with a cutting wheel and leaves the root ball in place to rot. Removal pulls the whole stump and the major roots out with an excavator, which leaves a much bigger hole but a genuinely clear footprint. Grinding is right for a lawn or a flower bed. Removal is right where something is going to be built, paved, or trenched through.',
  },
  {
    q: 'How deep do you grind a stump?',
    a: 'Six to twelve inches below grade for most residential work, which is enough to lay sod or plant over the top. If you are putting in a new tree in the same spot we go deeper and pull more of the root plate, because a new root system will not establish through old wood.',
  },
  {
    q: 'How much does stump grinding cost in Volusia County?',
    a: 'It comes down to diameter, how many you have, and whether the machine can reach them. One stump in an open front yard is a quick job. Six stumps behind a fence with a narrow gate takes longer and needs smaller equipment. We quote a firm price after a look, not an hourly rate that moves on you.',
  },
  {
    q: 'Can you get a grinder into my back yard?',
    a: 'Usually. We run machines that fit through a standard gate and track across grass without tearing it apart. If access is genuinely too tight we will tell you that on the site walk and talk through the alternatives rather than turning up and failing.',
  },
  {
    q: 'What happens to the grindings?',
    a: 'You can keep them. The chips and soil make a good mulch and most people want them spread back over the hole or used on a bed. If you would rather they went, we haul them off and backfill with clean fill so the ground is level and ready to seed.',
  },
  {
    q: 'Do you grind stumps you did not remove the tree from?',
    a: 'Yes. Plenty of our stump work is on trees someone else took down, or on stumps that have been sitting for years. An old weathered stump often grinds easier than a fresh one.',
  },
  {
    q: 'Will the roots keep growing after grinding?',
    a: 'No. Once the stump is ground below grade the tree cannot photosynthesize and the remaining roots die off and break down over the next few seasons. A few species throw suckers from the root line for a while, and we will tell you if yours is one of them.',
  },
]

const schemas = [
  serviceSchema({
    serviceType: 'Stump Grinding',
    name: 'Stump Grinding & Stump Removal in Central Florida',
    description: DESCRIPTION,
    url: PAGE_URL,
    image: OG_IMAGE,
  }),
  faqSchema(FAQS),
  breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: 'Site Work', url: '/services/site-work' },
    { name: 'Stump Grinding', url: PAGE_URL },
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
