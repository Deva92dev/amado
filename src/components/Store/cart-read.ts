import { db } from "@/db";
import { cart } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getCartCount = async (clerkId: string) => {
  try {
    const userCart = await db.query.cart.findFirst({
      where: eq(cart.clerkId, clerkId),
      columns: { numItemsInCart: true },
    });

    return userCart?.numItemsInCart ?? 0;
  } catch (error) {
    // Safety fallback (return 0 instead of crashing the nav bar)
    console.error("Failed to fetch cart count:", error);
    return 0;
  }
};
