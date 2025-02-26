import LoadingContainer from "@/components/global/LoadingContainer";
import ProductFilters from "@/components/products/ProductFilters";
import ProductsContainer from "@/components/products/ProductsContainer";
import { Metadata } from "next";
import { Suspense } from "react";

type ProductPageProps = {
  searchParams: Promise<{
    layout?: string;
    search?: string;
    category?: string;
    sortBy: SortOption;
  }>;
};

export type SortOption = "price-low" | "price-high" | "name-a-z" | "name-z-a";

export const generateMetadata = async ({
  searchParams,
}: ProductPageProps): Promise<Metadata> => {
  const { search } = await searchParams;
  const title = search
    ? `Search results for "${search}" - Amado`
    : "Shop Products - Amado";
  const description = search
    ? `Browse our collection of products matching "${search}" at Amado.`
    : "Explore a wide range of trending fashion products at Amado";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: "/products",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
};

const ProductsPage = async ({ searchParams }: ProductPageProps) => {
  const {
    layout = "grid",
    search = "",
    sortBy = "name-a-z",
    category = "all",
  } = await searchParams;
  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
      {/* Sidebar with filters - this will go in the first column */}
      <div className="md:col-span-1">
        <Suspense fallback={<div>Loading filters...</div>}>
          <ProductFilters
            currentCategory={category}
            currentSort={sortBy}
            currentSearch={search}
            currentLayout={layout}
          />
        </Suspense>
      </div>

      {/* Products container - this will go in the second column */}
      <div className="md:col-span-1">
        <Suspense fallback={<LoadingContainer />}>
          <ProductsContainer
            layout={layout}
            search={search}
            category={category}
            sortBy={sortBy}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default ProductsPage;
