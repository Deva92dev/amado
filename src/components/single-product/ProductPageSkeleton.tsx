import { cn } from "@/lib/utils";

const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse bg-muted/60 rounded-md", className)} />
);

export default function ProductPageSkeleton() {
  return (
    <div className="w-full">
      {/* Breadcrumbs Placeholder */}
      <Skeleton className="h-6 w-48 mb-6" />

      <div
        className="
          mt-6 grid grid-cols-1 gap-y-8
          lg:grid-cols-2 lg:gap-x-16 lg:items-start
        "
      >
        <div className="h-[600px] w-full flex flex-col lg:flex-row gap-4">
          {/* Main Image Viewer */}
          <div className="relative flex-1 h-[400px] lg:h-full w-full rounded-xl bg-muted animate-pulse overflow-hidden">
            <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-background/50" />
          </div>

          {/* Thumbnails (Desktop: Vertical Strip, Mobile: Horizontal) */}
          <div className="hidden lg:flex lg:flex-col gap-2 w-36 h-full shrink-0">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="relative flex-1 w-full rounded-md bg-muted animate-pulse"
              />
            ))}
          </div>

          {/* Mobile Thumbnails Row */}
          <div className="flex lg:hidden gap-2 h-20 w-full overflow-hidden">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="aspect-square h-full rounded-md bg-muted animate-pulse"
              />
            ))}
          </div>
        </div>
        <section className="relative p-6 rounded-2xl border border-border/50 bg-background/50 shadow-sm h-[600px] flex flex-col">
          {/* Header: Title & Ratings */}
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-3 flex-1">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>

          {/* Price Pill */}
          <div className="mt-6 mb-4">
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>

          {/* Type Badge */}
          <Skeleton className="h-6 w-16 rounded-md mb-6" />

          {/* Category Line */}
          <div className="flex gap-3 mb-6">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-32" />
          </div>

          {/* Description Block */}
          <div className="space-y-3 mb-8 flex-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>

          {/* Product Selections (Colors/Sizes) */}
          <div className="space-y-6 mt-auto">
            {/* Colors */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <div className="flex gap-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-10 w-10 rounded-full" />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <div className="flex gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-10 w-16 rounded-md" />
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <Skeleton className="h-12 w-full rounded-xl mt-4" />
          </div>
        </section>

        <div className="col-span-1 lg:col-span-2 mt-12 space-y-8">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Review Cards List */}
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-border/40 space-y-4"
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 space-y-6">
        <Skeleton className="h-8 w-64" />
        {/* Carousel Placeholder */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[3/4] w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
