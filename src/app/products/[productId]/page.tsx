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
    // openGraph: {
    //   title,
    //   description: metaDescription,
    //   type: "product",
    //   url: `/products/${productId}`,
    //   images: [
    //     {
    //       url: image,
    //       alt: name,
    //     },
    //   ],
    // },
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
  const favoriteId = userId ? await fetchFavoriteId({ productId }) : null;

  const hasPurchased = userId
    ? await checkProductPurchase({ userId, productId })
    : false;

  const reviewDoesNotExist =
    userId && !(await findExistingReview(userId, product.id)) && hasPurchased;

  const { category, description, image, price, name } = product;
  const formattedPrice = formatCurrency(price);

  return (
    <section>
      <BreadCrumbs name={product.name} />
      <div className="mt-6 grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        <div className="relative h-full min-h-[300px] lg:min-h-0">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
            priority
            className="w-full rounded-md object-cover"
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
          <h2 className="text-xl mt-2">{category.join(", ")}</h2>
          <p className="mt-3 text-md bg-muted inline-block p-2 rounded-md">
            {formattedPrice}
          </p>
          <p className="mt-6 leading-8 text-muted-foreground ">{description}</p>
          <AddToCart productId={productId} />
        </div>
        <ProductReviews productId={productId} />
        {hasPurchased && reviewDoesNotExist && (
          <SubmitReview productId={productId} />
        )}
      </div>
    </section>
  );
};

export default SingleProductPage;
