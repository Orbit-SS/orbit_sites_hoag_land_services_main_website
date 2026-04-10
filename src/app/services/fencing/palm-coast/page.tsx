import LocationPage from '@/components/LocationPage'
import type { LocationPageData } from '@/types/location'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fence Company Palm Coast FL | Hoag Land Services',
  description:
    'Top-rated fence company in Palm Coast, FL. Wood, vinyl & aluminum fencing installed by a licensed, insured team. 5.0 stars. Free on-site estimates.',
  alternates: { canonical: 'https://hlsdeland.com/services/fencing/palm-coast' },
  openGraph: {
    type: 'website',
    title: 'Fence Company Palm Coast FL | Hoag Land Services',
    description:
      'Top-rated fence company in Palm Coast, FL. Wood, vinyl & aluminum fencing installed by a licensed, insured team. 5.0 stars. Free on-site estimates.',
    url: 'https://hlsdeland.com/services/fencing/palm-coast',
    siteName: 'Hoag Land Services',
    locale: 'en_US',
    images: [{ url: 'https://hlsdeland.com/photos/fence5.jpeg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fence Company Palm Coast FL | Hoag Land Services',
    description:
      'Top-rated fence company in Palm Coast, FL. Wood, vinyl & aluminum fencing installed by a licensed, insured team. 5.0 stars. Free on-site estimates.',
    images: ['https://hlsdeland.com/photos/fence5.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1 as unknown as undefined,
    'max-image-preview': 'large' as unknown as undefined,
    'max-video-preview': -1 as unknown as undefined,
  },
  other: {
    'geo.region': 'US-FL',
    'geo.placename': 'Palm Coast',
    'geo.position': '29.5846;-81.2079',
    ICBM: '29.5846, -81.2079',
  },
}

const faqItems = [
  {
    q: 'What types of fencing does Hoag Land Services install in Palm Coast?',
    a: 'We install wood fencing including privacy, board, and horse fence styles, vinyl fencing in privacy, picket, and ranch configurations, and aluminum fencing suited for estates, pools, and residential communities. Every installation is built to withstand Flagler County coastal weather conditions.',
  },
  {
    q: 'Do I need a permit to build a fence in Palm Coast, FL?',
    a: 'Palm Coast does not require a permit for fence installation, but the city does require a signed acknowledgement of Land Development Code regulations before work begins. The Zoning Division at 386-986-3751 can clarify setback and height rules for your specific lot. We handle this paperwork as part of our process.',
  },
  {
    q: 'What are the fence height limits in Palm Coast?',
    a: 'In Palm Coast, fences in interior side or rear yards behind the front building facade can be up to six feet. Properties within 20 feet of a saltwater canal are limited to four feet for solid fences, though open-style fences may reach six feet. We verify the rules for your specific lot before installation.',
  },
  {
    q: 'How long does a typical fence installation take?',
    a: 'Most residential fence installations in Palm Coast take one to three days depending on the property size, fence type, and terrain. Larger properties or fence-line clearing projects may take longer. We provide a clear timeline during your on-site estimate so there are no surprises.',
  },
  {
    q: 'Can Hoag Land Services clear my fence line before installation?',
    a: 'Absolutely. Unlike most fence companies, we offer full fence-line clearing as part of our services. Whether your Palm Coast property has thick brush, overgrown vegetation, or trees along the fence line, we clear and prepare the path before setting a single post.',
  },
  {
    q: 'How much does fence installation cost in Palm Coast?',
    a: 'Fence pricing depends on the material, linear footage, terrain, and whether fence-line clearing is needed. We provide free on-site estimates so you get an honest, accurate price based on your actual property. No hidden costs and no pressure.',
  },
  {
    q: 'What fence material works best for Palm Coast properties near saltwater canals?',
    a: 'Aluminum and vinyl fencing perform best near Palm Coast saltwater canals because they resist corrosion and do not rot. We help you choose the right material based on your property location, HOA requirements, and whether your lot borders a canal or the Intracoastal Waterway.',
  },
]

const data: LocationPageData = {
  location: 'Palm Coast',
  state: 'Florida',
  stateAbbr: 'FL',
  zipCodes: ['32137', '32164'],
  canonicalUrl: 'https://hlsdeland.com/services/fencing/palm-coast',
  primaryKeyword: 'fence company palm coast fl',
  secondaryKeywords: [
    'fence companies palm coast',
    'fencing palm coast fl',
    'palm coast fence company',
    'fence installation palm coast',
    'palm coast fencing',
    'fence companies palm coast fl',
  ],

  title: 'Fence Company Palm Coast FL | Hoag Land Services',
  metaDescription:
    'Top-rated fence company in Palm Coast, FL. Wood, vinyl & aluminum fencing installed by a licensed, insured team. 5.0 stars. Free on-site estimates.',
  ogImage: 'https://hlsdeland.com/photos/fence5.jpeg',

  heroImage: 'https://hlsdeland.com/photos/fence5.jpeg',
  h1: 'Fence Company in Palm Coast, FL \u2014 Built on Hard Work',
  subheadline:
    'From Belle Terre subdivisions to canal-front properties along the F and C Sections, Palm Coast homeowners count on Hoag Land Services for fencing that stands up to Flagler County weather. Licensed, insured, and ready to walk your property.',
  ctaText: 'Call for a Free Estimate',
  ctaHref: 'tel:+13865610003',

  serviceCategory: 'fence',
  serviceCategoryName: 'Fencing Services',

  services: [
    {
      name: 'Wood Fencing',
      desc: 'Board, privacy, barbed wire, and horse fence for Palm Coast residential lots, acreage, and equestrian properties. Built to endure the coastal humidity and seasonal storms common in Flagler County.',
      href: '/services/fencing/wood-fencing',
    },
    {
      name: 'Vinyl Fencing',
      desc: 'Privacy, picket, and ranch-style vinyl fencing ideal for Palm Coast HOA communities like Grand Landings and Pine Lakes. Low maintenance, corrosion-resistant, and rated for high winds.',
      href: '/services/fencing/vinyl-fencing',
    },
    {
      name: 'Aluminum Fencing',
      desc: 'Aluminum fencing for Palm Coast estates, pool enclosures, and residential communities. Rust-resistant and designed for properties near the saltwater canal system and Intracoastal Waterway.',
      href: '/services/fencing/aluminum-fencing',
    },
    {
      name: 'Privacy Fencing',
      desc: 'Full privacy fencing solutions for Palm Coast properties where screening from neighbors and road noise matters. We match the right material and height to your lot and any applicable Land Development Code rules.',
      href: '/services/fencing/privacy-fencing',
    },
    {
      name: 'Fence Replacement',
      desc: 'Replace damaged, rotting, or storm-damaged fencing throughout Palm Coast. We remove the old fence, clear the line, and install your new fence in one efficient project.',
      href: '/services/fencing/fence-replacement',
    },
    {
      name: 'Property Boundary Fencing',
      desc: 'Define your Palm Coast property lines with durable boundary fencing. We work with your survey to place posts precisely on the line, avoiding encroachment issues common on the city\'s pre-platted lots.',
      href: '/services/fencing/property-boundary',
    },
  ],

  processSteps: [
    {
      title: 'Call or Submit a Request',
      desc: 'Reach out by phone or through our contact form and describe your Palm Coast property, the type of fencing you need, and any concerns like canal setbacks or HOA requirements. We listen first.',
    },
    {
      title: 'On-Site Property Walk',
      desc: 'We visit your property, walk the fence line, assess the terrain and any clearing needed, and provide an honest, no-surprise estimate. You will know exactly what the project involves and what it costs.',
    },
    {
      title: 'Schedule and Complete',
      desc: 'Once you approve, we schedule your installation and complete the work efficiently. Your fence is built right the first time, and we leave the site clean when we are done.',
    },
  ],

  differentiators: [
    {
      title: 'Full Fence-Line Clearing',
      desc: 'Most fence companies show up and stop if the line is not clear. We own the equipment to clear brush, trees, and vegetation along your entire fence line before installation begins. One crew, one call, one project.',
    },
    {
      title: 'ISA Certified Arborist',
      desc: 'Owner Tyler Hoag holds ISA Certification FL-9491A. When tree roots, canopy, or protected trees are near your fence line, you get expert guidance on how to build without damaging trees or violating Palm Coast tree ordinances.',
    },
    {
      title: 'Licensed, Insured & Screened',
      desc: 'Hoag Land Services is fully licensed and insured with HomeAdvisor Screened & Approved status. We carry liability insurance and maintain the credentials Flagler County homeowners should expect from their fence contractor.',
    },
    {
      title: 'Palm Coast Canal-Zone Experience',
      desc: 'Many Palm Coast lots border the city\'s 79-mile saltwater canal system. We understand the four-foot and six-foot height restrictions near waterways, the setback requirements, and which materials resist saltwater corrosion in the F, C, and Palm Harbor Sections.',
    },
  ],

  localContext: `<p>Palm Coast is one of Florida\'s largest master-planned communities, originally developed by ITT Community Development Corporation beginning in 1969 across roughly 42,000 acres in Flagler County. The city was incorporated in 1999 and has grown into a community of over 100,000 residents spread across distinctive lettered sections. Neighborhoods like Palm Harbor in the F and C Sections east of I-95 feature saltwater canal-front homes with direct access to the Intracoastal Waterway, while the P Section around Belle Terre Parkway and the W Section in Pine Lakes are characterized by tree-lined residential streets on larger lots.</p>

<p>For a fence company serving Palm Coast, understanding the city\'s Land Development Code is essential. Fences cannot extend past the front facade of the home, and properties within 20 feet of a saltwater waterway are subject to reduced height limits. Lots in communities like Seminole Woods, Cypress Knoll, and Grand Landings often have HOA covenants that dictate material, color, and style. Many of the pre-platted lots in Palm Coast sat undeveloped for decades, and vegetation along intended fence lines is often thick palmetto scrub, slash pine, and Brazilian pepper that requires clearing before a post can be set.</p>

<p>Flagler County\'s coastal exposure means fencing in Palm Coast must withstand hurricane-force winds. Hurricanes Milton and Helene in 2024 both brought damaging gusts to the area, and fence replacement demand spikes after every major storm. Hoag Land Services provides Palm Coast homeowners with fence installation, fence-line clearing, and storm damage replacement backed by real credentials and honest pricing. Contact us at (386) 561-0003 for a free on-site estimate anywhere in zip codes 32137 and 32164.</p>`,

  faqs: faqItems,

  nearbyLocations: [
    { name: 'DeLand', href: '/services/fencing/deland' },
    { name: 'Daytona Beach', href: '/services/fencing/daytona-beach' },
    { name: 'Bunnell', href: '/services/fencing/bunnell' },
    { name: 'Ormond Beach', href: '/services/fencing/ormond-beach' },
  ],

  schema: {
    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'FenceContractor',
      name: 'Hoag Land Services',
      url: 'https://hlsdeland.com',
      logo: 'https://hlsdeland.com/photos/HLSlogo-nobackground.png',
      image: 'https://hlsdeland.com/photos/fence5.jpeg',
      description:
        'Hoag Land Services is a top-rated fence company in Palm Coast, FL offering wood, vinyl, and aluminum fence installation with full fence-line clearing for residential and commercial properties in Flagler County.',
      telephone: '+1-386-561-0003',
      email: 'tyler@hlsdeland.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'DeLeon Springs',
        addressRegion: 'FL',
        postalCode: '32130',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 29.5846,
        longitude: -81.2079,
      },
      areaServed: {
        '@type': 'City',
        name: 'Palm Coast',
        sameAs: 'https://en.wikipedia.org/wiki/Palm_Coast,_Florida',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '33',
        bestRating: '5',
      },
      review: [
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Sarah Meeks' },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
          },
          reviewBody:
            'HLS cleared our 2.5-acre fence line and installed beautiful fencing. They were punctual, professional, and there were no unexpected costs. The finished product exceeded our expectations.',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Juliene Kaidor' },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
          },
          reviewBody:
            'Tyler is a certified arborist and his knowledge shows in every aspect of their work. From tree trimming and large tree removal to complete land clearing, his team is thorough and professional.',
        },
      ],
      sameAs: [
        'https://facebook.com/hoaglandservices',
        'https://instagram.com/hls_deland',
      ],
      priceRange: '$$',
      foundingDate: '2017',
      slogan: 'Built on Hard Work',
    },
    breadcrumbs: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://hlsdeland.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Fencing Services',
          item: 'https://hlsdeland.com/services/fencing',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Palm Coast',
          item: 'https://hlsdeland.com/services/fencing/palm-coast',
        },
      ],
    },
    faqPage: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    },
    webPage: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Fence Company Palm Coast FL | Hoag Land Services',
      description:
        'Top-rated fence company in Palm Coast, FL. Wood, vinyl & aluminum fencing installed by a licensed, insured team. 5.0 stars. Free on-site estimates.',
      url: 'https://hlsdeland.com/services/fencing/palm-coast',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Hoag Land Services',
        url: 'https://hlsdeland.com',
      },
      about: {
        '@type': 'LocalBusiness',
        name: 'Hoag Land Services',
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://hlsdeland.com/photos/fence5.jpeg',
      },
      dateModified: '2026-04-10T00:00:00-04:00',
      inLanguage: 'en-US',
    },
  },
}

export default function PalmCoastFencingPage() {
  return <LocationPage data={data} />
}
