import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizeCss: true,
  },

  compress: true,

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "private, s-maxage=60, stale-while-revalidate=120",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
