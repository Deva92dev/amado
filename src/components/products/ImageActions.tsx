"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import FavoriteToggleButton from "./FavoriteToggleButton";
import AddToCart from "../single-product/AddToCart";

type Props = {
  productId: string;
  favoriteId: string | null;
  productHref: string;
};

export default function ImageActions({
  productId,
  favoriteId,
  productHref,
}: Props) {
  return (
    <>
      {/* Hover dim overlay that never blocks clicks */}
      <div className="pointer-events-none absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {/* Actions layer covering the image */}
      <div className="absolute inset-0 z-10">
        {/* Top-right icons */}
        <div
          className="absolute top-3 right-3 flex items-center gap-2 opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="inline-flex">
            <FavoriteToggleButton
              productId={productId}
              favoriteId={favoriteId}
            />
          </div>
          <Link
            href={productHref}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-background/80 text-foreground shadow hover:bg-background"
            aria-label="View"
            onClick={(e) => e.stopPropagation()}
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
        {/* Bottom action bar with Add to Cart */}
        <div
          className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1/2 flex items-center justify-center opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <AddToCart
            productId={productId}
            compact
            className="bg-gradient-electric"
          />
        </div>
      </div>
    </>
  );
}
