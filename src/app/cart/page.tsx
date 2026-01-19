import { redirect } from "next/navigation";
import { Metadata } from "next";
import CartItemsList from "@/components/cart/CartItemsList";
import CartTotals from "@/components/cart/CartTotals";
import SectionTitle from "@/components/global/SectionTitle";
import ClearCartButton from "@/components/cart/ClearCartButton";
import { fetchOrCreateCartId, updateCart } from "@/utils/actions";
import { requireAuth } from "@/lib/clerk/authServer";
import { db } from "@/db";
import { asc, eq } from "drizzle-orm";
import { cartItem } from "@/db/schema";

export const metadata: Metadata = { title: "Cart" };

const CartPage = async () => {
  const userId = await requireAuth();
  if (!userId) redirect("/");
  const cartInfo = await fetchOrCreateCartId(userId);
  const currentCart = await updateCart(cartInfo);
  // Items with product only for this page render
  const cartItems = await db.query.cartItem.findMany({
    where: eq(cartItem.cartId, currentCart.id),
    with: {
      product: true,
    },
    orderBy: asc(cartItem.createdAt),
  });

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen py-24 flex items-center justify-center">
        <SectionTitle text="Empty Cart" />
      </div>
    );
  }

  return (
    <main className="py-24">
      <div className="flex items-center justify-between px-4 mt-8">
        <SectionTitle text="Your Shopping Cart" />
        <ClearCartButton />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsList cartItems={cartItems} />
        </div>
        <div className="lg:col-span-4 lg:pl-4 space-y-4">
          <CartTotals cart={currentCart as any} />
        </div>
      </div>
    </main>
  );
};

export default CartPage;
