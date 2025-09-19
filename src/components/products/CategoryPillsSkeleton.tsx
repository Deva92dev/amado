"use client";

export default function CategoryPillsSkeleton() {
  const pillCount = 4;

  return (
    <div className="flex justify-center gap-3 flex-wrap">
      {[...Array(pillCount)].map((_, i) => (
        <div
          key={i}
          className="h-8 rounded-full px-6 py-2 bg-gray-300 animate-pulse w-28"
        />
      ))}
    </div>
  );
}
