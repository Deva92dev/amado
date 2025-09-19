"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Home, Compass, ShoppingBagIcon, Store } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  const popularRoutes = [
    { name: "Explore", href: "/", icon: Compass },
    { name: "Products", href: "/products", icon: ShoppingBagIcon },
    { name: "About Us", href: "/about", icon: Store },
  ];

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-black bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent leading-none mb-4">
            404
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-[hsl(var(--accent))] to-orange-500 rounded-full mx-auto" />
        </div>
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-background/20 shadow-2xl overflow-hidden mb-8">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-3xl blur opacity-20 -z-10" />
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-5xl font-black mb-4 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              Product Not Found
            </h1>
            <p className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] mb-8 leading-relaxed">
              It seems this page has wandered off on its own adventure. Let us
              get you back on track to discover amazing Products with Amado!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                onClick={handleGoBack}
                className="btn-accent px-8 py-4 text-lg shadow-xl shadow-[hsl(var(--accent))]/30 hover:shadow-[hsl(var(--accent))]/50 hover:scale-105 transition-all duration-300 group relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-background/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="flex items-center gap-3 relative z-10 font-bold">
                  <ArrowLeft size={20} />
                  Go Back
                </span>
              </Button>
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="px-8 py-4 text-lg bg-background/90 backdrop-blur-xl border border-[hsl(var(--border))] hover:bg-[hsl(var(--features-bg))] transition-all duration-300"
              >
                <Home size={20} className="mr-2" />
                Home
              </Button>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[hsl(var(--foreground))] mb-4">
                Continue Your Shopping
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {popularRoutes.map((route) => (
                  <Button
                    key={route.href}
                    onClick={() => router.push(route.href)}
                    variant="ghost"
                    className="bg-[hsl(var(--features-bg))] hover:bg-[hsl(var(--primary))]/10 border border-[hsl(var(--border))] transition-all duration-300 hover:scale-105"
                  >
                    <route.icon
                      size={16}
                      className="mr-2 text-[hsl(var(--primary))]"
                    />
                    {route.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-background/80 backdrop-blur-xl rounded-2xl border border-background/20 shadow-xl p-6">
          <p className="text-[hsl(var(--muted-foreground))] text-lg font-medium mb-2">
            Not all those who wander are lost..
          </p>
          <p className="text-[hsl(var(--primary))] text-sm">
            But this page definitely took a wrong turn! 🧭
          </p>
        </div>
      </div>
    </div>
  );
}
