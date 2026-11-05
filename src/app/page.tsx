"use client";

import { useState, useCallback, useSyncExternalStore } from "react";
import Preloader from "@/components/Preloader";
import Homepage from "@/components/Homepage";

/**
 * The preloader used to gate the whole page behind `opacity: 0`, which meant
 * the server-rendered HTML was invisible to no-JS visitors and crawlers.
 * Now the preloader is a fixed overlay ON TOP of the page: the content is
 * always rendered and visible underneath, and the overlay simply covers it
 * for the duration of the intro.
 */

const STORAGE_KEY = "pcs:intro-played";

/* --- SSR-safe "has this visitor seen the intro?" flag ------------------- */

let cached: boolean | null = null;

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot(): boolean {
  if (cached === null) {
    try {
      cached = window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      cached = false;
    }
  }
  return cached;
}

function getServerSnapshot(): boolean {
  return false;
}

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  const playedBefore = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  // Derived during render — no effect needed, and no setState cascade.
  const showIntro = !playedBefore && !introDone;

  const handleComplete = useCallback(() => {
    setIntroDone(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
      cached = true;
    } catch {
      /* storage unavailable — the intro just replays next time */
    }
  }, []);

  return (
    <>
      {showIntro && <Preloader onComplete={handleComplete} />}
      <main id="main">
        <Homepage />
      </main>
    </>
  );
}
