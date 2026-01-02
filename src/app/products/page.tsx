import { Suspense } from "react";
import FilterSheetSkeleton from "@/components/products/FilterSheetSkeleton";
import ProductsGridSkeleton from "@/components/products/ProductGridSkeleton";
import ProductsBannerWrapper from "@/components/products/ProductsBannerWrapper";
import ProductsContainer from "@/components/products/ProductsContainer";
import FilterDialogWrapper from "@/components/products/FilterDialogWrapper";
import BannerSkeleton from "@/components/products/BannerSkeleton";

export type SortOption = "price-low" | "price-high" | "name-a-z" | "name-z-a";

type PageProps = {
  searchParams: Promise<{
    layout?: "grid" | "list";
    search?: string;
    category?: string;
    color?: string;
    size?: string;
    sortBy?: SortOption;
  }>;
};

const ProductsPage = async (props: PageProps) => {
  const searchParamsPromise = props.searchParams;

  return (
    <main className="bg-gradient-hero">
      <Suspense fallback={<BannerSkeleton />}>
        <ProductsBannerWrapper paramsPromise={searchParamsPromise} />
      </Suspense>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Suspense fallback={<FilterSheetSkeleton />}>
            <FilterDialogWrapper paramsPromise={searchParamsPromise} />
          </Suspense>
        </div>

        <Suspense fallback={<ProductsGridSkeleton items={6} />}>
          <ProductsContainer paramsPromise={searchParamsPromise} />
        </Suspense>
      </section>
    </main>
  );
};

export default ProductsPage;
