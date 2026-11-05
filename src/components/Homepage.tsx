"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Star, Zap, ShieldCheck } from "lucide-react";
import Footer from "@/components/shared/Footer";
import Marquee from "@/components/fx/Marquee";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import ServicesRail from "@/components/home/ServicesRail";
import Process from "@/components/home/Process";
import Showcase from "@/components/home/Showcase";
import Faq from "@/components/home/Faq";
import CTA from "@/components/home/CTA";
import { useScrollReveal } from "@/lib/animations";
import styles from "./Homepage.module.css";

const STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Node",
  "PostgreSQL",
  "Stripe",
  "Tailwind",
  "OpenAI",
  "AWS",
  "Vercel",
  "Figma",
  "Framer Motion",
];

const PRINCIPLES = [
  {
    icon: Zap,
    title: "Ship in weeks, not quarters",
    body: "Staging link from day three, weekly demos, no six-month big reveal. You see progress the whole way through.",
  },
  {
    icon: Star,
    title: "Design that earns its keep",
    body: "We design in the browser against real content, so what you approve is exactly what ships — not a prettier Figma lie.",
  },
  {
    icon: ShieldCheck,
    title: "Built to be handed over",
    body: "Typed code, tests where they matter, docs and a recorded walkthrough. No lock-in, no mystery, no hostage codebase.",
  },
];

export default function Homepage() {
  const scopeRef = useRef<HTMLDivElement>(null);
  useScrollReveal(scopeRef);

  return (
    <div className={styles.page} ref={scopeRef}>
      <Hero />

      <Marquee items={STACK} />

      <Stats />

      <ServicesRail />

      <Process />

      <Showcase />

      {/* ---- Principles ---- */}
      <section className={`section ${styles.principles}`}>
        <div className={styles.principleGlow} aria-hidden="true" />
        <div className="container">
          <div className={styles.principleHead}>
            <span className="eyebrow">Why teams pick us</span>
            <h2 className={`h2 ${styles.principleTitle}`}>
              Three things we refuse
              <br />
              <span className={styles.dim}>to compromise on.</span>
            </h2>
          </div>

          <div className={styles.principleGrid}>
            {PRINCIPLES.map((p, i) => {
              const Icon = p.icon;
              return (
                <article
                  key={p.title}
                  className={`${styles.principleCard} reveal`}
                >
                  <span className={styles.principleNum}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.principleIcon}>
                    <Icon size={18} strokeWidth={1.7} />
                  </span>
                  <h3 className="h3">{p.title}</h3>
                  <p className={styles.principleBody}>{p.body}</p>
                </article>
              );
            })}
          </div>

          <div className={`${styles.aboutStrip} reveal`}>
            <p className={styles.aboutText}>
              Six specialists. One studio. Zero account managers between you and
              the people writing the code.
            </p>
            <Link href="/about" className="linkArrow">
              Meet the team <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      <Faq />

      <CTA />

      <Footer />
    </div>
  );
}
