import LocationPage from '@/components/LocationPage'
import type { LocationPageData } from '@/types/location'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Land Clearing Palm Coast FL | Hoag Land Services',
  description:
    'Professional land clearing in Palm Coast, FL. Forestry mulching, lot clearing & grading by a licensed team. 5.0 stars. Free estimates available.',
  alternates: { canonical: 'https://hlsdeland.com/services/site-work/palm-coast' },
  openGraph: {
    type: 'website',
    title: 'Land Clearing Palm Coast FL | Hoag Land Services',
    description:
      'Professional land clearing in Palm Coast, FL. Forestry mulching, lot clearing & grading by a licensed team. 5.0 stars. Free estimates available.',
    url: 'https://hlsdeland.com/services/site-work/palm-coast',
    siteName: 'Hoag Land Services',
    locale: 'en_US',
    images: [{ url: 'https://hlsdeland.com/photos/site3.jpeg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Land Clearing Palm Coast FL | Hoag Land Services',
    description:
      'Professional land clearing in Palm Coast, FL. Forestry mulching, lot clearing & grading by a licensed team. 5.0 stars. Free estimates available.',
    images: ['https://hlsdeland.com/photos/site3.jpeg'],
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
    q: 'What does land clearing in Palm Coast typically involve?',
    a: 'Land clearing in Palm Coast usually means removing palmetto scrub, slash pine, Brazilian pepper, and other dense vegetation from pre-platted residential lots that have sat undeveloped for 30 or more years. Depending on the project, it may also include stump grinding, grading, and debris removal to prepare the lot for construction or landscaping.',
  },
  {
    q: 'Does Hoag Land Services offer forestry mulching in Palm Coast?',
    a: 'Yes. Forestry mulching is one of our most requested services in Palm Coast. A mulcher head grinds standing trees, brush, and woody vegetation into mulch that stays on the ground, protecting the sandy soil from erosion without the need for burning, hauling, or heavy earthwork. It is ideal for the overgrown lots common throughout Palm Coast.',
  },
  {
    q: 'Do I need a permit to clear land in Palm Coast, FL?',
    a: 'Palm Coast has a tree preservation ordinance protecting trees with a trunk diameter of six inches or more at four and a half feet above grade. Clearing a lot with protected trees requires a permit through Building Services at 386-986-3780. We recommend confirming current requirements with the City of Palm Coast before beginning any land clearing project. We are happy to guide you through this.',
  },
  {
    q: 'How much does lot clearing cost in Palm Coast?',
    a: 'Lot clearing costs in Palm Coast depend on the lot size, vegetation density, whether protected trees are present, soil conditions, and what the land will be used for after clearing. We provide free on-site estimates so you get an honest price based on the actual conditions of your property.',
  },
  {
    q: 'Can you handle drainage and grading on Palm Coast lots?',
    a: 'Yes. Many Palm Coast lots sit on poorly drained Pomona and Immokalee fine sands where a spodic horizon creates a perched water table during wet months. We provide grading, swale construction, and drainage improvements to prepare your lot for building or to resolve standing water issues on existing properties.',
  },
  {
    q: 'What is the difference between land clearing and forestry mulching?',
    a: 'Traditional land clearing removes all vegetation and may involve hauling, burning, or burying debris. Forestry mulching grinds vegetation in place, leaving a layer of organic mulch on the soil surface. Mulching is faster, more affordable, and better for the sandy soils found throughout Palm Coast because it prevents erosion and suppresses regrowth.',
  },
  {
    q: 'Does Hoag Land Services clear lots anywhere in Palm Coast?',
    a: 'We serve all sections of Palm Coast including Pine Lakes, Belle Terre, Seminole Woods, Cypress Knoll, and the areas west of US-1 toward Bunnell. Whether your lot is a quarter acre in a subdivision or several acres on the outskirts, we have the equipment to handle it.',
  },
]

const data: LocationPageData = {
  location: 'Palm Coast',
  state: 'Florida',
  stateAbbr: 'FL',
  zipCodes: ['32137', '32164'],
  canonicalUrl: 'https://hlsdeland.com/services/site-work/palm-coast',
  primaryKeyword: 'land clearing palm coast fl',
  secondaryKeywords: [
    'lot clearing palm coast',
    'forestry mulching palm coast',
    'landscaping palm coast fl',
  ],

  title: 'Land Clearing Palm Coast FL | Hoag Land Services',
  metaDescription:
    'Professional land clearing in Palm Coast, FL. Forestry mulching, lot clearing & grading by a licensed team. 5.0 stars. Free estimates available.',
  ogImage: 'https://hlsdeland.com/photos/site3.jpeg',

  heroImage: 'https://hlsdeland.com/photos/site3.jpeg',
  h1: 'Land Clearing in Palm Coast, FL \u2014 Built on Hard Work',
  subheadline:
    'Thousands of pre-platted lots across Palm Coast have sat undeveloped since the ITT master plan of the 1970s, buried under decades of palmetto, pine, and invasive brush. Hoag Land Services turns overgrown Flagler County land into usable property.',
  ctaText: 'Call for a Free Estimate',
  ctaHref: 'tel:+13865610003',

  serviceCategory: 'site',
  serviceCategoryName: 'Site Work',

  services: [
    {
      name: 'Land Clearing',
      desc: 'Full vegetation removal for residential lots, multi-acre parcels, and commercial properties throughout Palm Coast. We clear palmetto, slash pine, hardwoods, and invasive species to prepare your land for building, fencing, or landscaping.',
      href: '/services/site-work/land-clearing',
    },
    {
      name: 'Forestry Mulching',
      desc: 'Grinding standing vegetation into mulch that stays on-site, protecting Palm Coast\'s sandy soils from erosion while suppressing regrowth. Faster and more affordable than traditional clearing with no burning or hauling required.',
      href: '/services/site-work/environmental-services',
    },
    {
      name: 'Earthworks & Excavation',
      desc: 'Soil removal, grading, building pads, roads, and pond work for Palm Coast development projects. We shape the land to meet engineering specs and Flagler County drainage requirements.',
      href: '/services/site-work/earthworks-excavation',
    },
    {
      name: 'Drainage & Grading',
      desc: 'Correct standing water problems and establish proper drainage on Palm Coast properties. Swale construction, culvert installation, and finish grading for lots with the perched water table conditions common in Flagler County soils.',
      href: '/services/site-work/drainage-grading',
    },
    {
      name: 'Erosion Control',
      desc: 'Installation and maintenance of silt fences, swales, and culverts for Palm Coast construction sites. We keep disturbed soil in place during and after land clearing, meeting local stormwater management standards.',
      href: '/services/site-work/erosion-control',
    },
    {
      name: 'Invasive Vegetation Removal',
      desc: 'Targeted removal of Brazilian pepper, melaleuca, and other invasive species overtaking Palm Coast properties. We use forestry mulching and selective clearing to restore native habitat while preparing your land for use.',
      href: '/services/site-work/invasive-vegetation-removal',
    },
  ],

  processSteps: [
    {
      title: 'Call or Submit a Request',
      desc: 'Reach out by phone or through our contact form. Describe your Palm Coast property, the size of the lot, what vegetation is present, and what you plan to use the land for. The more detail you share, the better we can prepare.',
    },
    {
      title: 'On-Site Property Walk',
      desc: 'We visit your lot, walk the site, evaluate the vegetation density and soil conditions, identify any protected trees, and provide an honest estimate. No surprises and no pressure.',
    },
    {
      title: 'Schedule and Complete',
      desc: 'Once approved, we schedule the work and mobilize our equipment. Whether it is a single residential lot or a multi-acre parcel, we clear it efficiently and leave the site ready for your next step.',
    },
  ],

  differentiators: [
    {
      title: 'Equipment for Every Scale',
      desc: 'From compact forestry mulcher heads for tight residential lots to full-size excavators for multi-acre clearing, we own the equipment to match the job. No subcontracting, no delays, and no excuses on Palm Coast projects of any size.',
    },
    {
      title: 'ISA Certified Arborist',
      desc: 'Owner Tyler Hoag holds ISA Certification FL-9491A. When your lot has protected trees that require permits or preservation, you get expert identification and guidance on compliance with Palm Coast tree ordinances before a single tree is touched.',
    },
    {
      title: 'Licensed & Insured',
      desc: 'Hoag Land Services carries full liability insurance and is HomeAdvisor Screened & Approved. Our 5.0-star Google rating across 33 reviews reflects the honest pricing and reliable work Flagler County property owners expect.',
    },
    {
      title: 'Pre-Platted Lot Specialists',
      desc: 'Palm Coast\'s grid of ITT-era lots west of US-1 and along Belle Terre and Pine Lakes often have 30 to 50 years of unchecked growth. We have cleared dozens of these lots and understand the mix of palmetto, pine, and invasive brush that defines them. We know what to expect before we arrive.',
    },
  ],

  localContext: `<p>When ITT Community Development Corporation platted Palm Coast in the late 1960s and early 1970s, they subdivided roughly 42,000 acres of Flagler County timberland into tens of thousands of residential lots. Many of those lots were sold to distant investors and never developed. Half a century later, property owners looking to build on or sell these parcels find them covered in dense palmetto scrub, slash pine, laurel oak, and invasive Brazilian pepper that has grown unchecked for decades. Land clearing in Palm Coast is not a luxury\u2014it is a prerequisite for almost any use of these long-dormant lots.</p>

<p>The soils underlying most of Palm Coast are Pomona and Immokalee fine sands, characterized by a spodic horizon that creates a perched water table during Flagler County\'s wet season from June through October. Proper grading and drainage planning are essential before construction begins. West of US-1, the terrain transitions to poorly drained pine flatwoods interspersed with cypress domes and freshwater marsh, where environmental sensitivity adds complexity to clearing projects. The coastal ridge east of I-95 supports scrub oak and sand pine communities on better-drained sands, but these areas are often subject to Flagler County\'s environmental overlay regulations.</p>

<p>For property owners preparing lots in neighborhoods like the W Section around Pine Lakes Parkway, the P Section along Belle Terre, or the expanding communities along Matanzas Woods Parkway, Hoag Land Services provides land clearing, forestry mulching, grading, and drainage solutions designed for the specific conditions of Palm Coast. We know the soil, the vegetation, and the permit requirements. Call (386) 561-0003 for a free on-site walk of your property in zip codes 32137 or 32164.</p>`,

  faqs: faqItems,

  nearbyLocations: [
    { name: 'DeLand', href: '/services/site-work/deland' },
    { name: 'Daytona Beach', href: '/services/site-work/daytona-beach' },
    { name: 'Bunnell', href: '/services/site-work/bunnell' },
    { name: 'Ormond Beach', href: '/services/site-work/ormond-beach' },
  ],

  schema: {
    localBusiness: {
      '@context': 'https://schema.org',
      '@type': 'GeneralContractor',
      name: 'Hoag Land Services',
      url: 'https://hlsdeland.com',
      logo: 'https://hlsdeland.com/photos/HLSlogo-nobackground.png',
      image: 'https://hlsdeland.com/photos/site3.jpeg',
      description:
        'Hoag Land Services provides professional land clearing in Palm Coast, FL including forestry mulching, lot clearing, grading, drainage, and erosion control for residential and commercial properties in Flagler County.',
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
          author: { '@type': 'Person', name: 'Andrea Cittadino' },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '5',
            bestRating: '5',
          },
          reviewBody:
            "We've used Hoag Land Services multiple times over the years for land clearing and tree removal. Always reliable, always honest, and the quality of work speaks for itself.",
        },
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
          name: 'Site Work',
          item: 'https://hlsdeland.com/services/site-work',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Palm Coast',
          item: 'https://hlsdeland.com/services/site-work/palm-coast',
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
      name: 'Land Clearing Palm Coast FL | Hoag Land Services',
      description:
        'Professional land clearing in Palm Coast, FL. Forestry mulching, lot clearing & grading by a licensed team. 5.0 stars. Free estimates available.',
      url: 'https://hlsdeland.com/services/site-work/palm-coast',
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
        url: 'https://hlsdeland.com/photos/site3.jpeg',
      },
      dateModified: '2026-04-10T00:00:00-04:00',
      inLanguage: 'en-US',
    },
  },
}

export default function PalmCoastSiteWorkPage() {
  return <LocationPage data={data} />
}
