import dynamic from "next/dynamic";
import { Sparkles, TrendingUp, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SlideText } from "./BannerSlides";
import { SlidesClientSkeleton } from "./SlidesClientSkeleton";
import CategoryPillsSkeleton from "./CategoryPillsSkeleton";
import ScrollDownClient from "./BannerScrollDown";

type Props = {
  totalProducts?: number;
  currentCategory?: string;
  featuredCategories?: string[];
  currentSearch?: string;
};

const heroSlides = [
  {
    title: "Discover Our Collection",
    subtitle: "Curated pieces for the modern wardrobe",
    description:
      "Find your next favorite style from our carefully selected collection",
    // Electric brand accent blended with sapphire and pastel lavender
    gradient:
      "bg-gradient-to-br from-[hsl(var(--brand-accent))] via-[hsl(var(--sapphire))] to-[hsl(var(--pastel-lavender))]",
    accent: "text-background/90",
  },
  {
    title: "New Arrivals Weekly",
    subtitle: "Stay ahead of the trends",
    description: "Fresh styles added every week to keep your wardrobe current",
    // Emerald to mint for freshness with brand accent mid-stop
    gradient:
      "bg-gradient-to-br from-[hsl(var(--emerald))] via-[hsl(var(--brand-accent))] to-[hsl(var(--pastel-mint))]",
    accent: "text-background/90",
  },
  {
    title: "Premium Quality",
    subtitle: "Crafted with care",
    description:
      "Each piece is selected for quality, style, and lasting appeal",
    // Ruby to gold for premium, softened with blush
    gradient:
      "bg-gradient-to-br from-[hsl(var(--ruby))] via-[hsl(var(--metal-gold))] to-[hsl(var(--pastel-blush))]",
    accent: "text-background/90",
  },
];

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

export default function ProductsBanner({
  totalProducts = 0,
  currentCategory = "all",
  featuredCategories = ["clothing", "accessories"],
  currentSearch,
}: Props) {
  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden py-24">
      <SlidesClient slides={heroSlides} />
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badges */}
          <div className="flex justify-center gap-3 flex-wrap pt-8">
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              New Collection
            </Badge>
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
            >
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending Now
            </Badge>
            <Badge
              variant="secondary"
              className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
            >
              <Star className="w-3 h-3 mr-1" />
              Premium Quality
            </Badge>
          </div>
          <SlideText slides={heroSlides} />
          {/* Stats */}
          <div className="flex justify-center items-center gap-8 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold">{totalProducts}+</div>
              <div className="opacity-80">Products</div>
            </div>
            <div className="h-8 w-px bg-white/30" />
            <div className="text-center">
              <div className="text-2xl font-bold">
                {featuredCategories.length}
              </div>
              <div className="opacity-80">Categories</div>
            </div>
            <div className="h-8 w-px bg-white/30" />
            <div className="text-center">
              <div className="text-2xl font-bold">4.9</div>
              <div className="opacity-80">Rating</div>
            </div>
          </div>
          {!currentSearch && (
            <CategoryPillsClient
              currentCategory={currentCategory}
              featuredCategories={featuredCategories}
            />
          )}
          {/* Search info */}
          {currentSearch && (
            <div>
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
