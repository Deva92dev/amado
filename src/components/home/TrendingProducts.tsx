import { fetchFeaturedProducts } from "@/utils/actions";
import TrendingProductsClient from "./TrendingProductsClient";

const TrendingProducts = async () => {
  const products = await fetchFeaturedProducts();
  if (!products || products.length === 0) {
    return null;
  }

  return <TrendingProductsClient products={products} />;
};

export default TrendingProducts;
