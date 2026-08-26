import { COMPANY, EMAIL, PHONE, SITE_URL } from '@/shared/constants'

/**
 * /auth.md — agent access and registration policy (workos.com/auth-md).
 *
 * The honest answer for this site is "no registration required, because
 * nothing is protected". That is worth stating explicitly rather than leaving
 * an agent to probe for an auth flow that does not exist.
 *
 * It also states the one thing agents must NOT do: submit the lead forms.
 */

const AUTH_MD = [
  `# Agent access — ${COMPANY}`,
  '',
  '## Summary',
  '',
  '**No registration, credentials, or tokens are required.** Every agent-facing',
  'surface on this origin is public and read-only. There is no authorization',
  'server, no protected resource, and nothing to authenticate against.',
  '',
  'This is a deliberate design choice, not an omission. The site is a marketing',
  'and lead-generation site for a contractor. Everything an agent can read here',
  'is already published on the public pages.',
  '',
  '## What is available',
  '',
  '| Surface | URL | Auth |',
  '| --- | --- | --- |',
  `| MCP server | \`${SITE_URL}/api/mcp\` | none |`,
  `| MCP server card | \`${SITE_URL}/.well-known/mcp/server-card.json\` | none |`,
  `| Public read API | \`${SITE_URL}/api/v1/*\` | none |`,
  `| OpenAPI description | \`${SITE_URL}/openapi.json\` | none |`,
  `| API catalog | \`${SITE_URL}/.well-known/api-catalog\` | none |`,
  `| Agent skills | \`${SITE_URL}/.well-known/agent-skills/index.json\` | none |`,
  `| Capability manifest | \`${SITE_URL}/.well-known/ai-catalog.json\` | none |`,
  `| Page markdown | any page URL with \`Accept: text/markdown\` | none |`,
  '',
  '## Rate limits',
  '',
  'No published quota. The read endpoints are cached and cheap. Behave',
  'reasonably; sustained abusive traffic will be blocked at the edge.',
  '',
  '## What agents must NOT do',
  '',
  'The routes at `/api/contact`, `/api/join` and `/api/approve` are **not** part',
  'of the public API. They are internal handlers for the on-page forms, they',
  'email a real person, and they reject automated submissions.',
  '',
  'Do not submit an estimate request on someone\'s behalf. Hand the person the',
  `form at ${SITE_URL}/contact, or the phone number ${PHONE}, and let them`,
  'submit it themselves. An estimate is priced by walking the property; a lead',
  'that arrives without a human behind it wastes a site visit.',
  '',
  '## Pricing',
  '',
  'No pricing is published, and none should be quoted on this business\'s',
  'behalf. Cost depends on access, acreage, terrain, and haul-off. Estimates are',
  'free and given on site.',
  '',
  '## Contact',
  '',
  `- Phone: ${PHONE}`,
  `- Email: ${EMAIL}`,
  `- Estimate form: ${SITE_URL}/contact`,
  '',
  '## If this changes',
  '',
  'If a protected resource is ever added to this origin, this document will name',
  'the authorization server and `/.well-known/oauth-protected-resource` will be',
  'published alongside it. Neither exists today, and neither is published today —',
  'discovery metadata for an auth system that does not exist would send agents',
  'to endpoints that cannot answer.',
  '',
].join('\n')

export function GET() {
  return new Response(AUTH_MD, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
