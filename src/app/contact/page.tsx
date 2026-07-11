import type { Metadata } from "next";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact | PrimeCodeStudio",
  description:
    "Get in touch with PrimeCodeStudio to start your next web, e-commerce, or AI project.",
};

export default function Contact() {
  return <ContactPage />;
}
