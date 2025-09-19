// "use client";

// import Image from "next/image";
// import {
//   AnimatePresence,
//   m,
//   useMotionValue,
//   useSpring,
//   useTransform,
// } from "motion/react";
// import { useEffect, useMemo, useRef, useState } from "react";
// import { useLensZoom } from "@/hooks/useLensZoom";
// import type { GallerySource, VariantKey } from "@/utils/types";
// import { useFullScreen } from "@/components/Store/gallery";
// import { Thumb } from "./Thumbnail";
// import { cn } from "@/lib/utils";
// import { filterClassByVariant } from "./GalleryStyles";
// import { Spinner } from "./Spinner";
// import dynamic from "next/dynamic";

// const FullScreenModal = dynamic(() => import("./FullScreenModal"), {
//   ssr: false,
// });

// type Props = {
//   img: GallerySource;
//   start?: VariantKey;
//   equalHeightVar?: string;
// };

// const ORDER: VariantKey[] = ["main", "alt", "detail", "warm", "cool"];
// const LABELS: Record<VariantKey, string> = {
//   main: "Main",
//   alt: "Alternate",
//   detail: "Detail",
//   warm: "Warm",
//   cool: "Cool",
// };

// export default function ProductGallery({
//   img,
//   start = "main",
//   equalHeightVar = "--equal-h",
// }: Props) {
//   // main image tilt 3D
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);

//   const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
//   const mouseXSpring = useSpring(mouseX, springConfig);
//   const mouseYSpring = useSpring(mouseY, springConfig);

//   const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
//   const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const width = rect.width;
//     const height = rect.height;
//     const xPct = (e.clientX - rect.left) / width - 0.5;
//     const yPct = (e.clientY - rect.top) / height - 0.5;

//     mouseX.set(xPct);
//     mouseY.set(yPct);
//   };

//   const handleMouseLeave = () => {
//     mouseX.set(0);
//     mouseY.set(0);
//   };

//   const [active, setActive] = useState<VariantKey>(start);
//   const [isLoading, setIsLoading] = useState(true);

//   const containerRef = useRef<HTMLDivElement | null>(null);

//   const {
//     ref: lensRef,
//     state: lens,
//     onMove: onLensMove,
//     toggle: toggleLens,
//     lensStyle,
//     zoomedImageStyle,
//   } = useLensZoom({ lensSize: 240, scale: 4 });

//   const { openWith } = useFullScreen();

//   const count = ORDER.length;
//   const idx = ORDER.indexOf(active);

//   const [isMobile, setIsMobile] = useState(false);
//   useEffect(() => {
//     const mql = window.matchMedia("(max-width: 1023.98px)");
//     const apply = () => setIsMobile(mql.matches);
//     apply();
//     mql.addEventListener("change", apply);
//     return () => mql.removeEventListener("change", apply);
//   }, []);

//   useEffect(() => {
//     const i = new window.Image();
//     i.src = img[active].image;
//     i.onload = () => setIsLoading(false);
//   }, [active, img]);

//   const onMainClick = () => {
//     if (isMobile) return;
//     if (active !== "detail") return;
//     toggleLens();
//   };

//   const hint = useMemo(() => {
//     if (isMobile) return "";
//     if (active === "detail" && !lens.enabled)
//       return "🔍 Click to zoom! Move mouse to explore details";
//     if (active !== "detail") return "Click on 'Detail' view to enable zoom!";
//     return "";
//   }, [active, lens.enabled, isMobile]);

//   const onKeyNav = (e: React.KeyboardEvent) => {
//     if (e.key === "ArrowRight") setActive(ORDER[(idx + 1) % count]);
//     else if (e.key === "ArrowLeft") setActive(ORDER[(idx - 1 + count) % count]);
//   };

//   const ROWS = 5 as const;
//   const GAP = 8;
//   const varName = equalHeightVar;
//   const fixedHeightDesktop = {
//     height: `var(${varName})`,
//   } as React.CSSProperties;

//   // Extract transform from zoomedImageStyle (fallback empty string)
//   const zoomTransform = zoomedImageStyle.transform ?? "";

//   // Combine rotateX, rotateY rotation with zoomTransform into single transform string
//   const combinedTransform = useTransform(
//     [rotateX, rotateY],
//     ([rX, rY]) => `rotateX(${rX}) rotateY(${rY}) ${zoomTransform}`
//   );

//   return (
//     <section className="relative w-full">
//       <div className="mb-3 flex items-center justify-between">
//         <h2 className="text-xl font-semibold">Premium Product Gallery</h2>
//         <div className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
//           {idx + 1} / {count}
//         </div>
//       </div>

//       <div
//         className={cn(
//           "gap-4",
//           isMobile ? "grid grid-cols-1" : "grid grid-cols-[1fr_auto]"
//         )}
//       >
//         {/* Main viewer */}
//         <div
//           ref={(el) => {
//             containerRef.current = el;
//             lensRef.current = el;
//           }}
//           className={cn(
//             "relative w-full overflow-hidden rounded-xl bg-muted outline-none",
//             !isMobile &&
//               (active === "detail"
//                 ? lens.enabled
//                   ? "cursor-zoom-out"
//                   : "cursor-zoom-in"
//                 : "cursor-default"),
//             // Give mobile an aspect ratio so the fill Image has height
//             isMobile ? "aspect-[4/3]" : ""
//           )}
//           style={isMobile ? undefined : fixedHeightDesktop}
//           tabIndex={0}
//           onKeyDown={isMobile ? undefined : onKeyNav}
//           onMouseMove={(e) => {
//             handleMouseMove(e);
//             onLensMove(e);
//           }}
//           onMouseLeave={() => {
//             handleMouseLeave();
//           }}
//           // onMouseMove={isMobile ? undefined : onLensMove}
//           onClick={onMainClick}
//           aria-label="Product image viewer"
//         >
//           {isLoading && <Spinner />}

//           {/* Mobile: no animation, ensure parent has height via aspect-[4/3] */}
//           {isMobile ? (
//             <div
//               className={cn("absolute inset-0", filterClassByVariant[active])}
//             >
//               <Image
//                 src={img[active].image}
//                 alt={img[active].alt}
//                 fill
//                 sizes="100vw"
//                 className="object-cover select-none"
//                 priority
//               />
//             </div>
//           ) : (
//             <AnimatePresence mode="wait">
//               <m.div
//                 key={active}
//                 initial={{ opacity: 0.6 }}
//                 animate={{
//                   opacity: 1,
//                   scale: 1.05,
//                   boxShadow:
//                     "0 10px 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.4)",
//                 }}
//                 exit={{ opacity: 0 }}
//                 transition={{
//                   duration: 0.3,
//                   type: "spring",
//                   stiffness: 300,
//                   damping: 25,
//                 }}
//                 className={cn(
//                   "absolute inset-0 rounded-xl",
//                   filterClassByVariant[active]
//                 )}
//                 style={{
//                   ...zoomedImageStyle,
//                   transform: combinedTransform,
//                   transformStyle: "preserve-3d",
//                 }}
//               >
//                 <Image
//                   src={img[active].image}
//                   alt={img[active].alt}
//                   fill
//                   quality={75}
//                   priority
//                   placeholder="blur"
//                   blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAAAnU7QnAAAAGUlEQVQYV2NkQANwDwQDCDDAAJtEAGGADzsgZm4AAAAASUVORK5CYII="
//                   sizes="(max-width: 1024px) 100vw, 70vw"
//                   className="object-cover select-none"
//                 />
//               </m.div>
//             </AnimatePresence>
//           )}

//           {!isMobile && <div style={lensStyle} />}

//           {hint && (
//             <div
//               className={cn(
//                 "pointer-events-none absolute bottom-3 left-3 rounded-md px-2 py-1 text-xs shadow",
//                 active === "detail"
//                   ? "bg-green-600 text-white"
//                   : "bg-background/70 backdrop-blur text-foreground"
//               )}
//             >
//               {hint}
//             </div>
//           )}

//           <button
//             type="button"
//             onClick={(e) => {
//               e.stopPropagation();
//               openWith(img[active].image, img[active].alt);
//             }}
//             className="absolute top-3 right-3 z-20 rounded-full bg-background/70 backdrop-blur px-3 py-1 text-xs shadow hover:bg-background"
//             aria-label="View Fullscreen"
//           >
//             View Fullscreen
//           </button>
//         </div>
//         {/* Thumbnails */}
//         {isMobile ? (
//           <div className="mt-3" aria-label="Gallery Thumbnails">
//             <div className="grid grid-cols-5 gap-2">
//               {ORDER.map((k) => (
//                 <div key={k} className="relative aspect-square">
//                   <Thumb
//                     image={img[k].image}
//                     alt={img[k].alt}
//                     active={active === k}
//                     onClick={() => {
//                       setIsLoading(true);
//                       if (active === "detail" && k !== "detail" && lens.enabled)
//                         toggleLens(false);
//                       setActive(k);
//                     }}
//                     label={LABELS[k]}
//                     heightPx={undefined}
//                     useAbsoluteFill={true}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <div
//             className="w-36"
//             style={fixedHeightDesktop}
//             aria-label="Gallery Thumbnails"
//           >
//             <div
//               className="grid h-full"
//               style={{
//                 gridTemplateRows: `repeat(${ROWS}, 1fr)`,
//                 gap: `${GAP}px`,
//               }}
//             >
//               {ORDER.map((k) => (
//                 <div
//                   key={k}
//                   className="relative rounded-md bg-background/60 dark:bg-gray-800/50 shadow-sm"
//                 >
//                   <Thumb
//                     image={img[k].image}
//                     alt={img[k].alt}
//                     active={active === k}
//                     onClick={() => {
//                       setIsLoading(true);
//                       if (active === "detail" && k !== "detail" && lens.enabled)
//                         toggleLens(false);
//                       setActive(k);
//                     }}
//                     label={LABELS[k]}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//       <FullScreenModal />
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import {
  AnimatePresence,
  m,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useCallback, useMemo, useRef, useState, memo } from "react";
import { useLensZoom } from "@/hooks/useLensZoom";
import type { GallerySource, VariantKey } from "@/utils/types";
import { useFullScreen } from "@/components/Store/gallery";
import { useMediaQuery } from "@/hooks/useMediaQuery"; // Assuming you have this hook
import { Thumb } from "./Thumbnail";
import { cn } from "@/lib/utils";
import { filterClassByVariant } from "./GalleryStyles";
import { Spinner } from "./Spinner";
import dynamic from "next/dynamic";

const FullScreenModal = dynamic(() => import("./FullScreenModal"), {
  ssr: false,
});

type Props = {
  img: GallerySource;
  start?: VariantKey;
  equalHeightVar?: string;
};

const ORDER: VariantKey[] = ["main", "alt", "detail", "warm", "cool"];
const LABELS: Record<VariantKey, string> = {
  main: "Main",
  alt: "Alternate",
  detail: "Detail",
  warm: "Warm",
  cool: "Cool",
};

const SPRING_CONFIG = { damping: 25, stiffness: 200, mass: 0.3 };

// Memoized thumbnail component
const ThumbnailGrid = memo(
  ({
    ORDER,
    img,
    active,
    onThumbClick,
    isMobile,
    fixedHeightDesktop,
  }: {
    ORDER: VariantKey[];
    img: GallerySource;
    active: VariantKey;
    onThumbClick: (k: VariantKey) => void;
    isMobile: boolean;
    fixedHeightDesktop: React.CSSProperties;
  }) => {
    if (isMobile) {
      return (
        <div className="mt-3" aria-label="Gallery Thumbnails">
          <div className="grid grid-cols-5 gap-2">
            {ORDER.map((k) => (
              <div key={k} className="relative aspect-square">
                <Thumb
                  image={img[k].image}
                  alt={img[k].alt}
                  active={active === k}
                  onClick={() => onThumbClick(k)}
                  label={LABELS[k]}
                  heightPx={undefined}
                  useAbsoluteFill={true}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div
        className="w-36"
        style={fixedHeightDesktop}
        aria-label="Gallery Thumbnails"
      >
        <div
          className="grid h-full"
          style={{
            gridTemplateRows: "repeat(5, 1fr)",
            gap: "8px",
          }}
        >
          {ORDER.map((k) => (
            <div
              key={k}
              className="relative rounded-md bg-background/60 dark:bg-gray-800/50 shadow-sm"
            >
              <Thumb
                image={img[k].image}
                alt={img[k].alt}
                active={active === k}
                onClick={() => onThumbClick(k)}
                label={LABELS[k]}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
);

ThumbnailGrid.displayName = "ThumbnailGrid";

export default function ProductGallery({
  img,
  start = "main",
  equalHeightVar = "--equal-h",
}: Props) {
  // Motion values for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXSpring = useSpring(mouseX, SPRING_CONFIG);
  const mouseYSpring = useSpring(mouseY, SPRING_CONFIG);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  // State
  const [active, setActive] = useState<VariantKey>(start);
  const [imageLoadStates, setImageLoadStates] = useState<
    Record<string, boolean>
  >({});

  // Hooks
  const isMobile = useMediaQuery("(max-width: 1023.98px)");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const {
    ref: lensRef,
    state: lens,
    onMove: onLensMove,
    toggle: toggleLens,
    lensStyle,
    zoomedImageStyle,
  } = useLensZoom({ lensSize: 240, scale: 4 });

  const { openWith } = useFullScreen();

  // Computed values
  const count = ORDER.length;
  const idx = ORDER.indexOf(active);
  const currentImageSrc = img[active].image;
  const isCurrentImageLoading = !imageLoadStates[currentImageSrc];

  // Event handlers
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width - 0.5;
      const yPct = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const handleMainClick = useCallback(() => {
    if (isMobile || active !== "detail") return;
    toggleLens();
  }, [isMobile, active, toggleLens]);

  const handleKeyNav = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActive(ORDER[(idx + 1) % count]);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActive(ORDER[(idx - 1 + count) % count]);
      }
    },
    [idx, count]
  );

  const handleThumbClick = useCallback(
    (k: VariantKey) => {
      if (active === "detail" && k !== "detail" && lens.enabled) {
        toggleLens(false);
      }
      setActive(k);
    },
    [active, lens.enabled, toggleLens]
  );

  const handleImageLoad = useCallback((src: string) => {
    setImageLoadStates((prev) => ({ ...prev, [src]: true }));
  }, []);

  // Memoized values
  const hint = useMemo(() => {
    if (isMobile) return "";
    if (active === "detail" && !lens.enabled)
      return "🔍 Click to zoom! Move mouse to explore details";
    if (active !== "detail") return "Click on 'Detail' view to enable zoom!";
    return "";
  }, [active, lens.enabled, isMobile]);

  const fixedHeightDesktop = useMemo(
    () =>
      ({
        height: `var(${equalHeightVar})`,
      } as React.CSSProperties),
    [equalHeightVar]
  );

  const combinedTransform = useTransform([rotateX, rotateY], ([rX, rY]) => {
    const zoomTransform = zoomedImageStyle.transform ?? "";
    return `rotateX(${rX}) rotateY(${rY}) ${zoomTransform}`;
  });

  const imageSizes = isMobile ? "100vw" : "(max-width: 1024px) 100vw, 70vw";

  return (
    <section className="relative w-full">
      <header className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Premium Product Gallery</h2>
        <div className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
          {idx + 1} / {count}
        </div>
      </header>

      <div
        className={cn(
          "gap-4",
          isMobile ? "grid grid-cols-1" : "grid grid-cols-[1fr_auto]"
        )}
      >
        {/* Main viewer */}
        <div
          ref={(el) => {
            containerRef.current = el;
            lensRef.current = el;
          }}
          className={cn(
            "relative w-full overflow-hidden rounded-xl bg-muted outline-none",
            !isMobile &&
              (active === "detail"
                ? lens.enabled
                  ? "cursor-zoom-out"
                  : "cursor-zoom-in"
                : "cursor-default"),
            isMobile && "aspect-[4/3]"
          )}
          style={isMobile ? undefined : fixedHeightDesktop}
          tabIndex={0}
          onKeyDown={isMobile ? undefined : handleKeyNav}
          onMouseMove={(e) => {
            handleMouseMove(e);
            if (!isMobile) onLensMove(e);
          }}
          onMouseLeave={handleMouseLeave}
          onClick={handleMainClick}
          aria-label="Product image viewer"
        >
          {isCurrentImageLoading && <Spinner />}

          {isMobile ? (
            <div
              className={cn("absolute inset-0", filterClassByVariant[active])}
            >
              <Image
                src={currentImageSrc}
                alt={img[active].alt}
                fill
                sizes={imageSizes}
                className="object-cover select-none"
                priority={active === start}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAAAnU7QnAAAAGUlEQVQYV2NkQANwDwQDCDDAAJtEAGGADzsgZm4AAAAASUVORK5CYII="
                onLoad={() => handleImageLoad(currentImageSrc)}
              />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <m.div
                key={active}
                initial={{ opacity: 0.6 }}
                animate={{
                  opacity: 1,
                  scale: 1.05,
                  boxShadow:
                    "0 10px 30px rgba(255, 215, 0, 0.6), 0 0 60px rgba(255, 215, 0, 0.4)",
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
                className={cn(
                  "absolute inset-0 rounded-xl",
                  filterClassByVariant[active]
                )}
                style={{
                  ...zoomedImageStyle,
                  transform: combinedTransform,
                  transformStyle: "preserve-3d",
                }}
              >
                <Image
                  src={currentImageSrc}
                  alt={img[active].alt}
                  fill
                  quality={75}
                  priority={active === start}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAGCAYAAAAnU7QnAAAAGUlEQVQYV2NkQANwDwQDCDDAAJtEAGGADzsgZm4AAAAASUVORK5CYII="
                  sizes={imageSizes}
                  className="object-cover select-none"
                  onLoad={() => handleImageLoad(currentImageSrc)}
                />
              </m.div>
            </AnimatePresence>
          )}

          {!isMobile && <div style={lensStyle} />}

          {hint && (
            <div
              className={cn(
                "pointer-events-none absolute bottom-3 left-3 rounded-md px-2 py-1 text-xs shadow transition-opacity",
                active === "detail"
                  ? "bg-green-600 text-white"
                  : "bg-background/70 backdrop-blur text-foreground"
              )}
            >
              {hint}
            </div>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openWith(currentImageSrc, img[active].alt);
            }}
            className="absolute top-3 right-3 z-20 rounded-full bg-background/70 backdrop-blur px-3 py-1 text-xs shadow hover:bg-background transition-colors"
            aria-label="View Fullscreen"
          >
            View Fullscreen
          </button>
        </div>

        <ThumbnailGrid
          ORDER={ORDER}
          img={img}
          active={active}
          onThumbClick={handleThumbClick}
          isMobile={isMobile}
          fixedHeightDesktop={fixedHeightDesktop}
        />
      </div>

      <FullScreenModal />
    </section>
  );
}
