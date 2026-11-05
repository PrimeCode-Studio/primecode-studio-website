"use client";

import { useRef } from "react";
import { useCounters } from "@/lib/animations";
import styles from "./Stats.module.css";

const STATS = [
  { value: 25, suffix: "+", label: "Projects shipped", decimals: 0 },
  { value: 100, suffix: "%", label: "Client satisfaction", decimals: 0 },
  { value: 6, suffix: "", label: "Specialists on the team", decimals: 0 },
  { value: 99.9, suffix: "%", label: "Average uptime delivered", decimals: 1 },
];

export default function Stats() {
  const scopeRef = useRef<HTMLDivElement>(null);
  useCounters(scopeRef);

  return (
    <section className={styles.section} ref={scopeRef}>
      <div className="container">
        <div className={styles.grid}>
          {STATS.map((s) => (
            <div key={s.label} className={`${styles.cell} reveal`}>
              <span
                className={styles.value}
                data-count={s.value}
                data-suffix={s.suffix}
                data-decimals={s.decimals}
              >
                0{s.suffix}
              </span>
              <span className={styles.label}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
