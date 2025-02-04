import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import ProductReviews from "@/components/reviews/ProductReviews";
import SubmitReview from "@/components/reviews/SubmitReview";
import AddToCart from "@/components/single-product/AddToCart";
import BreadCrumbs from "@/components/single-product/BreadCrumbs";
import ProductRating from "@/components/single-product/ProductRating";
import ShareButton from "@/components/single-product/ShareButton";
import { fetchFavoriteId, fetchSingleProduct } from "@/utils/actions";
import { formatCurrency } from "@/utils/format";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

type SingleProductPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

const SingleProductPage = async ({ params }: SingleProductPageProps) => {
  const { productId } = await params;
  const product = await fetchSingleProduct(productId);
  // if the user is not logged in
  const { userId } = await auth();
  const favoriteId = userId ? await fetchFavoriteId({ productId }) : null;

  const { category, description, image, price, name } = product;
  const formattedPrice = formatCurrency(price);

  return (
    <section>
      <BreadCrumbs name={product.name} />
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* Image First Col , add more images later and more functionality in images*/}
        <div className="relative h-full">
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
          <h4 className="text-xl mt-2">{category.join(", ")}</h4>
          <p className="mt-3 text-md bg-muted inline-block p-2 rounded-md">
            {formattedPrice}
          </p>
          <p className="mt-6 leading-8 text-muted-foreground ">{description}</p>
          <AddToCart productId={productId} />
        </div>
        <ProductReviews productId={productId} />
        <SubmitReview productId={productId} />
      </div>
    </section>
  );
};

export default SingleProductPage;
