import { relations } from "drizzle-orm/relations";
import {
  product,
  review,
  order,
  orderItem,
  favorite,
  cart,
  cartItem,
} from "./schema";

export const reviewRelations = relations(review, ({ one }) => ({
  product: one(product, {
    fields: [review.productId],
    references: [product.id],
  }),
}));

export const productRelations = relations(product, ({ many }) => ({
  reviews: many(review),
  orderItems: many(orderItem),
  favorites: many(favorite),
  cartItems: many(cartItem),
}));

export const orderItemRelations = relations(orderItem, ({ one }) => ({
  order: one(order, {
    fields: [orderItem.orderId],
    references: [order.id],
  }),
  product: one(product, {
    fields: [orderItem.productId],
    references: [product.id],
  }),
}));

export const orderRelations = relations(order, ({ many }) => ({
  orderItems: many(orderItem),
}));

export const favoriteRelations = relations(favorite, ({ one }) => ({
  product: one(product, {
    fields: [favorite.productId],
    references: [product.id],
  }),
}));

export const cartItemRelations = relations(cartItem, ({ one }) => ({
  cart: one(cart, {
    fields: [cartItem.cartId],
    references: [cart.id],
  }),
  product: one(product, {
    fields: [cartItem.productId],
    references: [product.id],
  }),
}));

export const cartRelations = relations(cart, ({ many }) => ({
  cartItems: many(cartItem),
}));
