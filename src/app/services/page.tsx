import type { Metadata } from "next";
import ServicesPage from "@/components/services/ServicesPage";

export const metadata: Metadata = {
  title: "Services | PrimeCodeStudio",
  description:
    "Website development, web applications, e-commerce, AI-powered solutions, startup MVPs, and UI/UX design.",
};

export default function Services() {
  return <ServicesPage />;
}
