"use server";

import { notFound, redirect } from "next/navigation";

import {
  eq,
  ilike,
  and,
  or,
  sql,
  desc,
  asc,
  inArray,
  ne,
  arrayContains,
  count,
  gt,
  avg,
  isNull,
} from "drizzle-orm";
import {
  imageSchema,
  productSchema,
  reviewSchema,
  ValidateWithZodSchema,
} from "./schemas";
import { deleteImage, uploadImage, uploadVideo } from "./supabase";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  FeaturedCollectionCategoryType,
  FeaturedCollectionType,
  FeaturedProduct,
  ToggleFavoriteInput,
} from "./types";
import {
  getOptionalAuth,
  requireAdminAuth,
  requireAuth,
  requireUserWithEmail,
} from "@/lib/clerk/authServer";
import { CachePresets, createCache } from "./cache";
import { getCartCount } from "@/components/Store/cart-read";
import { db } from "@/db";
import {
  product,
  cart,
  cartItem,
  favorite,
  order,
  orderItem,
  review,
} from "@/db/schema";
import { randomUUID } from "crypto";

const folder = "Amado";

type FormState = {
  message: string;
};

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : "an error occurred",
  };
};

export async function uploadVideoAction(
  video: File,
  folder: string,
  userId: string
) {
  return await uploadVideo(video, folder, userId);
}

export const getFeaturedCollection = createCache(
  async (): Promise<FeaturedCollectionCategoryType> => {
    try {
      const products = await db
        .select({
          id: product.id,
          name: product.name,
          image: product.image,
          category: product.category,
          price: product.price,
        })
        .from(product)
        .where(
          or(
            arrayContains(product.category, ["men"]),
            arrayContains(product.category, ["women"]),
            arrayContains(product.category, ["winter"]),
            arrayContains(product.category, ["summer"]),
            arrayContains(product.category, ["casual"])
          )
        );

      // We map over the DB result and ensure 'category' is never null.
      const safeProducts: FeaturedCollectionType[] = products.map((p) => ({
        id: p.id,
        name: p.name,
        image: p.image,
        category: p.category ?? [],
        price: p.price,
      }));

      const buckets: Record<
        keyof FeaturedCollectionCategoryType,
        FeaturedCollectionType[]
      > = {
        men: [],
        women: [],
        winter: [],
        summer: [],
        casual: [],
      };

      for (const p of safeProducts) {
        if (p.category.includes("men")) buckets.men.push(p);
        if (p.category.includes("women")) buckets.women.push(p);
        if (p.category.includes("winter")) buckets.winter.push(p);
        if (p.category.includes("summer")) buckets.summer.push(p);
        if (p.category.includes("casual")) buckets.casual.push(p);
      }

      const distinctByImage = (arr: FeaturedCollectionType[]) => {
        const seen = new Set<string>();
        const out: FeaturedCollectionType[] = [];
        for (const item of arr) {
          if (!seen.has(item.image)) {
            seen.add(item.image);
            out.push(item);
          }
        }
        return out;
      };

      return {
        men: distinctByImage(buckets.men),
        women: distinctByImage(buckets.women),
        winter: distinctByImage(buckets.winter),
        summer: distinctByImage(buckets.summer),
        casual: distinctByImage(buckets.casual),
      };
    } catch (error) {
      console.error("getFeaturedCollection error:", error);
      return { men: [], women: [], winter: [], summer: [], casual: [] };
    }
  },
  CachePresets.daily(["featured_collection"])
);

const _fetchFeaturedProducts = createCache(
  async (userId: string | null) => {
    if (!userId) {
      const products = await db
        .select({
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
        })
        .from(product)
        .where(eq(product.featured, true));

      return products.map<FeaturedProduct>((p: any) => ({
        ...p,
        favoriteId: null,
      }));
    }

    // Authenticated: Join with favorites to check if user liked it
    // We use a subquery count or a filtered left join logic
    // Using a raw SQL helper for the specific user count is efficient here
    const products = await db
      .select({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        // Count how many favorites exist for this product AND this user
        favoriteCount:
          sql<number>`(SELECT count(*) FROM "Favorite" WHERE "Favorite"."productId" = "Product"."id" AND "Favorite"."clerkId" = ${userId})`.mapWith(
            Number
          ),
      })
      .from(product)
      .where(eq(product.featured, true));

    return products.map<FeaturedProduct>(
      (p: {
        id: any;
        name: any;
        image: any;
        price: any;
        favoriteCount: number;
      }) => ({
        id: p.id,
        name: p.name,
        image: p.image,
        price: p.price,
        favoriteId: p.favoriteCount > 0 ? "favorited" : null,
      })
    );
  },
  {
    revalidate: 60 * 60 * 24,
    tags: ["featured_products", "products", "favorites"],
    keyPrefix: "fetchFeaturedProducts",
  }
);

export async function getSearchSuggestions(query: string): Promise<string[]> {
  if (!query || query.length < 2) {
    return [];
  }

  try {
    const products = await db
      .selectDistinctOn([product.name], { name: product.name })
      .from(product)
      .where(
        or(
          ilike(product.name, `%${query}%`),
          ilike(product.description, `%${query}%`)
        )
      )
      .limit(6);

    return products.map((p: { name: any }) => p.name);
  } catch (error) {
    console.error("Search suggestions error:", error);
    return [];
  }
}

export async function fetchFeaturedProducts(): Promise<FeaturedProduct[]> {
  const userId = await getOptionalAuth();
  // Pass only serializable primitive(s) into the cached worker
  return _fetchFeaturedProducts(userId ?? null);
}

export const fetchAllProductsForSitemap = async () => {
  const products = await db
    .select({
      id: product.id,
      updatedAt: product.updatedAt,
    })
    .from(product);
  return products;
};

export const fetchAllProducts = async ({
  search = "",
  category = "all",
  color,
  size,
  userId, // pass the current user id from caller when available
}: {
  search?: string;
  category?: string;
  color?: string;
  size?: string;
  userId?: string | null;
}) => {
  const conditions = [];

  if (search) {
    conditions.push(
      or(
        ilike(product.name, `%${search}%`),
        ilike(product.description, `%${search}%`)
      )
    );
  }

  if (category && category !== "all" && category !== "undefined") {
    conditions.push(arrayContains(product.category, [category]));
  }

  // Also fix color and size just in case
  if (color && color !== "undefined") {
    conditions.push(arrayContains(product.colors, [color]));
  }

  if (size && size !== "undefined") {
    conditions.push(arrayContains(product.sizes, [size]));
  }

  if (!userId) {
    // Unauthenticated
    const rows = await db
      .select({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        type: product.type,
        colors: product.colors,
        sizes: product.sizes,
      })
      .from(product)
      .where(and(...conditions))
      .orderBy(asc(product.createdAt));

    return rows.map((r: any) => ({
      ...r,
      favoriteIds: [],
      isFavorited: false,
    }));
  }

  // Authenticated
  const rows = await db
    .select({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      type: product.type,
      colors: product.colors,
      sizes: product.sizes,
      favoriteCount:
        sql<number>`(SELECT count(*) FROM "Favorite" WHERE "Favorite"."productId" = "Product"."id" AND "Favorite"."clerkId" = ${userId})`.mapWith(
          Number
        ),
    })
    .from(product)
    .where(and(...conditions))
    .orderBy(asc(product.createdAt));

  return rows.map((r: any) => ({
    id: r.id,
    name: r.name,
    price: r.price,
    image: r.image,
    type: r.type,
    colors: r.colors,
    sizes: r.sizes,
    favoriteIds: r.favoriteCount > 0 ? ["favorited"] : [],
    isFavorited: r.favoriteCount > 0,
  }));
};

export const countProducts = createCache(
  async ({
    search = "",
    category = "all",
    color = "",
    size = "",
  }: {
    search?: string;
    category?: string;
    color?: string;
    size?: string;
  }) => {
    const conditions = [];

    if (search) {
      conditions.push(
        or(
          ilike(product.name, `%${search}%`),
          ilike(product.description, `%${search}%`)
        )
      );
    }
    if (category && category !== "all") {
      conditions.push(arrayContains(product.category, [category]));
    }
    if (color) {
      conditions.push(arrayContains(product.colors, [color]));
    }
    if (size) {
      conditions.push(arrayContains(product.sizes, [size]));
    }

    const result = await db
      .select({ count: count() })
      .from(product)
      .where(and(...conditions));

    return result[0].count;
  },
  CachePresets.dynamic(["products", "meta"])
);

export const fetchProductMeta = async () => {
  const [cats, cols, siz] = await Promise.all([
    db.execute(
      sql`SELECT DISTINCT unnest("category") AS v FROM "Product" WHERE cardinality("category") > 0`
    ),
    db.execute(
      sql`SELECT DISTINCT unnest("colors") AS v FROM "Product" WHERE cardinality("colors") > 0`
    ),
    db.execute(
      sql`SELECT DISTINCT unnest("sizes") AS v FROM "Product" WHERE cardinality("sizes") > 0`
    ),
  ]);

  // FIX: Handle both standard array return and object with .rows property
  const mapResult = (res: any) => {
    const rows = Array.isArray(res) ? res : res.rows || [];
    return rows.map((r: any) => r.v).sort() as string[];
  };

  return {
    categories: mapResult(cats),
    colors: mapResult(cols),
    sizes: mapResult(siz),
  };
};

export const fetchSingleProduct = async (productId: string) => {
  const result = await db.query.product.findFirst({
    where: eq(product.id, productId),
    with: {
      favorites: {
        columns: {
          id: true,
          clerkId: true,
        },
      },
    },
  });

  if (!result) {
    notFound();
  }
  return result;
};

export const fetchProductByIds = createCache(async (ids: string[]) => {
  if (!ids.length) return [];

  const products = await db
    .select({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
    })
    .from(product)
    .where(inArray(product.id, ids));

  const map = new Map(products.map((p: any) => [p.id, p]));
  return ids.map((id) => map.get(id)).filter(Boolean) as typeof products;
}, CachePresets.static(["products", "bulk"]));

export const fetchRelatedProducts = createCache(
  async (params: { productId: string; type: string }) => {
    const { productId, type } = params;
    const related = await db
      .select({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
      })
      .from(product)
      .where(and(ne(product.id, productId), eq(product.type, type)))
      .orderBy(desc(product.updatedAt));

    return related;
  },
  CachePresets.weekly(["products", "related"])
);

export const createProductAction = async (
  prevState: FormState | undefined,
  formData: FormData
): Promise<{ message: string }> => {
  const userId = await requireAuth();

  try {
    const rawData = Object.fromEntries(formData);

    // category is an array of string
    if (rawData.category) {
      try {
        rawData.category = JSON.parse(rawData.category as string);
      } catch (error) {
        throw new Error(
          "Invalid category format. Expected an array of strings."
        );
      }
    }

    // ⚠️ IMPORTANT: You likely need to do the same JSON.parse for colors and sizes
    // if they are being sent as stringified arrays from the client.
    // If your client sends them differently, you can ignore this comment.
    if (rawData.colors && typeof rawData.colors === "string") {
      try {
        rawData.colors = JSON.parse(rawData.colors);
      } catch (e) {}
    }
    if (rawData.sizes && typeof rawData.sizes === "string") {
      try {
        rawData.sizes = JSON.parse(rawData.sizes);
      } catch (e) {}
    }

    const validatedFields = ValidateWithZodSchema(productSchema, rawData);
    const file = formData.get("image") as File;
    const validatedFile = ValidateWithZodSchema(imageSchema, { image: file });
    const fullImagePath = await uploadImage(validatedFile.image, folder);

    await db.insert(product).values({
      id: randomUUID(),
      ...validatedFields,
      image: fullImagePath,
      clerkId: userId,
    });
  } catch (error) {
    return renderError(error);
  }

  redirect("/admin/products");
};

export const fetchAdminProducts = async () => {
  await requireAdminAuth();
  const products = await db
    .select()
    .from(product)
    .orderBy(desc(product.createdAt));
  return products;
};

export const deleteProductAction = async (prevState: { productId: string }) => {
  const { productId } = prevState;
  await requireAdminAuth();

  try {
    // Delete and Fetch in 1 step using 'returning'
    const [deletedProduct] = await db
      .delete(product)
      .where(eq(product.id, productId))
      .returning({ image: product.image });

    if (!deletedProduct) {
      throw new Error("Product not found");
    }

    await deleteImage(deletedProduct.image, folder);

    revalidatePath("/admin/products");
    return { message: "Product Removed" };
  } catch (error: any) {
    return renderError(error);
  }
};

export const fetchAdminProductDetails = async (productId: string) => {
  await requireAdminAuth();
  const foundProduct = await db.query.product.findFirst({
    where: eq(product.id, productId),
  });

  if (!foundProduct) redirect("/admin/products");
  return foundProduct;
};

export const updateProductAction = async (
  prevState: FormState | undefined,
  formData: FormData
) => {
  await requireAdminAuth();
  try {
    const productId = formData.get("id") as string;
    const rawData = Object.fromEntries(formData);

    // JSON Parsing Logic
    if (rawData.category && typeof rawData.category === "string") {
      try {
        rawData.category = JSON.parse(rawData.category);
      } catch {
        throw new Error("Invalid category format.");
      }
    }
    // Handle colors/sizes if they come as strings
    if (rawData.colors && typeof rawData.colors === "string") {
      try {
        rawData.colors = JSON.parse(rawData.colors);
      } catch (e) {}
    }
    if (rawData.sizes && typeof rawData.sizes === "string") {
      try {
        rawData.sizes = JSON.parse(rawData.sizes);
      } catch (e) {}
    }

    const validatedFields = ValidateWithZodSchema(productSchema, rawData);

    await db
      .update(product)
      .set({ ...validatedFields })
      .where(eq(product.id, productId));

    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "Product updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateProductImageAction = async (
  prevState: FormState | undefined,
  formData: FormData
) => {
  await requireAdminAuth();

  try {
    const image = formData.get("image") as File;
    const productId = formData.get("id") as string;
    const oldImageUrl = formData.get("url") as string;
    const oldImagePathUrl = decodeURIComponent(oldImageUrl);

    const validatedFile = ValidateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFile.image, folder);

    await deleteImage(oldImagePathUrl, folder);

    await db
      .update(product)
      .set({ image: fullPath })
      .where(eq(product.id, productId));

    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "Product image updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavoriteIdsForProducts = async (productIds: string[]) => {
  let userId: string;
  try {
    userId = await requireAuth();
  } catch {
    return [];
  }

  // Don't run query if list is empty
  if (productIds.length === 0) return [];

  const favorites = await db
    .select({
      id: favorite.id,
      productId: favorite.productId,
    })
    .from(favorite)
    .where(
      and(inArray(favorite.productId, productIds), eq(favorite.clerkId, userId))
    );

  return favorites;
};

export const fetchFavoriteId = async ({
  productId,
}: {
  productId: string;
}): Promise<string | null> => {
  let userId: string;
  try {
    userId = await requireAuth();
  } catch {
    return null;
  }

  const foundFavorite = await db.query.favorite.findFirst({
    where: and(eq(favorite.productId, productId), eq(favorite.clerkId, userId)),
    columns: { id: true },
  });

  return foundFavorite?.id || null;
};

export const toggleFavoriteAction = async ({
  productId,
  favoriteId,
}: ToggleFavoriteInput): Promise<{
  message: string;
  favoriteId?: string | null;
}> => {
  const userId = await requireAuth();

  let newFavoriteId: string | null = null;
  if (favoriteId) {
    await db.delete(favorite).where(eq(favorite.id, favoriteId));
  } else {
    // Generate ID since schema uses text primary key without default
    const newId = randomUUID();
    await db.insert(favorite).values({
      id: newId,
      productId,
      clerkId: userId,
    });
    newFavoriteId = newId;
  }

  revalidateTag(`favorites:user:${userId}`);
  revalidateTag(`favorites:product:${productId}`);

  return {
    message: favoriteId ? "Removed from favorites" : "Added to favorites",
    favoriteId: newFavoriteId,
  };
};

const favoritesUserTag = (userId: string) => `favorites:user:${userId}`;

export const fetchUserFavorites = createCache(
  async (userId: string) => {
    // Using Query Builder for nested relation fetching
    return db.query.favorite.findMany({
      where: eq(favorite.clerkId, userId),
      columns: {
        id: true,
        productId: true,
        createdAt: true,
      },
      with: {
        product: {
          columns: {
            id: true,
            name: true,
            price: true,
            image: true,
            type: true,
            colors: true,
            sizes: true,
          },
        },
      },
    });
  },
  {
    revalidate: 60 * 2,
    tags: ["favorites", "user_favorites"],
    keyPrefix: "fetchUserFavorites",
  }
);

export async function readUserFavorites(userId: string) {
  // Hack for applying dynamic tags
  await fetch("data:application/json,{}", {
    next: { tags: [favoritesUserTag(userId)] },
  });
  return fetchUserFavorites(userId);
}

export const createReviewAction = async (
  prevState: FormState | undefined,
  formData: FormData
) => {
  const userId = await requireAuth();

  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = ValidateWithZodSchema(reviewSchema, rawData);

    await db.insert(review).values({
      id: randomUUID(),
      ...validatedFields,
      clerkId: userId,
    });

    revalidatePath(`/products/${validatedFields.productId}`);
    return { message: "Review Submitted Successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchProductReviews = createCache(
  async (productId: string) =>
    db
      .select({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        authorName: review.authorName,
        authorImageUrl: review.authorImageUrl,
        createdAt: review.createdAt,
      })
      .from(review)
      .where(eq(review.productId, productId))
      .orderBy(desc(review.createdAt)),

  {
    revalidate: 60 * 15,
    tags: ["reviews", "product_reviews"],
    keyPrefix: "fetchProductReviews",
  }
);

export const fetchProductRating = createCache(
  async (productId: string) => {
    const result = await db
      .select({
        avgRating: avg(review.rating),
        countRating: count(review.rating),
      })
      .from(review)
      .where(eq(review.productId, productId));

    const r = result[0];

    // Handle potential nulls from aggregation
    const avgVal = r.avgRating ? Number(r.avgRating) : 0;
    const countVal = r.countRating ?? 0;

    return {
      rating: Math.round(avgVal * 10) / 10,
      count: countVal,
    };
  },
  {
    revalidate: 60 * 10,
    tags: ["reviews", "product_ratings", "aggregates"],
    keyPrefix: "fetchProductRating",
  }
);

export const fetchProductReviewsByUser = async () => {
  const userId = await requireAuth();

  const reviews = await db.query.review.findMany({
    where: eq(review.clerkId, userId),
    columns: {
      id: true,
      rating: true,
      comment: true,
    },
    with: {
      product: {
        columns: {
          image: true,
          name: true,
        },
      },
    },
  });

  return reviews;
};

export const deleteReviewAction = async (prev: { reviewId: string }) => {
  const { reviewId } = prev;

  try {
    const userId = await requireAuth();

    const existingReview = await db.query.review.findFirst({
      where: eq(review.id, reviewId),
      columns: { clerkId: true, productId: true },
    });

    if (!existingReview || existingReview.clerkId !== userId) {
      return { error: true, message: "Not authorized" };
    }

    await db.delete(review).where(eq(review.id, reviewId));

    revalidatePath(`/products/${existingReview.productId}`);
    revalidatePath(`/reviews`);

    return { message: "Review deleted successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const findExistingReview = async (userId: string, productId: string) => {
  return db.query.review.findFirst({
    where: and(eq(review.productId, productId), eq(review.clerkId, userId)),
    columns: { id: true },
  });
};

export async function fetchCartCount() {
  const userId = await requireAuth();
  if (!userId) {
    return 0;
  }
  return await getCartCount(userId);
}

export const fetchCartItems = async () => {
  const userId = await requireAuth();

  const userCart = await db.query.cart.findFirst({
    where: eq(cart.clerkId, userId ?? ""),
    columns: { numItemsInCart: true },
  });

  return userCart?.numItemsInCart || 0;
};

// Helper used internally
const fetchProduct = async (productId: string) => {
  const found = await db.query.product.findFirst({
    where: eq(product.id, productId),
    columns: { id: true },
  });
  if (!found) return { ok: false, message: "Product Not Found" };
  return found;
};

export const fetchOrCreateCartId = async (userId: string) => {
  let userCart = await db.query.cart.findFirst({
    where: eq(cart.clerkId, userId),
    columns: { id: true, taxRate: true, shipping: true },
  });

  if (!userCart) {
    const newId = randomUUID();
    // Insert and return values (Postgres 'RETURNING' clause)
    const inserted = await db
      .insert(cart)
      .values({
        id: newId,
        clerkId: userId,
      })
      .returning({
        id: cart.id,
        taxRate: cart.taxRate,
        shipping: cart.shipping,
      });
    userCart = inserted[0];
  }
  return userCart;
};

export const upsertCartItem = async ({
  cartId,
  productId,
  delta,
  color,
  size,
}: {
  cartId: string;
  productId: string;
  delta: number;
  color: string | null;
  size: string | null;
}) => {
  // Insert. If conflict on (cartId, productId, color, size), Update amount.

  const colorVal = color ?? null;
  const sizeVal = size ?? null;

  return db
    .insert(cartItem)
    .values({
      id: randomUUID(),
      cartId,
      productId,
      amount: delta,
      color: colorVal,
      size: sizeVal,
    })
    .onConflictDoUpdate({
      // Use the exact constraint name defined in schema
      target: [
        cartItem.cartId,
        cartItem.productId,
        cartItem.color,
        cartItem.size,
      ],
      set: {
        amount: sql`${cartItem.amount} + ${delta}`, // Atomic increment
      },
    })
    .returning({
      id: cartItem.id,
      amount: cartItem.amount,
      color: cartItem.color,
      size: cartItem.size,
    });
};

function toInt(val: unknown): number {
  if (typeof val === "bigint") return Number(val);
  if (typeof val === "number") return val | 0;
  if (typeof val === "string") return Number(val);
  return 0;
}

export const updateOrCreateCartItem = async ({
  productId,
  cartId,
  amount,
  color,
  size,
}: {
  productId: string;
  cartId: string;
  amount: number;
  color: string | null;
  size: string | null;
}) => {
  const colorKey = color ?? null;
  const sizeKey = size ?? null;

  // Check for existing item
  const existingItem = await db.query.cartItem.findFirst({
    where: and(
      eq(cartItem.productId, productId),
      eq(cartItem.cartId, cartId),
      // Dynamically switch between eq() and isNull()
      colorKey ? eq(cartItem.color, colorKey) : isNull(cartItem.color),
      sizeKey ? eq(cartItem.size, sizeKey) : isNull(cartItem.size)
    ),
    columns: { id: true, amount: true },
  });

  if (existingItem) {
    // Update
    const [updated] = await db
      .update(cartItem)
      .set({ amount: existingItem.amount + amount })
      .where(eq(cartItem.id, existingItem.id))
      .returning({
        id: cartItem.id,
        amount: cartItem.amount,
        color: cartItem.color,
        size: cartItem.size,
      });
    return updated;
  } else {
    // Create
    const [created] = await db
      .insert(cartItem)
      .values({
        id: randomUUID(),
        amount,
        productId,
        cartId,
        color: colorKey,
        size: sizeKey,
      })
      .returning({
        id: cartItem.id,
        amount: cartItem.amount,
        color: cartItem.color,
        size: cartItem.size,
      });
    return created;
  }
};

export async function updateCart(cartObj: {
  id: string;
  taxRate: number;
  shipping: number;
}) {
  let numItemsInCart = 0;
  let cartTotal = 0;

  try {
    const rows = await db.execute(sql`
      SELECT
        COALESCE(SUM(${cartItem.amount}), 0)::BIGINT        AS numitems,
        COALESCE(SUM(${cartItem.amount} * ${product.price}), 0)::BIGINT  AS subtotal
      FROM ${cartItem}
      JOIN ${product} ON ${product.id} = ${cartItem.productId}
      WHERE ${cartItem.cartId} = ${cartObj.id}
    `);

    const row = rows[0];
    numItemsInCart = toInt(row?.numitems ?? 0);
    cartTotal = toInt(row?.subtotal ?? 0);
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[updateCartFast] raw aggregate failed, falling back:", e);

      // Fallback: JS calculation
      const lines = await db.query.cartItem.findMany({
        where: eq(cartItem.cartId, cartObj.id),
        with: { product: { columns: { price: true } } },
      });

      numItemsInCart = lines.reduce((n, l) => n + l.amount, 0);
      cartTotal = lines.reduce((s, l) => s + l.amount * l.product.price, 0);
    } else {
      throw e;
    }
  }

  const tax = Math.round(cartObj.taxRate * cartTotal);
  const shipping = cartTotal ? cartObj.shipping : 0;
  const orderTotal = cartTotal + tax + shipping;

  const [currentCart] = await db
    .update(cart)
    .set({ numItemsInCart, cartTotal, tax, orderTotal })
    .where(eq(cart.id, cartObj.id))
    .returning({
      id: cart.id,
      numItemsInCart: cart.numItemsInCart,
      cartTotal: cart.cartTotal,
      tax: cart.tax,
      shipping: cart.shipping,
      orderTotal: cart.orderTotal,
    });

  return currentCart;
}

export const addToCartAction = async (prevState: any, formData: FormData) => {
  const userId = await requireAuth();
  try {
    const productId = formData.get("productId") as string;
    const amount = Number(formData.get("amount"));
    const colorRaw = (formData.get("color") as string) || "";
    const sizeRaw = (formData.get("size") as string) || "";
    const color = colorRaw.trim() ? colorRaw.trim() : null;
    const size = sizeRaw.trim() ? sizeRaw.trim() : null;

    const foundProduct = await db.query.product.findFirst({
      where: eq(product.id, productId),
      columns: { id: true },
    });
    if (!foundProduct) throw new Error("Product not found");

    const userCart = await fetchOrCreateCartId(userId);

    await upsertCartItem({
      cartId: userCart.id,
      productId,
      delta: amount,
      color,
      size,
    });

    // Atomic increment
    await db
      .update(cart)
      .set({
        numItemsInCart: sql`${cart.numItemsInCart} + ${amount}`,
      })
      .where(eq(cart.id, userCart.id));

    revalidateTag("cart:summary");
    revalidatePath("/cart");
    return { ok: true, message: "Item Added" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { ok: false, message };
  }
};

export const removeCartItemAction = async (
  _prevState: any,
  formData: FormData
) => {
  const userId = await requireAuth();
  try {
    const cartItemId = formData.get("id") as string;
    const userCart = await fetchOrCreateCartId(userId);

    // Safe delete (owned by cart)
    const deleted = await db
      .delete(cartItem)
      .where(and(eq(cartItem.id, cartItemId), eq(cartItem.cartId, userCart.id)))
      .returning({ id: cartItem.id }); // Drizzle returns array of deleted rows

    if (deleted.length === 0) {
      revalidateTag("cart:summary");
      revalidatePath("/cart");
      return { ok: true, message: "Item already removed" };
    }

    await updateCart(userCart);
    revalidateTag("cart:summary");
    revalidatePath("/cart");
    return { ok: true, message: "Cart item removed" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { ok: false, message };
  }
};

export const updateCartItemAction = async ({
  amount,
  cartItemId,
}: {
  amount: number;
  cartItemId: string;
}) => {
  const userId = await requireAuth();
  try {
    const userCart = await fetchOrCreateCartId(userId);

    const updated = await db
      .update(cartItem)
      .set({ amount })
      .where(and(eq(cartItem.id, cartItemId), eq(cartItem.cartId, userCart.id)))
      .returning({ id: cartItem.id });

    if (updated.length === 0) {
      return { ok: false, message: "Cart item not found" };
    }

    await updateCart(userCart);
    revalidateTag("cart:summary");
    revalidatePath("/cart");
    return { ok: true, message: "Cart Updated" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { ok: false, message };
  }
};

export const clearCartAction = async () => {
  const userId = await requireAuth();
  try {
    const userCart = await db.query.cart.findFirst({
      where: eq(cart.clerkId, userId),
      columns: { id: true, taxRate: true, shipping: true },
    });

    if (!userCart) {
      return { ok: true, message: "Cart already empty" };
    }

    await db.delete(cartItem).where(eq(cartItem.cartId, userCart.id));

    await db
      .update(cart)
      .set({
        numItemsInCart: 0,
        cartTotal: 0,
        tax: 0,
        orderTotal: 0,
      })
      .where(eq(cart.id, userCart.id));

    revalidateTag("cart:summary");
    revalidatePath("/cart");
    revalidatePath("/");

    return { ok: true, message: "Cart cleared" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { ok: false, message };
  }
};

export const createOrderAction = async (
  _prevState: any,
  _formData: FormData
) => {
  const user = await requireUserWithEmail();
  let orderId: string | null = null;
  let cartId: string | null = null;

  try {
    const userCart = await db.query.cart.findFirst({
      where: eq(cart.clerkId, user.id),
      columns: {
        id: true,
        numItemsInCart: true,
        orderTotal: true,
        tax: true,
        shipping: true,
      },
    });

    if (!userCart) {
      throw new Error("Cart not found");
    }

    cartId = userCart.id;

    // Delete stale orders (unpaid)
    await db
      .delete(order)
      .where(and(eq(order.clerkId, user.id), eq(order.isPaid, false)));

    // Create new Order
    const [newOrder] = await db
      .insert(order)
      .values({
        id: randomUUID(),
        clerkId: user.id,
        products: userCart.numItemsInCart,
        orderTotal: userCart.orderTotal,
        tax: userCart.tax,
        shipping: userCart.shipping,
        email: user.email,
        isPaid: false,
      })
      .returning({ id: order.id });

    orderId = newOrder.id;
  } catch (error) {
    return renderError(error);
  }
  redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`);
};

export const fetchUserOrders = async () => {
  const userId = await requireAuth();

  const orders = await db
    .select()
    .from(order)
    .where(and(eq(order.clerkId, userId), eq(order.isPaid, true)))
    .orderBy(desc(order.createdAt));

  return orders;
};

export const fetchAdminOrders = async () => {
  await requireAdminAuth();

  const orders = await db
    .select()
    .from(order)
    .where(eq(order.isPaid, true))
    .orderBy(desc(order.createdAt));

  return orders;
};

export const checkProductPurchase = async ({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) => {
  // Check if there is ANY order that matches User, Product and isPaid.
  // join OrderItem -> Order to filter by user & payment status
  const result = await db
    .select({ id: order.id })
    .from(order)
    .innerJoin(orderItem, eq(orderItem.orderId, order.id))
    .where(
      and(
        eq(order.clerkId, userId),
        eq(order.isPaid, true),
        eq(orderItem.productId, productId)
      )
    )
    .limit(1);

  return result.length > 0;
};
