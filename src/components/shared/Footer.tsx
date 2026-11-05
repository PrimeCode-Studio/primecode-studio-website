import Image from "next/image";
import Link from "next/link";
import { Camera, MessageCircle, Mail, ArrowUpRight } from "lucide-react";
import styles from "./Footer.module.css";

const COMPANY = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SERVICES = [
  { label: "Websites", href: "/services" },
  { label: "Web Apps", href: "/services" },
  { label: "Commerce", href: "/services" },
  { label: "AI Products", href: "/services" },
  { label: "Design", href: "/services" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        {/* Oversized wordmark */}
        <div className={styles.wordmarkWrap} aria-hidden="true">
          <span className={styles.wordmark}>PRIMECODE</span>
        </div>

        <div className={styles.top}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo} aria-label="PrimeCodeStudio">
              <span className={styles.logoMark}>
                <Image src="/logo_without_bg.PNG" alt="" width={24} height={24} />
              </span>
              <span className={styles.logoText}>
                PrimeCode<span>Studio</span>
              </span>
            </Link>

            <p className={styles.tagline}>
              A design-led engineering studio in Mumbai, building websites, web
              apps, commerce and AI products for teams who care how it feels.
            </p>

            <div className={styles.socials}>
              <a
                href="https://wa.me/917304414905"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href="https://instagram.com/primecodestudio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Camera size={16} />
              </a>
              <a href="mailto:primecodestudio11@gmail.com" aria-label="Email">
                <Mail size={16} />
              </a>
            </div>
          </div>

          <div className={styles.linkCol}>
            <h2 className={styles.colTitle}>Studio</h2>
            {COMPANY.map((l) => (
              <Link key={l.label} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className={styles.linkCol}>
            <h2 className={styles.colTitle}>Services</h2>
            {SERVICES.map((l) => (
              <Link key={l.label} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className={styles.linkCol}>
            <h2 className={styles.colTitle}>Say hello</h2>
            <a href="mailto:primecodestudio11@gmail.com" className={styles.email}>
              primecodestudio11@gmail.com
            </a>
            <a
              href="https://wa.me/917304414905"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.wa}
            >
              Chat on WhatsApp <ArrowUpRight size={13} />
            </a>
            <span className={styles.muted}>
              Mumbai, India — working with clients worldwide.
            </span>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className="caption">
            © {year} PrimeCodeStudio. All rights reserved.
          </span>
          <div className={styles.bottomLinks}>
            <Link href="/privacy-policy" className="caption">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="caption">
              Terms of Service
            </Link>
          </div>
          <span className={`caption ${styles.built}`}>
            Designed &amp; built in-house
          </span>
        </div>
      </div>
    </footer>
  );
}
