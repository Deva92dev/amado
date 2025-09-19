/*
  Warnings:

  - A unique constraint covering the columns `[cartId,productId,color,size]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."CartItem_cartId_productId_key";

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_cartId_productId_color_size_key" ON "public"."CartItem"("cartId", "productId", "color", "size");
