import LocationPage from '@/components/LocationPage'
import type { LocationPageData } from '@/types/location'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tree Service in Port Orange, FL: Removal, Trimming & Storm Cleanup',
  description:
    'Tree service in Port Orange, FL by ISA Certified Arborist. Tree removal, trimming, palm pruning, stump grinding, and hurricane storm cleanup in 32127, 32128, and 32129. Free estimates.',
  alternates: {
    canonical: 'https://www.hlsdeland.com/services/tree-services/port-orange',
  },
  openGraph: {
    type: 'website',
    title: 'Tree Service in Port Orange, FL: Removal, Trimming & Storm Cleanup',
    description:
      'Tree service in Port Orange, FL by ISA Certified Arborist. Tree removal, trimming, palm pruning, stump grinding, and hurricane storm cleanup in 32127, 32128, and 32129. Free estimates.',
    url: 'https://www.hlsdeland.com/services/tree-services/port-orange',
    siteName: 'Hoag Land Services',
    locale: 'en_US',
    images: [
      {
        url: '/photos/tree2.jpeg',
        width: 1200,
        height: 630,
        alt: 'Tree service in Port Orange FL by Hoag Land Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tree Service in Port Orange, FL: Removal, Trimming & Storm Cleanup',
    description:
      'Tree service in Port Orange, FL by ISA Certified Arborist. Tree removal, trimming, palm pruning, stump grinding, and hurricane storm cleanup. Free estimates.',
    images: ['/photos/tree2.jpeg'],
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
    'geo.placename': 'Port Orange',
    'geo.position': '29.1383;-80.9956',
    ICBM: '29.1383, -80.9956',
  },
}

const data: LocationPageData = {
  location: 'Port Orange',
  state: 'Florida',
  stateAbbr: 'FL',
  zipCodes: ['32127', '32128', '32129'],
  canonicalUrl: 'https://www.hlsdeland.com/services/tree-services/port-orange',
  primaryKeyword: 'tree service port orange',
  secondaryKeywords: [
    'tree removal port orange fl',
    'palm tree trimming port orange',
    'storm damage tree cleanup port orange',
    'arborist port orange',
    'stump grinding port orange',
  ],

  title: 'Tree Service in Port Orange, FL: Removal, Trimming & Storm Cleanup',
  metaDescription:
    'Tree service in Port Orange, FL by ISA Certified Arborist. Tree removal, trimming, palm pruning, stump grinding, and hurricane storm cleanup in 32127, 32128, and 32129. Free estimates.',
  ogImage: '/photos/tree2.jpeg',

  heroImage: '/photos/tree2.jpeg',
  h1: 'Tree Service in Port Orange, FL: Certified Arborist on Every Job',
  subheadline:
    'From Spruce Creek live oaks to Halifax River sabal palms, Port Orange properties need an arborist who handles coastal storm exposure and protected-species rules without guessing. We provide honest assessments and careful work in the 32127, 32128, and 32129 zip codes.',
  ctaText: 'Call for a Free Estimate',
  ctaHref: 'tel:+13865610003',

  serviceCategory: 'tree',
  serviceCategoryName: 'Tree Services',

  services: [
    {
      name: 'Tree Removal',
      desc: 'Safe removal of hazardous, storm-damaged, or unwanted trees on Port Orange properties. Our ISA Certified Arborist plans every removal to protect your home, neighboring structures, and power lines, especially on tight Spruce Creek and Cypress Head lots.',
      href: '/services/tree-services/tree-removal',
    },
    {
      name: 'Tree Trimming',
      desc: 'Professional pruning to remove dead or weak limbs, improve clearance over rooflines, and reduce wind resistance before hurricane season hits the Volusia coast. Best done in late winter for most Port Orange hardwoods.',
      href: '/services/tree-services/tree-trimming',
    },
    {
      name: 'Palm Pruning',
      desc: 'Sabal palms, Washingtonia palms, and Queen palms throughout Port Orange. We remove dead fronds, seed pods, and storm debris, with bucket trucks or climbing depending on access. Annual trimming is the most common cadence for healthy coastal palms.',
      href: '/services/tree-services/palm-pruning',
    },
    {
      name: 'Storm Damage Cleanup',
      desc: 'Rapid response for fallen trees and broken limbs after tropical storms and hurricanes. We work through Port Orange and the wider Volusia coast during and after hurricane season, including emergency access and insurance-coordinated removal.',
      href: '/services/tree-services/storm-damage',
    },
    {
      name: 'Dangerous Tree Assessment',
      desc: 'ISA Tree Risk Assessment Qualified (TRAQ) evaluations for trees showing structural failure, root damage, or decline. Critical for Port Orange properties with mature live oaks and water oaks prone to sudden limb failure.',
      href: '/services/tree-services/dangerous-trees',
    },
    {
      name: 'Tree Installation',
      desc: 'The right tree in the right place. We install palms, hardwoods, and salt-tolerant species suited to Port Orange soil and coastal exposure, whether near the Halifax River or further inland off Williamson Boulevard.',
      href: '/services/tree-services/tree-installation',
    },
  ],

  processSteps: [
    {
      title: 'Call or Send a Request',
      desc: 'Reach us by phone or through our contact form. Describe your Port Orange property and the tree work you need. Emergency storm work is prioritized; standard removal and trimming work is scheduled within 1 to 3 weeks depending on season.',
    },
    {
      title: 'On-Site Walk and Estimate',
      desc: 'We visit your Port Orange property, walk the site with you, assess every tree in question, and give you an honest estimate. No phone-quote guesses, no inflated upsells. Just straightforward pricing based on actual conditions.',
    },
    {
      title: 'Scheduled and Completed',
      desc: 'We schedule the work, show up as promised, and complete the job with care. Your property is left clean and debris-free. Stumps ground below grade if requested. Insurance documentation provided when needed for storm work.',
    },
  ],

  differentiators: [
    {
      title: 'ISA Certified Arborist',
      desc: 'Tyler Hoag holds ISA Certification FL-9491A and is Tree Risk Assessment Qualified (TRAQ). Critical for protected-species work in Port Orange and for insurance claims after storm damage.',
    },
    {
      title: 'Volusia Coast Storm Experience',
      desc: 'We respond throughout Port Orange and the Halifax River corridor during and after hurricane season. Hurricane Irma, Dorian, and Ian all hit this coast hard. We know the response and the recovery.',
    },
    {
      title: 'Equipment for Coastal Properties',
      desc: 'Bucket trucks for waterfront access, rigging for tight Spruce Creek and Cypress Head lots, and forestry mulchers for the larger acreage parcels west of I-95. Right machine for your property.',
    },
    {
      title: 'Licensed, Insured, HomeAdvisor Screened',
      desc: 'Hoag Land Services is licensed and insured with HomeAdvisor Screened and Approved status. Full coverage on every job from a single palm trim to multi-tree storm cleanup.',
    },
  ],

  localContext: `<p>Port Orange sits on the west bank of the Halifax River with a mature tree canopy that defines neighborhoods like Spruce Creek, Cypress Head, Sugar Forest, and the corridor along Dunlawton Avenue. Coastal humidity, sandy soils, and seasonal hurricane exposure all factor into how trees grow here and how they fail. Live oaks, sabal palms, southern magnolias, and the imported Washingtonia palms common to Port Orange landscapes each need different pruning windows and different cleanup strategies after a storm.</p>

<p>Hurricane season hits the Volusia coast hard. Hurricane Irma (2017), Dorian (2019), and Ian (2022) all dropped large limbs and uprooted mature trees across Port Orange. Post-storm tree removal often involves emergency access, insurance coordination, and careful work near structures and power lines. Hoag Land Services handles storm damage cleanup throughout Port Orange and the wider Volusia coast, including emergency response when trees fall on roofs, driveways, or fences. We document scope and damage for insurance claims when needed.</p>

<p>The City of Port Orange has tree protection rules for certain species and sizes, and Volusia County requires land-clearing permits for parcels over a half-acre. We work in the 32127, 32128, and 32129 zip codes from Riverwalk Park to the Spruce Creek Fly-In community, and we are a short drive from our DeLeon Springs HQ via I-95. Tyler Hoag is an ISA Certified Arborist and walks every property before providing an estimate, so the scope, equipment, and timeline match the actual conditions on your trees.</p>`,

  whatsIncluded: {
    eyebrow: 'Port Orange Tree Service Scope',
    heading: "What's Included in Port Orange Tree Service",
    intro:
      'Every Port Orange tree job is scoped on the property, but here is the standard scope we run. Add or subtract anything you do not need.',
    items: [
      {
        title: 'Tree Removal',
        desc: 'Hazardous, storm-damaged, or unwanted trees removed safely. Rigging used near structures and power lines.',
        href: '/services/tree-services/tree-removal',
      },
      {
        title: 'Tree Trimming and Pruning',
        desc: 'Deadwood removal, structural pruning, and clearance over rooflines, driveways, and pool decks.',
        href: '/services/tree-services/tree-trimming',
      },
      {
        title: 'Palm Pruning',
        desc: 'Sabal palms, Washingtonia palms, and queen palms throughout Port Orange. Bucket truck or climb depending on access.',
        href: '/services/tree-services/palm-pruning',
      },
      {
        title: 'Stump Grinding',
        desc: 'Stumps ground below grade so you can reclaim the space for landscaping, sod, or fencing.',
      },
      {
        title: 'Storm Damage Cleanup',
        desc: 'Emergency response after hurricanes and severe storms. Insurance-coordinated documentation and removal.',
        href: '/services/tree-services/storm-damage',
      },
      {
        title: 'Dangerous Tree Assessment',
        desc: 'ISA TRAQ evaluations for trees showing structural failure, root damage, or decline. Document for insurance and permitting.',
        href: '/services/tree-services/dangerous-trees',
      },
    ],
  },

  faqs: [
    {
      q: 'How much does tree removal cost in Port Orange, FL?',
      a: 'Cost depends on tree size, species, location relative to structures, and access. A 30-foot live oak in an open backyard runs less than a 70-foot pine over a power line. We provide free on-site estimates so the price matches your actual conditions, not a phone-quote guess.',
    },
    {
      q: 'Do you do palm tree trimming in Port Orange?',
      a: 'Yes. Sabal palms, Washingtonia palms, and queen palms throughout Port Orange. We climb or use bucket trucks depending on access, remove dead fronds and seed pods, and clean up debris. Annual trimming is the most common cadence for healthy coastal palms.',
    },
    {
      q: 'Can you handle storm damage tree removal after a hurricane in Port Orange?',
      a: 'Yes. We respond to storm damage throughout Port Orange and the Volusia coast during and after hurricane season. Emergency access, careful work near structures and power lines, and insurance-coordinated cleanup are what we do.',
    },
    {
      q: 'Do I need a permit to remove a tree in Port Orange?',
      a: 'The City of Port Orange has tree protection rules for certain species and sizes. Volusia County requires land-clearing permits for parcels over a half-acre. We help identify what is needed during the site walk and can coordinate the permitting process.',
    },
    {
      q: 'Are you an ISA Certified Arborist?',
      a: 'Yes. Tyler Hoag is an ISA Certified Arborist (FL-9491A) and Tree Risk Assessment Qualified (TRAQ), which means trees are evaluated by someone trained in tree biology, structure, and risk, not just a guy with a chainsaw. This matters for removal decisions, for pruning health, and for insurance claims.',
    },
    {
      q: 'Do you grind stumps after tree removal in Port Orange?',
      a: 'Yes. Stump grinding is included as an option on every removal estimate. We grind stumps below grade so you can reclaim the space for landscaping, fencing, sod, or driveway.',
    },
    {
      q: 'How quickly can you start a tree job in Port Orange?',
      a: 'Emergency tree work (storm damage, blocked driveways, hazards) is usually same-day or next-day. Standard removal and trimming work is typically scheduled within 1 to 3 weeks depending on season and current job load.',
    },
    {
      q: 'What is the best time of year for tree trimming in Port Orange?',
      a: 'For most species in Central Florida, late winter through early spring (January to March) is ideal because trees are dormant and tropical storm risk is low. Palms can be trimmed year-round. We walk you through the right window for your specific trees.',
    },
  ],

  nearbyLocations: [
    { name: 'Tree Service in Daytona Beach', href: '/services/tree-services/daytona-beach' },
    { name: 'Tree Service in South Daytona', href: '/services/tree-services/south-daytona' },
    { name: 'Tree Service in New Smyrna Beach', href: '/services/tree-services/new-smyrna-beach' },
    { name: 'Tree Service in Edgewater', href: '/services/tree-services/edgewater' },
    { name: 'Tree Service in DeLand', href: '/services/tree-services/deland' },
  ],

  schema: {
    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'TreeService',
      '@id': 'https://www.hlsdeland.com/services/tree-services/port-orange#business',
      name: 'Hoag Land Services',
      url: 'https://www.hlsdeland.com',
      logo: '/photos/HLSlogo-nobackground.png',
      image: '/photos/tree2.jpeg',
      description:
        'ISA Certified Arborist providing tree service in Port Orange, FL. Tree removal, tree trimming, palm pruning, stump grinding, and hurricane storm cleanup for residential and commercial properties in 32127, 32128, and 32129.',
      telephone: '+1-386-561-0003',
      email: 'tyler@hlsdeland.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'DeLeon Springs',
        addressRegion: 'FL',
        postalCode: '32130',
        addressCountry: 'US',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 29.1383, longitude: -80.9956 },
      areaServed: {
        '@type': 'City',
        name: 'Port Orange',
        sameAs: 'https://en.wikipedia.org/wiki/Port_Orange,_Florida',
      },
      sameAs: [
        'https://facebook.com/hoaglandservices',
        'https://instagram.com/hls_deland',
      ],
      priceRange: '$$',
      foundingDate: '2017',
      slogan: 'Certified Arborist Care You Can Trust',
    },
    breadcrumbs: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.hlsdeland.com' },
        { '@type': 'ListItem', position: 2, name: 'Tree Services', item: 'https://www.hlsdeland.com/services/tree-services' },
        { '@type': 'ListItem', position: 3, name: 'Port Orange', item: 'https://www.hlsdeland.com/services/tree-services/port-orange' },
      ],
    },
    faqPage: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How much does tree removal cost in Port Orange, FL?', acceptedAnswer: { '@type': 'Answer', text: 'Cost depends on tree size, species, location relative to structures, and access. A 30-foot live oak in an open backyard runs less than a 70-foot pine over a power line. We provide free on-site estimates so the price matches your actual conditions, not a phone-quote guess.' } },
        { '@type': 'Question', name: 'Do you do palm tree trimming in Port Orange?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Sabal palms, Washingtonia palms, and queen palms throughout Port Orange. We climb or use bucket trucks depending on access, remove dead fronds and seed pods, and clean up debris. Annual trimming is the most common cadence for healthy coastal palms.' } },
        { '@type': 'Question', name: 'Can you handle storm damage tree removal after a hurricane in Port Orange?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. We respond to storm damage throughout Port Orange and the Volusia coast during and after hurricane season. Emergency access, careful work near structures and power lines, and insurance-coordinated cleanup are what we do.' } },
        { '@type': 'Question', name: 'Do I need a permit to remove a tree in Port Orange?', acceptedAnswer: { '@type': 'Answer', text: 'The City of Port Orange has tree protection rules for certain species and sizes. Volusia County requires land-clearing permits for parcels over a half-acre. We help identify what is needed during the site walk and can coordinate the permitting process.' } },
        { '@type': 'Question', name: 'Are you an ISA Certified Arborist?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Tyler Hoag is an ISA Certified Arborist (FL-9491A) and Tree Risk Assessment Qualified (TRAQ), which means trees are evaluated by someone trained in tree biology, structure, and risk, not just a guy with a chainsaw. This matters for removal decisions, for pruning health, and for insurance claims.' } },
        { '@type': 'Question', name: 'Do you grind stumps after tree removal in Port Orange?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Stump grinding is included as an option on every removal estimate. We grind stumps below grade so you can reclaim the space for landscaping, fencing, sod, or driveway.' } },
        { '@type': 'Question', name: 'How quickly can you start a tree job in Port Orange?', acceptedAnswer: { '@type': 'Answer', text: 'Emergency tree work (storm damage, blocked driveways, hazards) is usually same-day or next-day. Standard removal and trimming work is typically scheduled within 1 to 3 weeks depending on season and current job load.' } },
        { '@type': 'Question', name: 'What is the best time of year for tree trimming in Port Orange?', acceptedAnswer: { '@type': 'Answer', text: 'For most species in Central Florida, late winter through early spring (January to March) is ideal because trees are dormant and tropical storm risk is low. Palms can be trimmed year-round. We walk you through the right window for your specific trees.' } },
      ],
    },
    webPage: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Tree Service in Port Orange, FL: Removal, Trimming & Storm Cleanup',
      description: 'ISA Certified Arborist providing tree service in Port Orange, FL. Tree removal, trimming, palm pruning, stump grinding, and hurricane storm cleanup. Free estimates.',
      url: 'https://www.hlsdeland.com/services/tree-services/port-orange',
      isPartOf: { '@type': 'WebSite', name: 'Hoag Land Services', url: 'https://www.hlsdeland.com' },
      about: { '@type': 'TreeService', name: 'Hoag Land Services' },
      primaryImageOfPage: { '@type': 'ImageObject', url: '/photos/tree2.jpeg' },
      dateModified: '2026-07-21T00:00:00-04:00',
      inLanguage: 'en-US',
    },
    service: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': 'https://www.hlsdeland.com/services/tree-services/port-orange#service',
      serviceType: 'Tree Service',
      name: 'Tree Service in Port Orange, FL',
      description: 'Tree removal, tree trimming, palm pruning, stump grinding, storm damage cleanup, and dangerous tree assessment for residential and commercial properties in Port Orange, FL.',
      provider: { '@type': 'LocalBusiness', '@id': 'https://www.hlsdeland.com/services/tree-services/port-orange#business' },
      areaServed: {
        '@type': 'City',
        name: 'Port Orange',
        sameAs: 'https://en.wikipedia.org/wiki/Port_Orange,_Florida',
        containedInPlace: { '@type': 'State', name: 'Florida' },
      },
      url: 'https://www.hlsdeland.com/services/tree-services/port-orange',
      image: 'https://www.hlsdeland.com/photos/tree2.jpeg',
      offers: { '@type': 'Offer', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
    },
    howTo: {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How Port Orange Tree Service Works with Hoag Land Services',
      description: 'Step-by-step process Hoag Land Services follows on a Port Orange tree service project.',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Call or Send a Request', text: 'Reach us by phone or through our contact form. Describe your Port Orange property and the tree work you need. Emergency storm work is prioritized.' },
        { '@type': 'HowToStep', position: 2, name: 'On-Site Walk and Estimate', text: 'We visit your Port Orange property, walk the site with you, assess every tree in question, and give you an honest estimate based on actual conditions.' },
        { '@type': 'HowToStep', position: 3, name: 'Scheduled and Completed', text: 'We schedule the work, show up as promised, and complete the job with care. Property left clean and debris-free. Insurance documentation provided when needed.' },
      ],
    },
  },
}

export default function PortOrangeTreeServicesPage() {
  return <LocationPage data={data} />
}
