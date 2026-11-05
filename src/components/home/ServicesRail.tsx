"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Globe,
  ShoppingCart,
  Cpu,
  Rocket,
  PenTool,
  Code2,
} from "lucide-react";
import { useHorizontalScroll } from "@/lib/animations";
import styles from "./ServicesRail.module.css";

const SERVICES = [
  {
    index: "01",
    icon: Globe,
    title: "Websites",
    tagline: "Fast, beautiful, found on Google",
    description:
      "Marketing sites and landing pages engineered for speed and conversion. Sub-second loads, perfect Core Web Vitals, built to be edited.",
    points: ["Next.js", "SEO architecture", "CMS integration"],
  },
  {
    index: "02",
    icon: Code2,
    title: "Web Apps",
    tagline: "Software your team lives in",
    description:
      "Custom dashboards, portals and internal tools with real auth, roles, permissions and the boring reliability that matters.",
    points: ["Dashboards", "Auth & RBAC", "REST / tRPC"],
  },
  {
    index: "03",
    icon: ShoppingCart,
    title: "Commerce",
    tagline: "Storefronts that survive Black Friday",
    description:
      "Headless storefronts, subscription flows and checkout optimisation. Built to handle traffic spikes without falling over.",
    points: ["Headless", "Payments", "Inventory"],
  },
  {
    index: "04",
    icon: Cpu,
    title: "AI Products",
    tagline: "Intelligence with guardrails",
    description:
      "LLM features, retrieval pipelines and workflow automation — with evaluation harnesses so you can prove it actually works.",
    points: ["LLM features", "RAG pipelines", "Evals"],
  },
  {
    index: "05",
    icon: PenTool,
    title: "Design",
    tagline: "Interfaces worth screenshotting",
    description:
      "Design systems, prototypes and motion specs. We design in the browser, so what you approve is what ships.",
    points: ["Design systems", "Prototyping", "Motion"],
  },
  {
    index: "06",
    icon: Rocket,
    title: "Startup MVPs",
    tagline: "Idea to demo in weeks",
    description:
      "Technical co-founder support, scoped MVPs and investor-ready demos — built to be extended, not thrown away.",
    points: ["Rapid MVPs", "Roadmaps", "Demo builds"],
  },
];

export default function ServicesRail() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useHorizontalScroll(sectionRef, trackRef);

  return (
    <section className={styles.section} id="services" ref={sectionRef}>
      <div className={styles.sticky}>
        <div className={`container ${styles.head}`}>
          <div>
            <span className="eyebrow">What we do</span>
            <h2 className={`h2 ${styles.headTitle}`}>
              Six ways we make
              <br />
              your product unfair.
            </h2>
          </div>

          <p className={styles.headNote}>
            Scroll to move sideways
            <span className={styles.arrowHint} aria-hidden="true">
              →
            </span>
          </p>
        </div>

        <div className={styles.trackWrap}>
          <div ref={trackRef} className={styles.track}>
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <article key={s.index} className={styles.card} data-cursor="Explore">
                  <div className={styles.cardTop}>
                    <span className={styles.cardIndex}>{s.index}</span>
                    <span className={styles.cardIcon}>
                      <Icon size={19} strokeWidth={1.7} />
                    </span>
                  </div>

                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{s.title}</h3>
                    <p className={styles.cardTagline}>{s.tagline}</p>
                    <p className={styles.cardDesc}>{s.description}</p>
                  </div>

                  <ul className={styles.cardPoints}>
                    {s.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>

                  <Link href="/services" className={styles.cardLink}>
                    Explore
                    <ArrowUpRight size={15} />
                  </Link>
                </article>
              );
            })}

            {/* End card */}
            <article className={`${styles.card} ${styles.cardEnd}`}>
              <h3 className={styles.cardTitle}>Need something else?</h3>
              <p className={styles.cardDesc}>
                Most projects don&apos;t fit a neat box. Tell us the messy
                version and we&apos;ll tell you honestly if we can help.
              </p>
              <Link href="/contact" className="btn btnPrimary">
                Talk to us <ArrowUpRight size={15} />
              </Link>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
