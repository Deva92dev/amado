export default function Loading() {
  return (
    <main className="bg-gradient-hero min-h-screen">
      {/* --- HERO (Top Banner) Skeleton --- */}
      <section className="relative flex flex-col items-start justify-center h-[360px] px-4 sm:px-10 md:px-16 pt-10 mb-10">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[hsl(var(--brand-accent),.08)] via-gray-50/50 to-gray-200/50 pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 max-w-lg">
          <div className="h-12 w-2/3 rounded-lg bg-muted animate-shimmer mb-3" />
          <div className="h-8 w-1/2 rounded bg-muted animate-shimmer mb-1" />
          <div className="h-5 w-1/2 rounded bg-muted animate-shimmer mb-6" />
          <div className="h-12 w-32 rounded bg-muted animate-shimmer" />
        </div>
      </section>

      {/* --- Featured Collections Section Skeleton --- */}
      <section className="container mx-auto px-4 sm:px-8 mb-14">
        <div className="h-7 w-72 rounded bg-muted animate-shimmer mb-4" />
        <div className="h-4 w-60 rounded bg-muted animate-shimmer mb-8" />
        {/* Collection cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden bg-card shadow">
              <div className="h-40 bg-muted animate-shimmer" />
              <div className="h-8 w-24 my-4 mx-6 rounded bg-muted animate-shimmer" />
            </div>
          ))}
        </div>
        {/* Explore Button */}
        <div className="mx-auto w-40 h-10 rounded bg-muted animate-shimmer" />
      </section>

      {/* --- Value Proposition Section Skeleton --- */}
      <section className="container mx-auto px-4 sm:px-8 mb-14 flex flex-col md:flex-row md:items-center md:gap-12">
        <div className="flex-1 mb-6 md:mb-0">
          <div className="h-8 w-3/4 rounded bg-muted animate-shimmer mb-2" />
          <div className="h-4 w-32 rounded bg-muted animate-shimmer mb-2" />
          <div className="h-4 w-1/2 rounded bg-muted animate-shimmer mb-2" />
          <div className="h-4 w-1/2 rounded bg-muted animate-shimmer mb-7" />
          {/* Stats */}
          <div className="flex gap-6 mt-2">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="h-10 w-20 rounded bg-muted animate-shimmer"
              />
            ))}
          </div>
        </div>
        <div className="flex-1 hidden md:block">
          <div className="h-48 rounded-xl bg-muted animate-shimmer" />
        </div>
      </section>

      {/* --- Trending Now Section Skeleton --- */}
      <section className="container mx-auto px-4 sm:px-8 mb-14">
        <div className="h-7 w-56 rounded bg-muted animate-shimmer mb-5" />
        <div className="flex gap-5 justify-center">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-60 flex-shrink-0 rounded-xl overflow-hidden shadow bg-card border border-border"
            >
              <div className="h-44 bg-muted animate-shimmer" />
              <div className="h-6 w-2/3 mx-auto mt-5 rounded bg-muted animate-shimmer" />
            </div>
          ))}
        </div>
      </section>

      {/* --- Community Style Grid Skeleton --- */}
      <section className="container mx-auto px-4 sm:px-8 mb-14">
        <div className="h-7 w-72 rounded bg-muted animate-shimmer mb-5 mx-auto" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-44 rounded-xl bg-muted animate-shimmer" />
          ))}
        </div>
      </section>

      {/* --- Newsletter Section Skeleton --- */}
      <section className="container mx-auto px-4 sm:px-8 mb-14 flex flex-col items-center">
        <div className="h-7 w-60 rounded bg-muted animate-shimmer mb-3" />
        <div className="h-4 w-1/2 rounded bg-muted animate-shimmer mb-5" />
        <div className="flex gap-3 justify-center">
          <div className="h-10 w-56 bg-muted animate-shimmer rounded" />
          <div className="h-10 w-28 bg-muted animate-shimmer rounded" />
        </div>
      </section>
    </main>
  );
}
