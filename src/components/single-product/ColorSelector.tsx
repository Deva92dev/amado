"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const COLOR_HEX: Record<string, string> = {
  black: "#0a0a0a",
  white: "#f5f5f5",
  red: "#ef4444",
  blue: "#3b82f6",
  green: "#22c55e",
  beige: "#f5f5dc",
  gray: "#9ca3af",
  navy: "#1f2a44",
  yellow: "#f59e0b",
  silver: "#c0c0c0",
  olive: "#808000",
};

function toHex(c: string | undefined) {
  if (!c) return undefined;
  if (c.startsWith("#") || c.startsWith("rgb")) return c;
  return COLOR_HEX[c.toLowerCase()] ?? undefined;
}

type Props = { colors: string[]; onChange?: (color: string) => void };

export default function ColorSelector({ colors, onChange }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium">Color</span>
        {selected ? (
          <span className="text-xs text-muted-foreground capitalize">
            {selected}
          </span>
        ) : null}
      </div>
      <div className="flex flex-wrap gap-2">
        {colors.map((c) => {
          const bg = toHex(c) ?? "#e5e7eb";
          const active = selected === c;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={active}
              aria-label={c}
              onClick={() => {
                setSelected(c);
                onChange?.(c);
              }}
              className={cn(
                "h-8 w-8 rounded-full ring-2 transition",
                active
                  ? "ring-primary ring-offset-2 ring-offset-background"
                  : "ring-border hover:ring-muted"
              )}
              style={{ backgroundColor: bg }}
              title={c}
            />
          );
        })}
      </div>
    </div>
  );
}
