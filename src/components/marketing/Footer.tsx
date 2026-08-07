"use client";

import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  Products: [{ label: "School Management Platform", href: "/products/school-management" }],
  Industries: [
    { label: "Education", href: "/industries" },
    { label: "Hospitality", href: "/industries" },
    { label: "Real Estate", href: "/industries" },
    { label: "Agriculture", href: "/industries" },
    { label: "Healthcare", href: "/industries" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Vision", href: "/vision" },
  ],
  Contact: [
    { label: "Contact us", href: "/contact" },
    { label: "Book a demo", href: "/contact" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: "#F7F9FC",
      borderTop: "1px solid rgba(0,0,0,0.07)",
      padding: "72px 24px 32px",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* CTA row */}
        <div style={{ marginBottom: 60, paddingBottom: 60, borderBottom: "1px solid rgba(0,0,0,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
          <div>
            <p style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, lineHeight: 1.15, fontFamily: "'Space Grotesk', sans-serif", color: "#0D1117", marginBottom: 8 }}>
              Ready to modernize your organization?
            </p>
            <p style={{ fontSize: 15, color: "#6B7280" }}>Talk to us — we'll get back within one business day.</p>
          </div>
          <Link href="/contact" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px",
            background: "linear-gradient(135deg, #39A8F5, #1A3FD4)",
            color: "#fff", borderRadius: 10, fontSize: 15, fontWeight: 600,
            boxShadow: "0 4px 16px rgba(40,120,232,0.3)", whiteSpace: "nowrap",
            transition: "opacity 0.2s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}>
            Book a demo →
          </Link>
        </div>

        {/* Bottom grid */}
        <div className="footer-cols">
          {/* Brand col */}
          <div>
            <Image src="/logo.png" alt="Solforbs" width={110} height={32}
              style={{ objectFit: "contain", height: 30, width: "auto", marginBottom: 14 }} />
            <p style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.65, maxWidth: 190 }}>
              Software built for every industry that powers Africa.
            </p>
            <p style={{ fontSize: 13, color: "#9CA3AF", marginTop: 10 }}>
              📧 <a href="mailto:info@solforbs.com" style={{ color: "#2878E8" }}>info@solforbs.com</a>
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: 16 }}>
                {title}
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}
                      style={{ fontSize: 14, color: "#4B5563", transition: "color 0.2s ease" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#2878E8"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#4B5563"; }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal row */}
        <div style={{ marginTop: 48, paddingTop: 24, borderTop: "1px solid rgba(0,0,0,0.07)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 13, color: "#9CA3AF" }}>© {year} Solforbs. All rights reserved.</p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase().replace(" ", "-")}`}
                style={{ fontSize: 13, color: "#9CA3AF", transition: "color 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#4B5563"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#9CA3AF"; }}>
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .footer-cols { display: grid; grid-template-columns: 1.2fr 1fr 1fr 1fr 1fr; gap: 40px; }
        @media (max-width: 900px) { .footer-cols { grid-template-columns: 1fr 1fr 1fr; } }
        @media (max-width: 600px) { .footer-cols { grid-template-columns: 1fr; gap: 32px; } }
      ` }} />
    </footer>
  );
}
