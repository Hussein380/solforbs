"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const footerLinks = {
  Products: [
    { label: "School Management", href: "/products/school-management" },
    { label: "Hospitality",       href: "/#industries" },
    { label: "Retail & POS",      href: "/#industries" },
    { label: "Real Estate",       href: "/#industries" },
  ],
  Company: [
    { label: "About Solforbs", href: "/about" },
    { label: "Our Vision",     href: "/vision" },
    { label: "Careers",        href: "#" },
    { label: "Contact Us",     href: "/contact" },
  ],
  Resources: [
    { label: "Help Center",       href: "#" },
    { label: "API Documentation", href: "#" },
    { label: "Community Forum",   href: "#" },
    { label: "System Status",     href: "#" },
  ],
};

export default function Footer() {
  const [email,      setEmail]      = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => { setEmail(""); setSubscribed(false); }, 3000);
  };

  return (
    <footer style={{
      background: "#F8FAFC",
      color: "#0F172A",
      borderTop: "1px solid rgba(0,0,0,0.06)",
      padding: "80px 24px 32px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{ position: "absolute", top: 0, right: "10%", width: 600, height: 600,
        background: "radial-gradient(circle, var(--brand-tint-8) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>

        {/* Top CTA & Newsletter */}
        <div style={{ marginBottom: 72, paddingBottom: 60, borderBottom: "1px solid rgba(0,0,0,0.06)",
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 48 }}>

          <div style={{ flex: "1 1 400px" }}>
            <h3 style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 700, lineHeight: 1.2,
              fontFamily: "'Space Grotesk', sans-serif", color: "#0F172A", marginBottom: 12 }}>
              Ready to modernize your operations?
            </h3>
            <p style={{ fontSize: 16, color: "#475569", marginBottom: 24 }}>
              Get in touch with our team to see how Solforbs can transform your business.
            </p>
            <Link href="/contact" className="btn btn-primary-lg">
              Book a demo
            </Link>
          </div>

          <div style={{ flex: "1 1 300px" }}>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>
              Subscribe to ecosystem updates
            </h4>
            <p style={{ fontSize: 14, color: "#475569", marginBottom: 20 }}>
              Get the latest news on product launches and feature updates.
            </p>

            <form onSubmit={handleSubscribe} style={{ display: "flex", gap: 8 }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={subscribed}
                style={{
                  flex: 1, padding: "14px 16px", borderRadius: 10,
                  background: "#fff", border: "1px solid rgba(0,0,0,0.10)",
                  color: "#0F172A", fontSize: 14, outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocus={e => { e.currentTarget.style.borderColor = "var(--brand-mid)"; e.currentTarget.style.boxShadow = "0 0 0 3px var(--brand-tint-12)"; }}
                onBlur={e  => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.10)"; e.currentTarget.style.boxShadow = "none"; }}
              />
              <button type="submit" disabled={subscribed}
                style={{
                  padding: "0 20px", borderRadius: 10, border: "none",
                  background: subscribed ? "#16A34A" : "var(--gradient-cta)",
                  color: "#fff", cursor: subscribed ? "default" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "opacity 0.2s",
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
            <a href="mailto:info@solforbs.com" className="footer-link"
              style={{ fontWeight: 600, color: "var(--brand-mid)" }}>
              info@solforbs.com
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                color: "#0F172A", marginBottom: 20 }}>
                {title}
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 14, padding: 0 }}>
                {links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href} className="footer-link">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal row */}
        <div style={{ marginTop: 80, paddingTop: 32, borderTop: "1px solid rgba(0,0,0,0.06)",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <p style={{ fontSize: 13, color: "#94A3B8" }}>
            &copy; {new Date().getFullYear()} Solforbs. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(item => (
              <Link key={item} href="#" className="footer-link" style={{ fontSize: 13 }}>{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
