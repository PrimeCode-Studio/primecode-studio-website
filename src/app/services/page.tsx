import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  ShoppingCart,
  Cpu,
  Rocket,
  PenTool,
  Code2,
  Search,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import Nav from "@/components/shared/Nav";
import Footer from "@/components/shared/Footer";
import RevealScope from "@/components/fx/RevealScope";
import styles from "@/components/services/Services.module.css";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website development, web applications, e-commerce, AI-powered solutions, startup MVPs, and UI/UX design from PrimeCodeStudio.",
  alternates: { canonical: "/services" },
};

const SERVICES = [
  {
    icon: Globe,
    title: "Website Development",
    description:
      "High-performance, responsive websites that are fast, secure, and built to convert visitors into customers.",
    features: [
      "Custom design & development",
      "SEO-optimized architecture",
      "Mobile-first responsive builds",
      "React / Next.js front-ends",
      "Analytics & Core Web Vitals",
    ],
  },
  {
    icon: Code2,
    title: "Web Applications",
    description:
      "Custom dashboards, portals and internal tools with real authentication, roles and clean, tested code.",
    features: [
      "Dashboards & admin panels",
      "Role-based access control",
      "REST APIs & integrations",
      "Database design",
      "Automated tests & CI",
    ],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description:
      "Powerful, user-friendly e-commerce platforms that drive sales and scale with your catalog.",
    features: [
      "Custom storefronts",
      "Secure payment integration",
      "Inventory & order management",
      "Headless commerce options",
      "Checkout optimisation",
    ],
  },
  {
    icon: Cpu,
    title: "AI-Powered Solutions",
    description:
      "Integrate AI to automate processes, enhance user experience, and unlock new product capabilities.",
    features: [
      "LLM-powered features",
      "Workflow automation",
      "Custom AI integrations",
      "Data pipeline setup",
      "Evaluation & guardrails",
    ],
  },
  {
    icon: Rocket,
    title: "Startup Solutions",
    description:
      "MVP development, product strategy, and technical support to help early-stage startups move fast.",
    features: [
      "Rapid MVP builds",
      "Technical co-founder support",
      "Product roadmap planning",
      "Investor-ready demos",
      "Iteration after launch",
    ],
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    description:
      "Thoughtful, conversion-focused design systems that make your product a pleasure to use.",
    features: [
      "Design systems & branding",
      "Wireframing & prototyping",
      "User research & testing",
      "Figma-to-code handoff",
      "Accessibility review",
    ],
  },
];

const PROCESS = [
  {
    icon: Search,
    step: "01",
    title: "Discover",
    description:
      "We dig into your goals, audience, and constraints to define a clear scope and success criteria.",
  },
  {
    icon: PenTool,
    step: "02",
    title: "Design",
    description:
      "Wireframes and high-fidelity design systems that reflect your brand and convert visitors.",
  },
  {
    icon: Code2,
    step: "03",
    title: "Develop",
    description:
      "Clean, tested, production-grade code built on modern frameworks with performance in mind.",
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Deploy",
    description:
      "Launch, monitor, and iterate — with support in place as your product and traffic grow.",
  },
];

const FAQS = [
  {
    q: "How do you price projects?",
    a: "Every project is quoted individually based on scope, complexity and timeline. We agree a fixed scope and price up front, so there are no hourly surprises.",
  },
  {
    q: "Do you work with existing codebases?",
    a: "Yes. We start with a short technical audit, give you an honest assessment, and then decide together whether to extend, refactor or rebuild.",
  },
  {
    q: "Who owns the code when we're done?",
    a: "You do. On final payment the deliverables and repository are yours, including deployment access and documentation.",
  },
  {
    q: "What do you need from me to start?",
    a: "A short brief on your goals, any brand assets you already have, and a point of contact who can give feedback. We handle the rest of the discovery.",
  },
];

export default function Services() {
  return (
    <div className={styles.page}>
      <Nav />

      <main id="main">
        <RevealScope>
        {/* ---- Hero ---- */}
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <span className="pill">What we do</span>
            <h1 className={`display ${styles.heroTitle}`}>
              Solutions built to{" "}
              <span className={styles.accent}>scale your business</span>
            </h1>
            <p className={`lede ${styles.heroLede}`}>
              From first line of code to production launch, we build the digital
              products that help startups and businesses grow — fast, reliable,
              and designed to last.
            </p>
            <div className={styles.heroActions}>
              <Link href="/contact" className="btn btnPrimary btnLg">
                Start a project <ArrowRight size={16} />
              </Link>
              <Link href="/projects" className="btn btnOutline btnLg">
                See our work
              </Link>
            </div>
          </div>
        </section>

        {/* ---- Services grid ---- */}
        <section className={`section ${styles.servicesSection}`}>
          <div className="container">
            <div className={styles.serviceGrid}>
              {SERVICES.map((service) => {
                const Icon = service.icon;
                return (
                  <article key={service.title} className={`${styles.serviceCard} reveal`}>
                    <div className={styles.serviceIcon}>
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                    <h2 className="h3">{service.title}</h2>
                    <p className="body">{service.description}</p>
                    <ul className={styles.featureList}>
                      {service.features.map((feature) => (
                        <li key={feature}>
                          <CheckCircle2 size={15} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact" className="linkArrow">
                      Get started <ArrowRight size={14} />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---- Process ---- */}
        <section className={`section sectionTint`}>
          <div className="container">
            <div className="sectionHead">
              <span className="pill">How we work</span>
              <h2 className="h2">Our process</h2>
              <p className="lede">
                A straightforward path from idea to launch, refined over dozens
                of projects.
              </p>
            </div>

            <div className={styles.processList}>
              {PROCESS.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.step} className={`${styles.processRow} reveal`}>
                    <span className={styles.processStep}>{item.step}</span>
                    <div className={styles.processIcon}>
                      <Icon size={18} strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="h3">{item.title}</h3>
                      <p className="body">{item.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---- FAQ ---- */}
        <section className="section">
          <div className={`container ${styles.faqGrid}`}>
            <div className="sectionHead">
              <span className="pill">FAQ</span>
              <h2 className="h2">Common questions</h2>
              <p className="lede">
                Something we haven&apos;t covered? Send us a message.
              </p>
              <Link href="/contact" className="linkArrow">
                Get in touch <ArrowRight size={15} />
              </Link>
            </div>

            <div className="faqList">
              {FAQS.map((faq) => (
                <details key={faq.q} className="faqItem">
                  <summary>{faq.q}</summary>
                  <p className="faqAnswer">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---- CTA ---- */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaCard}>
              <h2 className={`h2 ${styles.ctaTitle}`}>
                Have a project in mind?
                <br />
                Let&apos;s build it together.
              </h2>
              <p className={styles.ctaText}>
                Tell us what you&apos;re working on and we&apos;ll get back to
                you within one business day.
              </p>
              <Link href="/contact" className="btn btnPrimary btnLg">
                Start a project <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
        </RevealScope>
      </main>

      <Footer />
    </div>
  );
}
