export default function Loading() {
  return (
    <main className="bg-gradient-hero min-h-screen">
      {/* Banner Skeleton */}
      <section className="relative flex flex-col items-center justify-center w-full h-[280px] mb-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--brand-accent),.15)] via-yellow-50/40 to-yellow-100/80 pointer-events-none rounded-b-2xl" />
        <div className="relative flex flex-col items-center justify-center h-full z-10 w-full">
          <div className="h-12 w-2/3 max-w-md rounded-lg bg-muted animate-shimmer mb-6" />
          <div className="h-6 w-1/2 max-w-xs rounded bg-muted animate-shimmer mb-2" />
          <div className="h-5 w-1/3 max-w-xs rounded bg-muted animate-shimmer" />
          <div className="flex items-center gap-3 mt-8">
            {[...Array(6)].map((_, idx) => (
              <div
                key={idx}
                className="h-8 w-24 rounded-full bg-muted animate-shimmer"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Filter bar skeleton */}
      <div className="mb-8 flex items-center justify-between gap-4 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-10 w-40 rounded-md bg-muted animate-shimmer" />
        <div className="h-10 w-28 rounded-md bg-muted animate-shimmer" />
      </div>

      {/* Product grid skeleton */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="rounded-xl shadow-md overflow-hidden bg-card border border-border flex flex-col min-h-[340px]"
            >
              {/* Image */}
              <div className="h-48 w-full bg-muted animate-shimmer rounded-t-xl" />

              {/* Content */}
              <div className="flex flex-col gap-1 px-5 py-4 flex-grow">
                <div className="h-6 w-3/5 bg-muted animate-shimmer rounded mb-2" />
                <div className="h-4 w-1/3 bg-muted animate-shimmer rounded mb-3" />
                <div className="flex gap-2 mb-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-4 w-4 rounded-full bg-muted animate-shimmer"
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-6 w-10 rounded bg-muted animate-shimmer"
                    />
                  ))}
                </div>
                <div className="h-5 w-16 bg-muted animate-shimmer rounded mt-auto" />
              </div>
            </div>
          ))}
        </div>
        {/* Load More button */}
        <div className="flex justify-center mt-10">
          <div className="h-10 w-36 rounded-lg bg-muted animate-shimmer" />
        </div>
      </div>
    </main>
  );
}
