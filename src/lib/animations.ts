"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------------------------------------------------------------------
   Masked line-by-line headline reveal
   ------------------------------------------------------------------------- */

export function useHeadlineReveal(
  ref: RefObject<HTMLElement | null>,
  { delay = 0, stagger = 0.075 }: { delay?: number; stagger?: number } = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReduced()) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    const split = new SplitText(el, {
      type: "lines",
      linesClass: "hl-line",
      mask: "lines",
    });

    // Lines inherit the mask wrapper; animate each line up from behind it
    const tl = gsap.timeline({ delay });

    tl.fromTo(
      split.lines,
      { yPercent: 118, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.15,
        ease: "power4.out",
        stagger,
      },
    );

    gsap.set(el, { opacity: 1 });

    return () => {
      tl.kill();
      split.revert();
    };
  }, [ref, delay, stagger]);
}

/* ---------------------------------------------------------------------------
   Generic scroll-triggered reveal for a whole subtree
   ------------------------------------------------------------------------- */

export function useScrollReveal(
  scopeRef: RefObject<HTMLElement | null>,
  selector = ".reveal",
) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const targets = gsap.utils.toArray<HTMLElement>(
      scope.querySelectorAll(selector),
    );
    if (!targets.length) return;

    if (prefersReduced()) {
      gsap.set(targets, { opacity: 1, y: 0, clearProps: "transform" });
      return;
    }

    const ctx = gsap.context(() => {
      targets.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 42, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
    }, scope);

    return () => ctx.revert();
  }, [scopeRef, selector]);
}

/* ---------------------------------------------------------------------------
   Char-by-char label / stat reveal
   ------------------------------------------------------------------------- */

export function useCharReveal(
  ref: RefObject<HTMLElement | null>,
  trigger?: string,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;

    const split = new SplitText(el, { type: "chars,words" });

    const ctx = gsap.context(() => {
      gsap.from(split.chars, {
        opacity: 0,
        y: 14,
        rotateX: -70,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.018,
        scrollTrigger: {
          trigger: trigger ? el.closest(trigger) ?? el : el,
          start: "top 90%",
          once: true,
        },
      });
    });

    return () => {
      ctx.revert();
      split.revert();
    };
  }, [ref, trigger]);
}

/* ---------------------------------------------------------------------------
   Count-up numbers on scroll
   ------------------------------------------------------------------------- */

export function useCountUp(
  ref: RefObject<HTMLElement | null>,
  value: number,
  { suffix = "", prefix = "", decimals = 0 } = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const format = (n: number) =>
      `${prefix}${n.toFixed(decimals)}${suffix}`;

    if (prefersReduced()) {
      el.textContent = format(value);
      return;
    }

    const obj = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        n: value,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = format(obj.n);
        },
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, [ref, value, suffix, prefix, decimals]);
}

/* ---------------------------------------------------------------------------
   Magnetic button / card — subtle pointer attraction
   ------------------------------------------------------------------------- */

export function useMagnetic<T extends HTMLElement>(
  ref: RefObject<T | null>,
  strength = 0.28,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      xTo(dx * strength);
      yTo(dy * strength);
    };

    const onLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [ref, strength]);
}

/* ---------------------------------------------------------------------------
   Sticky horizontal scroll — the signature section
   ------------------------------------------------------------------------- */

export function useHorizontalScroll(
  sectionRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    if (prefersReduced() || window.innerWidth < 900) {
      return;
    }

    const ctx = gsap.context(() => {
      const getDistance = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [sectionRef, trackRef]);
}

/* ---------------------------------------------------------------------------
   Progress bar tied to page scroll
   ------------------------------------------------------------------------- */

export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        },
      );
    });

    return () => ctx.revert();
  }, [ref]);
}

/* ---------------------------------------------------------------------------
   Ref helper for a one-off count-up driven by plain effect
   ------------------------------------------------------------------------- */

export function useCounters(scopeRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const nodes = gsap.utils.toArray<HTMLElement>(
      scope.querySelectorAll("[data-count]"),
    );
    if (!nodes.length) return;

    const ctx = gsap.context(() => {
      nodes.forEach((el) => {
        const target = parseFloat(el.dataset.count || "0");
        const suffix = el.dataset.suffix || "";
        const prefix = el.dataset.prefix || "";
        const decimals = parseInt(el.dataset.decimals || "0", 10);

        if (prefersReduced()) {
          el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
          return;
        }

        const obj = { n: 0 };
        gsap.to(obj, {
          n: target,
          duration: 1.7,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${prefix}${obj.n.toFixed(decimals)}${suffix}`;
          },
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });
    }, scope);

    return () => ctx.revert();
  }, [scopeRef]);
}

export { gsap, ScrollTrigger, SplitText };
