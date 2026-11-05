import { Sparkles } from "lucide-react";
import styles from "./About.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroInner}`}>
        <span className="pill">
          <Sparkles size={12} /> About us
        </span>
        <h1 className={`display ${styles.heroTitle}`}>
          A team obsessed with{" "}
          <span className={styles.accent}>building things well</span>
        </h1>
        <p className={`lede ${styles.heroLede}`}>
          PrimeCodeStudio is a creative web development studio. We partner with
          startups and businesses to design, build, and ship digital products
          that actually move the needle — from first line of code to production
          launch.
        </p>
      </div>
    </section>
  );
}
