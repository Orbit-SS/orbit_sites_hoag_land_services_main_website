import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 defaults to ['image/webp'] only. AVIF compresses ~20% smaller
    // than WebP; browsers that lack it fall back to WebP automatically.
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hlsdeland.com',
        pathname: '/photos/**',
      },
      // www too: the canonical host moved to www, so any future next/image use
      // of a remote photo URL would otherwise be rejected. Carried across from
      // Spencer's Orbit-SS branch seo/service-hub-metadata-2026-06-23.
      {
        protocol: 'https',
        hostname: 'www.hlsdeland.com',
        pathname: '/photos/**',
      },
    ],
  },

  // Maximally permissive headers for AI crawlers and search engines
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Tell all bots: index everything, follow all links, no snippet limits
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
          },
          // RFC 8288 Link header for agent discovery.
          //
          // The `api-catalog` relation is registered by RFC 9727 and points at
          // the public READ-ONLY API. It does not cover the internal form
          // handlers at /api/contact, /api/join and /api/approve — those are
          // not a public API and are excluded from the catalog and the
          // OpenAPI spec on purpose.
          //
          // The empty URI reference `<>` in the alternate relation resolves to
          // the current URL (RFC 3986 §4.2), which is exactly the claim being
          // made: THIS url also serves markdown, if you ask for it with
          // `Accept: text/markdown`. See src/proxy.ts.
          {
            key: 'Link',
            value: [
              '</llms.txt>; rel="describedby"; type="text/plain"',
              '</llms-full.txt>; rel="describedby"; type="text/plain"',
              '</.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"',
              '<>; rel="alternate"; type="text/markdown"',
            ].join(', '),
          },
          // Security headers. The three below are enforcing and carry no risk.
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Promoted from report-only to ENFORCING on 2026-08-29, after walking
          // the main templates in a browser and collecting zero violations:
          // /service-areas (Mapbox GL, the riskiest), / with GA4 and a full
          // scroll, /contact (form), and /portfolio including a filter click.
          //
          // 'unsafe-inline' covers Next's inline hydration scripts and the
          // JSON-LD blocks; 'unsafe-eval' and worker-src blob: are Mapbox GL.
          //
          // If something does break, the one-word revert is back to
          // Content-Security-Policy-Report-Only.
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
              // Mapbox GL loads its stylesheet from api.mapbox.com. Report-only
              // caught this on /service-areas; without it the map renders unstyled.
              "style-src 'self' 'unsafe-inline' https://api.mapbox.com",
              "img-src 'self' data: blob:",
              "font-src 'self' data:",
              "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://api.mapbox.com https://events.mapbox.com",
              "worker-src 'self' blob:",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
            ].join('; '),
          },
        ],
      },
    ]
  },

  // 301 redirects for legacy .html URLs from the pre-rebuild site (flagged in GSC).
  // Each destination has been verified to exist as a current route.
  async redirects() {
    return [
      { source: '/index.html',     destination: '/',          permanent: true },
      { source: '/about.html',     destination: '/about',     permanent: true },
      { source: '/services.html',  destination: '/services',  permanent: true },
      { source: '/contact.html',   destination: '/contact',   permanent: true },
      { source: '/portfolio.html', destination: '/portfolio', permanent: true },
      { source: '/join.html',      destination: '/join',      permanent: true },
    ]
  },
};

export default nextConfig;
// deploy 1775838977
