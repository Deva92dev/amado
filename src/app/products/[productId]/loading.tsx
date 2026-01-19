import ProductPageSkeleton from "@/components/single-product/ProductPageSkeleton";
import RecentlyViewedSkeleton from "@/components/skeleton/RecentlyViewedSkeleton";

export default function Loading() {
  return (
    <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-gradient-hero min-h-screen">
      <ProductPageSkeleton />
      <div className="mt-12">
        <RecentlyViewedSkeleton />
      </div>
    </section>
  );
}
