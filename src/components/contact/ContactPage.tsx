"use client";

import { useState, FormEvent } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import Nav from "@/components/shared/Nav";
import Footer from "@/components/shared/Footer";
import styles from "./Contact.module.css";

type Status = "idle" | "loading" | "success" | "error";

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@primecodestudio.com",
    href: "mailto:hello@primecodestudio.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Mumbai, India — working with clients worldwide",
    href: undefined,
  },
];

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "", honeypot: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className={styles.page}>
      <Nav />

      <section className={styles.hero}>
        <div className={styles.glowBg} />
        <span className={styles.pill}>
          <Sparkles size={14} /> GET IN TOUCH
        </span>
        <h1 className={styles.title}>
          Let&apos;s Build
          <br />
          <span>Something Great</span>
        </h1>
        <p className={styles.subtitle}>
          Tell us about your project and we&apos;ll get back to you within
          one business day.
        </p>
      </section>

      <section className={styles.contactSection}>
        <div className={styles.contactGrid}>
          <div className={styles.infoCol}>
            {CONTACT_INFO.map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <div className={styles.infoIconWrap}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <span className={styles.infoLabel}>{item.label}</span>
                    <span className={styles.infoValue}>{item.value}</span>
                  </div>
                </>
              );
              return item.href ? (
                <a key={item.label} href={item.href} className={styles.infoCard}>
                  {content}
                </a>
              ) : (
                <div key={item.label} className={styles.infoCard}>
                  {content}
                </div>
              );
            })}
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Honeypot field, hidden from real users */}
            <input
              type="text"
              name="honeypot"
              value={form.honeypot}
              onChange={handleChange}
              className={styles.honeypot}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className={styles.formRow}>
              <div className={styles.field}>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.field}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="What's this about?"
                value={form.subject}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Tell us about your project..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className={styles.spin} /> Sending...
                </>
              ) : (
                <>
                  Send Message <Send size={16} />
                </>
              )}
            </button>

            {status === "success" && (
              <div className={styles.successMsg}>
                <CheckCircle2 size={16} />
                Message sent! We&apos;ll get back to you within one business day.
              </div>
            )}
            {status === "error" && (
              <div className={styles.errorMsg}>
                <AlertCircle size={16} />
                {errorMsg}
              </div>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
