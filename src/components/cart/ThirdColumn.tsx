"use client";

import { useState } from "react";
import SelectProductAmount, {
  Mode,
} from "../single-product/SelectProductAmount";
import FormContainer from "../form/FormContainer";
import { removeCartItemAction, updateCartItemAction } from "@/utils/actions";
import { SubmitButton } from "../form/Buttons";
import { useToast } from "@/hooks/use-toast";

const ThirdColumn = ({ id, quantity }: { id: string; quantity: number }) => {
  const [amount, setAmount] = useState(quantity);
  const [, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAmountChange = async (value: number) => {
    setIsLoading(true);
    toast({ description: "Calculating" });
    const result = await updateCartItemAction({
      amount: value,
      cartItemId: id,
    });
    setAmount(value);
    toast({ description: result?.message });
    setIsLoading(false);
  };

  return (
    <div className="md:ml-8">
      <SelectProductAmount
        amount={amount}
        setAmount={handleAmountChange}
        mode={Mode.CartItem}
        isLoading={false}
      />
      <FormContainer action={removeCartItemAction}>
        <input type="hidden" name="id" value={id} />
        <SubmitButton size="sm" text="remove" className="mt-4" />
      </FormContainer>
    </div>
  );
};

export default ThirdColumn;
