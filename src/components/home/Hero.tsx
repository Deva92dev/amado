import Image from "next/image";
import { ArrowRight, PlayIcon } from "lucide-react";
import { MouseTracker } from "./HeroClient";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="relative w-full h-[100dvh] overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 z-0">
        <Image
          src="/Main.webp"
          alt="Elegant fashion model showcasing contemporary style"
          fill
          priority
          sizes="100vw"
          quality={80}
          className="object-cover object-center"
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRj4AAABXRUJQVlA4IDIAAACwAQCdASoKAAUAAgA0JZwAAu0SUHLAAP7ydPuPi+5HSP8E3Uo7tRBrMt1LZJGZOAAAAA=="
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="overlay-hero-scrim" />
      </div>
      {/* 3. HERO CONTENT */}
      <MouseTracker
        factor={0.015}
        className="absolute inset-0 z-20 flex items-center"
      >
        <div className="w-full md:w-[45%] ml-4 md:ml-16 max-w-full">
          <div className="relative">
            <div className="bg-card/10 backdrop-blur-md p-6 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h1
                  id="lcp-element"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slideUpFromBottom"
                  style={{
                    textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                  }}
                >
                  Redefine Your
                  <span
                    className="block text-transparent bg-clip-text animate-gradient-x bg-[length:200%_200%] font-extrabold mt-2"
                    style={{
                      backgroundImage: `linear-gradient(90deg, 
                        hsl(var(--brand-accent)), 
                        #fff, 
                        hsl(var(--emerald)), 
                        hsl(var(--brand-accent)))`,
                    }}
                  >
                    Style
                  </span>
                </h1>

                <p className="text-base md:text-xl text-white/90 mb-8 leading-relaxed max-w-lg">
                  Discover our curated collection where contemporary fashion
                  meets timeless elegance. Each piece tells a story of
                  craftsmanship and innovation.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="btn-brand px-8 py-6 text-lg font-bold rounded-xl transition-transform hover:scale-105">
                    <span className="flex items-center gap-2">
                      Shop Now
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </Button>

                  <Button
                    variant="outline"
                    className="px-8 py-6 text-lg font-bold bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:text-white rounded-xl transition-transform hover:scale-105"
                  >
                    <span className="flex items-center gap-2">
                      Watch Story
                      <PlayIcon className="w-5 h-5" />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MouseTracker>
      {/* 4. PARALLAX SHAPES */}
      <MouseTracker
        factor={0.04}
        className="absolute inset-0 z-10 pointer-events-none hidden md:block"
      >
        {/* Simplified shapes for better performance */}
        <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-brand-accent/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[20%] left-[10%] w-48 h-48 bg-emerald/20 rounded-full blur-3xl animate-pulse delay-700" />
      </MouseTracker>

      {/* 5. BOTTOM DECORATION */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <div className="w-1 h-12 bg-white/50 rounded-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-brand-accent animate-slideDown" />
          </div>
          <span className="text-[10px] font-bold tracking-[0.2em] text-white/70">
            SCROLL
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
