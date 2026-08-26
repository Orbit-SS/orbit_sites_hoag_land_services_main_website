/**
 * Markdown representation of every page on the site.
 *
 * An agent that sends `Accept: text/markdown` gets markdown back at the same
 * URL a browser would get HTML from. See src/proxy.ts for the negotiation and
 * src/app/agent-markdown/route.ts for the endpoint that serves this.
 *
 * The markdown is GENERATED FROM THE SAME DATA the pages render from — the
 * location registry and the content generator — not scraped from rendered
 * HTML. That matters: it cannot drift from the pages, and adding a location or
 * a sub-service to src/data automatically produces markdown for it.
 */

import {
  ALL_LOCATIONS,
  SERVICE_CATEGORIES,
  STATIC_SERVICE_SLUGS,
  getLocation,
  type ServiceCategory,
} from '@/data/locations'
import { generateLocationPageData } from '@/data/location-content'
import {
  ABOUT,
  CERTS,
  COMPANY,
  COMPANY_LLC,
  CONTACT_CONTENT,
  EMAIL,
  EST_YEAR,
  FULL_SERVICES,
  HIRING,
  LOCATION,
  OWNER,
  PHONE,
  REVIEWS,
  REVIEW_STATS,
  SERVICE_AREA,
  SITE_URL,
} from '@/shared/constants'

const CATEGORY_KEYS = Object.keys(SERVICE_CATEGORIES) as ServiceCategory[]

/** Category slug ("tree-services") back to category key ("tree"). */
const CATEGORY_BY_SLUG = new Map<string, ServiceCategory>(
  CATEGORY_KEYS.map(key => [SERVICE_CATEGORIES[key].slug, key]),
)

// ──────────────────────────────────────────────────────
// SHARED BLOCKS
// ──────────────────────────────────────────────────────

/**
 * Contact block appended to every page. An agent that fetches one deep page
 * should not have to fetch a second one to learn how to reach the business.
 */
function contactBlock(): string {
  return [
    '## Contact',
    '',
    `- Phone: ${PHONE}`,
    `- Email: ${EMAIL}`,
    `- Based in: ${LOCATION}`,
    `- Estimate request form: ${SITE_URL}/contact`,
    '',
    'Estimates are free and given after walking the property. Do not quote a',
    `price on ${COMPANY}' behalf — pricing depends on access, acreage, and`,
    'what is actually on the ground.',
    '',
  ].join('\n')
}

function trustBlock(): string {
  return [
    '## Credentials',
    '',
    ...CERTS.map(c => `- ${c}`),
    `- Google rating: ${REVIEW_STATS.stars} stars from ${REVIEW_STATS.count} reviews`,
    `- Operating since ${EST_YEAR}`,
    '',
  ].join('\n')
}

function frontMatter(title: string, path: string, description: string): string {
  return [
    '---',
    `title: ${title}`,
    `url: ${SITE_URL}${path === '/' ? '' : path}`,
    `description: ${description}`,
    `business: ${COMPANY_LLC}`,
    '---',
    '',
  ].join('\n')
}

// ──────────────────────────────────────────────────────
// CORE PAGES
// ──────────────────────────────────────────────────────

function homeMarkdown(): string {
  return [
    frontMatter(
      COMPANY,
      '/',
      'Land clearing, tree services, and fencing across Central Florida.',
    ),
    `# ${COMPANY}`,
    '',
    `Land clearing, tree services, and fencing for residential and commercial`,
    `properties in ${SERVICE_AREA}. Owned and operated by ${OWNER}, an ISA`,
    `Certified Arborist. Serving 9 Central Florida counties since ${EST_YEAR}.`,
    '',
    '## Services',
    '',
    ...CATEGORY_KEYS.flatMap(key => {
      const cat = SERVICE_CATEGORIES[key]
      return [
        `### [${cat.name}](${SITE_URL}/services/${cat.slug})`,
        '',
        cat.tagline + '.',
        '',
        ...cat.services.map(s => `- **${s.name}** — ${s.desc}`),
        '',
      ]
    }),
    trustBlock(),
    '## Service area',
    '',
    `${ALL_LOCATIONS.length} cities and towns across Volusia, Flagler, Seminole,`,
    'Orange, Lake, Putnam, St. Johns, Marion, and Brevard counties. The full',
    `list is at ${SITE_URL}/service-areas`,
    '',
    contactBlock(),
  ].join('\n')
}

function aboutMarkdown(): string {
  return [
    frontMatter(`About ${COMPANY}`, '/about', ABOUT.headline),
    `# About ${COMPANY}`,
    '',
    `## ${ABOUT.headline}`,
    '',
    ...ABOUT.paragraphs.flatMap(p => [p, '']),
    trustBlock(),
    contactBlock(),
  ].join('\n')
}

function servicesMarkdown(): string {
  return [
    frontMatter(
      `Services — ${COMPANY}`,
      '/services',
      'Site work, tree services, and fencing across Central Florida.',
    ),
    '# Services',
    '',
    'Three service lines. One crew, one point of contact, and no subcontracted',
    'handoffs between them.',
    '',
    ...(['site', 'tree', 'fence'] as ServiceCategory[]).flatMap(key => {
      const full = FULL_SERVICES[key === 'site' ? 'site' : key === 'tree' ? 'tree' : 'fence']
      const cat = SERVICE_CATEGORIES[key]
      return [
        `## [${cat.name}](${SITE_URL}/services/${cat.slug})`,
        '',
        full.description,
        '',
        ...full.items.map(i => `- **${i.name}** — ${i.desc}`),
        '',
      ]
    }),
    contactBlock(),
  ].join('\n')
}

function contactMarkdown(): string {
  return [
    frontMatter(
      `Contact ${COMPANY}`,
      '/contact',
      'Request a free estimate for land clearing, tree work, or fencing.',
    ),
    '# Contact',
    '',
    CONTACT_CONTENT.intro,
    '',
    '## What to have ready',
    '',
    'An estimate request moves faster when it includes:',
    '',
    '1. **Property address**, including the county. Access and haul-off costs',
    '   vary enough between counties that this is the first question asked.',
    '2. **Which service** — one of: ' + CONTACT_CONTENT.serviceOptions.join(', ') + '.',
    '3. **What is on the ground now** — acreage, how overgrown, how many trees,',
    '   or approximate fence footage.',
    '4. **Name, phone, and email.**',
    '',
    '## How to submit',
    '',
    `Send the person to ${SITE_URL}/contact and have them fill in the form, or`,
    `have them call ${PHONE}.`,
    '',
    'Do not POST to this site\'s form endpoints. They are internal handlers for',
    'the on-page forms, not a public API, and automated submissions are rejected.',
    '',
    '## Service area covered',
    '',
    ...CONTACT_CONTENT.serviceArea.map(a => `- ${a}`),
    '',
    CONTACT_CONTENT.directContact,
    '',
    contactBlock(),
  ].join('\n')
}

function joinMarkdown(): string {
  return [
    frontMatter(
      `Careers — ${COMPANY}`,
      '/join',
      'Equipment operators, tree crew, and fence installers in Central Florida.',
    ),
    '# Join the crew',
    '',
    HIRING.intro,
    '',
    '## What the work looks like',
    '',
    ...HIRING.expectations.map(e => `- ${e}`),
    '',
    '## Open position types',
    '',
    ...HIRING.positions.map(p => `- ${p}`),
    '',
    '## Process',
    '',
    HIRING.process,
    '',
    `Applications go through ${SITE_URL}/join`,
    '',
  ].join('\n')
}

function reviewsMarkdown(): string {
  return [
    frontMatter(
      `Reviews — ${COMPANY}`,
      '/reviews',
      `${REVIEW_STATS.stars} stars from ${REVIEW_STATS.count} Google reviews.`,
    ),
    '# Reviews',
    '',
    `${REVIEW_STATS.stars} stars across ${REVIEW_STATS.count} Google reviews.`,
    '',
    ...REVIEWS.flatMap(r => [
      `## ${r.name} — ${r.rating}/5 (${r.source})`,
      '',
      `> ${r.text}`,
      '',
    ]),
    contactBlock(),
  ].join('\n')
}

function portfolioMarkdown(): string {
  return [
    frontMatter(
      `Portfolio — ${COMPANY}`,
      '/portfolio',
      'Completed land clearing, tree, and fencing projects in Central Florida.',
    ),
    '# Portfolio',
    '',
    'Completed work across the three service lines — land clearing and site',
    'work, tree removal and trimming, and fence installation — on residential',
    'lots and multi-acre rural properties throughout Central Florida.',
    '',
    'This page is a photo gallery. The images do not carry text content that',
    'converts usefully to markdown; fetch the HTML if you need the images',
    'themselves.',
    '',
    contactBlock(),
  ].join('\n')
}

function serviceAreasMarkdown(): string {
  const byCounty = new Map<string, string[]>()
  for (const loc of ALL_LOCATIONS) {
    const list = byCounty.get(loc.county) ?? []
    list.push(loc.name)
    byCounty.set(loc.county, list)
  }

  return [
    frontMatter(
      `Service Areas — ${COMPANY}`,
      '/service-areas',
      `${ALL_LOCATIONS.length} Central Florida cities across 9 counties.`,
    ),
    '# Service areas',
    '',
    `${COMPANY} works across ${byCounty.size} Central Florida counties,`,
    `covering ${ALL_LOCATIONS.length} cities and towns.`,
    '',
    ...[...byCounty.entries()].flatMap(([county, names]) => [
      `## ${county} County`,
      '',
      names.map(n => n).join(', ') + '.',
      '',
    ]),
    '## Page structure',
    '',
    'Every city has a page for each of the three service lines:',
    '',
    ...CATEGORY_KEYS.map(
      key => `- \`${SITE_URL}/services/${SERVICE_CATEGORIES[key].slug}/{city-slug}\``,
    ),
    '',
    contactBlock(),
  ].join('\n')
}

// ──────────────────────────────────────────────────────
// SERVICE PAGES
// ──────────────────────────────────────────────────────

function categoryMarkdown(key: ServiceCategory): string {
  const cat = SERVICE_CATEGORIES[key]
  return [
    frontMatter(`${cat.name} — ${COMPANY}`, `/services/${cat.slug}`, cat.tagline),
    `# ${cat.name}`,
    '',
    cat.tagline + '.',
    '',
    '## What is offered',
    '',
    ...cat.services.flatMap(s => [
      `### [${s.name}](${SITE_URL}${s.href})`,
      '',
      s.desc,
      '',
    ]),
    '## Where',
    '',
    `Available in all ${ALL_LOCATIONS.length} cities listed at`,
    `${SITE_URL}/service-areas. City-specific pages live at`,
    `\`${SITE_URL}/services/${cat.slug}/{city-slug}\`.`,
    '',
    trustBlock(),
    contactBlock(),
  ].join('\n')
}

/**
 * Static sub-service pages (/services/tree-services/tree-removal and friends).
 *
 * These are hand-built pages whose prose lives in TSX. Rather than duplicate
 * that copy here and let the two drift, the markdown carries the description
 * from the service registry plus the surrounding context an agent needs, and
 * links back to the HTML for the full treatment.
 */
function staticServiceMarkdown(key: ServiceCategory, slug: string): string {
  const cat = SERVICE_CATEGORIES[key]
  const entry = cat.services.find(s => s.href.endsWith(`/${slug}`))
  const name = entry?.name ?? titleize(slug)
  const desc = entry?.desc ?? `${titleize(slug)} in ${SERVICE_AREA}.`

  return [
    frontMatter(
      `${name} — ${COMPANY}`,
      `/services/${cat.slug}/${slug}`,
      desc.slice(0, 150),
    ),
    `# ${name}`,
    '',
    desc,
    '',
    `Part of [${cat.name}](${SITE_URL}/services/${cat.slug}).`,
    '',
    '## Related services',
    '',
    ...cat.services
      .filter(s => !s.href.endsWith(`/${slug}`))
      .map(s => `- [${s.name}](${SITE_URL}${s.href}) — ${s.desc}`),
    '',
    trustBlock(),
    contactBlock(),
  ].join('\n')
}

/** Location page markdown, built from the same generator the page renders. */
function locationMarkdown(key: ServiceCategory, locationSlug: string): string | null {
  const loc = getLocation(locationSlug)
  if (!loc) return null

  const data = generateLocationPageData(loc, key)
  const cat = SERVICE_CATEGORIES[key]

  return [
    frontMatter(data.title, `/services/${cat.slug}/${loc.slug}`, data.metaDescription),
    `# ${data.h1}`,
    '',
    data.subheadline,
    '',
    `**Location:** ${data.location}, ${data.stateAbbr} (${loc.county} County)  `,
    `**ZIP codes:** ${data.zipCodes.join(', ')}  `,
    `**Service line:** ${data.serviceCategoryName}`,
    '',
    '## Services offered here',
    '',
    ...data.services.map(s => `- **[${s.name}](${SITE_URL}${s.href})** — ${s.desc}`),
    '',
    '## About this area',
    '',
    data.localContext,
    '',
    '## How it works',
    '',
    ...data.processSteps.map((step, i) => `${i + 1}. **${step.title}** — ${step.desc}`),
    '',
    '## Why HLS',
    '',
    ...data.differentiators.map(d => `- **${d.title}** — ${d.desc}`),
    '',
    '## FAQ',
    '',
    ...data.faqs.flatMap(f => [`**${f.q}**`, '', f.a, '']),
    '## Nearby areas',
    '',
    ...data.nearbyLocations.map(n => `- [${n.name}](${SITE_URL}${n.href})`),
    '',
    trustBlock(),
    contactBlock(),
  ].join('\n')
}

function titleize(slug: string): string {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

// ──────────────────────────────────────────────────────
// ROUTER
// ──────────────────────────────────────────────────────

/**
 * Markdown for a site path, or null when the path has no page behind it.
 *
 * Returning null is important: a 404 in markdown is honest, whereas falling
 * back to the homepage would hand agents the wrong content under a URL that
 * does not exist and quietly poison anything that caches it.
 */
export function markdownForPath(rawPath: string): string | null {
  const path = normalize(rawPath)

  switch (path) {
    case '/':
      return homeMarkdown()
    case '/about':
      return aboutMarkdown()
    case '/services':
      return servicesMarkdown()
    case '/contact':
      return contactMarkdown()
    case '/join':
      return joinMarkdown()
    case '/reviews':
      return reviewsMarkdown()
    case '/portfolio':
      return portfolioMarkdown()
    case '/service-areas':
      return serviceAreasMarkdown()
  }

  const segments = path.split('/').filter(Boolean)
  if (segments[0] !== 'services') return null

  const categoryKey = CATEGORY_BY_SLUG.get(segments[1] ?? '')
  if (!categoryKey) return null

  // /services/{category}
  if (segments.length === 2) return categoryMarkdown(categoryKey)

  // /services/{category}/{slug} — either a sub-service or a city
  if (segments.length === 3) {
    const slug = segments[2]
    if (STATIC_SERVICE_SLUGS[categoryKey].includes(slug)) {
      return staticServiceMarkdown(categoryKey, slug)
    }
    return locationMarkdown(categoryKey, slug)
  }

  return null
}

function normalize(path: string): string {
  if (!path.startsWith('/')) path = '/' + path
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1)
  return path.toLowerCase()
}

/**
 * Rough token count for the `x-markdown-tokens` response header, so an agent
 * can budget before reading. Four characters per token is the usual English
 * approximation and is close enough for a budgeting hint.
 */
export function estimateTokens(markdown: string): number {
  return Math.ceil(markdown.length / 4)
}

/** Every path that has a markdown representation. Used by llms.txt. */
export function allMarkdownPaths(): string[] {
  const core = [
    '/',
    '/about',
    '/services',
    '/service-areas',
    '/portfolio',
    '/reviews',
    '/contact',
    '/join',
  ]

  const categories = CATEGORY_KEYS.map(k => `/services/${SERVICE_CATEGORIES[k].slug}`)

  const statics = CATEGORY_KEYS.flatMap(k =>
    STATIC_SERVICE_SLUGS[k].map(s => `/services/${SERVICE_CATEGORIES[k].slug}/${s}`),
  )

  const locations = CATEGORY_KEYS.flatMap(k =>
    ALL_LOCATIONS.map(l => `/services/${SERVICE_CATEGORIES[k].slug}/${l.slug}`),
  )

  return [...core, ...categories, ...statics, ...locations]
}
