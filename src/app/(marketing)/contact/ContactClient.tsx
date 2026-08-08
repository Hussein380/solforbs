"use client";

import { useState } from "react";
import { Mail, Phone, Smartphone, MessageCircle, Briefcase, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

const contactItems = [
  { icon: Mail, label: "Email", value: "info@solforbs.com", href: "mailto:info@solforbs.com" },
  { icon: Phone, label: "Phone (main)", value: "+254 725 996 394", href: "tel:+254725996394" },
  { icon: Smartphone, label: "Phone", value: "+254 759 900 802", href: "tel:+254759900802" },
  { icon: Smartphone, label: "Phone (alt)", value: "0723 543 460", href: "tel:0723543460" },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat on WhatsApp", href: "https://wa.me/254725996394" },
  { icon: Briefcase, label: "LinkedIn", value: "Solforbs", href: "https://linkedin.com/company/solforbs" },
  { icon: MapPin, label: "Location", value: "Upperhill, Masaba Road 10, Nairobi", href: null },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  background: "#F8FAFC",
  border: "1px solid rgba(0,0,0,0.06)",
  borderRadius: 12,
  fontSize: 15,
  color: "#0F172A",
  outline: "none",
  fontFamily: "inherit",
  transition: "all 0.3s ease",
  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.01)"
};

export default function ContactClient() {
  const [formData, setFormData] = useState({ name: "", email: "", organization: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In the future, this will trigger a Server Action or API route to send the email.
    setSubmitted(true);
  };

  return (
    <>
      <section className="section-pad stack-mobile" style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#0E5BFF", marginBottom: 18 }}>Get in touch</p>
            <h1 style={{ fontSize: "clamp(34px, 5vw, 58px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.04em", marginBottom: 20, fontFamily: "'Space Grotesk', sans-serif", color: "#0F172A" }}>
              Contact our team
            </h1>
            <p style={{ fontSize: 18, color: "#64748B", lineHeight: 1.6, maxWidth: 500, margin: "0 auto" }}>
              Tell us about your organization's challenges, and we will get back to you within one business day.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad-sm" style={{ background: "#F8FAFC", position: "relative", overflow: "hidden" }}>
        {/* Subtle background element */}
        <div style={{ position: "absolute", top: -200, right: -200, width: 600, height: 600, background: "radial-gradient(circle, rgba(14,91,255,0.05) 0%, transparent 60%)", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gap: 64, gridTemplateColumns: "1fr 1.8fr", position: "relative", zIndex: 2 }} className="contact-grid">
          
          {/* Contact Info (Left Side) */}
          <div>
            <Reveal>
              <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#64748B", marginBottom: 32 }}>
                Reach us directly
              </p>
            </Reveal>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {contactItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.label} delay={i * 0.05}>
                    <motion.div 
                      whileHover={{ x: 4 }} 
                      transition={{ type: "spring", stiffness: 300 }}
                      style={{ display: "flex", gap: 16, alignItems: "center" }}
                    >
                      <div style={{ 
                        width: 44, height: 44, borderRadius: 12, background: "#fff", border: "1px solid rgba(0,0,0,0.04)", 
                        display: "flex", alignItems: "center", justifyContent: "center", color: "#0E5BFF",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.02)"
                      }}>
                        <Icon size={20} strokeWidth={2} />
                      </div>
                      
                      <div>
                        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#94A3B8", marginBottom: 4 }}>{item.label}</p>
                        {item.href ? (
                          <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                            style={{ fontSize: 15, color: "#0F172A", fontWeight: 600, transition: "color 0.2s" }}
                            onMouseEnter={(e) => e.currentTarget.style.color = "#0E5BFF"}
                            onMouseLeave={(e) => e.currentTarget.style.color = "#0F172A"}>
                            {item.value}
                          </a>
                        ) : (
                          <span style={{ fontSize: 15, color: "#0F172A", fontWeight: 600 }}>{item.value}</span>
                        )}
                      </div>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Form (Right Side) */}
          <Reveal delay={0.2}>
            <div style={{ 
              background: "#fff", padding: "48px", borderRadius: 24, 
              boxShadow: "0 24px 48px rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.06)" 
            }}>
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  style={{ padding: "48px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(22,163,74,0.1)", color: "#16A34A", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12, color: "#0F172A" }}>Message sent successfully!</h3>
                  <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.6, maxWidth: 300, margin: "0 auto" }}>We have received your message and will get back to you within one business day.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="contact-form-row">
                    <div>
                      <label htmlFor="contact-name" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 8 }}>Full Name</label>
                      <input id="contact-name" type="text" required placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        style={inputStyle}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "#0E5BFF"; e.currentTarget.style.background = "#fff"; e.currentTarget.style.boxShadow = "0 0 0 4px rgba(14,91,255,0.1)"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)"; e.currentTarget.style.background = "#F8FAFC"; e.currentTarget.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.01)"; }} />
                    </div>
                    <div>
                      <label htmlFor="contact-email" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 8 }}>Email Address</label>
                      <input id="contact-email" type="email" required placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        style={inputStyle}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "#0E5BFF"; e.currentTarget.style.background = "#fff"; e.currentTarget.style.boxShadow = "0 0 0 4px rgba(14,91,255,0.1)"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)"; e.currentTarget.style.background = "#F8FAFC"; e.currentTarget.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.01)"; }} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-org" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 8 }}>Organization</label>
                    <input id="contact-org" type="text" required placeholder="School, hospital, company name..."
                      value={formData.organization}
                      onChange={(e) => setFormData((p) => ({ ...p, organization: e.target.value }))}
                      style={inputStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#0E5BFF"; e.currentTarget.style.background = "#fff"; e.currentTarget.style.boxShadow = "0 0 0 4px rgba(14,91,255,0.1)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)"; e.currentTarget.style.background = "#F8FAFC"; e.currentTarget.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.01)"; }} />
                  </div>

                  <div>
                    <label htmlFor="contact-message" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#475569", marginBottom: 8 }}>Message</label>
                    <textarea id="contact-message" required rows={5}
                      placeholder="Tell us about your current operational challenges..."
                      value={formData.message}
                      onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      style={{ ...inputStyle, resize: "vertical" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#0E5BFF"; e.currentTarget.style.background = "#fff"; e.currentTarget.style.boxShadow = "0 0 0 4px rgba(14,91,255,0.1)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)"; e.currentTarget.style.background = "#F8FAFC"; e.currentTarget.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.01)"; }} />
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    id="contact-submit" 
                    style={{
                      width: "100%", padding: "16px 28px", marginTop: 8,
                      background: "linear-gradient(135deg, #0E5BFF, #1AA8FF)", color: "#fff",
                      borderRadius: 12, fontSize: 16, fontWeight: 700, border: "none",
                      cursor: "pointer", boxShadow: "0 8px 20px rgba(14,91,255,0.25)",
                    }}
                  >
                    Send message
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
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; } 
          .contact-form-row { grid-template-columns: 1fr !important; }
        }
      ` }} />
    </>
  );
}
