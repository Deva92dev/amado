const FeaturedCollectionSkeleton = () => {
  return (
    <div className="relative py-20 bg-gradient-to-br from-warm-gray via-background to-secondary animate-pulse">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="h-12 w-48 rounded-full bg-muted mx-auto mb-6"></div>
          <div className="h-14 w-1/2 rounded bg-muted mx-auto mb-4"></div>
          <div className="h-8 w-1/4 rounded bg-muted mx-auto mb-8"></div>
          <div className="space-y-3 max-w-3xl mx-auto">
            <div className="h-5 w-full rounded bg-muted"></div>
            <div className="h-5 w-5/6 rounded bg-muted mx-auto"></div>
          </div>
        </div>
        <div className="relative">
          <div className="hidden lg:block">
            {/* Row 1 */}
            <div className="flex gap-6 mb-6 h-[500px]">
              <div className="flex-1 rounded-3xl bg-muted"></div>
              <div className="w-80 rounded-3xl bg-muted"></div>
            </div>
            {/* Row 2 */}
            <div className="flex gap-6 h-[320px]">
              <div className="w-96 rounded-3xl bg-muted"></div>
              <div className="flex-1 rounded-3xl bg-muted"></div>
              <div className="w-80 rounded-3xl bg-muted"></div>
            </div>
          </div>
          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-8 gap-6 auto-rows-[minmax(240px,_auto)]">
              <div className="col-span-5 row-span-2 rounded-3xl bg-muted"></div>
              <div className="col-span-3 rounded-3xl bg-muted"></div>
              <div className="col-span-3 rounded-3xl bg-muted"></div>
              <div className="col-span-4 rounded-3xl bg-muted"></div>
              <div className="col-span-4 rounded-3xl bg-muted"></div>
            </div>
          </div>
          <div className="md:hidden space-y-6">
            <div className="h-[400px] rounded-3xl bg-muted"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-[250px] rounded-3xl bg-muted"></div>
              <div className="h-[250px] rounded-3xl bg-muted"></div>
            </div>
            <div className="space-y-4">
              <div className="h-[200px] rounded-3xl bg-muted"></div>
              <div className="h-[200px] rounded-3xl bg-muted"></div>
            </div>
          </div>
        </div>
        <div className="mt-20 text-center">
          <div className="h-16 w-72 rounded-full bg-muted mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCollectionSkeleton;
