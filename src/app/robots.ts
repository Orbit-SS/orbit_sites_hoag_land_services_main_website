import type { MetadataRoute } from 'next'

/**
 * Robots.txt — maximally permissive for both traditional search and AI crawlers.
 *
 * Strategy: explicitly ALLOW every known AI bot so they can crawl, index,
 * and cite this site in AI search results (ChatGPT, Claude, Perplexity,
 * Gemini AI Overviews, etc.). No training restrictions — we want maximum
 * AI visibility for a local service business.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Traditional search engines ──────────────────────────
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },

      // ── OpenAI bots ─────────────────────────────────────────
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },

      // ── Anthropic bots ──────────────────────────────────────
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-SearchBot', allow: '/' },
      { userAgent: 'Claude-User', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },

      // ── Perplexity bots ─────────────────────────────────────
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },

      // ── Google AI / Gemini ──────────────────────────────────
      { userAgent: 'Google-Extended', allow: '/' },

      // ── Apple / Siri ────────────────────────────────────────
      { userAgent: 'Applebot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },

      // ── Meta ────────────────────────────────────────────────
      { userAgent: 'FacebookBot', allow: '/' },
      { userAgent: 'meta-externalagent', allow: '/' },

      // ── Other AI crawlers ───────────────────────────────────
      { userAgent: 'Amazonbot', allow: '/' },
      { userAgent: 'DuckAssistBot', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },
      { userAgent: 'AI2Bot', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
      { userAgent: 'YouBot', allow: '/' },
      { userAgent: 'Diffbot', allow: '/' },
      { userAgent: 'MistralAI-User', allow: '/' },

      // ── Catch-all: allow everything ─────────────────────────
      { userAgent: '*', allow: '/' },
    ],
    sitemap: 'https://hlsdeland.com/sitemap.xml',
  }
}
