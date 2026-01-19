import { Suspense } from "react";
import { notFound } from "next/navigation";
import { fetchFavoriteId, fetchSingleProduct } from "@/utils/actions";
import { getOptionalAuth } from "@/lib/clerk/authServer";
import BreadCrumbs from "@/components/single-product/BreadCrumbs";
import GallerySection from "@/components/single-product/GallerySection";
import ProductInfo from "@/components/single-product/ProductInfo";
import ReviewsSection from "@/components/single-product/ReviewSection";
import RelatedProducts from "@/components/single-product/RelatedProducts";
import ReviewsSkeleton from "@/components/skeleton/ReviewSkeleton";
import RelatedProductsSkeleton from "@/components/skeleton/RelatedProductsSkeleton";
import { TrackProductView } from "@/components/single-product/TrackProductView";

type ProductMainContentProps = {
  paramsPromise: Promise<{ productId: string }>;
};

export default async function ProductMainContent({
  paramsPromise,
}: ProductMainContentProps) {
  const { productId } = await paramsPromise;
  const product = await fetchSingleProduct(productId);

  if (!product) {
    notFound();
  }

  const userId = await getOptionalAuth();
  const favoriteId = userId ? await fetchFavoriteId({ productId }) : null;

  const { category, description, image, price, name, colors, sizes, type } =
    product;

  return (
    <>
      <BreadCrumbs name={product.name} />
      <div
        className="
          mt-6 grid grid-cols-1 gap-y-8
          lg:grid-cols-2 lg:gap-x-16 lg:items-start
        "
        data-equal-cols-root
        style={{ ["--equal-h" as any]: "600px" }}
      >
        <div className="md:mb-0 lg:[height:var(--equal-h)]">
          <GallerySection
            image={image}
            equalHeightVar="--equal-h"
            className="bg-gradient-metallic rounded-xl"
          />
        </div>

        <ProductInfo
          className="equal-height-source card-gradient-glass"
          name={name}
          price={price}
          category={category ?? []}
          colors={colors ?? []}
          type={type}
          sizes={sizes ?? []}
          description={description}
          favoriteId={favoriteId}
          productId={productId}
        />

        <div className="col-span-1 lg:col-span-2 mt-12">
          <Suspense fallback={<ReviewsSkeleton />}>
            <ReviewsSection productId={productId} userId={userId} />
          </Suspense>
        </div>
      </div>

      <div className="col-span-1 lg:col-span-2">
        <Suspense fallback={<RelatedProductsSkeleton />}>
          <RelatedProducts productId={product.id} type={product.type} />
        </Suspense>
      </div>

      <TrackProductView productId={product.id} />
    </>
  );
}
