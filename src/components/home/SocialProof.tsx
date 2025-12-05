"use client";
import { m, Variants } from "motion/react";
import { socialPosts } from "@/lib/SocialProof";
import { SocialProofCard } from "./SocialProofCard";

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, rotate: -3 }, // Start slightly smaller and rotated
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 20,
    },
  },
};

const SocialProof = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-primary-serif text-center mb-12 glass-effect magnetic-hover glow-text">
          Our Community Style
        </h2>
        <m.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[280px] gap-4"
          variants={cardVariants}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {socialPosts.map((post) => (
            <SocialProofCard key={post.id} post={post} />
          ))}
        </m.div>
      </div>
    </section>
  );
};

export default SocialProof;
