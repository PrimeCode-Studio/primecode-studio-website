import { User, Link2, Mail } from "lucide-react";
import styles from "./About.module.css";

const FOUNDER_TEAM = [
  {
    name: "Aniket Barai",
    role: "Co-Founder & Lead Developer",
    bio: "Leading with vision, building with purpose, and delivering technology.",
    email: "aniketbarai@gmail.com",
    link: "https://linkedin.com/in/aniketbarai",
  },
  {
    name: "Kirti Sheth",
    role: "Co-Founder & Fullstack Developer",
    bio: "Full-stack engineer focused on clean architecture and shipping fast.",
    email: "kirtisheth26082008@gmail.com",
    link: "https://linkedin.com/in/kirti24-s",
  },
  {
    name: "Satyam Gupta",
    role: "Co-Founder & Python Developer",
    bio: "Python engineer focused on clean architecture and shipping fast.",
    email: "",
    link: "https://www.linkedin.com/in/satyam-gupta-649847332",
  },
];

const DEVELOPER_TEAM = [
  {
    name: "Shubham Shinde",
    role: "Fullstack Developer",
    bio: "Designs interfaces that are as functional as they are good-looking.",
    link: "https://www.linkedin.com/in/shubham-shinde-15513336b",
  },
  {
    name: "Shruti Jadhav",
    role: "AI Engineer",
    bio: "Builds scalable systems that keep everything running smoothly.",
    link: "https://www.linkedin.com/in/shruti-jadhav-832659360",
  },
  {
    name: "Rutuja Harugade",
    role: "Junior Developer",
    bio: "Keeps every project on scope, on time, and on budget.",
    link: "https://www.linkedin.com/in/rutuja-harugade-b50422375",
  },
];

export default function Team() {
  return (
    <section className={styles.team}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionPill}>THE PEOPLE</span>
        <h2>Meet the Team</h2>
        <p>
          Passionate professionals dedicated to building exceptional products.
        </p>
      </div>

      {/* Founder Team */}
      <div className={styles.teamSection}>
        <h3 className={styles.teamTitle}>Founder Team</h3>

        <div className={styles.teamGrid}>
          {FOUNDER_TEAM.map((member) => (
            <div key={member.name} className={styles.teamCard}>
              <div className={styles.avatar}>
                <User size={28} />
              </div>

              <h3>{member.name}</h3>
              <span className={styles.role}>{member.role}</span>
              <p>{member.bio}</p>

              <div className={styles.teamSocials}>
                {member.link && (
                  <a
                    href={member.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} profile`}
                  >
                    <Link2 size={16} />
                  </a>
                )}

                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail size={16} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Development Team */}
      <div className={styles.teamSection}>
        <h3 className={styles.teamTitle}>Development Team</h3>

        <div className={styles.teamGrid}>
          {DEVELOPER_TEAM.map((member) => (
            <div key={member.name} className={styles.teamCard}>
              <div className={styles.avatar}>
                <User size={28} />
              </div>

              <h3>{member.name}</h3>
              <span className={styles.role}>{member.role}</span>
              <p>{member.bio}</p>

              <div className={styles.teamSocials}>
                {member.link && (
                  <a
                    href={member.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} profile`}
                  >
                    <Link2 size={16} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}