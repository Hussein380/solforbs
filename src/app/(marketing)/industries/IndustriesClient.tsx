"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Hotel, 
  Building2, 
  Tractor, 
  Stethoscope, 
  ShoppingBag, 
  Factory, 
  Landmark,
  ArrowRight
} from "lucide-react";
import StatusBadge from "@/components/marketing/StatusBadge";

const industries = [
  { 
    name: "Education",     
    icon: GraduationCap, 
    status: "live" as const, 
    badge: "Solforbs EduCore",
    desc: "Unifying admissions, biometric student attendance, curriculum-compliant grading, and Mobile Money fee collection into one audited school operating system.", 
    href: "/#products" 
  },
  { 
    name: "Hospitality & Tourism",   
    icon: Hotel,         
    status: "in_development" as const, 
    badge: "Solforbs Hospita",
    desc: "Cloud property management, automated OTA channel distribution, and contactless guest folios designed for African hotels, lodges, and safari camps.", 
    href: null 
  },
  { 
    name: "Healthcare & Clinics",    
    icon: Stethoscope,   
    status: "planned" as const, 
    badge: "Solforbs MediFlow",
    desc: "Eliminating lost paper files and medication stock leakage with interconnected electronic health records (EHR), dispensary POS, and insurance claims.", 
    href: null 
  },
  { 
    name: "Commercial Real Estate",   
    icon: Building2,     
    status: "planned" as const, 
    badge: "Solforbs PropTrack",
    desc: "End-to-end property administration: tenant lease tracking, utility sub-metering, automated rent arrears escalation, and facility maintenance dispatch.", 
    href: null 
  },
  { 
    name: "Agribusiness & Cooperatives",   
    icon: Tractor,       
    status: "planned" as const, 
    badge: "Solforbs AgriPulse",
    desc: "Decentralized harvest aggregation, member payout ledgers, inventory batch tracking, and export traceability from local farms to international markets.", 
    href: null 
  },
  { 
    name: "Retail & Merchant Chains",        
    icon: ShoppingBag,   
    status: "planned" as const, 
    badge: "Solforbs Commerce",
    desc: "Multi-branch point-of-sale, distributed warehouse synchronization, and automated daily bank settlement for fast-expanding retail enterprises.", 
    href: null 
  },
  { 
    name: "Manufacturing & Assembly", 
    icon: Factory,       
    status: "planned" as const, 
    badge: "Solforbs FactoryERP",
    desc: "Bill of materials (BOM), production floor run tracking, shift workforce planning, and quality control metrics for regional manufacturing plants.", 
    href: null 
  },
  { 
    name: "Public Sector & Civic Portals",    
    icon: Landmark,      
    status: "planned" as const, 
    badge: "Solforbs GovTrack",
    desc: "Digitizing municipal business permits, land registry records, and citizen query management with transparent revenue collection trails.", 
    href: null 
  },
];

export default function IndustriesClient() {
  return (
    <>
      <section className="section-pad stack-mobile" style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.07)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 600, height: 600, background: "radial-gradient(ellipse at top right, var(--brand-tint-8) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <span className="section-label">Sector Platforms</span>
          <h1 style={{ fontSize: "clamp(36px, 5.5vw, 64px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.04em", marginBottom: 20, fontFamily: "'Space Grotesk', sans-serif" }}>
            Every foundational sector.<br />One unified ecosystem.
          </h1>
          <p style={{ fontSize: "clamp(16px, 1.8vw, 20px)", color: "var(--text-secondary)", maxWidth: 600, lineHeight: 1.65 }}>
            We engineer mission-critical vertical software tailored to the unique regulatory, infrastructural, and payment realities of Africa&apos;s primary economic engines.
          </p>
        </div>
      </section>

      <section className="section-pad-sm" style={{ background: "var(--bg-alt)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <motion.div
                  key={ind.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.06)" }}
                  style={{
                    padding: "26px 24px", 
                    borderRadius: 18, 
                    background: "#fff",
                    display: "flex", 
                    flexDirection: "column", 
                    gap: 14,
                    border: `1px solid rgba(0,0,0,0.07)`,
                    borderLeft: ind.status === "live"
                      ? "4px solid var(--status-live)"
                      : ind.status === "in_development"
                      ? "4px solid var(--brand-sky)"
                      : "4px solid #E2E8F0",
                    transition: "box-shadow 0.25s ease, transform 0.25s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                    <div 
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: "var(--brand-tint-8)",
                        color: "var(--brand-mid)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={22} strokeWidth={2} />
                    </div>
                    <StatusBadge status={ind.status} size="sm" />
                  </div>

                  <div>
                    <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4, color: "var(--text-primary)" }}>{ind.name}</h2>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--brand-mid)", letterSpacing: "0.02em" }}>{ind.badge}</span>
                  </div>

                  <p style={{ fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                    {ind.desc}
                  </p>

                  <div style={{ marginTop: "auto", paddingTop: 8 }}>
                    {ind.href ? (
                      <Link href={ind.href} style={{ fontSize: 13, fontWeight: 600, color: "var(--brand-mid)", display: "inline-flex", alignItems: "center", gap: 5 }}>
                        <span>Explore platform</span>
                        <ArrowRight size={13} />
                      </Link>
                    ) : (
                      <span style={{ fontSize: 12, color: "var(--text-tertiary)", fontWeight: 500 }}>
                        {ind.status === "in_development" ? "Active Engineering Phase" : "Scheduled on Roadmap"}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad-sm" style={{ background: "#fff", textAlign: "center", borderTop: "1px solid rgba(0,0,0,0.07)" }}>
        <h2 style={{ fontSize: "clamp(24px, 3.2vw, 36px)", fontWeight: 800, marginBottom: 14, letterSpacing: "-0.03em", fontFamily: "'Space Grotesk', sans-serif" }}>
          Need specialized digital infrastructure for your sector?
        </h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: 32, fontSize: 16, maxWidth: 540, margin: "0 auto 32px", lineHeight: 1.6 }}>
          We partner with industry federations, hospital groups, and educational boards to deploy customized platforms.
        </p>
        <Link href="/contact" className="btn btn-primary" style={{ padding: "12px 30px", borderRadius: 10, fontSize: 14 }}>
          Discuss Your Organization&apos;s Needs
        </Link>
      </section>
    </>
  );
}
