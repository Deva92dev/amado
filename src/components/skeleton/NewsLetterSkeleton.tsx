const NewsLetterSkeleton = () => {
  return (
    <section className="bg-background py-20 sm:py-28 animate-pulse">
      <div className="container mx-auto max-w-2xl px-6 text-center lg:px-8">
        <div className="h-7 w-32 rounded bg-muted mx-auto"></div>
        <div className="mt-4 h-12 w-4/5 rounded bg-muted mx-auto sm:h-14"></div>
        <div className="mx-auto mt-6 max-w-xl space-y-3">
          <div className="h-5 w-full rounded bg-muted"></div>
          <div className="h-5 w-full rounded bg-muted"></div>
          <div className="h-5 w-3/4 rounded bg-muted mx-auto"></div>
        </div>
        <div className="mt-10 h-14 w-full max-w-sm rounded-full bg-muted mx-auto"></div>
        <div className="mt-12 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
          <div className="h-5 w-40 rounded bg-muted"></div>
          <div className="h-5 w-48 rounded bg-muted"></div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetterSkeleton;
