import { Suspense } from "react";
import { Metadata } from "next";
import FilterDialog from "@/components/products/FilterDialog";
import ProductsBanner from "@/components/products/ProductsBanner";
import ProductsContainer from "@/components/products/ProductsContainer";
import { countProducts, fetchProductMeta } from "@/utils/actions";
import ProductsGridSkeleton from "@/components/products/ProductGridSkeleton";

type ProductPageProps = {
  searchParams: Promise<{
    layout?: string;
    search?: string;
    category?: string;
    color?: string;
    size?: string;
    sortBy: SortOption;
  }>;
};

export type SortOption = "price-low" | "price-high" | "name-a-z" | "name-z-a";

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: { search?: string };
}): Promise<Metadata> => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const { search } = searchParams;

  const title = search ? `Search results for "${search}"` : "Shop Products";
  const description = search
    ? `Browse our collection of products matching "${search}" at Amado.`
    : "Explore a wide range of trending fashion products at Amado.";

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
          url: new URL("/opengraph-default.jpg", baseUrl).toString(),
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
      images: [new URL("/opengraph-default.jpg", baseUrl).toString()],
    },
    applicationName: "Amado",
  };
};

const ProductsPage = async ({ searchParams }: ProductPageProps) => {
  const {
    layout = "grid",
    search = "",
    sortBy = "name-a-z",
    category = "all",
    color = "",
    size = "",
  } = await searchParams;

  // Promise.allSettled so the page still renders even if one call fails.
  const [metaRes, countRes] = await Promise.allSettled([
    fetchProductMeta(),
    countProducts({ search, category, color, size }),
  ]);

  const meta =
    metaRes.status === "fulfilled"
      ? metaRes.value
      : { categories: [], colors: [], sizes: [] };

  const totalProducts = countRes.status === "fulfilled" ? countRes.value : 0;

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
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
      </main>
    </main>
  );
};

export default ProductsPage;
