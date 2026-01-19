import { Suspense } from "react";
import RecentlyViewedSection from "@/components/single-product/RecentlyViewed";
import RecentlyViewedSkeleton from "@/components/skeleton/RecentlyViewedSkeleton";
import ProductMainContent from "@/components/single-product/ProductMainContent";
import { getStaticProductIds } from "@/utils/params";
import ProductPageSkeleton from "@/components/single-product/ProductPageSkeleton";

type SingleProductPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

export async function generateStaticParams() {
  return await getStaticProductIds();
}

const SingleProductPage = ({ params }: SingleProductPageProps) => {
  return (
    <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-gradient-hero">
      <Suspense fallback={<ProductPageSkeleton />}>
        <ProductMainContent paramsPromise={params} />
      </Suspense>

      <div className="col-span-1 lg:col-span-2">
        <Suspense fallback={<RecentlyViewedSkeleton />}>
          <RecentlyViewedSection />
        </Suspense>
      </div>
    </section>
  );
};

export default SingleProductPage;
