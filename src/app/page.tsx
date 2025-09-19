import dynamic from "next/dynamic";
import { Suspense } from "react";
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

export const metadata: Metadata = {
  title: "Amado - Where Leisure Meets Luxury",
  description: "Explore styles of different colors with Amado..",
  keywords: ["styles", "fashion", "retro", "ethnic", "amado"],
  alternates: {
    canonical: "/", // adds <link rel="canonical" href="https://your-domain.com/">
  },
  openGraph: {
    title: "Amado - Where Leisure Meets Luxury",
    description: "Explore styles of different colors with Amado.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amado - Where Leisure Meets Luxury",
    description: "Explore styles of different colors with Amado.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const SocialProof = dynamic(() => import("@/components/home/SocialProof"), {
  loading: () => <SocialProofGridSkeleton />,
});

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
