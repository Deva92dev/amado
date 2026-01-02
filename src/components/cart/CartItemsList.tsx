"use client";

import { useOptimistic, useTransition } from "react";
import { Card } from "../ui/card";
import { FirstColumn, ForthColumn, SecondColumn } from "./CartItemColumns";
import ThirdColumn from "./ThirdColumn";
import type { CartItemWithProduct } from "@/utils/types";

type Props = { cartItems: CartItemWithProduct[] };

const CartItemsList = ({ cartItems }: Props) => {
  const [isPending, startTransition] = useTransition();

  // Optimistic list that removes an item by id
  const [items, removeOptimistic] = useOptimistic(
    cartItems,
    (state: CartItemWithProduct[], removeId: string) =>
      state.filter((i) => i.id !== removeId)
  );

  // Wrap remove to first update UI, then run server mutation
  const handleRemove = (id: string, removeFn: () => Promise<void>) => {
    startTransition(async () => {
      removeOptimistic(id);
      await removeFn();
    });
  };

  return (
    <div>
      {items.map((cartItem) => {
        const { id: cartItemId, amount, color, size } = cartItem;
        const {
          id: productId,
          image,
          name,
          price,
          category,
        } = cartItem.product;

        return (
          <Card
            key={cartItemId}
            className="flex flex-col gap-y-4 md:flex-row flex-wrap p-6 mb-8 gap-x-4"
          >
            <FirstColumn image={image} name={name} />
            <SecondColumn
              category={category ?? []}
              name={name}
              productId={productId}
              color={color}
              size={size}
            />
            {/* CHANGED: pass both cartItemId and productId */}
            <ThirdColumn
              cartItemId={cartItemId}
              productId={productId}
              quantity={amount}
              onRemoved={() => handleRemove(cartItemId, async () => {})}
            />
            <ForthColumn price={price} />
          </Card>
        );
      })}
    </div>
  );
};

export default CartItemsList;
