"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const MouseTracker = dynamic(() => import("./HeroClient"), {
  ssr: false,
  loading: () => null,
});

export default function HeroEnhancements() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      {/* Parallax shapes only on desktop */}
      <MouseTracker
        factor={0.04}
        className="absolute inset-0 z-10 pointer-events-none hidden md:block"
      >
        <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-[hsl(215_100%_40%)]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[20%] left-[10%] w-48 h-48 bg-[hsl(152_61%_30%)]/20 rounded-full blur-3xl animate-pulse delay-700" />
      </MouseTracker>
    </>
  );
}
