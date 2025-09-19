"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect } from "react";
import SingleProductCard from "./SingleProductCard";
import styles from "./RelatedProductCarousel.module.css";

type Item = {
  id: string;
  name: string;
  image: string;
  price: number;
};

type CardVariant = "related" | "recent";

export function RelatedProductCarousel({
  items,
  ariaLabel,
  variant = "related",
  showControls = false,
}: {
  items: Item[];
  ariaLabel?: string;
  variant?: CardVariant;
  showControls?: boolean;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
  });

  useEffect(() => {
    emblaApi?.reInit();
  }, [items, emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!items.length) return null;

  return (
    <div className={styles.embla} aria-label={ariaLabel}>
      {showControls && variant === "recent" && (
        <button
          type="button"
          className={styles.prevBtn}
          onClick={scrollPrev}
          aria-label="Previous"
        >
          ‹
        </button>
      )}
      <div className={styles.viewport} ref={emblaRef}>
        <div
          className={
            variant === "recent" ? styles.containerCompact : styles.container
          }
        >
          {items.map((p) => (
            <div
              key={p.id}
              className={
                variant === "recent" ? styles.slideCompact : styles.slide
              }
            >
              <SingleProductCard
                id={p.id}
                name={p.name}
                image={p.image}
                price={p.price}
                variant={variant}
              />
            </div>
          ))}
        </div>
      </div>
      {showControls && variant === "recent" && (
        <button
          type="button"
          className={styles.nextBtn}
          onClick={scrollNext}
          aria-label="Next"
        >
          ›
        </button>
      )}
    </div>
  );
}
