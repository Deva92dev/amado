"use client";

import { m, Variants } from "motion/react";
import Image from "next/image";
import { CheckCircle, Heart, MessageCircle } from "lucide-react";
import { SocialPost } from "@/lib/SocialProof";

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
};

interface SocialProofCardProps {
  post: SocialPost;
}

export const SocialProofCard = ({ post }: SocialProofCardProps) => {
  // row spans for different aspect ratios for the masonry effect
  const getRowSpan = (aspectRatio: "square" | "tall" | "wide") => {
    switch (aspectRatio) {
      case "tall":
        return "lg:row-span-2";
      case "wide":
        return "lg:col-span-2";
      case "square":
        return "row-span-1";
    }
  };

  return (
    <m.div
      variants={cardVariants}
      className={`relative rounded-2xl overflow-hidden group group bg-card cursor-pointer transition-all duration-300 ease-in-out hover:scale-[1.02] hover:z-10 hover:shadow-2xl ${getRowSpan(
        post.aspectRatio
      )}`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Image
        src={post.imageUrl}
        alt={post.imageAlt}
        width={500}
        height={500}
        loading="lazy"
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/80 to-ruby/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
      {/* Overlay for user info and engagement */}
      <div className="absolute bottom-0 left-0 p-4 text-background w-full">
        <div className="text-background w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
          <div className="flex items-center justify-between">
            {/* User Info */}
            <div className="flex items-center gap-2">
              <Image
                src={post.user.avatarUrl}
                alt={post.user.name}
                width={32}
                height={32}
                loading="lazy"
                className="rounded-full h-8 w-8 object-cover"
              />
              <span className="font-semibold text-sm">
                {post.user.username}
              </span>
              {post.user.verified && (
                <CheckCircle className="w-4 h-4 text-brand-accent" />
              )}
            </div>
            {/* Engagement Metrics */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" /> {post.likes}
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" /> {post.comments}
              </div>
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
};
