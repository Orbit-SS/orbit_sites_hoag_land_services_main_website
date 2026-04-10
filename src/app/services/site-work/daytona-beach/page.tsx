import LocationPage from '@/components/LocationPage'
import type { LocationPageData } from '@/types/location'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Land Clearing Daytona Beach FL | Hoag Land Services',
  description:
    'Professional land clearing and site work in Daytona Beach, FL. Lot clearing, forestry mulching, grading, and excavation. Licensed, insured, and 5.0-star rated.',
  alternates: {
    canonical: 'https://hlsdeland.com/services/site-work/daytona-beach',
  },
  openGraph: {
    type: 'website',
    title: 'Land Clearing Daytona Beach FL | Hoag Land Services',
    description:
      'Professional land clearing and site work in Daytona Beach, FL. Lot clearing, forestry mulching, grading, and excavation. Licensed, insured, and 5.0-star rated.',
    url: 'https://hlsdeland.com/services/site-work/daytona-beach',
    siteName: 'Hoag Land Services',
    locale: 'en_US',
    images: [
      {
        url: '/photos/site10.JPG',
        width: 1200,
        height: 630,
        alt: 'Land clearing and site work in Daytona Beach FL by Hoag Land Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Land Clearing Daytona Beach FL | Hoag Land Services',
    description:
      'Professional land clearing and site work in Daytona Beach, FL. Lot clearing, forestry mulching, grading, and excavation. Licensed, insured, and 5.0-star rated.',
    images: ['/photos/site10.JPG'],
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
    'geo.placename': 'Daytona Beach',
    'geo.position': '29.2108;-81.0228',
    ICBM: '29.2108, -81.0228',
  },
}

const data: LocationPageData = {
  // Core SEO
  location: 'Daytona Beach',
  state: 'Florida',
  stateAbbr: 'FL',
  zipCodes: ['32114', '32117', '32118', '32119', '32124'],
  canonicalUrl: 'https://hlsdeland.com/services/site-work/daytona-beach',
  primaryKeyword: 'land clearing daytona beach',
  secondaryKeywords: [
    'lot clearing daytona beach',
    'forestry mulching daytona beach',
  ],

  // Meta
  title: 'Land Clearing Daytona Beach FL | Hoag Land Services',
  metaDescription:
    'Professional land clearing and site work in Daytona Beach, FL. Lot clearing, forestry mulching, grading, and excavation. Licensed, insured, and 5.0-star rated.',
  ogImage: '/photos/site10.JPG',

  // Hero
  heroImage: '/photos/site10.JPG',
  h1: 'Land Clearing in Daytona Beach, FL \u2014 From Single Lots to Hundreds of Acres',
  subheadline:
    'Whether you are preparing a vacant lot off International Speedway Boulevard for new construction or clearing overgrown acreage in western Daytona Beach near I-95, we bring the equipment and experience to get your site ready. Straightforward pricing, no hidden costs.',
  ctaText: 'Call for a Free Estimate',
  ctaHref: 'tel:+13865610003',

  // Service category
  serviceCategory: 'site',
  serviceCategoryName: 'Site Services',

  // Services
  services: [
    {
      name: 'Land Clearing',
      desc: 'Complete clearing of residential lots and large acreage throughout Daytona Beach. We remove trees, brush, stumps, and debris to deliver a clean, buildable site ready for your next step.',
      href: '/services/site-work/land-clearing',
    },
    {
      name: 'Earthworks & Excavation',
      desc: 'Soil removal and replacement, grading, building pads, roads, and ponds. We handle the heavy dirt work that Daytona Beach development projects require, from small residential pads to commercial sites.',
      href: '/services/site-work/earthworks-excavation',
    },
    {
      name: 'Erosion Control',
      desc: 'Installation and maintenance of silt fences, swales, and culverts. Daytona Beach properties near the Halifax River and coastal zones need proper erosion management to meet Volusia County stormwater requirements.',
      href: '/services/site-work/erosion-control',
    },
    {
      name: 'Environmental Services',
      desc: 'Forestry mulching, invasive tree mitigation, and herbicide treatments for Daytona Beach properties dealing with Brazilian pepper, Australian pine, and other invasive vegetation choking out native growth.',
      href: '/services/site-work/environmental-services',
    },
    {
      name: 'Drainage & Grading',
      desc: 'Proper grading and drainage solutions for Daytona Beach lots where standing water and poor drainage threaten foundations, driveways, and landscaping. We correct grade issues and install effective drainage systems.',
      href: '/services/site-work/drainage-grading',
    },
    {
      name: 'Land Preparation',
      desc: 'Full site preparation for new construction, including clearing, grubbing, grading, and compaction. We get your Daytona Beach building site ready for the foundation crew.',
      href: '/services/site-work/land-preparation',
    },
  ],

  // How it works
  processSteps: [
    {
      title: 'Call or Send a Request',
      desc: 'Contact us by phone or through our form with details about your property \u2014 the lot size, what is currently on it, and what you need done. This helps us plan the right equipment for your job.',
    },
    {
      title: 'On-Site Walk & Estimate',
      desc: 'We visit your Daytona Beach property, walk the entire site, assess the terrain and vegetation, and give you an honest estimate. No surprises \u2014 the price we quote is the price you pay.',
    },
    {
      title: 'Scheduled & Completed',
      desc: 'We schedule your project, mobilize the right equipment, and get the work done efficiently. When we leave, your site is cleared, graded, and ready for its next purpose.',
    },
  ],

  // Differentiators
  differentiators: [
    {
      title: 'Equipment for Any Scale',
      desc: 'From compact track loaders for tight residential lots to heavy forestry mulchers for multi-acre parcels, we bring the right machines for the job. No subcontracting \u2014 our crew operates our own equipment.',
    },
    {
      title: 'Honest, Fixed Pricing',
      desc: 'We walk your property, assess the scope, and give you a clear price before work begins. There are no hourly surprises and no change orders unless you ask for additional work.',
    },
    {
      title: 'Licensed & Fully Insured',
      desc: 'Hoag Land Services is licensed and insured with HomeAdvisor Screened & Approved status. Our 5.0-star Google rating reflects the consistent quality our clients have experienced since 2017.',
    },
    {
      title: 'Western Daytona Beach Access',
      desc: 'Based in DeLeon Springs, we have direct access to western Daytona Beach via US-92 and I-4 to I-95. Properties along LPGA Boulevard, the International Speedway corridor, and the growing communities near Mosaic and Halifax Plantation are well within our regular service area.',
    },
  ],

  // Local context (175+ words, unique to site work)
  localContext: `<p>Daytona Beach has experienced steady residential and commercial growth over the past several years, and much of that development depends on professional land clearing and site preparation. The western portion of the city along LPGA Boulevard and the I-95 corridor has seen the most construction activity, with new subdivisions like Mosaic and continued expansion around LPGA International and Halifax Plantation drawing families and retirees to the area. These developments often begin with overgrown parcels thick with palmetto, slash pine, and scrub oak that need full clearing, grubbing, and grading before any foundation work can start.</p>

<p>Closer to downtown and the International Speedway Boulevard corridor, older commercial properties and infill lots present a different kind of site work. Tear-down sites need debris removal, existing slabs may require excavation, and decades of neglected vegetation can hide buried utilities and drainage structures. The sandy soils common throughout Daytona Beach drain well in most areas but can shift without proper compaction, making grade work and building pad preparation critical steps that should not be rushed.</p>

<p>Volusia County requires land clearing permits for parcels over half an acre, and the city of Daytona Beach has additional permitting through its Planning Department on South Ridgewood Avenue. Environmental considerations including protected tree species, wetland buffers along the Halifax River and Tomoka basin, and stormwater management requirements from the St. Johns River Water Management District all factor into site work planning here. We coordinate with the relevant agencies and can help you understand what your specific parcel requires before clearing begins.</p>`,

  // FAQs
  faqs: [
    {
      q: 'Do I need a permit for land clearing in Daytona Beach?',
      a: 'In most cases, yes. Volusia County requires land clearing permits for parcels over half an acre, and the city of Daytona Beach has its own permitting process. Protected trees, wetland setbacks, and stormwater management may add additional requirements. We can help you navigate the process.',
    },
    {
      q: 'How much does lot clearing cost in Daytona Beach?',
      a: 'Cost depends on lot size, density of vegetation, whether stumps need grinding or removal, and access conditions. We provide free on-site estimates so you get a price based on your actual property, not a generic per-acre number.',
    },
    {
      q: 'What is forestry mulching and is it right for my property?',
      a: 'Forestry mulching uses a specialized machine to grind standing trees, brush, and stumps into mulch in a single pass. It is efficient, leaves the topsoil intact, and reduces erosion. It works well on most Daytona Beach parcels but is not ideal for sites requiring stump removal or precise grading.',
    },
    {
      q: 'Can you clear land with protected trees on it?',
      a: 'Yes, but protected species like sand live oaks require a tree removal permit and often replacement plantings. We identify protected trees during our site walk and factor permit requirements into your project plan and timeline.',
    },
    {
      q: 'How long does it take to clear a residential lot in Daytona Beach?',
      a: 'A typical quarter-acre to half-acre residential lot can be cleared in one to two days depending on vegetation density and debris volume. Larger parcels or sites requiring extensive grading take longer. We will give you a clear timeline during the estimate.',
    },
    {
      q: 'Do you handle drainage and grading after clearing?',
      a: 'Yes. Land clearing, grading, drainage installation, and erosion control are all part of our site services. Many Daytona Beach properties need grade corrections and proper drainage to meet building code requirements before construction can begin.',
    },
  ],

  // Nearby locations
  nearbyLocations: [
    { name: 'DeLand', href: '/services/site-work/deland' },
    { name: 'Ormond Beach', href: '/services/site-work/ormond-beach' },
    { name: 'Port Orange', href: '/services/site-work/port-orange' },
    {
      name: 'New Smyrna Beach',
      href: '/services/site-work/new-smyrna-beach',
    },
    { name: 'Palm Coast', href: '/services/site-work/palm-coast' },
  ],

  // Schema
  schema: {
    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://hlsdeland.com/#business',
      name: 'Hoag Land Services',
      url: 'https://hlsdeland.com',
      logo: '/photos/HLSlogo-nobackground.png',
      image: '/photos/site10.JPG',
      description:
        'Professional land clearing in Daytona Beach, FL. Lot clearing, forestry mulching, earthworks, excavation, grading, and erosion control for residential and commercial properties.',
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
        latitude: 29.2108,
        longitude: -81.0228,
      },
      areaServed: {
        '@type': 'City',
        name: 'Daytona Beach',
        sameAs: 'https://en.wikipedia.org/wiki/Daytona_Beach,_Florida',
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
      slogan: 'From Single Lots to Hundreds of Acres',
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
          name: 'Daytona Beach',
          item: 'https://hlsdeland.com/services/site-work/daytona-beach',
        },
      ],
    },
    faqPage: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Do I need a permit for land clearing in Daytona Beach?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In most cases, yes. Volusia County requires land clearing permits for parcels over half an acre, and the city of Daytona Beach has its own permitting process. Protected trees, wetland setbacks, and stormwater management may add additional requirements. We can help you navigate the process.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does lot clearing cost in Daytona Beach?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cost depends on lot size, density of vegetation, whether stumps need grinding or removal, and access conditions. We provide free on-site estimates so you get a price based on your actual property, not a generic per-acre number.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is forestry mulching and is it right for my property?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Forestry mulching uses a specialized machine to grind standing trees, brush, and stumps into mulch in a single pass. It is efficient, leaves the topsoil intact, and reduces erosion. It works well on most Daytona Beach parcels but is not ideal for sites requiring stump removal or precise grading.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you clear land with protected trees on it?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, but protected species like sand live oaks require a tree removal permit and often replacement plantings. We identify protected trees during our site walk and factor permit requirements into your project plan and timeline.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does it take to clear a residential lot in Daytona Beach?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A typical quarter-acre to half-acre residential lot can be cleared in one to two days depending on vegetation density and debris volume. Larger parcels or sites requiring extensive grading take longer. We will give you a clear timeline during the estimate.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you handle drainage and grading after clearing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Land clearing, grading, drainage installation, and erosion control are all part of our site services. Many Daytona Beach properties need grade corrections and proper drainage to meet building code requirements before construction can begin.',
          },
        },
      ],
    },
    webPage: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Land Clearing Daytona Beach FL | Hoag Land Services',
      description:
        'Professional land clearing and site work in Daytona Beach, FL. Lot clearing, forestry mulching, grading, and excavation. Licensed, insured, and 5.0-star rated.',
      url: 'https://hlsdeland.com/services/site-work/daytona-beach',
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
        url: '/photos/site10.JPG',
      },
      dateModified: '2026-04-10T00:00:00-04:00',
      inLanguage: 'en-US',
    },
  },
}

export default function DaytonaBeachSiteWorkPage() {
  return <LocationPage data={data} />
}
