"use client";

import { useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { m, AnimatePresence } from "motion/react";
import { useFullScreen } from "../Store/gallery";

export default function FullscreenModal() {
  const { open, image, alt, close } = useFullScreen();
  const canUseDOM = typeof window !== "undefined";

  // Lock scroll + handle ESC + handle mobile Back button
  useEffect(() => {
    if (!open || !canUseDOM) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Push dummy state to handle browser/mobile back button
    const state = { modal: true };
    window.history.pushState(state, "");

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onPopState = () => close();

    window.addEventListener("keydown", onKey);
    window.addEventListener("popstate", onPopState);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("popstate", onPopState);

      // Restore normal navigation
      if (window.history.state?.modal) {
        window.history.back();
      }
    };
  }, [open, canUseDOM, close]);

  if (!canUseDOM) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <m.div
          key="fullscreen"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen image viewer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          onClick={close}
        >
          {/* Exit Button */}
          <m.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="absolute top-4 right-4 z-[10000] flex items-center gap-2"
          >
            <span className="hidden md:inline text-xs text-white/70">
              Press Esc or Back to exit
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur transition hover:bg-white/30"
            >
              Exit
            </button>
          </m.div>
          {/* Image with cinematic motion */}
          <m.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative h-[100vh] w-[100vw] cursor-zoom-out"
            onClick={(e) => e.stopPropagation()}
          >
            {image && (
              <Image
                src={image}
                alt={alt ?? "Fullscreen"}
                fill
                sizes="100vw"
                priority
                className="object-contain md:object-cover transition-all duration-500"
              />
            )}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
