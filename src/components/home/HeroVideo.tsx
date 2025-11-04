"use client";

import Image from "next/image";
import { useCallback, useState, useRef, useEffect } from "react";

interface HeroVideoProps {
  mp4Url: string;
  webMUrl: string;
}

const HeroVideo = ({ mp4Url, webMUrl }: HeroVideoProps) => {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadVideo(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleVideoReady = useCallback(() => setIsVideoReady(true), []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      {/*  fallback image */}
      <Image
        src="/Hero.webp"
        alt="Fashion model's cloth is flying behind camera"
        fill
        placeholder="blur"
        blurDataURL="data:image/webp;base64,UklGRkIDAABXRUJQVlA4WAoAAAAgAAAAawEAvwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggVAEAAJAWAJ0BKmwBwAA+7Xa3VqmnJSOgKAEwHYlpbt+x8rzX6iQdzc+QBWbteLmMtPbJyHvtk65I/trJrJCuuhW6skZ3RAXWQrKZ1KyvhJ0aYLLTuBF44Ye0qifGtlsnAZVFzpmaD3uflPy21+YPjxDvKV7Gb/JWvRGpJeeosxX2yt7jh9ExdJrz3U7Ui6nMuuVL06GiEyFYovIMZYZ8zK4nf58FkzM2r9PptsCBv8ip8zlx1AVZOBUcCrgk5hLHsAD+6a+owqAozIuIstvpBulpoMOPOgpOCpPnzF7YkWAKigy7PYByB8ZBLCNfJow0Ic9/GiERJiBBNFvoq/AOCY+uPSaMjE1EadiZjlPlMHMWqNOH+nR0ypbXAihuZ5q9wDhfS1/JZXxTKBxOPCf6gmPUkqAD0dJs7QChz00Szu1hNyZgaUDrc0K0QQOnPK4IFML9CP1gAAA="
        loading="lazy"
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, (max-width: 1536px) 80vw, 75vw"
        quality={60}
      />
      {loadVideo && (
        <video
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isVideoReady ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/Hero.webp"
          onCanPlayThrough={handleVideoReady}
          aria-label="Hero background video"
        >
          <source src={`${webMUrl}#t=0.1`} type="video/webm" />
          <source src={`${mp4Url}#t=0.1`} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default HeroVideo;
