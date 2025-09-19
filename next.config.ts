// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Pexels CDN – all photos
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**", // every path & size variant
      },
      // Pexels site pages (rare: if you embed the HTML page’s hero image)
      {
        protocol: "https",
        hostname: "www.pexels.com",
        pathname: "/**",
      },
      // Clerk avatars
      {
        protocol: "https",
        hostname: "img.clerk.com",
        pathname: "/**",
      },
    ],
    // Add the new image optimization properties
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 320, 384, 450, 512, 640],
    qualities: [25, 40, 50, 60, 75],
    minimumCacheTTL: 31536000, // 1 year
  },

  async headers() {
    return [
      {
        source: "/:path*",
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
    ];
  },
};

export default nextConfig;
