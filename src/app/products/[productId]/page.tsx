import { cache } from "react";
import { Metadata } from "next";
import ProductReviews from "@/components/reviews/ProductReviews";
import SubmitReview from "@/components/reviews/SubmitReview";
import BreadCrumbs from "@/components/single-product/BreadCrumbs";
import GallerySection from "@/components/single-product/GallerySection";
import ProductInfo from "@/components/single-product/ProductInfo";
import {
  checkProductPurchase,
  fetchFavoriteId,
  fetchSingleProduct,
  findExistingReview,
} from "@/utils/actions";
import RelatedProducts from "@/components/single-product/RelatedProducts";
import RecentlyViewedSection from "@/components/single-product/RecentlyViewed";
import { TrackProductView } from "@/components/single-product/TrackProductView";
import { getOptionalAuth } from "@/lib/clerk/authServer";

type SingleProductPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

const getSingleProduct = cache(fetchSingleProduct);

export const generateMetadata = async ({
  params,
}: SingleProductPageProps): Promise<Metadata> => {
  const { productId } = await params;
  const product = await getSingleProduct(productId);

  if (!product) {
    return {
      title: "Product Not Found - Amado",
      description: "The product you are looking for does not exist.",
      openGraph: {
        title: "Product Not Found - Amado",
        description: "The product you are looking for does not exist.",
      },
    };
  }

  const { name, description, image, category } = product;
  const title = `${name} - Amado`;
  const metaDescription =
    description || `Shop ${name} in ${category.join(", ")} at Amado.`;

  return {
    title,
    description: metaDescription,
    openGraph: {
      title,
      description: metaDescription,
      images: [image],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: metaDescription,
      images: [image],
    },
  };
};

// inline above the fold css
const SingleProductPage = async ({ params }: SingleProductPageProps) => {
  const { productId } = await params;
  const product = await getSingleProduct(productId);

  if (!product) {
    // Optionally render a 404 page or redirect
    return (
      <section className="py-20">
        <h1 className="text-3xl font-bold">Product not found</h1>
      </section>
    );
  }

  const userId = await getOptionalAuth();

  // parallel when signed-in; skip entirely for guests
  const [favoriteId, hasPurchased, reviewExists] = await Promise.all([
    userId ? fetchFavoriteId({ productId }) : Promise.resolve(null),
    userId
      ? checkProductPurchase({ userId, productId })
      : Promise.resolve(false),
    userId ? findExistingReview(userId, product.id) : Promise.resolve(true),
  ]);

  // A signed-in user can post a review only if they purchased and no review exists yet
  const reviewDoesNotExist = Boolean(userId) && !reviewExists && hasPurchased;

  const { category, description, image, price, name, colors, sizes, type } =
    product;

  return (
    <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-gradient-hero">
      <BreadCrumbs name={product.name} />
      <div
        className="
          mt-6 grid grid-cols-1 gap-y-8
          lg:grid-cols-2 lg:gap-x-16 lg:items-start
        "
        data-equal-cols-root
        style={{ ["--equal-h" as any]: "600px" }}
      >
        <ProductInfo
          className="equal-height-source card-gradient-glass"
          name={name}
          price={price}
          category={category}
          colors={colors}
          type={type}
          sizes={sizes}
          description={description}
          favoriteId={favoriteId}
          productId={productId}
        />
        <div className="md:mb-0 lg:[height:var(--equal-h)]">
          <GallerySection
            image={image}
            equalHeightVar="--equal-h"
            className="bg-gradient-metallic rounded-xl"
          />
        </div>
        <div className="col-span-1 lg:col-span-2 mt-12">
          <ProductReviews productId={productId} />
          {hasPurchased && reviewDoesNotExist && (
            <SubmitReview productId={productId} />
          )}
        </div>
      </div>
      <div className="col-span-1 lg:col-span-2">
        <RelatedProducts productId={product.id} type={product.type} />
        <RecentlyViewedSection />
      </div>
      <TrackProductView productId={product.id} />
    </section>
  );
};

export default SingleProductPage;
