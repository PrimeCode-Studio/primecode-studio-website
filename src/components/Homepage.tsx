"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import styles from "./Homepage.module.css";
import { ArrowRight, Code, Rocket, Sparkles, Globe, Layers, ShoppingCart, Cpu, Zap, LayoutGrid } from "lucide-react";

export default function Homepage({ show, isSkip }: { show: boolean, isSkip: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroLeftRef = useRef<HTMLDivElement>(null);
  const heroRightRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!show && !isSkip) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (!isSkip) {
        // Portal reveal animation
        gsap.set(containerRef.current, { scale: 0.8, opacity: 0 });
        tl.to(containerRef.current, {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
        });
      } else {
        gsap.set(containerRef.current, { scale: 1, opacity: 1 });
      }

      // Sequential entrance
      tl.from(navRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, isSkip ? 0 : "-=0.5")
      .from(heroLeftRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      }, "-=0.4")
      .from(heroRightRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.6")
      .from(servicesRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4");

      // Floating animations for right side elements
      const floaters = heroRightRef.current?.querySelectorAll(`.${styles.floatingCard}`);
      if (floaters) {
        floaters.forEach((el, i) => {
          gsap.to(el, {
            y: "-=15",
            duration: 2 + i * 0.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: i * 0.2
          });
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, [show, isSkip]);

  return (
    <div 
      ref={containerRef} 
      className={styles.homepage}
      style={{ opacity: show || isSkip ? 1 : 0, pointerEvents: show || isSkip ? 'auto' : 'none' }}
    >
      <div className={styles.glowBg}></div>
      <div className={styles.glowBg2}></div>

      <nav ref={navRef} className={styles.nav}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <Image src="/logo.png.jpg" alt="Prime Code Studio Logo" width={36} height={36} />
          </div>
          <span>PRIME CODE <strong>STUDIO</strong></span>
        </div>
        <ul className={styles.navLinks}>
          <li className={styles.active}>Home</li>
          <li>Services</li>
          <li>Projects</li>
          <li>About Us</li>
          <li>Process</li>
          <li>Blog</li>
          <li>Contact</li>
        </ul>
        <button className={styles.primaryBtn}>
          Let's Build Together <ArrowRight size={16} />
        </button>
      </nav>

      <section className={styles.hero}>
        <div ref={heroLeftRef} className={styles.heroLeft}>
          <div className={styles.pill}>
            <Sparkles size={14} className={styles.pillIcon} /> WE BUILD DIGITAL EXCELLENCE
          </div>
          <h1 className={styles.title}>
            Turning Ideas Into<br />
            Powerful <span>Digital</span><br />
            <span>Experiences.</span>
          </h1>
          <p className={styles.subtitle}>
            Prime Code Studio is a creative web development agency building modern websites, web applications, and AI-powered solutions for startups and businesses.
          </p>
          <div className={styles.actions}>
            <button className={`${styles.primaryBtn} ${styles.largeBtn}`}>
              Explore Our Work <ArrowRight size={16} />
            </button>
            <button className={styles.secondaryBtn}>
              Our Services <LayoutGrid size={16} />
            </button>
          </div>
        </div>

        <div ref={heroRightRef} className={styles.heroRight}>
          <div className={styles.dashboardMockup}>
            <div className={styles.mockupHeader}>
              <div className={styles.dots}>
                <span></span><span></span><span></span>
              </div>
              <div className={styles.mockupTitle}>Prime Code Studio</div>
            </div>
            <div className={styles.mockupBody}>
              <div className={styles.mockupContent}>
                <h2>Building the <span>future</span>,<br/>one <span>line</span> at a time.</h2>
                <div className={styles.mockupActions}>
                  <button className={styles.mockupBtn}>Start a Project</button>
                  <button className={styles.mockupBtnOutline}>View Our Work</button>
                </div>
              </div>
              <div className={styles.codeSnippet}>
                <pre>
                  <code>
                    <span className={styles.tokenKeyword}>const</span> <span className={styles.tokenFunc}>innovate</span> = () <span className={styles.tokenKeyword}>=&gt;</span> {'{'}
                    <br/>  <span className={styles.tokenKeyword}>return</span> <span className={styles.tokenString}>"Excellence"</span>;
                    <br/>{'}'}
                  </code>
                </pre>
              </div>
            </div>
          </div>

          <div className={`${styles.floatingCard} ${styles.float1}`}>
            <Rocket size={20} className={styles.floatIcon} />
            <span>Fast Delivery</span>
          </div>
          <div className={`${styles.floatingCard} ${styles.float2}`}>
            <Code size={20} className={styles.floatIcon} />
            <span>Clean Code</span>
          </div>
          <div className={`${styles.floatingCard} ${styles.float3}`}>
            <Zap size={20} className={styles.floatIcon} />
            <span>Modern Design</span>
          </div>

          <div className={styles.statsBar}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Projects Delivered</span>
              <span className={styles.statValue}>25+</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Clients Worldwide</span>
              <span className={styles.statValue}>10+</span>
            </div>
            <div className={styles.statDivider}></div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Satisfaction Rate</span>
              <span className={styles.statValue}>100%</span>
            </div>
          </div>
        </div>
      </section>

      <section ref={servicesRef} className={styles.services}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionPill}>WHAT WE DO</span>
          <h2>Services We Offer</h2>
          <p>We provide end-to-end digital solutions to help your business grow, scale, and stand out in the digital world.</p>
        </div>
        <div className={styles.servicesGrid}>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIconWrap}>
              <Globe size={24} />
            </div>
            <h3>Website Development</h3>
            <p>High-performance, responsive websites that are fast, secure, and built to convert.</p>
            <a href="#" className={styles.learnMore}>Learn More <ArrowRight size={14} /></a>
          </div>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIconWrap}>
              <Layers size={24} />
            </div>
            <h3>Web Application<br/>Development</h3>
            <p>Scalable web applications tailored to your business needs using modern tech.</p>
            <a href="#" className={styles.learnMore}>Learn More <ArrowRight size={14} /></a>
          </div>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIconWrap}>
              <ShoppingCart size={24} />
            </div>
            <h3>E-Commerce Solutions</h3>
            <p>Powerful and user-friendly e-commerce platforms that drive sales and growth.</p>
            <a href="#" className={styles.learnMore}>Learn More <ArrowRight size={14} /></a>
          </div>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIconWrap}>
              <Cpu size={24} />
            </div>
            <h3>AI-Powered Solutions</h3>
            <p>Integrate AI to automate processes, enhance user experience, and innovate.</p>
            <a href="#" className={styles.learnMore}>Learn More <ArrowRight size={14} /></a>
          </div>
          <div className={styles.serviceCard}>
            <div className={styles.serviceIconWrap}>
              <Rocket size={24} />
            </div>
            <h3>Startup Solutions</h3>
            <p>MVP development, product strategy, and technical support for startups.</p>
            <a href="#" className={styles.learnMore}>Learn More <ArrowRight size={14} /></a>
          </div>
        </div>
      </section>
    </div>
  );
}
