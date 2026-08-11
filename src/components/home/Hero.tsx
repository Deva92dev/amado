import dynamic from "next/dynamic";
import Link from "next/link";

const HeroEnhancements = dynamic(() => import("./HeroEnhancements"), {
  loading: () => null,
});

export default function Hero() {
  return (
    <section className="relative w-full h-[100dvh] overflow-hidden bg-[hsl(0_0%_100%)]">
      <div className="absolute inset-0 z-0">
        {/* Art-directed cinematic hero: portrait on mobile, landscape on desktop */}
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="/hero/hero-mobile.webp"
            type="image/webp"
          />
          <img
            src="/hero/hero-desktop.webp"
            alt="Elegant fashion model showcasing contemporary style in cinematic motion"
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>
      <div className="relative z-10 flex items-center h-full px-4 md:px-16">
        <div className="w-full md:w-1/2 max-w-xl space-y-6">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
          >
            Redefine Your{" "}
            <span className="block mt-2 font-bold text-[hsl(46_80%_62%)]">
              Style
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-100 font-normal leading-relaxed max-w-lg">
            Discover our curated collection where contemporary fashion meets
            timeless elegance. Each piece tells a story of craftsmanship and
            innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 text-base md:text-lg font-bold rounded-xl bg-[hsl(var(--brand-accent))] text-white transition-transform duration-200 active:scale-95 touch-manipulation select-none md:hover:scale-105 md:hover:brightness-110"
            >
              Shop Now →
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center px-8 py-4 text-base md:text-lg font-bold rounded-xl border border-white/20 bg-white/10 text-white transition-transform duration-200 active:scale-95 touch-manipulation select-none md:hover:bg-white/20 md:hover:scale-105"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
      {/* Theme bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(0_0%_100%)] to-transparent z-10" />
      {/* Scroll indicator  */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 md:animate-bounce will-change-transform">
          <div className="w-1 h-12 bg-white/50 rounded-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[hsl(var(--brand-accent))] md:animate-[slide-up_1.5s_infinite]" />
          </div>
          <span className="text-xs font-bold tracking-wide text-white/70">
            SCROLL
          </span>
        </div>
      </div>
      <HeroEnhancements />
    </section>
  );
}
