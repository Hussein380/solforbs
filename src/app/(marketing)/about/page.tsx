import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ShieldCheck, WifiOff, CreditCard, Cpu } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Solforbs",
  description: "Solforbs is an African enterprise software company building vertical SaaS platforms for the continent's key industries.",
};

const engineeringPillars = [
  {
    icon: WifiOff,
    title: "Offline-First Reliability",
    desc: "African businesses operate in dynamic environments. Our platforms keep functioning during connectivity interruptions and auto-synchronize once back online."
  },
  {
    icon: CreditCard,
    title: "Native Payment Rails",
    desc: "Direct integration with M-Pesa, MTN Mobile Money, Airtel Money, and local banking switches for instant fee collections and settlements."
  },
  {
    icon: Cpu,
    title: "Vertical SaaS Depth",
    desc: "We do not customize generic templates. Every workflow, data schema, and permission matrix is built around the authentic day-to-day needs of that sector."
  },
  {
    icon: ShieldCheck,
    title: "Institutional Data Governance",
    desc: "Encryption at rest and in transit, role-based access control, and strict compliance with national data protection regulations."
  },
];

const values = [
  { 
    title: "Vertical Software, Not Consulting", 
    desc: "We don't build disposable one-off websites. We engineer standard operational platforms that organizations use daily." 
  },
  { 
    title: "Engineered for Local Workflows", 
    desc: "We design software around physical realities, mobile-first usage, and multi-tier organizational hierarchies." 
  },
  { 
    title: "Long-Term Partnership", 
    desc: "Institutional software requires continuous maintenance, security updates, and active technical support over years, not weeks." 
  },
  { 
    title: "Reliable Engineering, Local Context", 
    desc: "African institutions deserve software as fast, stable, and intuitive as the world's best tech platforms." 
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="section-pad stack-mobile" style={{ background: "#fff", position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 600, height: 600, background: "radial-gradient(circle, var(--brand-tint-8) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 880, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Reveal>
            <span className="section-label">Company Mission</span>
            <h1 style={{ fontSize: "clamp(38px, 5.2vw, 64px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.04em", marginBottom: 24, fontFamily: "'Space Grotesk', sans-serif" }}>
              Operational software for African institutions.
            </h1>
            <p style={{ fontSize: "clamp(17px, 1.8vw, 21px)", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 720 }}>
              Solforbs develops specialized software for key industries across East Africa. Based in Nairobi, we replace fragmented paperwork and spreadsheets with reliable platforms for schools, clinics, and hospitality businesses.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Engineering Pillars ───────────────────────────────────── */}
      <section className="section-pad-sm" style={{ background: "var(--bg-alt)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <span className="section-label">Engineering Standards</span>
            <h2 className="section-title" style={{ marginBottom: 16 }}>Built for the realities on the ground</h2>
            <p style={{ fontSize: 17, color: "var(--text-secondary)", maxWidth: 580, lineHeight: 1.6, marginBottom: 48 }}>
              Western enterprise software often fails in Africa because it assumes uninterrupted fiber internet, credit-card dominance, and desktop workstations. We build differently.
            </p>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {engineeringPillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={idx * 0.05}>
                  <div 
                    style={{
                      background: "#FFFFFF",
                      padding: "26px 22px",
                      borderRadius: 16,
                      border: "1px solid rgba(0, 0, 0, 0.06)",
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.02)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: 12,
                    }}
                  >
                    <div 
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 10,
                        background: "var(--brand-tint-8)",
                        color: "var(--brand-mid)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                      {p.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────────── */}
      <section className="section-pad-sm" style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <span className="section-label">Our Principles</span>
            <h2 className="section-title" style={{ marginBottom: 48 }}>How we build software</h2>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 40 }}>
            {values.map((val, i) => (
              <Reveal key={val.title} delay={i * 0.08}>
                <div style={{ paddingLeft: 20, borderLeft: "3px solid var(--border-brand)", position: "relative" }}>
                  <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", color: "var(--brand-mid)", display: "block", marginBottom: 8 }}>
                    0{i + 1}
                  </span>
                  <h3 style={{ fontSize: 19, fontWeight: 700, marginBottom: 10, color: "var(--text-primary)", fontFamily: "'Space Grotesk', sans-serif" }}>
                    {val.title}
                  </h3>
                  <p style={{ fontSize: 14.5, color: "var(--text-secondary)", lineHeight: 1.65, margin: 0 }}>
                    {val.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad-sm" style={{ background: "var(--bg-alt)", textAlign: "center", borderTop: "1px solid rgba(0,0,0,0.04)" }}>
        <Reveal>
          <h2 className="section-title" style={{ marginBottom: 14 }}>Talk to our team</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: 32, fontSize: 17, maxWidth: 520, margin: "0 auto 32px" }}>
            Reach out to our leadership and engineering team to discuss deployments, pilots, or custom platform needs.
          </p>
          <Link href="/contact" className="btn btn-primary" style={{ padding: "12px 32px", borderRadius: 10, fontSize: 15 }}>
            Contact Engineering Team
          </Link>
        </Reveal>
      </section>
    </>
  );
}
