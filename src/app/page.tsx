import LoadingContainer from "@/components/global/LoadingContainer";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import { Suspense } from "react";
import { Metadata } from "next";
import Services from "@/components/home/Services";
import Category from "@/components/home/Category";

export const metadata: Metadata = {
  title: "Amado",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Category />
      <Suspense fallback={<LoadingContainer />}>
        <FeaturedProducts />
      </Suspense>
      <Services />
    </>
  );
}
