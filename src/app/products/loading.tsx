import BannerSkeleton from "@/components/products/BannerSkeleton";
import FilterSheetSkeleton from "@/components/products/FilterSheetSkeleton";
import ProductsGridSkeleton from "@/components/products/ProductGridSkeleton";

export default function Loading() {
  return (
    <main className="bg-gradient-hero min-h-screen">
      <BannerSkeleton />
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6 flex items-center justify-between gap-4">
          <FilterSheetSkeleton />
        </div>
        <ProductsGridSkeleton items={6} />
      </section>
    </main>
  );
}
