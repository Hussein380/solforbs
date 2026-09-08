/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useRef } from "react";
import {
  Building2, GraduationCap, Hotel, Landmark,
  Tractor, ShoppingBag, Factory, Stethoscope, ArrowRight, ChevronDown,
} from "lucide-react";

/* ── Data ─────────────────────────────────────────────────────────── */
const navLinks = [
  { label: "Industries", href: "/#industries" },
  { label: "Vision",     href: "/vision" },
  { label: "About",      href: "/about" },
];

const INDUSTRY_ICONS: Record<string, React.ElementType> = {
  education:    GraduationCap,
  hospitality:  Hotel,
  "real estate":Building2,
  agriculture:  Tractor,
  healthcare:   Stethoscope,
  retail:       ShoppingBag,
  manufacturing:Factory,
};

const getIconForIndustry = (industry: string): React.ElementType =>
  INDUSTRY_ICONS[industry?.toLowerCase()] ?? Landmark;

/* ── Component ───────────────────────────────────────────────────── */
export default function Navbar({ projects = [] }: { projects?: any[] }) {
  const [scrolled,      setScrolled]      = useState(false);
  const [hidden,        setHidden]        = useState(false);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [megaMenuOpen,  setMegaMenuOpen]  = useState(false);
  const megaMenuTimeout = useRef<NodeJS.Timeout | null>(null);

  const { scrollY } = useScroll();
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setHidden(y > lastY.current && y > 120);
    setScrolled(y > 40);
    lastY.current = y;
  });

  const openMega  = () => { if (megaMenuTimeout.current) clearTimeout(megaMenuTimeout.current); setMegaMenuOpen(true); };
  const closeMega = () => { megaMenuTimeout.current = setTimeout(() => setMegaMenuOpen(false), 150); };

  const liveProjects = projects.filter(p => p.status === "live" || p.status === "in_development");

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

          <nav style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            width: "100%", padding: "0 24px", height: 68,
            background: scrolled ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.96)",
            backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
            borderBottom: scrolled ? "1px solid rgba(0,0,0,0.07)" : "1px solid transparent",
            borderRadius: scrolled ? 0 : 14,
            boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.06)" : "0 4px 24px rgba(0,0,0,0.07)",
            transition: "all 0.3s ease",
            position: "relative", zIndex: 10,
          }}>

            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <Image src="/logo.png" alt="Solforbs" width={120} height={36}
                style={{ objectFit: "contain", height: 34, width: "auto" }} priority />
            </Link>

            {/* Desktop nav */}
            <div className="nav-desktop">
              {/* Products dropdown trigger */}
              <div onMouseEnter={openMega} onMouseLeave={closeMega} style={{ position: "relative" }}>
                <Link
                  href="/#products"
                  className={`nav-link ${megaMenuOpen ? "nav-link-active" : ""}`}
                  style={{ display: "flex", alignItems: "center", gap: 6 }}
                >
                  Products
                  <motion.span animate={{ rotate: megaMenuOpen ? 180 : 0 }} transition={{ duration: 0.2 }}
                    style={{ display: "flex" }}>
                    <ChevronDown size={14} />
                  </motion.span>
                </Link>

                {/* Clean, single-column Products dropdown listing only projects from DB */}
                <AnimatePresence>
                  {megaMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        paddingTop: 10,
                        zIndex: 100,
                      }}
                    >
                      <div
                        style={{
                          minWidth: 280,
                          maxWidth: 360,
                          background: "#FFFFFF",
                          borderRadius: 14,
                          boxShadow: "0 18px 45px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.06)",
                          padding: "8px",
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                        }}
                      >
                        {liveProjects.length > 0 ? (
                          liveProjects.map(proj => {
                            const Icon: any = getIconForIndustry(proj.industry);
                            const rawUrl = proj.subdomain ? `https://${proj.subdomain}` : proj.liveUrl;
                            const isExternal = rawUrl && rawUrl !== "#" && rawUrl !== "https://#" && rawUrl !== "http://#" && rawUrl.startsWith("http");
                            const targetHref = isExternal ? rawUrl : "/#products";

                            return (
                              <a
                                key={proj._id}
                                href={targetHref}
                                target={isExternal ? "_blank" : undefined}
                                rel={isExternal ? "noopener noreferrer" : undefined}
                                onClick={() => setMegaMenuOpen(false)}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 12,
                                  padding: "10px 12px",
                                  borderRadius: 10,
                                  textDecoration: "none",
                                  transition: "background 0.15s ease",
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-alt)")}
                                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                              >
                                <div
                                  style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 9,
                                    background: "var(--gradient-brand)",
                                    color: "#fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                    boxShadow: "0 4px 12px rgba(1, 71, 244, 0.18)",
                                  }}
                                >
                                  <Icon size={18} strokeWidth={2} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
                                    <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>
                                      {proj.name}
                                    </span>
                                    <ArrowRight size={13} color="var(--text-tertiary)" />
                                  </div>
                                  <span style={{ fontSize: 11, color: "var(--text-tertiary)", textTransform: "capitalize" }}>
                                    {proj.industry}
                                  </span>
                                </div>
                              </a>
                            );
                          })
                        ) : (
                          <div style={{ padding: "14px", textAlign: "center", color: "var(--text-secondary)", fontSize: 13 }}>
                            No products currently active
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.map(link => (
                <Link key={link.label} href={link.href} className="nav-link">{link.label}</Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="nav-desktop" style={{ gap: 12 }}>
              <Link href="/contact" className="btn btn-primary">Book a Demo</Link>
            </div>

            {/* Hamburger — mobile */}
            <button
              aria-label="Toggle menu"
              className="nav-mobile"
              onClick={() => setMenuOpen(o => !o)}
              style={{
                background: "transparent", border: "none",
                width: 40, height: 40, cursor: "pointer",
                flexDirection: "column", gap: 6, padding: 0, zIndex: 110,
              }}
            >
              <motion.span animate={{ rotate: menuOpen ? 45 : 0,  y: menuOpen ? 8  : 0 }}
                style={{ display: "block", width: 22, height: 2, background: "#0D1117", borderRadius: 2, transformOrigin: "center" }} />
              <motion.span animate={{ opacity: menuOpen ? 0 : 1 }}
                style={{ display: "block", width: 22, height: 2, background: "#0D1117", borderRadius: 2 }} />
              <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
                style={{ display: "block", width: 22, height: 2, background: "#0D1117", borderRadius: 2, transformOrigin: "center" }} />
            </button>
          </nav>
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
              <p style={{ fontSize: 12, fontWeight: 700, color: "#94A3B8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: -10 }}>
                Products
              </p>
              {liveProjects.map((proj, i) => {
                const href = proj.subdomain ? `https://${proj.subdomain}` : (proj.liveUrl ?? "#");
                return (
                  <motion.div key={proj._id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
                    <a href={href} onClick={() => setMenuOpen(false)}
                      style={{ fontSize: 24, fontWeight: 700, color: "#0F172A", textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
                      {proj.name}
                    </a>
                  </motion.div>
                );
              })}

              <div style={{ height: 1, background: "#E2E8F0", margin: "8px 0" }} />

              {navLinks.map((link, i) => (
                <motion.div key={link.label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.05 }}>
                  <Link href={link.href} onClick={() => setMenuOpen(false)}
                    style={{ fontSize: 24, fontWeight: 600, color: "#475569", textDecoration: "none" }}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="btn btn-primary-lg"
                style={{ width: "100%", fontSize: 18, borderRadius: 14 }}>
                Book a demo
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
