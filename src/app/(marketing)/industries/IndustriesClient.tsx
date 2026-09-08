"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import StatusBadge from "@/components/marketing/StatusBadge";

const industries = [
  { name: "Education",     icon: "📚", status: "live"           as const, desc: "A complete school management system for admissions, attendance, finance, and communication.", href: "/products/school-management" },
  { name: "Hospitality",   icon: "🏨", status: "in_development" as const, desc: "Property management, reservations, and guest experience tools built for African hotels.", href: null },
  { name: "Real estate",   icon: "🏠", status: "planned"        as const, desc: "End-to-end platform for property listings, agents, and tenant management.", href: null },
  { name: "Agriculture",   icon: "🌾", status: "planned"        as const, desc: "Farm management tools for supply chain tracking, yield reporting, and compliance.", href: null },
  { name: "Healthcare",    icon: "🏥", status: "planned"        as const, desc: "Clinic and hospital management covering patient records, billing, and scheduling.", href: null },
  { name: "Retail",        icon: "🛍️", status: "planned"        as const, desc: "Inventory, POS, and customer management for modern African retailers.", href: null },
  { name: "Manufacturing", icon: "🏭", status: "planned"        as const, desc: "Production planning, quality control, and workforce management tools.", href: null },
  { name: "Government",    icon: "🏛️", status: "planned"        as const, desc: "Public service digitization — permits, records, and citizen engagement.", href: null },
];

export default function IndustriesClient() {
  return (
    <>
      <section className="section-pad stack-mobile" style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.07)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 600, height: 600, background: "radial-gradient(ellipse at top right, var(--brand-tint-8) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <span className="section-label">Platform Ecosystem</span>
          <h1 style={{ fontSize: "clamp(36px, 5.5vw, 64px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.04em", marginBottom: 20, fontFamily: "'Space Grotesk', sans-serif" }}>
            Every industry.<br />One ecosystem.
          </h1>
          <p style={{ fontSize: 18, color: "var(--text-secondary)", maxWidth: 480, lineHeight: 1.65 }}>
            We&apos;re building intelligent software for every sector that powers Africa&apos;s economy — one platform at a time.
          </p>
        </div>
      </section>

      <section className="section-pad-sm" style={{ background: "var(--bg-alt)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
            {industries.map((ind, i) => (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
                whileHover={{ y: -4, boxShadow: "0 8px 28px rgba(0,0,0,0.08)" }}
                style={{
                  padding: "28px 24px", borderRadius: 16, background: "#fff",
                  display: "flex", flexDirection: "column", gap: 12, cursor: "default",
                  border: `1px solid rgba(0,0,0,0.07)`,
                  borderLeft: ind.status === "live"
                    ? "3px solid var(--status-live)"
                    : `1px solid ${ind.status === "in_development" ? "var(--border-brand)" : "rgba(0,0,0,0.07)"}`,
                  transition: "box-shadow 0.3s ease, transform 0.3s ease",
                }}
              >
                <span style={{ fontSize: 30 }}>{ind.icon}</span>
                <div>
                  <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>{ind.name}</h2>
                </div>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65 }}>{ind.desc}</p>
                {ind.href && (
                  <Link href={ind.href} className="footer-link" style={{ fontSize: 13, fontWeight: 600, marginTop: 4, color: "var(--brand-mid)" }}>
                    View platform →
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad-sm" style={{ background: "#fff", textAlign: "center", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
        <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, marginBottom: 12, letterSpacing: "-0.03em", fontFamily: "'Space Grotesk', sans-serif" }}>
          Don&apos;t see your industry?
        </h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: 32, fontSize: 15 }}>
          We&apos;re always evaluating the next sector. Talk to us about your organization&apos;s needs.
        </p>
        <Link href="/contact" className="btn btn-primary">Contact us</Link>
      </section>
    </>
  );
}
