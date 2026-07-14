"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import Nav from "@/components/shared/Nav";
import Footer from "@/components/shared/Footer";
import styles from "./Projects.module.css";

const CATEGORIES = ["All", "Web App", "E-Commerce", "Website", "AI"];

const PROJECTS = [
  {
    title: "Ledgerly",
    category: "Web App",
    description:
      "A full-stack finance dashboard for freelancers with real-time invoicing and expense tracking.",
    tags: ["Next.js", "PostgreSQL", "Stripe"],
  },
  {
    title: "Northwind Market",
    category: "E-Commerce",
    description:
      "A headless commerce storefront for a specialty foods brand, built for scale during seasonal spikes.",
    tags: ["Shopify", "React", "Tailwind"],
  },
  {
    title: "Arclight Studio",
    category: "Website",
    description:
      "A portfolio and booking site for a photography studio, with a custom CMS for gallery uploads.",
    tags: ["Next.js", "Sanity CMS"],
  },
  {
    title: "TicketFlow",
    category: "Web App",
    description:
      "An internal support ticketing system with role-based access and real-time status updates.",
    tags: ["Node.js", "Socket.io", "MongoDB"],
  },
  {
    title: "Verve Cosmetics",
    category: "E-Commerce",
    description:
      "A DTC beauty brand storefront with subscription orders and a loyalty rewards program.",
    tags: ["Next.js", "Stripe", "Klaviyo"],
  },
  {
    title: "Insightly AI",
    category: "AI",
    description:
      "An AI-powered analytics assistant that turns raw spreadsheet data into plain-English summaries.",
    tags: ["Python", "OpenAI API", "FastAPI"],
  },
];

export default function ProjectsPage() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === active);

  return (
    <div className={styles.page}>
      <Nav />

      <section className={styles.hero}>
        <div className={styles.glowBg} />
        <span className={styles.pill}>
          <Sparkles size={14} /> OUR WORK
        </span>
        <h1 className={styles.title}>
          Projects We&apos;re
          <br />
          <span>Proud Of</span>
        </h1>
        <p className={styles.subtitle}>
          A selection of products we&apos;ve designed and built for startups
          and businesses across web, e-commerce, and AI.
        </p>
      </section>

      <section className={styles.projectsSection}>
        <div className={styles.filters}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${active === cat ? styles.filterBtnActive : ""}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* <div className={styles.projectsGrid}>
          {filtered.map((project) => (
            <div key={project.title} className={styles.projectCard}>
              <div className={styles.projectThumb}>
                <span className={styles.projectCategory}>{project.category}</span>
                <ArrowUpRight size={18} className={styles.thumbIcon} />
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className={styles.tagRow}>
                {project.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div> */}
        <div className={styles.comingSoon}>
  <span className={styles.badge}>🚀 Under Development ⌚</span>

  <h1>Coming Soon</h1>

  <p>
    We're building something amazing. This Section is currently under development
    and will be available soon.
  </p>

  <Link href="/" className={styles.backBtn}>
    ← Back to Home
  </Link>
</div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <h2>
            Like what you see?
            <br />
            Let&apos;s build your next project.
          </h2>
          <p>We&apos;re currently taking on new work — let&apos;s talk about what you&apos;re building.</p>
          <Link href="/contact" className={styles.ctaBtn}>
            Start a Project <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
