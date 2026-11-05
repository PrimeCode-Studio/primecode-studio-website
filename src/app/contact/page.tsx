import type { Metadata } from "next";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with PrimeCodeStudio to start your next web, e-commerce, or AI project.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return <ContactPage />;
}
