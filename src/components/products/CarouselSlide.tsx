"use client";

import { m } from "framer-motion";
import { FeaturedProducts } from "@/utils/types";
import Product3dCard from "./Product3dCard";

type CarouseType = {
  product: FeaturedProducts;
  index: number;
  selectedIndex: number;
  totalSlides: number;
};

const calculateOffset = (
  selectedIndex: number,
  index: number,
  total: number
) => {
  const diff = index - selectedIndex;
  if (Math.abs(diff) <= total / 2) return diff;
  return diff > 0 ? diff - total : diff + total;
};

const TILT_ANGLE_DEGREES = 15;

const CarouselSlide = ({
  selectedIndex,
  totalSlides,
  index,
  product,
}: CarouseType) => {
  const offset = calculateOffset(selectedIndex, index, totalSlides);
  const isCenter = offset === 0;
  // Apply a static rotation if the card is not in the center
  const rotateY = isCenter
    ? 0
    : offset < 0
    ? TILT_ANGLE_DEGREES
    : -TILT_ANGLE_DEGREES;
  // Scale down side cards
  const scale = isCenter ? 1 : 0.85;
  // Push side cards back slightly
  const translateZ = isCenter ? 0 : -50;
  const zIndex = isCenter ? 10 : 0;

  return (
    <m.div
      className="flex-shrink-0 flex-grow-0 basis-full md:basis-1/2 lg:basis-1/3 min-w-0 flex justify-center"
      style={{ transformStyle: "preserve-3d" }}
      animate={{ rotateY, scale, translateZ, zIndex }}
      transition={{ type: "spring", stiffness: 300, damping: 35 }}
    >
      <Product3dCard product={product} offset={offset} />
    </m.div>
  );
};

export default CarouselSlide;
