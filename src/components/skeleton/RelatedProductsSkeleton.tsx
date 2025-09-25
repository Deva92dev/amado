const RelatedProductsSkeleton = () => {
  return (
    <section className="mt-16">
      <div className="animate-pulse">
        <div className="h-7 bg-white/20 rounded w-48 mb-5"></div>
      </div>
      <div className="mt-5">
        <RelatedProductCarouselSkeleton />
      </div>
    </section>
  );
};

const RelatedProductCarouselSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="overflow-hidden">
        <div className="flex gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="w-2 h-2 bg-white/20 rounded-full"></div>
        ))}
      </div>
    </div>
  );
};

const ProductCardSkeleton = () => {
  return (
    <div className="flex-none w-64 sm:w-72">
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
        <div className="aspect-square bg-white/20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/10"></div>
        </div>
        <div className="p-4 space-y-3">
          <div className="h-5 bg-white/20 rounded w-3/4"></div>
          <div className="h-6 bg-white/20 rounded w-20"></div>
          <div className="h-10 bg-white/20 rounded-lg w-full mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProductsSkeleton;
