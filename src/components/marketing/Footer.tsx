"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const footerLinks = {
  Products: [
    { label: "School Management", href: "/products/school-management" },
    { label: "Hospitality", href: "/#industries" },
    { label: "Retail & POS", href: "/#industries" },
    { label: "Real Estate", href: "/#industries" },
  ],
  Company: [
    { label: "About Solforbs", href: "/about" },
    { label: "Our Vision", href: "/vision" },
    { label: "Careers", href: "#" },
    { label: "Contact Us", href: "/contact" },
  ],
  Resources: [
    { label: "Help Center", href: "#" },
    { label: "API Documentation", href: "#" },
    { label: "Community Forum", href: "#" },
    { label: "System Status", href: "#" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer style={{
      background: "#F8FAFC",
      color: "#0F172A",
      borderTop: "1px solid rgba(0,0,0,0.06)",
      padding: "80px 24px 32px",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background glow */}
      <div style={{ position: "absolute", top: 0, right: "10%", width: 600, height: 600, background: "radial-gradient(circle, rgba(14,91,255,0.03) 0%, transparent 70%)", pointerEvents: "none" }} />
      
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Top CTA & Newsletter Row */}
        <div style={{ marginBottom: 72, paddingBottom: 60, borderBottom: "1px solid rgba(0,0,0,0.06)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 48 }}>
          
          <div style={{ flex: "1 1 400px" }}>
            <h3 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, lineHeight: 1.2, fontFamily: "'Space Grotesk', sans-serif", color: "#0F172A", marginBottom: 12 }}>
              Ready to modernize your operations?
            </h3>
            <p style={{ fontSize: 16, color: "#475569", marginBottom: 24 }}>Get in touch with our team to see how Solforbs can transform your business.</p>
            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 28px",
              background: "linear-gradient(135deg, #0E5BFF, #1AA8FF)",
              color: "#fff", borderRadius: 12, fontSize: 15, fontWeight: 700,
              boxShadow: "0 8px 24px rgba(14,91,255,0.25)", whiteSpace: "nowrap",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(14,91,255,0.35)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(14,91,255,0.25)"; }}>
              Book a demo
            </Link>
          </div>

          <div style={{ flex: "1 1 300px" }}>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>Subscribe to ecosystem updates</h4>
            <p style={{ fontSize: 14, color: "#475569", marginBottom: 20 }}>Get the latest news on product launches and feature updates.</p>
            
            <form onSubmit={handleSubscribe} style={{ display: "flex", gap: 8, position: "relative" }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribed}
                style={{
                  flex: 1, padding: "14px 16px", borderRadius: 10,
                  background: "#fff", border: "1px solid rgba(0,0,0,0.1)",
                  color: "#0F172A", fontSize: 14, outline: "none", transition: "border-color 0.2s, box-shadow 0.2s"
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#0E5BFF"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(14,91,255,0.1)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
              />
              <button type="submit" disabled={subscribed} style={{
                padding: "0 20px", borderRadius: 10, border: "none",
                background: subscribed ? "#16A34A" : "#0E5BFF", color: "#fff",
                cursor: subscribed ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.2s"
              }}>
                {subscribed ? <Check size={18} /> : <ArrowRight size={18} />}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom grid */}
        <div className="footer-cols">
          {/* Brand col */}
          <div style={{ paddingRight: 40 }}>
            <Image src="/logo.png" alt="Solforbs" width={110} height={32}
              style={{ objectFit: "contain", height: 32, width: "auto", marginBottom: 20 }} />
            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, marginBottom: 20 }}>
              Building intelligent software platforms for every industry that powers Africa&apos;s economy.
            </p>
            <a href="mailto:info@solforbs.com" style={{ fontSize: 14, color: "#0E5BFF", fontWeight: 600, display: "inline-block" }}>info@solforbs.com</a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#0F172A", marginBottom: 20 }}>
                {title}
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14, padding: 0 }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}
                      style={{ fontSize: 14, color: "#475569", transition: "color 0.2s ease", textDecoration: "none" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#0E5BFF"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#475569"; }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal row */}
        <div style={{ marginTop: 80, paddingTop: 32, borderTop: "1px solid rgba(0,0,0,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div className="text-slate-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Solforbs. All rights reserved. Let&apos;s build the future together.
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <Link key={item} href="#"
                style={{ fontSize: 13, color: "#64748B", transition: "color 0.2s", textDecoration: "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#0F172A"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#64748B"; }}>
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .footer-cols { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; }
        @media (max-width: 900px) { .footer-cols { grid-template-columns: 1fr 1fr; gap: 48px 32px; } }
        @media (max-width: 600px) { .footer-cols { grid-template-columns: 1fr; } }
      ` }} />
    </footer>
  );
}
