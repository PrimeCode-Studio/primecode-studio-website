"use client";

import { useEffect } from "react";

/**
 * Single owner of `document.body.style.overflow`.
 *
 * The old code let three components (Preloader, Nav, Homepage) each write
 * this property on mount, and because child effects run before parent ones,
 * `Homepage`'s unconditional `overflow = ""` silently cancelled the
 * preloader's scroll lock. A ref counter means overlapping locks nest
 * correctly and only the last release restores scrolling.
 */

let lockCount = 0;
let originalOverflow = "";

export function lockBodyScroll() {
  if (typeof document === "undefined") return;
  if (lockCount === 0) {
    originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  lockCount += 1;
}

export function unlockBodyScroll() {
  if (typeof document === "undefined") return;
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = originalOverflow;
  }
}

/** Locks scrolling while `locked` is true. Safe to use in many components. */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    lockBodyScroll();
    return () => unlockBodyScroll();
  }, [locked]);
}
