"use client";

import { useMotionValue, useSpring, useTransform, m } from "motion/react";
import Image from "next/image";
import { FeaturedProducts } from "@/utils/types";

type Product3dCardProps = {
  product: FeaturedProducts;
  offset: number;
};

const Product3dCard = ({ product, offset }: Product3dCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isSideCard = offset !== 0;
  const bendDirection = Math.sign(offset);

  return (
    <div
      className="w-80 md:w-lg h-[450px] md:h-[500px]"
      style={{ perspective: "1000px" }}
    >
      <m.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full rounded-3xl bg-gradient-to-br from-muted/50 to-muted/20 p-2 shadow-2xl"
      >
        <div className="absolute inset-0 rounded-[22px] bg-background/80" />
        {/* parallax layer 1, Image */}
        <m.div
          className="absolute overflow-hidden inset-0 rounded-xl"
          style={{
            // Set the "hinge" based on the card's position
            transformOrigin:
              bendDirection === -1
                ? "right center" // Left card hinges on its right side
                : "left center", // Right card hinges on its left side
            transformStyle: "preserve-3d",
          }}
          animate={{
            // Apply rotation only if it's a side card
            rotateY: isSideCard ? bendDirection * -18 : 0, // 18-degree bend
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <Image
            src={product.image ? product.image : ""}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80vw, 33vw"
          />
        </m.div>
        {/* Parallax Layer 2: Info */}
        <m.div
          className="absolute bottom-8 left-8 text-background"
          style={{
            transform: "translateZ(70px)",
            textShadow: "0px 1px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          <h3 className="font-bold text-background dark:text-foreground text-xl md:text-2xl">
            {product.name}
          </h3>
          <p className="text-gold font-bold">{product.price}</p>
        </m.div>
        {/* Parallax Layer 3: Button */}
        <m.button
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 0px 20px rgba(255, 215, 0, 0.5)",
          }}
          className="absolute bottom-8 right-8 w-12 h-12 bg-gold text-background rounded-full font-bold text-xl"
          style={{ transform: "translateZ(50px)" }}
        >
          +
        </m.button>
      </m.div>
    </div>
  );
};

export default Product3dCard;
