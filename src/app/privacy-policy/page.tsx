import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "./privacy-policy.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how PrimeCodeStudio collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.container}>
      <div className={styles.inner}>
        <Link href="/" className={styles.back}>
          <ArrowLeft size={15} /> Back to home
        </Link>

        <header className={styles.hero}>
          <span className="pill">Legal</span>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className="caption">Last updated: July 14, 2026</p>
        </header>

        <div className={styles.content}>
          <p>
            At <strong>PrimeCodeStudio</strong>, we value your privacy. This
            Privacy Policy explains how we collect, use, and safeguard your
            personal information when you visit our website or use our services.
          </p>

          <section>
            <h2>1. Information we collect</h2>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number (if provided)</li>
              <li>Company information</li>
              <li>Project requirements</li>
              <li>Browser &amp; device information</li>
              <li>IP address</li>
            </ul>
          </section>

          <section>
            <h2>2. How we use your information</h2>
            <ul>
              <li>Respond to inquiries.</li>
              <li>Provide software and web development services.</li>
              <li>Improve website performance and user experience.</li>
              <li>Communicate project updates.</li>
              <li>Maintain website security.</li>
            </ul>
          </section>

          <section>
            <h2>3. Cookies</h2>
            <p>
              Our website may use cookies to improve your browsing experience,
              analyze traffic, and remember preferences. You may disable cookies
              through your browser settings.
            </p>
          </section>

          <section>
            <h2>4. Data protection</h2>
            <p>
              We implement industry-standard security practices to protect your
              personal information against unauthorized access, misuse, or
              disclosure.
            </p>
          </section>

          <section>
            <h2>5. Third-party services</h2>
            <p>
              We may use trusted third-party services such as hosting providers,
              analytics platforms, and communication tools. These providers have
              their own privacy policies.
            </p>
          </section>

          <section>
            <h2>6. Data sharing</h2>
            <p>
              We never sell or rent your personal information. Information is
              shared only when required by law or necessary to provide our
              services.
            </p>
          </section>

          <section>
            <h2>7. Your rights</h2>
            <ul>
              <li>Request access to your personal data.</li>
              <li>Request corrections.</li>
              <li>Request deletion of your information.</li>
              <li>Withdraw consent where applicable.</li>
            </ul>
          </section>

          <section>
            <h2>8. Data retention</h2>
            <p>
              We retain personal information only for as long as necessary to
              provide our services and comply with legal obligations.
            </p>
          </section>

          <section>
            <h2>9. Children&apos;s privacy</h2>
            <p>
              Our services are not intended for children under the age of 13. We
              do not knowingly collect information from children.
            </p>
          </section>

          <section>
            <h2>10. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy periodically. Changes will be
              reflected on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2>11. Contact us</h2>
            <p>
              If you have any questions regarding this Privacy Policy, feel free
              to contact us.
            </p>

            <div className={styles.contactBox}>
              <strong>PrimeCodeStudio</strong>
              <span>Email: primecodestudio11@gmail.com</span>
              <span>Website: primecodestudio.in</span>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
