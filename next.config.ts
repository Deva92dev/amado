import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
      { protocol: "https", hostname: "www.pexels.com", pathname: "/**" },
      { protocol: "https", hostname: "img.clerk.com", pathname: "/**" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 320, 384, 450, 512, 640],
    qualities: [25, 40, 50, 60, 75],
    minimumCacheTTL: 31536000,
  },

  compiler: {
    // Removes all console.* statements in production
    removeConsole: process.env.NODE_ENV === "production",
  },

  async headers() {
    return [
      {
        // Cache Next.js static assets
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache image assets
        source: "/:path*\\.(ico|png|jpg|jpeg|gif|webp|avif|svg)$",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.mp4",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000" }],
      },
      {
        source: "/:path*.webm",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000" }],
      },
      {
        source: "/robots.txt",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "connect-src 'self'; script-src 'none'; object-src 'none';",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=3600",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
