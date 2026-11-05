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
 * Full-screen intro overlay. It sits ON TOP of the page rather than
 * replacing it, so the site underneath is always rendered and visible
 * to crawlers and no-JS visitors.
 */
export default function Preloader({
  leftText = "Prime Code",
  rightText = " Studio",
  onComplete,
}: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLSpanElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(true);

  useEffect(() => {
    const container = containerRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    const cursor = cursorRef.current;
    const particles = particlesRef.current;

    // If anything is missing, don't trap the user behind the overlay.
    if (!container || !left || !right || !cursor || !particles) {
      onComplete();
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      left.textContent = leftText;
      right.textContent = rightText;
      onComplete();
      return;
    }

    gsap.set([left, right], { x: 0, opacity: 1, force3D: true });

    const cursorTween = gsap.to(cursor, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.45,
      ease: "power1.inOut",
    });

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.to(left, { text: leftText, duration: 0.7, ease: "none" }, 0.1)
      .to(right, { text: rightText, duration: 0.32, ease: "none" })
      .to(particles, { opacity: 1, duration: 0.25 }, "<")
      .to(cursor, { opacity: 0, duration: 0.1 }, "<")
      .to(
        [left, right],
        { scale: 1.02, duration: 0.2 },
        "<",
      )
      .to(
        left,
        { x: "-28vw", opacity: 0, duration: 0.7, ease: "power4.inOut" },
        "+=0.15",
      )
      .to(right, { x: "28vw", opacity: 0, duration: 0.7, ease: "power4.inOut" }, "<")
      .to(container, { opacity: 0, duration: 0.35 }, "-=0.3")
      .call(onComplete);

    return () => {
      cursorTween.kill();
      tl.kill();
    };
  }, [leftText, rightText, onComplete]);

  return (
    <div
      ref={containerRef}
      className={styles.preloaderContainer}
      role="presentation"
      aria-hidden="true"
    >
      <div ref={particlesRef} className={styles.particles} />

      <div className={styles.textContainer}>
        <span ref={leftRef} className={styles.text} />
        <span ref={rightRef} className={styles.text} />
        <span ref={cursorRef} className={styles.cursor}>
          |
        </span>
      </div>
    </div>
  );
}
