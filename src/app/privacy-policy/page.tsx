import type { Metadata } from "next";
import Image from "next/image";
import { Shield, Lock, Eye, Clock, Database, UserCheck } from "lucide-react";
import AboutImage from "@/assets/About.webp";

export const metadata: Metadata = {
  title: "Privacy Policy - Protecting Your Data | Amado",
  description:
    "Learn how Amado collects, uses, and safeguards your personal information. Transparent privacy practices with a strong commitment to your security.",
  keywords: [
    "privacy policy",
    "data protection",
    "GDPR",
    "personal information",
    "Amado privacy",
  ],
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "September 2025";
  const keyPoints = [
    {
      icon: Lock,
      title: "Data Encryption",
      description:
        "All your personal data is encrypted using industry-standard protocols for security.",
    },
    {
      icon: Eye,
      title: "Transparent Collection",
      description:
        "We clearly explain what data we collect and why it improves your experience.",
    },
    {
      icon: UserCheck,
      title: "Your Control",
      description: "Options to access, modify or delete your data at any time.",
    },
    {
      icon: Shield,
      title: "Secure Storage",
      description: "Stored on secure servers with regular security audits.",
    },
  ];

  const dataTypes = [
    {
      category: "Account Details",
      items: [
        "Name, email, phone number",
        "Profile and preferences",
        "Account security credentials",
      ],
    },
    {
      category: "Order Information",
      items: [
        "Order history and details",
        "Shipping addresses",
        "Payment data (encrypted)",
      ],
    },
    {
      category: "Analytics",
      items: [
        "Device and browser info",
        "Location data where permitted",
        "Usage data and cookies",
      ],
    },
    {
      category: "Communication",
      items: [
        "Customer support interactions",
        "Marketing preferences",
        "Feedback submissions",
      ],
    },
  ];

  return (
    <>
      <main className="relative overflow-hidden bg-[hsl(var(--background))] min-h-screen pb-24">
        <section className="relative w-full h-[50vh] min-h-[400px] mb-16 overflow-hidden">
          <Image
            src={AboutImage}
            alt="Privacy Protection"
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
                  GDPR Compliant
                </span>
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md text-white text-xs px-3 py-2 rounded-full border border-white/30">
                  <Shield size={12} className="text-[hsl(var(--accent))]" />
                  <span>Your Privacy Matters</span>
                </div>
              </div>
              <h1 className="text-6xl font-extrabold mb-6 text-white leading-tight animate-fade-in">
                Privacy{" "}
                <span className="bg-gradient-to-r from-[hsl(var(--accent))] via-orange-400 to-[hsl(var(--accent))] bg-clip-text text-transparent">
                  Policy
                </span>
              </h1>
              <p className="text-white/90 text-xl max-w-3xl leading-relaxed mb-4 animate-fade-in">
                Your trust is the foundation of our relationship. Learn how we
                protect and respectfully use your personal information.
              </p>
              <p className="flex items-center gap-2 text-white/80 text-sm animate-fade-in">
                <Clock size={16} /> Last updated: {lastUpdated}
              </p>
            </div>
          </div>
        </section>
        <section className="py-12 sm:py-16 bg-gradient-to-r from-[hsl(var(--features-bg))] to-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-center text-3xl font-bold mb-8 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              Privacy at a Glance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {keyPoints.map(({ icon: Icon, title, description }, i) => (
                <div
                  key={i}
                  className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 text-center hover:shadow-2xl transition duration-300 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl flex justify-center items-center shadow-lg">
                    <Icon className="text-white w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-2">
                    {title}
                  </h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-6 max-w-4xl animate-fade-in">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center mb-6">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 shadow-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))]">
                  <Database size={16} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                  Information We Collect
                </h2>
              </div>
              <p className="text-[hsl(var(--foreground))] mb-6 leading-relaxed">
                We collect and process information to provide and improve our
                services. Here is the data we gather and use:
              </p>
              {dataTypes.map(({ category, items }, i) => (
                <div
                  key={i}
                  className="mb-6 border-l-4 border-[hsl(var(--accent))] pl-4"
                >
                  <h3 className="font-semibold text-[hsl(var(--foreground))] mb-3">
                    {category}
                  </h3>
                  <ul className="text-[hsl(var(--muted-foreground))] list-disc list-inside space-y-2">
                    {items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
