import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Send,
  Copyright,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { footerLinks } from "@/utils/links";
import BackToTopButton from "./BackToTop";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-foreground text-warm-gray overflow-hidden border-t-2 border-border">
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal/60"
        aria-hidden="true"
      />
      {/* <BackToTopButton /> */}
      <div className="relative container mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-center md:text-left">
          <div className="md:col-span-4 flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-bold font-accent text-primary-foreground">
              Amado
            </h2>
            <p className="mt-2 text-muted-foreground max-w-xs">
              Timeless pieces that empower your unique identity with confidence
              and grace.
            </p>
            <div className="mt-6 flex items-center space-x-5">
              <Link
                href="#"
                className="text-muted-foreground hover:text-brand-accent transition-colors magnetic-hover"
              >
                <Facebook className="h-5 w-5" aria-label="facebook icon" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-brand-accent transition-colors magnetic-hover"
              >
                <Instagram className="h-5 w-5" aria-label="instagram icon" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-brand-accent transition-colors magnetic-hover"
              >
                <Twitter className="h-5 w-5" aria-label="twitter icon" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-brand-accent transition-colors magnetic-hover"
              >
                <Youtube className="h-5 w-5" aria-label="youtube icon" />
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-primary-foreground">
                Shop
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-brand-accent transition-colors magnetic-hover"
                  >
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-brand-accent transition-colors magnetic-hover"
                  >
                    Collections
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-brand-accent transition-colors magnetic-hover"
                  >
                    Sale
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-primary-foreground">
                Support
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-brand-accent transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-brand-accent transition-colors"
                  >
                    Order Tracking
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-brand-accent transition-colors"
                  >
                    Size Guide
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase text-primary-foreground">
                Company
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-brand-accent transition-colors"
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-brand-accent transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-brand-accent transition-colors"
                  >
                    Sustainability
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-primary-foreground">
              Stay Updated
            </h3>
            <p className="mt-4 text-xs text-muted-foreground">
              Weekly style inspiration and early access.
            </p>
            <form className="mt-4 flex items-center gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-charcoal border-muted/50 text-warm-gray placeholder:text-muted-foreground"
              />
              <Button size="icon" className="btn-brand flex-shrink-0">
                <Send className="h-4 w-4" aria-label="Send email" />
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-16 mb-12 pt-8 border-t border-muted/20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <p>Accepted Payments:</p>
            <p>Visa, Mastercard, PayPal, Apple Pay</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <p>B-Corp Certified</p>
          </div>
        </div>
        <div className="pt-8 border-t border-muted/20 flex flex-col-reverse md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p className="flex items-center gap-2 mt-4 md:mt-0">
            <Copyright className="h-4 w-4" /> {currentYear} Amado. All Rights
            Reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                className="hover:text-brand-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
