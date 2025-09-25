import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  Scale,
  Shield,
  Users,
  AlertTriangle,
  XCircle,
  Globe,
  AlertCircle,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions - Legal Agreement | Amado",
  description:
    "Read Amado's complete terms & conditions covering user rights and legal agreements.",
  keywords: [
    "terms and conditions",
    "legal terms",
    "user agreement",
    "terms of service",
    "Amado legal",
  ],
  alternates: {
    canonical: "/terms-conditions",
  },
};

export default function TermsConditionsPage() {
  const lastUpdated = "September 2025";
  const effectiveDate = "January 1, 2024";

  const keyTerms = [
    {
      icon: FileText,
      title: "Binding Agreement",
      description: "These terms form a legal agreement between you and Amado.",
    },
    {
      icon: Shield,
      title: "Service Protection",
      description: "Clear terms on delivery quality and customer protections.",
    },
    {
      icon: Users,
      title: "User Responsibilities",
      description: "Your duties while using Amado's services and site.",
    },
    {
      icon: Globe,
      title: "International Terms",
      description: "Rules regarding international purchases and compliance.",
    },
  ];

  const prohibitedActivities = [
    "Illegal or fraudulent use of the site",
    "Circumventing security or payment processes",
    "Providing false or misleading information",
    "Reselling without permission",
    "Using automated tools to book or scrape",
    "Violations of intellectual property",
  ];

  const liabilityLimitations = [
    {
      category: "Service Interruptions",
      description: "Amado is not liable for temporary outages.",
      icon: AlertTriangle,
    },
    {
      category: "Third Party Service",
      description: "We disclaim liabilities related to third party services.",
      icon: Users,
    },
    {
      category: "Force Majeure",
      description:
        "Events out of our control provide grounds for limited liability.",
      icon: Globe,
    },
    {
      category: "Consequential Damages",
      description: "We limit liability to direct damages only.",
      icon: Scale,
    },
  ];

  return (
    <>
      <main className="relative overflow-hidden bg-[hsl(var(--background))] min-h-screen pb-24">
        {/* Header Section */}
        <section className="relative w-full h-[50vh] min-h-[400px] mb-16 overflow-hidden">
          <Image
            src="/media/About.webp"
            alt="Terms & Conditions"
            width={1920}
            height={800}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw"
            className="object-cover absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/50 to-black/30 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))/0.5] via-transparent to-[hsl(var(--accent))/0.3] z-10" />
          <div className="absolute inset-0 flex items-center z-20 px-6 pt-20">
            <div className="container mx-auto max-w-[80rem]">
              <div className="flex flex-wrap gap-4 mb-6 w-full relative z-30 animate-fade-in">
                <span className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-4 py-2 rounded-full shadow-lg font-semibold">
                  Legal Agreement
                </span>
                <div className="flex items-center gap-1 bg-white bg-opacity-20 backdrop-blur-md text-white px-3 py-2 rounded-full border border-white border-opacity-30">
                  <Scale size={12} />
                  <span>Fair &amp; Transparent</span>
                </div>
              </div>
              <h1 className="text-6xl font-extrabold mb-6 text-white leading-tight animate-fade-in">
                Terms &amp; <br />
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Conditions
                </span>
              </h1>
              <p className="text-white text-opacity-90 text-xl max-w-3xl mb-4 animate-fade-in">
                Clear and fair legal terms outlining your rights and
                responsibilities when using Amado’s services.
              </p>
              <p className="flex items-center gap-2 text-white text-opacity-80 animate-fade-in">
                <Clock size={16} />
                <span>
                  Last updated: {lastUpdated} | Effective: {effectiveDate}
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Key Terms Overview */}
        <section className="bg-gradient-to-r from-[hsl(var(--features-bg))] to-white py-16">
          <div className="container mx-auto max-w-7xl px-6">
            <h2 className="text-3xl font-bold mb-10 text-center bg-gradient-to-r from-blue-600 to-cyan-700 bg-clip-text text-transparent">
              Key Terms Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {keyTerms.map(({ icon: Icon, title, description }, i) => (
                <div
                  key={i}
                  className="bg-white bg-opacity-90 rounded-3xl border border-gray-200 shadow-xl p-6 text-center hover:shadow-2xl transition hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="mx-auto mb-5 p-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-700 shadow-lg inline-flex">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {title}
                  </h3>
                  <p className="text-gray-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prohibited Activities */}
        <section className="container mx-auto max-w-5xl px-6 mb-20 animate-fade-in">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Prohibited Activities
          </h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            {[
              "Illegal or fraudulent use of the site",
              "Attempting to circumvent security systems",
              "Providing false information",
              "Reselling products without authorization",
              "Using automated systems for booking",
              "Violating intellectual property rights",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <XCircle className="text-red-600 w-5 h-5 mt-1 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Limitations of Liability */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-bold mb-10 text-center">
              Limitations of Liability
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: AlertTriangle,
                  category: "Service Interruptions",
                  description:
                    "Amado is not liable for temporary stress or outages.",
                },
                {
                  icon: Users,
                  category: "Third Party Services",
                  description: "Limited liability for third party services.",
                },
                {
                  icon: Globe,
                  category: "Force Majeure",
                  description: "Uncontrollable events limit liability.",
                },
                {
                  icon: Scale,
                  category: "Consequential Damages",
                  description: "Liability limited to direct damages.",
                },
              ].map(({ icon: Icon, category, description }, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-gray-200 shadow-md p-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Icon className="text-blue-600 w-7 h-7" />
                    <h3 className="text-xl font-semibold">{category}</h3>
                  </div>
                  <p className="text-gray-700">{description}</p>
                </div>
              ))}
            </div>
            <div className="bg-red-50 border-l-4 border-red-400 rounded-md p-4 mt-6 max-w-xl mx-auto">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="text-red-600 w-6 h-6" />
                <p className="text-red-700 font-semibold">Important</p>
              </div>
              <p className="text-red-600 text-sm max-w-xs">
                Total liability capped at amount paid per service.
              </p>
            </div>
          </div>
        </section>

        {/* Footer Call to Action */}
        <section className="bg-gradient-to-r from-blue-700 to-cyan-800 py-20 text-white text-center rounded-b-2xl">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-extrabold mb-6 animate-fade-in">
              Shop Confidently With Amado
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Enjoy stress-free shopping with clear terms and trusted service.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/products" className="btn btn-primary">
                Explore Collections
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Contact Support
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
