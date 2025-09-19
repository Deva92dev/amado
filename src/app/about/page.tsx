import { Users, Award, Heart, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const team = [
  {
    name: "Alex Mercer",
    role: "Founder & Creative Director",
    image: "/media/Testim1.webp",
    description:
      "Fashion visionary dedicated to timeless designs and sustainable fabrics.",
  },
  {
    name: "Samira Patel",
    role: "Head of Design",
    image: "/media/Testim2.webp",
    description: "Expert in modern silhouettes and trend forecasting.",
  },
  {
    name: "Rafael Gomez",
    role: "Lead Tailor",
    image: "/media/Testim3.webp",
    description: "Craftsman with eye for detail and quality finishing.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] mb-20 overflow-hidden">
        <Image
          src="/media/About.webp"
          alt="Amado Clothing"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary))/0.85] to-[hsl(var(--accent))/0.35] flex flex-col justify-center px-6 sm:px-12 md:px-20 text-white">
          <h1 className="text-5xl font-serif font-black leading-tight mb-4 max-w-3xl">
            Redefining Timeless Style
          </h1>
          <p className="text-lg max-w-2xl font-light mb-8">
            Amado is dedicated to crafting elegant, sustainable fashion pieces
            that empower your identity with confidence.
          </p>
          <Button
            className="btn-accent px-8 py-3 w-max font-semibold shadow-lg hover:shadow-xl transition"
            asChild
          >
            <Link href="/products">Shop Our Collection</Link>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl text-center mb-24">
        {[
          { icon: Award, label: "Years of Excellence", value: "10+" },
          { icon: Users, label: "Happy Customers", value: "50K+" },
          { icon: CheckCircle, label: "Sustainable Materials", value: "100%" },
          { icon: Heart, label: "Passion for Fashion", value: "Unmatched" },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex flex-col items-center gap-3">
            <Icon className="text-[hsl(var(--brand-accent))] w-14 h-14" />
            <h3 className="text-3xl font-bold">{value}</h3>
            <p className="text-[hsl(var(--muted-foreground))] uppercase tracking-wide">
              {label}
            </p>
          </div>
        ))}
      </section>

      {/* Our Story Section */}
      <section className="max-w-4xl mx-auto px-6 mb-32 text-center">
        <h2 className="text-4xl font-serif font-black mb-8 text-[hsl(var(--accent))]">
          Our Story
        </h2>
        <p className="mb-6 text-lg text-[hsl(var(--foreground))] leading-relaxed">
          Founded in 2013, Amado was born from the belief that fashion should
          transcend trends and empower individuality. Each collection is
          thoughtfully created using eco-friendly fabrics and crafted by
          experienced artisans.
        </p>
        <p className="text-lg text-[hsl(var(--foreground))] leading-relaxed">
          We embrace sustainable luxury, ensuring every piece is not only
          timeless but ethically made. Explore our journey and experience a
          brand where style meets conscience.
        </p>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-6 max-w-6xl mb-32">
        <h2 className="text-4xl font-serif font-black mb-12 text-[hsl(var(--accent))] text-center">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-16 text-center">
          {team.map(({ name, role, description, image }) => (
            <div key={name} className="space-y-4">
              <div className="relative w-44 h-44 mx-auto rounded-full overflow-hidden shadow-lg">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 80vw, (max-width: 1200px) 25vw"
                  priority
                />
              </div>
              <h3 className="text-xl font-semibold">{name}</h3>
              <p className="text-[hsl(var(--accent-foreground))] font-semibold">
                {role}
              </p>
              <p className="text-[hsl(var(--muted-foreground))]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
