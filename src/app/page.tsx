"use client";
import { useState, useEffect, useCallback } from "react";
import Preloader from "@/components/Preloader";
import Homepage from "@/components/Homepage";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [splitStarted, setSplitStarted] = useState(false);

  useEffect(() => {
    // If skipped via local storage
    if (localStorage.getItem("preloaderPlayed")) {
      setPreloaderDone(true);
      setSplitStarted(true);
    }
  }, []);

  const handleSplitStart = useCallback(() => {
    setSplitStarted(true);
  }, []);

  const handleComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <main style={{ width: "100%" }}>
      {!preloaderDone && (
        <Preloader
          onSplitStart={handleSplitStart}
          onComplete={handleComplete}
        />
      )}
      <Homepage show={splitStarted} isSkip={preloaderDone} />
    </main>
  );
}