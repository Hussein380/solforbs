"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { RevealText } from "@/components/motion/RevealText";
import StatusBadge from "@/components/marketing/StatusBadge";
import HeroCarousel from "@/components/marketing/HeroCarousel";

// ── Scroll Reveal ────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}>
      {children}
    </motion.div>
  );
}

// ── Animated Counter ─────────────────────────────────────────────
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 2000;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setN(Math.floor(ease * end));
      if (t < 1) requestAnimationFrame(tick);
      else setN(end);
    };
    requestAnimationFrame(tick);
  }, [inView, end]);
  return <span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>{n.toLocaleString()}{suffix}</span>;
}

// ── Data ─────────────────────────────────────────────────────────
const stats = [
  { value: 40, suffix: "+", label: "Schools onboarded" },
  { value: 8500, suffix: "+", label: "Students managed" },
  { value: 1200, suffix: "+", label: "Staff hours saved / mo" },
  { value: 5, suffix: "", label: "Countries reached" },
];

const capabilities = [
  { icon: "🎓", num: "01", title: "Admissions & records", desc: "Manage enrolment, student records, and documentation in one place. Go paperless from day one." },
  { icon: "📅", num: "02", title: "Attendance & timetabling", desc: "Track attendance in real time and build conflict-free timetables without spreadsheets." },
  { icon: "💳", num: "03", title: "Finance & billing", desc: "Handle fees, invoicing, and financial reporting for the whole school in one dashboard." },
  { icon: "💬", num: "04", title: "Parent & staff communication", desc: "Keep parents, teachers, and admin staff on the same page." },
];

const industries = [
  { name: "Education", icon: "📚", status: "live" as const },
  { name: "Hospitality", icon: "🏨", status: "in_development" as const },
  { name: "Real estate", icon: "🏠", status: "planned" as const },
  { name: "Agriculture", icon: "🌾", status: "planned" as const },
  { name: "Healthcare", icon: "🏥", status: "planned" as const },
  { name: "Retail", icon: "🛍️", status: "planned" as const },
  { name: "Manufacturing", icon: "🏭", status: "planned" as const },
  { name: "Government", icon: "🏛️", status: "planned" as const },
];

const whyPoints = [
  { num: "01", title: "Industry-focused products", desc: "Each platform is designed around the unique workflows of a specific sector." },
  { num: "02", title: "Built to scale", desc: "Our products evolve with the organizations that use them." },
  { num: "03", title: "Modern by design", desc: "Clean, fast, intuitive software that people enjoy using." },
  { num: "04", title: "Long-term vision", desc: "We are building a connected ecosystem of software for Africa's fastest-growing industries." },
];

const roadmap = [
  { year: "2026", item: "School Management Platform", status: "live" as const },
  { year: "2026", item: "Hospitality Platform", status: "in_development" as const },
  { year: "2027", item: "Real Estate Platform", status: "planned" as const },
  { year: "2027", item: "Agriculture Platform", status: "planned" as const },
  { year: "2027", item: "Healthcare Platform", status: "planned" as const },
  { year: "2028+", item: "Connected Business Ecosystem", status: "planned" as const },
];

export default function HomeClient() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const roadmapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rmScroll } = useScroll({ target: roadmapRef, offset: ["start end", "end start"] });
  const lineH = useTransform(rmScroll, [0, 0.8], ["0%", "100%"]);

  return (
    <>
      {/* ═══════════════════════════════════════════ HERO */}
      <section ref={heroRef} className="stack-mobile hero-section" style={{
        position: "relative", minHeight: "100vh", display: "flex", alignItems: "center",
        overflow: "hidden",
        background: "#fff",
      }}>
        {/* Subtle bottom separator */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "rgba(0,0,0,0.06)", zIndex: 3 }} />

        {/* Hero text */}
        <motion.div className="section-pad" style={{ position: "relative", zIndex: 4, maxWidth: 1100, margin: "0 auto", width: "100%", opacity: heroOpacity }}>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <StatusBadge status="live" />
            <span style={{ fontSize: 13, color: "#6B7280" }}>School Management Platform is live</span>
          </motion.div>

          <div className="w-full-mobile text-center-mobile" style={{ maxWidth: "52%", minWidth: 280 }}>
            <h1 style={{ fontSize: "clamp(32px, 5.5vw, 68px)", fontWeight: 700, marginBottom: 20, color: "#0D1117" }}>
              <RevealText text="Software built for every industry that powers Africa." />
            </h1>

            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
              style={{ fontSize: "clamp(14px, 1.6vw, 18px)", lineHeight: 1.7, color: "#4B5563", marginBottom: 36 }}>
              Solforbs builds intelligent platforms that help organizations run better — starting with education, expanding across every sector.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.65 }}
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/products/school-management" style={{
                display: "inline-flex", alignItems: "center", gap: 6, padding: "11px 22px",
                background: "linear-gradient(135deg, #39A8F5, #1A3FD4)",
                color: "#fff", borderRadius: 10, fontSize: 14, fontWeight: 600,
                boxShadow: "0 4px 16px rgba(40,120,232,0.35)", transition: "opacity 0.2s, transform 0.2s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
                Explore products
              </Link>
              <Link href="/contact" style={{
                display: "inline-flex", alignItems: "center", padding: "11px 22px",
                background: "#fff", color: "#0D1117",
                borderRadius: 10, fontSize: 14, fontWeight: 500,
                border: "1.5px solid rgba(0,0,0,0.1)", transition: "border-color 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(40,120,232,0.4)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(40,120,232,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; e.currentTarget.style.boxShadow = "none"; }}>
                Contact us
              </Link>
            </motion.div>
          </div>

          {/* Mobile screen carousel (flows between text and stats on mobile) */}
          <HeroCarousel />

          {/* Stats row */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.9 }}
            style={{ display: "flex", gap: 48, marginTop: 64, paddingTop: 32, borderTop: "1px solid rgba(0,0,0,0.07)", flexWrap: "wrap" }}>
            {stats.map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: "clamp(26px, 2.8vw, 38px)", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", background: "linear-gradient(135deg, #39A8F5, #1A3FD4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  <Counter end={s.value} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 4 }}>
                  {s.label} <span style={{ opacity: 0.7, fontStyle: "italic" }}>est.</span>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
          style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "#9CA3AF" }}>Scroll</span>
          <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 1, height: 28, background: "linear-gradient(to bottom, rgba(40,120,232,0.4), transparent)" }} />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════ PRODUCT PROOF */}
      <section className="section-pad-sm" style={{ background: "#F7F9FC", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ marginBottom: 14 }}><StatusBadge status="live" /></div>
            <h2 style={{ fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 700, marginBottom: 10 }}>
              School Management Platform
            </h2>
            <p style={{ fontSize: 16, color: "#4B5563", marginBottom: 48, maxWidth: 440 }}>
              An AI-powered platform for everything a school runs on.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14 }}>
            {capabilities.map((cap, i) => (
              <Reveal key={cap.title} delay={i * 0.07}>
                <motion.div whileHover={{ y: -3, boxShadow: "0 8px 28px rgba(0,0,0,0.09)" }}
                  style={{
                    padding: "24px 20px", borderRadius: 14, background: "#fff",
                    border: "1px solid rgba(0,0,0,0.07)", position: "relative", overflow: "hidden",
                    transition: "box-shadow 0.25s",
                  }}>
                  {/* Top accent line on hover */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #39A8F5, #1A3FD4)", transform: "scaleX(0)", transformOrigin: "left", transition: "transform 0.3s ease" }}
                    className="card-top-line" />
                  <div style={{ position: "absolute", top: 4, right: 16, fontSize: 40, fontWeight: 700, color: "rgba(0,0,0,0.025)", fontFamily: "'Space Grotesk', sans-serif" }}>{cap.num}</div>
                  <div style={{ fontSize: 26, marginBottom: 14 }}>{cap.icon}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, color: "#0D1117" }}>{cap.title}</h3>
                  <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65 }}>{cap.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <div style={{ marginTop: 36 }}>
              <Link href="/products/school-management" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px", background: "linear-gradient(135deg, #39A8F5, #1A3FD4)", color: "#fff", borderRadius: 10, fontSize: 14, fontWeight: 600, boxShadow: "0 4px 14px rgba(40,120,232,0.3)" }}>
                See the full platform →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ INDUSTRIES */}
      <section className="section-pad-sm stack-mobile" style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2878E8", marginBottom: 12 }}>Platform Ecosystem</p>
            <h2 style={{ fontSize: "clamp(24px, 3.2vw, 40px)", fontWeight: 700, marginBottom: 10 }}>Every industry. One ecosystem.</h2>
            <p style={{ fontSize: 16, color: "#4B5563", marginBottom: 48, maxWidth: 400 }}>Building platforms for every sector that powers Africa's economy.</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
            {industries.map((ind, i) => (
              <Reveal key={ind.name} delay={i * 0.04}>
                <motion.div whileHover={{ y: -2, boxShadow: "0 6px 20px rgba(0,0,0,0.07)" }}
                  style={{
                    padding: "18px 16px", borderRadius: 12, background: ind.status === "live" ? "rgba(57,168,245,0.04)" : "#fff",
                    border: `1px solid ${ind.status === "live" ? "rgba(57,168,245,0.25)" : "rgba(0,0,0,0.07)"}`,
                    transition: "box-shadow 0.25s, border-color 0.25s",
                  }}>
                  <span style={{ fontSize: 22, display: "block", marginBottom: 10 }}>{ind.icon}</span>
                  <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#0D1117" }}>{ind.name}</p>
                  <StatusBadge status={ind.status} size="sm" />
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ WHY */}
      <section className="section-pad-sm" style={{ background: "#F7F9FC", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2878E8", marginBottom: 12 }}>Why Solforbs</p>
            <h2 style={{ fontSize: "clamp(24px, 3.2vw, 40px)", fontWeight: 700, marginBottom: 56 }}>Built different. By design.</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 36 }}>
            {whyPoints.map((pt, i) => (
              <Reveal key={pt.num} delay={i * 0.07}>
                <div style={{ paddingLeft: 18, borderLeft: "2px solid rgba(40,120,232,0.2)" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#2878E8", display: "block", marginBottom: 10 }}>{pt.num}</span>
                  <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, color: "#0D1117" }}>{pt.title}</h3>
                  <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.7 }}>{pt.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ ROADMAP */}
      <section className="section-pad-sm stack-mobile" style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2878E8", marginBottom: 12 }}>Roadmap</p>
            <h2 style={{ fontSize: "clamp(24px, 3.2vw, 40px)", fontWeight: 700, marginBottom: 14 }}>Our vision</h2>
            <p style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.7, maxWidth: 520, marginBottom: 56 }}>
              A future where every organization across Africa can access modern, intelligent software built specifically for their sector.
            </p>
          </Reveal>

          <div ref={roadmapRef} style={{ position: "relative", paddingLeft: 96 }}>
            <div style={{ position: "absolute", left: 70, top: 0, bottom: 0, width: 1, background: "rgba(0,0,0,0.08)" }}>
              <motion.div style={{ position: "absolute", top: 0, left: 0, right: 0, background: "linear-gradient(to bottom, #39A8F5, rgba(26,63,212,0.2))", height: lineH }} />
            </div>
            {roadmap.map((item, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div style={{ display: "flex", alignItems: "flex-start", paddingBottom: 28, position: "relative" }}>
                  <span style={{ position: "absolute", left: -96, fontSize: 11, fontWeight: 600, color: "#9CA3AF", fontVariantNumeric: "tabular-nums", paddingTop: 3, width: 56, textAlign: "right" }}>{item.year}</span>
                  <div style={{
                    position: "absolute", left: -25, top: 5, width: 8, height: 8, borderRadius: "50%",
                    background: item.status === "live" ? "#16A34A" : item.status === "in_development" ? "#2878E8" : "#D1D5DB",
                    boxShadow: item.status === "live" ? "0 0 0 3px rgba(22,163,74,0.15)" : item.status === "in_development" ? "0 0 0 3px rgba(40,120,232,0.15)" : "none",
                    border: `2px solid ${item.status === "live" ? "#16A34A" : item.status === "in_development" ? "#2878E8" : "#E5E7EB"}`,
                  }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#0D1117" }}>{item.item}</span>
                    <StatusBadge status={item.status} size="sm" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <Link href="/vision" style={{ fontSize: 14, fontWeight: 500, color: "#6B7280", transition: "color 0.2s", display: "inline-block", marginTop: 20 }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#2878E8"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#6B7280"; }}>
              Read the full vision →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ CTA */}
      <section className="section-pad-sm stack-mobile" style={{ position: "relative", textAlign: "center", overflow: "hidden", background: "linear-gradient(135deg, #39A8F5 0%, #1A3FD4 100%)" }}>
        {/* Subtle grid pattern */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "24px 24px", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>Get started</p>
            <h2 style={{ fontSize: "clamp(30px, 5vw, 56px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "#fff", marginBottom: 16 }}>
              Ready to transform<br />your organization?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 36, fontSize: 16, maxWidth: 400, margin: "0 auto 36px" }}>
              Talk to us about what you need. We'll get back within one business day.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" style={{
                display: "inline-flex", padding: "12px 28px",
                background: "#fff", color: "#1A3FD4",
                borderRadius: 10, fontSize: 15, fontWeight: 700,
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                transition: "opacity 0.2s, transform 0.2s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
                Book a demo
              </Link>
              <Link href="/contact" style={{
                display: "inline-flex", padding: "12px 28px",
                background: "rgba(255,255,255,0.12)", color: "#fff",
                borderRadius: 10, fontSize: 15, fontWeight: 600,
                border: "1.5px solid rgba(255,255,255,0.3)",
                transition: "background 0.2s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.2)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}>
                Contact us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
