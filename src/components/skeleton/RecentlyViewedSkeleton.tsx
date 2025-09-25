const RecentlyViewedSkeleton = () => {
  return (
    <section className="mt-16">
      <div className="animate-pulse">
        <div className="h-7 bg-white/20 rounded w-36 mb-5"></div>
      </div>
      <div className="mt-5">
        <RecentlyViewedCarouselSkeleton />
      </div>
    </section>
  );
};

const RecentlyViewedCarouselSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <div className="w-4 h-4 bg-white/30 rounded"></div>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
          <div className="w-4 h-4 bg-white/30 rounded"></div>
        </div>
        <div className="overflow-hidden px-12">
          <div className="flex gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <RecentlyViewedCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="w-2 h-2 bg-white/20 rounded-full"></div>
        ))}
      </div>
    </div>
  );
};

const RecentlyViewedCardSkeleton = () => {
  return (
    <div className="flex-none w-64 sm:w-72">
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden hover:border-white/30 transition-colors">
        <div className="aspect-square bg-white/20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white/10"></div>
          <div className="absolute top-2 left-2 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
            <div className="h-3 bg-white/30 rounded w-12"></div>
          </div>
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

export default RecentlyViewedSkeleton;
