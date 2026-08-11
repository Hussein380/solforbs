"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { GraduationCap, Hotel, Building2, Tractor, Stethoscope, ShoppingBag, Factory, Landmark, CalendarClock, WalletCards, MessagesSquare } from "lucide-react";
import { RevealText } from "@/components/motion/RevealText";
import StatusBadge from "@/components/marketing/StatusBadge";
import HeroCarousel from "@/components/marketing/HeroCarousel";
import PlatformShowcase from "@/components/marketing/PlatformShowcase";

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
  { value: 1, suffix: "", label: "Unified platform" },
  { value: 0, suffix: "", label: "Data silos" },
  { value: 100, suffix: "%", label: "Cloud-based" },
  { value: 24, suffix: "/7", label: "System availability" },
];

const capabilities = [
  { id: "admissions", icon: GraduationCap, title: "Admissions & records", desc: "Manage enrolment, student records, and documentation in one place. Go paperless from day one." },
  { id: "timetabling", icon: CalendarClock, title: "Attendance & timetabling", desc: "Track attendance in real time and build conflict-free timetables without spreadsheets." },
  { id: "finance", icon: WalletCards, title: "Finance & billing", desc: "Handle fees, invoicing, and financial reporting for the whole school in one dashboard." },
  { id: "communication", icon: MessagesSquare, title: "Parent communication", desc: "Keep parents, teachers, and admin staff on the same page with an integrated portal." },
];

function InteractiveFeatures() {
  const [active, setActive] = useState(0);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 48, alignItems: "center", marginTop: 40 }} className="stack-mobile">
      {/* Left side: Feature List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {capabilities.map((cap, i) => {
          const isActive = active === i;
          const Icon = cap.icon;
          return (
            <div key={cap.id} onClick={() => setActive(i)}
              style={{
                padding: "20px 24px",
                borderRadius: 16,
                cursor: "pointer",
                border: "1px solid",
                borderColor: isActive ? "rgba(40,120,232,0.2)" : "transparent",
                background: isActive ? "#fff" : "transparent",
                boxShadow: isActive ? "0 8px 30px rgba(0,0,0,0.04)" : "none",
                transition: "all 0.3s ease",
              }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: isActive ? 12 : 0, transition: "margin 0.3s ease" }}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 12,
                  background: isActive ? "linear-gradient(135deg, #39A8F5, #1A3FD4)" : "rgba(0,0,0,0.04)",
                  color: isActive ? "#fff" : "#6B7280",
                  transition: "all 0.3s ease",
                  flexShrink: 0
                }}>
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 600, color: isActive ? "#0D1117" : "#4B5563" }}>{cap.title}</h3>
              </div>
              <motion.div initial={false} animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }} style={{ overflow: "hidden" }}>
                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6, paddingLeft: 60 }}>{cap.desc}</p>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Right side: Mockup Graphic */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", background: "#fff", borderRadius: 24, border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 24px 60px rgba(0,0,0,0.05)", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 48, background: "#F7F9FC", borderBottom: "1px solid rgba(0,0,0,0.04)", display: "flex", alignItems: "center", padding: "0 20px", gap: 6 }}>
           <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#E5E7EB" }} />
           <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#E5E7EB" }} />
           <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#E5E7EB" }} />
        </div>
        <div style={{ padding: 32, paddingTop: 48, display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
           <motion.div key={active} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
             <div style={{ width: 120, height: 120, borderRadius: "50%", background: "linear-gradient(135deg, rgba(57,168,245,0.08), rgba(26,63,212,0.08))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", marginBottom: 24 }}>
                {(() => {
                  const ActiveIcon = capabilities[active].icon;
                  return <ActiveIcon size={48} color="#2878E8" strokeWidth={1.5} />;
                })()}
             </div>
             <p style={{ textAlign: "center", fontWeight: 600, color: "#0D1117", fontSize: 18 }}>System Module Active</p>
             <p style={{ textAlign: "center", color: "#6B7280", fontSize: 13, marginTop: 8 }}>{capabilities[active].title} module is ready for configuration.</p>
             
             {/* Faux Data Lines */}
             <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
                <div style={{ width: 180, height: 8, borderRadius: 4, background: "#F3F4F6" }} />
                <div style={{ width: 140, height: 8, borderRadius: 4, background: "#F3F4F6" }} />
             </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
}

const industries = [
  { name: "Education", icon: GraduationCap, status: "live" as const, desc: "Digital infrastructure for modern schools and universities." },
  { name: "Hospitality", icon: Hotel, status: "in_development" as const, desc: "Seamless property and guest management for hotels." },
  { name: "Real Estate", icon: Building2, status: "planned" as const, desc: "End-to-end property listings and tenant administration." },
  { name: "Agriculture", icon: Tractor, status: "planned" as const, desc: "Supply chain tracking and yield reporting for agribusinesses." },
  { name: "Healthcare", icon: Stethoscope, status: "planned" as const, desc: "Patient records, billing, and scheduling for clinics." },
  { name: "Retail", icon: ShoppingBag, status: "planned" as const, desc: "Unified inventory and point-of-sale for retail chains." },
  { name: "Manufacturing", icon: Factory, status: "planned" as const, desc: "Production planning and workforce management." },
  { name: "Government", icon: Landmark, status: "planned" as const, desc: "Digital permits, secure records, and citizen engagement." },
];

const whyPoints = [
  { num: "01", title: "Industry-focused products", desc: "Each platform is designed around the unique workflows of a specific sector." },
  { num: "02", title: "Built to scale", desc: "Our products evolve with the organizations that use them." },
  { num: "03", title: "Modern by design", desc: "Clean, fast, intuitive software that people enjoy using." },
  { num: "04", title: "Long-term vision", desc: "We are building a connected ecosystem of software for Africa's fastest-growing industries." },
];

const implementationSteps = [
  { step: "Step 1", item: "Consultation & Discovery", desc: "We analyze your exact operational bottlenecks and requirements." },
  { step: "Step 2", item: "Customization & Setup", desc: "Tailoring our platform modules specifically to your workflow." },
  { step: "Step 3", item: "Deployment & Training", desc: "On-site installation and comprehensive staff training." },
  { step: "Step 4", item: "Ongoing Support", desc: "24/7 technical support and continuous feature updates." },
];

export default function HomeClient({ projects = [] }: { projects?: any[] }) {
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
                  {s.label}
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



      {/* ═══════════════════════════════════════════ PRODUCT PROOF (TABBED SHOWCASE) */}
      <section id="products" className="section-pad-sm" style={{ background: "#F7F9FC", borderBottom: "1px solid rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", paddingBottom: 60 }}>
          <Reveal>
            <PlatformShowcase projects={projects} />
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ INDUSTRIES */}
      <section id="industries" className="section-pad-sm stack-mobile" style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2878E8", marginBottom: 12 }}>Platform Ecosystem</p>
            <h2 style={{ fontSize: "clamp(24px, 3.2vw, 40px)", fontWeight: 700, marginBottom: 10 }}>Every industry. One ecosystem.</h2>
            <p style={{ fontSize: 16, color: "#4B5563", marginBottom: 48, maxWidth: 400 }}>Building platforms for every sector that powers Africa's economy.</p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <Reveal key={ind.name} delay={i * 0.04}>
                  <motion.div whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(0,0,0,0.06)" }}
                    style={{
                      padding: "24px", borderRadius: 16, background: "#fff",
                      border: "1px solid rgba(0,0,0,0.06)",
                      transition: "box-shadow 0.3s, border-color 0.3s, transform 0.3s",
                      height: "100%", display: "flex", flexDirection: "column"
                    }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                      <div style={{ 
                        width: 44, height: 44, borderRadius: 12, 
                        background: "#F3F4F6",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#6B7280"
                      }}>
                        <Icon size={22} strokeWidth={2} />
                      </div>
                    </div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: "#0D1117" }}>{ind.name}</h3>
                    <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6, flex: 1 }}>{ind.desc}</p>
                  </motion.div>
                </Reveal>
              );
            })}
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

      {/* ═══════════════════════════════════════════ IMPLEMENTATION PROCESS */}
      <section className="section-pad-sm stack-mobile" style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2878E8", marginBottom: 12 }}>Deployment</p>
            <h2 style={{ fontSize: "clamp(24px, 3.2vw, 40px)", fontWeight: 700, marginBottom: 14 }}>How we work with you</h2>
            <p style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.7, maxWidth: 520, marginBottom: 56 }}>
              Enterprise software shouldn't be hard to implement. We handle the heavy lifting so your team can focus on operations.
            </p>
          </Reveal>

          <div ref={roadmapRef} style={{ position: "relative", paddingLeft: 96 }}>
            <div style={{ position: "absolute", left: 70, top: 0, bottom: 0, width: 1, background: "rgba(0,0,0,0.08)" }}>
              <motion.div style={{ position: "absolute", top: 0, left: 0, right: 0, background: "linear-gradient(to bottom, #39A8F5, rgba(26,63,212,0.2))", height: lineH }} />
            </div>
            {implementationSteps.map((item, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div style={{ display: "flex", alignItems: "flex-start", paddingBottom: 32, position: "relative" }}>
                  <span style={{ position: "absolute", left: -96, fontSize: 11, fontWeight: 700, color: "#9CA3AF", fontVariantNumeric: "tabular-nums", paddingTop: 3, width: 56, textAlign: "right", letterSpacing: "0.05em" }}>{item.step.toUpperCase()}</span>
                  <div style={{
                    position: "absolute", left: -25, top: 5, width: 8, height: 8, borderRadius: "50%",
                    background: "#2878E8",
                    boxShadow: "0 0 0 3px rgba(40,120,232,0.15)",
                    border: "2px solid #2878E8",
                  }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <span style={{ fontSize: 15, fontWeight: 700, color: "#0D1117" }}>{item.item}</span>
                    <span style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.5, paddingRight: 20 }}>{item.desc}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <Link href="/contact" style={{ fontSize: 14, fontWeight: 500, color: "#6B7280", transition: "color 0.2s", display: "inline-block", marginTop: 10 }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#2878E8"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#6B7280"; }}>
              Book a consultation →
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
