"use client";

import { useEffect, useRef } from "react";

type MouseTrackerProps = {
  children: React.ReactNode;
  className?: string;
  factor?: number; // Strength of parallax
};

export const MouseTracker = ({
  children,
  className,
  factor = 0.02,
}: MouseTrackerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;

      const x = (e.clientX / window.innerWidth) * 100 - 50;
      const y = (e.clientY / window.innerHeight) * 100 - 50;

      el.style.transform = `translate3d(${x * factor * 100}px, ${
        y * factor * 60
      }px, 0)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [factor]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        willChange: "transform",
        transition: "transform 0.1s ease-out",
      }}
    >
      {children}
    </div>
  );
};

export default MouseTracker;
