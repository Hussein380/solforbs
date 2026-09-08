import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Vision & Sector Roadmap — Solforbs",
  description: "Solforbs is engineering the digital operating infrastructure for every foundational sector powering Africa's economic expansion.",
};

const roadmapItems = [
  { 
    item: "Education Infrastructure (EduCore)", 
    why: "Digitizing student records, biometric safety, and automated tuition collection for learning institutions — replacing paper registers with cloud-based accountability.",
    link: "/#products"
  },
  { 
    item: "Hospitality & Leisure (Hospita)", 
    why: "Unified property management, direct booking engines, and multi-outlet point of sale engineered specifically for African hotels, resorts, and lodges." 
  },
  { 
    item: "Clinical Operations & EHR (MediFlow)", 
    why: "Paperless electronic health records, pharmacy stock tracking, and multi-tier medical billing designed for polyclinics, diagnostic labs, and healthcare centers." 
  },
  { 
    item: "Agricultural Supply Chain & Traceability", 
    why: "Cooperative harvest aggregation, farmer payment ledgers, and export traceability from farm gate to international off-takers." 
  },
  { 
    item: "Commercial Real Estate & Property Administration", 
    why: "Automated tenant lease administration, utility billing, and maintenance workflows for residential portfolios and commercial developments." 
  },
  { 
    item: "Omnichannel Retail & Warehouse Logistics", 
    why: "Multi-branch point-of-sale, distributed inventory synchronization, and Mobile Money settlement for expanding merchant chains." 
  },
  { 
    item: "Light Manufacturing & Production ERP", 
    why: "Batch production scheduling, raw material consumption tracking, and quality assurance control for African manufacturing facilities." 
  },
  { 
    item: "Municipal & Public Service Portals", 
    why: "Secure citizen record digitization, automated commercial licensing, and transparent revenue collection for local authorities." 
  },
  { 
    item: "Connected Inter-Industry Data Rails", 
    why: "Unified analytics and data interoperability connecting supply chains, institutions, and financial networks across the continent." 
  },
];

export default function VisionPage() {
  return (
    <>
      <section className="section-pad stack-mobile" style={{ background: "#fff", position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ position: "absolute", top: -100, right: -100, width: 600, height: 600, background: "radial-gradient(circle, var(--brand-tint-8) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 840, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Reveal>
            <span className="section-label">Institutional Vision</span>
            <h1 style={{ fontSize: "clamp(38px, 5.2vw, 64px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.04em", marginBottom: 24, fontFamily: "'Space Grotesk', sans-serif" }}>
              Building the operating system for African industry.
            </h1>
            <p style={{ fontSize: "clamp(17px, 1.8vw, 21px)", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 680 }}>
              Africa&apos;s fastest-growing economies cannot scale on fragmented spreadsheets and borrowed western tools. Solforbs is engineering an interconnected suite of vertical software platforms designed specifically for the workflows, connectivity, and payment rails of critical African industries.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad-sm" style={{ background: "var(--bg-alt)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", left: "-10%", width: 500, height: 500, background: "radial-gradient(circle, var(--brand-tint-8) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "-10%", width: 600, height: 600, background: "radial-gradient(circle, rgba(22,163,74,0.03) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 820, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Reveal>
            <span className="section-label">Sector Roadmap</span>
            <h2 className="section-title" style={{ marginBottom: 16 }}>One industry at a time. Zero compromise.</h2>
            <p style={{ fontSize: 17, color: "var(--text-secondary)", marginBottom: 64, maxWidth: 560, lineHeight: 1.6 }}>
              Our multi-phase execution strategy: master the operational depth of a sector, achieve institutional scale, then unlock the next frontier.
            </p>
          </Reveal>

          <div style={{ position: "relative", paddingLeft: 48 }}>
            {/* Timeline line */}
            <div style={{ position: "absolute", left: 18, top: 0, bottom: 0, width: 2, background: "rgba(0,0,0,0.08)" }} />

            {roadmapItems.map((item, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 20, paddingBottom: 48, position: "relative" }}>
                  {/* Timeline dot with number */}
                  <div style={{
                    position: "absolute", 
                    left: 9, 
                    top: 6, 
                    width: 20, 
                    height: 20, 
                    borderRadius: "50%",
                    background: "var(--brand-mid)",
                    color: "#FFFFFF",
                    fontSize: 10,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 0 4px rgba(8, 150, 253, 0.16)",
                  }}>
                    {i + 1}
                  </div>

                  <div style={{ background: "#fff", padding: "24px 28px", borderRadius: 16, border: "1px solid rgba(0,0,0,0.06)", boxShadow: "var(--shadow-sm)", width: "100%" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
                      <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>
                        {item.item}
                      </h3>
                    </div>
                    <p style={{ fontSize: 14.5, color: "var(--text-secondary)", lineHeight: 1.65, margin: 0 }}>
                      {item.why}
                    </p>

                    {item.link && (
                      <Link href={item.link}
                        style={{ fontSize: 13.5, fontWeight: 600, color: "var(--brand-mid)", display: "inline-flex", alignItems: "center", gap: 4, marginTop: 12 }}>
                        <span>Explore platform overview</span>
                        <span>→</span>
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
          <span className="section-label">Enterprise Partnerships</span>
          <h2 className="section-title" style={{ marginBottom: 14 }}>Deploy institutional software with us</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: 36, fontSize: 17, maxWidth: 540, margin: "0 auto 36px", lineHeight: 1.6 }}>
            Whether you represent a network of schools, a healthcare group, or an industry association, explore how Solforbs can transform your operational baseline.
          </p>
          <Link href="/contact" className="btn btn-primary" style={{ padding: "12px 32px", fontSize: 15, borderRadius: 10 }}>
            Request Enterprise Consultation
          </Link>
        </Reveal>
      </section>
    </>
  );
}
