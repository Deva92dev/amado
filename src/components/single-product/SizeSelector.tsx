"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  sizes: string[];
  stockBySize?: Record<string, number>;
  onChange?: (size: string) => void;
};

export default function SizeSelector({ sizes, stockBySize, onChange }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium">Size</span>
        {selected ? (
          <span className="text-xs text-muted-foreground uppercase">
            {selected}
          </span>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((s) => {
          const stock = stockBySize?.[s] ?? undefined;
          const disabled = stock !== undefined ? stock <= 0 : false;
          const active = selected === s;
          return (
            <button
              key={s}
              type="button"
              disabled={disabled}
              aria-pressed={active}
              onClick={() => {
                setSelected(s);
                onChange?.(s);
              }}
              className={cn(
                "min-w-10 rounded-md px-3 py-2 text-xs font-semibold uppercase transition",
                disabled
                  ? "bg-muted text-muted-foreground/60 cursor-not-allowed"
                  : active
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
              )}
              title={disabled ? "Out of stock" : s}
            >
              {s}
            </button>
          );
        })}
      </div>
      {selected && stockBySize !== undefined ? (
        <p
          className={cn(
            "mt-2 text-xs",
            (stockBySize[selected] ?? 0) > 0
              ? "text-emerald-600"
              : "text-rose-600"
          )}
        >
          {(stockBySize[selected] ?? 0) > 0
            ? `In stock: ${stockBySize[selected]}`
            : "Out of stock"}
        </p>
      ) : null}
    </div>
  );
}
