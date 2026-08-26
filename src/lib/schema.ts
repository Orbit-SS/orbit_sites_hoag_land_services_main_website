/**
 * Centralized JSON-LD schema generators.
 *
 * Every page-level schema should be created via these helpers so we can update
 * the structured data shape in one place. Pages render the result like:
 *
 *   <script type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }} />
 *
 * Anything that wraps multiple schemas can use jsonLd() to render an array.
 */

import {
  SITE_URL,
  COMPANY,
  COMPANY_LLC,
  PHONE,
  EMAIL,
  OWNER,
  EST_YEAR,
  REVIEW_STATS,
  REVIEWS,
  FACEBOOK,
  INSTAGRAM,
  IMAGES,
} from '@/shared/constants'
import { ALL_LOCATIONS } from '@/data/locations'

const BASE_PHONE = '+1-386-561-0003'

const ADDRESS = {
  '@type': 'PostalAddress',
  addressLocality: 'DeLeon Springs',
  addressRegion: 'FL',
  postalCode: '32130',
  addressCountry: 'US',
}

const HQ_GEO = {
  '@type': 'GeoCoordinates',
  latitude: 29.1244,
  longitude: -81.3584,
}

const OPENING_HOURS = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '07:00',
    closes: '18:00',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: 'Saturday',
    opens: '08:00',
    closes: '14:00',
  },
]

const COUNTY_AREA_SERVED = [
  'Volusia County',
  'Flagler County',
  'Seminole County',
  'Orange County',
  'Lake County',
  'Putnam County',
  'St. Johns County',
  'Marion County',
  'Brevard County',
].map(name => ({ '@type': 'AdministrativeArea', name: `${name}, FL` }))

const SAME_AS = [FACEBOOK, INSTAGRAM]

const AGGREGATE_RATING = {
  '@type': 'AggregateRating',
  ratingValue: String(REVIEW_STATS.stars),
  reviewCount: String(REVIEW_STATS.count),
  bestRating: '5',
  worstRating: '1',
}

const REVIEW_LIST = REVIEWS.map(r => ({
  '@type': 'Review',
  author: { '@type': 'Person', name: r.name },
  reviewRating: { '@type': 'Rating', ratingValue: String(r.rating), bestRating: '5' },
  reviewBody: r.text,
}))

/** Absolute URL helper — accepts relative or absolute path */
export function abs(path: string): string {
  if (!path) return SITE_URL
  if (path.startsWith('http')) return path
  return path.startsWith('/') ? `${SITE_URL}${path}` : `${SITE_URL}/${path}`
}

/**
 * Site-wide LocalBusiness schema for homepage / contact.
 *
 * Deliberately carries no aggregateRating. Google expects an aggregate rating
 * on the page that actually presents the reviews — /reviews builds its own
 * node for that. Repeating it here put an unverified rating on every URL.
 */
export function localBusinessSchema(opts: { url?: string; image?: string } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#organization`,
    name: COMPANY,
    legalName: COMPANY_LLC,
    url: opts.url ? abs(opts.url) : SITE_URL,
    logo: abs(IMAGES.logo),
    image: abs(opts.image ?? IMAGES.og),
    description:
      'Professional land clearing, tree services, and fencing for residential and commercial properties in Central Florida. ISA Certified Arborist. Licensed and Insured. Est. 2017.',
    telephone: BASE_PHONE,
    email: EMAIL,
    foundingDate: String(EST_YEAR),
    founder: { '@type': 'Person', name: OWNER, jobTitle: 'CEO / ISA Certified Arborist' },
    address: ADDRESS,
    geo: HQ_GEO,
    areaServed: [{ '@type': 'State', name: 'Florida' }, ...COUNTY_AREA_SERVED],
    sameAs: SAME_AS,
    priceRange: '$$',
    openingHoursSpecification: OPENING_HOURS,
    hasCredential: [
      { '@type': 'EducationalOccupationalCredential', credentialCategory: 'ISA Certified Arborist', name: 'FL-9491A' },
      { '@type': 'EducationalOccupationalCredential', credentialCategory: 'ISA TRAQ', name: 'Tree Risk Assessment Qualified' },
    ],
  }
}

/** Organization schema (for /about — overlaps with LocalBusiness but more entity-focused) */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization-about`,
    name: COMPANY,
    legalName: COMPANY_LLC,
    url: SITE_URL,
    logo: abs(IMAGES.logo),
    foundingDate: String(EST_YEAR),
    founder: { '@type': 'Person', name: OWNER, jobTitle: 'CEO / ISA Certified Arborist' },
    address: ADDRESS,
    telephone: BASE_PHONE,
    email: EMAIL,
    sameAs: SAME_AS,
  }
}

type ServiceSchemaInput = {
  /** e.g. "Tree Removal", "Wood Fencing" */
  serviceType: string
  /** Page name / display title */
  name: string
  /** 1-2 sentence description */
  description: string
  /** Absolute or relative page URL */
  url: string
  /** Hero image for the service */
  image?: string
  /** If city-specific, the city name */
  city?: string
  /** If state-specific (default Florida) */
  areaName?: string
}

/** Service schema for service hubs, subservices, pain-point pages, city pages */
export function serviceSchema(input: ServiceSchemaInput) {
  const url = abs(input.url)
  const areaServed = input.city
    ? { '@type': 'City', name: input.city, containedInPlace: { '@type': 'State', name: 'Florida' } }
    : { '@type': 'State', name: input.areaName ?? 'Florida' }

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    serviceType: input.serviceType,
    name: input.name,
    description: input.description,
    url,
    image: input.image ? abs(input.image) : abs(IMAGES.og),
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed,
  }
}

/** FAQPage schema — pass through the same FAQs the page renders */
export function faqSchema(faqs: ReadonlyArray<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/** BreadcrumbList schema — pass an ordered list of crumbs */
export function breadcrumbSchema(crumbs: ReadonlyArray<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.url),
    })),
  }
}

/** WebPage schema — gives Google additional page-level context */
export function webPageSchema(input: { name: string; description: string; url: string; image?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: input.name,
    description: input.description,
    url: abs(input.url),
    isPartOf: { '@type': 'WebSite', url: SITE_URL, name: COMPANY },
    about: { '@id': `${SITE_URL}/#organization` },
    primaryImageOfPage: input.image ? { '@type': 'ImageObject', url: abs(input.image) } : undefined,
    inLanguage: 'en-US',
  }
}

/** Render helper — single schema as a JSON-LD <script> string */
export function jsonLd(schema: object | object[]) {
  return JSON.stringify(schema)
}

/** Get the list of cities for areaServed in the homepage LocalBusiness */
export function allCityAreasServed() {
  return ALL_LOCATIONS.map(loc => ({ '@type': 'City', name: `${loc.name}, FL` }))
}
