"use client";

import Image from "next/image";
import { m } from "framer-motion";
import { cn } from "@/lib/utils";

type ThumbnailProps = {
  image: string;
  alt: string;
  active: boolean;
  onClick: () => void;
  label: string;
  heightPx?: number; // optional override to sync exact height
  useAbsoluteFill?: boolean;
};

export function Thumb({
  image,
  alt,
  active,
  onClick,
  label,
  heightPx,
  useAbsoluteFill = false,
}: ThumbnailProps) {
  const baseClass = cn(
    useAbsoluteFill ? "absolute inset-0" : "w-full h-full rounded-md",
    "overflow-hidden rounded-md ring-1 transition",
    active ? "ring-primary" : "ring-transparent hover:ring-muted"
  );
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={baseClass}
      style={heightPx ? { height: `${heightPx}px` } : undefined}
    >
      <m.div initial={{ opacity: 0.8 }} animate={{ opacity: 1 }}>
        <Image
          src={image}
          alt={alt}
          fill
          sizes="144px"
          loading="lazy"
          quality={40}
          className="object-cover"
        />
      </m.div>
      <span className="absolute bottom-2 left-0 right-0 mx-auto w-16 truncate text-[10px] text-background bg-foreground rounded px-1">
        {label}
      </span>
    </button>
  );
}
