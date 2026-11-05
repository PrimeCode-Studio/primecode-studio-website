"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/lib/animations";
import styles from "./Showcase.module.css";

const WORK = [
  {
    slug: "ledgerly",
    client: "Ledgerly",
    sector: "Fintech SaaS",
    title: "Invoicing that runs itself",
    metric: "3×",
    metricLabel: "faster invoicing",
    stack: ["Next.js", "Postgres", "Stripe"],
    tone: "brand",
  },
  {
    slug: "northwind",
    client: "Northwind Market",
    sector: "Commerce",
    title: "A storefront that survived Black Friday",
    metric: "10×",
    metricLabel: "peak traffic handled",
    stack: ["Headless", "React", "Edge"],
    tone: "cyan",
  },
  {
    slug: "insightly",
    client: "Insightly AI",
    sector: "AI tooling",
    title: "Spreadsheets that explain themselves",
    metric: "40h",
    metricLabel: "saved per month",
    stack: ["Python", "LLM", "FastAPI"],
    tone: "violet",
  },
];

export default function Showcase() {
  const scopeRef = useRef<HTMLDivElement>(null);
  useScrollReveal(scopeRef);

  return (
    <section className={`section ${styles.section}`} ref={scopeRef}>
      <div className={styles.backdrop} aria-hidden="true" />

      <div className="container">
        <div className={styles.head}>
          <div>
            <span className="eyebrow">Selected work</span>
            <h2 className={`h2 ${styles.title}`}>
              Proof, not promises.
            </h2>
          </div>
          <Link href="/projects" className="linkArrow">
            All projects <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className={styles.list}>
          {WORK.map((w, i) => (
            <Link
              key={w.slug}
              href="/projects"
              className={`${styles.row} reveal`}
              data-tone={w.tone}
              data-cursor="Case study"
            >
              <span className={styles.rowIndex}>
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className={styles.rowMain}>
                <span className={styles.rowSector}>{w.sector}</span>
                <h3 className={styles.rowTitle}>{w.title}</h3>
                <span className={styles.rowClient}>{w.client}</span>
              </div>

              <div className={styles.rowMetric}>
                <span className={styles.metricValue}>{w.metric}</span>
                <span className={styles.metricLabel}>{w.metricLabel}</span>
              </div>

              <ul className={styles.rowStack}>
                {w.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>

              <span className={styles.rowArrow}>
                <ArrowUpRight size={20} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
