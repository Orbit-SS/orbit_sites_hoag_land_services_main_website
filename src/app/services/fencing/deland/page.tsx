import LocationPage from '@/components/LocationPage'
import type { LocationPageData } from '@/types/location'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fence Company DeLand FL | Hoag Land Services',
  description:
    'Trusted fence company in DeLand, FL. Wood, vinyl, and aluminum fence installation for homes and properties. 5.0 stars on Google. Call for a free estimate.',
  alternates: {
    canonical: 'https://hlsdeland.com/services/fencing/deland',
  },
  openGraph: {
    type: 'website',
    title: 'Fence Company DeLand FL | Hoag Land Services',
    description:
      'Trusted fence company in DeLand, FL. Wood, vinyl, and aluminum fence installation for homes and properties. 5.0 stars on Google. Call for a free estimate.',
    url: 'https://hlsdeland.com/services/fencing/deland',
    siteName: 'Hoag Land Services',
    locale: 'en_US',
    images: [
      {
        url: 'https://hlsdeland.com/photos/fence6.jpeg',
        width: 1200,
        height: 630,
        alt: 'Fence installation in DeLand FL by Hoag Land Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fence Company DeLand FL | Hoag Land Services',
    description:
      'Trusted fence company in DeLand, FL. Wood, vinyl, and aluminum fence installation for homes and properties. 5.0 stars on Google. Call for a free estimate.',
    images: ['https://hlsdeland.com/photos/fence6.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
  other: {
    'geo.region': 'US-FL',
    'geo.placename': 'DeLand',
    'geo.position': '29.0283;-81.3031',
    ICBM: '29.0283, -81.3031',
  },
}

const data: LocationPageData = {
  // Core SEO
  location: 'DeLand',
  state: 'Florida',
  stateAbbr: 'FL',
  zipCodes: ['32720', '32724'],
  canonicalUrl: 'https://hlsdeland.com/services/fencing/deland',
  primaryKeyword: 'fence company deland fl',
  secondaryKeywords: [
    'deland fence company',
    'fencing deland fl',
    'fence installation deland',
    'vinyl fence deland',
  ],

  // Meta
  title: 'Fence Company DeLand FL | Hoag Land Services',
  metaDescription:
    'Trusted fence company in DeLand, FL. Wood, vinyl, and aluminum fence installation for homes and properties. 5.0 stars on Google. Call for a free estimate.',
  ogImage: 'https://hlsdeland.com/photos/fence6.jpeg',

  // Hero
  heroImage: 'https://hlsdeland.com/photos/fence6.jpeg',
  h1: 'Fence Company in DeLand, FL \u2014 Built on Hard Work',
  subheadline:
    'DeLand properties range from quarter-acre lots in Victoria Park to multi-acre homesteads along the St. Johns River corridor. We build fences that fit your property, your purpose, and your budget\u2014wood, vinyl, or aluminum.',
  ctaText: 'Call for a Free Estimate',
  ctaHref: 'tel:+13865610003',

  // Service category
  serviceCategory: 'fence',
  serviceCategoryName: 'Fencing Services',

  // Services
  services: [
    {
      name: 'Wood Fencing',
      desc: 'Board fencing, privacy fencing, barbed wire, field fence, and horse fence built to handle the demands of DeLand properties. From backyard privacy enclosures near Woodland Boulevard to pasture perimeters on rural acreage, we build wood fences that last.',
      href: '/services/fencing/wood-fencing',
    },
    {
      name: 'Vinyl Fencing',
      desc: 'Privacy, picket, and ranch-style vinyl fencing that resists Florida heat, humidity, and UV without the maintenance of wood. A popular choice for DeLand homeowners in HOA communities like Victoria Hills, Victoria Oaks, and Cross Creek.',
      href: '/services/fencing/vinyl-fencing',
    },
    {
      name: 'Aluminum Fencing',
      desc: 'Durable aluminum fencing for estates, pools, and residential or commercial properties throughout DeLand. Meets Florida Building Code pool barrier requirements and provides an elegant perimeter without blocking sightlines.',
      href: '/services/fencing/aluminum-fencing',
    },
    {
      name: 'Privacy Fencing',
      desc: 'Full-height privacy fencing in wood or vinyl to screen yards, pools, and outdoor living areas on DeLand residential properties. We ensure compliance with local height requirements and the decorative-side-out ordinance.',
      href: '/services/fencing/privacy-fencing',
    },
    {
      name: 'Property Boundary Fencing',
      desc: 'Define your property lines with professionally installed boundary fencing. We handle the full scope from clearing the fence line to setting posts and finishing the installation on DeLand properties of any size.',
      href: '/services/fencing/property-boundary',
    },
    {
      name: 'Fence Replacement',
      desc: 'Storm-damaged, rotting, or leaning fences replaced with new materials and proper post setting. We remove the old fence, clear the line, and install a replacement that holds up to Central Florida weather.',
      href: '/services/fencing/fence-replacement',
    },
  ],

  // Process
  processSteps: [
    {
      title: 'Call or Send a Request',
      desc: 'Reach us by phone or through our contact form. Tell us about your property, the type of fence you are considering, and the approximate length or area you need enclosed. If you have an HOA, let us know so we can factor in any architectural requirements.',
    },
    {
      title: 'We Walk Your Property',
      desc: 'We visit your DeLand property to measure the fence line, evaluate terrain and access, identify any clearing needed, and discuss material options. You get an honest, detailed estimate\u2014no pressure and no hidden costs.',
    },
    {
      title: 'We Build Your Fence',
      desc: 'Once you approve the estimate, we schedule the installation. Our crew handles everything from clearing the fence line to setting posts and completing the build. We leave your property clean and your new fence ready to use.',
    },
  ],

  // Differentiators
  differentiators: [
    {
      title: 'Fence Line Clearing Included',
      desc: 'Unlike many fence companies, HLS is a full-service land and site work operation. If your fence line needs clearing\u2014brush, stumps, trees, or debris\u2014we handle it ourselves with our own equipment. No subcontractors, no delays, no extra coordination.',
    },
    {
      title: 'Honest Estimates, No Surprises',
      desc: 'Tyler walks every property before quoting. Your estimate reflects the actual terrain, line length, materials, and any clearing required. The number we give you is the number you pay\u2014that consistency is why we hold a 5.0 Google rating across 33 reviews.',
    },
    {
      title: 'Licensed and Insured',
      desc: 'Hoag Land Services is fully licensed, insured, and HomeAdvisor Screened and Approved. Your property, our crew, and the finished product are all covered from day one of the project through completion.',
    },
    {
      title: 'DeLand Neighborhood Knowledge',
      desc: 'We install fences throughout DeLand\u2019s 32720 and 32724 zip codes\u2014from HOA-governed communities like Victoria Hills and Victoria Park that require Architectural Review Board approval for fence style and height, to rural acreage properties off Old New York Avenue that need pasture perimeter fencing. We know what each neighborhood demands.',
    },
  ],

  // Local context (175+ words, 100% unique to fencing / DeLand)
  localContext: `<p>DeLand\u2019s residential landscape ranges from the compact historic homes surrounding Stetson University and the Garden District to the sprawling acreage properties and equestrian homesteads found west of town along the St. Johns River corridor. That variety means fencing needs in DeLand are anything but one-size-fits-all. A homeowner on West Rich Avenue may need a six-foot vinyl privacy fence that meets the city\u2019s decorative-side-out ordinance, while a property owner off Grand Avenue might need a quarter mile of wood board fencing to contain livestock on ten acres of pasture.</p>
<p>Planned communities make up a significant share of DeLand\u2019s newer housing stock. Victoria Hills, Victoria Park, Victoria Oaks, and the gated 55-plus Victoria Gardens each have Architectural Review Board requirements that dictate acceptable fence materials, heights, and styles. In most of these communities, only vinyl or aluminum fencing is permitted, and installations must be submitted for ARB approval before work begins. We are familiar with these requirements and can ensure your fence meets community standards on the first submission.</p>
<p>Under Volusia County zoning code, residential fences in DeLand may not exceed six feet in rear and side yards or four feet in front yards. There is no required setback from the property line, but fences must present the finished or decorative side facing outward toward neighbors. For properties with pools, Florida Building Code requires a barrier at least four feet high with self-closing, self-latching gates. Hoag Land Services handles fence installation across DeLand\u2019s neighborhoods\u2014from the tree-lined blocks near Howry Avenue and Michigan Avenue in the 32720 zip code to the rural parcels and horse properties scattered through 32724 south of State Road 44. Because we also perform our own fence line clearing, stump grinding, and grading, there is no need to hire a separate contractor to prepare the site before the fence goes up.</p>`,

  // FAQs
  faqs: [
    {
      q: 'Do I need a permit for a fence in DeLand, FL?',
      a: 'The City of DeLand Building Department coordinates residential fence permits. Permit requirements depend on fence height, location on the lot, and whether the property is in a flood zone. If you live in an HOA community, you will also need Architectural Review Board approval. We recommend confirming current requirements with DeLand Building Services\u2014we are happy to guide you through this.',
    },
    {
      q: 'What types of fencing does Hoag Land Services install in DeLand?',
      a: 'We install wood fencing (board, privacy, barbed wire, field fence, horse fence), vinyl fencing (privacy, picket, ranch style), and aluminum fencing (estates, pools, residential and commercial). Material choice depends on your property type, purpose, HOA requirements, and budget.',
    },
    {
      q: 'How tall can a fence be in DeLand?',
      a: 'Under Volusia County zoning, residential fences can be up to six feet in side and rear yards and four feet in front yards. The decorative or finished side must face outward toward the neighbor. Non-residential fences may be up to eight feet if they do not block vehicle visibility at access points.',
    },
    {
      q: 'How much does fence installation cost in DeLand?',
      a: 'Fence cost depends on material type, total linear footage, terrain, and whether the fence line requires clearing. A vinyl privacy fence will cost more per foot than a wood board fence, and sloped or wooded terrain adds to the scope. We provide free on-site estimates based on your specific property.',
    },
    {
      q: 'Can you clear the fence line before installing the fence?',
      a: 'Yes, and this is one of our key advantages. Hoag Land Services is a full-service site work and fencing operation. We clear brush, trees, stumps, and debris along your fence line using our own equipment, then install the fence\u2014all in one project, one crew, one estimate.',
    },
    {
      q: 'What fence material is best for DeLand HOA communities?',
      a: 'Most DeLand HOA communities, including the Victoria neighborhoods, require vinyl or aluminum fencing and prohibit wood. Specific style, color, and height requirements vary by community. We review your HOA guidelines during the estimate process so the installed fence passes ARB inspection the first time.',
    },
    {
      q: 'How long does fence installation take in DeLand?',
      a: 'A typical residential fence installation on a prepared lot takes two to five days depending on the total linear footage and material type. If fence line clearing is needed, add one to three days depending on vegetation density. We provide a complete timeline during the estimate visit.',
    },
  ],

  // Nearby locations
  nearbyLocations: [
    { name: 'Orange City', href: '/services/fencing/orange-city' },
    { name: 'Deltona', href: '/services/fencing/deltona' },
    { name: 'DeLeon Springs', href: '/services/fencing/deleon-springs' },
    { name: 'Lake Helen', href: '/services/fencing/lake-helen' },
    { name: 'Daytona Beach', href: '/services/fencing/daytona-beach' },
  ],

  // Schema
  schema: {
    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://hlsdeland.com/services/fencing/deland#business',
      name: 'Hoag Land Services',
      url: 'https://hlsdeland.com',
      logo: 'https://hlsdeland.com/photos/HLSlogo-nobackground.png',
      image: 'https://hlsdeland.com/photos/fence6.jpeg',
      description:
        'Trusted fence company in DeLand, FL. Professional installation of wood, vinyl, and aluminum fencing for residential and commercial properties, with full fence line clearing and site preparation included.',
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
        latitude: 29.0283,
        longitude: -81.3031,
      },
      areaServed: {
        '@type': 'City',
        name: 'DeLand',
        '@id': 'https://en.wikipedia.org/wiki/DeLand,_Florida',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '33',
        bestRating: '5',
        worstRating: '1',
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
          name: 'DeLand',
          item: 'https://hlsdeland.com/services/fencing/deland',
        },
      ],
    },
    faqPage: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Do I need a permit for a fence in DeLand, FL?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The City of DeLand Building Department coordinates residential fence permits. Permit requirements depend on fence height, location on the lot, and whether the property is in a flood zone. If you live in an HOA community, you will also need Architectural Review Board approval. We recommend confirming current requirements with DeLand Building Services\u2014we are happy to guide you through this.',
          },
        },
        {
          '@type': 'Question',
          name: 'What types of fencing does Hoag Land Services install in DeLand?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We install wood fencing (board, privacy, barbed wire, field fence, horse fence), vinyl fencing (privacy, picket, ranch style), and aluminum fencing (estates, pools, residential and commercial). Material choice depends on your property type, purpose, HOA requirements, and budget.',
          },
        },
        {
          '@type': 'Question',
          name: 'How tall can a fence be in DeLand?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Under Volusia County zoning, residential fences can be up to six feet in side and rear yards and four feet in front yards. The decorative or finished side must face outward toward the neighbor. Non-residential fences may be up to eight feet if they do not block vehicle visibility at access points.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does fence installation cost in DeLand?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fence cost depends on material type, total linear footage, terrain, and whether the fence line requires clearing. A vinyl privacy fence will cost more per foot than a wood board fence, and sloped or wooded terrain adds to the scope. We provide free on-site estimates based on your specific property.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you clear the fence line before installing the fence?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, and this is one of our key advantages. Hoag Land Services is a full-service site work and fencing operation. We clear brush, trees, stumps, and debris along your fence line using our own equipment, then install the fence\u2014all in one project, one crew, one estimate.',
          },
        },
        {
          '@type': 'Question',
          name: 'What fence material is best for DeLand HOA communities?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most DeLand HOA communities, including the Victoria neighborhoods, require vinyl or aluminum fencing and prohibit wood. Specific style, color, and height requirements vary by community. We review your HOA guidelines during the estimate process so the installed fence passes ARB inspection the first time.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does fence installation take in DeLand?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A typical residential fence installation on a prepared lot takes two to five days depending on the total linear footage and material type. If fence line clearing is needed, add one to three days depending on vegetation density. We provide a complete timeline during the estimate visit.',
          },
        },
      ],
    },
    webPage: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Fence Company DeLand FL | Hoag Land Services',
      description:
        'Trusted fence company in DeLand, FL. Wood, vinyl, and aluminum fence installation for homes and properties. 5.0 stars on Google. Call for a free estimate.',
      url: 'https://hlsdeland.com/services/fencing/deland',
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
        url: 'https://hlsdeland.com/photos/fence6.jpeg',
      },
      dateModified: '2026-04-10T00:00:00-04:00',
      inLanguage: 'en-US',
    },
  },
}

export default function Page() {
  return <LocationPage data={data} />
}
