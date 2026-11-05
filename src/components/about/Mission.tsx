import { Target, Compass, Heart } from "lucide-react";
import styles from "./About.module.css";

const VALUES = [
  {
    icon: Target,
    title: "Our mission",
    description:
      "To help startups and businesses turn ambitious ideas into reliable, well-built digital products — without the usual agency overhead or guesswork.",
  },
  {
    icon: Compass,
    title: "Our approach",
    description:
      "Clear communication, tight scopes, and clean code. We treat every project like it's our own product, not just a client deliverable.",
  },
  {
    icon: Heart,
    title: "What we value",
    description:
      "Craftsmanship over shortcuts, honesty over sales pitches, and long-term partnerships over one-off projects.",
  },
];

export default function Mission() {
  return (
    <section className={`section sectionSoft ${styles.mission}`}>
      <div className="container">
        <div className="sectionHead">
          <span className="pill">What drives us</span>
          <h2 className="h2">Mission, approach and values</h2>
        </div>

        <div className={styles.missionGrid}>
          {VALUES.map((value) => {
            const Icon = value.icon;
            return (
              <article key={value.title} className={`${styles.missionCard} reveal`}>
                <div className={styles.missionIconWrap}>
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <h3 className="h3">{value.title}</h3>
                <p className="body">{value.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
