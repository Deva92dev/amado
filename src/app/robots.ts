import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000";

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
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
