"use client";

import { useState } from "react";

const contactItems = [
  { icon: "✉️", label: "Email", value: "info@solforbs.com", href: "mailto:info@solforbs.com" },
  { icon: "📞", label: "Phone (main)", value: "+254 725 996 394", href: "tel:+254725996394" },
  { icon: "📱", label: "Phone", value: "+254 759 900 802", href: "tel:+254759900802" },
  { icon: "💬", label: "WhatsApp", value: "Chat on WhatsApp", href: "https://wa.me/254725996394" },
  { icon: "💼", label: "LinkedIn", value: "Solforbs", href: "https://linkedin.com/company/solforbs" },
  { icon: "📍", label: "Location", value: "Nairobi, Kenya", href: null },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  background: "#fff",
  border: "1.5px solid rgba(0,0,0,0.1)",
  borderRadius: 10,
  fontSize: 15,
  color: "#0D1117",
  outline: "none",
  fontFamily: "inherit",
  transition: "border-color 0.2s ease",
};

export default function ContactClient() {
  const [formData, setFormData] = useState({ name: "", email: "", organization: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="section-pad" style={{ background: "#fff", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2878E8", marginBottom: 18 }}>Get in touch</p>
          <h1 style={{ fontSize: "clamp(34px, 5vw, 58px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 16, fontFamily: "'Space Grotesk', sans-serif" }}>
            Contact
          </h1>
          <p style={{ fontSize: 17, color: "#4B5563", lineHeight: 1.6 }}>
            Tell us about your organization and we'll get back within one business day.
          </p>
        </div>
      </section>

      <section className="section-pad-sm" style={{ background: "#fff" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gap: 72, gridTemplateColumns: "1fr 1.6fr" }} className="contact-grid">
          {/* Contact Info */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 24 }}>
              Reach us directly
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {contactItems.map((item) => (
                <div key={item.label} style={{ display: "flex", gap: 12 }}>
                  <span style={{ fontSize: 18, flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 4 }}>{item.label}</p>
                    {item.href ? (
                      <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                        style={{ fontSize: 14, color: "#2878E8", fontWeight: 500 }}>
                        {item.value}
                      </a>
                    ) : (
                      <span style={{ fontSize: 14, color: "#4B5563", fontWeight: 500 }}>{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div style={{ padding: "48px 40px", borderRadius: 16, border: "1px solid rgba(22,163,74,0.2)", background: "rgba(22,163,74,0.04)", textAlign: "center" }}>
                <div style={{ fontSize: 44, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, color: "#0D1117" }}>Message sent!</h3>
                <p style={{ color: "#6B7280", fontSize: 14 }}>We'll get back to you within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  { id: "contact-name", label: "Name", type: "text", placeholder: "Your name", key: "name" as const },
                  { id: "contact-email", label: "Email", type: "email", placeholder: "you@organization.com", key: "email" as const },
                  { id: "contact-org", label: "Organization", type: "text", placeholder: "School, hospital, company…", key: "organization" as const },
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#6B7280", marginBottom: 7, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                      {field.label}
                    </label>
                    <input id={field.id} type={field.type} required placeholder={field.placeholder}
                      value={formData[field.key]}
                      onChange={(e) => setFormData((p) => ({ ...p, [field.key]: e.target.value }))}
                      style={inputStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "#2878E8"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; }} />
                  </div>
                ))}
                <div>
                  <label htmlFor="contact-message" style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#6B7280", marginBottom: 7, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                    Message
                  </label>
                  <textarea id="contact-message" required rows={5}
                    placeholder="Tell us about your organization and what you need…"
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#2878E8"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; }} />
                </div>
                <button type="submit" id="contact-submit" style={{
                  alignSelf: "flex-start", padding: "11px 28px",
                  background: "linear-gradient(135deg, #39A8F5, #1A3FD4)", color: "#fff",
                  borderRadius: 10, fontSize: 14, fontWeight: 600, border: "none",
                  cursor: "pointer", boxShadow: "0 4px 14px rgba(40,120,232,0.3)",
                  transition: "opacity 0.2s, transform 0.2s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .contact-grid { grid-template-columns: 1fr 1.6fr; }
        @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; } }
      ` }} />
    </>
  );
}
