import dynamic from "next/dynamic";
import Image from "next/image";
import { getFeaturedCollection } from "@/utils/actions";

const MotionSection = dynamic(() =>
  import("../animations").then((mod) => mod.MotionSection)
);
const MotionCard = dynamic(() =>
  import("../animations").then((mod) => mod.MotionCard)
);
const MotionImage = dynamic(() =>
  import("../animations").then((mod) => mod.MotionImage)
);
const MotionButton = dynamic(() =>
  import("../animations").then((mod) => mod.MotionButton)
);

const FeaturedCollection = async () => {
  const collections = await getFeaturedCollection();

  const currentSeason =
    new Date().getMonth() >= 5 && new Date().getMonth() <= 8
      ? "summer"
      : "winter";

  const cardBaseClasses =
    "group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 transform-style-3d hover:shadow-2xl hover:-translate-y-3 hover:rotate-x-[8deg] hover:rotate-y-[2deg]";
  const shimmerEffectClasses =
    "absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-metal-gold/20 to-transparent group-hover:left-full transition-all duration-700 ease-in-out z-10";

  return (
    <MotionSection
      animation={{
        type: "slide",
        direction: "up",
        duration: 0.8,
        ease: "easeOut",
        stagger: 0.1, // This will apply to MotionCard children
      }}
      mobile={{
        disableParallax: true,
        disableAnimations: false,
        simpleAnimation: "fade",
        breakPoint: 768,
        reducedMotion: true,
      }}
      className="relative"
    >
      <div className="relative py-20 bg-gradient-to-br from-warm-gray via-background to-secondary">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20">
            <span className="px-6 py-3 text-sm font-medium tracking-wider text-gold bg-gradient-to-r from-pastel-blush to-warm-gray rounded-full border border-gold/30 inline-block mb-6 font-accent">
              Curated Collections
            </span>
            <h2 className="h1 bg-gradient-to-r from-charcoal via-foreground to-metal-gold bg-clip-text text-transparent mb-8 glass-effect magnetic-hover glow-text">
              Featured
              <span className="block font-accent italic font-light">
                Collections
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-secondary-sans">
              Discover our carefully curated collections for every season and
              style
            </p>
          </div>
          {/* Magazine-Style Asymmetrical Layout */}
          <div className="relative perspective">
            {/* Desktop Layout */}
            <div className="hidden lg:block">
              {/* Row 1 */}
              <div className="flex gap-6 mb-6 min-h-0">
                {/* Large Featured Tile - Current Season */}
                {collections[currentSeason]?.length > 0 && (
                  <MotionCard
                    className={`${cardBaseClasses} flex-1 h-[400px] xl:h-[500px] min-w-0`}
                  >
                    <div className={shimmerEffectClasses} />
                    <MotionImage
                      src={collections[currentSeason][0].image}
                      alt={collections[currentSeason][0].name}
                      fill
                      loading="lazy"
                      quality={75}
                      sizes="(min-width: 1280px) 50vw, 60vw"
                      className="object-cover object-top"
                      hover={{ scale: 1.05, duration: 0.7 }}
                    />
                    <div className="absolute inset-0 bg-charcoal/60 group-hover:bg-charcoal/20 transition-all duration-700 ease-out" />
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-metal-gold/30 group-hover:shadow-[0_0_30px_rgba(var(--metal-gold),0.3)] transition-all duration-500" />
                    <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end">
                      <div className="transform-gpu translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <h3 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 font-primary-serif">
                          {currentSeason === "summer" ? "Summer" : "Winter"}
                        </h3>
                        <p className="text-white/90 text-lg lg:text-xl mb-6 font-secondary-sans opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                          {collections[currentSeason].length} Items Available
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                      <div className="flex gap-2">
                        {collections[currentSeason]
                          .slice(1, 4)
                          .map((product, index) => (
                            <div
                              key={product.id}
                              className="w-16 h-16 rounded-lg overflow-hidden border-2 border-white/50 transform translate-x-4 group-hover:translate-x-0 transition-transform duration-300 relative"
                              style={{ transitionDelay: `${index * 100}ms` }}
                            >
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                loading="lazy"
                                sizes="64px"
                                quality={60}
                                className="object-cover"
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  </MotionCard>
                )}
                {/* Men's Collection - Tall */}
                {collections.men?.length > 0 && (
                  <MotionCard
                    className={`${cardBaseClasses} w-72 lg:w-80 h-[400px] xl:h-[500px] flex-shrink-0`}
                  >
                    <div className={shimmerEffectClasses} />
                    <MotionImage
                      animation={{ type: "fade", duration: 0.8 }}
                      src={collections.men[3].image}
                      alt={collections.men[3].name}
                      fill
                      loading="lazy"
                      quality={75}
                      sizes="320px"
                      className="w-full h-full object-cover"
                      hover={{ scale: 1.05, duration: 0.7 }}
                      triggerOnce={true}
                    />
                    <div className="absolute inset-0 bg-charcoal/70 group-hover:bg-charcoal/40 transition-all duration-500" />
                    <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-background/20 group-hover:shadow-lg transition-all duration-300" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-400 ease-out">
                        <h4 className="text-2xl lg:text-3xl font-bold text-white mb-2 font-primary-serif">
                          Men Essential
                        </h4>
                        <p className="text-white/80 text-base font-secondary-sans opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                          {collections.men.length} Items
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all delay-150 duration-400">
                      {collections.men.slice(1, 3).map((product, index) => (
                        <div
                          key={product.id}
                          className="w-12 h-12 relative rounded-md overflow-hidden border border-white/40 mb-1 transform translate-x-2 group-hover:translate-x-0 transition-transform duration-300"
                          style={{ transitionDelay: `${index * 80}ms` }}
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            loading="lazy"
                            quality={60}
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </MotionCard>
                )}
              </div>
              {/* Row 2 */}
              <div className="flex gap-6 h-[280px] xl:h-[320px]">
                {/* Opposite Season - Medium */}
                {collections[currentSeason === "summer" ? "winter" : "summer"]
                  ?.length > 0 && (
                  <MotionCard
                    className={`${cardBaseClasses} w-80 lg:w-96 h-full flex-shrink-0`}
                  >
                    <div className={shimmerEffectClasses} />
                    <MotionImage
                      animation={{ type: "slideUp", duration: 0.8 }}
                      src={
                        collections[
                          currentSeason === "summer" ? "winter" : "summer"
                        ][2].image
                      }
                      alt={
                        collections[
                          currentSeason === "summer" ? "winter" : "summer"
                        ][2].name
                      }
                      fill
                      loading="lazy"
                      sizes="384px"
                      quality={75}
                      className="w-full h-full object-cover"
                      hover={{ scale: 1.05, duration: 0.6 }}
                      triggerOnce={true}
                    />
                    <div
                      className={`absolute inset-0 ${
                        currentSeason === "summer"
                          ? "bg-charcoal/70 group-hover:bg-charcoal/40"
                          : "bg-metal-gold/70 group-hover:bg-metal-gold/40"
                      } transition-all duration-500`}
                    />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                        <h4 className="text-xl lg:text-2xl font-bold text-white mb-1 font-primary-serif">
                          {currentSeason === "summer"
                            ? "Winter Preview"
                            : "Summer Preview"}
                        </h4>
                        <p className="text-white/80 text-sm font-secondary-sans">
                          {
                            collections[
                              currentSeason === "summer" ? "winter" : "summer"
                            ].length
                          }
                          Items
                        </p>
                      </div>
                    </div>
                  </MotionCard>
                )}
                {/* Women's Collection - Wide */}
                {collections.women?.length > 0 && (
                  <MotionCard
                    className={`${cardBaseClasses} flex-1 h-full min-w-0 bg-gradient-jewel`}
                  >
                    <div className={shimmerEffectClasses} />
                    <MotionImage
                      animation={{ type: "scale", duration: 0.8 }}
                      src={collections.women[1].image}
                      alt={collections.women[1].name}
                      fill
                      loading="lazy"
                      quality={75}
                      sizes="(max-width: 1200px) 50vw, 40vw"
                      className="w-full h-full object-cover"
                      hover={{ scale: 1.05, duration: 0.7 }}
                      triggerOnce={true}
                    />
                    <div className="absolute inset-0 bg-ruby/60 group-hover:bg-ruby/30 transition-all duration-500" />
                    <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-ruby/30 group-hover:shadow-lg transition-all duration-300" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-400 ease-out">
                        <h4 className="text-2xl lg:text-3xl font-bold text-white mb-2 font-primary-serif">
                          Women Elegance
                        </h4>
                        <p className="text-white/80 text-base font-secondary-sans opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                          {collections.women.length} Items
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-400 delay-150">
                      {collections.women.slice(1, 3).map((product, index) => (
                        <div
                          key={product.id}
                          className="w-12 h-12 relative rounded-md overflow-hidden border border-white/40 mb-1 transform translate-x-2 group-hover:translate-x-0 transition-transform duration-300"
                          style={{ transitionDelay: `${index * 80}ms` }}
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            loading="lazy"
                            quality={60}
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </MotionCard>
                )}
                {/* Casual Collection - Small Square */}
                {collections.casual?.length > 0 && (
                  <MotionCard
                    className={`${cardBaseClasses} w-72 lg:w-80 h-full flex-shrink-0`}
                  >
                    <div className={shimmerEffectClasses} />
                    <MotionImage
                      animation={{ type: "zoom", duration: 0.8 }}
                      src={collections.casual[2].image}
                      alt={collections.casual[2].name}
                      fill
                      loading="lazy"
                      quality={75}
                      sizes="320px"
                      className="w-full h-full object-cover"
                      hover={{ scale: 1.05, duration: 0.6 }}
                      triggerOnce={true}
                    />
                    <div className="absolute inset-0 bg-emerald/70 group-hover:bg-emerald/40 transition-all duration-500" />
                    <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-emerald/30 transition-all duration-300" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                        <h4 className="text-lg lg:text-xl font-bold text-white mb-1 font-primary-serif">
                          Casual Comfort
                        </h4>
                        <p className="text-white/80 text-sm font-secondary-sans">
                          {collections.casual.length} Items
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-400 delay-100">
                      {collections.casual.slice(1, 2).map((product) => (
                        <div
                          key={product.id}
                          className="w-10 h-10 rounded border border-white/40 overflow-hidden transform translate-x-1 group-hover:translate-x-0 transition-transform duration-300 relative"
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            loading="lazy"
                            quality={60}
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </MotionCard>
                )}
              </div>
            </div>
            {/* Tablet Layout */}
            <div className="hidden md:block lg:hidden">
              <div className="grid grid-cols-8 gap-6 auto-rows-[minmax(240px,_auto)]">
                {/* Large Featured Tile */}
                {collections[currentSeason]?.length > 0 && (
                  <MotionCard
                    className={`${cardBaseClasses} col-span-5 row-span-2`}
                  >
                    <div className={shimmerEffectClasses} />
                    <MotionImage
                      src={collections[currentSeason][1].image}
                      alt={collections[currentSeason][1].name}
                      fill
                      loading="lazy"
                      quality={75}
                      sizes="(min-width: 768px) 62.5vw, 100vw"
                      className="object-cover object-top"
                      hover={{ scale: 1.05, duration: 0.7 }}
                    />
                    <div className="absolute inset-0 bg-charcoal/60 group-hover:bg-charcoal/20 transition-all duration-700 ease-out" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className="transform-gpu translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <h3 className="text-4xl font-bold text-white mb-4 font-primary-serif">
                          {currentSeason === "summer" ? "Summer" : "Winter"}
                        </h3>
                        <p className="text-white/90 text-lg font-secondary-sans opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                          {collections[currentSeason].length} Items Available
                        </p>
                      </div>
                    </div>
                  </MotionCard>
                )}
                {/* Men's Collection */}
                {collections.men?.length > 0 && (
                  <MotionCard className={`${cardBaseClasses} col-span-3`}>
                    <div className={shimmerEffectClasses} />
                    <MotionImage
                      src={collections.men[2].image}
                      alt={collections.men[2].name}
                      fill
                      loading="lazy"
                      quality={75}
                      sizes="(max-width: 1024px) 40vw, 30vw"
                      className="object-cover"
                      hover={{ scale: 1.05, duration: 0.7 }}
                    />
                    <div className="absolute inset-0 bg-charcoal/70 group-hover:bg-charcoal/40 transition-all duration-500" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-xl font-bold text-white mb-1 font-primary-serif">
                        Men Essential
                      </h4>
                      <p className="text-white/80 text-sm font-secondary-sans">
                        {collections.men.length} Items
                      </p>
                    </div>
                  </MotionCard>
                )}
                {/* Women's Collection */}
                {collections.women?.length > 0 && (
                  <MotionCard
                    className={`${cardBaseClasses} col-span-3 bg-gradient-jewel`}
                  >
                    <div className={shimmerEffectClasses} />
                    <MotionImage
                      src={collections.women[0].image}
                      alt={collections.women[0].name}
                      fill
                      loading="lazy"
                      quality={75}
                      sizes="(max-width: 1024px) 40vw, 30vw"
                      className="object-cover"
                      hover={{ scale: 1.05, duration: 0.7 }}
                    />
                    <div className="absolute inset-0 bg-ruby/60 group-hover:bg-ruby/30 transition-all duration-500" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-xl font-bold text-white mb-1 font-primary-serif">
                        Women Elegance
                      </h4>
                      <p className="text-white/80 text-sm font-secondary-sans">
                        {collections.women.length} Items
                      </p>
                    </div>
                  </MotionCard>
                )}
                {/* Casual Collection */}
                {collections.casual?.length > 0 && (
                  <MotionCard className={`${cardBaseClasses} col-span-4`}>
                    <div className={shimmerEffectClasses} />
                    <MotionImage
                      src={collections.casual[0].image}
                      alt={collections.casual[0].name}
                      fill
                      loading="lazy"
                      quality={75}
                      sizes="(max-width: 1024px) 50vw, 40vw"
                      className="object-cover"
                      hover={{ scale: 1.05, duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-emerald/70 group-hover:bg-emerald/40 transition-all duration-500" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-lg font-bold text-white mb-1 font-primary-serif">
                        Casual Comfort
                      </h4>
                      <p className="text-white/80 text-sm font-secondary-sans">
                        {collections.casual.length} Items
                      </p>
                    </div>
                  </MotionCard>
                )}
                {/* Opposite Season */}
                {collections[currentSeason === "summer" ? "winter" : "summer"]
                  ?.length > 0 && (
                  <MotionCard className={`${cardBaseClasses} col-span-4`}>
                    <div className={shimmerEffectClasses} />
                    <MotionImage
                      src={
                        collections[
                          currentSeason === "summer" ? "winter" : "summer"
                        ][2].image
                      }
                      alt={
                        collections[
                          currentSeason === "summer" ? "winter" : "summer"
                        ][2].name
                      }
                      fill
                      loading="lazy"
                      quality={75}
                      sizes="(max-width: 1024px) 50vw, 40vw"
                      className="object-cover"
                      hover={{ scale: 1.05, duration: 0.6 }}
                    />
                    <div
                      className={`absolute inset-0 ${
                        currentSeason === "summer"
                          ? "bg-charcoal/70 group-hover:bg-charcoal/40"
                          : "bg-metal-gold/70 group-hover:bg-metal-gold/40"
                      } transition-all duration-500`}
                    />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-lg font-bold text-white mb-1 font-primary-serif">
                        {currentSeason === "summer"
                          ? "Winter Preview"
                          : "Summer Preview"}
                      </h4>
                      <p className="text-white/80 text-sm font-secondary-sans">
                        {
                          collections[
                            currentSeason === "summer" ? "winter" : "summer"
                          ].length
                        }
                        Items
                      </p>
                    </div>
                  </MotionCard>
                )}
              </div>
            </div>
            {/* Mobile Layout */}
            <div className="md:hidden space-y-6">
              {/* Current Season - Full Width Hero */}
              {collections[currentSeason]?.length > 0 && (
                <MotionCard className="relative overflow-hidden rounded-3xl group cursor-pointer shadow-2xl h-[400px]">
                  <div className={shimmerEffectClasses} />
                  <MotionImage
                    src={collections[currentSeason][1].image}
                    alt={collections[currentSeason][1].name}
                    fill
                    loading="lazy"
                    quality={75}
                    sizes="100vw"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-charcoal/60 group-hover:bg-charcoal/20 transition-all duration-700" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-3xl font-bold text-white mb-2 font-primary-serif">
                      {currentSeason === "summer" ? "Summer" : "Winter"}
                    </h3>
                    <p className="text-white/90 text-base font-secondary-sans">
                      {collections[currentSeason].length} Items Available
                    </p>
                  </div>
                </MotionCard>
              )}
              {/* Two Column Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Men's Collection */}
                {collections.men?.length > 0 && (
                  <MotionCard className="relative overflow-hidden rounded-3xl group cursor-pointer shadow-xl h-[250px]">
                    <div className={shimmerEffectClasses} />
                    <MotionImage
                      src={collections.men[2].image}
                      alt={collections.men[2].name}
                      fill
                      loading="lazy"
                      quality={75}
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-charcoal/70 group-hover:bg-charcoal/40 transition-all duration-500" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-lg font-bold text-white mb-1 font-primary-serif">
                        Men Essential
                      </h4>
                      <p className="text-white/80 text-xs font-secondary-sans">
                        {collections.men.length} Items
                      </p>
                    </div>
                  </MotionCard>
                )}
                {/* Women's Collection */}
                {collections.women?.length > 0 && (
                  <MotionCard className="relative overflow-hidden rounded-3xl group cursor-pointer shadow-xl h-[250px] bg-gradient-jewel">
                    <div className={shimmerEffectClasses} />
                    <MotionImage
                      src={collections.women[0].image}
                      alt={collections.women[0].name}
                      fill
                      loading="lazy"
                      quality={75}
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-ruby/60 group-hover:bg-ruby/30 transition-all duration-500" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-lg font-bold text-white mb-1 font-primary-serif">
                        Women Elegance
                      </h4>
                      <p className="text-white/80 text-xs font-secondary-sans">
                        {collections.women.length} Items
                      </p>
                    </div>
                  </MotionCard>
                )}
              </div>
              {/* Single Column for Remaining */}
              <div className="space-y-4">
                {/* Casual Collection */}
                {collections.casual?.length > 0 && (
                  <MotionCard className="relative overflow-hidden rounded-3xl group cursor-pointer shadow-lg h-[200px]">
                    <div className={shimmerEffectClasses} />
                    <MotionImage
                      src={collections.casual[0].image}
                      alt={collections.casual[0].name}
                      fill
                      quality={75}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-emerald/70 group-hover:bg-emerald/40 transition-all duration-500" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-lg font-bold text-white mb-1 font-primary-serif">
                        Casual Comfort
                      </h4>
                      <p className="text-white/80 text-sm font-secondary-sans">
                        {collections.casual.length} Items
                      </p>
                    </div>
                  </MotionCard>
                )}
                {/* Opposite Season */}
                {collections[currentSeason === "summer" ? "winter" : "summer"]
                  ?.length > 0 && (
                  <MotionCard className="relative overflow-hidden rounded-3xl group cursor-pointer shadow-lg h-[200px]">
                    <div className={shimmerEffectClasses} />
                    <MotionImage
                      src={
                        collections[
                          currentSeason === "summer" ? "winter" : "summer"
                        ][2].image
                      }
                      alt={
                        collections[
                          currentSeason === "summer" ? "winter" : "summer"
                        ][2].name
                      }
                      fill
                      loading="lazy"
                      quality={75}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div
                      className={`absolute inset-0 ${
                        currentSeason === "summer"
                          ? "bg-charcoal/70 group-hover:bg-charcoal/40"
                          : "bg-metal-gold/70 group-hover:bg-metal-gold/40"
                      } transition-all duration-500`}
                    />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-lg font-bold text-white mb-1 font-primary-serif">
                        {currentSeason === "summer"
                          ? "Winter Preview"
                          : "Summer Preview"}
                      </h4>
                      <p className="text-white/80 text-sm font-secondary-sans">
                        {
                          collections[
                            currentSeason === "summer" ? "winter" : "summer"
                          ].length
                        }
                        Items
                      </p>
                    </div>
                  </MotionCard>
                )}
              </div>
            </div>
          </div>
          {/* Call-to-Action */}
          <div className="mt-20 text-center">
            <MotionButton
              href="/products"
              variant="brand"
              size="xl"
              className="cursor-magnetic font-accent tracking-wide shadow-2xl px-12 py-4"
              magnetic={{ enabled: true, strength: 0.4, radius: 120 }}
              ripple={{ enabled: true, color: "hsla(var(--metal-gold) / 0.4)" }}
            >
              <span className="flex items-center gap-4 text-lg">
                Explore All Collections
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </MotionButton>
          </div>
        </div>
      </div>
    </MotionSection>
  );
};

export default FeaturedCollection;
