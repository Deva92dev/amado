import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/global/Footer";
import Script from "next/script";
import { siteSchema } from "@/utils/jsonldSchema";
import GlobalWrapper from "./ClientProvider";
import dynamic from "next/dynamic";

const CartDrawer = dynamic(() => import("@/components/cart/CartDrawer"), {
  loading: () => null,
});

const BackToTopButton = dynamic(() => import("@/components/global/BackToTop"), {
  loading: () => null,
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
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
    url: "https://amado-zeta.vercel.app",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="description"
          content="Enjoy the different styles with various option at Amado."
        />
        {/* Preconnect to image + auth origins to cut connection latency */}
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <link rel="preconnect" href="https://img.clerk.com" />
        {/* Preload the LCP hero image (art-directed per breakpoint) */}
        <link
          rel="preload"
          as="image"
          href="/hero/hero-desktop.webp"
          media="(min-width: 768px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/hero/hero-mobile.webp"
          media="(max-width: 767px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/_next/static/media/eaead17c7dbfcd5d-s.p.woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="/_next/static/media/e4af272ccee01ff0-s.p.woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`
          ${playfair.variable} 
          ${inter.variable} 
          antialiased
        `}
      >
        <Script
          id="site-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteSchema).replace(/</g, "\\u003c"),
          }}
        />
        <GlobalWrapper>
          <Navbar />
          {children}
          <Footer />
          <CartDrawer />
          <BackToTopButton />
        </GlobalWrapper>
      </body>
    </html>
  );
}
