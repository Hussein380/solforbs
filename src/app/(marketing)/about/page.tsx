import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "About — Solforbs",
  description: "Solforbs is a technology company building industry-specific software platforms for organizations across Africa.",
};

const values = [
  { title: "Product-first", desc: "We build platforms, not projects. Everything we ship is designed to be used by thousands of organizations across a sector." },
  { title: "Built for Africa", desc: "Our software is designed around the real constraints and opportunities of African markets — connectivity, infrastructure, languages, and workflows." },
  { title: "Long-term thinking", desc: "We make decisions with a 10-year horizon, not a quarterly one. Our products are meant to become the infrastructure of their industries." },
  { title: "Quality without compromise", desc: "We believe organizations in Africa deserve the same quality of software as companies in Silicon Valley. We hold ourselves to that standard." },
];

export default function AboutPage() {
  return (
    <>
      <section className="section-pad stack-mobile" style={{ background: "#fff", position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        {/* Subtle abstract background graphic */}
        <div style={{ position: "absolute", top: -100, right: -100, width: 600, height: 600, background: "radial-gradient(circle, rgba(14,91,255,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -200, left: -200, width: 800, height: 800, background: "radial-gradient(circle, rgba(22,163,74,0.03) 0%, transparent 60%)", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Reveal>
            <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0E5BFF", marginBottom: 20 }}>Company</p>
            <h1 style={{ fontSize: "clamp(40px, 5.5vw, 68px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.04em", marginBottom: 28, fontFamily: "'Space Grotesk', sans-serif" }}>
              About Solforbs
            </h1>
            <p style={{ fontSize: "clamp(18px, 2vw, 22px)", color: "#4B5563", lineHeight: 1.7, maxWidth: 640 }}>
              Solforbs is a technology company focused on building industry-specific software platforms. We create modern, scalable solutions that help organizations improve efficiency, simplify operations, and embrace digital transformation. Beginning with education, our vision is to expand into every major sector with products designed for real-world challenges.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad-sm" style={{ background: "#F8FAFC", borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0E5BFF", marginBottom: 16 }}>What we do</p>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 24, fontFamily: "'Space Grotesk', sans-serif" }}>
              Software products. Not services.
            </h2>
            <p style={{ fontSize: 18, color: "#4B5563", lineHeight: 1.7, maxWidth: 640 }}>
              We build software products — not bespoke solutions, not consultancy services — built to work for an entire industry, out of the box. Our first platform is a school management system that handles everything a school runs on. Next comes hospitality, then real estate, agriculture, healthcare, and beyond.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad-sm" style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0E5BFF", marginBottom: 16 }}>Values</p>
            <h2 style={{ fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 56, fontFamily: "'Space Grotesk', sans-serif" }}>
              What we stand for
            </h2>
          </Reveal>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 48 }}>
            {values.map((val, i) => (
              <Reveal key={val.title} delay={i * 0.1}>
                <div style={{ paddingLeft: 24, borderLeft: "3px solid rgba(14,91,255,0.15)", position: "relative" }}>
                  <div style={{ position: "absolute", left: -14, top: 0, width: 24, height: 24, borderRadius: "50%", background: "#fff", border: "4px solid rgba(14,91,255,0.15)" }} />
                  <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", color: "#0E5BFF", display: "block", marginBottom: 12 }}>
                    0{i + 1}
                  </span>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: "#0F172A", fontFamily: "'Space Grotesk', sans-serif" }}>{val.title}</h3>
                  <p style={{ fontSize: 16, color: "#64748B", lineHeight: 1.6 }}>{val.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad-sm" style={{ background: "#F8FAFC", textAlign: "center", borderTop: "1px solid rgba(0,0,0,0.04)" }}>
        <Reveal>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 16, fontFamily: "'Space Grotesk', sans-serif" }}>
            Want to know more?
          </h2>
          <p style={{ color: "#64748B", marginBottom: 40, fontSize: 18 }}>Reach out — we're happy to talk about what we're building and why.</p>
          <Link href="/contact" style={{ display: "inline-flex", padding: "16px 36px", background: "linear-gradient(135deg, #0E5BFF, #1AA8FF)", color: "#fff", borderRadius: 100, fontSize: 17, fontWeight: 600, boxShadow: "0 8px 24px rgba(14,91,255,0.25)" }}>
            Contact us
          </Link>
        </Reveal>
      </section>
    </>
  );
}
