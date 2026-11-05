"use client";

import { useRef } from "react";
import { useScrollProgress } from "@/lib/animations";
import styles from "./ScrollProgress.module.css";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  useScrollProgress(barRef);

  return (
    <div className={styles.track} aria-hidden="true">
      <div ref={barRef} className={styles.bar} />
    </div>
  );
}
