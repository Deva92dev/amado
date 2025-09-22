import dynamic from "next/dynamic";
import { Suspense } from "react";
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

const SocialProof = dynamic(() => import("@/components/home/SocialProof"), {
  loading: () => <SocialProofGridSkeleton />,
});

// inline above the fold css
export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<FeaturedCollectionSkeleton />}>
        <FeaturedCollection />
      </Suspense>
      <Suspense fallback={<BrandStorySkeleton />}>
        <BrandStory />
      </Suspense>
      <Suspense fallback={<TrendingProductsSkeleton />}>
        <TrendingProducts />
      </Suspense>
      <SocialProof />
      <Suspense fallback={<NewsLetterSkeleton />}>
        <NewsLetter />
      </Suspense>
    </>
  );
}
