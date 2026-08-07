import type { Metadata } from "next";
import Link from "next/link";

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
      <section className="section-pad" style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2878E8", marginBottom: 18 }}>Company</p>
          <h1 style={{ fontSize: "clamp(34px, 5vw, 60px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 22, fontFamily: "'Space Grotesk', sans-serif" }}>
            About Solforbs
          </h1>
          <p style={{ fontSize: "clamp(15px, 1.8vw, 18px)", color: "#4B5563", lineHeight: 1.7, maxWidth: 560 }}>
            Solforbs is a technology company focused on building industry-specific software platforms. We create modern, scalable solutions that help organizations improve efficiency, simplify operations, and embrace digital transformation. Beginning with education, our vision is to expand into every major sector with products designed for real-world challenges.
          </p>
        </div>
      </section>

      <section className="section-pad-sm" style={{ background: "#F7F9FC", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2878E8", marginBottom: 14 }}>What we do</p>
          <h2 style={{ fontSize: "clamp(22px, 2.8vw, 34px)", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 20 }}>
            Software products. Not services.
          </h2>
          <p style={{ fontSize: 16, color: "#4B5563", lineHeight: 1.7, maxWidth: 600 }}>
            We build software products — not bespoke solutions, not consultancy services — built to work for an entire industry, out of the box. Our first platform is a school management system that handles everything a school runs on. Next comes hospitality, then real estate, agriculture, healthcare, and beyond.
          </p>
        </div>
      </section>

      <section className="section-pad-sm" style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2878E8", marginBottom: 14 }}>Values</p>
          <h2 style={{ fontSize: "clamp(22px, 2.8vw, 34px)", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 52 }}>
            What we stand for
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 36 }}>
            {values.map((val, i) => (
              <div key={val.title} style={{ paddingLeft: 18, borderLeft: "2px solid rgba(40,120,232,0.2)" }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#2878E8", display: "block", marginBottom: 10 }}>
                  0{i + 1}
                </span>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, color: "#0D1117" }}>{val.title}</h3>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.7 }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad-sm" style={{ background: "#F7F9FC", textAlign: "center", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
        <h2 style={{ fontSize: "clamp(20px, 2.5vw, 30px)", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 10 }}>
          Want to know more?
        </h2>
        <p style={{ color: "#6B7280", marginBottom: 28, fontSize: 15 }}>Reach out — we're happy to talk about what we're building and why.</p>
        <Link href="/contact" style={{ display: "inline-flex", padding: "11px 24px", background: "linear-gradient(135deg, #39A8F5, #1A3FD4)", color: "#fff", borderRadius: 10, fontSize: 14, fontWeight: 600, boxShadow: "0 4px 14px rgba(40,120,232,0.3)" }}>
          Contact us
        </Link>
      </section>
    </>
  );
}
