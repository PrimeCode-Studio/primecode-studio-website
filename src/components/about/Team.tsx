import { Link2, Mail } from "lucide-react";
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
    email: "",
    link: "https://www.linkedin.com/in/shubham-shinde-15513336b",
  },
  {
    name: "Shruti Jadhav",
    role: "AI Engineer",
    bio: "Builds scalable systems that keep everything running smoothly.",
    email: "",
    link: "https://www.linkedin.com/in/shruti-jadhav-832659360",
  },
  {
    name: "Rutuja Harugade",
    role: "Junior Developer",
    bio: "Keeps every project on scope, on time, and on budget.",
    email: "",
    link: "https://www.linkedin.com/in/rutuja-harugade-b50422375",
  },
];

type Member = {
  name: string;
  role: string;
  bio: string;
  email?: string;
  link?: string;
};

function TeamCard({ member }: { member: Member }) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <article className={`${styles.teamCard} reveal`}>
      <div className={styles.avatar} aria-hidden="true">
        <span>{initials}</span>
      </div>

      <div className={styles.teamInfo}>
        <h3 className={styles.teamName}>{member.name}</h3>
        <span className={styles.role}>{member.role}</span>
        <p className="body">{member.bio}</p>

        <div className={styles.teamSocials}>
          {member.link && (
            <a
              href={member.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
            >
              <Link2 size={15} />
            </a>
          )}
          {member.email && (
            <a href={`mailto:${member.email}`} aria-label={`Email ${member.name}`}>
              <Mail size={15} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Team() {
  return (
    <section className={`section ${styles.team}`}>
      <div className="container">
        <div className="sectionHead">
          <span className="pill">The people</span>
          <h2 className="h2">Meet the team</h2>
          <p className="lede">
            Passionate professionals dedicated to building exceptional products.
          </p>
        </div>

        <div className={styles.teamSection}>
          <h3 className={styles.teamTitle}>Founders</h3>
          <div className={styles.teamGrid}>
            {FOUNDER_TEAM.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </div>

        <div className={styles.teamSection}>
          <h3 className={styles.teamTitle}>Development team</h3>
          <div className={styles.teamGrid}>
            {DEVELOPER_TEAM.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
