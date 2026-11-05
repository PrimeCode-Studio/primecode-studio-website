"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { useMagnetic, useScrollReveal } from "@/lib/animations";
import styles from "./CTA.module.css";

export default function CTA() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useScrollReveal(scopeRef);
  useMagnetic(btnRef, 0.2);

  return (
    <section className={styles.section} ref={scopeRef}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.orb} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <span className="eyebrow reveal">Let&apos;s build</span>

        <h2 className={`display ${styles.title} reveal`}>
          Got something
          <br />
          <span className={styles.accent}>worth building?</span>
        </h2>

        <p className={`${styles.sub} reveal`}>
          Tell us the messy version. We&apos;ll come back within one business day
          with an honest read on scope, timeline and whether we&apos;re the right
          studio for it.
        </p>

        <div className={`${styles.actions} reveal`}>
          <Link
            ref={btnRef}
            href="/contact"
            className="btn btnPrimary btnLg"
            data-cursor="Let's go"
          >
            Start a project <ArrowUpRight size={17} />
          </Link>

          <a
            href="mailto:primecodestudio11@gmail.com"
            className={`btn btnGhost btnLg ${styles.mail}`}
          >
            <Mail size={16} />
            primecodestudio11@gmail.com
          </a>
        </div>

        <div className={`${styles.foot} reveal`}>
          <span className={styles.dot} />
          Currently taking on new projects for next quarter
        </div>
      </div>
    </section>
  );
}
