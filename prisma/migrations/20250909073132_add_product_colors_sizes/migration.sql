-- CreateEnum
CREATE TYPE "public"."Size" AS ENUM ('XS', 'S', 'M', 'L', 'XL', 'XXL');

-- CreateEnum
CREATE TYPE "public"."ColorName" AS ENUM ('BLACK', 'WHITE', 'RED', 'BLUE', 'GREEN', 'BEIGE');

-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "colors" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "sizes" TEXT[] DEFAULT ARRAY[]::TEXT[];
