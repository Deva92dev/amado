"use client";

import { useEffect, useState, useTransition } from "react";

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      startTransition(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100 - 50, // center at 0
          y: (e.clientY / window.innerHeight) * 100 - 50,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return { mousePosition, isLoaded, isPending };
};

type MouseTrackerProps = {
  children: React.ReactNode;
  className?: string;
  factor?: number; // strength of parallax (default 0.02)
};

export const MouseTracker = ({
  children,
  className,
  factor = 0.02,
}: MouseTrackerProps) => {
  const { mousePosition, isLoaded, isPending } = useMousePosition();

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  // Don't render parallax on mobile
  if (!isLoaded || isMobile) {
    return <section className={className}>{children}</section>;
  }

  return (
    <section
      className={className}
      style={{
        transform: `translate(${mousePosition.x * factor * 100}px, ${
          mousePosition.y * factor * 60
        }px)`,
        transition: isPending ? "none" : "transform 0.25s ease-out",
        willChange: "transform",
      }}
    >
      {children}
    </section>
  );
};
