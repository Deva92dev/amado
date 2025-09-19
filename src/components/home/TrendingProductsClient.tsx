"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { m, Variants } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { FeaturedProducts } from "@/utils/types";
import CarouselSlide from "../products/CarouselSlide";
import styles from "./TrendingProductsClient.module.css";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNav";

const sectionVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "backOut", // The engaging overshoot effect you wanted
    },
  },
};

const TrendingProductsClient = ({
  products,
}: {
  products: FeaturedProducts[];
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    // On desktop, we want a larger basis for the 3D effect
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  useKeyboardNavigation(emblaApi);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const isMobile = useMediaQuery("(max-width: 767px)");

  // track scroll progress for the progress bar at the bottom
  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    onSelect(); // Set initial index
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const progress = (selectedIndex / (products.length - 1)) * 100;

  return (
    <m.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // This triggers the animation
      className="relative w-full bg-background text-foreground py-24 md:py-32 overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 85% 20%, hsla(var(--pastel-blush) / 0.25), transparent 40%),
          radial-gradient(circle at 15% 85%, hsla(var(--pastel-mint) / 0.2), transparent 50%),
          hsl(var(--background))
        `,
      }}
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold font-primary-serif mb-4 glow-text">
          Trending Now
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
          Discover our most coveted pieces, curated for the modern connoisseur.
        </p>
      </div>
      <div className={styles.embla}>
        <div
          // Use different viewport classes for mobile vs desktop
          className={
            isMobile ? styles.emblaViewportMobile : styles.emblaViewport
          }
          ref={emblaRef}
        >
          <div className={styles.emblaContainer}>
            {products.map((product, index) => (
              <div
                // Use different slide classes for mobile vs desktop
                className={
                  isMobile ? styles.emblaSlideMobile : styles.emblaSlide
                }
                key={product.id}
              >
                {isMobile ? (
                  // --- MOBILE RENDER ---
                  <div className="relative h-[400px] w-full">
                    <Image
                      src={product.image ? product.image : ""}
                      alt={product.name}
                      fill
                      loading="lazy"
                      className="object-cover rounded-2xl"
                      sizes="(max-width: 768px) 80vw, 33vw"
                    />
                  </div>
                ) : (
                  // --- DESKTOP RENDER ---
                  <CarouselSlide
                    product={product}
                    index={index}
                    selectedIndex={selectedIndex}
                    totalSlides={products.length}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Controls for both views */}
        <button
          onClick={scrollPrev}
          className="absolute top-1/2 left-4 md:left-12 -translate-y-1/2 w-10 h-10 bg-background/60 backdrop-blur-sm rounded-full text-foreground flex items-center justify-center transition-colors hover:bg-background z-20"
          aria-label="Previous Slide"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute top-1/2 right-4 md:right-12 -translate-y-1/2 w-10 h-10 bg-background/60 backdrop-blur-sm rounded-full text-foreground flex items-center justify-center transition-colors hover:bg-background z-20"
          aria-label="Next Slide"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
      {/* Progress bar - only show on desktop */}
      {!isMobile && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 h-1 bg-muted rounded-full overflow-hidden">
          <m.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      )}
    </m.section>
  );
};

export default TrendingProductsClient;
