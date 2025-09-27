"use client";

import { m, useInView } from "framer-motion";
import { useRef, Suspense } from "react";

type AnimatedSectionProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  delay?: number;
  //handle server vs client components
  hasAsyncData?: boolean;
};

export const AnimatedSection = ({
  children,
  fallback,
  className = "",
  delay = 0,
  hasAsyncData = true,
}: AnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: delay,
      }}
      className={className}
    >
      {hasAsyncData && fallback ? (
        <Suspense fallback={fallback}>{children}</Suspense>
      ) : (
        children
      )}
    </m.div>
  );
};
