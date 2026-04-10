import LocationPage from '@/components/LocationPage'
import type { LocationPageData } from '@/types/location'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fence Company Daytona Beach FL | Hoag Land Services',
  description:
    'Trusted fence contractor in Daytona Beach, FL. Wood, vinyl, and aluminum fence installation. 5.0 stars on Google, licensed and insured. Free estimates available.',
  alternates: {
    canonical: 'https://hlsdeland.com/services/fencing/daytona-beach',
  },
  openGraph: {
    type: 'website',
    title: 'Fence Company Daytona Beach FL | Hoag Land Services',
    description:
      'Trusted fence contractor in Daytona Beach, FL. Wood, vinyl, and aluminum fence installation. 5.0 stars on Google, licensed and insured. Free estimates available.',
    url: 'https://hlsdeland.com/services/fencing/daytona-beach',
    siteName: 'Hoag Land Services',
    locale: 'en_US',
    images: [
      {
        url: 'https://hlsdeland.com/photos/fence3.jpeg',
        width: 1200,
        height: 630,
        alt: 'Fence installation in Daytona Beach FL by Hoag Land Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fence Company Daytona Beach FL | Hoag Land Services',
    description:
      'Trusted fence contractor in Daytona Beach, FL. Wood, vinyl, and aluminum fence installation. 5.0 stars on Google, licensed and insured. Free estimates available.',
    images: ['https://hlsdeland.com/photos/fence3.jpeg'],
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
  canonicalUrl: 'https://hlsdeland.com/services/fencing/daytona-beach',
  primaryKeyword: 'fence company daytona beach',
  secondaryKeywords: [
    'daytona beach fence companies',
    'fence contractor daytona beach',
    'fence installation daytona beach',
  ],

  // Meta
  title: 'Fence Company Daytona Beach FL | Hoag Land Services',
  metaDescription:
    'Trusted fence contractor in Daytona Beach, FL. Wood, vinyl, and aluminum fence installation. 5.0 stars on Google, licensed and insured. Free estimates available.',
  ogImage: 'https://hlsdeland.com/photos/fence3.jpeg',

  // Hero
  heroImage: 'https://hlsdeland.com/photos/fence3.jpeg',
  h1: 'Fence Company in Daytona Beach, FL \u2014 Built Right the First Time',
  subheadline:
    'From privacy fencing for mainland subdivisions near Pelican Bay to aluminum pool enclosures meeting Volusia County barrier code, Daytona Beach homeowners need a fence contractor who does the job right. We clear the fence line, set the posts, and build a fence that lasts.',
  ctaText: 'Call for a Free Estimate',
  ctaHref: 'tel:+13865610003',

  // Service category
  serviceCategory: 'fence',
  serviceCategoryName: 'Fencing Services',

  // Services
  services: [
    {
      name: 'Wood Fencing',
      desc: 'Board fencing, privacy fencing, and horse fence for Daytona Beach residential and rural properties. We build with quality lumber and set posts to withstand Florida\'s weather and soil conditions.',
      href: '/services/fencing/wood-fencing',
    },
    {
      name: 'Vinyl Fencing',
      desc: 'Privacy, picket, and ranch style vinyl fencing that resists the salt air and humidity common in Daytona Beach. Low maintenance and long-lasting with no painting or staining required.',
      href: '/services/fencing/vinyl-fencing',
    },
    {
      name: 'Aluminum Fencing',
      desc: 'Elegant aluminum fencing for estates, pool enclosures, and residential communities throughout Daytona Beach. Corrosion-resistant and ideal for coastal properties exposed to salt spray.',
      href: '/services/fencing/aluminum-fencing',
    },
    {
      name: 'Privacy Fencing',
      desc: 'Solid privacy fencing in wood or vinyl to screen Daytona Beach yards from neighbors and road traffic. We handle fence line clearing, installation, and gate construction as a complete package.',
      href: '/services/fencing/privacy-fencing',
    },
    {
      name: 'Property Boundary Fencing',
      desc: 'Define your Daytona Beach property lines with durable boundary fencing. We work from your survey to ensure accurate placement and compliance with local setback requirements.',
      href: '/services/fencing/property-boundary',
    },
    {
      name: 'Fence Replacement',
      desc: 'Remove and replace storm-damaged, rotted, or outdated fencing on Daytona Beach properties. We tear out the old, clear the line, and install a new fence that stands up to coastal conditions.',
      href: '/services/fencing/fence-replacement',
    },
  ],

  // How it works
  processSteps: [
    {
      title: 'Call or Send a Request',
      desc: 'Reach out by phone or through our contact form. Let us know the type of fence you are interested in, your approximate footage, and any specific needs like pool barriers or livestock containment.',
    },
    {
      title: 'On-Site Walk & Estimate',
      desc: 'We visit your Daytona Beach property, walk the fence line, check for obstacles and grade changes, and give you an honest, detailed estimate. We explain your material options so you can make an informed choice.',
    },
    {
      title: 'Scheduled & Completed',
      desc: 'We schedule the installation, clear the fence line if needed, and build your fence. Posts are set properly, panels are level, and gates swing true. We clean up and walk the finished project with you.',
    },
  ],

  // Differentiators
  differentiators: [
    {
      title: 'Clearing & Fencing in One Crew',
      desc: 'Most fence companies do not clear land. We do. If your fence line is overgrown with brush, palmetto, or trees, we clear it and install the fence \u2014 one crew, one company, no coordination headaches between contractors.',
    },
    {
      title: 'Honest, No-Pressure Estimates',
      desc: 'We walk your property, explain material options and tradeoffs, and give you a clear price. We will not push you toward the most expensive option. Our job is to match the right fence to your property and budget.',
    },
    {
      title: 'Licensed & Fully Insured',
      desc: 'Hoag Land Services is licensed and insured with HomeAdvisor Screened & Approved status. Our 5.0-star Google rating across 33 reviews reflects the quality and reliability our clients expect.',
    },
    {
      title: 'Daytona Beach Property Knowledge',
      desc: 'Daytona Beach fence projects often involve sandy soil, high water tables, and HOA requirements that vary by neighborhood. We have experience setting posts in Volusia County\'s coastal conditions and know what it takes for a fence to hold up long-term here.',
    },
  ],

  // Local context (175+ words, unique to fencing)
  localContext: `<p>Fencing needs vary widely across Daytona Beach depending on whether a property sits beachside, along the Halifax River, or in one of the growing mainland subdivisions west of I-95. Beachside neighborhoods like Ortona and the Seabreeze Historic District present unique challenges for fence installers. The sandy barrier island soil requires deeper post settings, salt-laden air accelerates corrosion on metal hardware, and many beachside lots have narrow setbacks that demand precise placement to comply with city codes. Aluminum and vinyl fencing tend to outperform wood in these high-exposure zones because they resist rust and do not absorb moisture the way pressure-treated lumber does over time.</p>

<p>On the mainland, neighborhoods around Indigo Lakes near the Daytona International Speedway and the residential communities off Beville Road and Nova Road feature larger lots where wood privacy fencing and property boundary fencing are the most common requests. Homeowners in subdivisions like Country Club Harbor along the Halifax River often need pool barrier fencing that meets Florida\'s residential pool safety requirements under Chapter 515 of Florida Statutes. The Pelican Bay community and other HOA-governed neighborhoods off LPGA Boulevard typically have architectural guidelines specifying fence materials, heights, and colors that must be followed.</p>

<p>The city of Daytona Beach requires a site plan showing proposed fence location for projects that fall under their permitting jurisdiction. In general, residential fences in Volusia County cannot exceed six feet along rear and side property lines and four feet in front yards. Corner lots and waterfront properties have additional restrictions. Fences must be oriented with the finished side facing outward. We handle these details as part of every project and will confirm your specific requirements before any materials are ordered or posts are set.</p>`,

  // FAQs
  faqs: [
    {
      q: 'Do I need a permit to install a fence in Daytona Beach?',
      a: 'It depends on your property\'s location. In unincorporated Volusia County, residential fences are generally exempt unless they serve as a pool safety barrier. Within the city of Daytona Beach, a site plan may be required. We confirm the requirements for your specific address before starting work.',
    },
    {
      q: 'What type of fence lasts longest in Daytona Beach coastal conditions?',
      a: 'Aluminum and vinyl fencing perform best near the coast because they resist salt corrosion and moisture absorption. For mainland properties with less salt exposure, pressure-treated wood fencing also holds up well with proper installation and occasional maintenance.',
    },
    {
      q: 'How much does fence installation cost in Daytona Beach?',
      a: 'Cost varies by material, linear footage, terrain, and whether fence line clearing is needed. We provide free on-site estimates based on your actual property rather than generic per-foot pricing. Every property is different.',
    },
    {
      q: 'Can you clear my fence line before installing the fence?',
      a: 'Yes. Unlike most fence contractors, we are a full site work and land clearing company. If your fence line is overgrown with brush, trees, or palmetto, we clear it as part of the project. One crew handles everything.',
    },
    {
      q: 'What are the fence height limits in Daytona Beach?',
      a: 'Residential fences in Volusia County generally cannot exceed six feet along side and rear property lines and four feet in front yards. Corner lots and waterfront properties may have additional restrictions. We confirm the regulations for your specific lot during the estimate visit.',
    },
    {
      q: 'Do Daytona Beach HOAs have fence requirements?',
      a: 'Many do. Communities like Pelican Bay, LPGA International, and Halifax Plantation have architectural review boards that specify approved fence materials, colors, and styles. We work within HOA guidelines and can help you select options that meet your association\'s standards.',
    },
    {
      q: 'How long does a typical fence installation take in Daytona Beach?',
      a: 'Most residential fence installations take two to four days depending on footage, material type, and site conditions. If fence line clearing is needed, that may add a day. We provide a clear timeline when we give your estimate.',
    },
  ],

  // Nearby locations
  nearbyLocations: [
    { name: 'DeLand', href: '/services/fencing/deland' },
    { name: 'Ormond Beach', href: '/services/fencing/ormond-beach' },
    { name: 'Port Orange', href: '/services/fencing/port-orange' },
    {
      name: 'New Smyrna Beach',
      href: '/services/fencing/new-smyrna-beach',
    },
    { name: 'Palm Coast', href: '/services/fencing/palm-coast' },
  ],

  // Schema
  schema: {
    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'FenceContractor',
      name: 'Hoag Land Services',
      url: 'https://hlsdeland.com',
      logo: 'https://hlsdeland.com/photos/HLSlogo-nobackground.png',
      image: 'https://hlsdeland.com/photos/fence3.jpeg',
      description:
        'Trusted fence company in Daytona Beach, FL. Professional fence installation including wood, vinyl, and aluminum fencing for residential and commercial properties. Licensed and insured fence contractor.',
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
      slogan: 'Built Right the First Time',
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
          name: 'Daytona Beach',
          item: 'https://hlsdeland.com/services/fencing/daytona-beach',
        },
      ],
    },
    faqPage: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Do I need a permit to install a fence in Daytona Beach?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "It depends on your property's location. In unincorporated Volusia County, residential fences are generally exempt unless they serve as a pool safety barrier. Within the city of Daytona Beach, a site plan may be required. We confirm the requirements for your specific address before starting work.",
          },
        },
        {
          '@type': 'Question',
          name: 'What type of fence lasts longest in Daytona Beach coastal conditions?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Aluminum and vinyl fencing perform best near the coast because they resist salt corrosion and moisture absorption. For mainland properties with less salt exposure, pressure-treated wood fencing also holds up well with proper installation and occasional maintenance.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does fence installation cost in Daytona Beach?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cost varies by material, linear footage, terrain, and whether fence line clearing is needed. We provide free on-site estimates based on your actual property rather than generic per-foot pricing. Every property is different.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you clear my fence line before installing the fence?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Unlike most fence contractors, we are a full site work and land clearing company. If your fence line is overgrown with brush, trees, or palmetto, we clear it as part of the project. One crew handles everything.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the fence height limits in Daytona Beach?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Residential fences in Volusia County generally cannot exceed six feet along side and rear property lines and four feet in front yards. Corner lots and waterfront properties may have additional restrictions. We confirm the regulations for your specific lot during the estimate visit.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do Daytona Beach HOAs have fence requirements?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Many do. Communities like Pelican Bay, LPGA International, and Halifax Plantation have architectural review boards that specify approved fence materials, colors, and styles. We work within HOA guidelines and can help you select options that meet your association's standards.",
          },
        },
        {
          '@type': 'Question',
          name: 'How long does a typical fence installation take in Daytona Beach?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most residential fence installations take two to four days depending on footage, material type, and site conditions. If fence line clearing is needed, that may add a day. We provide a clear timeline when we give your estimate.',
          },
        },
      ],
    },
    webPage: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Fence Company Daytona Beach FL | Hoag Land Services',
      description:
        'Trusted fence contractor in Daytona Beach, FL. Wood, vinyl, and aluminum fence installation. 5.0 stars on Google, licensed and insured. Free estimates available.',
      url: 'https://hlsdeland.com/services/fencing/daytona-beach',
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
        url: 'https://hlsdeland.com/photos/fence3.jpeg',
      },
      dateModified: '2026-04-10T00:00:00-04:00',
      inLanguage: 'en-US',
    },
  },
}

export default function DaytonaBeachFencingPage() {
  return <LocationPage data={data} />
}
