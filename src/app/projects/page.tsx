import type { Metadata } from "next";
import ProjectsPage from "@/components/projects/ProjectsPage";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A selection of web apps, e-commerce stores, websites and AI products built by PrimeCodeStudio.",
  alternates: { canonical: "/projects" },
};

export default function Projects() {
  return <ProjectsPage />;
}
