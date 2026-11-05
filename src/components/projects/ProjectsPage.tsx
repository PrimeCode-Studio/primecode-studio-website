import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Nav from "@/components/shared/Nav";
import Footer from "@/components/shared/Footer";
import styles from "./Projects.module.css";
import RevealScope from "@/components/fx/RevealScope";

const PROJECTS = [
  {
    slug: "ledgerly",
    title: "Ledgerly",
    category: "Web App",
    client: "Finance SaaS",
    description:
      "A full-stack finance dashboard for freelancers with real-time invoicing and expense tracking.",
    result: "3× faster invoicing",
    tags: ["Next.js", "PostgreSQL", "Stripe"],
    featured: true,
  },
  {
    slug: "northwind-market",
    title: "Northwind Market",
    category: "E-Commerce",
    client: "Specialty foods",
    description:
      "A headless commerce storefront for a specialty foods brand, built for scale during seasonal spikes.",
    result: "Handled 10× seasonal traffic",
    tags: ["Shopify", "React", "Tailwind"],
  },
  {
    slug: "arclight-studio",
    title: "Arclight Studio",
    category: "Website",
    client: "Photography studio",
    description:
      "A portfolio and booking site for a photography studio, with a custom CMS for gallery uploads.",
    result: "Bookings fully self-serve",
    tags: ["Next.js", "Sanity CMS"],
  },
  {
    slug: "ticketflow",
    title: "TicketFlow",
    category: "Web App",
    client: "Internal tooling",
    description:
      "An internal support ticketing system with role-based access and real-time status updates.",
    result: "Support queue centralised",
    tags: ["Node.js", "Socket.io", "MongoDB"],
  },
  {
    slug: "verve-cosmetics",
    title: "Verve Cosmetics",
    category: "E-Commerce",
    client: "DTC beauty",
    description:
      "A DTC beauty brand storefront with subscription orders and a loyalty rewards program.",
    result: "Subscriptions as a revenue line",
    tags: ["Next.js", "Stripe", "Klaviyo"],
  },
  {
    slug: "insightly-ai",
    title: "Insightly AI",
    category: "AI",
    client: "Analytics",
    description:
      "An AI-powered analytics assistant that turns raw spreadsheet data into plain-English summaries.",
    result: "Hours of manual analysis saved",
    tags: ["Python", "OpenAI API", "FastAPI"],
  },
];

export default function ProjectsPage() {
  return (
    <div className={styles.page}>
      <Nav />

      <main id="main">
        <RevealScope>
        {/* ---- Hero ---- */}
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <span className="pill">Our work</span>
            <h1 className={`display ${styles.heroTitle}`}>
              Projects we&apos;re{" "}
              <span className={styles.accent}>proud of</span>
            </h1>
            <p className={`lede ${styles.heroLede}`}>
              A selection of products we&apos;ve designed and built for startups
              and businesses across web, e-commerce and AI.
            </p>
          </div>
        </section>

        {/* ---- Project grid ---- */}
        <section className={styles.projectsSection}>
          <div className="container">
            <div className={styles.projectsGrid}>
              {PROJECTS.map((project) => (
                <article
                  key={project.slug}
                  className={`${styles.projectCard} ${
                    project.featured ? styles.featured : ""
                  } reveal`}
                >
                  <div className={styles.projectArt} aria-hidden="true">
                    <span className={styles.projectCategory}>
                      {project.category}
                    </span>
                    <ArrowUpRight size={18} className={styles.thumbIcon} />

                    <div className={styles.artMock}>
                      <span className={styles.artMockBar} />
                      <span className={styles.artMockBarShort} />
                      <div className={styles.artMockGrid}>
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>

                  <div className={styles.projectBody}>
                    <span className={styles.client}>{project.client}</span>
                    <h2 className={styles.projectTitle}>{project.title}</h2>
                    <p className="body">{project.description}</p>

                    <div className={styles.resultRow}>
                      <span className={styles.resultDot} />
                      <span>{project.result}</span>
                    </div>

                    <ul className={styles.tagRow}>
                      {project.tags.map((tag) => (
                        <li key={tag} className={styles.tag}>
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---- CTA ---- */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaCard}>
              <h2 className={`h2 ${styles.ctaTitle}`}>
                Like what you see?
                <br />
                Let&apos;s build your next project.
              </h2>
              <p className={styles.ctaText}>
                We&apos;re currently taking on new work — let&apos;s talk about
                what you&apos;re building.
              </p>
              <Link href="/contact" className="btn btnPrimary btnLg">
                Start a project <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
        </RevealScope>
      </main>

      <Footer />
    </div>
  );
}
