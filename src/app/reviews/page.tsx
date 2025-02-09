import SectionTitle from "@/components/global/SectionTitle";
import ReviewCard from "@/components/reviews/ReviewCard";
import { fetchProductReviewsByUser } from "@/utils/actions";
import { deleteReviewAction } from "../../utils/actions";
import FormContainer from "@/components/form/FormContainer";
import { IconButton } from "@/components/form/Buttons";

const ReviewPage = async () => {
  const reviews = await fetchProductReviewsByUser();
  if (reviews.length === 0)
    return <SectionTitle text="You have no reviews yet" />;

  return (
    <>
      <SectionTitle text="Your Reviews" />
      <section className="grid md:grid-cols-2 gap-8 mt-4">
        {reviews.map((review) => {
          const { comment, rating } = review;
          const { image, name } = review.product;
          const reviewInfo = {
            comment,
            rating,
            name,
            image,
          };
          return (
            <ReviewCard reviewInfo={reviewInfo} key={review.id}>
              <DeleteReview reviewId={review.id} />
            </ReviewCard>
          );
        })}
      </section>
    </>
  );
};

const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  const deleteReview = deleteReviewAction.bind(null, { reviewId });

  return (
    <FormContainer action={deleteReview}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
};

export default ReviewPage;
