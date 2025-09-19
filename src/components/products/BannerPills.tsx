"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function CategoryPillsClient({
  currentCategory,
  featuredCategories,
}: {
  currentCategory: string;
  featuredCategories: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setCategory = (nextCategory: string) => {
    const sp = new URLSearchParams(searchParams?.toString());
    if (!nextCategory || nextCategory === "all") sp.delete("category");
    else sp.set("category", nextCategory);
    router.push(`/products?${sp.toString()}`, { scroll: true });
  };

  return (
    <div className="flex justify-center gap-3 flex-wrap">
      <Button
        variant={currentCategory === "all" ? "secondary" : "outline"}
        className={`rounded-full cursor-pointer px-6 py-2 transition-all duration-300 hover:scale-105 ${
          currentCategory === "all"
            ? "bg-background text-gray-900 shadow-lg"
            : "bg-background/20 text-background border-background/30 hover:bg-background/30 backdrop-blur-sm"
        }`}
        onClick={() => setCategory("all")}
      >
        All Products
      </Button>
      {featuredCategories.map((cat) => (
        <Button
          key={cat}
          variant={currentCategory === cat ? "secondary" : "outline"}
          className={`rounded-full cursor-pointer px-6 py-2 transition-all duration-300 hover:scale-105 capitalize ${
            currentCategory === cat
              ? "bg-white text-gray-900 shadow-lg"
              : "bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm"
          }`}
          onClick={() => setCategory(cat)}
        >
          {cat}
        </Button>
      ))}
    </div>
  );
}
