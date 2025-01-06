import Link from "next/link";
import { Button } from "../ui/button";
import HeroCarousel from "./HeroCarousel";

const Hero = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl">
          New age of Shopping.
        </h1>
        <p className="mt-8 max-w-xl text-lg text-muted-foreground leading-8">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi libero
          exercitationem adipisci unde voluptate ullam reiciendis facilis
          delectus excepturi nihil ea, quidem numquam, itaque ipsam laboriosam
          inventore eos aspernatur aut.
        </p>
        <Button asChild size="lg" className="mt-10">
          <Link href="/products">Our Products</Link>
        </Button>
      </div>
      <HeroCarousel />
    </section>
  );
};

export default Hero;
