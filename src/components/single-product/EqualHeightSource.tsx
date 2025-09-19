"use client";

import { useEffect, useRef } from "react";
import { Slot } from "@radix-ui/react-slot";

type Props = {
  varName?: string;
  asChild?: boolean;
  children: React.ReactNode;
};

export default function EqualHeightSource({
  varName = "--equal-h",
  asChild,
  children,
}: Props) {
  const innerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const root = el.closest("[data-equal-cols-root]") as HTMLElement | null;
    if (!root) return;

    const set = (h: number) =>
      root.style.setProperty(varName, `${Math.ceil(h)}px`);

    // Initial measurement on next frame to include mounted children
    const raf = requestAnimationFrame(() =>
      set(el.getBoundingClientRect().height)
    );

    const ro = new ResizeObserver((entries, obs) => {
      for (const entry of entries) {
        // Use borderBoxSize when available to avoid margin influence
        const box = (entry as any).borderBoxSize?.[0];
        const h = box
          ? box.blockSize
          : entry.target.getBoundingClientRect().height;
        set(h);
      }
    });
    ro.observe(el);

    // Also listen to fonts/images layout changes (optional)
    const onLoad = () => set(el.getBoundingClientRect().height);
    window.addEventListener("load", onLoad);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("load", onLoad);
    };
  }, [varName]);

  if (asChild) return <Slot ref={innerRef as any}>{children}</Slot>;
  return <div ref={innerRef as any}>{children}</div>;
}
