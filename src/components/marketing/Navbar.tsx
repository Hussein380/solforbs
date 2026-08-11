"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const navLinks = [
  { label: "Products", href: "/#products" },
  { label: "Industries", href: "/#industries" },
  { label: "Vision", href: "/vision" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const { scrollY } = useScroll();
  let lastY = 0;

  useMotionValueEvent(scrollY, "change", (y) => {
    setHidden(y > lastY && y > 120);
    setScrolled(y > 40);
    lastY = y;
  });

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -80 : 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", justifyContent: "center",
          padding: scrolled ? "0" : "12px 24px",
          transition: "padding 0.3s ease",
        }}
      >
        <nav
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            width: "100%", maxWidth: scrolled ? "100%" : 1100,
            padding: "0 24px", height: 68,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
            borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "1px solid transparent",
            borderRadius: scrolled ? 0 : 14,
            boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.06)" : "0 4px 24px rgba(0,0,0,0.07)",
            transition: "all 0.3s ease",
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <Image src="/logo.png" alt="Solforbs" width={120} height={36} style={{ objectFit: "contain", height: 34, width: "auto" }} priority />
          </Link>

          {/* Desktop nav links */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  fontSize: 14, fontWeight: 600, color: "#475569",
                  padding: "8px 16px", borderRadius: 8, transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#0F172A"; e.currentTarget.style.background = "#F1F5F9"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "#475569"; e.currentTarget.style.background = "transparent"; }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="nav-desktop" style={{ display: "flex", gap: 12 }}>
            <Link
              href="/contact"
              style={{
                display: "inline-flex", alignItems: "center", padding: "8px 20px",
                borderRadius: 10, border: "1.5px solid rgba(40,120,232,0.3)", color: "#1A3FD4",
                fontSize: 14, fontWeight: 600, transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(40,120,232,0.06)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              Contact sales
            </Link>
            <Link
              href="/contact"
              style={{
                display: "inline-flex", alignItems: "center", padding: "8px 20px", borderRadius: 10,
                background: "linear-gradient(135deg, #0E5BFF, #1AA8FF)", color: "#fff",
                fontSize: 14, fontWeight: 600, boxShadow: "0 4px 14px rgba(14,91,255,0.3)",
                transition: "opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Get Started
            </Link>
          </div>

          {/* Hamburger (Mobile) */}
          <button
            aria-label="Toggle menu" className="nav-mobile"
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              background: "transparent", border: "none", width: 40, height: 40,
              display: "none", alignItems: "center", justifyContent: "center", cursor: "pointer",
              flexDirection: "column", gap: 6, padding: 0, zIndex: 110
            }}
          >
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              style={{ display: "block", width: 22, height: 2, background: "#0F172A", borderRadius: 2, transformOrigin: "center" }} />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }}
              style={{ display: "block", width: 22, height: 2, background: "#0F172A", borderRadius: 2 }} />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              style={{ display: "block", width: 22, height: 2, background: "#0F172A", borderRadius: 2, transformOrigin: "center" }} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{
              position: "fixed", inset: 0, zIndex: 90,
              background: "rgba(255,255,255,0.98)", backdropFilter: "blur(24px)",
              display: "flex", flexDirection: "column", padding: "100px 24px 40px",
            }}
          >
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
              {[...navLinks, { label: "Contact", href: "/contact" }].map((link, i) => (
                <motion.div key={link.label}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}>
                  <Link href={link.href} onClick={() => setMenuOpen(false)}
                    style={{ fontSize: 32, fontWeight: 700, color: "#0F172A", letterSpacing: "-0.03em", textDecoration: "none" }}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Link href="/contact" onClick={() => setMenuOpen(false)}
                style={{ width: "100%", padding: "16px", background: "linear-gradient(135deg,#0E5BFF,#1AA8FF)", color: "#fff", borderRadius: 14, fontSize: 18, fontWeight: 700, display: "flex", justifyContent: "center", boxShadow: "0 10px 24px rgba(14,91,255,0.25)" }}>
                Book a demo
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .nav-desktop { display: flex; align-items: center; gap: 4px; }
        .nav-mobile { display: none !important; }
        @media (max-width: 850px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
      ` }} />
    </>
  );
}
