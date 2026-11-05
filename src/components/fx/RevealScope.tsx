"use client";

import { useRef, type ReactNode } from "react";
import { useScrollReveal } from "@/lib/animations";

/**
 * Wraps server-rendered content and applies the scroll-reveal animation to
 * every descendant with the `reveal` class. Keeping this as a thin client
 * boundary means the pages themselves stay server components and keep their
 * metadata exports.
 */
export default function RevealScope({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
