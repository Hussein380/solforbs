"use client";

import Link from "next/link";
import StatusBadge from "@/components/marketing/StatusBadge";
import { motion } from "framer-motion";

const features = [
  { icon: "🎓", title: "Admissions & records", desc: "Manage enrolment, student records, and documentation in one place. Go paperless from day one." },
  { icon: "📅", title: "Attendance & timetabling", desc: "Track attendance in real time and build conflict-free timetables without spreadsheets." },
  { icon: "💳", title: "Finance & billing", desc: "Handle fees, invoicing, and financial reporting for the whole school in one dashboard." },
  { icon: "💬", title: "Parent & staff communication", desc: "Keep parents, teachers, and admin staff on the same page with built-in messaging." },
  { icon: "📊", title: "Analytics & reporting", desc: "Understand your school's performance with clear dashboards and exportable reports." },
  { icon: "🔒", title: "Roles & permissions", desc: "Granular access control ensures the right people see the right information." },
];

const linkHover = {
  onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.opacity = "0.82"; e.currentTarget.style.transform = "translateY(-1px)"; },
  onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; },
};

export default function SchoolClient() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "#fff", padding: "140px 24px 96px", position: "relative", overflow: "hidden", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 800, height: 500, background: "radial-gradient(ellipse, rgba(40,120,232,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <div style={{ marginBottom: 20 }}><StatusBadge status="live" /></div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.04em", marginBottom: 20, color: "#0D1117" }}>
            School Management Platform
          </h1>
          <p style={{ fontSize: "clamp(15px, 1.8vw, 18px)", color: "#4B5563", lineHeight: 1.65, maxWidth: 500, marginBottom: 40 }}>
            An AI-powered platform for everything a school runs on — admissions, attendance, finance, and communication, in one place.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/contact" {...linkHover} style={{
              display: "inline-flex", alignItems: "center", padding: "11px 22px",
              background: "linear-gradient(135deg, #39A8F5, #1A3FD4)", color: "#fff",
              borderRadius: 10, fontSize: 14, fontWeight: 600,
              boxShadow: "0 4px 20px rgba(40,120,232,0.3)",
              transition: "opacity 0.2s, transform 0.2s",
            }}>
              Book a demo
            </Link>
            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", padding: "11px 22px",
              background: "#fff", color: "#0D1117",
              borderRadius: 10, fontSize: 14, fontWeight: 500,
              border: "1px solid rgba(0,0,0,0.1)",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(40,120,232,0.4)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(40,120,232,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; e.currentTarget.style.boxShadow = "none"; }}>
              Contact us
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ background: "#F7F9FC", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2878E8", marginBottom: 14 }}>Platform capabilities</p>
          <h2 style={{ fontSize: "clamp(24px, 3.2vw, 38px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 52, color: "#0D1117" }}>What's included</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
            {features.map((feat) => (
              <motion.div whileHover={{ y: -3, boxShadow: "0 8px 28px rgba(0,0,0,0.08)" }} key={feat.title} style={{ padding: "24px 20px", borderRadius: 14, border: "1px solid rgba(0,0,0,0.07)", background: "#fff", transition: "box-shadow 0.25s" }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>{feat.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, color: "#0D1117" }}>{feat.title}</h3>
                <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65 }}>{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#fff", padding: "80px 24px", textAlign: "center", borderTop: "1px solid rgba(0,0,0,0.07)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 250, background: "radial-gradient(ellipse, rgba(40,120,232,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 12, color: "#0D1117" }}>
            Interested for your school?
          </h2>
          <p style={{ color: "#6B7280", marginBottom: 32, fontSize: 15 }}>
            Talk to us about how the platform fits your school's needs.
          </p>
          <Link href="/contact" {...linkHover} style={{
            display: "inline-flex", padding: "12px 28px",
            background: "linear-gradient(135deg, #39A8F5, #1A3FD4)", color: "#fff",
            borderRadius: 10, fontSize: 15, fontWeight: 600,
            boxShadow: "0 4px 20px rgba(40,120,232,0.3)",
            transition: "opacity 0.2s, transform 0.2s",
          }}>
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}
