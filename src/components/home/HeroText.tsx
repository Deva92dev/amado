"use client";
import { useEffect, useState } from "react";

export const HeroText = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const heroTexts = [
    { main: "Redefine Your", accent: "Style" },
    { main: "Discover Your", accent: "Story" },
    { main: "Express Your", accent: "Vision" },
  ];

  useEffect(() => {
    setIsVisible(true);

    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % heroTexts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroTexts.length]);

  return (
    <h1
      className={`h1 text-foreground mb-6 leading-tight transform transition-all duration-700 delay-300 ${
        isVisible ? "animate-slideUpFromBottom" : "opacity-0"
      }`}
    >
      <span className="transition-all duration-500 ease-in-out">
        {heroTexts[textIndex].main}
      </span>
      <span
        className={`block text-transparent bg-clip-text animate-gradient-x bg-[length:200%_200%] transition-all duration-500 ease-in-out transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{
          backgroundImage: `linear-gradient(90deg, 
            hsl(var(--brand-accent)), 
            hsl(var(--sapphire)), 
            hsl(var(--emerald)), 
            hsl(var(--brand-accent)))`,
        }}
      >
        {heroTexts[textIndex].accent}
      </span>
    </h1>
  );
};
