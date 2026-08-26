import {
  companyPayload,
  coverageFor,
  reviewsPayload,
  servicesPayload,
} from '@/lib/public-api'
import { markdownForPath } from '@/lib/agent-markdown'
import { COMPANY } from '@/shared/constants'

/**
 * MCP server (Streamable HTTP transport, JSON-RPC 2.0).
 *
 * Exposes the public read-only data in src/lib/public-api.ts as MCP tools, plus
 * the markdown of any page on the site.
 *
 * EVERY TOOL IS READ-ONLY. There is deliberately no `request_estimate` tool.
 * An estimate has to be priced by walking the property, and a tool that let an
 * agent submit leads unattended would put unverified submissions into a real
 * person's inbox with no human in the loop. `get_contact_info` returns the form
 * URL and the phone number instead, and the tool description says so.
 *
 * Being unauthenticated is a deliberate consequence of being read-only: there
 * is no protected resource here, so there is nothing for OAuth to protect.
 */

const PROTOCOL_VERSIONS = ['2025-06-18', '2025-03-26', '2024-11-05']
const DEFAULT_PROTOCOL = PROTOCOL_VERSIONS[0]

const SERVER_INFO = {
  name: 'hls-public',
  title: `${COMPANY} — public information`,
  version: '1.0.0',
}

type Tool = {
  name: string
  title: string
  description: string
  inputSchema: Record<string, unknown>
  handler: (args: Record<string, unknown>) => unknown
}

const TOOLS: Tool[] = [
  {
    name: 'get_services',
    title: 'List services',
    description:
      'List the three service lines (site work / land clearing, tree services, fencing) and every sub-service under each, with page URLs. Use to work out what HLS actually does before answering a question about scope.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    handler: () => servicesPayload(),
  },
  {
    name: 'check_service_area',
    title: 'Check service area',
    description:
      'Check whether Hoag Land Services covers a Central Florida city, and get the per-service page URLs for it. Accepts a city name, a city slug, or a ZIP code. A negative answer is not a refusal — it returns guidance to send the enquiry in rather than turning the person away.',
    inputSchema: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          description: 'City name, city slug, or ZIP code. Example: "Daytona Beach", "daytona-beach", or "32114".',
        },
      },
      required: ['location'],
      additionalProperties: false,
    },
    handler: args => coverageFor(String(args.location ?? '')),
  },
  {
    name: 'get_contact_info',
    title: 'Get contact information',
    description:
      'Business contact details, credentials, aggregate rating, and how estimates are requested. There is no automated booking; this returns the phone number and the contact form URL to hand a person.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    handler: () => companyPayload(),
  },
  {
    name: 'get_reviews',
    title: 'Get reviews',
    description:
      'Aggregate Google rating and the published review subset shown on the site.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    handler: () => reviewsPayload(),
  },
  {
    name: 'get_page_markdown',
    title: 'Read a page as markdown',
    description:
      'Fetch the markdown of any page on hlsdeland.com by path. Use for the full copy of a service page or a city page — for example "/services/tree-services/deland". Returns an error for paths that do not exist rather than guessing.',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Site path beginning with "/". Example: "/services/fencing/palm-coast".',
        },
      },
      required: ['path'],
      additionalProperties: false,
    },
    handler: args => {
      const path = String(args.path ?? '/')
      const markdown = markdownForPath(path)
      if (!markdown) {
        return { error: `No page exists at ${path}`, hint: 'Use get_services or check_service_area to find valid paths.' }
      }
      return { path, markdown }
    },
  },
]

// ──────────────────────────────────────────────────────
// JSON-RPC plumbing
// ──────────────────────────────────────────────────────

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Mcp-Session-Id, MCP-Protocol-Version',
}

function rpcResult(id: unknown, result: unknown) {
  return Response.json({ jsonrpc: '2.0', id, result }, { headers: CORS })
}

function rpcError(id: unknown, code: number, message: string) {
  return Response.json({ jsonrpc: '2.0', id, error: { code, message } }, { headers: CORS })
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS })
}

/**
 * GET is what the transport spec uses to open a server-initiated SSE stream.
 * This server never initiates anything — every tool is a pure function of its
 * arguments — so it declines the stream, which clients handle cleanly.
 */
export function GET() {
  return new Response('This MCP server does not provide a server-initiated event stream.', {
    status: 405,
    headers: { ...CORS, Allow: 'POST, OPTIONS' },
  })
}

export async function POST(request: Request) {
  let body: { jsonrpc?: string; id?: unknown; method?: string; params?: Record<string, unknown> }

  try {
    body = await request.json()
  } catch {
    return rpcError(null, -32700, 'Parse error')
  }

  const { id = null, method, params = {} } = body

  switch (method) {
    case 'initialize': {
      const requested = String(params.protocolVersion ?? '')
      const protocolVersion = PROTOCOL_VERSIONS.includes(requested) ? requested : DEFAULT_PROTOCOL
      return rpcResult(id, {
        protocolVersion,
        capabilities: { tools: { listChanged: false } },
        serverInfo: SERVER_INFO,
        instructions:
          'Public information about Hoag Land Services, a land clearing, tree service, and fencing contractor in Central Florida. All tools are read-only. To start work, hand the person the contact form URL or the phone number from get_contact_info — there is no booking tool and prices are never quoted without walking the property.',
      })
    }

    // Notifications carry no id and expect no response body.
    case 'notifications/initialized':
    case 'notifications/cancelled':
      return new Response(null, { status: 202, headers: CORS })

    case 'ping':
      return rpcResult(id, {})

    case 'tools/list':
      return rpcResult(id, {
        tools: TOOLS.map(({ name, title, description, inputSchema }) => ({
          name,
          title,
          description,
          inputSchema,
        })),
      })

    case 'tools/call': {
      const name = String(params.name ?? '')
      const tool = TOOLS.find(t => t.name === name)
      if (!tool) return rpcError(id, -32602, `Unknown tool: ${name}`)

      try {
        const args = (params.arguments ?? {}) as Record<string, unknown>
        const output = tool.handler(args)
        return rpcResult(id, {
          content: [{ type: 'text', text: JSON.stringify(output, null, 2) }],
          structuredContent: output,
          isError: false,
        })
      } catch (error) {
        // A tool failure is reported inside the result, not as a protocol
        // error: the model should see it and be able to recover.
        return rpcResult(id, {
          content: [
            {
              type: 'text',
              text: `Tool ${name} failed: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        })
      }
    }

    default:
      return rpcError(id, -32601, `Method not found: ${method}`)
  }
}
