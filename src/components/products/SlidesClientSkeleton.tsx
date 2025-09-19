export function SlidesClientSkeleton() {
  return (
    <div className="relative w-full h-[60vh]">
      {/* Background shimmer blocks */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-300 animate-pulse rounded-lg" />

      {/* Pulsing blurred circles placeholders */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse opacity-20" />
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse opacity-20" />
      <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse opacity-20" />

      {/* Slide indicator dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`rounded-full h-2 ${
              i === 0 ? "w-6" : "w-2"
            } bg-gray-400 animate-pulse`}
          />
        ))}
      </div>
    </div>
  );
}
