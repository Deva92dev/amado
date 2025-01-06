/* eslint-disable @typescript-eslint/no-unused-vars */

import { Button } from "../ui/button";

type AddToCartProps = {
  productId: string;
};

const AddToCart = ({ productId }: AddToCartProps) => {
  return (
    <Button className="capitalize mt-8" size="lg">
      add to cart
    </Button>
  );
};

export default AddToCart;
