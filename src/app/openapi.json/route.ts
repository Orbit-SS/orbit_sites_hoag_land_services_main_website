import { SITE_URL, COMPANY, EMAIL } from '@/shared/constants'

/**
 * OpenAPI 3.1 description of the public read-only API.
 *
 * Referenced as `service-desc` from /.well-known/api-catalog (RFC 9727).
 *
 * Only the `/api/v1/*` routes are described. The form handlers at
 * /api/contact, /api/join and /api/approve are deliberately absent: they are
 * internal handlers for the on-page forms, they reject automated submissions,
 * and documenting them would be an invitation to spam a real person's inbox.
 */
export function GET() {
  const spec = {
    openapi: '3.1.0',
    info: {
      title: `${COMPANY} Public API`,
      version: '1.0.0',
      description:
        'Read-only access to the same service, coverage, and business data the website renders. No authentication, no personal data, no write operations.',
      contact: { name: COMPANY, email: EMAIL, url: SITE_URL },
    },
    servers: [{ url: SITE_URL, description: 'Production' }],
    paths: {
      '/api/v1/company': {
        get: {
          summary: 'Business details',
          description:
            'Contact details, credentials, aggregate rating, and how estimates are actually requested.',
          operationId: 'getCompany',
          responses: { '200': jsonResponse('Business details') },
        },
      },
      '/api/v1/services': {
        get: {
          summary: 'Service catalog',
          description:
            'The three service lines — site work, tree services, fencing — and every sub-service under each.',
          operationId: 'getServices',
          responses: { '200': jsonResponse('Service catalog') },
        },
      },
      '/api/v1/service-areas': {
        get: {
          summary: 'Coverage',
          description:
            'Every county and city served. With `q`, answers the coverage question for a single place.',
          operationId: 'getServiceAreas',
          parameters: [
            {
              name: 'q',
              in: 'query',
              required: false,
              description: 'City name, city slug, or ZIP code.',
              schema: { type: 'string' },
              example: 'daytona-beach',
            },
          ],
          responses: { '200': jsonResponse('Coverage information') },
        },
      },
      '/api/v1/reviews': {
        get: {
          summary: 'Reviews',
          description: 'Aggregate Google rating and the published review subset.',
          operationId: 'getReviews',
          responses: { '200': jsonResponse('Reviews') },
        },
      },
      '/api/v1/health': {
        get: {
          summary: 'Health check',
          operationId: 'getHealth',
          responses: { '200': jsonResponse('Service status') },
        },
      },
    },
  }

  return Response.json(spec, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}

function jsonResponse(description: string) {
  return {
    description,
    content: { 'application/json': { schema: { type: 'object' } } },
  }
}
