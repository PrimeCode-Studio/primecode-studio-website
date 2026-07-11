import { Target, Compass, Heart } from "lucide-react";
import styles from "./About.module.css";

const VALUES = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To help startups and businesses turn ambitious ideas into reliable, well-built digital products — without the usual agency overhead or guesswork.",
  },
  {
    icon: Compass,
    title: "Our Approach",
    description:
      "Clear communication, tight scopes, and clean code. We treat every project like it's our own product, not just a client deliverable.",
  },
  {
    icon: Heart,
    title: "What We Value",
    description:
      "Craftsmanship over shortcuts, honesty over sales pitches, and long-term partnerships over one-off projects.",
  },
];

export default function Mission() {
  return (
    <section className={styles.mission}>
      <div className={styles.missionGrid}>
        {VALUES.map((value) => {
          const Icon = value.icon;
          return (
            <div key={value.title} className={styles.missionCard}>
              <div className={styles.missionIconWrap}>
                <Icon size={22} />
              </div>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
