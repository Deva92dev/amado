"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "./cart";
import {
  addToCartAction,
  clearCartAction,
  removeCartItemAction,
  updateCartItemAction,
} from "@/utils/actions";
import { useToast } from "@/hooks/use-toast";

type AddOpts = { color?: string; size?: string };

// Client helper hook that bridges to Server Actions
export const useCartClient = () => {
  const router = useRouter();
  const { toast } = useToast();

  const addLocal = useCartStore((s) => s.addLocal);
  const setLocal = useCartStore((s) => s.setLocal);
  const removeLocal = useCartStore((s) => s.removeLocal);
  const clearLocal = useCartStore((s) => s.clearLocal);

  return {
    add: (productId: string, quantity = 1, opts?: AddOpts) => {
      addLocal(productId, quantity);
      startTransition(async () => {
        try {
          const fd = new FormData();
          fd.set("productId", productId);
          fd.set("amount", String(quantity));
          if (opts?.color) fd.set("color", opts.color);
          if (opts?.size) fd.set("size", opts.size);
          const res = await addToCartAction(undefined as any, fd);
          if (!res || (res as any).ok === false) {
            setLocal(productId, 0);
            toast({
              description: (res as any)?.message ?? "Failed to add to cart",
            });
            return;
          }
          router.refresh();
        } catch (e) {
          setLocal(productId, 0);
          toast({ description: "Failed to add to cart" });
        }
      });
    },
    update: (cartItemId: string, productId: string, quantity: number) => {
      // snapshot for precise rollback
      const prev = useCartStore.getState().lines[productId]?.quantity ?? 0;
      setLocal(productId, quantity);
      startTransition(async () => {
        try {
          const res = await updateCartItemAction({
            amount: quantity,
            cartItemId,
          });
          if (!res || (res as any).ok === false) {
            setLocal(productId, prev);
            toast({
              description: (res as any)?.message ?? "Failed to update cart",
            });
            return;
          }
          router.refresh();
        } catch (error) {
          setLocal(productId, prev);
          toast({ description: "Failed to update cart" });
        }
      });
    },
    remove: (cartItemId: string, productId: string) => {
      // snapshot for precise rollback
      const prev = useCartStore.getState().lines[productId]?.quantity ?? 0;
      const hadItem = prev > 0;
      removeLocal(productId);
      startTransition(async () => {
        try {
          const fd = new FormData();
          fd.set("id", cartItemId);
          const res = await removeCartItemAction(undefined, fd);
          if (!res || (res as any).ok === false) {
            if (hadItem) setLocal(productId, prev);
            toast({
              description: (res as any)?.message ?? "Failed to remove item",
            });
            return;
          }
          router.refresh();
        } catch (error) {
          if (hadItem) setLocal(productId, prev);
          toast({ description: "Failed to remove item" });
        }
      });
    },
    clear: async () => {
      const snapshot = useCartStore.getState().lines;
      clearLocal();
      try {
        const res = await clearCartAction();
        if (!res || (res as any).ok === false) {
          useCartStore.setState({ lines: snapshot });
          toast({
            description: (res as any)?.message ?? "Failed to clear cart",
          });
          return;
        }
        router.refresh();
      } catch (error) {
        useCartStore.setState({ lines: snapshot });
        toast({ description: "Failed to clear cart" });
        throw new Error("clear failed");
      }
    },

    // If you want to expose local-only clear as well
    clearLocalOnly: () => {
      clearLocal();
    },
  };
};
