import { User, Link2, Mail } from "lucide-react";
import styles from "./About.module.css";

const TEAM = [
  {
    name: "Aniket Sharma",
    role: "Founder & Lead Developer",
    bio: "Full-stack engineer focused on clean architecture and shipping fast.",
  },
  {
    name: "Priya Nair",
    role: "UI/UX Designer",
    bio: "Designs interfaces that are as functional as they are good-looking.",
  },
  {
    name: "Rohan Mehta",
    role: "Backend Engineer",
    bio: "Builds the scalable systems that keep everything running smoothly.",
  },
  {
    name: "Sara Iqbal",
    role: "Project Manager",
    bio: "Keeps every project on scope, on time, and on budget.",
  },
];

export default function Team() {
  return (
    <section className={styles.team}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionPill}>THE PEOPLE</span>
        <h2>Meet the Team</h2>
        <p>A small, senior team that cares about the details.</p>
      </div>
      <div className={styles.teamGrid}>
        {TEAM.map((member) => (
          <div key={member.name} className={styles.teamCard}>
            <div className={styles.avatar}>
              <User size={28} />
            </div>
            <h3>{member.name}</h3>
            <span className={styles.role}>{member.role}</span>
            <p>{member.bio}</p>
            <div className={styles.teamSocials}>
              <a href="#" aria-label={`${member.name} profile`}>
                <Link2 size={15} />
              </a>
              <a href="#" aria-label={`Email ${member.name}`}>
                <Mail size={15} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
