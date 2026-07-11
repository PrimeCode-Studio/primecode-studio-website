import { Sparkles } from "lucide-react";
import styles from "./About.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.glowBg} />
      <span className={styles.pill}>
        <Sparkles size={14} /> ABOUT US
      </span>
      <h1 className={styles.heroTitle}>
        We&apos;re a team obsessed
        <br />
        with <span>building things well</span>
      </h1>
      <p className={styles.heroSubtitle}>
        PrimeCodeStudio is a creative web development agency. We partner with
        startups and businesses to design, build, and ship digital products
        that actually move the needle — from first line of code to
        production launch.
      </p>
    </section>
  );
}
