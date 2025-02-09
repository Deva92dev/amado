import { FaStar } from "react-icons/fa";

type ProductRatingProps = {
  productId: string;
};

const ProductRating = ({ productId }: ProductRatingProps) => {
  // change them programmatically later
  const rating = 4.2;
  const count = 20;

  const className = `flex gap-1 mt-1 mb-4 items-center text-md`;
  const countValue = `(${count}) reviews`;
  return (
    <span className={className}>
      <FaStar className="w-3 h-3" />
      {rating} {countValue}
    </span>
  );
};

export default ProductRating;
