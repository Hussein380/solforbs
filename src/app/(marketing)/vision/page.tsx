import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Our vision",
  description: "Solforbs envisions a connected ecosystem of intelligent software for every major sector across Africa.",
};

const roadmapItems = [
  { item: "School Management Platform",    status: "live"           as const, why: "Education is very important, but schools lack good software. We are fixing this first." },
  { item: "Hospitality Platform",          status: "in_development" as const, why: "Hotels are growing fast but still use old tools for booking and management." },
  { item: "Retail & POS Platform",         status: "planned"        as const, why: "Shops and businesses need simple, fast tools to track sales and stock." },
  { item: "Real Estate Platform",          status: "planned"        as const, why: "Property markets are expanding, and agents need better digital tools to manage them." },
  { item: "Agriculture Platform",          status: "planned"        as const, why: "Farmers need modern systems to track their crops and supply chains." },
  { item: "Healthcare Platform",           status: "planned"        as const, why: "Hospitals need simple systems to manage patients without the confusing clutter." },
  { item: "Manufacturing Platform",        status: "planned"        as const, why: "Factories need better ways to plan production and manage factory workers." },
  { item: "Government Services",           status: "planned"        as const, why: "Helping governments offer digital permits and secure records to citizens." },
  { item: "Connected Business Ecosystem",  status: "planned"        as const, why: "In the future, all our platforms will connect, allowing businesses to share useful data easily." },
];


export default function VisionPage() {
  return (
    <>
      <section className="section-pad stack-mobile" style={{ background: "#fff", position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 600, height: 600, background: "radial-gradient(circle, var(--brand-tint-8) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Reveal>
            <span className="section-label">Vision</span>
            <h1 style={{ fontSize: "clamp(40px, 5.5vw, 68px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.04em", marginBottom: 28, fontFamily: "'Space Grotesk', sans-serif" }}>
              Our vision
            </h1>
            <p style={{ fontSize: "clamp(18px, 2vw, 22px)", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 640 }}>
              We want a future where every business — from schools and hospitals to farms and hotels — has access to modern, easy-to-use software. Solforbs is building a family of products that helps businesses across Africa work smarter and faster.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad-sm" style={{ background: "var(--bg-alt)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%",  left: "-10%", width: 500, height: 500, background: "radial-gradient(circle, var(--brand-tint-8) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "-10%", width: 600, height: 600, background: "radial-gradient(circle, rgba(22,163,74,0.03) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 760, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Reveal>
            <span className="section-label">Roadmap</span>
            <h2 className="section-title" style={{ marginBottom: 72 }}>One platform at a time</h2>
          </Reveal>

          <div style={{ position: "relative", paddingLeft: 60 }}>
            {/* Timeline line */}
            <div style={{ position: "absolute", left: 23, top: 0, bottom: 0, width: 2, background: "rgba(0,0,0,0.06)" }} />

            {roadmapItems.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 24, paddingBottom: 56, position: "relative" }}>
                  {/* Timeline dot */}
                  <div style={{
                    position: "absolute", left: 18, top: 7, width: 12, height: 12, borderRadius: "50%",
                    background: item.status === "live" ? "var(--brand-mid)" : item.status === "in_development" ? "#D97706" : "#CBD5E1",
                    boxShadow: item.status === "live" ? "0 0 0 4px var(--brand-tint-20)" : "0 0 0 4px rgba(0,0,0,0.04)",
                    border: `2px solid ${item.status === "live" ? "var(--brand-mid)" : item.status === "in_development" ? "#D97706" : "#CBD5E1"}`,
                  }} />

                  <div style={{ background: "#fff", padding: 24, borderRadius: 16, border: "1px solid rgba(0,0,0,0.04)", boxShadow: "var(--shadow-sm)", width: "100%", transform: "translateY(-10px)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12, flexWrap: "wrap" }}>
                      <h3 style={{ fontSize: 19, fontWeight: 700, color: "var(--text-primary)" }}>{item.item}</h3>
                    </div>
                    <p style={{ fontSize: 16, color: "var(--text-secondary)", lineHeight: 1.6 }}>{item.why}</p>

                    {item.status === "live" && (
                      <Link href="/products/school-management"
                        style={{ fontSize: 15, fontWeight: 600, color: "var(--brand-mid)", display: "inline-block", marginTop: 12 }}>
                        View platform →
                      </Link>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad-sm" style={{ background: "#fff", textAlign: "center", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
        <Reveal>
          <h2 className="section-title" style={{ marginBottom: 16 }}>Let us build the future together</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: 40, fontSize: 18 }}>
            Whether you are a partner, investor, or ready to go digital, we would love to talk.
          </p>
          <Link href="/contact" className="btn btn-primary-lg" style={{ borderRadius: 100 }}>
            Book a demo
          </Link>
        </Reveal>
      </section>
    </>
  );
}
