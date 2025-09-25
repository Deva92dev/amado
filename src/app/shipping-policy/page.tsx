import type { Metadata } from "next";
import Image from "next/image";
import {
  Truck,
  Clock,
  Globe,
  CheckCircle,
  Shield,
  Phone,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping Policy - Fast & Secure Delivery | Amado",
  description:
    "Explore Amado's shipping policy for fast, reliable, and safe delivery of your fashion orders. Transparent shipping times and tracking info.",
  keywords: [
    "shipping policy",
    "delivery",
    "order shipping",
    "Amado delivery",
    "package tracking",
  ],
  alternates: {
    canonical: "/shipping-policy",
  },
};

export default function ShippingPolicyPage() {
  const lastUpdated = "September 2025";

  const shippingHighlights = [
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Most orders shipped within 24 hours.",
    },
    {
      icon: Shield,
      title: "Secure Packaging",
      description: "Quality packaging ensures safe delivery.",
    },
    {
      icon: Clock,
      title: "Reliable Delivery Times",
      description: "Estimate 3-7 business days for domestic orders.",
    },
    {
      icon: Globe,
      title: "International Shipping",
      description: "Worldwide shipping with customs support.",
    },
  ];

  const shippingZones = [
    {
      zone: "Domestic",
      deliveryTime: "3-7 business days",
      cost: "Free",
    },
    {
      zone: "North America",
      deliveryTime: "5-10 business days",
      cost: "$15 flat rate",
    },
    {
      zone: "Europe",
      deliveryTime: "7-14 business days",
      cost: "$20 flat rate",
    },
    {
      zone: "Asia & Others",
      deliveryTime: "10-20 business days",
      cost: "$25 flat rate",
    },
  ];

  const trackingPolicy = [
    "Real-time tracking available on all orders.",
    "Notifications for dispatch, in-transit, and delivery.",
    "Support team available for delivery inquiries.",
  ];

  return (
    <>
      <main className="relative overflow-hidden bg-[hsl(var(--background))] min-h-screen pb-24">
        {/* Hero header */}
        <section className="relative w-full h-[50vh] min-h-[400px] mb-16 overflow-hidden">
          <Image
            src="/media/About.webp"
            alt="Amado Shipping Policy"
            width={1920}
            height={800}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw"
            className="object-cover absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/30 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))/0.5] via-transparent to-[hsl(var(--accent))/0.3] z-10" />
          <div className="absolute inset-0 flex items-center z-20 pt-16 sm:pt-20 md:pt-24 lg:pt-16">
            <div className="container mx-auto px-6 max-w-4xl">
              <div className="flex flex-wrap gap-4 mb-6 w-full relative z-30 animate-fade-in">
                <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-blue-700 text-white text-xs px-4 py-2 rounded-full font-semibold shadow-lg">
                  Trusted Delivery
                </span>
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md text-white text-xs px-3 py-2 rounded-full border border-white/30">
                  <CheckCircle
                    size={12}
                    className="text-[hsl(var(--accent))]"
                  />
                  <span>On-time & Safe</span>
                </div>
              </div>
              <h1 className="text-6xl font-extrabold mb-6 text-white leading-tight animate-fade-in">
                Shipping{" "}
                <span className="bg-gradient-to-r from-[hsl(var(--accent))] via-orange-400 to-[hsl(var(--accent))] bg-clip-text text-transparent">
                  Policy
                </span>
              </h1>
              <p className="text-white/90 text-xl max-w-3xl leading-relaxed mb-4 animate-fade-in">
                Fast, reliable shipping for your favorite fashion on Amado.
              </p>
              <p className="flex items-center gap-2 text-white/80 text-sm animate-fade-in">
                <Clock size={16} />
                <span>Last updated: {lastUpdated}</span>
              </p>
            </div>
          </div>
        </section>

        {/* Policy Highlights */}
        <section className="py-12 sm:py-16 bg-gradient-to-r from-[hsl(var(--features-bg))] to-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-center text-3xl font-bold mb-8 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              Shipping Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {shippingHighlights.map(
                ({ icon: Icon, title, description }, i) => (
                  <div
                    key={i}
                    className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl flex justify-center items-center shadow-lg">
                      <Icon className="text-white w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-[hsl(var(--foreground))]">
                      {title}
                    </h3>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                      {description}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Shipping Zones */}
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              Shipping Zones & Costs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {shippingZones.map(({ zone, deliveryTime, cost }, idx) => (
                <div
                  key={idx}
                  className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6"
                >
                  <h3 className="text-xl font-bold mb-3 text-[hsl(var(--foreground))]">
                    {zone}
                  </h3>
                  <p className="text-[hsl(var(--muted-foreground))] mb-2">
                    Estimated Delivery: {deliveryTime}
                  </p>
                  <p className="text-[hsl(var(--muted-foreground))]">
                    Shipping Cost: {cost}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tracking Policy */}
        <section className="py-16 bg-gradient-to-r from-[hsl(var(--features-bg))] to-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              Tracking & Support
            </h2>
            <ul className="list-disc list-inside space-y-3 text-[hsl(var(--foreground))] max-w-3xl mx-auto">
              {trackingPolicy.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle className="text-[hsl(var(--accent))]" /> {item}
                </li>
              ))}
            </ul>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
              <div>
                <Phone
                  size={32}
                  className="text-[hsl(var(--primary))] mx-auto mb-3"
                />
                <h3 className="font-semibold mb-1">Phone Support</h3>
                <p className="text-[hsl(var(--muted-foreground))]">
                  +1 (800) 123-4567
                </p>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                  9:00 AM - 6:00 PM, Mon - Fri
                </p>
              </div>
              <div>
                <Mail
                  size={32}
                  className="text-[hsl(var(--accent))] mx-auto mb-3"
                />
                <h3 className="font-semibold mb-1">Email Support</h3>
                <p className="text-[hsl(var(--muted-foreground))]">
                  support@amado.com
                </p>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
                  Response within 24 hours
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
