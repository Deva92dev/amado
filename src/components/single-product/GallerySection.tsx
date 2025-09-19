import { GallerySource } from "@/utils/types";
import ProductGallery from "./ProductGallery";

const GallerySection = ({
  image,
  className,
  equalHeightVar = "--equal-h",
}: {
  image: string;
  className?: string;
  equalHeightVar?: string;
}) => {
  const img: GallerySource = {
    main: { id: "1", image, alt: "Main View" },
    alt: { id: "2", image, alt: "Alternate View" },
    detail: { id: "3", image, alt: "Detail Shot" },
    warm: { id: "4", image, alt: "Warm Tone" },
    cool: { id: "5", image, alt: "Cool Tone" },
  };
  return (
    <ProductGallery img={img} start="main" equalHeightVar={equalHeightVar} />
  );
};

export default GallerySection;
