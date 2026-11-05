import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Cursor from "@/components/fx/Cursor";
import ScrollProgress from "@/components/fx/ScrollProgress";
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
    default: "PrimeCodeStudio — Design-led engineering studio",
    template: "%s | PrimeCodeStudio",
  },
  description:
    "PrimeCodeStudio is a design-led engineering studio building high-performance websites, web applications, commerce platforms and AI products for startups and businesses.",
  keywords: [
    "web development studio",
    "Next.js development",
    "web app development",
    "e-commerce development",
    "AI product development",
    "UI UX design studio",
    "Mumbai design studio",
  ],
  authors: [{ name: "PrimeCodeStudio" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "PrimeCodeStudio",
    title: "PrimeCodeStudio — Design-led engineering studio",
    description:
      "We build websites, web apps, commerce and AI products for teams who care how it feels.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PrimeCodeStudio — Design-led engineering studio",
    description:
      "We build websites, web apps, commerce and AI products for teams who care how it feels.",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#06070b",
  colorScheme: "dark",
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
        <ScrollProgress />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
