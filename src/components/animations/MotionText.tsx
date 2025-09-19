"use client";

import {
  m,
  useReducedMotion,
  Transition,
  Easing,
  Variants,
} from "motion/react";
import { ReactNode, useEffect, useRef, useState } from "react";

interface MotionTextProps {
  children: string | ReactNode;
  className?: string;
  as?: string;
  animation?: {
    type?:
      | "typewriter"
      | "fadeIn"
      | "slideUp"
      | "slideDown"
      | "slideLeft"
      | "slideRight"
      | "scale"
      | "blur"
      | "wave"
      | "none";
    duration?: number;
    delay?: number;
    stagger?: number;
    ease?: Easing | string;
    repeat?: boolean | number;
    repeatDelay?: number;
  };
  typewriter?: {
    speed?: number;
    cursor?: boolean;
    cursorChar?: string;
    deleteSpeed?: number;
    deleteDelay?: number;
    loop?: boolean;
  };
  triggerOnce?: boolean;
  threshold?: number | number[];
  mobile?: {
    disableAnimations?: boolean;
    simpleAnimation?: "fadeIn" | "none";
    breakPoint?: number;
    reducedMotion?: boolean;
  };
  performance?: {
    willChange?: boolean;
    gpuAcceleration?: boolean;
    reducedMotionFallback?: boolean;
  };
  customVariants?: {
    initial: any;
    animate: any;
    exit?: any;
  };
  // Split text options
  splitBy?: "character" | "word" | "line";
  preserveWhitespace?: boolean;
}

const MotionText = ({
  children,
  className = "",
  animation = { type: "fadeIn", duration: 0.8, stagger: 0.05 },
  typewriter = {
    speed: 50,
    cursor: true,
    cursorChar: "|",
    deleteSpeed: 30,
    deleteDelay: 2000,
    loop: false,
  },
  triggerOnce = true,
  threshold = 0.2,
  mobile = {
    disableAnimations: false,
    simpleAnimation: "fadeIn",
    breakPoint: 768,
    reducedMotion: true,
  },
  performance = {
    willChange: true,
    gpuAcceleration: true,
    reducedMotionFallback: true,
  },
  customVariants,
  splitBy = "character",
  preserveWhitespace = true,
}: MotionTextProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const [inView, setInView] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const inViewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let resizeListener: (() => void) | null = null;
    let observer: IntersectionObserver | null = null;
    let hasTriggered = false; // Track if we've triggered once
    let typewriterTimeout: NodeJS.Timeout | null = null;
    let cursorInterval: NodeJS.Timeout | null = null;
    let currentIndex = 0;
    let isDeleting = false;

    // Mobile detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth < (mobile.breakPoint || 768));
    };
    checkMobile();
    resizeListener = checkMobile;
    window.addEventListener("resize", resizeListener);

    // Intersection Observer
    const thresholdValue = isMobile
      ? Array.isArray(threshold)
        ? threshold.map((t) => Math.max(t * 0.3, 0.1))
        : Math.max(0.3, 0.1)
      : threshold;

    observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;

        // Handle triggerOnce logic manually
        if (triggerOnce && hasTriggered && !isIntersecting) {
          return; // Don't update if we've already triggered once and it's going out of view
        }

        if (isIntersecting && triggerOnce && !hasTriggered) {
          hasTriggered = true;
          setInView(true);
          // Disconnect observer if triggerOnce is true
          if (observer) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setInView(isIntersecting);
        }
      },
      {
        threshold: thresholdValue,
        rootMargin: isMobile ? "20px" : "50px",
      }
    );

    if (inViewRef.current) {
      observer.observe(inViewRef.current);
    }

    // Typewriter effect
    const text = typeof children === "string" ? children : "";
    if (animation.type === "typewriter" && inView && text) {
      const typeText = () => {
        if (isDeleting) {
          setDisplayText(text.substring(0, currentIndex - 1));
          currentIndex--;
          if (currentIndex === 0) {
            isDeleting = false;
            typewriterTimeout = setTimeout(typeText, typewriter.speed || 50);
          } else {
            typewriterTimeout = setTimeout(
              typeText,
              typewriter.deleteSpeed || 30
            );
          }
        } else {
          setDisplayText(text.substring(0, currentIndex + 1));
          currentIndex++;
          if (currentIndex === text.length) {
            if (typewriter.loop) {
              typewriterTimeout = setTimeout(() => {
                isDeleting = true;
                typeText();
              }, typewriter.deleteDelay || 2000);
            } else {
              setShowCursor(false);
            }
          } else {
            typewriterTimeout = setTimeout(typeText, typewriter.speed || 50);
          }
        }
      };

      setDisplayText("");
      setShowCursor(typewriter.cursor || false);
      const startDelay = (animation.delay || 0) * 1000;
      typewriterTimeout = setTimeout(() => {
        typeText();
      }, startDelay);
    }

    //   cursor blink effect
    if (animation.type === "typewriter" && (typewriter.cursor || false)) {
      cursorInterval = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, 530);
    }

    // Cleanup function
    return () => {
      if (resizeListener) {
        window.removeEventListener("resize", resizeListener);
      }
      if (observer) {
        observer.disconnect();
      }
      if (typewriterTimeout) {
        clearTimeout(typewriterTimeout);
      }
      if (cursorInterval) {
        clearTimeout(cursorInterval);
      }
    };
  }, [
    animation.delay,
    animation.type,
    children,
    inView,
    isMobile,
    mobile.breakPoint,
    threshold,
    triggerOnce,
    typewriter.cursor,
    typewriter.deleteDelay,
    typewriter.deleteSpeed,
    typewriter.loop,
    typewriter.speed,
    typewriter.cursorChar,
  ]);

  const text = typeof children === "string" ? children : "";
  const splitText = (text: string) => {
    if (splitBy === "word") {
      return text.split(/(\s+)/).filter(Boolean);
    } else if (splitBy === "line") {
      return text.split("\n");
    } else {
      return text.split("");
    }
  };

  const getAnimationVariants = (): {
    initial: any;
    animate: any;
    transition?: Transition;
  } => {
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
      if (animation.stagger && animation.stagger > 0) {
        transition.staggerChildren = animation.stagger;
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
      type = "fadeIn",
      duration = 0.8,
      delay = 0,
      ease = "easeOut",
      stagger = 0.05,
    } = currentAnimation;

    const variants = {
      fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      },
      slideUp: {
        initial: { opacity: 0, y: isMobile ? 20 : 30 },
        animate: { opacity: 1, y: 0 },
      },
      slideDown: {
        initial: { opacity: 0, y: isMobile ? -20 : -30 },
        animate: { opacity: 1, y: 0 },
      },
      slideLeft: {
        initial: { opacity: 0, x: isMobile ? 20 : 30 },
        animate: { opacity: 1, x: 0 },
      },
      slideRight: {
        initial: { opacity: 0, x: isMobile ? -20 : -30 },
        animate: { opacity: 1, x: 0 },
      },
      scale: {
        initial: { opacity: 0, scale: isMobile ? 0.95 : 0.9 },
        animate: { opacity: 1, scale: 1 },
      },
      blur: {
        initial: { opacity: 0, filter: "blur(10px)" },
        animate: { opacity: 1, filter: "blur(0px)" },
      },
      wave: {
        initial: { opacity: 0, y: isMobile ? 10 : 20, rotateX: -90 },
        animate: { opacity: 1, y: 0, rotateX: 0 },
      },
      typewriter: {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
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

    if (stagger > 0 && type !== "typewriter") {
      baseTransition.staggerChildren = stagger;
    }

    return {
      initial: variants[type].initial,
      animate: variants[type].animate,
      transition: baseTransition,
    };
  };
  const shouldAnimate =
    !prefersReducedMotion &&
    !(isMobile && mobile.disableAnimations) &&
    animation.type !== "none";

  const animationVariants = getAnimationVariants();

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

  const childVariants: Variants = {
    initial: animationVariants.initial,
    animate: animationVariants.animate,
  };

  // Handle typewriter effect
  if (animation.type === "typewriter") {
    return (
      <m.div
        ref={inViewRef}
        className={getEnhancedClassName()}
        initial={shouldAnimate ? { opacity: 0 } : false}
        animate={shouldAnimate && inView ? { opacity: 1 } : false}
        transition={
          shouldAnimate ? { duration: 0.3, delay: animation.delay } : undefined
        }
      >
        {displayText}
        {typewriter.cursor && (
          <span
            className={`inline-block ${
              showCursor ? "opacity-100" : "opacity-0"
            }`}
            style={{
              animation: typewriter.cursor ? "animate-blink" : "none",
            }}
          >
            {typewriter.cursorChar || "|"}
          </span>
        )}
      </m.div>
    );
  }

  // Handle non-string children (React nodes)
  if (typeof children !== "string") {
    return (
      <m.div
        ref={inViewRef}
        className={getEnhancedClassName()}
        initial={shouldAnimate ? animationVariants.initial : false}
        animate={
          shouldAnimate
            ? inView
              ? animationVariants.animate
              : animationVariants.initial
            : false
        }
        transition={shouldAnimate ? animationVariants.transition : undefined}
      >
        {children}
      </m.div>
    );
  }

  // Handle split text animations
  const textParts = splitText(text);
  return (
    <m.div
      ref={inViewRef}
      className={getEnhancedClassName()}
      initial={shouldAnimate ? "initial" : false}
      animate={shouldAnimate ? (inView ? "animate" : "initial") : false}
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: animation.stagger || 0.05,
            delayChildren: animation.delay || 0,
          },
        },
      }}
    >
      {textParts.map((part, index) => (
        <m.span
          key={index}
          variants={shouldAnimate ? childVariants : undefined}
          className={
            splitBy === "word" || splitBy === "line"
              ? "inline-block"
              : preserveWhitespace && part === " "
              ? "inline-block w-[0.25em]"
              : "inline-block"
          }
          style={{
            whiteSpace:
              splitBy === "line"
                ? "pre"
                : preserveWhitespace
                ? "pre"
                : "normal",
          }}
        >
          {part}
        </m.span>
      ))}
    </m.div>
  );
};

export default MotionText;
