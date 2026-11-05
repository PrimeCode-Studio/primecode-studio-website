import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import styles from "./TermsServices.module.css";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the Terms of Service governing the use of PrimeCodeStudio's website and services.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsServicesPage() {
  return (
    <main className={styles.container}>
      <div className={styles.inner}>
        <Link href="/" className={styles.back}>
          <ArrowLeft size={15} /> Back to home
        </Link>

        <header className={styles.hero}>
          <span className="pill">Legal</span>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className="caption">Last updated: July 14, 2026</p>
        </header>

        <div className={styles.content}>
          <p>
            Welcome to <strong>PrimeCodeStudio</strong>. By accessing our website
            or using our services, you agree to comply with these Terms of
            Service. If you do not agree with these terms, please do not use our
            website or services.
          </p>

          <section>
            <h2>1. Services</h2>
            <p>
              PrimeCodeStudio provides professional software development, website
              development, UI/UX design, AI solutions, and technology consulting.
              The scope of work for each project will be defined in a separate
              proposal or agreement.
            </p>
          </section>

          <section>
            <h2>2. Client responsibilities</h2>
            <ul>
              <li>Provide accurate project requirements.</li>
              <li>Respond to requests for feedback in a timely manner.</li>
              <li>Provide all required content, branding, and assets.</li>
              <li>Ensure they have the rights to all materials they provide.</li>
            </ul>
          </section>

          <section>
            <h2>3. Payments</h2>
            <p>
              Payment terms are defined in the project agreement. Work may begin
              only after the agreed advance payment has been received. Delayed
              payments may result in project delays or suspension.
            </p>
          </section>

          <section>
            <h2>4. Intellectual property</h2>
            <p>
              Upon full payment, ownership of the final deliverables will
              transfer to the client unless otherwise agreed. PrimeCodeStudio
              retains the right to reuse general knowledge, frameworks, tools,
              and non-confidential code developed during the project.
            </p>
          </section>

          <section>
            <h2>5. Confidentiality</h2>
            <p>
              Both parties agree to keep confidential information private and not
              disclose it without written consent unless required by law.
            </p>
          </section>

          <section>
            <h2>6. Revisions</h2>
            <p>
              Revisions included in the project will be specified in the project
              agreement. Additional revisions beyond the agreed scope may incur
              additional charges.
            </p>
          </section>

          <section>
            <h2>7. Project cancellation</h2>
            <p>
              Either party may terminate the project by written notice. Payments
              made for completed work are non-refundable unless otherwise agreed
              in writing.
            </p>
          </section>

          <section>
            <h2>8. Limitation of liability</h2>
            <p>
              PrimeCodeStudio shall not be liable for indirect, incidental,
              special, or consequential damages resulting from the use of our
              services or website.
            </p>
          </section>

          <section>
            <h2>9. Third-party services</h2>
            <p>
              We may integrate third-party platforms, APIs, hosting providers, or
              other services. Their availability and performance are subject to
              their own terms and policies.
            </p>
          </section>

          <section>
            <h2>10. Website usage</h2>
            <ul>
              <li>Do not misuse or attempt to hack our website.</li>
              <li>Do not upload malicious software or harmful content.</li>
              <li>Do not copy or redistribute our content without permission.</li>
              <li>
                Comply with all applicable laws while using our website.
              </li>
            </ul>
          </section>

          <section>
            <h2>11. Changes to these terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time.
              Updates will be posted on this page with a revised effective date.
            </p>
          </section>

          <section>
            <h2>12. Contact us</h2>

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
