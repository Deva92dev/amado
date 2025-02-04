"use server";
import { redirect } from "next/navigation";
import db from "./db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { imageSchema, productSchema, ValidateWithZodSchema } from "./schemas";
import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";

const folder = "Amado";

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : " An error Occurred",
  };
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
  prevState: any,
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
  prevState: any,
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
  prevState: any,
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
  prevState: any,
  formData: FormData
) => {
  return { message: "Review Submitted Successfully" };
};

export const fetchProductReviews = async () => {};
export const fetchProductReviewsByUser = async () => {};
export const deleteReviewAction = async () => {};
export const findExistingReview = async () => {};
export const fetchProductRating = async () => {};
