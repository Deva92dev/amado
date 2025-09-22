import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import db from "@/utils/db";
import CartItemsList from "@/components/cart/CartItemsList";
import CartTotals from "@/components/cart/CartTotals";
import SectionTitle from "@/components/global/SectionTitle";
import ClearCartButton from "@/components/cart/ClearCartButton";
import { fetchOrCreateCartId, updateCart } from "@/utils/actions";

export const metadata: Metadata = { title: "Cart" };

const CartPage = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/");
  const cartInfo = await fetchOrCreateCartId(userId);
  const currentCart = await updateCart(cartInfo);
  // 3) Items with product only for this page render
  const cartItems = await db.cartItem.findMany({
    where: { cartId: currentCart.id },
    include: { product: true },
    orderBy: { createdAt: "asc" },
  });

  if (cartItems.length === 0) {
    return <SectionTitle text="Empty Cart" />;
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
