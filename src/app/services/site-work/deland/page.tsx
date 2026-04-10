import LocationPage from '@/components/LocationPage'
import type { LocationPageData } from '@/types/location'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Land Clearing DeLand FL | Hoag Land Services',
  description:
    'Professional land clearing and site work in DeLand, FL. Forestry mulching, stump grinding, lot clearing and grading. Licensed and insured. Free estimates.',
  alternates: {
    canonical: 'https://hlsdeland.com/services/site-work/deland',
  },
  openGraph: {
    type: 'website',
    title: 'Land Clearing DeLand FL | Hoag Land Services',
    description:
      'Professional land clearing and site work in DeLand, FL. Forestry mulching, stump grinding, lot clearing and grading. Licensed and insured. Free estimates.',
    url: 'https://hlsdeland.com/services/site-work/deland',
    siteName: 'Hoag Land Services',
    locale: 'en_US',
    images: [
      {
        url: '/photos/site7.JPG',
        width: 1200,
        height: 630,
        alt: 'Land clearing and site work in DeLand FL by Hoag Land Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Land Clearing DeLand FL | Hoag Land Services',
    description:
      'Professional land clearing and site work in DeLand, FL. Forestry mulching, stump grinding, lot clearing and grading. Licensed and insured. Free estimates.',
    images: ['/photos/site7.JPG'],
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
  canonicalUrl: 'https://hlsdeland.com/services/site-work/deland',
  primaryKeyword: 'land clearing deland fl',
  secondaryKeywords: [
    'deland forestry mulching',
    'stump grinding deland',
    'lot clearing deland',
    'land preparation deland',
  ],

  // Meta
  title: 'Land Clearing DeLand FL | Hoag Land Services',
  metaDescription:
    'Professional land clearing and site work in DeLand, FL. Forestry mulching, stump grinding, lot clearing and grading. Licensed and insured. Free estimates.',
  ogImage: '/photos/site7.JPG',

  // Hero
  heroImage: '/photos/site7.JPG',
  h1: 'Land Clearing in DeLand, FL \u2014 Built on Hard Work',
  subheadline:
    'DeLand is growing, and new construction starts with a clean site. Whether you are developing a single residential lot off Plymouth Avenue or clearing acreage west of town, we bring the equipment and experience to get your land build-ready.',
  ctaText: 'Call for a Free Estimate',
  ctaHref: 'tel:+13865610003',

  // Service category
  serviceCategory: 'site',
  serviceCategoryName: 'Site Services',

  // Services
  services: [
    {
      name: 'Land Clearing',
      desc: 'Complete vegetation removal and debris clearing for residential lots and multi-acre parcels throughout DeLand. We take properties from overgrown or wooded to clean, grade-ready surfaces for new construction or agriculture.',
      href: '/services/site-work/land-clearing',
    },
    {
      name: 'Forestry Mulching',
      desc: 'Efficient brush and undergrowth removal using mulching equipment that processes vegetation in place. Ideal for DeLand properties with dense palmetto, Brazilian pepper, or overgrown fence lines that need clearing without full excavation.',
      href: '/services/site-work/environmental-services',
    },
    {
      name: 'Earthworks & Excavation',
      desc: 'Soil removal and replacement, grading, building pads, roads, and ponds. We prepare DeLand sites for residential foundations, driveways, and drainage systems on the area\u2019s sandy upland soils.',
      href: '/services/site-work/earthworks-excavation',
    },
    {
      name: 'Drainage & Grading',
      desc: 'Proper grading and drainage solutions for DeLand properties dealing with standing water, erosion, or poor lot drainage. We create swales, install culverts, and grade surfaces to direct water away from structures.',
      href: '/services/site-work/drainage-grading',
    },
    {
      name: 'Erosion Control',
      desc: 'Installation and maintenance of silt fences, swales, and culverts to meet Volusia County stormwater requirements on active construction sites and disturbed land throughout the DeLand area.',
      href: '/services/site-work/erosion-control',
    },
    {
      name: 'Land Preparation',
      desc: 'From rough-cleared land to build-ready pads, we handle the final grading, compaction, and surface preparation that DeLand builders and homeowners need before construction begins.',
      href: '/services/site-work/land-preparation',
    },
  ],

  // Process
  processSteps: [
    {
      title: 'Call or Send a Request',
      desc: 'Reach us by phone or through our contact form. Tell us about your property\u2014the acreage, what\u2019s on it now, and what you are planning to do with it. The more detail you provide upfront, the better prepared we will be for the site visit.',
    },
    {
      title: 'We Walk Your Property',
      desc: 'We visit your DeLand property to evaluate terrain, vegetation density, access points, and any obstacles. You get an honest estimate based on what we actually see\u2014not a guess from a satellite image.',
    },
    {
      title: 'We Get the Work Done',
      desc: 'Once approved, we mobilize equipment and complete the clearing, grading, or excavation work on schedule. We leave the site clean and ready for your next phase, whether that is construction, fencing, or landscaping.',
    },
  ],

  // Differentiators
  differentiators: [
    {
      title: 'Equipment for Any Scale',
      desc: 'HLS operates the heavy equipment needed for real site work\u2014from compact track loaders for tight residential lots to forestry mulchers and excavators for multi-acre clearing jobs. We match the right machine to your project.',
    },
    {
      title: 'Honest, Walk-the-Site Estimates',
      desc: 'We do not quote land clearing from a desk. Tyler walks every property before giving a number, so your estimate reflects actual conditions\u2014vegetation density, access, soil, and obstacles. That is why we maintain a 5.0 Google rating across 33 reviews.',
    },
    {
      title: 'Licensed and Insured',
      desc: 'Hoag Land Services is fully licensed, insured, and HomeAdvisor Screened and Approved. Our coverage protects your property and our crew on every job, from a quarter-acre lot to a full-scale clearing operation.',
    },
    {
      title: 'DeLand Development Experience',
      desc: 'We work on properties across DeLand\u2019s 32720 and 32724 zip codes\u2014from wooded infill lots near downtown to larger parcels along the US-17 corridor. We understand the local soil conditions, stormwater requirements, and permitting process that DeLand projects demand.',
    },
  ],

  // Local context (175+ words, 100% unique to site work / DeLand)
  localContext: `<p>DeLand is experiencing steady residential and commercial growth that makes professional land clearing and site preparation essential for property owners throughout the city. The 152-unit townhome project advancing near the DeLand SunRail station on North Ridgewood Avenue, the proposed DeLand Tech Park south of town, and ongoing infill development in established neighborhoods all reflect a market where prepared, grade-ready land is in demand. Whether the project is a single residential lot or a multi-acre commercial pad, site work in DeLand starts with understanding the ground beneath it.</p>
<p>The DeLand series soil\u2014classified by the USDA as very deep, well-drained fine sand on broad, low sand hills\u2014drains quickly but can shift and erode without proper grading. Interior parcels around DeLand sit on sandy uplands punctuated by sinkhole-prone terrain, making accurate site evaluation critical before clearing begins. Standing water after heavy rain is common on poorly graded lots, particularly in lower-lying areas along the Spring Garden corridor and west of US-17 near the St. Johns River floodplain.</p>
<p>Volusia County requires land-clearing permits for parcels over one-half acre, and tree removal permits apply for protected species like sand live oak and Southern magnolia within unincorporated areas. The City of DeLand\u2019s Land Development Regulations, currently undergoing a comprehensive update with anticipated adoption in 2026, govern stormwater management, erosion control, and setback requirements for all site work within city limits. Hoag Land Services operates throughout DeLand\u2019s 32720 and 32724 zip codes, from residential lots off East New York Avenue to acreage properties along Old New York Avenue and the rural parcels flanking DeLeon Springs to the north. Tyler Hoag walks every property before providing an estimate, ensuring the scope, equipment, and timeline match the actual conditions on your land.</p>`,

  // FAQs
  faqs: [
    {
      q: 'How much does land clearing cost in DeLand, FL?',
      a: 'Cost depends on acreage, vegetation density, tree count, access, and what the finished site needs to look like. A half-acre residential lot with light brush will cost significantly less than a heavily wooded multi-acre parcel. We provide free on-site estimates so the price reflects your actual property conditions.',
    },
    {
      q: 'Do I need a permit for land clearing in DeLand?',
      a: 'Volusia County requires a land-clearing permit for parcels over one-half acre. Tree removal permits are also required for protected species. The City of DeLand has its own Land Development Regulations governing site disturbance within city limits. We recommend confirming current requirements with the DeLand Planning Division\u2014we are happy to guide you through this.',
    },
    {
      q: 'What is forestry mulching and when is it the right choice?',
      a: 'Forestry mulching uses a specialized machine to grind standing brush, small trees, and undergrowth into mulch in a single pass. It is ideal for clearing fence lines, removing invasive vegetation like Brazilian pepper, or managing overgrown parcels where full excavation is unnecessary. The mulch stays on site and helps with erosion control.',
    },
    {
      q: 'Can you clear land for a new home site in DeLand?',
      a: 'Yes. We regularly prepare residential lots for new construction throughout DeLand, including vegetation removal, stump grinding, rough grading, and building pad preparation. We work with homeowners and builders to deliver a clean, level surface ready for your foundation contractor.',
    },
    {
      q: 'What happens to stumps and debris after clearing?',
      a: 'We grind stumps below grade and remove or process all vegetation debris on site. Depending on the project, material may be mulched in place, hauled off, or stockpiled for your use. We leave the property clean and ready for whatever comes next.',
    },
    {
      q: 'How long does it take to clear a lot in DeLand?',
      a: 'A typical residential lot with moderate vegetation can be cleared in one to three days. Larger parcels, heavy tree cover, or sites requiring significant grading take longer. After walking your property, we provide a realistic timeline so you can coordinate with your builder or project schedule.',
    },
    {
      q: 'Do you handle stump grinding as a standalone service in DeLand?',
      a: 'Yes. We offer stump grinding independently of full clearing. Whether you have a single stump from a previously removed tree or a dozen stumps left from a past clearing job, we grind them below grade so you can reclaim the space for landscaping, construction, or fencing.',
    },
  ],

  // Nearby locations
  nearbyLocations: [
    { name: 'Orange City', href: '/services/site-work/orange-city' },
    { name: 'Deltona', href: '/services/site-work/deltona' },
    { name: 'DeLeon Springs', href: '/services/site-work/deleon-springs' },
    { name: 'Lake Helen', href: '/services/site-work/lake-helen' },
    { name: 'Daytona Beach', href: '/services/site-work/daytona-beach' },
  ],

  // Schema
  schema: {
    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://hlsdeland.com/services/site-work/deland#business',
      name: 'Hoag Land Services',
      url: 'https://hlsdeland.com',
      logo: '/photos/HLSlogo-nobackground.png',
      image: '/photos/site7.JPG',
      description:
        'Professional land clearing and site work in DeLand, FL. Forestry mulching, stump grinding, lot clearing, earthworks, excavation, grading, and erosion control for residential and commercial properties.',
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
          author: { '@type': 'Person', name: 'Andrea Cittadino' },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
          },
          reviewBody:
            "We've used Hoag Land Services multiple times over the years for land clearing and tree removal. Always reliable, always honest, and the quality of work speaks for itself.",
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
          name: 'Site Services',
          item: 'https://hlsdeland.com/services/site-work',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'DeLand',
          item: 'https://hlsdeland.com/services/site-work/deland',
        },
      ],
    },
    faqPage: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How much does land clearing cost in DeLand, FL?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cost depends on acreage, vegetation density, tree count, access, and what the finished site needs to look like. A half-acre residential lot with light brush will cost significantly less than a heavily wooded multi-acre parcel. We provide free on-site estimates so the price reflects your actual property conditions.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need a permit for land clearing in DeLand?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Volusia County requires a land-clearing permit for parcels over one-half acre. Tree removal permits are also required for protected species. The City of DeLand has its own Land Development Regulations governing site disturbance within city limits. We recommend confirming current requirements with the DeLand Planning Division\u2014we are happy to guide you through this.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is forestry mulching and when is it the right choice?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Forestry mulching uses a specialized machine to grind standing brush, small trees, and undergrowth into mulch in a single pass. It is ideal for clearing fence lines, removing invasive vegetation like Brazilian pepper, or managing overgrown parcels where full excavation is unnecessary. The mulch stays on site and helps with erosion control.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you clear land for a new home site in DeLand?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We regularly prepare residential lots for new construction throughout DeLand, including vegetation removal, stump grinding, rough grading, and building pad preparation. We work with homeowners and builders to deliver a clean, level surface ready for your foundation contractor.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens to stumps and debris after clearing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We grind stumps below grade and remove or process all vegetation debris on site. Depending on the project, material may be mulched in place, hauled off, or stockpiled for your use. We leave the property clean and ready for whatever comes next.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does it take to clear a lot in DeLand?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A typical residential lot with moderate vegetation can be cleared in one to three days. Larger parcels, heavy tree cover, or sites requiring significant grading take longer. After walking your property, we provide a realistic timeline so you can coordinate with your builder or project schedule.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you handle stump grinding as a standalone service in DeLand?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We offer stump grinding independently of full clearing. Whether you have a single stump from a previously removed tree or a dozen stumps left from a past clearing job, we grind them below grade so you can reclaim the space for landscaping, construction, or fencing.',
          },
        },
      ],
    },
    webPage: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Land Clearing DeLand FL | Hoag Land Services',
      description:
        'Professional land clearing and site work in DeLand, FL. Forestry mulching, stump grinding, lot clearing and grading. Licensed and insured. Free estimates.',
      url: 'https://hlsdeland.com/services/site-work/deland',
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
        url: '/photos/site7.JPG',
      },
      dateModified: '2026-04-10T00:00:00-04:00',
      inLanguage: 'en-US',
    },
  },
}

export default function Page() {
  return <LocationPage data={data} />
}
