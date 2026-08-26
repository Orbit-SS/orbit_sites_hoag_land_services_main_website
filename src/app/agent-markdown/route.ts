import { estimateTokens, markdownForPath } from '@/lib/agent-markdown'

/**
 * Serves the markdown representation for a path.
 *
 * Reached only through the internal rewrite in src/proxy.ts, which fires when a
 * request sends `Accept: text/markdown`. The caller keeps the URL it asked for;
 * this route never appears in a browser's address bar.
 */
export async function GET(request: Request) {
  // Set by src/proxy.ts on the internal rewrite.
  const path = request.headers.get('x-agent-md-path') ?? '/'
  const markdown = markdownForPath(path)

  if (!markdown) {
    return new Response(
      `# Not found\n\nNo markdown representation exists for ${path}\n`,
      {
        status: 404,
        headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
      },
    )
  }

  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'x-markdown-tokens': String(estimateTokens(markdown)),
      'x-markdown-source': 'generated',
      // The same URL serves HTML or markdown depending on Accept, so any cache
      // in front of this must key on Accept or it will serve one to the other.
      Vary: 'Accept',
      'Cache-Control': 'public, max-age=600, s-maxage=86400',
    },
  })
}
