"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Homepage from "@/components/Homepage";

/**
 * The intro overlay is client-only and sits ON TOP of the page — the content
 * underneath is fully server-rendered, so crawlers and no-JS visitors always
 * get the real page.
 */
const Preloader = dynamic(() => import("@/components/Preloader"), {
  ssr: false,
});

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  const handleComplete = useCallback(() => setIntroDone(true), []);

  return (
    <>
      {!introDone && <Preloader onComplete={handleComplete} />}
      <main id="main">
        <Homepage />
      </main>
    </>
  );
}
