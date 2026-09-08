/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useRef } from "react";
import {
  Building2, GraduationCap, Hotel, Landmark,
  Tractor, ShoppingBag, Factory, Stethoscope, ArrowRight, ChevronDown,
  ChevronRight, X, Menu,
} from "lucide-react";
import StatusBadge from "@/components/marketing/StatusBadge";

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
  const [scrolled,           setScrolled]           = useState(false);
  const [hidden,             setHidden]             = useState(false);
  const [menuOpen,           setMenuOpen]           = useState(false);
  const [megaMenuOpen,       setMegaMenuOpen]       = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const megaMenuTimeout = useRef<NodeJS.Timeout | null>(null);

  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const isScrolledRef = useRef(false);
  const isHiddenRef = useRef(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const shouldHide = y > lastY.current && y > 120;
    const shouldScroll = y > 40;

    if (Math.abs(y - lastY.current) > 14) {
      if (shouldHide !== isHiddenRef.current) {
        isHiddenRef.current = shouldHide;
        setHidden(shouldHide);
      }
      lastY.current = y;
    }

    if (shouldScroll !== isScrolledRef.current) {
      isScrolledRef.current = shouldScroll;
      setScrolled(shouldScroll);
    }
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
          willChange: "transform",
        }}
      >
        <div style={{ position: "relative", width: "100%", maxWidth: scrolled ? "100%" : 1100, display: "flex", justifyContent: "center" }}>

          <nav className="navbar-glass" style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            width: "100%", padding: "0 24px", height: 68,
            background: scrolled ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.96)",
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

                {/* Desktop dropdown */}
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

            {/* Mobile menu toggle */}
            <button
              aria-label="Toggle menu"
              className="nav-mobile"
              onClick={() => {
                setMenuOpen(o => !o);
                if (menuOpen) setMobileProductsOpen(false);
              }}
              style={{
                background: "transparent", 
                border: "none",
                width: 44, 
                height: 44, 
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0, 
                zIndex: 110,
              }}
            >
              {menuOpen ? <X size={24} color="#0D1117" /> : <Menu size={24} color="#0D1117" />}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Modern Compact Mobile Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                setMenuOpen(false);
                setMobileProductsOpen(false);
              }}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(15, 23, 42, 0.45)",
                backdropFilter: "blur(6px)",
                zIndex: 85,
              }}
            />

            {/* Floating Menu Card */}
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{
                position: "fixed",
                top: 76,
                left: 14,
                right: 14,
                zIndex: 90,
                background: "#FFFFFF",
                borderRadius: 20,
                boxShadow: "0 24px 60px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0, 0, 0, 0.04)",
                border: "1px solid rgba(0, 0, 0, 0.08)",
                padding: "16px 14px",
                maxHeight: "calc(100vh - 96px)",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Navigation Items with Expandable Products Accordion */}
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                
                {/* Products Dropdown Accordion Trigger */}
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 14px",
                      borderRadius: 12,
                      fontSize: 15,
                      fontWeight: 600,
                      color: mobileProductsOpen ? "var(--brand-mid)" : "var(--text-primary)",
                      background: mobileProductsOpen ? "var(--brand-tint-8)" : "transparent",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <span>Products</span>
                    <motion.div
                      animate={{ rotate: mobileProductsOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <ChevronDown size={17} color={mobileProductsOpen ? "var(--brand-mid)" : "var(--text-tertiary)"} />
                    </motion.div>
                  </button>

                  {/* Expandable Products List (Only visible when Products is clicked) */}
                  <AnimatePresence initial={false}>
                    {mobileProductsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div style={{ display: "flex", flexDirection: "column", gap: 6, padding: "8px 0 8px 8px" }}>
                          {liveProjects.length > 0 ? (
                            liveProjects.map((proj) => {
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
                                  onClick={() => {
                                    setMenuOpen(false);
                                    setMobileProductsOpen(false);
                                  }}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    padding: "9px 10px",
                                    borderRadius: 10,
                                    background: "#F8FAFC",
                                    border: "1px solid rgba(0, 0, 0, 0.04)",
                                    textDecoration: "none",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: 32,
                                      height: 32,
                                      borderRadius: 8,
                                      background: "var(--gradient-brand)",
                                      color: "#fff",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      flexShrink: 0,
                                    }}
                                  >
                                    <Icon size={16} />
                                  </div>

                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--text-primary)" }}>
                                      {proj.name}
                                    </div>
                                    <div style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "capitalize" }}>
                                      {proj.industry}
                                    </div>
                                  </div>

                                  {proj.status && (proj.status === "live" || proj.status === "in_development" || proj.status === "planned") && (
                                    <StatusBadge status={proj.status as "live" | "in_development" | "planned"} size="sm" />
                                  )}
                                  <ChevronRight size={14} color="var(--text-tertiary)" />
                                </a>
                              );
                            })
                          ) : (
                            <div style={{ padding: "10px", color: "var(--text-tertiary)", fontSize: 13 }}>
                              No live products currently
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Other Nav Links */}
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => {
                      setMenuOpen(false);
                      setMobileProductsOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 14px",
                      borderRadius: 10,
                      fontSize: 15,
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      textDecoration: "none",
                    }}
                  >
                    <span>{link.label}</span>
                    <ChevronRight size={16} color="var(--text-tertiary)" />
                  </Link>
                ))}
              </div>

              {/* Compact Bottom CTA */}
              <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(0, 0, 0, 0.06)" }}>
                <Link
                  href="/contact"
                  onClick={() => {
                    setMenuOpen(false);
                    setMobileProductsOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    width: "100%",
                    minHeight: 44,
                    padding: "11px 20px",
                    background: "var(--gradient-cta)",
                    color: "#FFFFFF",
                    borderRadius: 10,
                    fontSize: 14.5,
                    fontWeight: 700,
                    textDecoration: "none",
                    boxShadow: "var(--shadow-brand)",
                  }}
                >
                  <span>Book an Enterprise Demo</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
