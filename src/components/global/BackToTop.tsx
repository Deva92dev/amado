"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { m, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / documentHeight) * 100;

      setScrollProgress(progress);
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-8 right-8 z-50"
        >
          <div className="relative">
            {/* Progress ring */}
            <svg className="absolute -inset-1 h-14 w-14 rotate-[-90deg]">
              <circle
                cx="28"
                cy="28"
                r="20"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-muted/20"
              />
              <circle
                cx="28"
                cy="28"
                r="20"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                className="text-primary"
                style={{
                  strokeDasharray: `${2 * Math.PI * 20}`,
                  strokeDashoffset: `${
                    2 * Math.PI * 20 * (1 - scrollProgress / 100)
                  }`,
                  transition: "stroke-dashoffset 0.1s ease-out",
                }}
              />
            </svg>
            <Button
              onClick={scrollToTop}
              className="relative h-12 w-12 rounded-full bg-primary/80 backdrop-blur-md border border-border/50 shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all duration-200 cursor-pointer group"
              aria-label="Back to top"
            >
              <ArrowUp className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
            </Button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
