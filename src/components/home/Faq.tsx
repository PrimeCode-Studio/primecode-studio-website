"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/lib/animations";
import styles from "./Faq.module.css";

const FAQS = [
  {
    q: "How long does a project take?",
    a: "A marketing site is usually 2–4 weeks. A web app or commerce build runs 6–12 weeks depending on scope. You get a fixed timeline in writing before any work starts, and a staging link from day three.",
  },
  {
    q: "What does it cost?",
    a: "Every project is quoted individually. We agree a fixed scope and price up front so there are no hourly surprises — and if the scope changes, we tell you what that costs before we build it.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes. We're based in Mumbai and work with teams worldwide, with overlapping hours for calls and async updates in between.",
  },
  {
    q: "Who owns the code?",
    a: "You do. On final payment the repository, deployment access and documentation are yours, with a recorded handover walkthrough.",
  },
  {
    q: "Can you take over an existing codebase?",
    a: "Often, yes. We start with a short technical audit and give you an honest read on what's worth keeping and what needs rebuilding — including when the answer is 'don't hire us for this'.",
  },
];

export default function Faq() {
  const scopeRef = useRef<HTMLDivElement>(null);
  useScrollReveal(scopeRef);

  return (
    <section className={`section ${styles.section}`} ref={scopeRef}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.aside}>
          <span className="eyebrow">FAQ</span>
          <h2 className={`h2 ${styles.title}`}>
            The questions
            <br />
            we always get.
          </h2>
          <p className={`lede ${styles.lede}`}>
            Still unsure? Send a message and you&apos;ll get a real answer from a
            human, not a chatbot.
          </p>
          <Link href="/contact" className="linkArrow">
            Ask us anything <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="faqList reveal">
          {FAQS.map((faq, i) => (
            <details key={faq.q} className="faqItem" open={i === 0}>
              <summary>{faq.q}</summary>
              <p className="faqAnswer">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
