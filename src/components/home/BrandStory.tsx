import dynamic from "next/dynamic";
import Image from "next/image";
import brandImage from "@/assets/Brand.webp";

const MotionSection = dynamic(() =>
  import("../animations").then((mod) => mod.MotionSection)
);

const MotionText = dynamic(() =>
  import("../animations").then((mod) => mod.MotionText)
);

const BrandStory = () => {
  return (
    <section className="relative bg-gradient-metallic w-full bg-background text-foreground py-24 md:py-32 overflow-hidden">
      <div
        className="absolute top-[-10%] left-[-5%] w-[110%] h-[120%] transform-gpu"
        style={{
          background:
            "radial-gradient(circle at 30% 70%, hsla(var(--pastel-blush) / 0.3), hsla(var(--pastel-mint) / 0.2), transparent)",
        }}
      />
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch px-6">
        {/* left */}
        <MotionSection
          animation={{ type: "fade", duration: 1.0, delay: 0.1 }}
          parallax={{ speed: 30, direction: "up" }} // Text moves up slightly faster
          mobile={{
            disableParallax: true,
            disableAnimations: false,
            simpleAnimation: "fade",
            breakPoint: 768,
            reducedMotion: true,
          }}
          triggerOnce={true}
          threshold={0.1}
          overflow={false}
          className="relative h-full flex flex-col z-10"
        >
          <div
            className="absolute top-[-20px] left-[-20px] w-[60px] h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, hsl(var(--metal-gold)), hsl(var(--brand-accent)))",
            }}
          />
          <article className="flex-grow text-left">
            <span className="px-5 py-2 text-sm font-medium tracking-wide text-gold bg-gradient-to-r from-pastel-blush to-warm-gray rounded-full border border-gold/30 inline-block mb-6 font-accent ">
              Our Journey
            </span>
            <MotionText
              as="h2"
              animation={{ type: "slideUp", stagger: 0.05 }}
              splitBy="character"
              triggerOnce={true}
              threshold={0.2}
              mobile={{
                disableAnimations: false,
                simpleAnimation: "fadeIn",
                breakPoint: 768,
                reducedMotion: true,
              }}
              className="text-4xl md:text-5xl font-bold font-primary-serif mb-12 md:mb-6 leading-tight text-foreground md:bg-gradient-to-r md:from-charcoal md:via-foreground md:to-metal-gold md:bg-clip-text md:text-transparent  glow-text"
            >
              Crafting the Future of Style
            </MotionText>
            <p className="text-lg text-muted-foreground font-secondary-sans leading-relaxed mb-6">
              Founded in 2020, our brand was born from a simple belief: that
              elegance and everyday comfort should not be mutually exclusive. We
              embarked on a journey to redefine modern luxury, sourcing the
              finest materials and partnering with artisan craftsmen who share
              our passion for quality.
            </p>
            <p className="text-lg text-muted-foreground font-secondary-sans leading-relaxed mb-10">
              Our mission is to create timeless pieces that empower you to
              express your unique identity with confidence and grace.
            </p>
          </article>
          <MotionText
            as="p"
            animation={{ type: "fadeIn", duration: 0.6, delay: 0.8 }}
            splitBy="character"
            threshold={0.2}
            mobile={{
              disableAnimations: false,
              simpleAnimation: "fadeIn",
              breakPoint: 768,
              reducedMotion: true,
            }}
            className="flex items-center gap-8 border-t border-border my-4 pt-8"
          >
            <div className="text-center">
              <p className="text-4xl font-bold text-gold font-accent">5+</p>
              <p className="text-sm text-muted-foreground tracking-wide uppercase">
                Years of Expertise
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-gold font-accent">1M+</p>
              <p className="text-sm text-muted-foreground tracking-wide uppercase">
                Happy Consumers
              </p>
            </div>
          </MotionText>
        </MotionSection>
        {/* right image */}
        <MotionSection
          as="figure"
          animation={{ type: "fade", duration: 1.0, delay: 0.3 }}
          parallax={{ speed: -30, direction: "up" }} // Image moves down slightly, creating depth
          mobile={{
            disableParallax: true,
            disableAnimations: false,
            simpleAnimation: "fade",
            breakPoint: 768,
            reducedMotion: true,
          }}
          triggerOnce={true}
          threshold={0.1}
          overflow={false}
          className="relative h-full min-h-[400px] lg:min-h-[600px] rounded-2xl overflow-hidden"
        >
          <Image
            src={brandImage}
            alt="Woman measuring the length of tucked cloth"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            className="w-full h-full object-cover rounded-3xl"
          />
          <div className="absolute inset-0 border-2 border-metal-gold/30 rounded-2xl pointer-events-none" />
        </MotionSection>
      </div>
    </section>
  );
};

export default BrandStory;
