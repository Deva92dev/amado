"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const BackToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      className="absolute top-10 right-10 h-12 w-12 rounded-full bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer"
      aria-label="Back to top"
    >
      <ArrowUp className="h-6 w-6" />
    </Button>
  );
};

export default BackToTopButton;
