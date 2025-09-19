import { Prisma } from "@prisma/client";
import { fetchFeaturedProducts } from "./actions";

export type actionFunction = (
  prevState: any
) => Promise<{ message: string }> | { message: string };

export type CartItem = {
  productId: string;
  title: string;
  image: string;
  price: string;
  amount: number;
  category: string[];
};

export type CartState = {
  cartItems: CartItem[];
  numItemsInCart: number;
  cartTotal: number;
  shipping: number;
  tax: number;
  orderTotal: number;
};

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export type FeaturedProduct = {
  id: string;
  name: string;
  image: string | null;
  price: number;
  favoriteId: string | null;
};

export interface FeaturedCollectionType {
  id: string;
  name: string;
  image: string;
  category: string[];
}

export interface FeaturedCollectionCategoryType {
  men: FeaturedCollectionType[];
  women: FeaturedCollectionType[];
  summer: FeaturedCollectionType[];
  winter: FeaturedCollectionType[];
  casual: FeaturedCollectionType[];
}

export type FeaturedProducts = Awaited<
  ReturnType<typeof fetchFeaturedProducts>
>[0];

export type ProductCardItem = {
  id: string; // product id
  name: string; // product name
  type: string;
  colors: string;
  sizes: string;
  price: number; // product price (in minor units if you use cents)
  image: string; // product main image URL
  favoriteIds: string[]; // aggregated favorite IDs
};

export type ToggleFavoriteInput = {
  productId: string;
  favoriteId: string | null;
};

export type VariantKey = "main" | "alt" | "detail" | "warm" | "cool";
export type ProductImage = {
  id: string;
  image: string;
  alt: string;
};
export type GallerySource = Record<VariantKey, ProductImage>;
