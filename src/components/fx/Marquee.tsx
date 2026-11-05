"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Marquee.module.css";

/**
 * Infinite horizontal marquee. Duplicates the track so the loop is seamless,
 * then translates by exactly one copy width. Pauses on hover, and is a
 * static, scrollable row under reduced-motion.
 */
export default function Marquee({
  items,
  speed = 40,
  reverse = false,
  className = "",
}: {
  items: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const half = track.scrollWidth / 2;
      if (!half) return;

      const tween = gsap.fromTo(
        track,
        { x: reverse ? -half : 0 },
        {
          x: reverse ? 0 : -half,
          duration: half / speed,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: (x) => `${parseFloat(x) % half}px`,
          },
        },
      );

      const slow = () => gsap.to(tween, { timeScale: 0.25, duration: 0.4 });
      const norm = () => gsap.to(tween, { timeScale: 1, duration: 0.4 });

      wrap.addEventListener("pointerenter", slow);
      wrap.addEventListener("pointerleave", norm);

      return () => {
        wrap.removeEventListener("pointerenter", slow);
        wrap.removeEventListener("pointerleave", norm);
      };
    }, wrap);

    return () => ctx.revert();
  }, [speed, reverse]);

  return (
    <div ref={wrapRef} className={`${styles.marquee} ${className}`}>
      <div ref={trackRef} className={styles.track}>
        {[0, 1].map((copy) => (
          <ul className={styles.list} key={copy} aria-hidden={copy === 1}>
            {items.map((item, i) => (
              <li key={`${item}-${i}`} className={styles.item}>
                <span>{item}</span>
                <span className={styles.dot} aria-hidden="true" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
