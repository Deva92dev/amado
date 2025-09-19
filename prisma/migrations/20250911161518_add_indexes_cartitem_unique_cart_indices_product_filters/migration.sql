/*
  Warnings:

  - A unique constraint covering the columns `[cartId,productId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropEnum
DROP TYPE "public"."ColorName";

-- DropEnum
DROP TYPE "public"."Size";

-- CreateIndex
CREATE INDEX "Cart_clerkId_idx" ON "public"."Cart"("clerkId");

-- CreateIndex
CREATE INDEX "Cart_updatedAt_idx" ON "public"."Cart"("updatedAt");

-- CreateIndex
CREATE INDEX "CartItem_cartId_idx" ON "public"."CartItem"("cartId");

-- CreateIndex
CREATE INDEX "CartItem_productId_idx" ON "public"."CartItem"("productId");

-- CreateIndex
CREATE INDEX "CartItem_updatedAt_idx" ON "public"."CartItem"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_cartId_productId_key" ON "public"."CartItem"("cartId", "productId");

-- CreateIndex
CREATE INDEX "Favorite_clerkId_productId_idx" ON "public"."Favorite"("clerkId", "productId");

-- CreateIndex
CREATE INDEX "Favorite_productId_idx" ON "public"."Favorite"("productId");

-- CreateIndex
CREATE INDEX "Favorite_createdAt_idx" ON "public"."Favorite"("createdAt");

-- CreateIndex
CREATE INDEX "Order_createdAt_idx" ON "public"."Order"("createdAt");

-- CreateIndex
CREATE INDEX "Product_featured_idx" ON "public"."Product"("featured");

-- CreateIndex
CREATE INDEX "Product_type_idx" ON "public"."Product"("type");

-- CreateIndex
CREATE INDEX "Product_createdAt_idx" ON "public"."Product"("createdAt");

-- CreateIndex
CREATE INDEX "Review_productId_createdAt_idx" ON "public"."Review"("productId", "createdAt");

-- CreateIndex
CREATE INDEX "Review_clerkId_createdAt_idx" ON "public"."Review"("clerkId", "createdAt");

-- CreateIndex
CREATE INDEX "Review_createdAt_idx" ON "public"."Review"("createdAt");
