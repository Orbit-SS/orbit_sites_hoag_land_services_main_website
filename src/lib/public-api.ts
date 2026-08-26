import {
  ALL_LOCATIONS,
  SERVICE_CATEGORIES,
  STATIC_SERVICE_SLUGS,
  getLocation,
  type ServiceCategory,
} from '@/data/locations'
import {
  CERTS,
  COMPANY,
  COMPANY_LLC,
  EMAIL,
  EST_YEAR,
  FACEBOOK,
  INSTAGRAM,
  LOCATION,
  OWNER,
  PHONE,
  REVIEWS,
  REVIEW_STATS,
  SERVICE_AREA,
  SITE_URL,
} from '@/shared/constants'

/**
 * The public read-only API.
 *
 * Three facts shaped everything here:
 *
 *  1. It is READ-ONLY. There is no write surface, so there is nothing to
 *     authenticate and nothing to abuse beyond bandwidth.
 *  2. It exposes NO personal data. Business contact details, service
 *     descriptions, and city coverage — all of it is already on the public
 *     pages. Nothing about a customer or a lead is reachable from here.
 *  3. It is the same data the pages render from, so it cannot drift.
 *
 * It exists so that agent discovery documents point at something real: the API
 * catalog at /.well-known/api-catalog and the MCP server at /api/mcp both
 * describe THIS, rather than describing the internal form handlers, which are
 * not a public API and reject automated traffic.
 */

const CATEGORY_KEYS = Object.keys(SERVICE_CATEGORIES) as ServiceCategory[]

export function companyPayload() {
  return {
    name: COMPANY,
    legalName: COMPANY_LLC,
    owner: OWNER,
    established: EST_YEAR,
    basedIn: LOCATION,
    serviceArea: SERVICE_AREA,
    phone: PHONE,
    email: EMAIL,
    website: SITE_URL,
    certifications: CERTS,
    rating: {
      value: REVIEW_STATS.stars,
      count: REVIEW_STATS.count,
      source: 'Google',
    },
    social: {
      facebook: FACEBOOK,
      instagram: INSTAGRAM,
    },
    estimateRequestUrl: `${SITE_URL}/contact`,
    // Stated explicitly so an agent does not go looking for a booking endpoint.
    booking: {
      automated: false,
      note: 'Estimates are free and given after walking the property. There is no automated booking endpoint; send people to the contact form or the phone number.',
    },
  }
}

export function servicesPayload() {
  return {
    categories: CATEGORY_KEYS.map(key => {
      const cat = SERVICE_CATEGORIES[key]
      return {
        id: key,
        name: cat.name,
        slug: cat.slug,
        tagline: cat.tagline,
        url: `${SITE_URL}/services/${cat.slug}`,
        services: cat.services.map(s => ({
          name: s.name,
          description: s.desc,
          url: `${SITE_URL}${s.href}`,
        })),
        // Sub-service page slugs, useful for constructing URLs directly.
        pageSlugs: STATIC_SERVICE_SLUGS[key],
      }
    }),
  }
}

export function serviceAreasPayload() {
  const counties = [...new Set(ALL_LOCATIONS.map(l => l.county))].sort()

  return {
    counties: counties.map(county => ({
      name: county,
      state: 'FL',
      cities: ALL_LOCATIONS.filter(l => l.county === county).map(l => ({
        name: l.name,
        slug: l.slug,
        zipCodes: l.zipCodes,
        pages: CATEGORY_KEYS.reduce<Record<string, string>>((acc, key) => {
          acc[key] = `${SITE_URL}/services/${SERVICE_CATEGORIES[key].slug}/${l.slug}`
          return acc
        }, {}),
      })),
    })),
    totals: {
      counties: counties.length,
      cities: ALL_LOCATIONS.length,
    },
  }
}

/**
 * Coverage lookup for a single place. Matches on slug, then on name, then on
 * ZIP. Returns a `covered: false` answer rather than a 404 so an agent gets a
 * usable answer instead of an error to interpret.
 */
export function coverageFor(query: string) {
  const needle = query.trim().toLowerCase()

  const bySlug = getLocation(needle.replace(/\s+/g, '-'))
  const byName = ALL_LOCATIONS.find(l => l.name.toLowerCase() === needle)
  const byZip = ALL_LOCATIONS.find(l => l.zipCodes.includes(needle))
  const match = bySlug ?? byName ?? byZip

  if (!match) {
    return {
      query,
      covered: false,
      note: `No page exists for "${query}". That does not always mean the job cannot be taken — Central Florida work just outside the listed counties is sometimes accepted depending on size. Send the enquiry to ${SITE_URL}/contact or call ${PHONE} rather than refusing.`,
      counties: [...new Set(ALL_LOCATIONS.map(l => l.county))].sort(),
    }
  }

  return {
    query,
    covered: true,
    city: {
      name: match.name,
      slug: match.slug,
      county: match.county,
      state: match.stateAbbr,
      zipCodes: match.zipCodes,
    },
    pages: CATEGORY_KEYS.map(key => ({
      service: SERVICE_CATEGORIES[key].name,
      url: `${SITE_URL}/services/${SERVICE_CATEGORIES[key].slug}/${match.slug}`,
    })),
  }
}

export function reviewsPayload() {
  return {
    rating: {
      value: REVIEW_STATS.stars,
      count: REVIEW_STATS.count,
      source: 'Google',
    },
    // A published subset, the same ones shown on /reviews. Not the full set.
    featured: REVIEWS.map(r => ({
      author: r.name,
      source: r.source,
      rating: r.rating,
      text: r.text,
    })),
  }
}

/** Standard JSON response for the public API: open CORS, cacheable. */
export function apiResponse(body: unknown, maxAge = 3600) {
  return Response.json(body, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': `public, max-age=${maxAge}, s-maxage=86400`,
    },
  })
}
