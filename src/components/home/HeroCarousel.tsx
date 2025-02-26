import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";

const images = [
  "/images/Hero.webp",
  "/images/Hero2.webp",
  "/images/Hero3.webp",
  "/images/Hero4.webp",
];

function HeroCarousel() {
  return (
    <div className="relative group">
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-video">
                <Image
                  src={image}
                  alt={`Hero image ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="rounded-lg object-cover"
                  sizes="(max-width: 768px) 100vw, 75vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation buttons */}
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 opacity-0 hover:scale-110" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 opacity-0 hover:scale-110" />
      </Carousel>
    </div>
  );
}

export default HeroCarousel;
