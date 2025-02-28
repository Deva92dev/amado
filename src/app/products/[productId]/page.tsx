import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import ProductReviews from "@/components/reviews/ProductReviews";
import SubmitReview from "@/components/reviews/SubmitReview";
import AddToCart from "@/components/single-product/AddToCart";
import BreadCrumbs from "@/components/single-product/BreadCrumbs";
import ProductRating from "@/components/single-product/ProductRating";
import ShareButton from "@/components/single-product/ShareButton";
import {
  checkProductPurchase,
  fetchFavoriteId,
  fetchSingleProduct,
  findExistingReview,
} from "@/utils/actions";
import { formatCurrency } from "@/utils/format";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import Image from "next/image";
import { cache } from "react";

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
    };
  }

  const { name, description, image, category } = product;
  const title = `${name} - Amado`;
  const metaDescription =
    description || `Shop ${name} in ${category.join(", ")} at Amado.`;

  return {
    title,
    description: metaDescription,
    twitter: {
      card: "summary_large_image",
      title,
      description: metaDescription,
      images: [image],
    },
  };
};

const SingleProductPage = async ({ params }: SingleProductPageProps) => {
  const { productId } = await params;
  const product = await getSingleProduct(productId);
  // if the user is not logged in
  const { userId } = await auth();

  const [favoriteId, hasPurchased, reviewExists] = await Promise.all([
    userId ? fetchFavoriteId({ productId }) : null,
    userId ? checkProductPurchase({ userId, productId }) : false,
    userId ? findExistingReview(userId, product.id) : true,
  ]);

  const reviewDoesNotExist = userId && !reviewExists && hasPurchased;
  const { category, description, image, price, name } = product;
  const formattedPrice = formatCurrency(price);
  const categoryText = category.join(", ");

  const imageWidth = 800;
  const imageHeight = 600;

  return (
    <section>
      <BreadCrumbs name={product.name} />
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-16 items-stretch grid-rows-[auto_1fr_auto]">
        <div className="relative aspect-[4/3] w-full min-h-[300px] lg:min-h-0">
          <Image
            src={image}
            alt={name}
            width={imageWidth}
            height={imageHeight}
            priority
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
            className="rounded-md object-cover absolute inset-0 w-full h-full"
          />
        </div>
        {/* productInfo second col */}
        <div>
          <div className="flex gap-x-8 items-center">
            <h1 className="capitalize text-3xl font-bold">{name} </h1>
            <div className="flex items-center gap-x-2">
              <FavoriteToggleButton
                favoriteId={favoriteId}
                productId={productId}
              />
              <ShareButton name={product.name} productId={product.id} />
            </div>
          </div>
          <ProductRating productId={productId} />
          <h2 className="text-xl mt-2">{categoryText}</h2>
          <p className="mt-3 text-md bg-muted inline-block p-2 rounded-md">
            {formattedPrice}
          </p>
          <p className="mt-6 leading-8 text-muted-foreground ">{description}</p>
          <AddToCart productId={productId} />
        </div>
        <div className="col-span-1 lg:col-span-2 mt-12">
          <ProductReviews productId={productId} />
          {hasPurchased && reviewDoesNotExist && (
            <SubmitReview productId={productId} />
          )}
        </div>
      </div>
    </section>
  );
};

export default SingleProductPage;
