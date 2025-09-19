"use client";

import { useState } from "react";

type Props = {
  min?: number;
  max?: number;
  onChange?: (qty: number) => void;
};

export default function QuantityStepper({ min = 1, max, onChange }: Props) {
  const [qty, setQty] = useState<number>(min);

  const set = (n: number) => {
    const clamped = Math.max(min, max ? Math.min(max, n) : n);
    setQty(clamped);
    onChange?.(clamped);
  };

  return (
    <div className="inline-flex items-center rounded-md border border-input">
      <button
        type="button"
        className="px-3 py-2 text-sm"
        onClick={() => set(qty - 1)}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <input
        value={qty}
        onChange={(e) => set(Number(e.target.value) || min)}
        className="w-12 border-0 bg-transparent text-center text-sm outline-none"
        inputMode="numeric"
        pattern="[0-9]*"
      />
      <button
        type="button"
        className="px-3 py-2 text-sm"
        onClick={() => set(qty + 1)}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
