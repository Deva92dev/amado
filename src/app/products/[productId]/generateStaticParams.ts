import { fetchAllProductsForSitemap } from "@/utils/actions";

export async function generateStaticParams() {
  const products = await fetchAllProductsForSitemap();
  return products.map((product) => ({
    productId: product.id,
  }));
}
