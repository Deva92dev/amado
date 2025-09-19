import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ProductsGridSkeletonProps = {
  items?: number;
  withFeaturedEvery?: number;
};

export default function ProductsGridSkeleton({
  items = 8,
  withFeaturedEvery = 4,
}: ProductsGridSkeletonProps) {
  const placeholders = Array.from({ length: items });

  return (
    <div
      className="pt-12 grid gap-6 grid-cols-1 lg:grid-cols-2"
      data-products-grid
      aria-busy
      aria-live="polite"
    >
      {placeholders.map((_, index) => {
        const isFeatured = (index + 1) % withFeaturedEvery === 0;
        const animationDelay = `${index * 100}ms`;

        return (
          <article
            key={index}
            className="group relative flex flex-col animate-fade-in-up opacity-0 animation-fill-forwards"
            style={
              {
                animationDelay,
                animationDuration: "0.6s",
                "--tw-translate-y": "20px",
              } as React.CSSProperties
            }
          >
            <div className="flex flex-col flex-grow">
              <Card
                className={cn(
                  "bg-secondary text-secondary-foreground rounded-xl will-change-transform transition-all duration-500 ease-out",
                  "group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:-translate-y-2 group-hover:scale-[1.02]",
                  "group-hover:bg-accent group-hover:text-accent-foreground flex flex-col flex-grow overflow-hidden",
                  isFeatured && "ring-2 ring-primary/20 shadow-lg"
                )}
              >
                <CardContent className="p-0 flex h-full min-h-[420px] md:min-h-[520px] lg:min-h-[620px] flex-col relative">
                  {isFeatured && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                        {/* badge skeleton width approximation */}
                        <span className="inline-block h-3 w-12 rounded bg-primary-foreground/20" />
                      </span>
                    </div>
                  )}

                  <div className="relative w-full flex-1 overflow-hidden rounded-t-xl">
                    {/* overlays kept to preserve visual parity */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[4]" />

                    {/* image skeleton */}
                    <div className="rounded-t-xl w-full h-full bg-muted animate-pulse" />
                  </div>

                  <div className="p-6 flex flex-col gap-3 bg-gradient-to-b from-transparent via-background/50 to-background">
                    <div className="flex flex-row justify-between items-start">
                      <div className="flex flex-col gap-2 flex-1">
                        <div className="h-4 w-40 rounded bg-muted animate-pulse" />
                        <div className="h-3 w-24 rounded bg-muted/80 animate-pulse" />
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="h-4 w-16 rounded bg-muted animate-pulse" />
                        {isFeatured && (
                          <div className="h-3 w-12 rounded bg-muted/70 animate-pulse" />
                        )}
                      </div>
                    </div>

                    {/* colors skeleton */}
                    <div className="flex flex-row gap-2">
                      <span className="h-5 w-5 rounded-full bg-muted ring-2 ring-background animate-pulse" />
                      <span className="h-5 w-5 rounded-full bg-muted ring-2 ring-background animate-pulse" />
                      <span className="h-5 w-5 rounded-full bg-muted ring-2 ring-background animate-pulse" />
                      <span className="h-5 w-5 rounded-full bg-muted ring-2 ring-background animate-pulse" />
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-muted text-muted-foreground text-[10px] font-medium">
                        +2
                      </span>
                    </div>

                    {/* sizes skeleton */}
                    <div className="flex flex-wrap gap-1">
                      <span className="h-5 w-8 rounded bg-muted animate-pulse" />
                      <span className="h-5 w-8 rounded bg-muted animate-pulse" />
                      <span className="h-5 w-8 rounded bg-muted animate-pulse" />
                      <span className="h-5 w-8 rounded bg-muted animate-pulse" />
                      <span className="h-5 w-8 rounded bg-muted/70 animate-pulse" />
                    </div>

                    <div className="mt-auto" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </article>
        );
      })}
    </div>
  );
}
