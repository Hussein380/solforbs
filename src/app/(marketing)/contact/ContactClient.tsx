"use client";

import { useState } from "react";
import { Mail, Phone, Smartphone, MessageCircle, Briefcase, MapPin, Clock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { submitContactForm } from "@/lib/actions/contact.actions";

const contactItems = [
  { icon: Mail, label: "Enterprise Inquiries", value: "info@solforbs.com", href: "mailto:info@solforbs.com" },
  { icon: Phone, label: "Direct Line (Nairobi)", value: "+254 725 996 394", href: "tel:+254725996394" },
  { icon: Smartphone, label: "Client Support", value: "+254 759 900 802", href: "tel:+254759900802" },
  { icon: Smartphone, label: "Direct Line (Alt)", value: "0723 543 460", href: "tel:0723543460" },
  { icon: MessageCircle, label: "Executive WhatsApp", value: "Chat on WhatsApp", href: "https://wa.me/254725996394" },
  { icon: Briefcase, label: "LinkedIn", value: "Solforbs Institutional", href: "https://linkedin.com/company/solforbs" },
  { icon: MapPin, label: "Headquarters", value: "Upperhill, Masaba Road 10, Nairobi, Kenya", href: null },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  background: "#F8FAFC",
  border: "1px solid rgba(0,0,0,0.08)",
  borderRadius: 10,
  fontSize: 14.5,
  color: "#0F172A",
  outline: "none",
  fontFamily: "inherit",
  transition: "all 0.25s ease",
  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.01)"
};

const INQUIRY_TYPES = [
  "Book a Product Demo",
  "Request Enterprise Pilot",
  "Partnership & Investment",
  "Technical Inquiry"
];

const SECTORS = [
  "Education (EduCore)",
  "Healthcare & Clinics",
  "Hospitality & Hotels",
  "Commercial Real Estate",
  "Agribusiness & Cooperatives",
  "Other Industry"
];

export default function ContactClient() {
  const [formData, setFormData] = useState({ name: "", email: "", organization: "", message: "" });
  const [inquiryType, setInquiryType] = useState(INQUIRY_TYPES[0]);
  const [sector, setSector] = useState(SECTORS[0]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    
    const formattedMessage = `[Inquiry Type: ${inquiryType}]\n[Sector: ${sector}]\n\n${formData.message}`;

    try {
      const result = await submitContactForm({
        ...formData,
        message: formattedMessage
      });
      if (result.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(result.error || "Something went wrong.");
      }
    } catch {
      setErrorMsg("Failed to connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="section-pad stack-mobile" style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <span className="section-label">Institutional Engagement</span>
            <h1 style={{ fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.04em", marginBottom: 18, fontFamily: "'Space Grotesk', sans-serif", color: "#0F172A" }}>
              Start an Enterprise Conversation
            </h1>
            <p style={{ fontSize: 17, color: "#64748B", lineHeight: 1.6, maxWidth: 560, margin: "0 auto" }}>
              Connect directly with our deployment engineers and product specialists to evaluate how Solforbs platforms fit your organization.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad-sm" style={{ background: "#F8FAFC", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -200, right: -200, width: 600, height: 600, background: "radial-gradient(circle, var(--brand-tint-8) 0%, transparent 60%)", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: 1040, margin: "0 auto", display: "grid", gap: 56, gridTemplateColumns: "1fr 1.7fr", position: "relative", zIndex: 2 }} className="contact-grid">
          
          {/* Contact Info (Left Side) */}
          <div>
            <Reveal>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--brand-mid)", marginBottom: 24 }}>
                Direct Channels
              </p>
            </Reveal>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {contactItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.label} delay={i * 0.04}>
                    <motion.div 
                      whileHover={{ x: 4 }} 
                      transition={{ type: "spring", stiffness: 300 }}
                      style={{ display: "flex", gap: 14, alignItems: "center" }}
                    >
                      <div style={{ 
                        width: 42, height: 42, borderRadius: 10, background: "#fff", border: "1px solid rgba(0,0,0,0.06)", 
                        display: "flex", alignItems: "center", justifyContent: "center", color: "var(--brand-mid)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.02)", flexShrink: 0
                      }}>
                        <Icon size={18} strokeWidth={2} />
                      </div>
                      
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#94A3B8", margin: "0 0 3px 0" }}>{item.label}</p>
                        {item.href ? (
                          <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                            style={{ fontSize: 14.5, color: "#0F172A", fontWeight: 600, transition: "color 0.2s" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand-mid)")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "#0F172A")}>
                            {item.value}
                          </a>
                        ) : (
                          <span style={{ fontSize: 14.5, color: "#0F172A", fontWeight: 600 }}>{item.value}</span>
                        )}
                      </div>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>

            {/* SLA Badge */}
            <div 
              style={{
                marginTop: 36,
                padding: "16px 18px",
                borderRadius: 14,
                background: "#FFFFFF",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.02)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <Clock size={16} color="var(--status-live)" />
                <span style={{ fontSize: 12.5, fontWeight: 700, color: "#0F172A" }}>
                  Institutional SLA Response
                </span>
              </div>
              <p style={{ fontSize: 12.5, color: "#64748B", lineHeight: 1.55, margin: 0 }}>
                Enterprise demo requests are routed directly to our sector heads with an average response time of under 4 business hours.
              </p>
            </div>
          </div>

          {/* Form (Right Side) */}
          <Reveal delay={0.15}>
            <div style={{ 
              background: "#fff", padding: "clamp(24px, 4vw, 44px)", borderRadius: 20, 
              boxShadow: "0 20px 48px rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.06)" 
            }}>
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  style={{ padding: "48px 20px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(22,163,74,0.1)", color: "#16A34A", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    <ShieldCheck size={32} />
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, color: "#0F172A" }}>Inquiry Registered</h3>
                  <p style={{ color: "#64748B", fontSize: 15, lineHeight: 1.6, maxWidth: 360, margin: "0 auto" }}>
                    Thank you. A sector deployment lead has been assigned to your message and will follow up shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  
                  {/* Inquiry Type Chips */}
                  <div>
                    <label style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#475569", marginBottom: 8 }}>
                      Nature of Request
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {INQUIRY_TYPES.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setInquiryType(t)}
                          style={{
                            padding: "6px 12px",
                            borderRadius: 8,
                            fontSize: 12,
                            fontWeight: 600,
                            border: inquiryType === t ? "1px solid var(--brand-sky)" : "1px solid rgba(0, 0, 0, 0.08)",
                            background: inquiryType === t ? "var(--brand-tint-8)" : "#F8FAFC",
                            color: inquiryType === t ? "var(--brand-mid)" : "#475569",
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="contact-form-row">
                    <div>
                      <label htmlFor="contact-name" style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#475569", marginBottom: 6 }}>Full Name</label>
                      <input id="contact-name" type="text" required placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        style={inputStyle} />
                    </div>
                    <div>
                      <label htmlFor="contact-email" style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#475569", marginBottom: 6 }}>Official Email Address</label>
                      <input id="contact-email" type="email" required placeholder="you@institution.com"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        style={inputStyle} />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16 }} className="contact-form-row">
                    <div>
                      <label htmlFor="contact-org" style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#475569", marginBottom: 6 }}>Organization / Institution</label>
                      <input id="contact-org" type="text" required placeholder="School, hospital, company name"
                        value={formData.organization}
                        onChange={(e) => setFormData((p) => ({ ...p, organization: e.target.value }))}
                        style={inputStyle} />
                    </div>
                    <div>
                      <label htmlFor="contact-sector" style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#475569", marginBottom: 6 }}>Primary Sector</label>
                      <select 
                        id="contact-sector"
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                        style={{ ...inputStyle, cursor: "pointer" }}
                      >
                        {SECTORS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" style={{ display: "block", fontSize: 12.5, fontWeight: 700, color: "#475569", marginBottom: 6 }}>Operational Scope / Requirements</label>
                    <textarea id="contact-message" required rows={4}
                      placeholder="Outline your organization's current workflows, bottlenecks, or deployment goals..."
                      value={formData.message}
                      onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      style={{ ...inputStyle, resize: "vertical" }} />
                  </div>

                  {errorMsg && (
                    <div style={{ color: "#EF4444", fontSize: 13, fontWeight: 600, padding: "10px", background: "rgba(239,68,68,0.08)", borderRadius: 8 }}>
                      {errorMsg}
                    </div>
                  )}

                  <motion.button 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit" 
                    id="contact-submit" 
                    disabled={isSubmitting}
                    style={{
                      width: "100%", padding: "14px 24px", marginTop: 4,
                      background: "var(--gradient-cta)", color: "#fff",
                      borderRadius: 10, fontSize: 15, fontWeight: 700, border: "none",
                      cursor: isSubmitting ? "wait" : "pointer", 
                      boxShadow: "var(--shadow-brand)",
                      opacity: isSubmitting ? 0.7 : 1,
                      display: "flex", justifyContent: "center", alignItems: "center", gap: 8
                    }}
                  >
                    {isSubmitting ? "Routing to Sector Specialist..." : "Submit Consultation Request →"}
                  </motion.button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .contact-grid { grid-template-columns: 1fr 1.6fr; }
        @media (max-width: 768px) { 
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; } 
          .contact-form-row { grid-template-columns: 1fr !important; }
        }
      ` }} />
    </>
  );
}
