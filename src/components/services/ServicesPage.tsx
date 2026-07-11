import Link from "next/link";
import {
  ArrowRight,
  Globe,
  Layers,
  ShoppingCart,
  Cpu,
  Rocket,
  PenTool,
  Search,
  Code2,
  CheckCircle2,
} from "lucide-react";
import Nav from "@/components/shared/Nav";
import Footer from "@/components/shared/Footer";
import styles from "./Services.module.css";

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
      "Sub-second load times",
    ],
  },
  {
    icon: Layers,
    title: "Web Application Development",
    description:
      "Scalable web applications tailored to your business logic, built on modern, maintainable tech stacks.",
    features: [
      "React / Next.js front-ends",
      "REST & GraphQL APIs",
      "Role-based access control",
      "Cloud-native deployment",
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
    icon: Rocket,
    step: "04",
    title: "Deploy",
    description:
      "Launch, monitor, and iterate — with support in place as your product and traffic grow.",
  },
];

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <Nav />

      <section className={styles.hero}>
        <div className={styles.glowBg} />
        <span className={styles.pill}>WHAT WE DO</span>
        <h1 className={styles.title}>
          Solutions Built To
          <br />
          <span>Scale</span> Your Business
        </h1>
        <p className={styles.subtitle}>
          From first line of code to production launch, we build the digital
          products that help startups and businesses grow — fast, reliable,
          and designed to last.
        </p>
      </section>

      <section className={styles.servicesSection}>
        <div className={styles.servicesGrid}>
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className={styles.serviceCard}>
                <div className={styles.serviceIconWrap}>
                  <Icon size={24} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className={styles.featureList}>
                  {service.features.map((feature) => (
                    <li key={feature}>
                      <CheckCircle2 size={15} className={styles.checkIcon} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className={styles.learnMore}>
                  Get Started <ArrowRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.processSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionPill}>HOW WE WORK</span>
          <h2>Our Process</h2>
          <p>A straightforward path from idea to launch, refined over dozens of projects.</p>
        </div>
        <div className={styles.processGrid}>
          {PROCESS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className={styles.processCard}>
                <span className={styles.processStep}>{item.step}</span>
                <div className={styles.processIconWrap}>
                  <Icon size={20} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <h2>
            Have a project in mind?
            <br />
            Let&apos;s build it together.
          </h2>
          <p>Tell us what you&apos;re working on and we&apos;ll get back to you within one business day.</p>
          <Link href="/contact" className={styles.ctaBtn}>
            Start a Project <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
