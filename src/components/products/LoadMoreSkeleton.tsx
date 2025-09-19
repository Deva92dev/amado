"use client";

export default function LoadMoreSkeleton() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-48 bg-gray-300 rounded shimmer" />
        ))}
      </div>
      <div className="mt-8 flex items-center justify-center">
        <div className="h-12 w-36 bg-gray-300 rounded shimmer" />
      </div>

      <style jsx>{`
        .shimmer {
          position: relative;
          overflow: hidden;
          background: #e0e0e0;
        }
        .shimmer::before {
          content: "";
          position: absolute;
          top: 0;
          left: -150%;
          height: 100%;
          width: 150%;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255, 255, 255, 0.5) 50%,
            transparent 100%
          );
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0% {
            left: -150%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
}
