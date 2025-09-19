"use client";
import {
  m,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { ReactNode, useRef, useState, useEffect, CSSProperties } from "react";
import Image from "next/image";

// come handy soon, don't delete
interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  // Parallax settings
  parallax?: {
    speed?: number;
    direction?:
      | "up"
      | "down"
      | "left"
      | "right"
      | "diagonal-up"
      | "diagonal-down";
    intensity?: "subtle" | "medium" | "strong" | "extreme";
    range?: [number, number];
    offset?: [string, string];
    scale?: boolean;
    scaleRange?: [number, number];
    rotate?: boolean;
    rotateRange?: [number, number];
  };

  // Image effects
  effects?: {
    blur?: boolean;
    blurRange?: [number, number];
    brightness?: boolean;
    brightnessRange?: [number, number];
    opacity?: boolean;
    opacityRange?: [number, number];
    saturate?: boolean;
    saturateRange?: [number, number];
    contrast?: boolean;
    contrastRange?: [number, number];
    hueRotate?: boolean;
    hueRotateRange?: [number, number];
  };

  // Loading and optimization
  loading?: {
    priority?: boolean;
    placeholder?: "blur" | "empty" | "data:image/...";
    blurDataURL?: string;
    quality?: number;
    fadeIn?: boolean;
    fadeInDuration?: number;
    unoptimized?: boolean;
    fill?: boolean;
  };

  // Responsive behavior
  responsive?: {
    breakpoints?: {
      mobile?: number;
      tablet?: number;
      desktop?: number;
    };
    sizes?: string;
    aspectRatio?: "16/9" | "4/3" | "1/1" | "3/2" | "21/9" | string;
    objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
    objectPosition?: string;
  };

  // Advanced effects
  advanced?: {
    mouseParallax?: boolean;
    mouseIntensity?: number;
    tilt?: boolean;
    tiltIntensity?: number;
    magneticEffect?: boolean;
    magneticStrength?: number;
    ken_burns?: boolean;
    kenBurnsDuration?: number;
    kenBurnsDirection?: "zoom-in" | "zoom-out" | "pan-left" | "pan-right";
  };

  // Overlay and content
  overlay?: {
    enabled?: boolean;
    color?: string;
    opacity?: number;
    gradient?: string;
    blendMode?: "normal" | "multiply" | "overlay" | "soft-light" | "hard-light";
    content?: ReactNode;
    parallaxContent?: boolean;
  };

  // Performance and mobile
  mobile?: {
    disableParallax?: boolean;
    disableEffects?: boolean;
    reducedMotion?: boolean;
    fallbackImage?: string;
    breakPoint?: number;
  };

  performance?: {
    lazy?: boolean;
    preload?: boolean;
    willChange?: boolean;
    gpuAcceleration?: boolean;
    throttle?: number;
    priority?: boolean;
    sizes?: string;
  };

  // Events
  onLoad?: () => void;
  onError?: () => void;
  onClick?: () => void;
}

const ParallaxImage = ({
  src,
  alt,
  className = "",
  containerClassName = "",
  parallax = {
    speed: 50,
    direction: "up",
    intensity: "medium",
    scale: false,
    rotate: false,
  },
  effects = {},
  loading = {
    priority: false,
    fadeIn: true,
    fadeInDuration: 0.8,
    quality: 75,
    fill: false,
  },
  responsive = {
    aspectRatio: "16/9",
    objectFit: "cover",
    objectPosition: "center",
  },
  advanced = {
    mouseParallax: false,
    tilt: false,
    magneticEffect: false,
    ken_burns: false,
  },
  overlay = {
    enabled: false,
  },
  mobile = {
    disableParallax: true,
    disableEffects: false,
    reducedMotion: true,
    breakPoint: 768,
  },
  performance = {
    lazy: true,
    willChange: true,
    gpuAcceleration: true,
    throttle: 16,
    priority: false,
  },
  onLoad,
  onError,
  onClick,
}: ParallaxImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Scroll parallax setup
  const offsetValue = parallax.offset || ["start end", "end start"];
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offsetValue as any,
  });

  // Get intensity multiplier
  const getIntensityMultiplier = () => {
    const multipliers = {
      subtle: 0.5,
      medium: 1,
      strong: 1.5,
      extreme: 2.5,
    };
    return multipliers[parallax.intensity || "medium"];
  };

  // Calculate transform values
  const speed = (parallax.speed || 50) * getIntensityMultiplier();
  const range = parallax.range || [0, 1];
  const scaleRange = parallax.scaleRange || [1, 1.2];
  const rotateRange = parallax.rotateRange || [0, 10];

  // ALL useTransform hooks at top level - Parallax transforms
  const yUp = useTransform(scrollYProgress, range, [0, -speed]);
  const yDown = useTransform(scrollYProgress, range, [0, speed]);
  const xLeft = useTransform(scrollYProgress, range, [0, -speed]);
  const xRight = useTransform(scrollYProgress, range, [0, speed]);
  const xDiagonalUp = useTransform(scrollYProgress, range, [0, -speed * 0.5]);
  const yDiagonalUp = useTransform(scrollYProgress, range, [0, -speed]);
  const xDiagonalDown = useTransform(scrollYProgress, range, [0, speed * 0.5]);
  const yDiagonalDown = useTransform(scrollYProgress, range, [0, speed]);
  const scaleTransform = useTransform(scrollYProgress, range, scaleRange);
  const rotateTransform = useTransform(scrollYProgress, range, rotateRange);

  // Effect transforms
  const blurRange = effects.blurRange || [0, 5];
  const brightnessRange = effects.brightnessRange || [1, 0.7];
  const saturateRange = effects.saturateRange || [1, 0.5];
  const contrastRange = effects.contrastRange || [1, 1.3];
  const hueRotateRange = effects.hueRotateRange || [0, 180];
  const opacityRange = effects.opacityRange || [1, 0.3];

  const blurValue = useTransform(scrollYProgress, range, blurRange);
  const brightnessValue = useTransform(scrollYProgress, range, brightnessRange);
  const saturateValue = useTransform(scrollYProgress, range, saturateRange);
  const contrastValue = useTransform(scrollYProgress, range, contrastRange);
  const hueRotateValue = useTransform(scrollYProgress, range, hueRotateRange);
  const opacityValue = useTransform(scrollYProgress, range, opacityRange);

  // Combined filter transform
  const filterTransform = useTransform(
    [blurValue, brightnessValue, saturateValue, contrastValue, hueRotateValue],
    ([blur, brightness, saturate, contrast, hueRotate]) => {
      const parts: string[] = [];
      if (effects.blur) parts.push(`blur(${blur}px)`);
      if (effects.brightness) parts.push(`brightness(${brightness})`);
      if (effects.saturate) parts.push(`saturate(${saturate})`);
      if (effects.contrast) parts.push(`contrast(${contrast})`);
      if (effects.hueRotate) parts.push(`hue-rotate(${hueRotate}deg)`);
      return parts.join(" ");
    }
  );

  // Mouse transforms
  const mouseIntensity = advanced.mouseIntensity || 20;
  const tiltIntensity = advanced.tiltIntensity || 10;
  const magneticStrength = advanced.magneticStrength || 0.3;

  const mouseXTransform = useTransform(
    mouseXSpring,
    [-1, 1],
    [-mouseIntensity, mouseIntensity]
  );
  const mouseYTransform = useTransform(
    mouseYSpring,
    [-1, 1],
    [-mouseIntensity, mouseIntensity]
  );
  const tiltXTransform = useTransform(
    mouseYSpring,
    [-1, 1],
    [tiltIntensity, -tiltIntensity]
  );
  const tiltYTransform = useTransform(
    mouseXSpring,
    [-1, 1],
    [-tiltIntensity, tiltIntensity]
  );
  const magneticScale = useTransform(
    [mouseXSpring, mouseYSpring],
    ([x, y]: number[]) => 1 + Math.abs(x * y) * magneticStrength
  );

  // Consolidated useEffect for all functionality
  useEffect(() => {
    let resizeCleanup: (() => void) | null = null;
    let mouseCleanup: (() => void) | null = null;

    // Mobile detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth < (mobile.breakPoint || 768));
    };

    // Initialize mobile check
    checkMobile();

    // Set up resize listener
    const handleResize = () => {
      checkMobile();
    };
    window.addEventListener("resize", handleResize);
    resizeCleanup = () => window.removeEventListener("resize", handleResize);

    // Mouse tracking setup
    if (
      (advanced.mouseParallax || advanced.tilt || advanced.magneticEffect) &&
      !isMobile &&
      !prefersReducedMotion &&
      containerRef.current
    ) {
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const x = (e.clientX - centerX) / (rect.width / 2);
        const y = (e.clientY - centerY) / (rect.height / 2);

        setMousePosition({ x, y });
        mouseX.set(x);
        mouseY.set(y);
      };

      const handleMouseLeave = () => {
        setMousePosition({ x: 0, y: 0 });
        mouseX.set(0);
        mouseY.set(0);
      };

      const container = containerRef.current;
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);

      mouseCleanup = () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    // Cleanup function
    return () => {
      resizeCleanup?.();
      mouseCleanup?.();
    };
  }, [
    advanced.mouseParallax,
    advanced.tilt,
    advanced.magneticEffect,
    isMobile,
    prefersReducedMotion,
    mouseX,
    mouseY,
    mobile.breakPoint,
  ]);

  // Get parallax transforms based on direction
  const getParallaxTransforms = () => {
    const shouldDisable =
      (isMobile && mobile.disableParallax) ||
      (prefersReducedMotion && mobile.reducedMotion) ||
      parallax.speed === 0;

    if (shouldDisable) {
      return {
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
      };
    }

    const transforms: any = {};

    // Movement transforms based on direction
    switch (parallax.direction) {
      case "up":
        transforms.y = yUp;
        break;
      case "down":
        transforms.y = yDown;
        break;
      case "left":
        transforms.x = xLeft;
        break;
      case "right":
        transforms.x = xRight;
        break;
      case "diagonal-up":
        transforms.x = xDiagonalUp;
        transforms.y = yDiagonalUp;
        break;
      case "diagonal-down":
        transforms.x = xDiagonalDown;
        transforms.y = yDiagonalDown;
        break;
      default:
        transforms.y = yUp;
    }

    // Scale transform
    if (parallax.scale) {
      transforms.scale = scaleTransform;
    }

    // Rotation transform
    if (parallax.rotate) {
      transforms.rotate = rotateTransform;
    }

    return transforms;
  };

  // Get effect transforms
  const getEffectTransforms = () => {
    const shouldDisable =
      (isMobile && mobile.disableEffects) ||
      (prefersReducedMotion && mobile.reducedMotion);

    if (shouldDisable) {
      return {};
    }

    const transforms: any = {};

    // Use the pre-created filter transform
    const hasFilters =
      effects.blur ||
      effects.brightness ||
      effects.saturate ||
      effects.contrast ||
      effects.hueRotate;
    if (hasFilters) {
      transforms.filter = filterTransform;
    }

    if (effects.opacity) {
      transforms.opacity = opacityValue;
    }

    return transforms;
  };

  // Get mouse transforms
  const getMouseTransforms = () => {
    if (isMobile || prefersReducedMotion) return {};

    const transforms: any = {};

    if (advanced.mouseParallax) {
      transforms.x = mouseXTransform;
      transforms.y = mouseYTransform;
    }

    if (advanced.tilt) {
      transforms.rotateX = tiltXTransform;
      transforms.rotateY = tiltYTransform;
    }

    if (advanced.magneticEffect) {
      transforms.scale = magneticScale;
    }

    return transforms;
  };

  // Combine all transforms
  const parallaxTransforms = getParallaxTransforms();
  const effectTransforms = getEffectTransforms();
  const mouseTransforms = getMouseTransforms();

  // Handle image load
  const handleImageLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleImageError = () => {
    setIsError(true);
    onError?.();
  };

  // Generate styles
  const getContainerStyle = (): CSSProperties => {
    const style: CSSProperties = {
      position: "relative",
      overflow: "hidden",
    };

    // Aspect ratio
    if (responsive.aspectRatio) {
      style.aspectRatio = responsive.aspectRatio;
    }

    // Performance optimizations
    if (performance.willChange && !isMobile) {
      style.willChange = "transform";
    }

    return style;
  };

  const getImageStyle = (): CSSProperties => {
    const style: CSSProperties = {};

    // Only set dimensions if not using fill
    if (!loading.fill) {
      style.width = "100%";
      style.height = "100%";
      style.objectFit = responsive.objectFit || "cover";
      style.objectPosition = responsive.objectPosition || "center";
    }

    return style;
  };

  // Ken Burns animation class
  const getKenBurnsClass = () => {
    if (!advanced.ken_burns || isMobile || prefersReducedMotion) return "";

    const direction = advanced.kenBurnsDirection || "zoom-in";

    // Using your custom CSS animations
    switch (direction) {
      case "zoom-in":
        return "animate-pulse"; // Using existing animation as example
      case "zoom-out":
        return "animate-pulse";
      case "pan-left":
        return "animate-slideInFromLeft";
      case "pan-right":
        return "animate-slideInFromLeftSlow";
      default:
        return "";
    }
  };

  // Generate class names
  const getContainerClassName = () => {
    let classes = `relative overflow-hidden ${containerClassName}`;

    if (onClick) {
      classes += " cursor-pointer";
    }

    if (performance.gpuAcceleration && !isMobile) {
      classes += " motion-safe:transform-gpu";
    }

    if (prefersReducedMotion) {
      classes += " motion-reduce:transform-none";
    }

    return classes.trim();
  };

  const getImageClassName = () => {
    let classes = `block ${className}`;

    // Only add sizing classes if not using fill
    if (!loading.fill) {
      classes += " w-full h-full";
    }

    // Fade in animation using your CSS
    if (loading.fadeIn && isLoaded) {
      classes += " animate-slideUpFromBottom opacity-100";
    } else if (loading.fadeIn) {
      classes += " opacity-0";
    }

    // Ken Burns effect
    const kenBurnsClass = getKenBurnsClass();
    if (kenBurnsClass) {
      classes += ` ${kenBurnsClass}`;
    }

    return classes.trim();
  };

  // Combine motion styles
  const getMotionStyle = () => {
    return {
      ...parallaxTransforms,
      ...mouseTransforms,
      transformOrigin: "center",
      transformStyle: "preserve-3d" as const,
    };
  };

  const imageSrc =
    isMobile && mobile.fallbackImage ? mobile.fallbackImage : src;

  return (
    <m.div
      ref={containerRef}
      className={getContainerClassName()}
      style={getContainerStyle()}
      onClick={onClick}
    >
      {/* Placeholder while loading */}
      {!isLoaded && loading.placeholder && loading.placeholder !== "empty" && (
        <div
          className="absolute inset-0 bg-muted animate-pulse"
          style={{
            backgroundImage: loading.blurDataURL
              ? `url(${loading.blurDataURL})`
              : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: loading.blurDataURL ? "blur(10px)" : undefined,
          }}
        />
      )}

      {/* Main image with parallax */}
      <m.div
        ref={imageRef as any}
        className={getImageClassName()}
        style={{
          ...getImageStyle(),
          ...getMotionStyle(),
          ...effectTransforms,
        }}
      >
        <Image
          src={imageSrc}
          alt={alt}
          fill={loading.fill}
          width={loading.fill ? undefined : 1200}
          height={loading.fill ? undefined : 800}
          priority={loading.priority || performance.priority}
          quality={loading.quality || 75}
          placeholder={loading.placeholder || "empty"}
          blurDataURL={loading.blurDataURL}
          sizes={
            responsive.sizes ||
            performance.sizes ||
            "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          }
          unoptimized={loading.unoptimized}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{
            objectFit: loading.fill
              ? responsive.objectFit || "cover"
              : undefined,
            objectPosition: loading.fill
              ? responsive.objectPosition || "center"
              : undefined,
          }}
        />
      </m.div>

      {/* Overlay */}
      {overlay.enabled && (
        <m.div
          className="absolute inset-0"
          style={{
            backgroundColor: overlay.color,
            opacity: overlay.opacity || 0.3,
            background: overlay.gradient,
            mixBlendMode: overlay.blendMode || "normal",
            ...(overlay.parallaxContent ? getMotionStyle() : {}),
          }}
        >
          {overlay.content}
        </m.div>
      )}

      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center animate-slideUpFromBottom">
          <div className="text-muted-foreground text-center">
            <div className="text-2xl mb-2">⚠️</div>
            <div>Failed to load image</div>
          </div>
        </div>
      )}
    </m.div>
  );
};

export default ParallaxImage;
