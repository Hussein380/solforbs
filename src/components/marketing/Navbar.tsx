"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useRef } from "react";
import { Building2, GraduationCap, Hotel, Landmark, Tractor, ShoppingBag, Factory, Stethoscope, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Industries", href: "/#industries" },
  { label: "Vision", href: "/vision" },
  { label: "About", href: "/about" },
];

const getIconForIndustry = (industry: string) => {
  if (!industry) return Landmark;
  switch (industry.toLowerCase()) {
    case "education": return GraduationCap;
    case "hospitality": return Hotel;
    case "real estate": return Building2;
    case "agriculture": return Tractor;
    case "healthcare": return Stethoscope;
    case "retail": return ShoppingBag;
    case "manufacturing": return Factory;
    default: return Landmark;
  }
};

export default function Navbar({ projects = [] }: { projects?: any[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const megaMenuTimeout = useRef<NodeJS.Timeout | null>(null);
  
  const { scrollY } = useScroll();
  let lastY = 0;

  useMotionValueEvent(scrollY, "change", (y) => {
    setHidden(y > lastY && y > 120);
    setScrolled(y > 40);
    lastY = y;
  });

  const handleMegaMenuEnter = () => {
    if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current);
    setMegaMenuOpen(true);
  };

  const handleMegaMenuLeave = () => {
    megaMenuTimeout.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 150);
  };

  const liveProjects = projects.filter(p => p.status === 'live' || p.status === 'in_development');

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
        <div style={{ position: "relative", width: "100%", maxWidth: scrolled ? "100%" : 1100, display: "flex", justifyContent: "center" }}>
          
          <nav
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              width: "100%", padding: "0 24px", height: 68,
              background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.95)",
              backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
              borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "1px solid transparent",
              borderRadius: scrolled ? 0 : 14,
              boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.06)" : "0 4px 24px rgba(0,0,0,0.07)",
              transition: "all 0.3s ease",
              position: "relative", zIndex: 10
            }}
          >
            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <Image src="/logo.png" alt="Solforbs" width={120} height={36} style={{ objectFit: "contain", height: 34, width: "auto" }} priority />
            </Link>

            {/* Desktop nav links */}
            <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              
              {/* Products Mega Menu Trigger */}
              <div 
                onMouseEnter={handleMegaMenuEnter}
                onMouseLeave={handleMegaMenuLeave}
                style={{ position: "relative" }}
              >
                <Link
                  href="/#products"
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    fontSize: 14, fontWeight: 600, color: megaMenuOpen ? "#0F172A" : "#475569",
                    padding: "8px 16px", borderRadius: 8, transition: "color 0.2s, background 0.2s",
                    background: megaMenuOpen ? "#F1F5F9" : "transparent"
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#0F172A"; e.currentTarget.style.background = "#F1F5F9"; }}
                  onMouseLeave={(e) => { if (!megaMenuOpen) { e.currentTarget.style.color = "#475569"; e.currentTarget.style.background = "transparent"; } }}
                >
                  Products
                  <motion.div animate={{ rotate: megaMenuOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                </Link>
              </div>

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
                  display: "inline-flex", alignItems: "center", padding: "8px 20px", borderRadius: 10,
                  background: "linear-gradient(135deg, #0E5BFF, #1AA8FF)", color: "#fff",
                  fontSize: 14, fontWeight: 600, boxShadow: "0 4px 14px rgba(14,91,255,0.3)",
                  transition: "opacity 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Book a Demo
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

          {/* Mega Menu Dropdown */}
          <AnimatePresence>
            {megaMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onMouseEnter={handleMegaMenuEnter}
                onMouseLeave={handleMegaMenuLeave}
                style={{
                  position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)",
                  width: "90%", maxWidth: 800, marginTop: 8, padding: 24,
                  background: "rgba(255,255,255,0.98)", backdropFilter: "blur(24px)",
                  borderRadius: 20, boxShadow: "0 24px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05)",
                  zIndex: 9, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16
                }}
                className="nav-desktop"
              >
                {liveProjects.length > 0 ? (
                  liveProjects.map(proj => {
                    const Icon = getIconForIndustry(proj.industry);
                    const link = proj.subdomain ? `https://${proj.subdomain}` : proj.liveUrl ? proj.liveUrl : "#";
                    return (
                      <a 
                        key={proj._id} 
                        href={link} target="_blank" rel="noopener noreferrer"
                        style={{
                          display: "flex", gap: 16, padding: 16, borderRadius: 12,
                          textDecoration: "none", transition: "background 0.2s"
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#F1F5F9"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                      >
                        <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(14,91,255,0.08)", color: "#0E5BFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Icon size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                          <h4 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", marginBottom: 4, display: "flex", alignItems: "center", gap: 6 }}>
                            {proj.name}
                            <ArrowRight size={14} color="#64748B" />
                          </h4>
                          <p style={{ fontSize: 13, color: "#64748B", margin: 0, lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {proj.summary}
                          </p>
                        </div>
                      </a>
                    );
                  })
                ) : (
                  <div style={{ gridColumn: "1 / -1", padding: 32, textAlign: "center", color: "#64748B", fontSize: 14 }}>
                    No active platforms available yet. Check back soon!
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
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
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24, overflowY: "auto" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#94A3B8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: -10 }}>Products</div>
              {liveProjects.map((proj, i) => {
                const link = proj.subdomain ? `https://${proj.subdomain}` : proj.liveUrl ? proj.liveUrl : "#";
                return (
                  <motion.div key={proj._id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
                    <a href={link} onClick={() => setMenuOpen(false)} style={{ fontSize: 24, fontWeight: 700, color: "#0F172A", textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
                      {proj.name}
                    </a>
                  </motion.div>
                );
              })}
              
              <div style={{ height: 1, background: "#E2E8F0", margin: "16px 0" }} />
              
              {navLinks.map((link, i) => (
                <motion.div key={link.label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.05 }}>
                  <Link href={link.href} onClick={() => setMenuOpen(false)} style={{ fontSize: 24, fontWeight: 600, color: "#475569", textDecoration: "none" }}>
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
