"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import styles from "./Preloader.module.css";

gsap.registerPlugin(TextPlugin);

interface PreloaderProps {
  leftText?: string;
  rightText?: string;
  onSplitStart: () => void;
  onComplete: () => void;
}

export default function Preloader({
  leftText = "Prime Code",
  rightText = " Studio",
  onSplitStart,
  onComplete,
}: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLSpanElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (localStorage.getItem("preloaderPlayed")) {
      onComplete();
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Lock scroll while the preloader is visible
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (prefersReducedMotion) {
      // Skip straight to final state — no animation
      if (leftRef.current) leftRef.current.textContent = leftText;
      if (rightRef.current) rightRef.current.textContent = rightText;
      onSplitStart();
      localStorage.setItem("preloaderPlayed", "true");
      document.body.style.overflow = previousOverflow;
      onComplete();
      return;
    }

    // Guard against missing refs to avoid GSAP runtime failures
    if (!containerRef.current || !leftRef.current || !rightRef.current || !cursorRef.current || !particlesRef.current) {
      document.body.style.overflow = previousOverflow;
      onComplete();
      return;
    }


    // Guard against missing refs to avoid GSAP runtime failures
    if (!containerRef.current || !leftRef.current || !rightRef.current || !cursorRef.current || !particlesRef.current) {
      document.body.style.overflow = previousOverflow;
      onComplete();
      return;
    }

    gsap.set(containerRef.current, { opacity: 1 });
    gsap.set([leftRef.current, rightRef.current], {
      x: 0,
      opacity: 1,
      force3D: true,
    });

    const cursorTween = gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.45,
      ease: "power1.inOut",
    });

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        localStorage.setItem("preloaderPlayed", "true");
        document.body.style.overflow = previousOverflow;
        onComplete();
      },
    });

    tl.from(containerRef.current, { opacity: 0, duration: 0.25 })

      .to(
        leftRef.current,
        { text: leftText, duration: 0.75, ease: "none" },
        "+=0.1"
      )

      .to(rightRef.current, { text: rightText, duration: 0.35, ease: "none" })

      .to(particlesRef.current, { opacity: 1, duration: 0.25 }, "<")

      .to(
        [leftRef.current, rightRef.current],
        {
          textShadow: "0 0 30px rgba(37,99,235,.45)",
          scale: 1.02,
          duration: 0.25,
        },
        "<"
      )

      .to(cursorRef.current, { opacity: 0, duration: 0.1 }, "<")

      .call(onSplitStart, undefined, "+=0.15")

      .to(
        leftRef.current,
        { x: "-30vw", opacity: 0, duration: 0.75, ease: "power4.inOut" },
        "<"
      )

      .to(
        rightRef.current,
        { x: "30vw", opacity: 0, duration: 0.75, ease: "power4.inOut" },
        "<"
      )

      .to(
        containerRef.current,
        { opacity: 0, duration: 0.35, ease: "power2.out" },
        "-=0.25"
      );

    return () => {
      cursorTween.kill();
      tl.kill();
      document.body.style.overflow = previousOverflow;
    };
  }, [leftText, rightText, onComplete, onSplitStart]);

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