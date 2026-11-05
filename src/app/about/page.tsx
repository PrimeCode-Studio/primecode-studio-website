import type { Metadata } from "next";
import AboutPage from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "PrimeCodeStudio is a creative web development studio in Mumbai, building websites, web applications and AI products for startups and businesses.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return <AboutPage />;
}
