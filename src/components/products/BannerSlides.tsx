"use client";

import { useEffect, useState } from "react";

type Slide = {
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  accent: string;
};

export default function SlidesClient({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setCurrent((v) => (v + 1) % slides.length),
      5000
    );
    return () => clearInterval(t);
  }, [slides.length]);

  const s = slides[current];

  return (
    <>
      {/* Background gradient and shapes */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${s.gradient} transition-all duration-1000`}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000" />
          <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-500" />
        </div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 border border-white rotate-45 animate-spin-slow" />
          <div className="absolute bottom-20 right-10 w-24 h-24 border border-white rounded-full animate-bounce-slow" />
          <div className="absolute top-1/2 left-20 w-16 h-16 bg-white rounded-full animate-pulse" />
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label="Sliding Content Indicators"
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-white w-6" : "bg-white/50"
            }`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </>
  );
}

export function SlideText({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setCurrent((v) => (v + 1) % slides.length),
      5000
    );
    return () => clearInterval(t);
  }, [slides.length]);

  const s = slides[current];

  return (
    <div className="space-y-6">
      <h1 className="text-5xl md:text-7xl font-bold leading-tight">
        {s.title}
        <span className="block text-2xl md:text-3xl font-normal mt-2 opacity-90">
          {s.subtitle}
        </span>
      </h1>
      <p
        className={`text-lg md:text-xl ${s.accent} max-w-2xl mx-auto leading-relaxed`}
      >
        {s.description}
      </p>
    </div>
  );
}
