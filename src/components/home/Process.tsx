"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/lib/animations";
import styles from "./Process.module.css";

const STEPS = [
  {
    n: "01",
    title: "Diagnose",
    duration: "Week 1",
    body: "We audit what exists, interview the people who use it, and write down what success actually means in numbers. No decks that say nothing.",
    deliverables: ["Discovery brief", "Success metrics", "Technical plan"],
  },
  {
    n: "02",
    title: "Design",
    duration: "Week 1–2",
    body: "Wireframes to a clickable prototype you can put in front of real users. We design in the browser, so nothing gets lost in translation.",
    deliverables: ["User flows", "Design system", "Prototype"],
  },
  {
    n: "03",
    title: "Build",
    duration: "Week 2–6",
    body: "Typed, tested, reviewed. You get a staging link from day three and a weekly demo, so there is never a big reveal at the end.",
    deliverables: ["Staging env", "Weekly demos", "Test coverage"],
  },
  {
    n: "04",
    title: "Launch",
    duration: "Week 6",
    body: "We ship, watch the dashboards, and fix what the real world throws at it. Handover includes docs and a walkthrough recording.",
    deliverables: ["Production launch", "Monitoring", "Docs & handover"],
  },
  {
    n: "05",
    title: "Compound",
    duration: "Ongoing",
    body: "Post-launch we iterate on what the data says, not what we guessed. Support plans that flex with your roadmap.",
    deliverables: ["Analytics review", "Iteration sprints", "Support plan"],
  },
];

export default function Process() {
  const scopeRef = useRef<HTMLDivElement>(null);
  useScrollReveal(scopeRef);

  return (
    <section className={`section ${styles.section}`} ref={scopeRef}>
      <div className="container">
        <div className={styles.head}>
          <span className="eyebrow">How we work</span>
          <h2 className={`h2 ${styles.title}`}>
            A process built on
            <br />
            <span className={styles.titleAccent}>evidence, not vibes.</span>
          </h2>
          <p className="lede reveal">
            Five phases. Fixed checkpoints. You always know what is happening,
            what it costs, and what comes next.
          </p>
        </div>

        <div className={styles.steps}>
          {STEPS.map((s) => (
            <article key={s.n} className={`${styles.step} reveal`}>
              <div className={styles.stepLeft}>
                <span className={styles.stepNum}>{s.n}</span>
                <span className={styles.stepLine} aria-hidden="true" />
              </div>

              <div className={styles.stepMain}>
                <div className={styles.stepHead}>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <span className={styles.stepDuration}>{s.duration}</span>
                </div>
                <p className={styles.stepBody}>{s.body}</p>
                <ul className={styles.chips}>
                  {s.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
