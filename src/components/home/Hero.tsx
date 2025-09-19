import Image from "next/image";
import { ArrowRight, PlayIcon } from "lucide-react";
import { MouseTracker } from "./HeroClient";
import { Button } from "../ui/button";
import HeroVideo from "./HeroVideo";

const Hero = () => {
  const mp4Url =
    "https://res.cloudinary.com/deva-projects/video/upload/v1758210060/Video_z51syq.mp4";
  const webmUrl =
    "https://res.cloudinary.com/deva-projects/video/upload/v1758210078/VideoWebm_fwlii7.webm";
  return (
    <MouseTracker className="relative h-screen overflow-hidden">
      <div
        className="absolute inset-0 z-10 animate-gradient-x bg-[length:200%_200%]"
        style={{
          backgroundImage: `linear-gradient(135deg, 
        hsla(var(--brand-accent) / 0.1), 
        hsla(var(--metal-gold) / 0.05),
        hsla(var(--brand-accent) / 0.08))`,
        }}
      />
      <div
        className="absolute animate-float bg-[hsla(var(--metal-silver)/0.1)] border border-[hsla(var(--metal-gold)/0.2)] backdrop-blur-lg"
        style={{
          width: "150px",
          height: "150px",
          top: "15%",
          left: "10%",
          borderRadius: "40% 60% 60% 40% / 70% 30% 70% 30%",
        }}
      />
      <div
        className="absolute animate-float [animation-delay:-2s] bg-[hsla(var(--metal-silver)/0.1)] border border-[hsla(var(--metal-gold)/0.2)] backdrop-blur-lg"
        style={{
          width: "100px",
          height: "100px",
          top: "65%",
          left: "20%",
          borderRadius: "50%",
        }}
      />
      <div
        className="absolute animate-float [animation-delay:-4s] bg-[hsla(var(--metal-silver)/0.1)] border border-[hsla(var(--metal-gold)/0.2)] backdrop-blur-lg"
        style={{
          width: "200px",
          height: "200px",
          top: "40%",
          left: "35%",
          borderRadius: "60% 40% 30% 70% / 60% 70% 30% 40%",
        }}
      />
      {/* for desktop video */}
      <div className="hidden md:block absolute inset-0 w-full h-full">
        <HeroVideo mp4Url={mp4Url} webmUrl={webmUrl} />
        {/* Video Overlay with Custom Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(105deg, 
              hsla(var(--background) / 0.95) 0%, 
              hsla(var(--background) / 0.85) 20%, 
              hsla(var(--background) / 0.6) 35%, 
              hsla(var(--background) / 0.2) 50%, 
              transparent 65%, 
              hsla(var(--brand-accent) / 0.15) 100%)`,
          }}
        />
        {/* Geometric overlay pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-brand-accent/20 rounded-full animate-spin-slow" />
          <div className="absolute bottom-1/3 right-1/6 w-32 h-32 border-2 border-emerald/30 rotate-45 animate-pulse" />
          <div className="absolute top-1/2 right-1/8 w-16 h-16 bg-sapphire/20 rounded-full blur-sm animate-bounce" />
        </div>
      </div>
      {/* for mobile */}
      <div className="md:hidden absolute inset-0">
        <Image
          src="/media/Mobile.jpg"
          alt="woman sitting on a chair"
          sizes="(max-width: 640px) 90vw"
          fill
          priority
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, 
              hsla(var(--background) / 0.8) 0%, 
              hsla(var(--background) / 0.4) 40%, 
              transparent 70%, 
              hsla(var(--brand-accent) / 0.2) 100%)`,
          }}
        />
      </div>
      {/* content  % */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full md:w-[35%] ml-6 md:ml-16 z-20 transform transition-all duration-1000 animate-slideInFromLeft">
          <div className="relative">
            {/* glassmorphism container */}
            <div className="bg-card/10 backdrop-blur-3xl p-8 md:p-12 rounded-3xl border border-border/20 shadow-2xl relative overflow-hidden">
              {/* Animated Background Orbs */}
              <div
                className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl animate-pulse"
                style={{
                  background: `radial-gradient(circle, hsla(var(--emerald) / 0.2), hsla(var(--brand-accent) / 0.1))`,
                }}
              />
              <div
                className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full blur-2xl animate-pulse delay-1000 opacity-40"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, hsla(var(--foreground) / 0.3) 1px, transparent 0)`,
                  backgroundSize: "24px 24px",
                }}
              />
              {/* content */}
              <div className="relative z-10">
                <h1
                  className="h1 text-foreground mb-6 leading-tight transform transition-all duration-700 delay-300 glow-text animate-slideUpFromBottom"
                  style={{
                    textShadow: "0 0 30px hsla(var(--brand-accent) / 0.3)",
                    filter:
                      "drop-shadow(0 4px 8px hsla(var(--foreground) / 0.1))",
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
                <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed transform transition-all duration-700 delay-500 animate-slideUpFromBottom">
                  Discover our curated collection where contemporary fashion
                  meets timeless elegance. Each piece tells a story of
                  craftsmanship and style.
                </p>
                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-4 transform transition-all duration-700 delay-700 animate-slideUpFromBottom">
                  <Button className="group relative btn-brand px-8 py-4 text-lg font-semibold overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:ring-brand w-fit cursor-pointer">
                    <span className="relative z-10 flex flex-row gap-2 justify-center items-center">
                      Shop Now
                      <ArrowRight className="w-4 h-4" />
                    </span>
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(90deg, 
                          hsl(var(--sapphire)), 
                          hsl(var(--emerald)))`,
                      }}
                    />
                  </Button>
                  <Button className="group px-8 py-4 text-lg font-semibold text-foreground border-2 border-border/30 rounded-[--radius] bg-card/5 backdrop-blur-sm hover:bg-accent/20 hover:border-border/50 transition-all hover:scale-105 w-fit cursor-pointer">
                    <span className="flex items-center gap-2">Watch Story</span>
                    <PlayIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* decorative elements */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 border border-brand-accent/20 rounded-full animate-spin-slow opacity-30" />
      <div className="absolute bottom-1/3 right-1/6 w-32 h-32 border-2 border-emerald/30 rotate-45 animate-pulse" />
      {/*  flowing shapes  */}
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
      {/* subtle geometric elements */}
      <div className="absolute top-1/3 right-1/5 w-16 h-16 bg-sapphire/5 rounded-full blur-sm animate-bounce opacity-60" />
      <div className="absolute bottom-1/2 left-1/4 w-8 h-8 bg-brand-accent/10 rotate-45 animate-pulse delay-2000" />
      {/*  accent lines */}
      <div className="absolute top-1/2 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent opacity-60 animate-pulse" />
      <div className="absolute top-3/5 right-0 w-1/4 h-px bg-gradient-to-l from-transparent via-emerald/30 to-transparent opacity-40 animate-pulse delay-500" />
      {/* bottom curve*/}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-24"
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
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-10 border-2 border-muted-foreground/40 rounded-full flex justify-center relative overflow-hidden">
            <div className="w-1 h-3 bg-gradient-to-b from-brand-accent to-emerald rounded-full mt-2 animate-bounce" />
          </div>
          <span className="text-muted-foreground text-xs font-medium tracking-widest font-accent">
            SCROLL
          </span>
        </div>
      </div>
      {/* floating elements */}
      <div className="absolute top-1/5 right-1/5 w-2 h-2 rounded-full animate-ping opacity-60 bg-brand-accent" />
      <div className="absolute top-2/3 left-1/5 w-1 h-1 rounded-full animate-pulse delay-500 opacity-40 bg-emerald" />
      <div className="absolute top-1/3 right-1/8 w-3 h-3 rounded-full animate-bounce delay-1000 opacity-50 bg-sapphire" />
    </MouseTracker>
  );
};

export default Hero;
