import dynamicImport from "next/dynamic";
import { Metadata } from "next";
import Hero from "@/components/home/Hero";
import { SocialProofGridSkeleton } from "@/components/skeleton/SocialProofSkeleton";
import { TrendingProductsSkeleton } from "@/components/skeleton/TrendingProducts";
import BrandStorySkeleton from "@/components/skeleton/BrandStorySkeleton";
import FeaturedCollectionSkeleton from "@/components/skeleton/featuredCollectionSkeleton";
import NewsLetterSkeleton from "@/components/skeleton/NewsLetterSkeleton";
import { AnimatedSection } from "@/components/home/SectionWrapper";

export const revalidate = 3600;
export const dynamic = "force-static";

const FeaturedCollection = dynamicImport(
  () => import("@/components/home/FeaturedCollection"),
  { loading: () => <FeaturedCollectionSkeleton /> }
);

const BrandStory = dynamicImport(() => import("@/components/home/BrandStory"), {
  loading: () => <BrandStorySkeleton />,
});

const TrendingProducts = dynamicImport(
  () => import("@/components/home/TrendingProducts"),
  { loading: () => <TrendingProductsSkeleton /> }
);

const SocialProof = dynamicImport(
  () => import("@/components/home/SocialProof"),
  {
    loading: () => <SocialProofGridSkeleton />,
  }
);

const NewsLetter = dynamicImport(() => import("@/components/home/NewsLetter"), {
  loading: () => <NewsLetterSkeleton />,
});

export const metadata: Metadata = {
  title: "Amado – Where Leisure Meets Luxury",
  description:
    "Enjoy the different styles with various option at Amado. Discover our trending products, featured collections, and premium clothing that combines comfort with elegance.",
  openGraph: {
    title: "Amado – Where Leisure Meets Luxury",
    description:
      "Enjoy the different styles with various option at Amado. Discover our trending products, featured collections, and premium clothing that combines comfort with elegance.",
    type: "website",
    url: "https://amado-zeta.vercel.app/",
  },
  twitter: {
    title: "Amado – Where Leisure Meets Luxury",
    description:
      "Enjoy the different styles with various option at Amado. Discover our trending products, featured collections, and premium clothing that combines comfort with elegance.",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      {/* Lazy Load the rest as user scrolls */}
      <AnimatedSection fallback={<FeaturedCollectionSkeleton />} delay={0.1}>
        <FeaturedCollection />
      </AnimatedSection>

      <AnimatedSection fallback={<BrandStorySkeleton />} delay={0.2}>
        <BrandStory />
      </AnimatedSection>

      <AnimatedSection fallback={<TrendingProductsSkeleton />} delay={0.3}>
        <TrendingProducts />
      </AnimatedSection>

      <AnimatedSection hasAsyncData={false} delay={0.4}>
        <SocialProof />
      </AnimatedSection>

      <AnimatedSection fallback={<NewsLetterSkeleton />} delay={0.5}>
        <NewsLetter />
      </AnimatedSection>
    </>
  );
}
