"use client";

import { useState } from "react";
import { m, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    //   simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (email.includes("@")) {
      setStatus("success");
      setMessage("Thank you for subscribing! Check your inbox.");
    } else {
      setStatus("error");
      setMessage("Please enter a valid email address.");
    }
  };

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className="relative glass-effect magnetic-hover"
      >
        <Input
          id="email-address"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          disabled={status === "loading" || status === "success"}
          className="h-14 w-full rounded-full px-6 pr-28 text-base backdrop-blur-lg bg-[hsla(var(--background)/0.9)] border border-[hsla(var(--metal-gold)/0.3)] transition-all duration-300 focus:border-brand-accent focus:shadow-[0_0_0_3px_hsla(var(--brand-accent)/0.1),_0_8px_16px_hsla(var(--foreground)/0.1)] focus:bg-background"
        />
        <Button
          type="submit"
          size="icon"
          disabled={status === "loading" || status === "success"}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-primary text-primary-foreground transition-transform duration-300 hover:scale-105"
        >
          <ArrowRight className="h-5 w-5" />
          <span className="sr-only">Subscribe</span>
        </Button>
      </form>
      {/* Messages container */}
      <div className="mt-4 h-6 text-center">
        <AnimatePresence>
          {message && (
            <m.p
              key="message"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`text-sm font-medium ${
                status === "success" ? "text-emerald" : "text-destructive"
              }`}
            >
              {message}
            </m.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SignupForm;
