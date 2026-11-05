"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useBodyScrollLock } from "@/lib/scrollLock";
import styles from "./Nav.module.css";

const LINKS = [
  { label: "Services", href: "/services", index: "01" },
  { label: "Projects", href: "/projects", index: "02" },
  { label: "About", href: "/about", index: "03" },
  { label: "Contact", href: "/contact", index: "04" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close on navigation without a setState-in-effect cascade
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useBodyScrollLock(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      data-open={open}
    >
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label="PrimeCodeStudio home">
          <span className={styles.logoMark}>
            <Image
              src="/logo_without_bg.PNG"
              alt=""
              width={26}
              height={26}
              priority
            />
          </span>
          <span className={styles.logoText}>
            PrimeCode<span>Studio</span>
          </span>
        </Link>

        <nav className={styles.navLinks} aria-label="Primary">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.navLink}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              <span className={styles.navIndex}>{link.index}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href="/contact" className={`btn btnPrimary btnSm ${styles.cta}`}>
            Start a project
            <ArrowUpRight size={15} />
          </Link>

          <button
            className={styles.menuToggle}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Full-screen takeover menu */}
      <div
        id="mobile-menu"
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        inert={!open}
      >
        <div className={`container ${styles.panelInner}`}>
          <nav className={styles.panelLinks} aria-label="Mobile">
            {LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.panelLink}
                style={{ transitionDelay: open ? `${0.06 * i + 0.05}s` : "0s" }}
              >
                <span className={styles.panelIndex}>{link.index}</span>
                <span className={styles.panelLabel}>{link.label}</span>
                <ArrowUpRight size={22} className={styles.panelArrow} />
              </Link>
            ))}
          </nav>

          <div className={styles.panelFoot}>
            <Link href="/contact" className="btn btnPrimary btnLg">
              Start a project <ArrowUpRight size={16} />
            </Link>
            <a
              href="mailto:primecodestudio11@gmail.com"
              className={styles.panelEmail}
            >
              primecodestudio11@gmail.com
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
