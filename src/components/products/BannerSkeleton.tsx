export default function BannerSkeleton() {
  return (
    <div
      className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden py-24 bg-gray-100"
      aria-hidden="true"
    >
      {/* Static background pulse */}
      <div className="absolute inset-0 bg-gray-200 animate-pulse" />

      {/* Content Wrapper */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8 flex flex-col items-center">
          {/* Static badges skeleton */}
          <div className="h-8 w-48 rounded-full bg-gray-300/80 animate-pulse" />

          {/* Hero content skeleton */}
          <div className="space-y-6 w-full flex flex-col items-center">
            {/* Title */}
            <div className="h-12 md:h-20 w-3/4 rounded-xl bg-gray-300 animate-pulse" />
            {/* Subtitle */}
            <div className="h-8 md:h-10 w-1/2 rounded-lg bg-gray-300/80 animate-pulse" />

            {/* Description lines */}
            <div className="space-y-2 w-full flex flex-col items-center pt-2">
              <div className="h-5 md:h-6 w-2/3 rounded bg-gray-300/60 animate-pulse" />
              <div className="h-5 md:h-6 w-1/2 rounded bg-gray-300/60 animate-pulse" />
            </div>
          </div>

          {/* Stats skeleton */}
          <div className="flex justify-center items-center gap-8 py-2">
            {/* Stat 1 */}
            <div className="flex flex-col items-center gap-1">
              <div className="h-8 w-16 rounded bg-gray-300 animate-pulse" />
              <div className="h-4 w-12 rounded bg-gray-300/60 animate-pulse" />
            </div>
            {/* Divider */}
            <div className="h-8 w-px bg-gray-300" />
            {/* Stat 2 */}
            <div className="flex flex-col items-center gap-1">
              <div className="h-8 w-8 rounded bg-gray-300 animate-pulse" />
              <div className="h-4 w-16 rounded bg-gray-300/60 animate-pulse" />
            </div>
            {/* Divider */}
            <div className="h-8 w-px bg-gray-300" />
            {/* Stat 3 */}
            <div className="flex flex-col items-center gap-1">
              <div className="h-8 w-10 rounded bg-gray-300 animate-pulse" />
              <div className="h-4 w-12 rounded bg-gray-300/60 animate-pulse" />
            </div>
          </div>

          {/* Category Pills skeleton */}
          <div className="flex gap-3 justify-center pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-10 w-24 rounded-full bg-gray-300/80 animate-pulse"
              />
            ))}
          </div>

          {/* Scroll Down skeleton */}
          <div className="pt-4">
            <div className="h-10 w-6 rounded-full bg-gray-300/50 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
