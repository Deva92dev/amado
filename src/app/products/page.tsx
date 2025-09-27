import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Metadata } from "next";
import ProductsBanner from "@/components/products/ProductsBanner";
import ProductsContainer from "@/components/products/ProductsContainer";
import { countProducts, fetchProductMeta } from "@/utils/actions";
import ProductsGridSkeleton from "@/components/products/ProductGridSkeleton";
import FilterSheetSkeleton from "@/components/products/FilterSheetSkeleton";

type ProductPageProps = {
  searchParams: Promise<{
    layout?: string;
    search?: string;
    category?: string;
    color?: string;
    size?: string;
    sortBy?: SortOption;
  }>;
};

export type SortOption = "price-low" | "price-high" | "name-a-z" | "name-z-a";

export const generateMetadata = async ({
  searchParams,
}: ProductPageProps): Promise<Metadata> => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const params = await searchParams;
  const { search } = params;

  const title = search ? `Search results for "${search}"` : "Shop Products";
  const description = search
    ? `Browse our collection of products matching "${search}" at Amado. Find the perfect style for your wardrobe.`
    : "Explore a wide range of trending fashion products at Amado. Discover premium quality clothing and accessories.";

  const canonicalUrl = new URL("/products", baseUrl).toString();

  return {
    title: `${title} | Amado`,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      title: `${title} | Amado`,
      description,
      url: canonicalUrl,
      siteName: "Amado",
      images: [
        {
          url: "/opengraph-image.jpg", // Remove new URL() for simpler path
          width: 1200,
          height: 630,
          alt: "Amado clothing banner",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Amado`,
      description,
      images: ["/opengraph-image.jpg"], // Remove new URL() for simpler path
    },
  };
};

const FilterDialog = dynamic(
  () => import("@/components/products/FilterDialog"),
  {
    loading: () => <FilterSheetSkeleton />,
  }
);

const ProductsPage = async ({ searchParams }: ProductPageProps) => {
  const {
    layout = "grid",
    search = "",
    sortBy = "name-a-z",
    category = "all",
    color = "",
    size = "",
  } = await searchParams;

  // Optimize data fetching - use Promise.all for better performance
  // Only use Promise.allSettled if you need the page to render even when APIs fail
  try {
    const [meta, totalProducts] = await Promise.all([
      fetchProductMeta(),
      countProducts({ search, category, color, size }),
    ]);

    const { categories, colors, sizes } = meta;
    const featuredCategories = categories.slice(0, 6);

    return (
      <main className="bg-gradient-hero">
        <ProductsBanner
          totalProducts={totalProducts}
          currentCategory={category}
          featuredCategories={featuredCategories}
          currentSearch={search}
        />
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6 flex items-center justify-between gap-4">
            <FilterDialog
              categories={categories}
              currentCategory={category}
              currentSort={sortBy}
              currentSearch={search}
              currentLayout={layout}
              colors={colors}
              sizes={sizes}
              currentColor={color}
              currentSize={size}
            />
          </div>
          <Suspense
            fallback={<ProductsGridSkeleton items={6} withFeaturedEvery={4} />}
          >
            <ProductsContainer
              layout={layout}
              search={search}
              category={category}
              sortBy={sortBy}
              color={color}
              size={size}
            />
          </Suspense>
        </section>
      </main>
    );
  } catch (error) {
    // Fallback for when data fetching fails
    console.error("Failed to fetch product data:", error);

    const fallbackMeta = { categories: [], colors: [], sizes: [] };
    const fallbackCategories: string[] | undefined = [];

    return (
      <main className="bg-gradient-hero">
        <ProductsBanner
          totalProducts={0}
          currentCategory={category}
          featuredCategories={fallbackCategories}
          currentSearch={search}
        />
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6 flex items-center justify-between gap-4">
            <FilterDialog
              categories={fallbackMeta.categories}
              currentCategory={category}
              currentSort={sortBy}
              currentSearch={search}
              currentLayout={layout}
              colors={fallbackMeta.colors}
              sizes={fallbackMeta.sizes}
              currentColor={color}
              currentSize={size}
            />
          </div>
          <Suspense
            fallback={<ProductsGridSkeleton items={6} withFeaturedEvery={4} />}
          >
            <ProductsContainer
              layout={layout}
              search={search}
              category={category}
              sortBy={sortBy}
              color={color}
              size={size}
            />
          </Suspense>
        </section>
      </main>
    );
  }
};

export default ProductsPage;
