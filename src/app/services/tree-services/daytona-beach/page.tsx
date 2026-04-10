import LocationPage from '@/components/LocationPage'
import type { LocationPageData } from '@/types/location'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tree Service Daytona Beach FL | Hoag Land Services',
  description:
    'ISA Certified Arborist serving Daytona Beach, FL. Tree removal, trimming, and palm pruning. 5.0 stars, licensed and insured. Call for a free estimate today.',
  alternates: {
    canonical: 'https://hlsdeland.com/services/tree-services/daytona-beach',
  },
  openGraph: {
    type: 'website',
    title: 'Tree Service Daytona Beach FL | Hoag Land Services',
    description:
      'ISA Certified Arborist serving Daytona Beach, FL. Tree removal, trimming, and palm pruning. 5.0 stars, licensed and insured. Call for a free estimate today.',
    url: 'https://hlsdeland.com/services/tree-services/daytona-beach',
    siteName: 'Hoag Land Services',
    locale: 'en_US',
    images: [
      {
        url: '/photos/tree2.jpeg',
        width: 1200,
        height: 630,
        alt: 'Tree service in Daytona Beach FL by Hoag Land Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tree Service Daytona Beach FL | Hoag Land Services',
    description:
      'ISA Certified Arborist serving Daytona Beach, FL. Tree removal, trimming, and palm pruning. 5.0 stars, licensed and insured. Call for a free estimate today.',
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
  canonicalUrl: 'https://hlsdeland.com/services/tree-services/daytona-beach',
  primaryKeyword: 'tree service daytona beach',
  secondaryKeywords: [
    'tree removal daytona beach',
    'tree trimming daytona beach',
    'arborist daytona beach',
  ],

  // Meta
  title: 'Tree Service Daytona Beach FL | Hoag Land Services',
  metaDescription:
    'ISA Certified Arborist serving Daytona Beach, FL. Tree removal, trimming, and palm pruning. 5.0 stars, licensed and insured. Call for a free estimate today.',
  ogImage: '/photos/tree2.jpeg',

  // Hero
  heroImage: '/photos/tree2.jpeg',
  h1: 'Tree Service in Daytona Beach, FL \u2014 Certified Arborist Care You Can Trust',
  subheadline:
    'From beachside live oaks battered by salt spray to towering mainland pines threatening rooflines near LPGA Boulevard, Daytona Beach properties need an arborist who understands coastal and inland tree challenges. We provide honest assessments and careful work \u2014 no upselling, no shortcuts.',
  ctaText: 'Call for a Free Estimate',
  ctaHref: 'tel:+13865610003',

  // Service category
  serviceCategory: 'tree',
  serviceCategoryName: 'Tree Services',

  // Services
  services: [
    {
      name: 'Tree Removal',
      desc: 'Safe removal of hazardous, storm-damaged, or unwanted trees on Daytona Beach properties. Our ISA Certified Arborist ensures every removal protects your home, landscaping, and neighboring structures.',
      href: '/services/tree-services/tree-removal',
    },
    {
      name: 'Tree Trimming',
      desc: 'Professional pruning and trimming to remove dead or weak limbs, improve clearance over structures and walkways, and reduce wind resistance before hurricane season hits the Daytona Beach coast.',
      href: '/services/tree-services/tree-trimming',
    },
    {
      name: 'Palm Pruning',
      desc: 'Removal of dead fronds, seed pods, and fruit clusters from Sabal palms, Queen palms, and other species common throughout Daytona Beach residential and commercial properties.',
      href: '/services/tree-services/palm-pruning',
    },
    {
      name: 'Tree Installation',
      desc: 'The right tree in the right place. We install palms, hardwoods, and evergreens suited to Daytona Beach soil conditions and salt tolerance requirements, whether beachside or mainland.',
      href: '/services/tree-services/tree-installation',
    },
    {
      name: 'Storm Damage Clean-Up',
      desc: 'Rapid response for fallen trees and broken limbs after tropical storms and hurricanes. We help Daytona Beach homeowners clear debris and restore safety to their properties quickly.',
      href: '/services/tree-services/storm-damage',
    },
    {
      name: 'Dangerous Tree Assessment',
      desc: 'ISA Tree Risk Assessment Qualified (TRAQ) evaluations for trees showing signs of structural failure, root damage, or decline. Protect your Daytona Beach property before a problem becomes an emergency.',
      href: '/services/tree-services/dangerous-trees',
    },
  ],

  // How it works
  processSteps: [
    {
      title: 'Call or Send a Request',
      desc: 'Reach out by phone or through our contact form. Describe your property and the tree work you need. We will ask a few questions to understand the scope before scheduling a visit.',
    },
    {
      title: 'On-Site Walk & Estimate',
      desc: 'We visit your Daytona Beach property, walk the site with you, assess every tree in question, and provide an honest estimate. No pressure, no inflated quotes \u2014 just straightforward pricing.',
    },
    {
      title: 'Scheduled & Completed',
      desc: 'We schedule the work at a time that fits your calendar, show up as promised, and complete the job with care. Your property is left clean and debris-free when we are done.',
    },
  ],

  // Differentiators
  differentiators: [
    {
      title: 'ISA Certified Arborist',
      desc: 'Owner Tyler Hoag holds ISA Certification FL-9491A and is Tree Risk Assessment Qualified (TRAQ). Every tree decision on your property is backed by professional training and real-world experience.',
    },
    {
      title: 'Honest, No-Pressure Estimates',
      desc: 'We walk your property, explain what we see, and give you a straightforward price. We will tell you if a tree does not actually need to come down. Our reputation depends on honesty, not upselling.',
    },
    {
      title: 'Licensed & Fully Insured',
      desc: 'Hoag Land Services is licensed and insured with HomeAdvisor Screened & Approved status. You are protected from start to finish on every project.',
    },
    {
      title: 'Daytona Beach Coastal Expertise',
      desc: 'Beachside properties face salt spray, wind shear, and sandy soils that stress trees differently than inland lots. We understand the specific challenges Daytona Beach trees face and tailor our approach to your property\'s exposure.',
    },
  ],

  // Local context (175+ words, unique to tree services)
  localContext: `<p>Daytona Beach stretches from the Atlantic barrier island across the Halifax River to the mainland, and that geographic split creates two very different environments for tree care. Beachside properties in neighborhoods like Seabreeze and Ortona contend with constant salt spray, sandy soil, and direct hurricane wind exposure. Live oaks along the coast develop dense, wind-sculpted canopies, but they still accumulate deadwood that becomes dangerous projectiles during storms. Sabal palms and cabbage palms line A1A and residential streets east of the Intracoastal, and regular frond removal keeps them healthy and reduces storm debris.</p>

<p>Mainland neighborhoods tell a different story. The established subdivisions around Indigo Lakes near the Daytona International Speedway feature mature slash pines, water oaks, and laurel oaks that have been growing for decades. Along LPGA Boulevard, communities like Pelican Bay and LPGA International sit on lots with significant tree canopy that requires routine trimming to maintain clearance over rooflines and driveways. Water oaks in particular are prone to internal decay and sudden limb failure, making periodic TRAQ assessments critical for homeowners in these areas.</p>

<p>Volusia County requires a tree removal permit for protected species, and the city of Daytona Beach has its own permitting process through the Planning Department at 301 S. Ridgewood Avenue. Replacement plantings are often required based on the cross-sectional area of the removed trunk. Our team handles these details regularly and can walk you through the requirements specific to your property\'s location within the city or unincorporated county.</p>`,

  // FAQs
  faqs: [
    {
      q: 'Do I need a permit to remove a tree in Daytona Beach?',
      a: 'In many cases, yes. Volusia County and the city of Daytona Beach both regulate removal of protected tree species. A tree survey is required, and replacement plantings may be mandated based on trunk diameter. We can guide you through the permitting process for your specific property.',
    },
    {
      q: 'How much does tree removal cost in Daytona Beach?',
      a: 'Cost depends on the tree species, size, location relative to structures, and access. Every property is different. We provide free on-site estimates so you get an accurate price based on your actual situation rather than a generic range.',
    },
    {
      q: 'What is an ISA Certified Arborist and why does it matter?',
      a: 'An ISA Certified Arborist has passed a comprehensive exam and maintains ongoing education in tree biology, diagnosis, and care practices. This certification means your trees are evaluated by someone trained to identify problems, recommend the right solution, and perform work safely.',
    },
    {
      q: 'How often should trees be trimmed in coastal Florida?',
      a: 'Most trees benefit from professional pruning every two to three years. In coastal areas like Daytona Beach, where wind and salt stress are constant factors, inspecting trees annually before hurricane season helps catch deadwood and structural weaknesses early.',
    },
    {
      q: 'Do you handle storm damage and emergency tree removal in Daytona Beach?',
      a: 'Yes. After hurricanes and severe storms, we respond to fallen trees and hazardous limbs throughout Daytona Beach and surrounding Volusia County. We prioritize situations blocking access or threatening structures.',
    },
    {
      q: 'Can you remove a tree close to my house without damaging the roof?',
      a: 'Absolutely. Our certified arborist plans each removal to protect your home, driveway, and landscaping. We use rigging techniques to lower sections in controlled pieces rather than felling the entire tree at once when structures are nearby.',
    },
    {
      q: 'What areas of Daytona Beach do you serve?',
      a: 'We serve all of Daytona Beach including beachside, mainland, Pelican Bay, LPGA Boulevard corridor, Indigo Lakes, and surrounding communities. We also serve Ormond Beach, Port Orange, DeLand, New Smyrna Beach, and Palm Coast.',
    },
  ],

  // Nearby locations
  nearbyLocations: [
    { name: 'DeLand', href: '/services/tree-services/deland' },
    { name: 'Ormond Beach', href: '/services/tree-services/ormond-beach' },
    { name: 'Port Orange', href: '/services/tree-services/port-orange' },
    {
      name: 'New Smyrna Beach',
      href: '/services/tree-services/new-smyrna-beach',
    },
    { name: 'Palm Coast', href: '/services/tree-services/palm-coast' },
  ],

  // Schema
  schema: {
    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'TreeService',
      name: 'Hoag Land Services',
      url: 'https://hlsdeland.com',
      logo: '/photos/HLSlogo-nobackground.png',
      image: '/photos/tree2.jpeg',
      description:
        'ISA Certified Arborist providing professional tree service in Daytona Beach, FL. Tree removal, tree trimming, palm pruning, and storm damage clean-up for residential and commercial properties.',
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
      slogan: 'Certified Arborist Care You Can Trust',
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
          name: 'Daytona Beach',
          item: 'https://hlsdeland.com/services/tree-services/daytona-beach',
        },
      ],
    },
    faqPage: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Do I need a permit to remove a tree in Daytona Beach?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In many cases, yes. Volusia County and the city of Daytona Beach both regulate removal of protected tree species. A tree survey is required, and replacement plantings may be mandated based on trunk diameter. We can guide you through the permitting process for your specific property.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does tree removal cost in Daytona Beach?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cost depends on the tree species, size, location relative to structures, and access. Every property is different. We provide free on-site estimates so you get an accurate price based on your actual situation rather than a generic range.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is an ISA Certified Arborist and why does it matter?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An ISA Certified Arborist has passed a comprehensive exam and maintains ongoing education in tree biology, diagnosis, and care practices. This certification means your trees are evaluated by someone trained to identify problems, recommend the right solution, and perform work safely.',
          },
        },
        {
          '@type': 'Question',
          name: 'How often should trees be trimmed in coastal Florida?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most trees benefit from professional pruning every two to three years. In coastal areas like Daytona Beach, where wind and salt stress are constant factors, inspecting trees annually before hurricane season helps catch deadwood and structural weaknesses early.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you handle storm damage and emergency tree removal in Daytona Beach?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. After hurricanes and severe storms, we respond to fallen trees and hazardous limbs throughout Daytona Beach and surrounding Volusia County. We prioritize situations blocking access or threatening structures.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you remove a tree close to my house without damaging the roof?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolutely. Our certified arborist plans each removal to protect your home, driveway, and landscaping. We use rigging techniques to lower sections in controlled pieces rather than felling the entire tree at once when structures are nearby.',
          },
        },
        {
          '@type': 'Question',
          name: 'What areas of Daytona Beach do you serve?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We serve all of Daytona Beach including beachside, mainland, Pelican Bay, LPGA Boulevard corridor, Indigo Lakes, and surrounding communities. We also serve Ormond Beach, Port Orange, DeLand, New Smyrna Beach, and Palm Coast.',
          },
        },
      ],
    },
    webPage: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Tree Service Daytona Beach FL | Hoag Land Services',
      description:
        'ISA Certified Arborist serving Daytona Beach, FL. Tree removal, trimming, and palm pruning. 5.0 stars, licensed and insured. Call for a free estimate today.',
      url: 'https://hlsdeland.com/services/tree-services/daytona-beach',
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
        url: '/photos/tree2.jpeg',
      },
      dateModified: '2026-04-10T00:00:00-04:00',
      inLanguage: 'en-US',
    },
  },
}

export default function DaytonaBeachTreeServicesPage() {
  return <LocationPage data={data} />
}
