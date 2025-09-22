import dynamic from "next/dynamic";
import { Sparkles, TrendingUp, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SlidesClientSkeleton } from "./SlidesClientSkeleton";
import CategoryPillsSkeleton from "./CategoryPillsSkeleton";
import ScrollDownClient from "./BannerScrollDown";

type Props = {
  totalProducts?: number;
  currentCategory?: string;
  featuredCategories?: string[];
  currentSearch?: string;
};

const SlidesClient = dynamic(
  () => import("@/components/products/BannerSlides"),
  {
    loading: () => <SlidesClientSkeleton />,
  }
);

const CategoryPillsClient = dynamic(
  () => import("@/components/products/BannerPills"),
  {
    loading: () => <CategoryPillsSkeleton />,
  }
);

// Move static data outside component to prevent re-creation
const heroSlides = [
  {
    title: "Discover Our Collection",
    subtitle: "Curated pieces for the modern wardrobe",
    description:
      "Find your next favorite style from our carefully selected collection",
    gradient:
      "bg-gradient-to-br from-[hsl(var(--brand-accent))] via-[hsl(var(--sapphire))] to-[hsl(var(--pastel-lavender))]",
    accent: "text-background/90",
  },
  {
    title: "New Arrivals Weekly",
    subtitle: "Stay ahead of the trends",
    description: "Fresh styles added every week to keep your wardrobe current",
    gradient:
      "bg-gradient-to-br from-[hsl(var(--emerald))] via-[hsl(var(--brand-accent))] to-[hsl(var(--pastel-mint))]",
    accent: "text-background/90",
  },
  {
    title: "Premium Quality",
    subtitle: "Crafted with care",
    description:
      "Each piece is selected for quality, style, and lasting appeal",
    gradient:
      "bg-gradient-to-br from-[hsl(var(--ruby))] via-[hsl(var(--metal-gold))] to-[hsl(var(--pastel-blush))]",
    accent: "text-background/90",
  },
] as const;

// Memoize badge components to prevent re-renders
const StaticBadges = () => (
  <div className="flex justify-center gap-3 flex-wrap pt-8">
    <Badge
      variant="secondary"
      className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
    >
      <Sparkles className="w-3 h-3 mr-1" aria-hidden="true" />
      New Collection
    </Badge>
    <Badge
      variant="secondary"
      className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
    >
      <TrendingUp className="w-3 h-3 mr-1" aria-hidden="true" />
      Trending Now
    </Badge>
    <Badge
      variant="secondary"
      className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
    >
      <Star className="w-3 h-3 mr-1" aria-hidden="true" />
      Premium Quality
    </Badge>
  </div>
);

export default function ProductsBanner({
  totalProducts = 0,
  currentCategory = "all",
  featuredCategories = [],
  currentSearch,
}: Props) {
  const staticSlide = heroSlides[0];
  const rotatingSlides = heroSlides.slice(1);

  return (
    <section
      className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden py-24"
      aria-labelledby="products-hero-title"
    >
      {/* Static background - render first for better CLS */}
      <div className={`absolute inset-0 ${staticSlide.gradient}`} />
      <SlidesClient slides={rotatingSlides} />
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Static badges */}
          <StaticBadges />
          {/* Hero content */}
          <div className="space-y-6">
            <h1
              id="products-hero-title"
              className="text-5xl md:text-7xl font-bold leading-tight"
            >
              {staticSlide.title}
              <span className="block text-2xl md:text-3xl font-normal mt-2 opacity-90">
                {staticSlide.subtitle}
              </span>
            </h1>
            <p
              className={`text-lg md:text-xl ${staticSlide.accent} max-w-2xl mx-auto leading-relaxed`}
            >
              {staticSlide.description}
            </p>
          </div>
          {/* Stats - optimize rendering */}
          <div
            className="flex justify-center items-center gap-8 text-sm"
            role="group"
            aria-label="Store statistics"
          >
            <div className="text-center">
              <div className="text-2xl font-bold">{totalProducts}+</div>
              <div className="opacity-80">Products</div>
            </div>
            <div className="h-8 w-px bg-white/30" aria-hidden="true" />
            <div className="text-center">
              <div className="text-2xl font-bold">
                {featuredCategories.length}
              </div>
              <div className="opacity-80">Categories</div>
            </div>
            <div className="h-8 w-px bg-white/30" aria-hidden="true" />
            <div className="text-center">
              <div className="text-2xl font-bold">4.9</div>
              <div className="opacity-80">Rating</div>
            </div>
          </div>
          {/* Conditional rendering - optimize DOM */}
          {!currentSearch && featuredCategories.length > 0 && (
            <CategoryPillsClient
              currentCategory={currentCategory}
              featuredCategories={featuredCategories}
            />
          )}
          {/* Search results info */}
          {currentSearch && (
            <div role="status" aria-live="polite">
              <p className="text-lg opacity-90">
                Showing results for{" "}
                <span className="font-semibold">{currentSearch}</span>
              </p>
            </div>
          )}
          <ScrollDownClient />
        </div>
      </div>
    </section>
  );
}
