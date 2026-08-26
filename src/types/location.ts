export interface LocationReview {
  name: string
  source: string
  rating: number
  text: string
  date?: string
}

export interface FAQItem {
  q: string
  a: string
}

export interface ServiceCard {
  name: string
  desc: string
  href: string
}

export interface TrustSignal {
  label: string
  icon?: string
}

export interface NearbyLocation {
  name: string
  href: string
}

export interface LocationPageData {
  // Core SEO
  location: string
  state: string
  stateAbbr: string
  zipCodes: string[]
  canonicalUrl: string
  primaryKeyword: string
  secondaryKeywords: string[]

  // Meta
  title: string // max 60 chars
  metaDescription: string // 140-155 chars
  ogImage: string

  // Hero
  heroImage: string
  h1: string
  subheadline: string
  ctaText: string
  ctaHref: string

  // Service category: 'tree' | 'site' | 'fence'
  serviceCategory: 'tree' | 'site' | 'fence'
  serviceCategoryName: string

  // Services for this category in this location
  services: ServiceCard[]

  // How it works - 3 steps
  processSteps: {
    title: string
    desc: string
  }[]

  // Why choose us - 3-4 blocks
  differentiators: {
    title: string
    desc: string
  }[]

  // Local area context - 175+ words, unique per page
  localContext: string

  // Optional "What's Included" feature checklist (renders between localContext and FAQ)
  whatsIncluded?: {
    eyebrow?: string
    heading?: string
    intro?: string
    items: Array<{ title: string; desc: string; href?: string }>
  }

  // Optional "Recent Projects" photo evidence block (renders between whatsIncluded and FAQ)
  recentProjects?: {
    eyebrow?: string
    heading?: string
    intro?: string
    items: Array<{
      image: string
      alt: string
      title: string
      desc: string
      location?: string
      service?: string
      /** CSS object-position override for the image (e.g. 'center bottom') */
      imagePos?: string
    }>
  }

  // FAQ - 5-7 items, at least 2 naming the location
  faqs: FAQItem[]

  // Nearby location links for footer
  nearbyLocations: NearbyLocation[]

  // Schema data
  schema: {
    localBusiness: Record<string, unknown>
    breadcrumbs: Record<string, unknown>
    faqPage: Record<string, unknown>
    webPage: Record<string, unknown>
    service?: Record<string, unknown>
    howTo?: Record<string, unknown>
  }
}
