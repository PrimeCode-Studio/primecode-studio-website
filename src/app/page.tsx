"use client";
import { useState, useEffect } from "react";
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

  return (
    <main style={{ width: "100%" }}>

      {!preloaderDone && (
        <Preloader 
          onSplitStart={() => setSplitStarted(true)} 
          onComplete={() => setPreloaderDone(true)} 
        />
      )}
      <Homepage show={splitStarted} isSkip={preloaderDone} />
    </main>
  );
}
