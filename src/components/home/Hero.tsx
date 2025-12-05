import Image from "next/image";
import { ArrowRight, PlayIcon } from "lucide-react";
import { MouseTracker } from "./HeroClient";
import { Button } from "../ui/button";
import MainImage from "@/assets/Main.webp";

const Hero = () => {
  return (
    <section className="relative w-full h-[100dvh] overflow-hidden bg-[hsl(0_0%_100%)]">
      <div className="absolute inset-0 z-0">
        <Image
          src={MainImage}
          alt="Elegant fashion model showcasing contemporary style"
          fill
          priority
          sizes="100vw"
          quality={75}
          className="object-cover object-center"
          placeholder="empty"
        />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(90deg, hsla(0,0%,0%,0.8) 0%, hsla(0,0%,0%,0.4) 50%, transparent 100%)",
          }}
        />
      </div>
      {/* 4. Content */}
      <MouseTracker
        factor={0.015}
        className="absolute inset-0 z-20 flex items-center"
      >
        <div className="w-full md:w-[50%] ml-0 md:ml-16 max-w-full px-4 md:px-0">
          <div className="relative">
            <div className="bg-black/30 backdrop-blur-none md:bg-white/10 md:backdrop-blur-md p-6 md:p-12 rounded-3xl border border-white/10 shadow-none md:shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h1
                  id="lcp-element"
                  className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight md:animate-slide-up"
                  style={{ textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
                >
                  Redefine Your{" "}
                  <span
                    className="block mt-2 font-bold text-[hsl(215_100%_40%)] 
                    md:text-transparent md:bg-clip-text md:animate-gradient-x 
                    md:bg-[length:200%_200%] md:bg-[linear-gradient(90deg,hsl(215_100%_40%),#fff,hsl(152_61%_30%),hsl(215_100%_40%))]"
                  >
                    Style
                  </span>
                </h1>
                <p className="text-base md:text-xl text-gray-100 font-normal mb-8 leading-relaxed max-w-lg">
                  Discover our curated collection where contemporary fashion
                  meets timeless elegance. Each piece tells a story of
                  craftsmanship and innovation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    className="px-8 py-6 text-lg font-bold rounded-xl bg-[hsl(215_100%_40%)] text-white transition-transform duration-200 
                      active:scale-95 touch-manipulation select-none md:hover:scale-105 md:hover:brightness-110 shadow-none"
                  >
                    <span className="flex items-center gap-2">
                      Shop Now
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </Button>
                  <Button
                    variant="outline"
                    className="px-8 py-6 text-lg font-bold bg-white/10 backdrop-blur-none md:backdrop-blur-sm border-white/20 text-white transition-transform duration-200 active:scale-95 touch-manipulation select-none md:hover:bg-white/20 md:hover:scale-105"
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
      {/* Parallax Shapes Hidden on Mobile  */}
      <MouseTracker
        factor={0.04}
        className="absolute inset-0 z-10 pointer-events-none hidden md:block"
      >
        <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-[hsl(215_100%_40%)]/20 rounded-full blur-none md:blur-3xl md:animate-pulse" />
        <div className="absolute bottom-[20%] left-[10%] w-48 h-48 bg-[hsl(152_61%_30%)]/20 rounded-full blur-none md:blur-3xl md:animate-pulse md:delay-700" />
      </MouseTracker>
      {/*Theme Background Color */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[hsl(0_0%_100%)] to-transparent z-10" />
      {/*  Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 md:animate-bounce will-change-transform">
          <div className="w-1 h-12 bg-white/50 rounded-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-[hsl(215_100%_40%)] md:animate-[slide-up_1.5s_infinite]" />
          </div>
          <span className="text-xs font-bold tracking-wide text-white/70">
            SCROLL
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
