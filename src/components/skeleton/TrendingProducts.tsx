const ProductCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-muted aspect-square rounded-lg" />
    <div className="mt-2 h-4 w-3/4 rounded bg-muted" />
    <div className="mt-1 h-4 w-1/2 rounded bg-muted" />
  </div>
);

export const TrendingProductsSkeleton = () => {
  return (
    <section className="py-24">
      <div className="h-8 w-1/3 mx-auto rounded bg-muted animate-pulse" />
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </section>
  );
};
