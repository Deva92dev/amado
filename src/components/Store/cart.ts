import { create } from "zustand";
import { persist } from "zustand/middleware";

// Mirrors CartItem schema intent: productId + amount (as quantity in UI)
export type CartLine = {
  productId: string;
  quantity: number;
};

// Keyed by productId because server actions use productId for add + updateOrCreate
type CartState = {
  lines: Record<string, CartLine>;
  totalCount: () => number; // mirrors Cart.numItemsInCart
  // Local-only optimistic mutations
  addLocal: (productId: string, quantity?: number) => void;
  setLocal: (productId: string, quantity: number) => void;
  removeLocal: (productId: string) => void;
  clearLocal: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: {},
      totalCount: () =>
        Object.values(get().lines).reduce((n, l) => n + l.quantity, 0),
      addLocal: (productId, q = 1) =>
        set((s) => {
          const prev = s.lines[productId]?.quantity ?? 0;
          return {
            lines: {
              ...s.lines,
              [productId]: { productId, quantity: prev + q },
            },
          };
        }),
      setLocal: (productId, q) =>
        set((s) => {
          const next = { ...s.lines };
          if (q <= 0) delete next[productId];
          else next[productId] = { productId, quantity: q };
          return { lines: next };
        }),
      removeLocal: (productId) =>
        set((s) => {
          const next = { ...s.lines };
          delete next[productId];
          return { lines: next };
        }),
      clearLocal: () => set({ lines: {} }),
    }),
    { name: "cart-local" }
  )
);
