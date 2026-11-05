"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useBodyScrollLock } from "@/lib/scrollLock";
import styles from "./Preloader.module.css";

gsap.registerPlugin(TextPlugin);

interface PreloaderProps {
  leftText?: string;
  rightText?: string;
  onComplete: () => void;
}

/**
 * Cinematic intro overlay. Sits on top of already-rendered content, so the
 * page is never hidden from crawlers. Locked to a single play per session.
 */
export default function Preloader({
  leftText = "PrimeCode",
  rightText = "Studio",
  onComplete,
}: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLSpanElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);

  useBodyScrollLock(true);

  useEffect(() => {
    const container = containerRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const cursor = cursorRef.current;
    const bar = barRef.current;
    const pct = pctRef.current;

    if (!container || !left || !right || !cursor || !bar || !pct) {
      onComplete();
      return;
    }

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      left.textContent = leftText;
      right.textContent = rightText;
      pct.textContent = "100";
      bar.style.transform = "scaleX(1)";
      onComplete();
      return;
    }

    gsap.set([left, right], { opacity: 1, y: 0 });

    const count = { v: 0 };
    const tl = gsap.timeline();

    tl.to(count, {
      v: 100,
      duration: 1.9,
      ease: "power2.inOut",
      onUpdate: () => {
        pct.textContent = String(Math.round(count.v)).padStart(3, "0");
      },
    })

      // Type the wordmark in
      .to(left, { text: leftText, duration: 0.42, ease: "none" }, 0.05)
      .to(right, { text: rightText, duration: 0.3, ease: "none" }, "+=0.02")

      // Draw the progress hairline
      .to(bar, { scaleX: 1, duration: 1.85, ease: "power2.inOut" }, 0.05)

      // Blur out and lift the overlay
      .to(cursor, { opacity: 0, duration: 0.2 }, "-=0.25")
      .to(
        container,
        {
          yPercent: -100,
          duration: 0.95,
          ease: "expo.inOut",
          onComplete,
        },
        "+=0.1",
      );

    return () => {
      tl.kill();
    };
  }, [leftText, rightText, onComplete]);

  return (
    <div
      ref={containerRef}
      className={styles.overlay}
      role="presentation"
      aria-hidden="true"
    >
      <div className={styles.grain} />
      <div className={styles.glow} />

      <div className={styles.center}>
        <div className={styles.wordmark}>
          <span ref={leftRef} className={styles.word} />
          <span ref={rightRef} className={`${styles.word} ${styles.wordThin}`} />
          <span ref={cursorRef} className={styles.cursor}>
            _
          </span>
        </div>

        <div className={styles.barTrack}>
          <div ref={barRef} className={styles.bar} />
        </div>
      </div>

      <div className={styles.meta}>
        <span className={styles.metaLeft}>Design-led engineering studio</span>
        <span className={styles.pct}>
          <span ref={pctRef}>000</span>
          <span className={styles.pctMark}>%</span>
        </span>
      </div>
    </div>
  );
}
