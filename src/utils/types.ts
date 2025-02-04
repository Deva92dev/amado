/* eslint-disable @typescript-eslint/no-explicit-any */

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
