"use client";
import {
  m,
  useReducedMotion,
  Transition,
  Easing,
  AnimatePresence,
} from "motion/react";
import { ReactNode, useState, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface MotionCardProps {
  children: ReactNode;
  className?: string;
  cardAnimation?: {
    type?:
      | "lift"
      | "tilt"
      | "glow"
      | "flip"
      | "zoom"
      | "slide"
      | "bounce"
      | "none";
    duration?: number;
    delay?: number;
    stagger?: number;
    ease?: Easing | string;
    intensity?: "subtle" | "medium" | "strong";
  };
  hoverEffects?: {
    enabled?: boolean;
    lift?: boolean;
    scale?: number;
    rotate?: number;
    glow?: boolean;
    glowColor?: string;
    shadowIntensity?: "light" | "medium" | "strong";
    borderGlow?: boolean;
  };
  interactive?: {
    cursor?: "pointer" | "default" | "grab";
    clickAnimation?: "pulse" | "bounce" | "shrink" | "none";
    ripple?: boolean;
    rippleColor?: string;
  };
  loading?: {
    skeleton?: boolean;
    shimmer?: boolean;
    pulse?: boolean;
    duration?: number;
  };
  entranceDelay?: number;
  triggerOnce?: boolean;
  threshold?: number;
  mobile?: {
    disableHover?: boolean;
    simplifyAnimations?: boolean;
    reducedMotion?: boolean;
    breakPoint?: number;
  };
  performance?: {
    willChange?: boolean;
    gpuAcceleration?: boolean;
    reducedMotionFallback?: boolean;
  };
  // Event handlers
  onClick?: () => void;
  onHover?: () => void;
  onLeave?: () => void;
  customVariants?: {
    initial?: any;
    animate?: any;
    hover?: any;
    tap?: any;
    exit?: any;
  };
}

const MotionCard = ({
  children,
  className = "",
  cardAnimation = {
    type: "lift",
    duration: 0.6,
    delay: 0,
    ease: "easeOut",
    intensity: "medium",
    stagger: 0,
  },
  hoverEffects = {
    enabled: true,
    lift: true,
    scale: 1.02,
    rotate: 0,
    glow: false,
    shadowIntensity: "medium",
    borderGlow: false,
  },
  interactive = {
    cursor: "pointer",
    clickAnimation: "pulse",
    ripple: false,
    rippleColor: "rgba(255, 255, 255, 0.6)",
  },
  loading = {
    skeleton: false,
    shimmer: false,
    pulse: false,
    duration: 1.5,
  },
  entranceDelay = 0,
  triggerOnce = true,
  threshold = 0.1,
  mobile = {
    disableHover: true,
    simplifyAnimations: false,
    reducedMotion: true,
    breakPoint: 768,
  },
  performance = {
    willChange: true,
    gpuAcceleration: true,
    reducedMotionFallback: true,
  },
  onClick,
  onHover,
  onLeave,
  customVariants,
}: MotionCardProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < (mobile.breakPoint || 768));
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [mobile.breakPoint]);

  const { ref: inViewRef, inView } = useInView({
    triggerOnce,
    threshold: isMobile ? Math.max(threshold * 0.5, 0.05) : threshold,
    rootMargin: isMobile ? "10px" : "30px",
  });

  const combinedRef = (node: HTMLDivElement) => {
    if (node) {
      inViewRef(node);
      (cardRef as any).current = node;
    }
  };

  // Get entrance animation variants
  const getEntranceVariants = () => {
    if (customVariants) {
      return {
        initial: customVariants.initial || {},
        animate: customVariants.animate || {},
      };
    }

    const { type = "lift", intensity = "medium" } = cardAnimation;
    const intensityMultiplier = {
      subtle: 0.5,
      medium: 1,
      strong: 1.5,
    }[intensity];

    // Simplified animations for mobile/reduced motion
    if ((isMobile && mobile.simplifyAnimations) || prefersReducedMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      };
    }

    const variants = {
      lift: {
        initial: {
          opacity: 0,
          y: 30 * intensityMultiplier,
          scale: 0.95,
        },
        animate: {
          opacity: 1,
          y: 0,
          scale: 1,
        },
      },
      tilt: {
        initial: {
          opacity: 0,
          rotateX: 15 * intensityMultiplier,
          rotateY: 5 * intensityMultiplier,
          scale: 0.9,
        },
        animate: {
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
        },
      },
      glow: {
        initial: {
          opacity: 0,
          scale: 0.8,
          filter: "brightness(0.5) blur(2px)",
        },
        animate: {
          opacity: 1,
          scale: 1,
          filter: "brightness(1) blur(0px)",
        },
      },
      flip: {
        initial: {
          opacity: 0,
          rotateY: -180,
          scale: 0.8,
        },
        animate: {
          opacity: 1,
          rotateY: 0,
          scale: 1,
        },
      },
      zoom: {
        initial: {
          opacity: 0,
          scale: 0.3,
        },
        animate: {
          opacity: 1,
          scale: 1,
        },
      },
      slide: {
        initial: {
          opacity: 0,
          x: -50 * intensityMultiplier,
          rotateZ: -5 * intensityMultiplier,
        },
        animate: {
          opacity: 1,
          x: 0,
          rotateZ: 0,
        },
      },
      bounce: {
        initial: {
          opacity: 0,
          y: -50 * intensityMultiplier,
          scale: 0.3,
        },
        animate: {
          opacity: 1,
          y: 0,
          scale: 1,
        },
      },
      none: {
        initial: {},
        animate: {},
      },
    };

    return variants[type] || variants.lift;
  };

  // Get hover variants
  const getHoverVariants = () => {
    if (customVariants?.hover) {
      return customVariants.hover;
    }

    if (
      !hoverEffects.enabled ||
      (isMobile && mobile.disableHover) ||
      prefersReducedMotion
    ) {
      return {};
    }

    const hoverVariant: any = {};

    if (hoverEffects.lift) {
      hoverVariant.y = -8;
    }

    if (hoverEffects.scale && hoverEffects.scale !== 1) {
      hoverVariant.scale = hoverEffects.scale;
    }

    if (hoverEffects.rotate && hoverEffects.rotate !== 0) {
      hoverVariant.rotateZ = hoverEffects.rotate;
    }

    // Shadow and glow effects
    const shadows = {
      light: "0 4px 20px rgba(0, 0, 0, 0.1)",
      medium: "0 8px 30px rgba(0, 0, 0, 0.15)",
      strong: "0 12px 40px rgba(0, 0, 0, 0.2)",
    };

    if (hoverEffects.shadowIntensity) {
      hoverVariant.boxShadow = shadows[hoverEffects.shadowIntensity];
    }

    if (hoverEffects.glow && hoverEffects.glowColor) {
      hoverVariant.filter = `drop-shadow(0 0 20px ${hoverEffects.glowColor})`;
    }

    return hoverVariant;
  };

  // Get tap variants
  const getTapVariants = () => {
    if (customVariants?.tap) {
      return customVariants.tap;
    }

    if (prefersReducedMotion) return {};

    const { clickAnimation = "pulse" } = interactive;

    const variants = {
      pulse: { scale: 1.05 },
      bounce: { scale: 0.95, y: -2 },
      shrink: { scale: 0.95 },
      none: {},
    };

    return variants[clickAnimation];
  };

  // Build transition
  const getTransition = (): Transition => {
    const {
      duration = 0.6,
      delay = 0,
      ease = "easeOut",
      stagger = 0,
    } = cardAnimation;

    const transition: Transition = {
      duration: prefersReducedMotion ? 0.2 : duration,
      delay: entranceDelay + delay,
    };

    // Handle easing
    if (typeof ease === "string") {
      switch (ease) {
        case "linear":
        case "easeIn":
        case "easeOut":
        case "easeInOut":
        case "circIn":
        case "circOut":
        case "circInOut":
        case "backIn":
        case "backOut":
        case "backInOut":
        case "anticipate":
          transition.ease = ease;
          break;
        default:
          if (ease.includes("cubic-bezier")) {
            const match = ease.match(/cubic-bezier\(([^)]+)\)/);
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
      transition.ease = ease;
    }

    if (stagger > 0) {
      transition.staggerChildren = stagger;
    }

    // Special handling for bounce
    if (cardAnimation.type === "bounce") {
      return {
        ...transition,
        type: "spring",
        damping: 12,
        stiffness: 120,
      };
    }

    return transition;
  };

  // Handle click with ripple effect
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (interactive.ripple && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = { id: Date.now(), x, y };

      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) =>
          prev.filter((ripple) => ripple.id !== newRipple.id)
        );
      }, 600);
    }

    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 150);

    onClick?.();
  };

  // Generate className
  const getClassName = () => {
    let classes = `relative ${className}`;

    // Cursor
    if (interactive.cursor) {
      classes += ` cursor-${interactive.cursor}`;
    }

    // Performance optimizations
    if (performance.gpuAcceleration && !isMobile) {
      classes += " motion-safe:transform-gpu";
    }

    if (performance.willChange) {
      classes += " motion-safe:will-change-transform";
    }

    // Reduced motion
    if (prefersReducedMotion) {
      classes += " motion-reduce:transform-none";
    }

    // Border glow effect
    if (hoverEffects.borderGlow && !isMobile) {
      classes +=
        " transition-all duration-300 hover:ring-2 hover:ring-opacity-50";
    }

    return classes.trim();
  };

  // Loading states
  if (loading.skeleton) {
    return (
      <m.div
        className={`${getClassName()} bg-gray-200 animate-pulse rounded-lg`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-48 bg-gray-300 rounded-t-lg"></div>
        <div className="p-4 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        </div>
      </m.div>
    );
  }

  if (loading.shimmer) {
    return (
      <m.div
        className={`${getClassName()} bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_${
          loading.duration || 1.5
        }s_infinite] rounded-lg`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </m.div>
    );
  }

  if (loading.pulse) {
    return (
      <m.div
        className={`${getClassName()} animate-pulse`}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: loading.duration || 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        {children}
      </m.div>
    );
  }

  const entranceVariants = getEntranceVariants();
  const hoverVariants = getHoverVariants();
  const tapVariants = getTapVariants();
  const transition = getTransition();

  return (
    <m.div
      ref={combinedRef}
      className={getClassName()}
      initial={entranceVariants.initial}
      animate={inView ? entranceVariants.animate : entranceVariants.initial}
      whileHover={hoverVariants}
      whileTap={tapVariants}
      transition={transition}
      onClick={handleClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        transformOrigin: "center",
        transformStyle: "preserve-3d",
      }}
    >
      {children}

      {/* Ripple effects */}
      <AnimatePresence>
        {interactive.ripple &&
          ripples.map((ripple) => (
            <m.div
              key={ripple.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: ripple.x - 20,
                top: ripple.y - 20,
                width: 40,
                height: 40,
                backgroundColor:
                  interactive.rippleColor || "rgba(255, 255, 255, 0.6)",
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 4, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ))}
      </AnimatePresence>
    </m.div>
  );
};

export default MotionCard;
