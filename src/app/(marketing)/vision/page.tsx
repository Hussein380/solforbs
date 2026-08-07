import type { Metadata } from "next";
import Link from "next/link";
import StatusBadge from "@/components/marketing/StatusBadge";

export const metadata: Metadata = {
  title: "Our vision — Solforbs",
  description: "Solforbs envisions a connected ecosystem of intelligent software for every major sector across Africa.",
};

const roadmapItems = [
  { year: "2026", item: "School Management Platform", status: "live" as const, why: "Education is Africa's most critical sector — and the most underserved by modern software." },
  { year: "2026", item: "Hospitality Platform", status: "in_development" as const, why: "A fast-growing industry that still relies on outdated reservation and property tools." },
  { year: "2027", item: "Real Estate Platform", status: "planned" as const, why: "Property markets across Africa are booming — they need software that keeps pace." },
  { year: "2027", item: "Agriculture Platform", status: "planned" as const, why: "Farmers and agribusinesses deserve the same quality of digital tools as any enterprise." },
  { year: "2027", item: "Healthcare Platform", status: "planned" as const, why: "Clinics and hospitals need reliable patient management without enterprise complexity." },
  { year: "2028+", item: "Connected Business Ecosystem", status: "planned" as const, why: "All Solforbs platforms will share a unified data layer — enabling cross-sector insights." },
];

export default function VisionPage() {
  return (
    <>
      <section style={{ background: "#fff", padding: "140px 24px 100px", position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 800, height: 500, background: "radial-gradient(ellipse, rgba(40,120,232,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2878E8", marginBottom: 20 }}>Vision</p>
          <h1 style={{ fontSize: "clamp(36px, 5.5vw, 64px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.04em", marginBottom: 28, fontFamily: "'Space Grotesk', sans-serif" }}>
            Our vision
          </h1>
          <p style={{ fontSize: "clamp(16px, 2vw, 19px)", color: "#4B5563", lineHeight: 1.7, maxWidth: 580 }}>
            We envision a future where every organization — from schools and hospitals to farms and hotels — can
            access modern, intelligent software built specifically for their needs. Solforbs is building an ecosystem
            of products that empowers businesses across Africa to operate smarter, faster, and with confidence.
          </p>
        </div>
      </section>

      <section style={{ background: "#F7F9FC", padding: "100px 24px 120px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2878E8", marginBottom: 16 }}>Roadmap</p>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 64, fontFamily: "'Space Grotesk', sans-serif" }}>
            One platform at a time.
          </h2>

          <div style={{ position: "relative", paddingLeft: 100 }}>
            <div style={{ position: "absolute", left: 72, top: 0, bottom: 0, width: 1, background: "rgba(0,0,0,0.08)" }} />
            {roadmapItems.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 24, paddingBottom: 44, position: "relative" }}>
                <span style={{ position: "absolute", left: -100, fontSize: 12, fontWeight: 600, color: "#9CA3AF", fontVariantNumeric: "tabular-nums", paddingTop: 2, width: 60, textAlign: "right" }}>
                  {item.year}
                </span>
                <div style={{
                  position: "absolute", left: -28, top: 5, width: 8, height: 8, borderRadius: "50%",
                  background: item.status === "live" ? "#16A34A" : item.status === "in_development" ? "#2878E8" : "#D1D5DB",
                  boxShadow: item.status === "live" ? "0 0 0 3px rgba(22,163,74,0.15)" : item.status === "in_development" ? "0 0 0 3px rgba(40,120,232,0.15)" : "none",
                  border: `2px solid ${item.status === "live" ? "#16A34A" : item.status === "in_development" ? "#2878E8" : "#E5E7EB"}`,
                }} />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0D1117" }}>{item.item}</h3>
                    <StatusBadge status={item.status} size="sm" />
                  </div>
                  <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65 }}>{item.why}</p>
                  {item.status === "live" && (
                    <Link href="/products/school-management" style={{ fontSize: 13, fontWeight: 600, color: "#2878E8", display: "inline-block", marginTop: 8 }}>
                      View platform →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#fff", padding: "80px 24px", textAlign: "center", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
        <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 12, fontFamily: "'Space Grotesk', sans-serif" }}>
          Let's build the future together.
        </h2>
        <p style={{ color: "#6B7280", marginBottom: 36, fontSize: 15 }}>Whether you're a partner, investor, or ready to go digital — we'd love to talk.</p>
        <Link href="/contact" style={{ display: "inline-flex", padding: "12px 28px", background: "linear-gradient(135deg, #39A8F5, #1A3FD4)", color: "#fff", borderRadius: 10, fontSize: 15, fontWeight: 600, boxShadow: "0 4px 14px rgba(40,120,232,0.3)" }}>
          Book a demo
        </Link>
      </section>
    </>
  );
}
