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
  weight: ["400", "700"],
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "700"],
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
