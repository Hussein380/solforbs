/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Maximize2, 
  Play, 
  ExternalLink, 
  CheckCircle2, 
  ChevronRight,
  Lock,
  ArrowRight
} from "lucide-react";
import StatusBadge from "./StatusBadge";

export type ProjectFeature = {
  id: string;
  industry: string;
  title: string;
  desc: string;
  image: string;
  subFeatures?: string[];
  link?: string;
};

export type ProjectFeatureCarouselProps = {
  title: string;
  description: string;
  link?: string;
  videoUrl?: string;
  status?: string;
  industry?: string;
  features: ProjectFeature[];
  onInteract?: () => void;
};

const AUTO_ROTATE_INTERVAL = 6500;

export default function ProjectFeatureCarousel({
  title,
  description,
  link,
  videoUrl,
  status,
  industry,
  features = [],
  onInteract
}: ProjectFeatureCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [videoModal, setVideoModal] = useState(false);
  const [progress, setProgress] = useState(0);

  const safeFeatures = features.length > 0 ? features : [
    {
      id: "fallback-hero",
      industry: industry || "ENTERPRISE",
      title: title,
      desc: description,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
      subFeatures: ["Enterprise Ready", "Cloud Architecture"]
    }
  ];

  const currentFeature = safeFeatures[activeIndex] || safeFeatures[0];

  // Gentle auto-cycle that pauses on user hover
  useEffect(() => {
    if (isPaused || safeFeatures.length <= 1) {
      setProgress(0);
      return;
    }

    const stepMs = 50;
    const increment = (stepMs / AUTO_ROTATE_INTERVAL) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((idx) => (idx + 1) % safeFeatures.length);
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, [isPaused, activeIndex, safeFeatures.length]);

  const handleSelectFeature = (index: number) => {
    if (onInteract) onInteract();
    setActiveIndex(index);
    setProgress(0);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (onInteract) onInteract();
    const threshold = 40;
    if (info.offset.x < -threshold) {
      setActiveIndex((prev) => (prev + 1) % safeFeatures.length);
      setProgress(0);
    } else if (info.offset.x > threshold) {
      setActiveIndex((prev) => (prev - 1 + safeFeatures.length) % safeFeatures.length);
      setProgress(0);
    }
  };

  const isSafeLink = link && link !== "#" && link !== "https://#" && link !== "http://#" && link.startsWith("http");
  
  const displayHost = (() => {
    if (!link) return `${title.toLowerCase().replace(/[^a-z0-9]/g, "")}.solforbs.com`;
    try {
      const url = new URL(link);
      return url.hostname + (url.pathname !== "/" ? url.pathname : "");
    } catch {
      return `${title.toLowerCase().replace(/[^a-z0-9]/g, "")}.solforbs.com`;
    }
  })();

  return (
    <div 
      className="product-studio-card"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* ── Product Header ────────────────────────────────────────── */}
      <div 
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 20,
          flexWrap: "wrap",
          paddingBottom: 20,
          borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
          marginBottom: 20,
        }}
      >
        <div style={{ flex: 1, minWidth: "min(100%, 280px)", maxWidth: 640 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
            {status && (status === "live" || status === "in_development" || status === "planned") && (
              <StatusBadge status={status as "live" | "in_development" | "planned"} size="sm" />
            )}
            {industry && (
              <span 
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "var(--brand-mid)",
                  background: "var(--brand-tint-8)",
                  padding: "3px 8px",
                  borderRadius: 6,
                }}
              >
                {industry}
              </span>
            )}
          </div>

          <h3 
            style={{
              fontSize: "clamp(22px, 2.8vw, 30px)",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {title}
          </h3>

          <p 
            style={{
              fontSize: "clamp(13px, 1.4vw, 15px)",
              color: "var(--text-secondary)",
              marginTop: 8,
              lineHeight: 1.55,
              margin: "8px 0 0 0",
            }}
          >
            {description}
          </p>
        </div>

        {/* Action Buttons (Visible on Desktop) */}
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {isSafeLink ? (
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "9px 18px",
                background: "var(--gradient-cta)",
                color: "#FFFFFF",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "var(--shadow-brand)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <span>Launch Platform</span>
              <ExternalLink size={14} />
            </a>
          ) : (
            <Link
              href={`/contact?product=${encodeURIComponent(title)}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "9px 18px",
                background: "var(--gradient-cta)",
                color: "#FFFFFF",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "var(--shadow-brand)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <span>Request Access</span>
              <ArrowRight size={14} />
            </Link>
          )}

          {videoUrl && (
            <button
              onClick={() => setVideoModal(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "9px 16px",
                background: "#F8FAFC",
                color: "var(--text-primary)",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#F1F5F9")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#F8FAFC")}
            >
              <Play size={13} fill="currentColor" />
              <span>Watch Demo</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Mobile-Only Module Selector Strip ─────────────────────── */}
      <div className="module-nav-mobile" style={{ marginBottom: 12 }}>
        <div 
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            overflowX: "auto",
            paddingBottom: 4,
            width: "100%",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
          }}
        >
          {safeFeatures.map((feat, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={feat.id || idx}
                onClick={() => handleSelectFeature(idx)}
                style={{
                  minHeight: 36,
                  padding: "6px 14px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  border: isSelected ? "1px solid var(--brand-sky)" : "1px solid rgba(0, 0, 0, 0.08)",
                  background: isSelected ? "var(--brand-tint-12)" : "#F8FAFC",
                  color: isSelected ? "var(--brand-mid)" : "var(--text-secondary)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {feat.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main Studio Grid ──────────────────────────────────────── */}
      <div className="product-studio-grid">
        
        {/* Left: Desktop Module List */}
        <div className="module-nav-desktop">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-tertiary)" }}>
              System Modules
            </span>
            <span style={{ fontSize: 11, fontWeight: 500, color: "var(--text-tertiary)" }}>
              {activeIndex + 1} of {safeFeatures.length}
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {safeFeatures.map((feat, idx) => {
              const isActive = idx === activeIndex;

              return (
                <div
                  key={feat.id || idx}
                  onClick={() => handleSelectFeature(idx)}
                  style={{
                    position: "relative",
                    padding: "12px 14px",
                    borderRadius: 12,
                    cursor: "pointer",
                    background: isActive ? "linear-gradient(135deg, rgba(8, 150, 253, 0.06) 0%, rgba(1, 71, 244, 0.03) 100%)" : "transparent",
                    border: isActive ? "1px solid var(--border-brand)" : "1px solid transparent",
                    transition: "all 0.2s ease",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = "rgba(0, 0, 0, 0.02)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = "transparent";
                  }}
                >
                  {/* Subtle active progress bar */}
                  {isActive && !isPaused && safeFeatures.length > 1 && (
                    <motion.div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        height: 2,
                        background: "var(--gradient-brand)",
                        width: `${progress}%`,
                      }}
                    />
                  )}

                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div 
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 700,
                        background: isActive ? "var(--brand-mid)" : "#F1F5F9",
                        color: isActive ? "#FFFFFF" : "#64748B",
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      {idx + 1}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                        <h4 
                          style={{
                            fontSize: 14,
                            fontWeight: isActive ? 700 : 600,
                            color: isActive ? "var(--text-primary)" : "#334155",
                            margin: 0,
                            lineHeight: 1.3,
                          }}
                        >
                          {feat.title}
                        </h4>
                        {isActive && <ChevronRight size={15} color="var(--brand-mid)" />}
                      </div>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <p 
                              style={{
                                fontSize: 12.5,
                                color: "var(--text-secondary)",
                                lineHeight: 1.5,
                                margin: "6px 0 0 0",
                              }}
                            >
                              {feat.desc}
                            </p>

                            {feat.subFeatures && feat.subFeatures.length > 0 && (
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
                                {feat.subFeatures.map((sub, sIdx) => (
                                  <span
                                    key={sIdx}
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: 3,
                                      fontSize: 10.5,
                                      fontWeight: 600,
                                      color: "#1E293B",
                                      background: "#FFFFFF",
                                      padding: "2px 7px",
                                      borderRadius: 5,
                                      border: "1px solid rgba(0, 0, 0, 0.08)",
                                    }}
                                  >
                                    <CheckCircle2 size={10} color="var(--status-live)" />
                                    {sub}
                                  </span>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Clean Browser Device Frame */}
        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <div className="product-device-frame">
            {/* macOS Browser Chrome */}
            <div className="product-device-bar">
              {/* Window Dots */}
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#FF5F56" }} />
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#FFBD2E" }} />
                <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#27C93F" }} />
              </div>

              {/* URL Address Pill */}
              <div 
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  background: "rgba(11, 19, 41, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  padding: "3px 10px",
                  borderRadius: 6,
                  fontSize: 11,
                  color: "#94A3B8",
                  maxWidth: "min(240px, 50vw)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <Lock size={9} color="#22C55E" />
                <span style={{ color: "#E2E8F0", fontWeight: 500 }}>{displayHost}</span>
              </div>

              {/* Zoom Action */}
              <button
                type="button"
                onClick={() => setFullscreenImage(currentFeature.image)}
                title="Inspect in Fullscreen"
                style={{
                  minHeight: 26,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#E2E8F0",
                  padding: "2px 8px",
                  borderRadius: 5,
                  fontSize: 10.5,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                <Maximize2 size={11} />
                <span>Zoom</span>
              </button>
            </div>

            {/* Main Screen Viewport */}
            <motion.div 
              className="product-device-viewport"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              onClick={() => setFullscreenImage(currentFeature.image)}
              style={{ cursor: "zoom-in" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeature.id || activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ position: "absolute", inset: 0 }}
                >
                  <Image
                    src={currentFeature.image}
                    alt={currentFeature.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 700px"
                    style={{ objectFit: "cover" }}
                    unoptimized
                    priority
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Mobile-Only Active Feature Info & CTA Button */}
          <div className="module-nav-mobile" style={{ marginTop: 12 }}>
            <div 
              style={{
                background: "#F8FAFC",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                borderRadius: 12,
                padding: "12px 14px",
                marginBottom: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>
                  {currentFeature.title}
                </span>
                <span style={{ fontSize: 10.5, color: "var(--text-tertiary)", fontWeight: 600 }}>
                  Swipe ← →
                </span>
              </div>
              <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                {currentFeature.desc}
              </p>
            </div>

            {/* Mobile Thumb-Reachable Primary Action Button */}
            <div style={{ display: "grid", gridTemplateColumns: videoUrl ? "1fr 1fr" : "1fr", gap: 10 }}>
              {isSafeLink ? (
                <a 
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    minHeight: 44,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    padding: "10px 14px",
                    background: "var(--gradient-cta)",
                    color: "#FFFFFF",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: "none",
                    boxShadow: "var(--shadow-brand)",
                  }}
                >
                  <span>Launch Platform</span>
                  <ExternalLink size={14} />
                </a>
              ) : (
                <Link
                  href={`/contact?product=${encodeURIComponent(title)}`}
                  style={{
                    minHeight: 44,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    padding: "10px 14px",
                    background: "var(--gradient-cta)",
                    color: "#FFFFFF",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: "none",
                    boxShadow: "var(--shadow-brand)",
                  }}
                >
                  <span>Request Access</span>
                  <ArrowRight size={14} />
                </Link>
              )}

              {videoUrl && (
                <button
                  onClick={() => setVideoModal(true)}
                  style={{
                    minHeight: 44,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    padding: "10px 14px",
                    background: "#F8FAFC",
                    color: "var(--text-primary)",
                    border: "1px solid rgba(0, 0, 0, 0.12)",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  <Play size={13} fill="currentColor" />
                  <span>Watch Demo</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Fullscreen Lightbox Modal ───────────────────────────────── */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(15, 23, 42, 0.94)",
              zIndex: 99999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              backdropFilter: "blur(16px)",
            }}
            onClick={() => setFullscreenImage(null)}
          >
            <button
              onClick={() => setFullscreenImage(null)}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "rgba(255, 255, 255, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF",
                width: 44,
                height: 44,
                borderRadius: "50%",
                fontSize: 20,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              style={{
                maxWidth: "96vw",
                maxHeight: "90vh",
                position: "relative",
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 25px 60px rgba(0, 0, 0, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={fullscreenImage}
                alt="Fullscreen Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "90vh",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Cinematic Video Modal ───────────────────────────────────── */}
      <AnimatePresence>
        {videoModal && videoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(15, 23, 42, 0.95)",
              zIndex: 99999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
              backdropFilter: "blur(20px)",
            }}
            onClick={() => setVideoModal(false)}
          >
            <button
              onClick={() => setVideoModal(false)}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "rgba(255, 255, 255, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF",
                width: 44,
                height: 44,
                borderRadius: "50%",
                fontSize: 20,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              style={{
                width: "100%",
                maxWidth: 960,
                aspectRatio: "16/9",
                background: "#000000",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 0 80px rgba(8, 150, 253, 0.25)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={videoUrl.includes("youtube.com/watch?v=") ? videoUrl.replace("watch?v=", "embed/") : videoUrl}
                style={{ width: "100%", height: "100%", border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
