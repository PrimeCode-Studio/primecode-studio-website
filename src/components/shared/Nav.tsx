"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { useBodyScrollLock } from "@/lib/scrollLock";
import styles from "./Nav.module.css";

const LINKS = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the panel on navigation without a setState-in-effect cascade.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    if (open) setOpen(false);
  }

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label="PrimeCodeStudio home">
          <span className={styles.logoMark}>
            <Image
              src="/logo_without_bg.PNG"
              alt=""
              width={30}
              height={30}
              priority
            />
          </span>
          <span className={styles.logoText}>
            PrimeCode<strong>Studio</strong>
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
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href="/contact" className="btn btnPrimary btnSm">
            Start a project
            <ArrowRight size={15} />
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

      <div
        id="mobile-menu"
        className={`${styles.mobilePanel} ${open ? styles.mobilePanelOpen : ""}`}
        inert={!open}
      >
        <nav className={`container ${styles.mobileInner}`} aria-label="Mobile">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
              <ArrowRight size={17} />
            </Link>
          ))}
          <Link href="/contact" className="btn btnPrimary btnLg">
            Start a project
            <ArrowRight size={16} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
