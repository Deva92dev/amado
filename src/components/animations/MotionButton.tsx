"use client";
import {
  AnimatePresence,
  m,
  useReducedMotion,
  Transition,
  Easing,
} from "motion/react";
import {
  ButtonHTMLAttributes,
  ReactNode,
  useEffect,
  useState,
  useRef,
  MouseEvent,
  TouchEvent,
} from "react";
import { useInView } from "react-intersection-observer";

interface MotionButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  children: ReactNode;
  className?: string;
  as?: string;
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "success"
    | "brand"
    | "custom";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  animation?: {
    type?:
      | "bounce"
      | "pulse"
      | "shake"
      | "rotate"
      | "scale"
      | "slide"
      | "flip"
      | "glow"
      | "none";
    duration?: number;
    delay?: number;
    ease?: Easing | string;
    repeat?: boolean | number;
    repeatDelay?: number;
  };
  hover?: {
    scale?: number;
    rotate?: number;
    brightness?: number;
    saturate?: number;
    blur?: number;
    y?: number;
    x?: number;
    duration?: number;
    ease?: string;
    background?: string;
    color?: string;
    borderColor?: string;
    shadow?: string;
  };
  tap?: {
    scale?: number;
    rotate?: number;
    y?: number;
    x?: number;
    duration?: number;
    ease?: string;
  };
  loading?: {
    state?: boolean;
    spinner?: ReactNode;
    text?: string;
    disableClick?: boolean;
  };
  ripple?: {
    enabled?: boolean;
    color?: string;
    duration?: number;
    size?: "auto" | number;
  };
  magnetic?: {
    enabled?: boolean;
    strength?: number;
    radius?: number;
  };
  triggerOnce?: boolean;
  threshold?: number | number[];
  mobile?: {
    disableAnimations?: boolean;
    disableHover?: boolean;
    simpleTap?: boolean;
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
    initial?: any;
    animate?: any;
    hover?: any;
    tap?: any;
    exit?: any;
  };
  // Callbacks
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
  onTapStart?: () => void;
  onTapCancel?: () => void;
}

interface RippleEffect {
  duration: number;
  color: string;
  size: any;
  id: number;
  x: number;
  y: number;
}

const MotionButton = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  animation = { type: "scale", duration: 0.6 },
  hover = { scale: 1.05, duration: 0.2 },
  tap = { scale: 0.95, duration: 0.1 },
  loading = { state: false, disableClick: true },
  ripple = { enabled: true, duration: 600 },
  magnetic = { enabled: false, strength: 0.3, radius: 100 },
  triggerOnce = true,
  threshold = 0.2,
  mobile = {
    disableAnimations: false,
    disableHover: true,
    simpleTap: true,
    breakPoint: 768,
    reducedMotion: true,
  },
  performance = {
    willChange: true,
    gpuAcceleration: true,
    reducedMotionFallback: true,
  },
  customVariants,
  onClick,
  onHoverStart,
  onHoverEnd,
  onTapStart,
  onTapCancel,
  disabled,
  ...buttonProps
}: MotionButtonProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const rippleId = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  const { ref: inViewRef, inView } = useInView({
    triggerOnce,
    threshold: isMobile
      ? Array.isArray(threshold)
        ? threshold.map((t) => Math.max(t * 0.3, 0.1))
        : Math.max(threshold * 0.3, 0.1)
      : threshold,
    rootMargin: isMobile ? "20px" : "50px",
  });

  const combinedRef = (node: HTMLButtonElement) => {
    if (node) {
      inViewRef(node);
      (buttonRef as any).current = node;
    }
  };

  // Combined useEffect for all setup and event handling
  useEffect(() => {
    const button = buttonRef.current;
    let resizeCleanup: (() => void) | null = null;
    let magneticCleanup: (() => void) | null = null;

    // Mobile detection setup
    const checkMobile = () => {
      setIsMobile(window.innerWidth < (mobile.breakPoint || 768));
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    resizeCleanup = () => window.removeEventListener("resize", checkMobile);

    // Magnetic effect setup
    if (
      magnetic.enabled &&
      !isMobile &&
      !prefersReducedMotion &&
      !disabled &&
      button
    ) {
      const handleMouseMove = (e: globalThis.MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );

        if (distance < (magnetic.radius || 100)) {
          const strength = magnetic.strength || 0.3;
          const x = (e.clientX - centerX) * strength;
          const y = (e.clientY - centerY) * strength;
          setMagneticOffset({ x, y });
        } else {
          setMagneticOffset({ x: 0, y: 0 });
        }
      };

      const handleMouseLeave = () => {
        setMagneticOffset({ x: 0, y: 0 });
      };

      document.addEventListener("mousemove", handleMouseMove);
      button.addEventListener("mouseleave", handleMouseLeave);

      magneticCleanup = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    // Cleanup function
    return () => {
      resizeCleanup?.();
      magneticCleanup?.();
    };
  }, [
    magnetic.enabled,
    magnetic.strength,
    magnetic.radius,
    isMobile,
    prefersReducedMotion,
    disabled,
    mobile.breakPoint,
  ]);

  // Ripple effect
  const createRipple = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>
  ) => {
    if (!ripple.enabled || disabled) return;

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();

    let x: number, y: number;

    if ("touches" in e) {
      // Touch event
      const touch = e.touches[0] || e.changedTouches[0];
      x = touch.clientX - rect.left;
      y = touch.clientY - rect.top;
    } else {
      // Mouse event
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    const newRipple: RippleEffect = {
      id: rippleId.current++,
      x,
      y,
      size: undefined,
      color: "",
      duration: 0,
    };

    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, ripple.duration || 600);
  };

  const getVariantStyles = () => {
    const variants = {
      primary:
        "bg-primary text-primary-foreground border-primary hover:bg-primary/90",
      secondary:
        "bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/80",
      outline:
        "bg-transparent text-primary border-primary hover:bg-primary/5 hover:text-primary",
      ghost:
        "bg-transparent text-foreground border-transparent hover:bg-accent hover:text-accent-foreground",
      danger:
        "bg-destructive text-destructive-foreground border-destructive hover:bg-destructive/90",
      success:
        "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800",
      brand: "btn-brand border-0 hover:brightness-95 text-white",
      custom: "",
    };

    return variants[variant];
  };

  const getSizeStyles = () => {
    const sizes = {
      xs: "px-2 py-1 text-xs",
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
      xl: "px-8 py-4 text-xl",
    };

    return sizes[size];
  };

  const getAnimationVariants = () => {
    if (customVariants) {
      const transition: Transition = {
        duration: animation.duration || 0.6,
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
        initial: customVariants.initial || {},
        animate: customVariants.animate || {},
        transition,
      };
    }

    let currentAnimation = animation;
    if (isMobile || prefersReducedMotion) {
      if (mobile.disableAnimations || prefersReducedMotion) {
        currentAnimation = { ...animation, type: "none" };
      } else {
        currentAnimation = {
          ...animation,
          duration: Math.min(animation.duration || 0.6, 0.4),
          delay: Math.min(animation.delay || 0, 0.2),
        };
      }
    }

    const {
      type = "scale",
      duration = 0.6,
      delay = 0,
      ease = "easeOut",
      repeat = false,
      repeatDelay = 0,
    } = currentAnimation;

    const variants = {
      bounce: {
        initial: { opacity: 0, y: isMobile ? 10 : 20, scale: 0.9 },
        animate: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            damping: 10,
            stiffness: 100,
            delay,
          },
        },
      },
      pulse: {
        initial: { opacity: 0, scale: 0.9 },
        animate: {
          opacity: 1,
          scale: [0.9, 1.05, 1],
          transition: {
            duration,
            delay,
            ease: "easeInOut",
            repeat:
              repeat === true
                ? Infinity
                : typeof repeat === "number"
                ? repeat
                : 0,
            repeatDelay,
          },
        },
      },
      shake: {
        initial: { opacity: 0, x: -10 },
        animate: {
          opacity: 1,
          x: [0, -5, 5, -5, 5, 0],
          transition: {
            duration,
            delay,
            ease: "easeInOut",
            repeat:
              repeat === true
                ? Infinity
                : typeof repeat === "number"
                ? repeat
                : 0,
            repeatDelay,
          },
        },
      },
      rotate: {
        initial: { opacity: 0, rotate: -10, scale: 0.9 },
        animate: {
          opacity: 1,
          rotate: 0,
          scale: 1,
          transition: {
            duration,
            delay,
            ease: "backOut",
          },
        },
      },
      scale: {
        initial: { opacity: 0, scale: isMobile ? 0.95 : 0.8 },
        animate: {
          opacity: 1,
          scale: 1,
          transition: {
            duration,
            delay,
            ease: "backOut",
          },
        },
      },
      slide: {
        initial: { opacity: 0, y: isMobile ? 20 : 30 },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            duration,
            delay,
            ease,
          },
        },
      },
      flip: {
        initial: { opacity: 0, rotateY: 90 },
        animate: {
          opacity: 1,
          rotateY: 0,
          transition: {
            duration,
            delay,
            ease: "backOut",
          },
        },
      },
      glow: {
        initial: { opacity: 0, scale: 0.9, filter: "brightness(0.8)" },
        animate: {
          opacity: 1,
          scale: 1,
          filter: ["brightness(0.8)", "brightness(1.2)", "brightness(1)"],
          transition: {
            duration,
            delay,
            ease: "easeInOut",
          },
        },
      },
      none: {
        initial: {},
        animate: {},
      },
    };

    return variants[type];
  };

  const getHoverVariants = () => {
    if (isMobile && mobile.disableHover) return {};
    if (disabled || loading.state) return {};
    if (customVariants?.hover) return { whileHover: customVariants.hover };

    const hoverStyle: any = {};

    if (hover.scale !== undefined) hoverStyle.scale = hover.scale;
    if (hover.rotate !== undefined) hoverStyle.rotate = hover.rotate;
    if (hover.x !== undefined) hoverStyle.x = hover.x;
    if (hover.y !== undefined) hoverStyle.y = hover.y;

    // Handle filters
    const filters = [];
    if (hover.brightness !== undefined)
      filters.push(`brightness(${hover.brightness})`);
    if (hover.saturate !== undefined)
      filters.push(`saturate(${hover.saturate})`);
    if (hover.blur !== undefined) filters.push(`blur(${hover.blur}px)`);
    if (filters.length > 0) hoverStyle.filter = filters.join(" ");

    // Handle shadow
    if (hover.shadow) {
      hoverStyle.boxShadow = hover.shadow;
    }

    return {
      whileHover: {
        ...hoverStyle,
        transition: {
          duration: hover.duration || 0.2,
          ease: hover.ease || "easeOut",
        },
      },
    };
  };

  const getTapVariants = () => {
    if (disabled || loading.state) return {};
    if (customVariants?.tap) return { whileTap: customVariants.tap };

    const tapStyle: any = {};

    if (isMobile && mobile.simpleTap) {
      tapStyle.scale = 0.98;
    } else {
      if (tap.scale !== undefined) tapStyle.scale = tap.scale;
      if (tap.rotate !== undefined) tapStyle.rotate = tap.rotate;
      if (tap.x !== undefined) tapStyle.x = tap.x;
      if (tap.y !== undefined) tapStyle.y = tap.y;
    }

    return {
      whileTap: {
        ...tapStyle,
        transition: {
          duration: tap.duration || 0.1,
          ease: tap.ease || "easeOut",
        },
      },
    };
  };

  const shouldAnimate =
    !prefersReducedMotion &&
    !(isMobile && mobile.disableAnimations) &&
    animation.type !== "none";

  const animationVariants = getAnimationVariants();
  const hoverVariants = getHoverVariants();
  const tapVariants = getTapVariants();

  const getEnhancedClassName = () => {
    let classes = `
      relative inline-flex items-center justify-center 
      font-medium rounded-[--radius] border transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus-visible:ring-brand
      ${getVariantStyles()} ${getSizeStyles()} ${className}
    `;

    if (disabled || loading.state) {
      classes += " opacity-50 cursor-not-allowed";
    } else {
      classes += " cursor-pointer";
    }

    if (performance.gpuAcceleration && !isMobile) {
      classes += " motion-safe:transform-gpu";
    }
    if (prefersReducedMotion) {
      classes += " motion-reduce:transform-none";
    }
    if (performance.willChange) {
      classes += " motion-safe:will-change-transform";
    }

    // Add overflow hidden for ripple effect
    if (ripple.enabled) {
      classes += " overflow-hidden";
    }

    return classes.trim();
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled || (loading.state && loading.disableClick)) return;

    createRipple(e);
    onClick?.(e);
  };

  const handleTouchStart = (e: TouchEvent<HTMLButtonElement>) => {
    if (disabled || (loading.state && loading.disableClick)) return;

    createRipple(e);
    onTapStart?.();
  };

  return (
    <m.button
      ref={combinedRef}
      className={getEnhancedClassName()}
      initial={shouldAnimate ? animationVariants.initial : false}
      animate={
        shouldAnimate
          ? inView
            ? animationVariants.animate
            : animationVariants.initial
          : false
      }
      style={{
        x: magneticOffset.x,
        y: magneticOffset.y,
      }}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onTapCancel={onTapCancel}
      disabled={disabled || (loading.state && loading.disableClick)}
      {...(hoverVariants as any)}
      {...(tapVariants as any)}
      {...buttonProps}
    >
      {/* Loading State */}
      <AnimatePresence mode="wait">
        {loading.state ? (
          <m.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center"
          >
            {loading.spinner || (
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            {loading.text || "Loading..."}
          </m.div>
        ) : (
          <m.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center"
          >
            {children}
          </m.div>
        )}
      </AnimatePresence>
      {/* Ripple Effects */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <m.span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left:
                ripple.x -
                (typeof ripple.size === "number" ? ripple.size / 2 : 50),
              top:
                ripple.y -
                (typeof ripple.size === "number" ? ripple.size / 2 : 50),
              backgroundColor:
                ripple.color || "hsla(var(--brand-accent) / 0.3)",
            }}
            initial={{
              width: typeof ripple.size === "number" ? ripple.size : 0,
              height: typeof ripple.size === "number" ? ripple.size : 0,
              opacity: 0.8,
            }}
            animate={{
              width: typeof ripple.size === "number" ? ripple.size * 2 : 100,
              height: typeof ripple.size === "number" ? ripple.size * 2 : 100,
              opacity: 0,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: (ripple.duration || 600) / 1000,
              ease: "easeOut",
            }}
          />
        ))}
      </AnimatePresence>
    </m.button>
  );
};

export default MotionButton;
