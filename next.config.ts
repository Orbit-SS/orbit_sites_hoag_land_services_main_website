import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hlsdeland.com',
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
        ],
      },
    ]
  },
};

export default nextConfig;
// deploy 1775838977
