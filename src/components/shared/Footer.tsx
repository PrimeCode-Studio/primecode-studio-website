import Image from "next/image";
import Link from "next/link";
import { Camera, MessageCircle, Mail } from "lucide-react";
import styles from "./Footer.module.css";

const COMPANY = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SERVICES = [
  { label: "Website Development", href: "/services" },
  { label: "Web Applications", href: "/services" },
  { label: "E-Commerce", href: "/services" },
  { label: "UI/UX Design", href: "/services" },
  { label: "AI Solutions", href: "/services" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo} aria-label="PrimeCodeStudio">
              <span className={styles.logoMark}>
                <Image src="/logo_without_bg.PNG" alt="" width={26} height={26} />
              </span>
              <span className={styles.logoText}>
                PrimeCode<strong>Studio</strong>
              </span>
            </Link>

            <p className={styles.tagline}>
              Turning ideas into powerful digital experiences. Modern websites,
              web applications, e-commerce platforms and AI-powered solutions
              for startups and businesses.
            </p>

            <div className={styles.socials}>
              <a
                href="https://wa.me/917304414905"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <MessageCircle size={17} />
              </a>
              <a
                href="https://instagram.com/primecodestudio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Camera size={17} />
              </a>
              <a href="mailto:primecodestudio11@gmail.com" aria-label="Email">
                <Mail size={17} />
              </a>
            </div>
          </div>

          <div className={styles.linkCol}>
            <h2 className={styles.colTitle}>Company</h2>
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
            <h2 className={styles.colTitle}>Get in touch</h2>
            <a href="mailto:primecodestudio11@gmail.com">
              primecodestudio11@gmail.com
            </a>
            <a
              href="https://wa.me/917304414905"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
            <span className={styles.muted}>
              Available for new projects worldwide.
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
        </div>
      </div>
    </footer>
  );
}
