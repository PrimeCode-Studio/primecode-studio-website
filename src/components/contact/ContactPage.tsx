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

const EMPTY_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
  honeypot: "",
};

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "primecodestudio11@gmail.com",
    href: "mailto:primecodestudio11@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 73044 14905",
    href: "tel:+917304414905",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Mumbai, India — working with clients worldwide",
    href: undefined,
  },
];

const FAQS = [
  {
    q: "How quickly will you reply?",
    a: "Within one business day. If it's urgent, WhatsApp is the fastest way to reach us.",
  },
  {
    q: "What should I include in my message?",
    a: "A sentence or two about what you're building, your rough timeline, and any budget range you have in mind. Anything else helps but isn't required.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes, we're happy to sign an NDA before you share details about your project.",
  },
];

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);

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
      setForm(EMPTY_FORM);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    }
  }

  return (
    <div className={styles.page}>
      <Nav />

      <main id="main">
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <span className="pill">
              <Sparkles size={12} /> Get in touch
            </span>
            <h1 className={`display ${styles.heroTitle}`}>
              Let&apos;s build{" "}
              <span className={styles.accent}>something great</span>
            </h1>
            <p className={`lede ${styles.heroLede}`}>
              Tell us about your project and we&apos;ll get back to you within
              one business day.
            </p>
          </div>
        </section>

        <section className={styles.contactSection}>
          <div className={`container ${styles.contactGrid}`}>
            {/* ---- Info column ---- */}
            <aside className={styles.infoCol}>
              <h2 className="h3">Prefer to reach out directly?</h2>

              <div className={styles.infoList}>
                {CONTACT_INFO.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <>
                      <span className={styles.infoIconWrap}>
                        <Icon size={17} strokeWidth={1.8} />
                      </span>
                      <span className={styles.infoText}>
                        <span className={styles.infoLabel}>{item.label}</span>
                        <span className={styles.infoValue}>{item.value}</span>
                      </span>
                    </>
                  );

                  return item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      className={styles.infoCard}
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={item.label} className={styles.infoCard}>
                      {content}
                    </div>
                  );
                })}
              </div>

              <div className={styles.faqBlock}>
                <h3 className={styles.faqHeading}>Common questions</h3>
                <div className="faqList">
                  {FAQS.map((faq) => (
                    <details key={faq.q} className="faqItem">
                      <summary>{faq.q}</summary>
                      <p className="faqAnswer">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </aside>

            {/* ---- Form ---- */}
            <form className={styles.form} onSubmit={handleSubmit}>
              <h2 className="h3">Send us a message</h2>

              {/* Honeypot — off-screen, not display:none */}
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
                    autoComplete="name"
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
                    autoComplete="email"
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
                className={`btn btnPrimary btnLg ${styles.submitBtn}`}
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={16} className={styles.spin} /> Sending…
                  </>
                ) : (
                  <>
                    Send message <Send size={16} />
                  </>
                )}
              </button>

              <div aria-live="polite">
                {status === "success" && (
                  <p className={styles.successMsg}>
                    <CheckCircle2 size={16} />
                    Message sent! We&apos;ll get back to you within one business
                    day.
                  </p>
                )}
                {status === "error" && (
                  <p className={styles.errorMsg}>
                    <AlertCircle size={16} />
                    {errorMsg}
                  </p>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
