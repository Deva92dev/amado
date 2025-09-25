"use server";

import { notFound, redirect } from "next/navigation";
import db from "./db";
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
      // Single DB round-trip, array filters are indexable via GIN on category[]
      const products = await db.product.findMany({
        select: { id: true, name: true, image: true, category: true },
        where: {
          OR: [
            { category: { has: "men" } },
            { category: { has: "women" } },
            { category: { has: "winter" } },
            { category: { has: "summer" } },
            { category: { has: "casual" } },
          ],
        },
      });

      // Single pass partition (no multiple .filter calls)
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

      for (const p of products) {
        if (p.category?.includes("men")) buckets.men.push(p);
        if (p.category?.includes("women")) buckets.women.push(p);
        if (p.category?.includes("winter")) buckets.winter.push(p);
        if (p.category?.includes("summer")) buckets.summer.push(p);
        if (p.category?.includes("casual")) buckets.casual.push(p);
      }

      // Distinct by image helper
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
      const products = await db.product.findMany({
        where: { featured: true },
        select: { id: true, name: true, image: true, price: true },
      });

      return products.map<FeaturedProduct>((p) => ({
        ...p,
        favoriteId: null,
      }));
    }

    const products = await db.product.findMany({
      where: { featured: true },
      select: {
        id: true,
        name: true,
        image: true,
        price: true,
        _count: {
          select: {
            favorites: { where: { clerkId: userId } },
          },
        },
      },
    });

    return products.map<FeaturedProduct>((p) => ({
      id: p.id,
      name: p.name,
      image: p.image,
      price: p.price,
      favoriteId: p._count.favorites > 0 ? "favorited" : null,
    }));
  },
  {
    revalidate: 60 * 60 * 24,
    tags: ["featured_products", "products", "favorites"],
    keyPrefix: "fetchFeaturedProducts",
  }
);

export async function fetchFeaturedProducts(): Promise<FeaturedProduct[]> {
  const userId = await getOptionalAuth();
  // Pass only serializable primitive(s) into the cached worker
  return _fetchFeaturedProducts(userId ?? null);
}

export const fetchAllProductsForSitemap = async () => {
  const products = await db.product.findMany({
    select: { id: true, updatedAt: true },
  });
  return products;
};

export const fetchAllProducts = createCache(
  async ({
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
    // Build index-friendly filters (GIN on arrays, trigram on text)
    const where: any = {};
    const AND: any[] = [];

    if (search) {
      // Trigram index speeds up contains/ILIKE on name/description
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }
    if (category && category !== "all")
      AND.push({ category: { has: category } }); // GIN(text[])
    if (color) AND.push({ colors: { has: color } }); // GIN(text[])
    if (size) AND.push({ sizes: { has: size } }); // GIN(text[])
    if (AND.length) where.AND = AND;

    if (!userId) {
      // Unauthenticated: skip favorites join entirely to reduce work and payload
      const rows = await db.product.findMany({
        where,
        orderBy: { createdAt: "asc" }, // covered by B-tree index
        select: {
          id: true,
          name: true,
          price: true,
          image: true,
          type: true,
          // Include these only if the grid needs them; otherwise remove to further trim payload
          colors: true,
          sizes: true,
        },
      });

      // Keep return shape stable; favoriteIds becomes empty and isFavorited false
      return rows.map((r) => ({ ...r, favoriteIds: [], isFavorited: false }));
    }

    // Authenticated: use filtered _count to avoid transferring an array of favorite IDs
    const rows = await db.product.findMany({
      where,
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
        type: true,
        colors: true,
        sizes: true,
        _count: {
          select: {
            favorites: { where: { clerkId: userId } }, // tiny integer instead of array
          },
        },
      },
    });

    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      price: r.price,
      image: r.image,
      type: r.type,
      colors: r.colors,
      sizes: r.sizes,
      // Preserve the old field but keep it light: a boolean instead of full IDs is cheaper
      favoriteIds: r._count.favorites > 0 ? ["favorited"] : [],
      isFavorited: r._count.favorites > 0,
    }));
  },
  CachePresets.weekly(["products", "all_products"])
);

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
    const where: any = {};
    const AND: any[] = [];

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }
    if (category && category !== "all")
      AND.push({ category: { has: category } });
    if (color) AND.push({ colors: { has: color } });
    if (size) AND.push({ sizes: { has: size } });
    if (AND.length) where.AND = AND;

    return db.product.count({ where });
  },
  CachePresets.dynamic(["products", "meta"])
);

export const fetchProductMeta = createCache(async () => {
  const [cats, cols, siz] = await db.$transaction([
    db.$queryRaw<
      Array<{ v: string }>
    >`SELECT DISTINCT unnest("category") AS v FROM "Product" WHERE cardinality("category") > 0`,
    db.$queryRaw<
      Array<{ v: string }>
    >`SELECT DISTINCT unnest("colors")   AS v FROM "Product" WHERE cardinality("colors") > 0`,
    db.$queryRaw<
      Array<{ v: string }>
    >`SELECT DISTINCT unnest("sizes")    AS v FROM "Product" WHERE cardinality("sizes") > 0`,
  ]);
  const categories = cats.map((r) => r.v).sort();
  const colors = cols.map((r) => r.v).sort();
  const sizes = siz.map((r) => r.v).sort();
  return { categories, colors, sizes };
}, CachePresets.static(["products", "meta"]));

export const fetchSingleProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      favorites: {
        select: { id: true, clerkId: true },
      },
    },
  });

  if (!product) {
    notFound();
  }
  return product;
};

export const fetchProductByIds = createCache(async (ids: string[]) => {
  if (!ids.length) return [];
  const products = await db.product.findMany({
    where: { id: { in: ids } },
    select: {
      id: true,
      name: true,
      image: true,
      price: true,
    },
  });
  const map = new Map(products.map((p) => [p.id, p]));
  return ids.map((id) => map.get(id)).filter(Boolean) as typeof products;
}, CachePresets.static(["products", "bulk"]));

export const fetchRelatedProducts = createCache(
  async (params: { productId: string; type: string }) => {
    const { productId, type } = params;
    const related = await db.product.findMany({
      where: {
        id: { not: productId },
        type,
      },
      orderBy: [{ updatedAt: "desc" }],
      select: {
        id: true,
        name: true,
        image: true,
        price: true,
      },
    });

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
    const validatedFields = ValidateWithZodSchema(productSchema, rawData);
    const file = formData.get("image") as File;
    const validatedFile = ValidateWithZodSchema(imageSchema, { image: file });
    const fullImagePath = await uploadImage(validatedFile.image, folder);

    await db.product.create({
      data: {
        ...validatedFields,
        image: fullImagePath,
        clerkId: userId,
      },
    });
  } catch (error) {
    return renderError(error);
  }

  redirect("/admin/products");
};

export const fetchAdminProducts = async () => {
  await requireAdminAuth();
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
};

export const deleteProductAction = async (prevState: { productId: string }) => {
  const { productId } = prevState;
  await requireAdminAuth();

  try {
    const product = await db.product.delete({
      where: {
        id: productId,
      },
    });

    await deleteImage(product.image, folder);
    revalidatePath("/admin/products");
    return { message: "Product Removed" };
  } catch (error: any) {
    return renderError(error);
  }
};

export const fetchAdminProductDetails = async (productId: string) => {
  await requireAdminAuth();
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) redirect("/admin/products");
  return product;
};

export const updateProductAction = async (
  prevState: FormState | undefined,
  formData: FormData
) => {
  await requireAdminAuth();
  try {
    const productId = formData.get("id") as string;
    const rawData = Object.fromEntries(formData);
    if (rawData.category) {
      try {
        rawData.category = JSON.parse(rawData.category as string);
      } catch (error) {
        throw new Error(
          "Invalid category format. Expected an array of strings."
        );
      }
    }
    const validatedFields = ValidateWithZodSchema(productSchema, rawData);

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        ...validatedFields,
      },
    });
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
    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        image: fullPath,
      },
    });

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

  const favorites = await db.favorite.findMany({
    where: {
      productId: { in: productIds },
      clerkId: userId,
    },
    select: {
      id: true,
      productId: true,
    },
  });

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
    return null; // Return null if not authenticated
  }

  const favorite = await db.favorite.findFirst({
    where: {
      productId,
      clerkId: userId,
    },
    select: {
      id: true,
    },
  });

  return favorite?.id || null;
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
    await db.favorite.delete({ where: { id: favoriteId } });
  } else {
    const newFavorite = await db.favorite.create({
      data: { productId, clerkId: userId },
    });
    newFavoriteId = newFavorite.id;
  }
  // tags are O(1)
  revalidateTag(`favorites:user:${userId}`);
  revalidateTag(`favorites:product:${productId}`);

  return {
    message: favoriteId ? "Removed from favorites" : "Added to favorites",
    favoriteId: newFavoriteId,
  };
};

// Typed tags helper
const favoritesUserTag = (userId: string) => `favorites:user:${userId}`;
// const favoritesProductTag = (productId: string) => `favorites:product:${productId}`

export const fetchUserFavorites = createCache(
  async (userId: string) => {
    return db.favorite.findMany({
      where: { clerkId: userId },
      select: {
        id: true,
        productId: true,
        createdAt: true,
        product: {
          select: {
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
    revalidate: 60 * 2, // 2 minutes cache
    tags: ["favorites", "user_favorites"],
    keyPrefix: "fetchUserFavorites",
  }
);

// Provide convenience functions that apply dynamic tags at call sites:
export async function readUserFavorites(userId: string) {
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

    await db.review.create({
      data: {
        ...validatedFields,
        clerkId: userId,
      },
    });

    revalidatePath(`/products/${validatedFields.productId}`);
    return { message: "Review Submitted Successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchProductReviews = createCache(
  async (productId: string) =>
    db.review.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        rating: true,
        comment: true,
        authorName: true,
        authorImageUrl: true,
        createdAt: true,
      },
    }),

  {
    revalidate: 60 * 15, // 15 minutes - reviews don't change often
    tags: ["reviews", "product_reviews"],
    keyPrefix: "fetchProductReviews",
  }
);

export const fetchProductRating = createCache(
  async (productId: string) => {
    const r = await db.review.aggregate({
      where: { productId },
      _avg: { rating: true },
      _count: { rating: true },
    });
    return {
      rating: Math.round(((r._avg.rating ?? 0) as number) * 10) / 10,
      count: r._count.rating ?? 0,
    };
  },
  {
    revalidate: 60 * 10, // ratings need to be fresher
    tags: ["reviews", "product_ratings", "aggregates"],
    keyPrefix: "fetchProductRating",
  }
);

export const fetchProductReviewsByUser = async () => {
  const userId = await requireAuth();
  const reviews = await db.review.findMany({
    where: {
      clerkId: userId,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      product: {
        select: {
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
    const review = await db.review.findUnique({
      where: { id: reviewId },
      select: { clerkId: true, productId: true },
    });
    if (!review || review.clerkId !== userId) {
      return { error: true, message: "Not authorized" };
    }

    await db.review.delete({ where: { id: reviewId } });
    revalidatePath(`/products/${review.productId}`);
    revalidatePath(`/reviews`);

    return { message: "Review deleted successfully" };
  } catch (error) {
    return renderError(error);
  }
};

// so that review not duplicated by same user for same product
export const findExistingReview = async (userId: string, productId: string) => {
  return db.review.findUnique({
    where: { productId_clerkId: { productId, clerkId: userId } },
    select: { id: true },
  });
};

export const fetchCartItems = async () => {
  const userId = await requireAuth();

  const cart = await db.cart.findFirst({
    where: {
      clerkId: userId ?? "",
    },
    select: {
      numItemsInCart: true,
    },
  });

  return cart?.numItemsInCart || 0;
};

const fetchProduct = async (productId: string) => {
  const product = await db.product.findFirst({
    where: { id: productId },
    select: { id: true },
  });
  if (!product) return { ok: false, message: "Product Not Found" };

  return product;
};

export const fetchOrCreateCartId = async (userId: string) => {
  let cart = await db.cart.findFirst({
    where: { clerkId: userId },
    select: { id: true, taxRate: true, shipping: true }, // only what updateCart need
  });
  if (!cart) {
    cart = await db.cart.create({
      data: { clerkId: userId },
      select: { id: true, taxRate: true, shipping: true },
    });
  }
  return cart;
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
  // Prisma upsert on a composite unique requires a named unique constraint
  const colorKey = color ?? "";
  const sizeKey = size ?? "";
  return db.cartItem.upsert({
    where: {
      cartId_productId_color_size_unique: {
        cartId,
        productId,
        color: colorKey,
        size: sizeKey,
      },
    },
    create: {
      cartId,
      productId,
      amount: delta,
      color,
      size,
    },
    update: { amount: { increment: delta } },
    select: { id: true, amount: true, color: true, size: true },
  });
};

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
  let cartItem = await db.cartItem.findFirst({
    where: {
      productId,
      cartId,
      color: colorKey,
      size: sizeKey,
    },
    select: { id: true, amount: true },
  });

  if (cartItem) {
    cartItem = await db.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        amount: cartItem.amount + amount,
      },
      select: { id: true, amount: true, color: true, size: true },
    });
  } else {
    cartItem = await db.cartItem.create({
      data: { amount, productId, cartId, color: colorKey, size: sizeKey },
      select: { id: true, amount: true, color: true, size: true },
    });
  }
  return cartItem; // hide if needed
};

function toInt(val: unknown): number {
  if (typeof val === "bigint") return Number(val);
  if (typeof val === "number") return val | 0; // optional clamp for numbers
  if (typeof val === "string") return Number(val);
  return 0;
}

export async function updateCart(cart: {
  id: string;
  taxRate: number;
  shipping: number;
}) {
  let numItemsInCart = 0;
  let cartTotal = 0;

  try {
    const [row] = await db.$queryRaw<
      Array<{
        numitems: number | string | bigint | null;
        subtotal: number | string | bigint | null;
      }>
    >`SELECT
         COALESCE(SUM(ci."amount"), 0)::BIGINT                 AS numitems,
         COALESCE(SUM(ci."amount" * p."price"), 0)::BIGINT     AS subtotal
       FROM "CartItem" ci
       JOIN "Product" p ON p."id" = ci."productId"
       WHERE ci."cartId" = ${cart.id};`;

    numItemsInCart = toInt(row?.numitems ?? 0);
    cartTotal = toInt(row?.subtotal ?? 0);
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[updateCartFast] raw aggregate failed, falling back:", e);
      const lines = await db.cartItem.findMany({
        where: { cartId: cart.id },
        include: { product: { select: { price: true } } },
      });
      numItemsInCart = lines.reduce((n, l) => n + l.amount, 0);
      cartTotal = lines.reduce((s, l) => s + l.amount * l.product.price, 0);
    } else {
      throw e;
    }
  }

  const tax = Math.round(cart.taxRate * cartTotal);
  const shipping = cartTotal ? cart.shipping : 0;
  const orderTotal = cartTotal + tax + shipping;

  const currentCart = await db.cart.update({
    where: { id: cart.id },
    data: { numItemsInCart, cartTotal, tax, orderTotal },
    select: {
      id: true,
      numItemsInCart: true,
      cartTotal: true,
      tax: true,
      shipping: true,
      orderTotal: true,
    },
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
    await db.product
      .findFirst({ where: { id: productId }, select: { id: true } })
      .then((p) => {
        if (!p) throw new Error("Product not found");
      });
    const cart = await fetchOrCreateCartId(userId);
    await upsertCartItem({
      cartId: cart.id,
      productId,
      delta: amount,
      color,
      size,
    });
    await db.cart.update({
      where: { id: cart.id },
      data: { numItemsInCart: { increment: amount } },
      select: { id: true },
    });
    revalidateTag("cart:summary");
    revalidatePath("/cart");
    return { ok: true, message: "Item Added" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { ok: false, message };
  }
};

export const removeCartItemAction = async (
  _prevState: FormState | undefined,
  formData: FormData
) => {
  const userId = await requireAuth();
  try {
    const cartItemId = formData.get("id") as string;
    const cart = await fetchOrCreateCartId(userId); // { id, taxRate, shipping }
    // Safe, scoped delete
    const res = await db.cartItem.deleteMany({
      where: { id: cartItemId, cartId: cart.id },
    });

    if (res.count === 0) {
      revalidateTag("cart:summary");
      revalidatePath("/cart");
      return { ok: true, message: "Item already removed" };
    }
    // Recompute totals after a remove
    await updateCart(cart);
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
    const cart = await fetchOrCreateCartId(userId);

    const res = await db.cartItem.updateMany({
      where: { id: cartItemId, cartId: cart.id },
      data: { amount },
    });

    if (res.count === 0) {
      return { ok: false, message: "Cart item not found" };
    }

    await updateCart(cart);
    revalidateTag("cart:summary");
    revalidatePath("/cart");
    return { ok: true, message: "Cart Updated" };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { ok: false, message };
  }
};

// Clear entire cart for current user
export const clearCartAction = async () => {
  const userId = await requireAuth();
  try {
    const cart = await db.cart.findFirst({
      where: { clerkId: userId },
      select: { id: true, taxRate: true, shipping: true },
    });

    if (!cart) {
      return { ok: true, message: "Cart already empty" };
    }

    await db.cartItem.deleteMany({ where: { cartId: cart.id } });

    await db.cart.update({
      where: { id: cart.id },
      data: {
        numItemsInCart: 0,
        cartTotal: 0,
        tax: 0,
        orderTotal: 0,
      },
    });

    revalidateTag("cart:summary");
    revalidatePath("/cart");
    revalidatePath("/"); // optional; keep if header depends on root layout

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
    const cart = await db.cart.findFirst({
      where: { clerkId: user.id },
      select: {
        id: true,
        numItemsInCart: true,
        orderTotal: true,
        tax: true,
        shipping: true,
      },
    });
    if (!cart) {
      throw new Error("Cart not found");
    }

    cartId = cart.id;

    // delete stale orders
    await db.order.deleteMany({
      where: { clerkId: user.id, isPaid: false },
    });

    const order = await db.order.create({
      data: {
        clerkId: user.id,
        products: cart.numItemsInCart,
        orderTotal: cart.orderTotal,
        tax: cart.tax,
        shipping: cart.shipping,
        email: user.email,
        isPaid: false,
      },
      select: { id: true },
    });

    orderId = order.id;
  } catch (error) {
    return renderError(error);
  }
  redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`);
};

export const fetchUserOrders = async () => {
  const userId = await requireAuth();
  const orders = await db.order.findMany({
    where: {
      clerkId: userId,
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};

export const fetchAdminOrders = async () => {
  await requireAdminAuth();

  const orders = await db.order.findMany({
    where: {
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};

export const checkProductPurchase = async ({
  userId,
  productId,
}: {
  userId: string;
  productId: string;
}) => {
  const purchaseExists = await db.order.findFirst({
    where: {
      clerkId: userId,
      isPaid: true,
      orderItems: {
        some: {
          productId: productId,
        },
      },
    },
    select: {
      id: true,
    },
  });

  return !!purchaseExists;
};
