import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "./Hero";
import Mission from "./Mission";
import Team from "./Team";
import Nav from "@/components/shared/Nav";
import Footer from "@/components/shared/Footer";
import styles from "./About.module.css";

const STATS = [
  { value: "25+", label: "Projects delivered" },
  { value: "6", label: "Specialists" },
  { value: "100%", label: "Satisfaction rate" },
  { value: "2024", label: "Founded" },
];

const AboutPage = () => {
  return (
    <div className={styles.page}>
      <Nav />

      <main id="main">
        <Hero />

        <section className={styles.statsStrip}>
          <div className={`container ${styles.statsGrid}`}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className="statValue">{s.value}</span>
                <span className="statLabel">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <Mission />
        <Team />

        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaCard}>
              <h2 className={`h2 ${styles.ctaTitle}`}>
                Want to work with us?
              </h2>
              <p className={styles.ctaText}>
                We&apos;re taking on new projects — tell us what you&apos;re
                building and we&apos;ll get back within one business day.
              </p>
              <Link href="/contact" className="btn btnPrimary btnLg">
                Start a conversation <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
