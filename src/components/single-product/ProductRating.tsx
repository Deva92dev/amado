/* eslint-disable @typescript-eslint/no-unused-vars */

import { FaStar } from "react-icons/fa";

const ProductRating = ({ productId }: { productId: string }) => {
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
