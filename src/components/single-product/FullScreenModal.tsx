"use client";

import { useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useFullScreen } from "../Store/gallery";

export default function FullscreenModal() {
  const { open, image, alt, close } = useFullScreen();
  const canUseDOM = typeof window !== "undefined";

  // Lock background scroll and allow ESC to exit
  useEffect(() => {
    if (!open || !canUseDOM) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, canUseDOM, close]);

  if (!open || !canUseDOM) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Fullscreen image viewer"
      className="fixed inset-0 z- bg-black"
      onClick={close}
    >
      {/* Top bar with Exit button */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z- flex items-center justify-end p-4">
        <div className="pointer-events-auto flex items-center gap-2">
          <span className="hidden md:inline text-xs text-white/70">
            Press Esc to exit
          </span>
          <button
            type="button"
            aria-label="Exit fullscreen"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            className="inline-flex items-center rounded-full bg-background px-3 py-1 text-xs font-medium text-white backdrop-blur transition hover:bg-white/20"
          >
            Press Escape to Exit
          </button>
        </div>
      </div>
      <div className="absolute inset-0" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-[100vh] w-[100vw]">
          {image ? (
            <Image
              src={image}
              alt={alt ?? "Fullscreen"}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
          ) : null}
        </div>
      </div>
    </div>,
    document.body
  );
}
