import { SITE_URL } from '@/shared/constants'
import { apiResponse } from '@/lib/public-api'

/**
 * API root index.
 *
 * This path is the `anchor` of the linkset served at /.well-known/api-catalog.
 * Before this route existed it returned the site's 404 HTML page (~47KB), so an
 * agent that read the catalog and dereferenced the anchor got a dead end and a
 * page of markup, while every other href in that catalog resolved fine.
 *
 * RFC 9727 does not strictly require the anchor to be dereferenceable, but
 * returning an HTML 404 from an API root is actively misleading. A small index
 * costs nothing and gives an agent that starts here a route to everything else.
 */
export function GET() {
  return apiResponse({
    name: 'Hoag Land Services Public API',
    version: '1.0.0',
    description:
      'Read-only public data: service lines, Central Florida coverage, business details, and published reviews. No authentication, no personal data, no write surface.',
    documentation: {
      openapi: `${SITE_URL}/openapi.json`,
      catalog: `${SITE_URL}/.well-known/api-catalog`,
      overview: `${SITE_URL}/llms.txt`,
      mcp: `${SITE_URL}/.well-known/mcp/server-card.json`,
    },
    endpoints: [
      { path: '/api/v1/company', description: 'Business details, certifications, rating, contact routes.' },
      { path: '/api/v1/services', description: 'Service categories and every sub-service, with page URLs.' },
      { path: '/api/v1/service-areas', description: 'Counties and cities covered, with per-service page URLs.' },
      { path: '/api/v1/reviews', description: 'Aggregate rating and the published featured reviews.' },
      { path: '/api/v1/health', description: 'Health check.' },
    ],
    booking: {
      automated: false,
      note: 'There is no booking endpoint. Estimates are free and given after walking the property — send people to the contact form or the phone number.',
    },
  }, 3600)
}
