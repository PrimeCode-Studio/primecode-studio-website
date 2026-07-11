"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import styles from "./Nav.module.css";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile menu is open, and close on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        <div className={styles.logoIcon}>
          <Image
            src="/logo_without_bg.PNG"
            alt="PrimeCodeStudio Logo"
            width={36}
            height={36}
          />
        </div>
        <span>
          PrimeCode<strong>Studio</strong>
        </span>
      </Link>

      <ul className={styles.navLinks}>
        {LINKS.map((link) => (
          <li
            key={link.href}
            className={pathname === link.href ? styles.active : ""}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>

      <Link href="/contact" className={styles.primaryBtn}>
        Let&apos;s Build Together <ArrowRight size={16} />
      </Link>

      <button
        className={styles.menuToggle}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <div
        className={`${styles.mobilePanel} ${open ? styles.mobilePanelOpen : ""}`}
      >
        <ul className={styles.mobileLinks}>
          {LINKS.map((link, i) => (
            <li
              key={link.href}
              className={pathname === link.href ? styles.mobileActive : ""}
              style={{ transitionDelay: open ? `${i * 0.05}s` : "0s" }}
            >
              <Link href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          className={styles.mobilePrimaryBtn}
          onClick={() => setOpen(false)}
        >
          Let&apos;s Build Together <ArrowRight size={16} />
        </Link>
      </div>

      {open && (
        <div className={styles.backdrop} onClick={() => setOpen(false)} />
      )}
    </nav>
  );
}
