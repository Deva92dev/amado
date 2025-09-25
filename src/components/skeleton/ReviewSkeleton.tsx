import SectionTitle from "../global/SectionTitle";

const ReviewsSkeleton = () => {
  return (
    <div className="mt-16">
      <SectionTitle text="Product Reviews" />
      <div className="grid md:grid-cols-2 gap-8 my-8">
        {/* Generate 4 skeleton cards */}
        {Array.from({ length: 4 }).map((_, index) => (
          <ReviewCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

const ReviewCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Card container */}
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        {/* Header with avatar and name */}
        <div className="flex items-center gap-4 mb-4">
          {/* Avatar skeleton */}
          <div className="w-12 h-12 bg-white/20 rounded-full flex-shrink-0"></div>

          <div className="flex-1">
            {/* Name skeleton */}
            <div className="h-4 bg-white/20 rounded w-24 mb-2"></div>

            {/* Rating stars skeleton */}
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-4 h-4 bg-white/20 rounded"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Comment skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-white/20 rounded w-full"></div>
          <div className="h-4 bg-white/20 rounded w-4/5"></div>
          <div className="h-4 bg-white/20 rounded w-3/5"></div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSkeleton;
