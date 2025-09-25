"use client";

import { useState, useTransition } from "react";
import SelectProductAmount, { Mode } from "./SelectProductAmount";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import { useCartClient } from "@/components/Store/cart-client";
import { useCartUI } from "@/components/Store/cart-ui";
import { toast } from "@/hooks/use-toast";
import { useAuthUser } from "@/lib/clerk/authClient";

type FormState = { message: string };

type AddToCartProps = {
  productId: string;
  compact?: boolean;
  className?: string;
  color?: string;
  size?: string;
};

export default function AddToCart({
  productId,
  compact = false,
  className,
  color,
  size,
}: AddToCartProps) {
  const [amount, setAmount] = useState(1);
  const { user } = useAuthUser();
  const userId = user?.id;
  const { add } = useCartClient();
  const [pending, startTransition] = useTransition();
  const openDrawer = useCartUI((s) => s.openDrawer);

  if (!userId) return "";

  if (compact) {
    return (
      <button
        type="button"
        className={`btn btn-brand rounded-lg p-2 w-full ${className ?? ""}`}
        disabled={pending}
        aria-busy={pending}
        onClick={() => {
          startTransition(async () => {
            try {
              await add(productId, 1, { color, size });
              openDrawer();
            } catch {
              toast({ description: "failed to add to cart" });
            }
          });
        }}
      >
        {pending ? "Adding..." : "Add to cart"}
      </button>
    );
  }

  const formAction = async (
    _prev: FormState,
    formData: FormData
  ): Promise<FormState> => {
    const q = Number(formData.get("amount") ?? 1);
    const clr = (formData.get("color") as string) || color || "";
    const sz = (formData.get("size") as string) || size || "";
    try {
      await add(productId, q, {
        color: clr || undefined,
        size: sz || undefined,
      });
      openDrawer();
      return { message: "Added to cart" };
    } catch {
      return { message: "Failed to add to cart" };
    }
  };

  return (
    <div className={className}>
      <SelectProductAmount
        mode={Mode.SingleProduct}
        amount={amount}
        setAmount={setAmount}
      />
      <FormContainer action={formAction}>
        <input type="hidden" name="productId" value={productId} />
        <input type="hidden" name="amount" value={amount} />
        <input type="hidden" name="color" value={color ?? ""} />
        <input type="hidden" name="size" value={size ?? ""} />
        <SubmitButton
          text={pending ? "Adding..." : "add to cart"}
          size="default"
          className="mt-8"
        />
      </FormContainer>
    </div>
  );
}
