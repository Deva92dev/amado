import { MetadataRoute } from "next";

const rawBaseUrl =
  process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000";

const baseUrl = rawBaseUrl.startsWith("http")
  ? rawBaseUrl
  : `https://${rawBaseUrl}`;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: [
          "/api/*",
          "/orders/*",
          "/cart",
          "/checkout/*",
          "/reviews/*",
          "/admin/*",
          "/favorites",
        ],
        allow: [
          "/",
          "/products",
          "/products/*",
          "/about",
          "/cancellation-refunds",
          "/contact",
          "/privacy-policy",
          "/shipping-policy",
          "/terms-condition",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
