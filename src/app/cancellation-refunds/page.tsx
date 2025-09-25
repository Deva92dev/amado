import Image from "next/image";
import type { Metadata } from "next";
import {
  RefreshCw,
  Clock,
  DollarSign,
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Users,
  Phone,
  Mail,
  FileText,
  CreditCard,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy - Fair & Flexible | Amado",
  description:
    "Understand Amado's cancellation and refund policy. Flexible options for changes and cancellations with transparent terms and conditions.",
  keywords: [
    "cancellation policy",
    "refund policy",
    "order cancellation",
    "refunds",
    "Amado refunds",
  ],
  alternates: {
    canonical: "/cancellation-refunds",
  },
};

export default function CancellationRefunds() {
  const lastUpdated = "September 2025";

  const policyHighlights = [
    {
      icon: Clock,
      title: "Flexible Timing",
      description:
        "Cancel up to 7 days before shipping for full refunds on most orders.",
    },
    {
      icon: DollarSign,
      title: "Fair Refunds",
      description: "No hidden fees or restocking charges on returns.",
    },
    {
      icon: Shield,
      title: "Secure Orders",
      description: "All orders protected with secure payment and shipping.",
    },
    {
      icon: RefreshCw,
      title: "Easy Process",
      description:
        "User-friendly online return process with prompt refunds and updates.",
    },
  ];

  const refundTiers = [
    {
      timeframe: "7+ Days Before Shipping",
      refundAmount: "100% Refund",
      processingTime: "3-5 Business Days",
      icon: CheckCircle,
      color: "text-[hsl(var(--green-700,34,74%,36%))]",
      bgColor: "bg-[hsl(var(--green-50, 238, 100%, 90%))]",
      borderColor: "border-[hsl(var(--green-500, 120, 100%, 40%))]",
    },
    {
      timeframe: "3-7 Days Before Shipping",
      refundAmount: "75% Refund",
      processingTime: "5-7 Business Days",
      icon: AlertTriangle,
      color: "text-yellow-800",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-500",
    },
    {
      timeframe: "Less than 3 Days",
      refundAmount: "50% Refund",
      processingTime: "7-10 Business Days",
      icon: XCircle,
      color: "text-orange-800",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-500",
    },
    {
      timeframe: "No-Show / Delivered",
      refundAmount: "No Refund",
      processingTime: "N/A",
      icon: XCircle,
      color: "text-red-700",
      bgColor: "bg-red-50",
      borderColor: "border-red-500",
    },
  ];

  const serviceTypes = [
    {
      service: "Clothing Orders",
      cancellationRules: [
        "Free cancellation up to 7 days before shipping",
        "3-day cancellation window with 25% restocking fee",
        "No cancellations allowed after shipping",
      ],
      icon: Users,
      refundTime: "3-7 business days",
    },
    {
      service: "Accessories",
      cancellationRules: [
        "Free cancellation up to 5 days before shipping",
        "No cancellations after shipping",
      ],
      icon: RefreshCw,
      refundTime: "3-5 business days",
    },
    {
      service: "Gift Cards",
      cancellationRules: ["All sales are final for gift cards."],
      icon: CreditCard,
      refundTime: "N/A",
    },
  ];

  const specialCircumstances = [
    {
      title: "Damaged Items",
      description: "Full refund on items damaged during shipping.",
      requirements: "Photo evidence required within 24 hours of delivery.",
      processing: "5-7 business days",
      icon: Shield,
    },
    {
      title: "Incorrect Orders",
      description: "Full refund or replacement for wrong items sent.",
      requirements: "Report within 7 days of delivery.",
      processing: "5-7 business days",
      icon: FileText,
    },
    {
      title: "Order Cancellation due to COVID-19",
      description: "Flexible cancellations or rescheduling available.",
      requirements: "Proof of travel restriction or impact.",
      processing: "Variable",
      icon: Zap,
    },
  ];

  return (
    <>
      <main className="relative overflow-hidden bg-[hsl(var(--background))] min-h-screen">
        {/* Hero Section */}
        <section className="relative w-full h-[50vh] min-h-[400px] mb-16 overflow-hidden">
          <Image
            src="/media/About.webp"
            alt="Amado Cancellation and Refund Policy"
            width={1920}
            height={800}
            priority
            sizes="(max-width: 480px) 95vw, (max-width: 768px) 90vw, (max-width: 1200px) 85vw, 75vw"
            className="object-cover absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))/0.4] via-transparent to-[hsl(var(--accent))/0.2] z-10" />
          <div className="absolute inset-0 flex items-center z-20 pt-16 sm:pt-20 md:pt-24 lg:pt-16">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl w-full">
                <div className="flex items-center flex-wrap gap-2 mb-6 w-full relative z-30 animate-fade-in">
                  <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-blue-700 text-white text-xs px-4 py-2 rounded-full font-semibold shadow-lg">
                    Flexible Policy
                  </span>
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md text-white text-xs px-2 py-2 rounded-full border border-white/30">
                    <RefreshCw
                      size={12}
                      className="text-[hsl(var(--accent))] fill-[hsl(var(--accent))]"
                    />
                    <span>Fair Refunds</span>
                  </div>
                </div>
                <h1 className="text-5xl font-black text-white mb-6 animate-fade-in">
                  Refund &amp;
                  <br />
                  <span className="bg-gradient-to-r from-[hsl(var(--accent))] via-orange-400 to-[hsl(var(--accent))] bg-clip-text text-transparent">
                    Cancellation Policy
                  </span>
                </h1>
                <p className="text-white/90 text-xl max-w-3xl leading-relaxed mb-2 animate-fade-in">
                  Transparent, fair, and flexible refund policies designed to
                  protect your purchase and peace of mind.
                </p>
                <p className="text-white/80 text-md mb-4 animate-fade-in">
                  Last updated: {lastUpdated}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Policy Highlights */}
        <section className="py-12 bg-gradient-to-r from-[hsl(var(--features-bg))] to-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="mb-8 text-center text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              Refund Policy Highlights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {policyHighlights.map((highlight, i) => (
                <div
                  key={i}
                  className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 text-center hover:shadow-2xl transition md:hover:-translate-y-1 animate-fade-in"
                >
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-2xl flex justify-center items-center shadow-lg">
                    <highlight.icon className="text-white w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-[hsl(var(--foreground))]">
                    {highlight.title}
                  </h3>
                  <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Refund Tiers */}
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              Refund Tier Details
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {refundTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`${tier.bgColor} border-l-4 ${tier.borderColor} rounded-r-xl p-6 transition-all duration-300 hover:shadow-lg`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <tier.icon size={24} className={tier.color} />
                    <h3 className={`text-lg font-bold ${tier.color}`}>
                      {tier.timeframe}
                    </h3>
                  </div>
                  <div>
                    <p className="text-[hsl(var(--foreground))] font-medium">
                      Refund Amount
                    </p>
                    <p className={`text-lg font-extrabold ${tier.color}`}>
                      {tier.refundAmount}
                    </p>
                  </div>
                  <div className="mt-3">
                    <p className="text-[hsl(var(--foreground))] font-medium">
                      Processing Time
                    </p>
                    <p className="text-sm text-[hsl(var(--muted-foreground))]">
                      {tier.processingTime}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Types */}
        <section className="py-16 bg-gradient-to-r from-[hsl(var(--features-bg))] to-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              Service Specific Policies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {serviceTypes.map((service, idx) => (
                <div
                  key={idx}
                  className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 sm:p-8"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex justify-center items-center shadow-lg">
                      <service.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[hsl(var(--foreground))]">
                        {service.service}
                      </h3>
                      <p className="text-sm text-[hsl(var(--muted-foreground))]">
                        Refund processing: {service.refundTime}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {service.cancellationRules.map((rule, ridx) => (
                      <li key={ridx} className="flex items-start gap-2">
                        <CheckCircle
                          size={16}
                          className="text-[hsl(var(--accent))] mt-1 flex-shrink-0"
                        />
                        <span className="text-[hsl(var(--muted-foreground))] text-sm">
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Circumstances */}
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              Special Circumstances
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {specialCircumstances.map((circumstance, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-[hsl(var(--border))] p-6 hover:shadow-lg transition duration-300"
                >
                  <div className="text-center mb-4">
                    <circumstance.icon
                      size={32}
                      className="text-[hsl(var(--primary))] mx-auto mb-3"
                    />
                    <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-1">
                      {circumstance.title}
                    </h3>
                    <p className="text-sm font-semibold text-[#db6443] mb-2">
                      {circumstance.description}
                    </p>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-semibold text-[hsl(var(--foreground))]">
                        Requirements:
                      </span>
                      <p className="text-[hsl(var(--muted-foreground))]">
                        {circumstance.requirements}
                      </p>
                    </div>
                    <div>
                      <span className="font-semibold text-[hsl(var(--foreground))]">
                        Processing:
                      </span>
                      <p className="text-[hsl(var(--muted-foreground))]">
                        {circumstance.processing}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Refund Processing */}
        <section className="py-16 bg-gradient-to-r from-[hsl(var(--primary))] to-blue-700 text-white rounded-b-2xl">
          <div className="container mx-auto px-6 max-w-5xl text-center">
            <h2 className="text-4xl font-extrabold mb-6">
              Refund Processing Information
            </h2>
            <p className="max-w-3xl mx-auto mb-6">
              At Amado, refunds are processed quickly and securely back to your
              original payment method.
            </p>
            <div className="flex flex-col md:flex-row md:justify-center md:gap-12 space-y-6 md:space-y-0">
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2 justify-center">
                  <CheckCircle
                    className="text-[hsl(var(--accent))]"
                    size={24}
                  />
                  Refund Method
                </h3>
                <p>
                  Refunds are credited to the original payment source within the
                  stated processing timeframes.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2 justify-center">
                  <CheckCircle
                    className="text-[hsl(var(--accent))]"
                    size={24}
                  />
                  Processing Timeline
                </h3>
                <p>
                  Processing depends on the payment provider and bank timings
                  but generally completes within a week.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2 justify-center">
                  <CheckCircle
                    className="text-[hsl(var(--accent))]"
                    size={24}
                  />
                  Confirmation
                </h3>
                <p>
                  Confirmation emails are sent once the refund is processed
                  including expected arrival date.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Support Contact */}
        <section className="py-16">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                Refund Support Team
              </h2>
              <p className="mb-8">
                Our dedicated team is here to assist you with cancellations and
                refund inquiries.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              <div>
                <Phone
                  size={32}
                  className="text-[hsl(var(--primary))] mb-3 mx-auto"
                />
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className="text-[hsl(var(--muted-foreground))]">
                  +1 (555) 123-4567
                </p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  24/7 Hotline
                </p>
              </div>
              <div>
                <Mail
                  size={32}
                  className="text-[hsl(var(--accent))] mb-3 mx-auto"
                />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-[hsl(var(--muted-foreground))]">
                  support@amado.com
                </p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  Response within 2 hours
                </p>
              </div>
              <div>
                <RefreshCw
                  size={32}
                  className="text-[hsl(var(--primary))] mb-3 mx-auto"
                />
                <h3 className="font-semibold mb-2">Status Updates</h3>
                <p className="text-[hsl(var(--muted-foreground))]">
                  Track your refund status online anytime
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
