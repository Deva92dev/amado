"use client";

export default function FilterSheetSkeleton() {
  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="h-6 w-32 bg-gray-300 rounded shimmer"></div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto space-y-4">
        <div className="h-6 w-24 bg-gray-300 rounded shimmer"></div>
        <div className="h-48 bg-gray-300 rounded shimmer"></div>
        <div className="h-10 w-28 bg-gray-300 rounded shimmer"></div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="h-10 w-32 bg-gray-300 rounded shimmer"></div>
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
