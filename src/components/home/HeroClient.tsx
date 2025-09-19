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
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
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
};

export const MouseTracker = ({ children, className }: MouseTrackerProps) => {
  const { mousePosition, isLoaded, isPending } = useMousePosition();

  // Don't render until loaded to prevent hydration mismatch
  if (!isLoaded) {
    return <section className={className}>{children}</section>;
  }

  return (
    <section
      className={className}
      style={{
        transform: `translate(${mousePosition.x * 0.08}px, ${
          mousePosition.y * 0.08
        }px)`,
        transition: isPending ? "none" : "transform 0.2s ease-out",
        willChange: "transform",
      }}
    >
      {children}
    </section>
  );
};
