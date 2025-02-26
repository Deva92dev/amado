import Link from "next/link";
import { Button } from "../ui/button";
import HeroCarousel from "./HeroCarousel";

const Hero = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="text-6xl md:text-8xl font-extrabold text-foreground">
          New age of <br />
          <span className="text-accent"> Shopping</span>
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto lg:mx-0">
          Fashion gives us a huge sense of value.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-6 px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg shadow-md hover:bg-[hsl(var(--accent)_/_80%)]"
        >
          <Link href="/products">Shop Now</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  );
};

export default Hero;
