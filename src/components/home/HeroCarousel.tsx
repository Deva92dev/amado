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
  const imgWidth = 1920;
  const imgHeight = 1080;

  return (
    <div className="relative group">
      <Carousel
        opts={{
          loop: true,
          align: "start",
          containScroll: "trimSnaps",
        }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-video">
                <Image
                  src={image}
                  alt={`Hero image ${index + 1}`}
                  width={imgWidth}
                  height={imgHeight}
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                  className="w-full h-full object-cover rounded-lg transform hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 480px) 95vw, (max-width: 768px) 90vw, (max-width: 1200px) 85vw, 75vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation buttons */}
        <CarouselPrevious
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/30 backdrop-blur-sm transition-all duration-300 
          opacity-0 group-hover:opacity-100 hover:bg-white/50 hover:scale-110
          sm:h-10 sm:w-10
          h-8 w-8 max-sm:opacity-70"
        />
        <CarouselNext
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/30 backdrop-blur-sm transition-all duration-300
          opacity-0 group-hover:opacity-100 hover:bg-white/50 hover:scale-110
          sm:h-10 sm:w-10
          h-8 w-8 max-sm:opacity-70"
        />
      </Carousel>
    </div>
  );
}

export default HeroCarousel;
