import SubmitReview from "../reviews/SubmitReview";
import ProductReviews from "../reviews/ProductReviews";
import { checkProductPurchase, findExistingReview } from "@/utils/actions";

async function ReviewsSection({
  productId,
  userId,
}: {
  productId: string;
  userId: string | null;
}) {
  const [hasPurchased, reviewExists] = await Promise.all([
    userId ? checkProductPurchase({ userId, productId }) : false,
    userId ? findExistingReview(userId, productId) : true,
  ]);

  const reviewDoesNotExist = Boolean(userId) && !reviewExists && hasPurchased;

  return (
    <>
      <ProductReviews productId={productId} />
      {hasPurchased && reviewDoesNotExist && (
        <SubmitReview productId={productId} />
      )}
    </>
  );
}

export default ReviewsSection;
