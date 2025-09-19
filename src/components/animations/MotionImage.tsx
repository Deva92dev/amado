/* eslint-disable jsx-a11y/alt-text */
"use client";
import { m, useReducedMotion, Transition, Easing } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Image, { ImageProps } from "next/image";

interface MotionImageProps
  extends Omit<ImageProps, "onLoad" | "onError" | "onLoadingComplete"> {
  src: string;
  alt: string;
  className?: string;
  animation?: {
    type?:
      | "fade"
      | "scale"
      | "blur"
      | "slideUp"
      | "slideDown"
      | "slideLeft"
      | "slideRight"
      | "zoom"
      | "rotate"
      | "flip"
      | "reveal"
      | "none";
    duration?: number;
    delay?: number;
    ease?: Easing | string;
  };
  progressive?: {
    enabled?: boolean;
    placeholder?: string; // Low-res placeholder image
    blurDataURL?: string; // Base64 blur placeholder
    quality?: number;
    sizes?: string;
  };
  loadingConfig?: {
    lazy?: boolean;
    spinner?: boolean;
    spinnerComponent?: React.ReactNode;
    skeleton?: boolean;
    skeletonColor?: string;
  };
  reveal?: {
    direction?: "left" | "right" | "top" | "bottom" | "center";
    clipPath?: string;
  };
  hover?: {
    scale?: number;
    rotate?: number;
    brightness?: number;
    blur?: number;
    duration?: number;
    ease?: string;
  };
  triggerOnce?: boolean;
  threshold?: number | number[];
  mobile?: {
    disableAnimations?: boolean;
    simpleAnimation?: "fade" | "none";
    breakPoint?: number;
    reducedMotion?: boolean;
  };
  performance?: {
    willChange?: boolean;
    gpuAcceleration?: boolean;
    reducedMotionFallback?: boolean;
  };
  // Custom variants
  customVariants?: {
    initial: any;
    animate: any;
    exit?: any;
  };
  // Callbacks
  onLoadStart?: () => void;
  onLoadComplete?: () => void;
  onError?: (error: string) => void;
}

const MotionImage = ({
  src,
  alt,
  className = "",
  width,
  height,
  fill,
  sizes,
  priority = false,
  animation = { type: "fade", duration: 0.8 },
  progressive = {
    enabled: true,
    quality: 75,
  },
  loadingConfig = {
    lazy: true,
    spinner: false,
    skeleton: true,
    skeletonColor: "#e5e7eb",
  },
  reveal = {
    direction: "center",
  },
  hover,
  triggerOnce = true,
  threshold = 0.2,
  mobile = {
    disableAnimations: false,
    simpleAnimation: "fade",
    breakPoint: 768,
    reducedMotion: true,
  },
  performance = {
    willChange: true,
    gpuAcceleration: true,
    reducedMotionFallback: true,
  },
  customVariants,
  onLoadStart,
  onLoadComplete,
  onError,
  ...imageProps
}: MotionImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { ref: inViewRef, inView } = useInView({
    triggerOnce,
    threshold: isMobile
      ? Array.isArray(threshold)
        ? threshold.map((t) => Math.max(t * 0.3, 0.1))
        : Math.max(threshold * 0.3, 0.1)
      : threshold,
    rootMargin: isMobile ? "20px" : "100px",
  });

  const combinedRef = (node: HTMLDivElement) => {
    if (node) {
      inViewRef(node);
    }
  };

  useEffect(() => {
    let resizeTimeoutId: NodeJS.Timeout | null = null;
    // Mobile detection
    const checkMobile = () => {
      const isMobileNow = window.innerWidth < (mobile.breakPoint || 768);
      setIsMobile(isMobileNow);
    };

    const handleResize = () => {
      if (resizeTimeoutId) {
        clearTimeout(resizeTimeoutId);
      }
      resizeTimeoutId = setTimeout(checkMobile, 100);
    };

    checkMobile();
    window.addEventListener("resize", handleResize);

    if (priority || !loadingConfig.lazy) {
      onLoadStart?.();
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeoutId) {
        clearTimeout(resizeTimeoutId);
      }
    };
  }, [mobile.breakPoint, onLoadStart, priority, loadingConfig.lazy]);

  const handleImageLoad = () => {
    setIsLoaded(true);
    setIsLoading(false);
    onLoadComplete?.();
  };

  const handleImageError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.("failed to load image");
  };

  const handleLoadingStart = () => {
    if (!isLoaded && !hasError) {
      setIsLoading(true);
      onLoadStart?.();
    }
  };

  const getRevealClipPath = () => {
    if (reveal.clipPath) return reveal.clipPath;
    switch (reveal.direction) {
      case "left":
        return "inset(0 100% 0 0)";
      case "right":
        return "inset(0 0 0 100%)";
      case "top":
        return "inset(100% 0 0 0)";
      case "bottom":
        return "inset(0 0 100% 0)";
      case "center":
      default:
        return "inset(50% 50% 50% 50%)";
    }
  };

  const getAnimationVariants = () => {
    if (customVariants) {
      const transition: Transition = {
        duration: animation.duration || 0.8,
        delay: animation.delay || 0,
      };

      const easeValue = animation.ease || "easeOut";
      if (typeof easeValue === "string") {
        switch (easeValue) {
          case "linear":
            transition.ease = "linear";
            break;
          case "easeIn":
            transition.ease = "easeIn";
            break;
          case "easeOut":
            transition.ease = "easeOut";
            break;
          case "easeInOut":
            transition.ease = "easeInOut";
            break;
          case "circIn":
            transition.ease = "circIn";
            break;
          case "circOut":
            transition.ease = "circOut";
            break;
          case "circInOut":
            transition.ease = "circInOut";
            break;
          case "backIn":
            transition.ease = "backIn";
            break;
          case "backOut":
            transition.ease = "backOut";
            break;
          case "backInOut":
            transition.ease = "backInOut";
            break;
          case "anticipate":
            transition.ease = "anticipate";
            break;
          default:
            if (easeValue.includes("cubic-bezier")) {
              const match = easeValue.match(/cubic-bezier\(([^)]+)\)/);
              if (match) {
                const values = match[1]
                  .split(",")
                  .map((v) => parseFloat(v.trim()));
                if (values.length === 4) {
                  transition.ease = values as [number, number, number, number];
                }
              }
            } else {
              transition.ease = "easeOut";
            }
        }
      } else {
        transition.ease = easeValue;
      }

      return {
        initial: customVariants.initial,
        animate: customVariants.animate,
        transition,
      };
    }

    let currentAnimation = animation;
    if (isMobile || prefersReducedMotion) {
      if (mobile.disableAnimations || prefersReducedMotion) {
        currentAnimation = { ...animation, type: "none" };
      } else if (mobile.simpleAnimation) {
        currentAnimation = {
          ...animation,
          type: mobile.simpleAnimation,
          duration: Math.min(animation.duration || 0.8, 0.5),
          delay: Math.min(animation.delay || 0, 0.2),
        };
      }
    }

    const {
      type = "fade",
      duration = 0.8,
      delay = 0,
      ease = "easeOut",
    } = currentAnimation;

    const variants = {
      fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      },
      scale: {
        initial: { opacity: 0, scale: isMobile ? 0.95 : 0.9 },
        animate: { opacity: 1, scale: 1 },
      },
      blur: {
        initial: { opacity: 0, filter: "blur(20px)" },
        animate: { opacity: 1, filter: "blur(0px)" },
      },
      slideUp: {
        initial: { opacity: 0, y: isMobile ? 30 : 60 },
        animate: { opacity: 1, y: 0 },
      },
      slideDown: {
        initial: { opacity: 0, y: isMobile ? -30 : -60 },
        animate: { opacity: 1, y: 0 },
      },
      slideLeft: {
        initial: { opacity: 0, x: isMobile ? 30 : 60 },
        animate: { opacity: 1, x: 0 },
      },
      slideRight: {
        initial: { opacity: 0, x: isMobile ? -30 : -60 },
        animate: { opacity: 1, x: 0 },
      },
      zoom: {
        initial: { opacity: 0, scale: isMobile ? 1.05 : 1.1 },
        animate: { opacity: 1, scale: 1 },
      },
      rotate: {
        initial: { opacity: 0, rotate: -10, scale: isMobile ? 0.95 : 0.9 },
        animate: { opacity: 1, rotate: 0, scale: 1 },
      },
      flip: {
        initial: { opacity: 0, rotateY: 90 },
        animate: { opacity: 1, rotateY: 0 },
      },
      reveal: {
        initial: {
          opacity: 1,
          clipPath: getRevealClipPath(),
        },
        animate: {
          opacity: 1,
          clipPath: "inset(0 0 0 0)",
        },
      },
      none: {
        initial: {},
        animate: {},
      },
    };

    const baseTransition: Transition = {
      duration,
      delay,
    };

    // Handle ease
    const easeValue = ease;
    if (typeof easeValue === "string") {
      switch (easeValue) {
        case "linear":
          baseTransition.ease = "linear";
          break;
        case "easeIn":
          baseTransition.ease = "easeIn";
          break;
        case "easeOut":
          baseTransition.ease = "easeOut";
          break;
        case "easeInOut":
          baseTransition.ease = "easeInOut";
          break;
        case "circIn":
          baseTransition.ease = "circIn";
          break;
        case "circOut":
          baseTransition.ease = "circOut";
          break;
        case "circInOut":
          baseTransition.ease = "circInOut";
          break;
        case "backIn":
          baseTransition.ease = "backIn";
          break;
        case "backOut":
          baseTransition.ease = "backOut";
          break;
        case "backInOut":
          baseTransition.ease = "backInOut";
          break;
        case "anticipate":
          baseTransition.ease = "anticipate";
          break;
        default:
          if (easeValue.includes("cubic-bezier")) {
            const match = easeValue.match(/cubic-bezier\(([^)]+)\)/);
            if (match) {
              const values = match[1]
                .split(",")
                .map((v) => parseFloat(v.trim()));
              if (values.length === 4) {
                baseTransition.ease = values as [
                  number,
                  number,
                  number,
                  number
                ];
              }
            }
          } else {
            baseTransition.ease = "easeOut";
          }
      }
    } else {
      baseTransition.ease = easeValue;
    }

    return {
      initial: variants[type].initial,
      animate: variants[type].animate,
      transition: baseTransition,
    };
  };

  const getHoverVariants = () => {
    if (!hover) return {};

    return {
      whileHover: {
        scale: hover.scale || 1.05,
        rotate: hover.rotate || 0,
        filter: `brightness(${hover.brightness || 1}) blur(${
          hover.blur || 0
        }px)`,
        transition: {
          duration: hover.duration || 0.3,
          ease: hover.ease || "easeOut",
        } as any,
      },
    };
  };

  const shouldAnimate =
    !prefersReducedMotion &&
    !(isMobile && mobile.disableAnimations) &&
    animation.type !== "none";

  const animationVariants = getAnimationVariants();
  const hoverVariants = getHoverVariants();

  const getEnhancedClassName = () => {
    let classes = className;

    if (performance.gpuAcceleration && !isMobile) {
      classes += " motion-safe:transform-gpu";
    }
    if (prefersReducedMotion) {
      classes += " motion-reduce:transform-none";
    }
    if (performance.willChange) {
      classes += " motion-safe:will-change-transform";
    }

    return classes.trim();
  };

  const showSkeleton = loadingConfig.skeleton && isLoading && !hasError;
  const showSpinner = loadingConfig.spinner && isLoading && !hasError;

  // Next.js Image props with optimization
  const nextImageProps = {
    src,
    alt,
    width,
    height,
    fill,
    sizes: sizes || progressive.sizes,
    priority: priority || !loadingConfig.lazy,
    quality: progressive.quality || 75,
    placeholder:
      progressive.enabled && progressive.blurDataURL
        ? ("blur" as const)
        : undefined,
    blurDataURL: progressive.blurDataURL,
    loading:
      loadingConfig.lazy && !priority ? ("lazy" as const) : ("eager" as const),
    onLoad: handleImageLoad,
    onError: handleImageError,
    onLoadStart: handleLoadingStart,
    ...imageProps,
  };

  return (
    <m.div
      ref={combinedRef}
      className={`relative overflow-hidden w-full h-full ${getEnhancedClassName()}`}
      initial={shouldAnimate ? animationVariants.initial : {}}
      animate={
        shouldAnimate && inView && isLoaded
          ? animationVariants.animate
          : animationVariants.initial
      }
      transition={shouldAnimate ? (animationVariants.transition as any) : {}}
      {...hoverVariants}
    >
      {/* Skeleton loader */}
      {showSkeleton && (
        <div
          className="absolute inset-0 animate-pulse z-10"
          style={{ backgroundColor: loadingConfig.skeletonColor }}
        />
      )}
      {/* Spinner loader */}
      {showSpinner && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          {loadingConfig.spinnerComponent || (
            <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
          )}
        </div>
      )}
      {/*  Image with proper parent height */}
      <Image
        {...nextImageProps}
        className={`${fill ? "object-cover" : ""}`}
        style={{ opacity: isLoaded ? 1 : 0 }}
      />
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 z-30">
          <div className="text-center">
            <div className="text-2xl mb-2">⚠️</div>
            <div className="text-sm">Failed to load image</div>
          </div>
        </div>
      )}
    </m.div>
  );
};

export default MotionImage;
