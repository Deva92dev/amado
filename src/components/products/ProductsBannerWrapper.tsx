import { countProducts, fetchProductMeta } from "@/utils/actions";
import ProductsBanner from "./ProductsBanner";

const ProductsBannerWrapper = async ({
  paramsPromise,
}: {
  paramsPromise: Promise<any>;
}) => {
  const {
    search = "",
    category = "",
    color = "",
    size = "",
  } = await paramsPromise;

  const [meta, totalProducts] = await Promise.all([
    fetchProductMeta(),
    countProducts({ search, category, color, size }),
  ]);

  const featuredCategories = meta.categories.slice(0, 6);

  return (
    <ProductsBanner
      totalProducts={totalProducts}
      currentCategory={category}
      featuredCategories={featuredCategories}
      currentSearch={search}
    />
  );
};

export default ProductsBannerWrapper;
