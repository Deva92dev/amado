"use client";

export default function HeroSkeleton() {
  return (
    <section className="relative h-screen overflow-x-hidden bg-gray-100 animate-pulse">
      {/* gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gray-200" />
      {/* desktop video section placeholder */}
      <div className="hidden md:block absolute inset-0 w-full h-full bg-gray-300" />
      {/* mobile image section placeholder */}
      <div className="relative md:hidden w-full h-full isolate bg-gray-200" />
      {/* hero content card */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="w-full md:w-[38%] mx-6 max-w-[calc(100vw-48px)]">
          <div className="relative bg-white/30 backdrop-blur-lg rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
            <div className="p-6 md:p-10 space-y-6">
              <div className="h-10 w-2/3 bg-gray-300 rounded-md" />
              <div className="h-6 w-full bg-gray-200 rounded-md" />
              <div className="h-6 w-5/6 bg-gray-200 rounded-md" />
              <div className="flex flex-col lg:flex-row gap-3 md:gap-4 mt-6">
                <div className="h-10 w-32 bg-gray-300 rounded-full" />
                <div className="h-10 w-32 bg-gray-300 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* floating shapes */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-1/2 h-1/2 bg-gray-200 opacity-20 rounded-full" />
        <div className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-gray-200 opacity-20 rounded-full" />
      </div>
      {/* bottom wave placeholder */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-100 to-transparent z-10" />
      {/* scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-10 border-2 border-gray-300 rounded-lg flex justify-center relative overflow-hidden" />
          <div className="h-3 w-10 bg-gray-200 rounded-md" />
        </div>
      </div>
    </section>
  );
}
