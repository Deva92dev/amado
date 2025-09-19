"use client";

import { useEffect, useCallback } from "react";
import { type EmblaCarouselType } from "embla-carousel";

export const useKeyboardNavigation = (
  emblaApi: EmblaCarouselType | undefined
) => {
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!emblaApi) return;
      // Ensure the user isn't typing in an input field
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        emblaApi.scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        emblaApi.scrollNext();
      }
    },
    [emblaApi]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);
};
