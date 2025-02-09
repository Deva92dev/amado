"use server";

import { redirect } from "next/navigation";
import db from "./db";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  imageSchema,
  productSchema,
  reviewSchema,
  ValidateWithZodSchema,
} from "./schemas";
import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";
import { Cart } from "@prisma/client";

const folder = "Amado";

type FormState = {
  message: string;
};

export const renderError = (error: any): FormState => {
  let message = "An unexpected error occurred.";

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  }
  //  add more error instances if needed

  console.error("Action error:", error);

  return { message }; // Return a FormState object
};

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must be logged in to access this route");
  }
  return user;
};

const getAdminUser = async () => {
  const user = await currentUser();
  if (user?.id !== process.env.ADMIN_USER_ID) redirect("/");
  return user;
};

export const fetchFeaturedProducts = async () => {
  const { userId } = await auth();
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
    include: {
      favorites: {
        select: { id: true, clerkId: true },
      },
    },
  });

  return products.map((product) => ({
    ...product,
    favoriteId:
      product.favorites.find((fav) => fav.clerkId === userId)?.id || null,
  }));
};

export const fetchAllProducts = async ({ search = "" }: { search: string }) => {
  const normalizedSearch = search.toLowerCase();
  return db.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { category: { has: normalizedSearch } }, // category is an array
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

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
    redirect("/products");
  }
  return product;
};

export const createProductAction = async (
  prevState: FormState | undefined,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();

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
        clerkId: user.id,
      },
    });
  } catch (error) {
    return renderError(error);
  }

  redirect("/admin/products");
};

export const fetchAdminProducts = async () => {
  await getAdminUser();
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
};

export const deleteProductAction = async (prevState: { productId: string }) => {
  const { productId } = prevState;
  await getAdminUser();

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
  await getAdminUser();
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
  await getAdminUser();
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
  await getAdminUser();

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
  const user = await getAuthUser().catch(() => null);
  if (!user) return [];

  const favorites = await db.favorite.findMany({
    where: {
      productId: { in: productIds },
      clerkId: user.id,
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
  const user = await getAuthUser();
  if (!user || !user.id) {
    return null;
  }

  const favorite = await db.favorite.findFirst({
    where: {
      productId,
      clerkId: user?.id,
    },
    select: {
      id: true,
    },
  });

  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  productId: string;
  favoriteId: string | null;
  pathname: string;
}): Promise<{ message: string; favoriteId?: string | null }> => {
  const user = await getAuthUser();
  const { productId, favoriteId, pathname } = prevState;

  try {
    let newFavoriteId: string | null = null;
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      const newFavorite = await db.favorite.create({
        data: {
          productId,
          clerkId: user.id,
        },
      });
      newFavoriteId = newFavorite.id;
    }

    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath(`/products/${productId}`);
    revalidatePath("/favorites");

    return {
      message: favoriteId ? "Removed from favorites" : "Added to favorites",
      favoriteId: newFavoriteId,
    };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchUserFavorites = async () => {
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: {
        include: {
          favorites: {
            select: {
              id: true,
            },
            where: {
              clerkId: user.id,
            },
          },
        },
      },
    },
  });

  return favorites.map((fav) => ({
    ...fav,
    product: {
      ...fav.product,
      favoriteId: fav.id,
    },
  }));
};

export const createReviewAction = async (
  prevState: FormState | undefined,
  formData: FormData
) => {
  const user = await getAuthUser();

  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = ValidateWithZodSchema(reviewSchema, rawData);

    await db.review.create({
      data: {
        ...validatedFields,
        clerkId: user.id,
      },
    });

    revalidatePath(`/products/${validatedFields.productId}`);
    return { message: "Review Submitted Successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchProductReviews = async (productId: string) => {
  const reviews = await db.review.findMany({
    where: {
      productId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reviews;
};

export const fetchProductRating = async (productId: string) => {
  const result = await db.review.groupBy({
    by: ["productId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      productId,
    },
  });

  // return empty array if no review
  return {
    rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
    count: result[0]?._count.rating ?? 0,
  };
};

export const fetchProductReviewsByUser = async () => {
  const user = await getAuthUser();
  const reviews = await db.review.findMany({
    where: {
      clerkId: user.id,
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

export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  const { reviewId } = prevState;
  const user = await getAuthUser();

  try {
    await db.review.delete({
      where: {
        id: reviewId,
        clerkId: user.id,
      },
    });

    revalidatePath("/reviews");
    return { message: "Review deleted successfully" };
  } catch (error) {
    return renderError(error);
  }
};

// so that review not duplicated by same user for same product
export const findExistingReview = async (userId: string, productId: string) => {
  return db.review.findFirst({
    where: {
      productId,
      clerkId: userId,
    },
  });
};

export const fetchCartItems = async () => {
  const { userId } = await auth();

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
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!productId) {
    throw new Error("Product Not Found");
  }

  return product;
};

const includeProductClause = {
  cartItems: {
    include: {
      product: true,
    },
  },
};

export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure = false,
}: {
  userId: string;
  errorOnFailure?: boolean;
}) => {
  let cart = await db.cart.findFirst({
    where: {
      clerkId: userId,
    },
    include: includeProductClause,
  });

  if (!cart && errorOnFailure) {
    throw new Error("Cart Not Found");
  }

  if (!cart) {
    cart = await db.cart.create({
      data: {
        clerkId: userId,
      },
      include: includeProductClause,
    });
  }

  return cart;
};

export const updateOrCreateCartItem = async ({
  productId,
  cartId,
  amount,
}: {
  productId: string;
  cartId: string;
  amount: number;
}) => {
  let cartItem = await db.cartItem.findFirst({
    where: {
      productId,
      cartId,
    },
  });

  if (cartItem) {
    cartItem = await db.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        amount: cartItem.amount + amount,
      },
    });
  } else {
    cartItem = await db.cartItem.create({
      data: { amount, productId, cartId },
    });
  }
};

export const updateCart = async (cart: Cart) => {
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  let numItemsInCart = 0;
  let cartTotal = 0;

  for (const item of cartItems) {
    numItemsInCart += item.amount;
    cartTotal += item.amount * item.product.price;
  }

  const tax = cart.taxRate * cartTotal;
  const shipping = cartTotal ? cart.shipping : 0;
  const orderTotal = cartTotal + tax + shipping;

  const currentCart = await db.cart.update({
    where: {
      id: cart.id,
    },
    data: {
      numItemsInCart,
      cartTotal,
      tax,
      orderTotal,
    },
    include: includeProductClause,
  });

  return { currentCart, cartItems };
};

export const addToCartAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();
  try {
    const productId = formData.get("productId") as string;
    const amount = Number(formData.get("amount"));
    await fetchProduct(productId);
    const cart = await fetchOrCreateCart({ userId: user.id });
    await updateOrCreateCartItem({ productId, cartId: cart.id, amount });
    await updateCart(cart);
  } catch (error) {
    return renderError(error);
  }
  redirect("/cart");
};

export const removeCartItemAction = async (
  prevState: FormState | undefined,
  formData: FormData
) => {
  const user = await getAuthUser();
  try {
    const cartItemId = formData.get("id") as string;
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    await db.cartItem.delete({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
    });

    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "Item removed from Cart" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateCartItemAction = async ({
  amount,
  cartItemId,
}: {
  amount: number;
  cartItemId: string;
}) => {
  const user = await getAuthUser();

  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    await db.cartItem.update({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
      data: {
        amount,
      },
    });

    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "Cart Updated" };
  } catch (error) {
    renderError(error);
  }
};

export const createOrderAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();
  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });

    const order = await db.order.create({
      data: {
        clerkId: user.id,
        products: cart.numItemsInCart,
        orderTotal: cart.orderTotal,
        tax: cart.tax,
        shipping: cart.shipping,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    await db.cart.delete({
      where: {
        id: cart.id,
      },
    });
  } catch (error) {
    return renderError(error);
  }

  redirect("/orders");
};

export const fetchUserOrders = async () => {
  const user = await getAuthUser();
  const orders = await db.order.findMany({
    where: {
      clerkId: user.id,
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};

export const fetchAdminOrders = async () => {
  const user = await getAdminUser();

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
