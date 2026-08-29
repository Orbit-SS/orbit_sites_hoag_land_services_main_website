import { SITE_URL } from '@/shared/constants'

/**
 * robots.txt — maximally permissive for both traditional search and AI
 * crawlers, with the no-training preference expressed via TDMRep rather than a
 * `Content-Signal:` directive.
 *
 * WHY THE CHANGE (2026-08-29). `Content-Signal:` is legal under RFC 9309, which
 * requires parsers to ignore unrecognised lines, and Google's crawler does
 * exactly that. But Lighthouse's robots-txt audit validates against a hardcoded
 * safelist of seven directives — user-agent, disallow, allow, sitemap,
 * crawl-delay, clean-param, host — with no extension point. Any unknown
 * directive fails the whole audit and costs 8 points of the SEO category on
 * every page. Those reports go to the client, so the score has to be clean.
 *
 * Nothing is given up. The preference is now carried by the TDM Reservation
 * Protocol (W3C Community Group), which has three transports, none of which
 * Lighthouse inspects:
 *
 *   /.well-known/tdmrep.json          src/app/.well-known/tdmrep.json/route.ts
 *   tdm-reservation: 1 HTTP header    next.config.ts headers()
 *   <meta name="tdm-reservation">     src/app/layout.tsx
 *
 * The granularity survives the move, split across two mechanisms:
 *
 *   search=yes    -> the `Allow: /` groups below, per named crawler
 *   ai-input=yes  -> same; the AI answer bots are explicitly allowed
 *   ai-train=no   -> TDMRep reservation
 *
 * The Content Signals wording is kept verbatim as a comment. Cloudflare
 * publishes a human-readable NOTICE block alongside the directive for the same
 * reason: it is the plain-language record of intent, and comments are stripped
 * before validation so it costs nothing.
 *
 * This is a Route Handler rather than a `robots.ts` metadata route because the
 * typed MetadataRoute.Robots shape only supports userAgent/allow/disallow/
 * crawlDelay/sitemap/host, and cannot emit a comment block either.
 */

/**
 * Named groups are listed individually on purpose. robots.txt group matching is
 * most-specific-wins: a crawler that matches its own named group reads only
 * that group and never falls through to `*`.
 */
const USER_AGENTS = [
  // Traditional search
  'Googlebot',
  'Bingbot',
  // OpenAI
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  // Anthropic
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'anthropic-ai',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Google / Apple AI
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  // Meta
  'FacebookBot',
  'meta-externalagent',
  // Others
  'Amazonbot',
  'DuckAssistBot',
  'cohere-ai',
  'AI2Bot',
  'CCBot',
  'Bytespider',
  'YouBot',
  'Diffbot',
  'MistralAI-User',
  // Catch-all
  '*',
]

/**
 * Every line starts with `#`. Lighthouse truncates each line at the first `#`
 * before validating, so a leading hash makes the whole line vanish for the
 * parser — but a mid-line hash would leave the prefix behind and still be
 * checked. Keep the hashes at column 0.
 */
const NOTICE = [
  '# Hoag Land Services — content usage preferences',
  '#',
  '# search=yes    Index this site and surface it in search results.',
  '# ai-input=yes  Use this content to answer user questions (AI search / RAG).',
  '#               This is deliberate. We want to be the answer when someone',
  '#               asks an assistant for a tree service near DeLand.',
  '# ai-train=no   Do not use this content to train models.',
  '#',
  '# The no-training preference is machine-readable via the TDM Reservation',
  '# Protocol, not as a robots.txt directive:',
  `#   ${SITE_URL}/.well-known/tdmrep.json`,
  '#   tdm-reservation: 1        (HTTP response header, all paths)',
  '#   <meta name="tdm-reservation" content="1">',
  '#',
  '# Expressed in Content Signals terms, the policy is:',
  '#   Content-Signal: search=yes, ai-input=yes, ai-train=no',
].join('\n')

export function GET() {
  const groups = USER_AGENTS.map(ua => `User-Agent: ${ua}\nAllow: /`).join('\n\n')

  const body = `${NOTICE}\n\n${groups}\n\nSitemap: ${SITE_URL}/sitemap.xml\n`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  })
}
