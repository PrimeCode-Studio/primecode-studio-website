import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://primecodestudio.in"),
  title: {
    default: "PrimeCodeStudio — Websites, Apps & AI for Growing Businesses",
    template: "%s | PrimeCodeStudio",
  },
  description:
    "PrimeCodeStudio is a web development studio building high-performance websites, web applications, e-commerce stores and AI-powered products for startups and businesses.",
  keywords: [
    "web development agency",
    "Next.js development",
    "web app development",
    "e-commerce development",
    "AI solutions",
    "UI UX design",
    "Mumbai web agency",
  ],
  authors: [{ name: "PrimeCodeStudio" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "PrimeCodeStudio",
    title: "PrimeCodeStudio — Websites, Apps & AI for Growing Businesses",
    description:
      "We build modern websites, web applications, e-commerce platforms and AI-powered solutions for startups and businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PrimeCodeStudio — Websites, Apps & AI",
    description:
      "We build modern websites, web applications, e-commerce platforms and AI-powered solutions.",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <a href="#main" className="skipLink">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
