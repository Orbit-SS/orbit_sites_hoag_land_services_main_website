import { SITE_URL, COMPANY } from '@/shared/constants'

/**
 * API catalog (RFC 9727), serialised as a linkset (RFC 9264).
 *
 * One anchor: the public read-only API. The link relations point at its
 * OpenAPI description, its human documentation, and its health endpoint —
 * all three of which resolve.
 *
 * The internal form handlers under /api are NOT catalogued. They are not a
 * public API; they reject automated submissions and they email a real person.
 * Listing them here would advertise a spam target as an integration point.
 */
export function GET() {
  const linkset = {
    linkset: [
      {
        anchor: `${SITE_URL}/api/v1`,
        'service-desc': [
          {
            href: `${SITE_URL}/openapi.json`,
            type: 'application/json',
            title: `${COMPANY} Public API — OpenAPI 3.1 description`,
          },
        ],
        'service-doc': [
          {
            href: `${SITE_URL}/llms.txt`,
            type: 'text/plain',
            title: `${COMPANY} — site and API overview for agents`,
          },
        ],
        status: [
          {
            href: `${SITE_URL}/api/v1/health`,
            type: 'application/json',
            title: 'Health check',
          },
        ],
        author: [
          {
            href: SITE_URL,
            title: COMPANY,
          },
        ],
      },
    ],
  }

  return new Response(JSON.stringify(linkset, null, 2), {
    headers: {
      'Content-Type': 'application/linkset+json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
