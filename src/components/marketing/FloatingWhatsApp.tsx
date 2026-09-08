/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ArrowUpRight, ShieldCheck, Headphones, Briefcase } from "lucide-react";

interface WhatsAppContact {
  title: string;
  role: string;
  numberDisplay: string;
  url: string;
  icon: any;
}

const CONTACTS: WhatsAppContact[] = [
  {
    title: "Executive & Enterprise Inquiries",
    role: "Institutional Demos & Partnerships",
    numberDisplay: "+254 725 996 394",
    url: "https://wa.me/254725996394?text=Hello%20Solforbs,%20I%20would%20like%20to%20inquire%20about%20your%20software%20platforms.",
    icon: Briefcase,
  },
  {
    title: "Client Support & Operations",
    role: "Onboarding & Technical Inquiries",
    numberDisplay: "+254 759 900 802",
    url: "https://wa.me/254759900802?text=Hello%20Solforbs%20Support,%20I%20need%20assistance.",
    icon: Headphones,
  },
];

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      ref={widgetRef}
      className="floating-whatsapp-wrap"
      style={{
        position: "fixed",
        bottom: "max(20px, calc(env(safe-area-inset-bottom, 0px) + 20px))",
        right: "max(20px, env(safe-area-inset-right, 20px))",
        zIndex: 90,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      {/* ── Chat Options Popup ────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            style={{
              width: "clamp(300px, 86vw, 360px)",
              background: "#FFFFFF",
              borderRadius: 20,
              boxShadow: "0 18px 45px rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.06)",
              overflow: "hidden",
              marginBottom: 14,
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "linear-gradient(135deg, #075E54 0%, #128C7E 100%)",
                padding: "20px",
                color: "#FFFFFF",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "#25D366",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                    }}
                  >
                    <MessageCircle size={17} />
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 700 }}>Solforbs WhatsApp</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close WhatsApp menu"
                  style={{
                    background: "rgba(255, 255, 255, 0.15)",
                    border: "none",
                    borderRadius: "50%",
                    width: 26,
                    height: 26,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    cursor: "pointer",
                  }}
                >
                  <X size={15} />
                </button>
              </div>
              <p style={{ fontSize: 12.5, color: "rgba(255, 255, 255, 0.88)", margin: 0, lineHeight: 1.45 }}>
                Choose a direct line to connect with our team on WhatsApp:
              </p>
            </div>

            {/* Numbers List */}
            <div style={{ padding: "14px", display: "flex", flexDirection: "column", gap: 10 }}>
              {CONTACTS.map((c) => {
                const Icon = c.icon;
                return (
                  <a
                    key={c.numberDisplay}
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 14px",
                      borderRadius: 14,
                      background: "#F8FAFC",
                      border: "1px solid rgba(0, 0, 0, 0.05)",
                      textDecoration: "none",
                      transition: "all 0.18s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#F0FDF4";
                      e.currentTarget.style.borderColor = "#BBF7D0";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#F8FAFC";
                      e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.05)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        background: "#DCFCE7",
                        color: "#166534",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0F172A", lineHeight: 1.3 }}>
                        {c.title}
                      </div>
                      <div style={{ fontSize: 11.5, color: "#64748B", margin: "2px 0 3px 0" }}>
                        {c.role}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#16A34A" }}>
                        {c.numberDisplay}
                      </div>
                    </div>

                    <div style={{ color: "#94A3B8" }}>
                      <ArrowUpRight size={16} />
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "10px 16px",
                background: "#F8FAFC",
                borderTop: "1px solid rgba(0, 0, 0, 0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                fontSize: 11.5,
                color: "#64748B",
              }}
            >
              <ShieldCheck size={13} color="#16A34A" />
              <span>Official Solforbs Business Channels</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Main Trigger Button ──────────────────────────── */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open WhatsApp contact options"
        style={{
          width: 58,
          height: 58,
          borderRadius: "50%",
          background: "#25D366",
          color: "#FFFFFF",
          border: "none",
          boxShadow: "0 8px 24px rgba(37, 211, 102, 0.45)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          outline: "none",
        }}
      >
        {/* Pulsing ring indicator */}
        {!isOpen && (
          <span
            style={{
              position: "absolute",
              top: -4,
              left: -4,
              right: -4,
              bottom: -4,
              borderRadius: "50%",
              border: "2px solid #25D366",
              animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
              pointerEvents: "none",
            }}
          />
        )}

        {isOpen ? <X size={26} strokeWidth={2.4} /> : <MessageCircle size={28} strokeWidth={2.3} />}
      </motion.button>
    </div>
  );
}
