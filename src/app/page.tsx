import dynamic from "next/dynamic";
import { Metadata } from "next";
import Hero from "@/components/home/Hero";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import BrandStory from "@/components/home/BrandStory";
import TrendingProducts from "@/components/home/TrendingProducts";
import NewsLetter from "@/components/home/NewsLetter";
import { SocialProofGridSkeleton } from "@/components/skeleton/SocialProofSkeleton";
import { TrendingProductsSkeleton } from "@/components/skeleton/TrendingProducts";
import BrandStorySkeleton from "@/components/skeleton/BrandStorySkeleton";
import FeaturedCollectionSkeleton from "@/components/skeleton/featuredCollectionSkeleton";
import NewsLetterSkeleton from "@/components/skeleton/NewsLetterSkeleton";
import { AnimatedSection } from "@/components/home/SectionWrapper";

const SocialProof = dynamic(() => import("@/components/home/SocialProof"), {
  loading: () => <SocialProofGridSkeleton />,
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
    url: "/opengraph-image.jpg",
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
      <AnimatedSection hasAsyncData={false} delay={0.4}>
        <SocialProof />
      </AnimatedSection>
      <AnimatedSection fallback={<NewsLetterSkeleton />} delay={0.5}>
        <NewsLetter />
      </AnimatedSection>
    </>
  );
}
