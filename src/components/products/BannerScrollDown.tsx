"use client";

import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ScrollDownClient() {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-white hover:text-white hover:bg-white/20 animate-bounce mt-8"
      onClick={() => {
        const el = document.querySelector("[data-products-grid]");
        el?.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <ArrowDown className="w-5 h-5" aria-label="Arrow down button" />
    </Button>
  );
}
