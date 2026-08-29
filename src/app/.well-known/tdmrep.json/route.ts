/**
 * TDM Reservation Protocol — /.well-known/tdmrep.json
 *
 * Declares that text-and-data-mining rights are reserved for this site, which
 * is the machine-readable form of "do not train models on this content".
 *
 * This replaces the `Content-Signal: ... ai-train=no` directive that used to
 * live in robots.txt. See src/app/robots.txt/route.ts for why it moved:
 * Lighthouse validates robots.txt against a hardcoded seven-directive safelist
 * and fails the whole audit on anything else, costing 8 SEO points on every
 * page of a client-facing report.
 *
 * Format is the TDMRep W3C Community Group spec: an array of location entries.
 * `tdm-reservation: 1` means rights are reserved; `0` would mean waived. The
 * optional `tdm-policy` points at a document describing licensing terms —
 * omitted here because there is no licensing page to point at, and pointing at
 * a 404 is worse than omitting an optional field.
 *
 * The other two TDMRep transports carry the same claim, so a consumer that
 * checks any one of them finds it:
 *   - `tdm-reservation: 1` response header       (next.config.ts)
 *   - <meta name="tdm-reservation" content="1">  (src/app/layout.tsx)
 */
const TDM_REP = [
  {
    location: '/',
    'tdm-reservation': 1,
  },
]

export const dynamic = 'force-static'

export function GET() {
  return new Response(JSON.stringify(TDM_REP, null, 2) + '\n', {
    headers: {
      // The spec calls for JSON. Using application/json rather than
      // application/tdmrep+json, which is not a registered media type.
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      // Well-known URIs are meant to be fetchable cross-origin by the tools
      // that consume them.
      'Access-Control-Allow-Origin': '*',
    },
  })
}
