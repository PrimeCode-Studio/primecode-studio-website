"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";
import AuroraShader from "@/components/fx/AuroraShader";
import { useHeadlineReveal, useMagnetic } from "@/lib/animations";
import styles from "./Hero.module.css";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useHeadlineReveal(titleRef, { delay: 0.15, stagger: 0.09 });
  useMagnetic(ctaRef, 0.22);

  return (
    <section className={styles.hero}>
      <AuroraShader />
      <div className={styles.noise} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          <span>Available for new projects</span>
          <span className={styles.badgeSep} />
          <span className={styles.badgeMuted}>Mumbai · Worldwide</span>
        </div>

        <h1 ref={titleRef} className={`display ${styles.title}`}>
          We build digital products that refuse to blend in.
        </h1>

        <p className={styles.sub}>
          PrimeCodeStudio is a design-led engineering studio. We take ambitious
          ideas and ship them as fast, beautiful, production-grade software —
          websites, web apps, commerce and AI.
        </p>

        <div className={styles.actions}>
          <Link
            ref={ctaRef}
            href="/contact"
            className={`btn btnPrimary btnLg ${styles.primary}`}
            data-cursor="Let's talk"
          >
            Start a project <ArrowUpRight size={17} />
          </Link>

          <Link
            href="/projects"
            className={`btn btnGhost btnLg ${styles.secondary}`}
            data-cursor="View work"
          >
            <Play size={13} className={styles.playIcon} />
            See the work
          </Link>
        </div>

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span className={styles.metaKey}>Since</span>
            <span className={styles.metaVal}>2024</span>
          </div>
          <div className={styles.metaDivider} />
          <div className={styles.metaItem}>
            <span className={styles.metaKey}>Projects</span>
            <span className={styles.metaVal}>25+</span>
          </div>
          <div className={styles.metaDivider} />
          <div className={styles.metaItem}>
            <span className={styles.metaKey}>Satisfaction</span>
            <span className={styles.metaVal}>100%</span>
          </div>
        </div>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span>Scroll</span>
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}
