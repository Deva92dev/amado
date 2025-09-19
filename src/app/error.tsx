"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, RefreshCw, ArrowLeft, Home, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-[hsl(var(--accent))] to-pastel-blue-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
            <AlertTriangle size={48} className="text-white" />
          </div>
        </div>
        <div className="bg-background/90 backdrop-blur-xl rounded-3xl border border-background/20 shadow-2xl overflow-hidden mb-8">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--accent))] to-[hsl(var(--primary))] rounded-3xl blur opacity-20 -z-10" />
          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
              Oops! Something went wrong
            </h1>
            <p className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] mb-6 leading-relaxed">
              We encountered an unexpected error during your journey with Amado.
              Do not worry, our team has been notified and we are working on
              fixing it.
            </p>
            {process.env.NODE_ENV === "development" && (
              <div className="bg-[hsl(var(--features-bg))] rounded-xl p-4 mb-6 text-left border border-[hsl(var(--border))]">
                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">
                  Error Details:
                </h3>
                <code className="text-sm text-[hsl(var(--accent))] break-all">
                  {error.message}
                </code>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={reset}
                className="btn-accent px-8 py-4 text-lg shadow-xl shadow-[hsl(var(--accent))]/30 hover:shadow-[hsl(var(--accent))]/50 hover:scale-105 transition-all duration-300 group relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-background/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="flex items-center gap-3 relative z-10 font-bold">
                  <RefreshCw size={20} />
                  Try Again
                </span>
              </Button>
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="px-8 py-4 text-lg bg-background/90 backdrop-blur-xl border border-[hsl(var(--border))] hover:bg-[hsl(var(--features-bg))] transition-all duration-300"
              >
                <ArrowLeft size={20} className="mr-2" />
                Go Back
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
          </div>
        </div>
        <div className="text-center">
          <p className="text-[hsl(var(--muted-foreground))] mb-4">
            Still having trouble? We are here to help you continue your journey!
          </p>
          <Button
            variant="ghost"
            onClick={() => router.push("/about")}
            className="text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] transition-colors"
          >
            <Mail size={16} className="mr-2" />
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
