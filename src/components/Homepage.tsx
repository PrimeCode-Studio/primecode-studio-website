import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Globe,
  ShoppingCart,
  Cpu,
  Rocket,
  PenTool,
  CheckCircle2,
  Search,
  Code2,
  BarChart3,
} from "lucide-react";
import Footer from "@/components/shared/Footer";
import styles from "./Homepage.module.css";

const SERVICES = [
  {
    icon: Globe,
    title: "Website Development",
    description:
      "High-performance, responsive websites that are fast, secure, and built to convert visitors into customers.",
    tags: ["Next.js", "SEO", "Performance"],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Solutions",
    description:
      "Powerful, user-friendly storefronts with secure payments, inventory and order management that scale.",
    tags: ["Storefronts", "Payments", "Logistics"],
  },
  {
    icon: Cpu,
    title: "AI-Powered Solutions",
    description:
      "Integrate AI to automate workflows, enhance experiences, and unlock product capabilities you didn't have before.",
    tags: ["LLM features", "Automation", "Data"],
  },
  {
    icon: Rocket,
    title: "Startup Solutions",
    description:
      "MVP development, product strategy and technical support that helps early-stage teams ship and raise.",
    tags: ["MVPs", "Strategy", "Roadmaps"],
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    description:
      "Conversion-focused design systems, wireframes and prototypes that make products a pleasure to use.",
    tags: ["Design systems", "Prototypes", "Research"],
  },
  {
    icon: Code2,
    title: "Web Applications",
    description:
      "Custom dashboards, portals and internal tools with authentication, roles and clean, tested code.",
    tags: ["Dashboards", "Auth", "APIs"],
  },
];

const STAGES = [
  {
    step: "01",
    label: "Discover",
    title: "Define success before code",
    description:
      "We dig into your goals, audience and constraints to define a clear scope, success criteria and a technical plan — no guesswork, no surprise invoices.",
    icon: Search,
    points: [
      "Stakeholder workshop & goals",
      "Technical architecture plan",
      "Fixed scope and timeline",
    ],
  },
  {
    step: "02",
    label: "Design",
    title: "Interfaces that convert",
    description:
      "Wireframes and a high-fidelity design system that reflect your brand and guide visitors toward action.",
    icon: PenTool,
    points: [
      "Wireframes & user flows",
      "Brand-aligned design system",
      "Responsive specs for every breakpoint",
    ],
  },
  {
    step: "03",
    label: "Build",
    title: "Clean, production-grade code",
    description:
      "Modern frameworks, typed code, automated checks and performance budgets — built to be handed over and maintained.",
    icon: Code2,
    points: [
      "Next.js / React front-ends",
      "REST & database layers",
      "Automated lint, types & build",
    ],
  },
  {
    step: "04",
    label: "Launch & Grow",
    title: "Ship, measure, iterate",
    description:
      "We launch, monitor and iterate with you — with support in place as traffic and the product grow.",
    icon: BarChart3,
    points: [
      "Deployment & monitoring",
      "Analytics & Core Web Vitals",
      "Ongoing support options",
    ],
  },
];

const STATS = [
  { value: "25+", label: "Projects delivered" },
  { value: "100%", label: "Satisfaction rate" },
  { value: "6", label: "Specialists on the team" },
  { value: "2+", label: "Countries served" },
];

const VALUES = [
  {
    title: "Craftsmanship over shortcuts",
    description:
      "Clean architecture, typed code and tests where they matter. We build things that are still maintainable a year later.",
  },
  {
    title: "Tight scopes, honest timelines",
    description:
      "You always know what is being built, what it costs and when it ships. No scope creep, no surprise invoices.",
  },
  {
    title: "Partnerships, not tickets",
    description:
      "We treat every project like our own product — staying involved through launch and beyond.",
  },
];

const FAQS = [
  {
    q: "How long does a typical project take?",
    a: "A marketing website usually takes 2–4 weeks. A web application or e-commerce build typically runs 6–12 weeks depending on scope. We share a fixed timeline before any work begins.",
  },
  {
    q: "How much does a project cost?",
    a: "Every project is quoted individually based on scope, complexity and timeline. Fixed-scope pricing is agreed up front, so there are no hourly surprises.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes. We're based in Mumbai and work with startups and businesses worldwide, with overlapping hours for calls and async updates in between.",
  },
  {
    q: "What happens after launch?",
    a: "You own the code and the deployment. We offer optional ongoing support for updates, monitoring and new features, and we're available for questions after handoff either way.",
  },
  {
    q: "Can you take over an existing project?",
    a: "Often, yes. We start with a short technical audit to understand the codebase and give you an honest assessment of what's worth keeping and what needs rebuilding.",
  },
];

export default function Homepage() {
  return (
    <div className={styles.page}>
      <main id="main">
        {/* ================= HERO ================= */}
        <section className={styles.hero}>
          <div className={`container ${styles.heroInner}`}>
            <span className={`pill ${styles.heroPill}`}>
              <span className={styles.dot} />
              Your vision, our code
            </span>

            <h1 className={`display ${styles.heroTitle}`}>
              Turning ideas into powerful{" "}
              <span className={styles.heroAccent}>digital experiences</span>
            </h1>

            <p className={`lede ${styles.heroLede}`}>
              PrimeCodeStudio is a creative web development studio building
              modern websites, web applications and AI-powered products for
              startups and businesses.
            </p>

            <div className={styles.heroActions}>
              <Link href="/contact" className="btn btnPrimary btnLg">
                Start a project <ArrowRight size={16} />
              </Link>
              <Link href="/projects" className="btn btnOutline btnLg">
                Explore our work
              </Link>
            </div>

            <div className={styles.heroProof}>
              <span className="caption">Trusted by teams in</span>
              <div className={styles.heroProofItems}>
                <span>SaaS</span>
                <span>Retail</span>
                <span>Fintech</span>
                <span>Education</span>
              </div>
            </div>
          </div>

          {/* Hero art — a clean product plate, not a glowing mockup */}
          <div className={`container ${styles.heroArtWrap}`}>
            <div className={styles.heroArt}>
              <div className={styles.mockup}>
                <div className={styles.mockupHeader}>
                  <div className={styles.dots}>
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className={styles.mockupUrl}>primecodestudio.in</span>
                </div>

                <div className={styles.mockupBody}>
                  <div className={styles.mockupCopy}>
                    <span className={`pill pillTint`}>Live preview</span>
                    <h2 className={styles.mockupTitle}>
                      Building the future,
                      <br />
                      one line at a time.
                    </h2>
                    <p className={styles.mockupText}>
                      A clean, fast foundation for your next product.
                    </p>
                    <div className={styles.mockupActions}>
                      <span className={`btn btnPrimary btnSm`}>
                        Start a project
                      </span>
                      <span className={`btn btnOutline btnSm`}>
                        View our work
                      </span>
                    </div>
                  </div>

                  <div className={styles.codeCard}>
                    <div className={styles.codeCardHead}>
                      <span>app/page.tsx</span>
                      <span className={styles.codeDot} />
                    </div>
                    <pre className={styles.code}>
                      <code>
                        <span className={styles.tk}>const</span>{" "}
                        <span className={styles.tf}>inovate</span>{" "}
                        <span className={styles.tk}>=</span> (){" "}
                        <span className={styles.tk}>=&gt;</span> {"{"}
                        {"\n"} {"  "}
                        <span className={styles.tk}>return</span>{" "}
                        <span className={styles.ts}>&quot;excellence&quot;</span>
                        ;{"\n"}
                        {"}"}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>

              <div className={styles.artBadge}>
                <CheckCircle2 size={16} />
                Lighthouse 98
              </div>
            </div>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className={styles.statsStrip}>
          <div className={`container ${styles.statsGrid}`}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className="statValue">{s.value}</span>
                <span className="statLabel">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ================= SERVICES ================= */}
        <section className={`section ${styles.servicesSection}`} id="services">
          <div className="container">
            <div className={styles.headRow}>
              <div className="sectionHead">
                <span className="pill">What we do</span>
                <h2 className="h2">Services we offer</h2>
                <p className="lede">
                  End-to-end digital solutions that help your business grow,
                  scale and stand out.
                </p>
              </div>
              <Link href="/services" className="linkArrow">
                All services <ArrowRight size={15} />
              </Link>
            </div>

            <div className={styles.serviceGrid}>
              {SERVICES.map((service) => {
                const Icon = service.icon;
                return (
                  <article key={service.title} className={styles.serviceCard}>
                    <div className={styles.serviceIcon}>
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                    <h3 className="h3">{service.title}</h3>
                    <p className="body">{service.description}</p>
                    <ul className={styles.tagRow}>
                      {service.tags.map((t) => (
                        <li key={t} className={styles.tag}>
                          {t}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= PROCESS ================= */}
        <section className={`section sectionTint`} id="process">
          <div className="container">
            <div className="sectionHead">
              <span className="pill">How we work</span>
              <h2 className="h2">One studio, from idea to launch</h2>
              <p className="lede">
                A straightforward path from first conversation to production,
                refined across dozens of projects.
              </p>
            </div>

            <div className={styles.stageList}>
              {STAGES.map((stage) => {
                const Icon = stage.icon;
                return (
                  <article key={stage.step} className={styles.stageRow}>
                    <div className={styles.stageMeta}>
                      <span className={styles.stageStep}>{stage.step}</span>
                      <span className={styles.stageLabel}>{stage.label}</span>
                    </div>

                    <div className={styles.stageContent}>
                      <div className={styles.stageIcon}>
                        <Icon size={18} strokeWidth={1.8} />
                      </div>
                      <h3 className={styles.stageTitle}>{stage.title}</h3>
                      <p className="body">{stage.description}</p>
                    </div>

                    <ul className={styles.stagePoints}>
                      {stage.points.map((p) => (
                        <li key={p}>
                          <CheckCircle2 size={15} />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= FEATURED WORK ================= */}
        <section className={`section ${styles.workSection}`}>
          <div className="container">
            <div className={styles.headRow}>
              <div className="sectionHead">
                <span className="pill">Selected work</span>
                <h2 className="h2">Built to be used, not just admired</h2>
              </div>
              <Link href="/projects" className="linkArrow">
                All projects <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className={styles.splitCard}>
              <div className={styles.splitCardBody}>
                <span className={styles.clientMark}>Ledgerly</span>
                <h3 className={styles.splitTitle}>
                  A finance dashboard freelancers actually open
                </h3>
                <p className="body">
                  A full-stack finance dashboard with real-time invoicing and
                  expense tracking, built to replace a spreadsheet workflow.
                </p>

                <div className={styles.splitStats}>
                  <div>
                    <span className="statValue">3×</span>
                    <span className="statLabel">faster invoicing</span>
                  </div>
                  <div>
                    <span className="statValue">98</span>
                    <span className="statLabel">Lighthouse score</span>
                  </div>
                </div>

                <Link href="/projects" className="btn btnTint btnSm">
                  Read case study
                </Link>
              </div>

              <div className={styles.splitCardArt}>
                <div className={styles.artPanel}>
                  <div className={styles.artBarRow}>
                    <span className={styles.artBar} style={{ width: "38%" }} />
                    <span className={styles.artBarSoft} style={{ width: "22%" }} />
                  </div>
                  <div className={styles.artChart}>
                    {[42, 66, 51, 84, 72, 96, 88].map((h, i) => (
                      <span key={i} style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <div className={styles.artCardRow}>
                    <span className={styles.artChip} />
                    <span className={styles.artChip} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= VALUES ================= */}
        <section className={`section sectionSoft`}>
          <div className="container">
            <div className={styles.headRow}>
              <div className="sectionHead">
                <span className="pill">Why us</span>
                <h2 className="h2">A studio you can hand things to</h2>
              </div>
              <Link href="/about" className="linkArrow">
                About the studio <ArrowRight size={15} />
              </Link>
            </div>

            <div className={styles.valueGrid}>
              {VALUES.map((v, i) => (
                <article key={v.title} className={styles.valueCard}>
                  <span className={styles.valueIndex}>
                    0{i + 1}
                  </span>
                  <h3 className="h3">{v.title}</h3>
                  <p className="body">{v.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className={`section ${styles.faqSection}`}>
          <div className={`container ${styles.faqGrid}`}>
            <div className="sectionHead">
              <span className="pill">FAQ</span>
              <h2 className="h2">Questions, answered</h2>
              <p className="lede">
                Still unsure about something? Send us a message and we&apos;ll
                reply within one business day.
              </p>
              <Link href="/contact" className="linkArrow">
                Get in touch <ArrowRight size={15} />
              </Link>
            </div>

            <div className="faqList">
              {FAQS.map((faq, i) => (
                <details
                  key={faq.q}
                  className="faqItem"
                  open={i === 0}
                >
                  <summary>{faq.q}</summary>
                  <p className="faqAnswer">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className={styles.ctaSection}>
          <div className="container">
            <div className={styles.ctaCard}>
              <span className={`pill ${styles.ctaPill}`}>Let&apos;s talk</span>
              <h2 className={`h2 ${styles.ctaTitle}`}>
                See what PrimeCodeStudio can do for you
              </h2>
              <p className={styles.ctaText}>
                Tell us what you&apos;re building and we&apos;ll get back to you
                within one business day.
              </p>
              <div className={styles.ctaActions}>
                <Link href="/contact" className="btn btnPrimary btnLg">
                  Start a project <ArrowRight size={16} />
                </Link>
                <Link href="/services" className="btn btnOutline btnLg">
                  Explore our services
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
