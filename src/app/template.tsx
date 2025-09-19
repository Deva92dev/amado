"use client";

import { m } from "motion/react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <m.div
      className="relative"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      {children}
    </m.div>
  );
}
