"use client";

import { useState } from "react";
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import AddToCart from "./AddToCart";

type Props = {
  productId: string;
  colors: string[];
  sizes: string[];
  className?: string;
};

export default function ProductInfoSelections({
  productId,
  colors,
  sizes,
  className,
}: Props) {
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    colors[0]
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    sizes[0]
  );

  return (
    <div className={className}>
      {colors.length > 0 && (
        <div className="mt-6">
          <ColorSelector
            colors={colors}
            onChange={(c) => setSelectedColor(c)}
          />
        </div>
      )}
      {sizes.length > 0 && (
        <div className="mt-6">
          <SizeSelector sizes={sizes} onChange={(s) => setSelectedSize(s)} />
        </div>
      )}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <AddToCart
          productId={productId}
          color={selectedColor}
          size={selectedSize}
          className="card-gradient-glass p-2"
        />
      </div>
    </div>
  );
}
