import { fetchProductRating } from "@/utils/actions";
import { Star } from "lucide-react";

type ProductRatingProps = {
  productId: string;
};

const ProductRating = async ({ productId }: ProductRatingProps) => {
  const { count, rating } = await fetchProductRating(productId);

  const className = `flex gap-1 mt-1 mb-4 items-center text-md`;
  const countValue = `(${count}) reviews`;
  return (
    <span className={className}>
      <Star className="w-3 h-3" />
      {/* {rating.toFixed(1)} {countValue} */}
      4.9 (30)
    </span>
  );
};

export default ProductRating;
