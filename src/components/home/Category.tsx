import Image from "next/image";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Link from "next/link";

const images = [
  "/images/Men.webp",
  "/images/Women.webp",
  "/images/Summer.webp",
  "/images/Winter.webp",
];

const Category = () => {
  return (
    <section className="pt-24">
      <h2 className="capitalize mb-8 tracking-wider font-medium text-3xl text-start">
        Collections
      </h2>
      <Separator />
      <div className="grid grid-cols-1 gap-4 pt-12 md:grid-cols-[1fr_1fr_2fr] md:gap-6 md:min-h-[60vh] lg:max-h-[800px]">
        {/* First Column - Men */}
        <div className="relative group overflow-hidden rounded-xl h-[300px] md:h-full">
          <Image
            src={images[0]}
            alt="Men's Collection"
            fill
            loading="lazy"
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="object-cover bg-gradient-to-t from-black/30 to-transparent transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <Link href="/products">
            <Button className="absolute right-8 bottom-4 text-white text-xl md:text-2xl font-bold bg-inherit">
              Explore
            </Button>
          </Link>
        </div>

        {/* Second Column - Women */}
        <div className="relative group overflow-hidden rounded-xl h-[300px] md:h-full">
          <Image
            src={images[1]}
            alt="Women's Collection"
            fill
            loading="lazy"
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="object-cover bg-gradient-to-t from-black/30 to-transparent transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <Link href="/products">
            <Button className="absolute right-8 bottom-4 text-white text-xl md:text-2xl font-bold bg-inherit">
              Explore
            </Button>
          </Link>
        </div>

        {/* Third Column - Winter & Summer */}
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="relative group overflow-hidden rounded-xl h-[300px] md:h-full">
            <Image
              src={images[3]}
              alt="Winter Collection"
              fill
              loading="lazy"
              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
              className="object-cover bg-gradient-to-t from-black/30 to-transparent transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <Link href="/products">
              <Button className="absolute right-8 bottom-4 text-white text-xl md:text-2xl font-bold bg-inherit">
                Winter
              </Button>
            </Link>
          </div>
          <div className="relative group overflow-hidden rounded-xl h-[300px] md:h-full">
            <Image
              src={images[2]}
              alt="Summer Collection"
              fill
              loading="lazy"
              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
              className="object-cover bg-gradient-to-t from-black/30 to-transparent transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <Link href="/products">
              <Button className="absolute right-8 bottom-4 text-white text-xl md:text-2xl font-bold bg-inherit">
                Summer
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
