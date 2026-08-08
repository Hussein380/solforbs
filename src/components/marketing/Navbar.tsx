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
  { label: "Contact", href: "/contact" },
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
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "center",
          padding: scrolled ? "0" : "12px 24px",
          transition: "padding 0.3s ease",
        }}
      >
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: scrolled ? "100%" : 1100,
            padding: "0 24px",
            height: 68,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "1px solid transparent",
            borderRadius: scrolled ? 0 : 14,
            boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.06)" : "0 4px 24px rgba(0,0,0,0.07)",
            transition: "all 0.3s ease",
          }}
        >
          {/* Logo — full color on white background, no pill needed */}
          <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <Image
              src="/logo.png"
              alt="Solforbs"
              width={120}
              height={36}
              style={{ objectFit: "contain", height: 34, width: "auto" }}
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#4B5563",
                  padding: "7px 14px",
                  borderRadius: 8,
                  transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#0D1117";
                  e.currentTarget.style.background = "#F3F4F6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#4B5563";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="nav-desktop" style={{ display: "flex", gap: 8 }}>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "8px 18px",
                borderRadius: 10,
                border: "1.5px solid rgba(40,120,232,0.5)",
                color: "#1A3FD4",
                fontSize: 14,
                fontWeight: 600,
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(40,120,232,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              Get in touch
            </Link>
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "8px 18px",
                borderRadius: 10,
                background: "linear-gradient(135deg, #39A8F5, #1A3FD4)",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                boxShadow: "0 2px 12px rgba(40,120,232,0.3)",
                transition: "opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.88";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Book a demo
            </Link>
          </div>

          {/* Hamburger */}
          <button
            aria-label="Toggle menu"
            className="nav-mobile"
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              background: "#F3F4F6",
              border: "1px solid rgba(0,0,0,0.08)",
              borderRadius: 8,
              width: 38, height: 38,
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexDirection: "column",
              gap: 5, padding: 0,
            }}
          >
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
              style={{ display: "block", width: 18, height: 1.5, background: "#0D1117", borderRadius: 2, transformOrigin: "center" }} />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }}
              style={{ display: "block", width: 18, height: 1.5, background: "#0D1117", borderRadius: 2 }} />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
              style={{ display: "block", width: 18, height: 1.5, background: "#0D1117", borderRadius: 2, transformOrigin: "center" }} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed", inset: 0, zIndex: 90,
              background: "rgba(255,255,255,0.98)",
              backdropFilter: "blur(24px)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 24,
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div key={link.href}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}>
                <Link href={link.href} onClick={() => setMenuOpen(false)}
                  style={{ fontSize: 28, fontWeight: 600, color: "#0D1117", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.03em" }}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
              <Link href="/contact" onClick={() => setMenuOpen(false)}
                style={{ padding: "12px 32px", background: "linear-gradient(135deg,#39A8F5,#1A3FD4)", color: "#fff", borderRadius: 12, fontSize: 16, fontWeight: 600, display: "inline-block", marginTop: 8 }}>
                Book a demo
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .nav-desktop { display: flex; align-items: center; gap: 4px; }
        .nav-mobile { display: none !important; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
      ` }} />
    </>
  );
}
