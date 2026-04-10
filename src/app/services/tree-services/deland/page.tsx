import LocationPage from '@/components/LocationPage'
import type { LocationPageData } from '@/types/location'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tree Service DeLand FL | Hoag Land Services',
  description:
    'ISA Certified Arborist tree service in DeLand, FL. Tree removal, trimming, stump grinding and storm cleanup. 5.0 stars, 33 reviews. Free estimates.',
  alternates: {
    canonical: 'https://hlsdeland.com/services/tree-services/deland',
  },
  openGraph: {
    type: 'website',
    title: 'Tree Service DeLand FL | Hoag Land Services',
    description:
      'ISA Certified Arborist tree service in DeLand, FL. Tree removal, trimming, stump grinding and storm cleanup. 5.0 stars, 33 reviews. Free estimates.',
    url: 'https://hlsdeland.com/services/tree-services/deland',
    siteName: 'Hoag Land Services',
    locale: 'en_US',
    images: [
      {
        url: 'https://hlsdeland.com/photos/tree8.jpeg',
        width: 1200,
        height: 630,
        alt: 'Tree service in DeLand FL by Hoag Land Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tree Service DeLand FL | Hoag Land Services',
    description:
      'ISA Certified Arborist tree service in DeLand, FL. Tree removal, trimming, stump grinding and storm cleanup. 5.0 stars, 33 reviews. Free estimates.',
    images: ['https://hlsdeland.com/photos/tree8.jpeg'],
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
  canonicalUrl: 'https://hlsdeland.com/services/tree-services/deland',
  primaryKeyword: 'tree service deland fl',
  secondaryKeywords: [
    'tree removal deland',
    'deland tree removal',
    'deland tree service',
    'deland tree trimming',
    'deland stump grinding',
  ],

  // Meta
  title: 'Tree Service DeLand FL | Hoag Land Services',
  metaDescription:
    'ISA Certified Arborist tree service in DeLand, FL. Tree removal, trimming, stump grinding and storm cleanup. 5.0 stars, 33 reviews. Free estimates.',
  ogImage: 'https://hlsdeland.com/photos/tree8.jpeg',

  // Hero
  heroImage: 'https://hlsdeland.com/photos/tree8.jpeg',
  h1: 'Tree Service in DeLand, FL \u2014 Built on Hard Work',
  subheadline:
    'From the historic live oaks along Woodland Boulevard to storm-damaged pines in Victoria Park, DeLand properties need an arborist who knows the local canopy. We bring ISA-certified expertise to every job.',
  ctaText: 'Call for a Free Estimate',
  ctaHref: 'tel:+13865610003',

  // Service category
  serviceCategory: 'tree',
  serviceCategoryName: 'Tree Services',

  // Services
  services: [
    {
      name: 'Tree Removal',
      desc: 'Safe removal of hazardous, dead, or unwanted trees on DeLand residential and commercial properties. Our certified arborist ensures no damage to structures, landscaping, or underground utilities throughout the process.',
      href: '/services/tree-services/tree-removal',
    },
    {
      name: 'Tree Trimming',
      desc: 'Removal of weak, dead, or dying limbs, clearance lifting for pedestrians and vehicles, and reduction cuts for overgrown canopies common on DeLand properties near power lines and rooflines.',
      href: '/services/tree-services/tree-trimming',
    },
    {
      name: 'Palm Pruning',
      desc: 'Professional frond removal, fruit cluster cleanup, and base sprout trimming for the Sabal palms and Washingtonias found throughout DeLand neighborhoods and commercial streetscapes.',
      href: '/services/tree-services/palm-pruning',
    },
    {
      name: 'Storm Damage Cleanup',
      desc: 'Emergency response for fallen trees and broken limbs after Florida storms. We clear debris, assess remaining tree health with TRAQ protocols, and restore your DeLand property safely.',
      href: '/services/tree-services/storm-damage',
    },
    {
      name: 'Tree Installation',
      desc: 'Palms, hardwoods, and evergreens planted in the right place. We help DeLand homeowners select species suited to local sandy soil and the Volusia County canopy replacement requirements.',
      href: '/services/tree-services/tree-installation',
    },
    {
      name: 'Stump Grinding',
      desc: 'Complete stump removal below grade so you can reclaim yard space, install new landscaping, or prepare for construction on your DeLand property.',
      href: '/services/tree-services/tree-removal',
    },
  ],

  // Process
  processSteps: [
    {
      title: 'Call or Send a Request',
      desc: 'Reach us by phone or through our contact form. Describe your property, the trees involved, and what you need done. We will ask a few questions to understand the scope before scheduling a visit.',
    },
    {
      title: 'We Walk Your Property',
      desc: 'We come to your DeLand property, inspect the trees in person, assess risk and access, and provide an honest estimate. No pressure, no upselling\u2014just a straightforward evaluation from a certified arborist.',
    },
    {
      title: 'We Get the Work Done',
      desc: 'Once you approve the estimate, we schedule your project and complete the work. Our crew handles everything from setup to full cleanup, leaving your property in better shape than we found it.',
    },
  ],

  // Differentiators
  differentiators: [
    {
      title: 'ISA Certified Arborist',
      desc: 'Tyler Hoag holds ISA Certification FL-9491A and is Tree Risk Assessment Qualified. Every tree on your property is evaluated by a credentialed professional, not just a laborer with a chainsaw.',
    },
    {
      title: 'Honest Estimates, No Surprises',
      desc: 'We walk your property, explain what needs to be done and why, and give you a clear price. The number we quote is the number you pay. HLS has maintained a 5.0 Google rating across 33 reviews on that principle.',
    },
    {
      title: 'Licensed and Insured',
      desc: 'Hoag Land Services is fully licensed, insured, and HomeAdvisor Screened and Approved. You are protected from start to finish, and we carry the coverage to prove it.',
    },
    {
      title: 'DeLand Canopy Specialists',
      desc: 'We work throughout DeLand year-round\u2014from the mature oaks in the Historic Garden District to the newer plantings in Victoria Hills. We understand Volusia County tree ordinances, protected species permits, and the replacement ratios the county requires.',
    },
  ],

  // Local context (175+ words, 100% unique to tree services / DeLand)
  localContext: `<p>DeLand, the county seat of Volusia County, earned its nickname "The Athens of Florida" in part because of the towering live oaks and mature canopy that define its streetscape. Woodland Boulevard, the city's main corridor, is lined with oaks that have grown for well over a century, and the residential blocks surrounding Stetson University\u2014Florida's oldest private college\u2014feature dense canopies of laurel oaks, water oaks, and Southern magnolias that require regular professional maintenance.</p>
<p>The tree canopy that makes DeLand beautiful also makes it vulnerable. Volusia County sits squarely in Florida's hurricane zone, and every storm season brings the risk of wind-thrown trees, hanging limbs, and root failure in saturated sandy soils. After Hurricane Ian in 2022, DeLand neighborhoods from the Historic Garden District to Victoria Park and Cross Creek dealt with widespread tree damage that required emergency removal and pruning. Having a certified arborist on call\u2014one who already knows the area\u2014makes recovery faster and safer.</p>
<p>Volusia County's Tree Preservation Ordinance requires a permit for removal of protected trees with a diameter at breast height of six inches or more within setback areas. The county mandates a 150% cross-sectional area replacement ratio for most protected species, meaning homeowners cannot simply remove a large oak without planning for replacement canopy. As an ISA Certified Arborist operating throughout DeLand and the surrounding 32720 and 32724 zip codes, Tyler Hoag helps property owners navigate the permit process, identify genuinely hazardous trees, and stay compliant with county requirements\u2014all while preserving the canopy that gives DeLand its character.</p>`,

  // FAQs
  faqs: [
    {
      q: 'Do I need a permit to remove a tree in DeLand?',
      a: 'Volusia County requires a permit for removing protected trees with a trunk diameter of six inches or more at breast height within setback areas. Protected species include live oaks, sand live oaks, and Southern magnolias. We handle the permit process and can advise whether your tree qualifies for an exemption. We recommend confirming current requirements with Volusia County Environmental Management\u2014we are happy to guide you through this.',
    },
    {
      q: 'How much does tree removal cost in DeLand, FL?',
      a: 'Cost depends on the tree\u2019s size, species, location on the property, and proximity to structures or power lines. A small tree in an open yard will cost significantly less than a large oak overhanging a roof. We provide free on-site estimates so you get an accurate price based on your specific situation, not a generic range.',
    },
    {
      q: 'What tree services does Hoag Land Services offer in DeLand?',
      a: 'We provide tree removal, tree trimming, palm pruning, stump grinding, storm damage cleanup, and tree installation throughout the DeLand area including zip codes 32720 and 32724. Every service is performed under the supervision of an ISA Certified Arborist with Tree Risk Assessment Qualification.',
    },
    {
      q: 'Can you handle emergency tree removal after a storm?',
      a: 'Yes. We respond to storm damage calls throughout DeLand and Volusia County. Our crew can remove fallen trees from structures, clear blocked driveways, and address hanging limbs that pose an immediate safety risk. We prioritize safety hazards and work to restore access as quickly as conditions allow.',
    },
    {
      q: 'What is an ISA Certified Arborist and why does it matter?',
      a: 'An ISA Certified Arborist has passed a rigorous exam administered by the International Society of Arboriculture covering tree biology, diagnosis, pruning, removal, and risk assessment. Tyler Hoag\u2019s FL-9491A certification and TRAQ qualification mean your trees are assessed by someone trained to identify structural defects, disease, and hazard\u2014not guesswork.',
    },
    {
      q: 'How often should trees be trimmed in DeLand?',
      a: 'Most mature trees benefit from inspection and pruning every three to five years. Oaks and other fast-growing species common in DeLand may need more frequent attention, especially if branches are approaching power lines, rooflines, or roadways. We can establish a maintenance schedule during your initial property walk.',
    },
    {
      q: 'Do you grind stumps after tree removal in DeLand?',
      a: 'Yes. Stump grinding is available as an add-on to any tree removal or as a standalone service. We grind the stump below grade so you can fill the area with topsoil and reseed, install landscaping, or build over the spot. We clean up all wood chips and debris.',
    },
  ],

  // Nearby locations
  nearbyLocations: [
    { name: 'Orange City', href: '/services/tree-services/orange-city' },
    { name: 'Deltona', href: '/services/tree-services/deltona' },
    { name: 'DeLeon Springs', href: '/services/tree-services/deleon-springs' },
    { name: 'Lake Helen', href: '/services/tree-services/lake-helen' },
    { name: 'Daytona Beach', href: '/services/tree-services/daytona-beach' },
  ],

  // Schema
  schema: {
    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'TreeService',
      name: 'Hoag Land Services',
      url: 'https://hlsdeland.com',
      logo: 'https://hlsdeland.com/photos/HLSlogo-nobackground.png',
      image: 'https://hlsdeland.com/photos/tree8.jpeg',
      description:
        'ISA Certified Arborist providing professional tree service in DeLand, FL. Tree removal, trimming, palm pruning, stump grinding, storm damage cleanup, and tree installation for residential and commercial properties.',
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
          author: { '@type': 'Person', name: 'Juliene Kaidor' },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
          },
          reviewBody:
            'Tyler is a certified arborist and his knowledge shows in every aspect of their work. From tree trimming and large tree removal to complete land clearing, his team is thorough and professional.',
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
          name: 'Tree Services',
          item: 'https://hlsdeland.com/services/tree-services',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'DeLand',
          item: 'https://hlsdeland.com/services/tree-services/deland',
        },
      ],
    },
    faqPage: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Do I need a permit to remove a tree in DeLand?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Volusia County requires a permit for removing protected trees with a trunk diameter of six inches or more at breast height within setback areas. Protected species include live oaks, sand live oaks, and Southern magnolias. We handle the permit process and can advise whether your tree qualifies for an exemption. We recommend confirming current requirements with Volusia County Environmental Management\u2014we are happy to guide you through this.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does tree removal cost in DeLand, FL?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cost depends on the tree\u2019s size, species, location on the property, and proximity to structures or power lines. A small tree in an open yard will cost significantly less than a large oak overhanging a roof. We provide free on-site estimates so you get an accurate price based on your specific situation, not a generic range.',
          },
        },
        {
          '@type': 'Question',
          name: 'What tree services does Hoag Land Services offer in DeLand?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We provide tree removal, tree trimming, palm pruning, stump grinding, storm damage cleanup, and tree installation throughout the DeLand area including zip codes 32720 and 32724. Every service is performed under the supervision of an ISA Certified Arborist with Tree Risk Assessment Qualification.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you handle emergency tree removal after a storm?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We respond to storm damage calls throughout DeLand and Volusia County. Our crew can remove fallen trees from structures, clear blocked driveways, and address hanging limbs that pose an immediate safety risk. We prioritize safety hazards and work to restore access as quickly as conditions allow.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is an ISA Certified Arborist and why does it matter?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An ISA Certified Arborist has passed a rigorous exam administered by the International Society of Arboriculture covering tree biology, diagnosis, pruning, removal, and risk assessment. Tyler Hoag\u2019s FL-9491A certification and TRAQ qualification mean your trees are assessed by someone trained to identify structural defects, disease, and hazard\u2014not guesswork.',
          },
        },
        {
          '@type': 'Question',
          name: 'How often should trees be trimmed in DeLand?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most mature trees benefit from inspection and pruning every three to five years. Oaks and other fast-growing species common in DeLand may need more frequent attention, especially if branches are approaching power lines, rooflines, or roadways. We can establish a maintenance schedule during your initial property walk.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you grind stumps after tree removal in DeLand?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Stump grinding is available as an add-on to any tree removal or as a standalone service. We grind the stump below grade so you can fill the area with topsoil and reseed, install landscaping, or build over the spot. We clean up all wood chips and debris.',
          },
        },
      ],
    },
    webPage: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Tree Service DeLand FL | Hoag Land Services',
      description:
        'ISA Certified Arborist tree service in DeLand, FL. Tree removal, trimming, stump grinding and storm cleanup. 5.0 stars, 33 reviews. Free estimates.',
      url: 'https://hlsdeland.com/services/tree-services/deland',
      isPartOf: {
        '@type': 'WebSite',
        name: 'Hoag Land Services',
        url: 'https://hlsdeland.com',
      },
      about: {
        '@type': 'TreeService',
        name: 'Hoag Land Services',
      },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://hlsdeland.com/photos/tree8.jpeg',
      },
      dateModified: '2026-04-10T00:00:00-04:00',
      inLanguage: 'en-US',
    },
  },
}

export default function Page() {
  return <LocationPage data={data} />
}
