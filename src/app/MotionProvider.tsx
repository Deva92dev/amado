"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import { PropsWithChildren } from "react";

// This component provides the animation context to its children
export const MotionProvider = ({ children }: PropsWithChildren) => {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
};
