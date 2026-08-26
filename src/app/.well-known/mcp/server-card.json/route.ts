import { COMPANY, SITE_URL } from '@/shared/constants'

/**
 * MCP Server Card (SEP-1649).
 *
 * Describes the server implemented at /api/mcp. The schema is still an
 * unmerged proposal, so the shape here follows the SEP as written and may need
 * revisiting when it lands — the endpoint it points at is real either way.
 *
 * `authentication: none` is the honest answer: every tool is read-only public
 * data, so there is no protected resource and nothing to authenticate against.
 */
export function GET() {
  const card = {
    $schema: 'https://modelcontextprotocol.io/schemas/draft/server-card.json',
    serverInfo: {
      name: 'hls-public',
      title: `${COMPANY} — public information`,
      version: '1.0.0',
      description:
        'Read-only access to service lines, Central Florida coverage, business contact details, and the markdown of any page on hlsdeland.com.',
      websiteUrl: SITE_URL,
    },
    transport: {
      type: 'streamable-http',
      endpoint: `${SITE_URL}/api/mcp`,
    },
    capabilities: {
      tools: { listChanged: false },
    },
    authentication: {
      type: 'none',
      note: 'All tools are read-only public data. There is no protected resource.',
    },
    tools: [
      { name: 'get_services', description: 'List service lines and sub-services.' },
      { name: 'check_service_area', description: 'Check coverage for a city, slug, or ZIP.' },
      { name: 'get_contact_info', description: 'Business contact details and how estimates are requested.' },
      { name: 'get_reviews', description: 'Aggregate rating and published reviews.' },
      { name: 'get_page_markdown', description: 'Read any site page as markdown.' },
    ],
  }

  return Response.json(card, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
