import Image from "next/image";
import { ArrowRight, PlayIcon } from "lucide-react";
import { MouseTracker } from "./HeroClient";
import { Button } from "../ui/button";
import HeroVideo from "./HeroVideo";

const Hero = () => {
  const mp4Url =
    "https://res.cloudinary.com/deva-projects/video/upload/v1758442140/HeroVideo2_c1xutn.mp4";
  const webMUrl =
    "https://res.cloudinary.com/deva-projects/video/upload/v1758441091/HeroVideo_s0heve.webm";

  return (
    <MouseTracker className="relative bg-gradient-hero h-screen overflow-hidden">
      <div
        className="absolute inset-0 z-10 animate-gradient-x bg-[length:200%_200%]"
        style={{
          backgroundImage: `linear-gradient(135deg, 
            hsla(var(--brand-accent) / 0.1), 
            hsla(var(--metal-gold) / 0.05),
            hsla(var(--brand-accent) / 0.08))`,
        }}
      />
      {/* desktop video section */}
      <div className="hidden md:block absolute inset-0 w-full h-full">
        <HeroVideo mp4Url={mp4Url} webMUrl={webMUrl} />
        <div
          className="absolute inset-0 z-[5]"
          style={{
            background: `linear-gradient(110deg, 
              hsla(var(--background) / 0.95) 0%, 
              hsla(var(--background) / 0.85) 18%, 
              hsla(var(--background) / 0.6) 32%, 
              hsla(var(--background) / 0.3) 45%, 
              hsla(var(--background) / 0.1) 58%, 
              transparent 70%, 
              hsla(var(--brand-accent) / 0.1) 90%,
              hsla(var(--brand-accent) / 0.15) 100%)`,
          }}
        />
        <div className="absolute top-4 right-4 z-[7] bg-black/20 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-white/70 text-xs font-medium">HD</span>
        </div>
      </div>
      {/* ✅ Fixed mobile section - Force full coverage */}
      <div className="md:hidden absolute inset-0 w-full h-full">
        <Image
          src="/media/Mobile.jpg"
          alt="Elegant fashion model showcasing contemporary style"
          sizes="(max-width: 768px) 100vw, 0px"
          fill
          priority
          className="object-cover object-center"
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          quality={75}
        />
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: `linear-gradient(135deg, 
        hsla(var(--background) / 0.85) 0%, 
        hsla(var(--background) / 0.5) 35%, 
        hsla(var(--background) / 0.2) 60%,
        transparent 75%, 
        hsla(var(--brand-accent) / 0.15) 100%)`,
          }}
        />
      </div>
      {/* content section */}
      <div className="absolute inset-0 flex items-center z-20">
        <div className="w-full md:w-[38%] ml-3 mr-3 md:ml-16 md:mr-0 max-w-[calc(100vw-24px)] sm:max-w-[calc(100vw-48px)] transform transition-all duration-1000 animate-slideInFromLeft">
          <div className="relative">
            {/*  glassmorphism  */}
            <div className="bg-card/10 backdrop-blur-3xl p-4 sm:p-6 md:p-8 lg:p-12 rounded-2xl md:rounded-3xl border border-border/20 shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h1
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-foreground mb-4 md:mb-6 leading-tight transform transition-all duration-700 delay-300 glow-text animate-slideUpFromBottom"
                  style={{
                    textShadow: "0 0 30px hsla(var(--brand-accent) / 0.4)",
                    filter:
                      "drop-shadow(0 4px 12px hsla(var(--foreground) / 0.15))",
                  }}
                >
                  Redefine Your
                  <span
                    className="block text-transparent bg-clip-text animate-gradient-x bg-[length:200%_200%] font-bold"
                    style={{
                      backgroundImage: `linear-gradient(90deg, 
                        hsl(var(--brand-accent)), 
                        hsl(var(--sapphire)), 
                        hsl(var(--emerald)), 
                        hsl(var(--brand-accent)))`,
                    }}
                  >
                    Style
                  </span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-10 leading-relaxed transform transition-all duration-700 delay-500 animate-slideUpFromBottom">
                  Discover our curated collection where contemporary fashion
                  meets timeless elegance. Each piece tells a story of
                  craftsmanship and innovation.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 transform transition-all duration-700 delay-700 animate-slideUpFromBottom">
                  <Button className="group relative btn-brand px-4 sm:px-6 md:px-8 py-3 md:py-4 text-sm sm:text-base md:text-lg font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-brand-accent/25 hover:ring-2 hover:ring-brand-accent/50 w-fit cursor-pointer">
                    <span className="relative z-10 flex flex-row gap-2 justify-center items-center transition-transform duration-300 group-hover:translate-x-1">
                      Shop Now
                      <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(45deg, 
                          hsl(var(--sapphire)), 
                          hsl(var(--emerald)))`,
                      }}
                    />
                  </Button>
                  <Button className="group px-4 sm:px-6 md:px-8 py-3 md:py-4 text-sm sm:text-base md:text-lg font-semibold text-foreground border-2 border-border/30 rounded-[--radius] bg-card/5 backdrop-blur-sm hover:bg-accent/20 hover:border-border/50 transition-all duration-300 hover:scale-105 hover:shadow-lg w-fit cursor-pointer">
                    <span className="flex items-center gap-2">
                      Watch Story
                      <PlayIcon className="w-3 sm:w-4 h-3 sm:h-4 transition-transform duration-300 group-hover:scale-110" />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute top-1/4 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-brand-accent/10 via-sapphire/5 to-transparent animate-pulse opacity-30 hover:opacity-40 transition-opacity duration-500"
        style={{
          clipPath:
            "polygon(100% 0%, 100% 60%, 80% 100%, 60% 80%, 40% 100%, 20% 60%, 0% 80%, 0% 0%)",
          filter: "blur(0.5px)",
        }}
      />
      <div
        className="absolute bottom-1/4 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-emerald/8 to-transparent animate-pulse delay-1000 opacity-20"
        style={{
          clipPath: "ellipse(70% 60% at 30% 70%)",
          filter: "blur(1px)",
        }}
      />
      <div className="absolute bottom-1/2 left-1/4 w-8 h-8 bg-brand-accent/10 rotate-45 animate-pulse delay-2000" />
      <div className="absolute top-1/2 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent opacity-60 animate-pulse" />
      <div className="absolute top-3/5 right-0 w-1/4 h-px bg-gradient-to-l from-transparent via-emerald/30 to-transparent opacity-40 animate-pulse delay-500" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-24 z-[11]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,120 C300,40 600,10 900,30 C1050,40 1150,70 1200,80 L1200,120 L0,120 Z"
          fill="hsl(var(--background))"
          className="animate-pulse"
        />
      </svg>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 group cursor-pointer">
          <div className="w-6 h-10 border-2 border-muted-foreground/40 rounded-lg flex justify-center relative overflow-hidden group-hover:border-brand-accent/60 transition-colors duration-300">
            <div className="w-1 h-3 bg-gradient-to-b from-brand-accent to-emerald rounded-sm mt-2 animate-bounce" />
          </div>
          <span className="text-muted-foreground text-xs font-medium tracking-widest font-accent group-hover:text-brand-accent/80 transition-colors duration-300">
            SCROLL
          </span>
        </div>
      </div>
    </MouseTracker>
  );
};

export default Hero;
