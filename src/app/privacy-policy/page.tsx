import styles from "./privacy-policy.module.css";
import Link from "next/link";


export const metadata = {
  title: "Privacy Policy | PrimeCodeStudio",
  description:
    "Learn how PrimeCodeStudio collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.container}>
      <div className={styles.hero}>
        <h1>Privacy Policy</h1>
        <p>Last Updated: July 14, 2026</p>
      </div>

      <div className={styles.content}>
        <p>
          At <strong>PrimeCodeStudio</strong>, we value your privacy. This
          Privacy Policy explains how we collect, use, and safeguard your
          personal information when you visit our website or use our services.
        </p>

        <section>
          <h2>1. Information We Collect</h2>
          <ul>
            <li>Name</li>
            <li>Email Address</li>
            <li>Phone Number (if provided)</li>
            <li>Company Information</li>
            <li>Project Requirements</li>
            <li>Browser & Device Information</li>
            <li>IP Address</li>
          </ul>
        </section>

        <section>
          <h2>2. How We Use Your Information</h2>
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
          <h2>4. Data Protection</h2>
          <p>
            We implement industry-standard security practices to protect your
            personal information against unauthorized access, misuse, or
            disclosure.
          </p>
        </section>

        <section>
          <h2>5. Third-Party Services</h2>
          <p>
            We may use trusted third-party services such as hosting providers,
            analytics platforms, and communication tools. These providers have
            their own privacy policies.
          </p>
        </section>

        <section>
          <h2>6. Data Sharing</h2>
          <p>
            We never sell or rent your personal information. Information is
            shared only when required by law or necessary to provide our
            services.
          </p>
        </section>

        <section>
          <h2>7. Your Rights</h2>
          <ul>
            <li>Request access to your personal data.</li>
            <li>Request corrections.</li>
            <li>Request deletion of your information.</li>
            <li>Withdraw consent where applicable.</li>
          </ul>
        </section>

        <section>
          <h2>8. Data Retention</h2>
          <p>
            We retain personal information only for as long as necessary to
            provide our services and comply with legal obligations.
          </p>
        </section>

        <section>
          <h2>9. Children's Privacy</h2>
          <p>
            Our services are not intended for children under the age of 13. We
            do not knowingly collect information from children.
          </p>
        </section>

        <section>
          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. Changes will be
            reflected on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2>11. Contact Us</h2>
          <p>
            If you have any questions regarding this Privacy Policy, feel free
            to contact us.
          </p>

          <div className={styles.contactBox}>
            <strong>PrimeCodeStudio</strong>
            <br />
            Email: primecodestudio11@gmail.com
            <br />
            Website: primecodestudio.in
          </div>
        </section>
        <Link href="/" className={styles.backBtn}>
  ← Back to Home
</Link>
      </div>
    </main>
  );
}