import Image from "next/image";
import Link from "next/link";
import {
  FaInstagram,
  FaWhatsapp,
  FaGlobe,
  FaEnvelope,
} from "react-icons/fa";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        {/* Brand */}
        <div className={styles.brandCol}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <Image
                src="/logo_without_bg.PNG"
                alt="PrimeCodeStudio Logo"
                width={32}
                height={32}
              />
            </div>

            <span>
              PrimeCode<strong>Studio</strong>
            </span>
          </div>

          <p className={styles.tagline}>
            Turning ideas into powerful digital experiences. We build modern
            websites, web applications, e-commerce platforms, and AI-powered
            solutions for startups and businesses.
          </p>

          <div className={styles.socials}>
            {/* Website */}
            {/* WhatsApp */}
            <a
              href="https://wa.me/917304414905"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={20} />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/primecodestudio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>

            {/* Email */}
            <a
              href="mailto:primecodestudio11@gmail.com"
              aria-label="Email"
            >
              <FaEnvelope size={20} />
            </a>
          </div>
        </div>

        {/* Company */}
        <div className={styles.linkCol}>
          <h4>Company</h4>

          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/services">Services</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* Services */}
        <div className={styles.linkCol}>
          <h4>Services</h4>

          <Link href="/services">Website Development</Link>
          <Link href="/services">Web Applications</Link>
          <Link href="/services">E-Commerce</Link>
          <Link href="/services">UI/UX Design</Link>
          <Link href="/services">AI Solutions</Link>
        </div>

        {/* Contact */}
        <div className={styles.linkCol}>
          <h4>Get in Touch</h4>

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
        <span>
          © {new Date().getFullYear()} PrimeCodeStudio. All rights reserved.
        </span>

        <div className={styles.bottomLinks}>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}