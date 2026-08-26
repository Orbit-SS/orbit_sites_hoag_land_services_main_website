import { ALL_LOCATIONS } from '@/data/locations'
import { COMPANY, SITE_URL } from '@/shared/constants'

/**
 * ARD capability manifest (agenticresourcediscovery.org, ai-catalog data model).
 *
 * Lists what this origin actually serves to agents. Every entry resolves to a
 * 200 — the MCP server, the OpenAPI-described read API, the skills, the
 * markdown, the sitemap. A manifest that advertises machinery which is not
 * there fails on first contact, which is worse for the agent than a short
 * honest list.
 *
 * representativeQueries are the questions each entry can actually answer, so a
 * registry building semantic embeddings routes real intent here rather than
 * matching on the business name alone.
 */

const FQDN = SITE_URL.replace(/^https?:\/\//, '')

export function GET() {
  const catalog = {
    specVersion: '1.0',
    host: {
      displayName: COMPANY,
      identifier: `did:web:${FQDN}`,
      description:
        'Land clearing, tree services, and fencing contractor serving 9 Central Florida counties from DeLeon Springs. ISA Certified Arborist owned.',
    },
    entries: [
      {
        identifier: `urn:air:${FQDN}:mcp:public`,
        displayName: `${COMPANY} MCP server`,
        description:
          'Read-only MCP tools: service lines, Central Florida coverage by city or ZIP, business contact details, reviews, and the markdown of any page.',
        type: 'application/json',
        url: `${SITE_URL}/.well-known/mcp/server-card.json`,
        representativeQueries: [
          'does Hoag Land Services cover Palm Coast',
          'what tree services are available near DeLand Florida',
          'find a land clearing contractor in Volusia County',
          'how do I get an estimate for fencing in Central Florida',
        ],
      },
      {
        identifier: `urn:air:${FQDN}:api:public`,
        displayName: 'Public read-only API',
        description:
          'JSON endpoints for services, coverage, reviews, and business details. Described by OpenAPI 3.1, catalogued per RFC 9727.',
        type: 'application/json',
        url: `${SITE_URL}/openapi.json`,
        representativeQueries: [
          'list Hoag Land Services service areas as JSON',
          'which counties does this Florida contractor serve',
          'what sub-services fall under site work',
        ],
      },
      {
        identifier: `urn:air:${FQDN}:skills:index`,
        displayName: `${COMPANY} agent skills`,
        description:
          'How to request an estimate, match a job to a service line, check whether a city is covered, and handle storm damage safely.',
        type: 'application/json',
        url: `${SITE_URL}/.well-known/agent-skills/index.json`,
        representativeQueries: [
          'how do I request a quote from Hoag Land Services',
          'a tree fell on my house in Central Florida what do I do',
          'which service do I need for an overgrown lot',
          'what information does a land clearing estimate need',
        ],
      },
      {
        identifier: `urn:air:${FQDN}:content:markdown`,
        displayName: 'Markdown representation of every page',
        description: `Any of the ${ALL_LOCATIONS.length * 3}+ page URLs returns markdown when the request sends Accept: text/markdown. HTML stays the default for browsers.`,
        type: 'text/markdown',
        url: `${SITE_URL}/`,
        representativeQueries: [
          'read the Hoag Land Services tree removal page as markdown',
          'get the text of the DeLand land clearing page',
          'palm pruning in Daytona Beach',
        ],
      },
      {
        identifier: `urn:air:${FQDN}:content:llms-txt`,
        displayName: 'Site overview for language models',
        description:
          'Single-page index of services, locations, and key pages, with contact details.',
        type: 'text/plain',
        url: `${SITE_URL}/llms.txt`,
        representativeQueries: [
          'what does Hoag Land Services do',
          'land clearing company DeLeon Springs Florida',
        ],
      },
      {
        identifier: `urn:air:${FQDN}:content:sitemap`,
        displayName: 'Sitemap',
        description: 'Canonical URL list for the whole site.',
        type: 'application/xml',
        url: `${SITE_URL}/sitemap.xml`,
        representativeQueries: [
          'list all pages on hlsdeland.com',
          'crawl the Hoag Land Services site structure',
        ],
      },
    ],
  }

  return Response.json(catalog, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
