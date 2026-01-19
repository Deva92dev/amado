import { type InferSelectModel } from "drizzle-orm";
import { cart, cartItem, product } from "@/db/schema";
import { fetchFeaturedProducts } from "./actions";

type Product = InferSelectModel<typeof product>;
export type Cart = InferSelectModel<typeof cart>;

type CartItemBase = InferSelectModel<typeof cartItem>;
export type CartItemWithProduct = CartItemBase & {
  product: Product;
};

export type actionFunction = (
  prevState: any
) => Promise<{ message: string }> | { message: string };

export type CartItem = {
  id: string;
  productId: string;
  cartId: string;
  amount: number;
  color: string | null;
  size: string | null;
};

export type CartState = {
  cartItems: CartItemWithProduct[];
  numItemsInCart: number;
  cartTotal: number;
  shipping: number;
  tax: number;
  orderTotal: number;
};

// ... rest of your types (FeaturedProduct, etc.) remain the same
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
  price: number;
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
  id: string;
  name: string;
  type: string;
  colors: string;
  sizes: string;
  price: number;
  image: string;
  favoriteIds: string[];
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
