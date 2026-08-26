import { SITE_URL } from '@/shared/constants'

/**
 * robots.txt — maximally permissive for both traditional search and AI crawlers,
 * plus Content Signals (contentsignals.org / draft-romm-aipref-contentsignals).
 *
 * This is a Route Handler rather than a `robots.ts` metadata route because the
 * typed MetadataRoute.Robots shape only supports userAgent/allow/disallow/
 * crawlDelay/sitemap/host. There is no way to emit a `Content-Signal` directive
 * through it.
 *
 * Content-Signal is repeated in EVERY user-agent group on purpose. robots.txt
 * group matching is most-specific-wins: a crawler that matches its own named
 * group reads only that group and never falls through to `*`. Putting the
 * signal only under `*` would mean GPTBot, ClaudeBot et al never see it.
 */

// search=yes    -> index us and surface us in search results
// ai-input=yes  -> use our content when answering user questions (RAG / AI search).
//                  This is the whole point for a local service business: we want
//                  to be the answer when someone asks an assistant for a tree
//                  service near DeLand.
// ai-train=no   -> do not use our content to train models.
const CONTENT_SIGNAL = 'search=yes, ai-input=yes, ai-train=no'

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

export function GET() {
  const groups = USER_AGENTS.map(
    ua => `User-Agent: ${ua}\nContent-Signal: ${CONTENT_SIGNAL}\nAllow: /`,
  ).join('\n\n')

  const body = `${groups}\n\nSitemap: ${SITE_URL}/sitemap.xml\n`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  })
}
