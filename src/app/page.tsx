import type { Metadata } from "next";
import dynamicImport from "next/dynamic";
import Hero from "@/components/home/Hero";
import SocialProof from "@/components/home/SocialProof";
import { AnimatedSection } from "@/components/home/SectionWrapper";
import { SocialProofGridSkeleton } from "@/components/skeleton/SocialProofSkeleton";
import { TrendingProductsSkeleton } from "@/components/skeleton/TrendingProducts";
import BrandStorySkeleton from "@/components/skeleton/BrandStorySkeleton";
import FeaturedCollectionSkeleton from "@/components/skeleton/featuredCollectionSkeleton";
import NewsLetterSkeleton from "@/components/skeleton/NewsLetterSkeleton";

export const revalidate = 3600;
export const dynamic = "force-static";

const FeaturedCollection = dynamicImport(
  () => import("@/components/home/FeaturedCollection"),
  { loading: () => <FeaturedCollectionSkeleton /> },
);

const BrandStory = dynamicImport(() => import("@/components/home/BrandStory"), {
  loading: () => <BrandStorySkeleton />,
});

const TrendingProducts = dynamicImport(
  () => import("@/components/home/TrendingProducts"),
  { loading: () => <TrendingProductsSkeleton /> },
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
      <AnimatedSection fallback={<FeaturedCollectionSkeleton />} delay={0.1}>
        <FeaturedCollection />
      </AnimatedSection>

      <AnimatedSection fallback={<BrandStorySkeleton />} delay={0.2}>
        <BrandStory />
      </AnimatedSection>

      <AnimatedSection fallback={<TrendingProductsSkeleton />} delay={0.3}>
        <TrendingProducts />
      </AnimatedSection>

      <AnimatedSection fallback={<SocialProofGridSkeleton />} hasAsyncData={false}>
        <SocialProof />
      </AnimatedSection>

      <AnimatedSection fallback={<NewsLetterSkeleton />} delay={0.5}>
        <NewsLetter />
      </AnimatedSection>
    </>
  );
}
