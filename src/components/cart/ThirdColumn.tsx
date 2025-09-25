"use client";

import { useState } from "react";
import SelectProductAmount, {
  Mode,
} from "../single-product/SelectProductAmount";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import { useToast } from "@/hooks/use-toast";
import { useCartClient } from "@/components/Store/cart-client";

type FormState = { message: string };

const ThirdColumn = ({
  cartItemId,
  productId,
  quantity,
  onRemoved,
}: {
  cartItemId: string;
  productId: string;
  quantity: number;
  onRemoved?: () => void;
}) => {
  const [amount, setAmount] = useState(quantity);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { update, remove } = useCartClient();

  const handleAmountChange = async (value: number) => {
    setIsLoading(true);
    toast({ description: "Updating..." });
    try {
      // Optimistic + server mutation
      await update(cartItemId, productId, value);
      setAmount(value);
      toast({ description: "Cart updated" });
    } catch {
      toast({ description: "Failed to update cart" });
    } finally {
      setIsLoading(false);
    }
  };

  // Two-arg action for FormContainer (useActionState-compatible)
  const removeAction = async (
    _prev: FormState,
    _formData: FormData
  ): Promise<FormState> => {
    try {
      await remove(cartItemId, productId);
      onRemoved?.();
      return { message: "Item removed from cart" };
    } catch {
      return { message: "Failed to remove item" };
    }
  };

  return (
    <div className="md:ml-8">
      <SelectProductAmount
        amount={amount}
        setAmount={handleAmountChange}
        mode={Mode.CartItem}
        isLoading={isLoading}
      />
      <FormContainer action={removeAction}>
        <input type="hidden" name="id" value={cartItemId} />
        <SubmitButton size="sm" text="remove" className="mt-4" />
      </FormContainer>
    </div>
  );
};

export default ThirdColumn;
