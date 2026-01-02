import { db } from "@/db";
import { product } from "@/db/schema";
import { asc } from "drizzle-orm";

export async function getStaticProductIds() {
  try {
    const products = await db
      .select({ id: product.id })
      .from(product)
      .orderBy(asc(product.createdAt));

    return products.map(({ id }) => ({ productId: id }));
  } catch (error) {
    console.error("Static generation error:", error);
    return [];
  }
}
