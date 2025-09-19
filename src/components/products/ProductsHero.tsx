import { Suspense } from "react";
import SearchBar from "./SearchBar";

const ProductsHero = ({ currentSearch }: { currentSearch?: string }) => {
  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32 text-center">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
      radial-gradient(circle at 15% 20%, hsla(var(--brand-accent) / 0.2), transparent 45%),
      radial-gradient(circle at 85% 75%, hsla(var(--metal-gold) / 0.15), transparent 50%)
    `,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 left-1/4 w-40 h-40 bg-pastel-mint/20 rounded-full animate-float blur-2xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-52 h-52 bg-pastel-blush/25 rounded-full animate-float [animation-delay:-2s] blur-2xl"
        aria-hidden="true"
      />
      <div className="container relative z-10 mx-auto px-4">
        <h1 className="h1 bg-gradient-to-r from-charcoal via-foreground to-metal-gold bg-clip-text text-transparent mb-6 glow-text">
          {currentSearch
            ? `Results for "${currentSearch}"`
            : "Discover Our Collection"}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Curated pieces for the modern wardrobe. Find your next favorite style.
        </p>
        <Suspense>
          <SearchBar />
        </Suspense>
      </div>
    </section>
  );
};

export default ProductsHero;
