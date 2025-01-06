import Image from "next/image";
import Hero1 from "../../../public/images/Hero1.jpg";
import Hero2 from "../../../public/images/Hero2.jpg";
import Hero3 from "../../../public/images/Hero3.jpg";
import Hero4 from "../../../public/images/Hero4.jpg";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

// change ui for more stunning look

const carouselImages = [Hero1, Hero2, Hero3, Hero4];

const HeroCarousel = () => {
  return (
    <div className="hidden lg:block">
      <Carousel>
        <CarouselContent>
          {carouselImages.map((image, index) => {
            return (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="p-2">
                    <Image
                      src={image}
                      alt="hero image"
                      className="w-full h-[24rem] rounded-md object-cover"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default HeroCarousel;
