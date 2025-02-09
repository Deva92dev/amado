"use client";

import { CartItemWithProduct } from "@/utils/types";
import { Card } from "../ui/card";
import { FirstColumn, ForthColumn, SecondColumn } from "./CartItemColumns";
import ThirdColumn from "./ThirdColumn";

const CartItemsList = ({ cartItems }: { cartItems: CartItemWithProduct[] }) => {
  return (
    <div>
      {cartItems.map((cartItem) => {
        const { id, amount } = cartItem;
        const {
          id: productId,
          image,
          name,
          price,
          category,
        } = cartItem.product;
        return (
          <Card
            key={id}
            className="flex flex-col gap-y-4 md:flex-row flex-wrap p-6 mb-8 gap-x-4"
          >
            <FirstColumn image={image} name={name} />
            <SecondColumn
              category={category}
              name={name}
              productId={productId}
            />
            <ThirdColumn id={id} quantity={amount} />
            <ForthColumn price={price} />
          </Card>
        );
      })}
    </div>
  );
};

export default CartItemsList;
