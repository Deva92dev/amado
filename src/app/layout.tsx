import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import {
  Playfair_Display,
  Abril_Fatface,
  Inter,
  Manrope,
  Italiana,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Providers from "./providers";
import Footer from "@/components/global/Footer";
import { LenisProvider } from "./LenisProvider";
import { MotionProvider } from "./MotionProvider";
import QueryProvider from "./QueryProvider";
import CartDrawer from "@/components/cart/CartDrawer";
import Script from "next/script";
import { siteSchema } from "@/utils/jsonldSchema";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display", // maps to CSS var
  display: "swap",
  weight: ["400", "700"], // regular + bold
});

export const abril = Abril_Fatface({
  subsets: ["latin"],
  variable: "--font-abril-fatface",
  display: "swap",
  weight: "400",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "700"],
});

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "700"],
});

export const italiana = Italiana({
  subsets: ["latin"],
  variable: "--font-italiana",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Amado – Where Leisure Meets Luxury",
    template: "%s | Amado",
  },
  description: "Enjoy the different styles with various option at Amado.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Amado – Where Leisure Meets Luxury",
    description: "Enjoy the different styles with various option at Amado.",
    url: "/",
    siteName: "Amado",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Amado clothing banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amado – Where Leisure Meets Luxury",
    description: "Explore styles of different colors with Amado.",
    images: ["/opengraph-image.jpg"],
  },
  applicationName: "Amado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`
        ${playfair.variable}   /* headline serif */
        ${inter.variable}      /* body sans-serif */
        ${italiana.variable}   /* accent script */
      `}
        >
          <Script
            id="site-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(siteSchema).replace(/</g, "\\u003c"),
            }}
          />
          <QueryProvider>
            <Providers>
              <LenisProvider>
                <MotionProvider>
                  <Navbar />
                  {children}
                  <Footer />
                  <CartDrawer />
                </MotionProvider>
              </LenisProvider>
            </Providers>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
