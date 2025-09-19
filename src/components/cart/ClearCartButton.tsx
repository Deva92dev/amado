"use client";

import FormContainer from "@/components/form/FormContainer";
import { SubmitButton } from "@/components/form/Buttons";
import { useCartClient } from "../Store/cart-client";

type FormState = { message: string };

export default function ClearCartButton() {
  const { clear } = useCartClient();

  // Two-arg action to satisfy FormContainer (useActionState)
  const clearAction = async (
    _prev: FormState,
    _fd: FormData
  ): Promise<FormState> => {
    try {
      await clear();
      return { message: "Cart cleared" };
    } catch {
      return { message: "Failed to clear cart" };
    }
  };

  return (
    <FormContainer action={clearAction}>
      <SubmitButton size="sm" text="Clear cart" />
    </FormContainer>
  );
}
