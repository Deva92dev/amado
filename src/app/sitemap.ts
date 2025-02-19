import { fetchAllProductsForSitemap } from "@/utils/actions";
import { MetadataRoute } from "next";

// If your products change daily (e.g., dynamic pricing, flash sales), go with "daily". Otherwise, "weekly" is ideal!

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const products = await fetchAllProductsForSitemap();

  type ChangeFrequency =
    | "yearly"
    | "monthly"
    | "weekly"
    | "always"
    | "hourly"
    | "daily"
    | "never";

  const staticPages: {
    path: string;
    changeFrequency: ChangeFrequency;
    priority: number;
  }[] = [
    { path: "/", changeFrequency: "yearly", priority: 1 },
    { path: "/products", changeFrequency: "monthly", priority: 0.9 },
    { path: "/about", changeFrequency: "yearly", priority: 0.7 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
    { path: "/cancellation-refunds", changeFrequency: "yearly", priority: 0.3 },
    { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/shipping-policy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms-condition", changeFrequency: "yearly", priority: 0.3 },
  ];

  const StaticPages: MetadataRoute.Sitemap = staticPages.map(
    ({ path, changeFrequency, priority }) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    })
  );

  const dynamicProductPages: MetadataRoute.Sitemap = products.map(
    (product) => ({
      url: `${baseUrl}/products/${product.id}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  return [...StaticPages, ...dynamicProductPages];
}
