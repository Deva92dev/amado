import { Suspense } from "react";

type AnimatedSectionProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  delay?: number;
  // handle server vs client components
  hasAsyncData?: boolean;
};

// Server-rendered section wrapper. Content is always visible; the optional
// Suspense boundary only applies during streaming/loading, never hides content.
export const AnimatedSection = ({
  children,
  fallback,
  className = "",
  delay = 0,
  hasAsyncData = true,
}: AnimatedSectionProps) => {
  return (
    <div className={className} style={{ opacity: 1 }}>
      {hasAsyncData && fallback ? (
        <Suspense fallback={fallback}>{children}</Suspense>
      ) : (
        children
      )}
    </div>
  );
};
