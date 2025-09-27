"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08, // Slightly smoother
      duration: 1.2, //  scroll duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      smoothWheel: true,
      wheelMultiplier: 1, // Control scroll sensitivity
      touchMultiplier: 2, // Better mobile experience
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
