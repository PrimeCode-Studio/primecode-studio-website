"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import styles from "./Preloader.module.css";

gsap.registerPlugin(TextPlugin);

export default function Preloader({ 
  onSplitStart, 
  onComplete 
}: { 
  onSplitStart: () => void, 
  onComplete: () => void 
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLSpanElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (localStorage.getItem("preloaderPlayed")) {
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        localStorage.setItem("preloaderPlayed", "true");
        onComplete();
      },
    });

    gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.4,
      ease: "power1.inOut"
    });

    tl.to(leftRef.current, {
      duration: 1.2,
      text: "Prime Code",
      ease: "none",
      delay: 0.5
    })
    .to(rightRef.current, {
      duration: 0.6,
      text: " Studio",
      ease: "none"
    })
    .to(particlesRef.current, {
      opacity: 1,
      duration: 0.7,
      ease: "power2.inOut"
    }, "+=0.7")
    .to([leftRef.current, rightRef.current], {
      textShadow: "0px 0px 20px rgba(37, 99, 235, 0.8)",
      duration: 0.5,
    }, "<")
    .to(cursorRef.current, { display: "none", duration: 0 }, "<")
    .call(() => {
      onSplitStart();
    }, undefined, "+=0.5")
    .to(leftRef.current, {
      x: "-35vw",
      opacity: 0,
      duration: 1.5,
      ease: "power4.inOut"
    }, "<")
    .to(rightRef.current, {
      x: "35vw",
      opacity: 0,
      duration: 1.5,
      ease: "power4.inOut"
    }, "<")
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
    }, "-=0.8");

    return () => {
      tl.kill();
    };
  }, [onComplete, onSplitStart]);

  return (
    <div ref={containerRef} className={styles.preloaderContainer}>
      <div ref={particlesRef} className={styles.particles}></div>
      <div className={styles.textContainer}>
        <span ref={leftRef} className={styles.text}></span>
        <span ref={rightRef} className={styles.text}></span>
        <span ref={cursorRef} className={styles.cursor}>|</span>
      </div>
    </div>
  );
}
