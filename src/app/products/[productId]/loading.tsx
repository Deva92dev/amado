export default function Loading() {
  return (
    <section className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-gradient-hero min-h-screen">
      {/* ----- Breadcrumbs Skeleton ----- */}
      <div className="h-5 w-32 rounded-md mb-3 bg-muted animate-shimmer" />
      <div
        className="
          mt-6 grid grid-cols-1 gap-y-8
          lg:grid-cols-2 lg:gap-x-16 lg:items-start
        "
        style={{ ["--equal-h" as any]: "600px" }}
        data-equal-cols-root
      >
        {/* ---------- Gallery Section Skeleton ---------- */}
        <div className="md:mb-0 lg:[height:var(--equal-h)]">
          <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-muted animate-shimmer" />
          {/* Thumbnails */}
          <div className="flex flex-col gap-3 mt-3">
            {[...Array(5)].map((_, idx) => (
              <div
                key={idx}
                className="h-14 w-14 rounded-md bg-muted animate-shimmer"
              />
            ))}
          </div>
        </div>
        {/* ---------- Product Info Skeleton ---------- */}
        <div className="card-gradient-glass rounded-xl p-8 flex flex-col gap-4 min-h-[300px]">
          <div className="h-7 w-3/4 rounded bg-muted animate-shimmer" />{" "}
          {/* title */}
          <div className="h-4 w-1/3 rounded bg-muted animate-shimmer" />{" "}
          {/* reviews */}
          <div className="h-9 w-24 rounded bg-muted animate-shimmer" />{" "}
          {/* price */}
          <div className="h-5 w-14 rounded bg-muted animate-shimmer" />{" "}
          {/* tag/button */}
          {/* description */}
          <div className="h-4 w-5/6 rounded bg-muted animate-shimmer" />
          <div className="h-4 w-2/3 rounded bg-muted animate-shimmer" />
          {/* Color pills */}
          <div className="flex gap-2 my-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-6 w-6 rounded-full bg-muted animate-shimmer"
              />
            ))}
          </div>
          {/* Sizes pills */}
          <div className="flex gap-2 mb-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-7 w-10 rounded bg-muted animate-shimmer"
              />
            ))}
          </div>
          {/* Amount/Cart box */}
          <div className="bg-gradient-glass p-4 rounded-xl shadow mt-3 w-48">
            <div className="h-8 w-20 bg-muted animate-shimmer mb-2 rounded" />
            <div className="h-10 w-full bg-muted animate-shimmer mb-2 rounded" />
            <div className="h-8 w-28 bg-muted animate-shimmer rounded" />
          </div>
        </div>
        {/* --- Product Reviews Skeleton --- */}
        <div className="col-span-1 lg:col-span-2 mt-12">
          <div className="h-7 w-40 bg-muted animate-shimmer mb-3 rounded" />
          <div className="h-4 w-3/4 bg-muted animate-shimmer mb-2 rounded" />
          <div className="h-4 w-1/2 bg-muted animate-shimmer mb-1 rounded" />
        </div>
      </div>
      {/* ----- You Might Also Like Skeleton Row ----- */}
      <div className="mt-12">
        <div className="h-6 w-56 bg-muted animate-shimmer mb-5 rounded" />
        <div className="flex gap-5">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="w-64 flex-shrink-0 flex flex-col rounded-xl overflow-hidden shadow bg-card border border-border"
            >
              <div className="h-56 w-full bg-muted animate-shimmer rounded-t-xl" />
              <div className="p-3">
                <div className="h-6 w-3/4 bg-muted animate-shimmer rounded mb-2" />
                <div className="h-4 w-1/2 bg-muted animate-shimmer rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* ----- Recently Viewed Skeleton Row ----- */}
      <div className="mt-12">
        <div className="h-6 w-40 bg-muted animate-shimmer mb-5 rounded" />
        <div className="flex gap-3">
          {[...Array(4)].map((_, idx) => (
            <div
              key={idx}
              className="w-48 flex-shrink-0 flex flex-col rounded-xl overflow-hidden border border-border bg-card"
            >
              <div className="h-32 w-full bg-muted animate-shimmer rounded-t-xl" />
              <div className="p-3">
                <div className="h-5 w-2/3 bg-muted animate-shimmer rounded mb-1" />
                <div className="h-4 w-1/3 bg-muted animate-shimmer rounded mb-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
