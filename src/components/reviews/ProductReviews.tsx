import { fetchProductReviews } from "@/utils/actions";
import SectionTitle from "../global/SectionTitle";
import ReviewCard from "./ReviewCard";

const ProductReviews = async ({ productId }: { productId: string }) => {
  const reviews = await fetchProductReviews(productId);

  return (
    <div className="mt-16">
      <SectionTitle text="Product Reviews" />

      <div className="grid md:grid-cols-2 gap-8 my-8">
        {reviews.map((review) => {
          const { authorImageUrl, authorName, comment, rating } = review;
          const reviewInfo = {
            comment,
            rating,
            image: authorImageUrl,
            name: authorName,
          };

          return <ReviewCard key={review.id} reviewInfo={reviewInfo} />;
        })}
      </div>
    </div>
  );
};

export default ProductReviews;
