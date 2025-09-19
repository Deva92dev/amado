import dynamic from "next/dynamic";
import { BadgePercent, Sparkles } from "lucide-react";
import SignupForm from "./SignupForm";

const MotionSection = dynamic(() =>
  import("../animations").then((mod) => mod.MotionSection)
);

const NewsLetter = () => {
  return (
    <MotionSection
      animation={{
        type: "bounce",
        duration: 1.2,
      }}
      className="relative overflow-hidden bg-background py-20 sm:py-28"
      style={{
        background:
          "linear-gradient(135deg, hsl(var(--background)), hsla(var(--pastel-lavender) / 0.3))",
      }}
    >
      <div
        className="absolute inset-0 animate-float"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, hsla(var(--brand-accent) / 0.1) 0%, transparent 25%), radial-gradient(circle at 75% 75%, hsla(var(--metal-gold) / 0.1) 0%, transparent 25%)",
        }}
      />
      <div className="container mx-auto max-w-2xl px-6 text-center lg:px-8">
        <p className="font-accent text-lg text-brand-accent">Stay Inspired</p>
        <h2 className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl font-primary-serif">
          Join the Inner Circle
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          Subscribe for early access to collections, exclusive sales, and a
          weekly dose of style inspiration delivered to your inbox.
        </p>
        <div className="mt-10 flex justify-center">
          <SignupForm />
        </div>
        {/* Perks Section */}
        <div className="mt-12 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-brand-accent" />
            <span className="text-sm text-muted-foreground">
              Member-only perks
            </span>
          </div>
          <div className="flex items-center gap-3">
            <BadgePercent className="h-5 w-5 text-brand-accent" />
            <span className="text-sm text-muted-foreground">
              15% welcome discount
            </span>
          </div>
        </div>
      </div>
    </MotionSection>
  );
};

export default NewsLetter;
