import { NextResponse, type NextRequest } from 'next/server'

/**
 * Markdown content negotiation.
 *
 * An agent that sends `Accept: text/markdown` gets markdown at the same URL;
 * browsers keep getting HTML. The rewrite is internal, so the URL the agent
 * asked for is the URL it keeps.
 *
 * This is `proxy.ts`, not `middleware.ts` — Next 16 renamed it. The rewrite
 * target does the actual work, because the markdown builder imports the whole
 * location registry and the content generator, and that weight does not belong
 * in the proxy bundle that runs ahead of every matched request.
 */

const MARKDOWN_ENDPOINT = '/agent-markdown'
const PATH_HEADER = 'x-agent-md-path'

/**
 * True only when markdown is genuinely preferred over HTML.
 *
 * Browsers send `text/html,...,*\/*` — that trailing wildcard means a naive
 * substring test would hand markdown to Chrome. So this parses q-values and
 * requires markdown to be named explicitly AND to at least tie with HTML.
 */
function prefersMarkdown(accept: string | null): boolean {
  if (!accept) return false

  let markdownQ = -1
  let htmlQ = -1

  for (const part of accept.split(',')) {
    const [rawType, ...params] = part.split(';').map(s => s.trim())
    const type = rawType.toLowerCase()
    const qParam = params.find(p => p.startsWith('q='))
    const q = qParam ? Number.parseFloat(qParam.slice(2)) : 1
    if (Number.isNaN(q)) continue

    if (type === 'text/markdown') markdownQ = Math.max(markdownQ, q)
    if (type === 'text/html') htmlQ = Math.max(htmlQ, q)
  }

  return markdownQ > 0 && markdownQ >= htmlQ
}

export function proxy(request: NextRequest) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return NextResponse.next()
  }
  if (!prefersMarkdown(request.headers.get('accept'))) {
    return NextResponse.next()
  }

  // The requested path travels as a request header rather than a query
  // parameter: query parameters set on a rewrite target do not survive the hop,
  // and the endpoint would silently fall back to "/" for every page.
  const requestedPath = request.nextUrl.pathname

  const url = request.nextUrl.clone()
  url.pathname = MARKDOWN_ENDPOINT
  url.search = ''

  const headers = new Headers(request.headers)
  headers.set(PATH_HEADER, requestedPath)

  return NextResponse.rewrite(url, { request: { headers } })
}

export const config = {
  // Content routes only. Anything already machine-readable — the API, the
  // sitemap, robots.txt, the .well-known documents, llms.txt — is skipped,
  // along with every static asset, so nothing that already has a correct
  // content type gets rewritten into markdown.
  matcher: [
    '/((?!api|agent-markdown|_next|\\.well-known|openapi\\.json|sitemap\\.xml|robots\\.txt|favicon\\.ico|llms\\.txt|llms-full\\.txt|auth\\.md|photos|.*\\.[a-zA-Z0-9]+$).*)',
  ],
}
