import { unstable_cache } from "next/cache";
import db from "@/utils/db";

export const getCartCount = unstable_cache(
  async (clerkId: string) => {
    const cart = await db.cart.findFirst({
      where: { clerkId },
      select: { numItemsInCart: true },
    });
    return cart?.numItemsInCart ?? 0;
  },
  ["cart:count:byUser"], // cache key seed
  { tags: ["cart:summary"] } // attach a general tag for cart summaries
);
