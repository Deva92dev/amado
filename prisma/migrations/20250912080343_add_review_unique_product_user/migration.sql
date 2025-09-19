/*
  Warnings:

  - A unique constraint covering the columns `[productId,clerkId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Review_productId_clerkId_key" ON "public"."Review"("productId", "clerkId");
