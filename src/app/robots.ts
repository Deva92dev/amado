import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/"], // Disallow all admin pages
    },
    sitemap: "https://amado-three.vercel.app/sitemap.xml", // Your deployed sitemap URL
  };
}
