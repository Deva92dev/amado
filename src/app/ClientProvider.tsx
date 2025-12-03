"use client";

import ClerkClientProvider from "./ClerkProvider";
import { LenisProvider } from "./LenisProvider";
import { MotionProvider } from "./MotionProvider";
import Providers from "./providers";
import QueryProvider from "./QueryProvider";

interface GlobalWrapperProps {
  children: React.ReactNode;
}

export default function GlobalWrapper({ children }: GlobalWrapperProps) {
  return (
    <ClerkClientProvider>
      <QueryProvider>
        <Providers>
          <LenisProvider>
            <MotionProvider>{children}</MotionProvider>
          </LenisProvider>
        </Providers>
      </QueryProvider>
    </ClerkClientProvider>
  );
}
