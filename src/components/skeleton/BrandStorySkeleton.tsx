const BrandStorySkeleton = () => {
  return (
    <section className="bg-background py-24 md:py-32 overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch px-6">
        <div className="flex flex-col animate-pulse">
          <div className="h-9 w-36 rounded-full bg-muted mb-6"></div>
          <div className="space-y-4 mb-12 md:mb-6">
            <div className="h-12 w-full rounded bg-muted"></div>
            <div className="h-12 w-4/5 rounded bg-muted"></div>
          </div>
          <div className="space-y-3 mb-10 text-lg">
            <div className="h-5 w-full rounded bg-muted"></div>
            <div className="h-5 w-full rounded bg-muted"></div>
            <div className="h-5 w-5/6 rounded bg-muted"></div>
            <div className="h-5 w-full rounded bg-muted mt-6"></div>
            <div className="h-5 w-2/3 rounded bg-muted"></div>
          </div>
          <div className="flex-grow"></div>
          <div className="flex items-center gap-8 border-t border-border/50 my-4 pt-8">
            <div className="text-center w-1/2">
              <div className="h-10 w-16 mx-auto rounded bg-muted mb-2"></div>
              <div className="h-4 w-28 mx-auto rounded bg-muted"></div>
            </div>
            <div className="text-center w-1/2">
              <div className="h-10 w-16 mx-auto rounded bg-muted mb-2"></div>
              <div className="h-4 w-28 mx-auto rounded bg-muted"></div>
            </div>
          </div>
        </div>
        <div className="animate-pulse bg-muted min-h-[400px] lg:min-h-[600px] rounded-2xl"></div>
      </div>
    </section>
  );
};

export default BrandStorySkeleton;
