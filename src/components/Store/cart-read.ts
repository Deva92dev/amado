import db from "@/utils/db";

export const getCartCount = async (clerkId: string) => {
  try {
    const cart = await db.cart.findFirst({
      where: { clerkId },
      select: { numItemsInCart: true },
    });
    return cart?.numItemsInCart ?? 0;
  } catch (error) {
    // Safety fallback (return 0 instead of crashing the nav bar)
    console.error("Failed to fetch cart count:", error);
    return 0;
  }
};
