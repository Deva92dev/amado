"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

interface HeroVideoProps {
  mp4Url: string;
  webMUrl: string;
}

const HeroVideo = ({ mp4Url, webMUrl }: HeroVideoProps) => {
  const [isVideoReady, setIsVideoReady] = useState(false);

  const handleVideoReady = useCallback(() => {
    setIsVideoReady(true);
  }, []);

  return (
    <>
      <Image
        src="/media/HeroWeb.webp"
        alt="Fashion model in trench coat sitting on outdoor iron stairs"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <video
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isVideoReady ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/Hero.webp"
        onCanPlayThrough={handleVideoReady}
        aria-label="Hero background video"
      >
        <source src={webMUrl} type="video/webm" />
        <source src={mp4Url} type="video/mp4" />
      </video>
    </>
  );
};

export default HeroVideo;
