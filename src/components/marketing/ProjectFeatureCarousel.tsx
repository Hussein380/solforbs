"use client";

import { motion, PanInfo } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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
  features: ProjectFeature[];
  onInteract?: () => void;
};

export default function ProjectFeatureCarousel({ title, description, link, videoUrl, status, features, onInteract }: ProjectFeatureCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [expandedTextId, setExpandedTextId] = useState<string | null>(null);
  const [videoModal, setVideoModal] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % features.length);
    }, 3500); // Cards rotate slightly faster than tabs
    return () => clearInterval(timer);
  }, [isHovered, features.length]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    if (onInteract) onInteract();
    const threshold = 40;
    if (info.offset.x < -threshold) {
      setIndex((prev) => (prev + 1) % features.length);
    } else if (info.offset.x > threshold) {
      setIndex((prev) => (prev - 1 + features.length) % features.length);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 10 }}>
          <h3 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, color: "#0D1117", margin: 0 }}>
            {title}
          </h3>
          {status && (
            <span style={{ 
              padding: "4px 10px", borderRadius: 100, fontSize: 12, fontWeight: 700,
              background: status === 'live' ? "#DCFCE7" : status === 'in_development' ? "#FEF9C3" : "#F1F5F9",
              color: status === 'live' ? "#166534" : status === 'in_development' ? "#854D0E" : "#475569",
              textTransform: "uppercase", letterSpacing: "0.05em"
            }}>
              {status === 'in_development' ? 'In Dev' : status}
            </span>
          )}
        </div>
        <p style={{ fontSize: 16, color: "#4B5563", maxWidth: 500, margin: "0 auto", marginBottom: 24 }}>
          {description}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
          {link && (
            <Link href={link} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 24px", background: "#0E5BFF", color: "#fff", borderRadius: 8, fontSize: 14, fontWeight: 600, transition: "background 0.2s", textDecoration: "none", boxShadow: "0 4px 12px rgba(14,91,255,0.2)" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#0B46C9"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#0E5BFF"}
            >
              Explore {title} →
            </Link>
          )}
          {videoUrl && (
            <a href={videoUrl} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 24px", background: "#F3F4F6", color: "#0D1117", borderRadius: 8, fontSize: 14, fontWeight: 600, border: "1px solid rgba(0,0,0,0.05)", transition: "background 0.2s", textDecoration: "none" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#E5E7EB"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#F3F4F6"}
            >
              ▶ Watch Demo
            </a>
          )}
        </div>
      </div>

      <div 
        style={{ 
          perspective: 1200, 
          zIndex: 10, 
          width: "100%", 
          height: 500, 
          position: "relative", 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center" 
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {features.map((screen, i) => {
            let offset = i - index;
            if (offset < -features.length / 2) offset += features.length;
            if (offset > features.length / 2) offset -= features.length;
            
            if (Math.abs(offset) > 2) return null;

            const isCenter = offset === 0;

            // 3D Coverflow math
            const x = offset * 140; 
            const z = Math.abs(offset) * -100; 
            const rotateY = offset * -25; 
            const cardScale = isCenter ? 1 : 0.85;
            const opacity = isCenter ? 1 : Math.abs(offset) === 1 ? 0.6 : 0;
            const zIndex = 10 - Math.abs(offset);

            return (
              <motion.div
                key={screen.id}
                initial={false}
                animate={{ x, z, rotateY, scale: cardScale, opacity, zIndex }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.15 }}
                drag={isCenter ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={handleDragEnd}
                style={{
                  position: "absolute",
                  width: 280,
                  height: 500,
                  background: "#fff",
                  borderRadius: 24,
                  boxShadow: isCenter ? "0 24px 60px rgba(0,0,0,0.15)" : "0 12px 30px rgba(0,0,0,0.05)",
                  border: "4px solid #F3F4F6",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  cursor: isCenter ? "grab" : "pointer",
                  WebkitFontSmoothing: "antialiased",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
                whileTap={isCenter ? { cursor: "grabbing" } : {}}
              >
                {/* Bulletproof click overlay for side cards */}
                {!isCenter && (
                  <div 
                    onClick={() => {
                      if (onInteract) onInteract();
                      setIndex(i);
                    }}
                    style={{ position: "absolute", inset: 0, zIndex: 50 }} 
                  />
                )}

                {/* Image Graphic area */}
                <div 
                  style={{ height: 250, position: "relative", background: "#E5E7EB", pointerEvents: isCenter ? "auto" : "none", cursor: isCenter ? "zoom-in" : "pointer" }}
                  onClick={(e) => {
                    if (isCenter) {
                      e.stopPropagation();
                      setFullscreenImage(screen.image);
                    }
                  }}
                >
                  <Image 
                    src={screen.image} 
                    alt={screen.industry}
                    fill
                    style={{ objectFit: "cover" }}
                    unoptimized
                    draggable={false}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)" }} />
                  
                  <div style={{ position: "absolute", bottom: 16, left: 20, fontSize: 15, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff" }}>
                    {screen.industry}
                  </div>
                </div>

                {/* Content area */}
                <div style={{ padding: "24px 20px", flex: 1, display: "flex", flexDirection: "column", pointerEvents: isCenter ? "auto" : "none", overflow: "hidden" }}>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: "#0D1117", marginBottom: 10, lineHeight: 1.25, flexShrink: 0 }}>
                    {screen.title}
                  </h3>
                  
                  <p style={{ 
                    fontSize: 14, color: "#4B5563", lineHeight: 1.6, margin: 0,
                    display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
                    flexShrink: 0
                  }}>
                    {screen.desc}
                  </p>
                  
                  {screen.desc.length > 90 && (
                    <button 
                      onClick={(e) => { 
                        if (isCenter) {
                          e.stopPropagation(); 
                          setExpandedTextId(screen.id); 
                        }
                      }}
                      style={{ background: "transparent", border: "none", color: "#0E5BFF", fontSize: 13, fontWeight: 700, padding: "4px 0", cursor: isCenter ? "pointer" : "default", textAlign: "left", marginTop: 4, display: "inline-block" }}
                    >
                      Read more
                    </button>
                  )}
                  
                  {/* Spacer to push elements to bottom */}
                  <div style={{ flex: 1 }} />

                  {/* Live URL & Video Buttons */}
                  {(screen.link || (videoUrl && screen.id.startsWith("hero-"))) && (
                    <div style={{ display: "flex", gap: 12, marginTop: 12, flexShrink: 0 }}>
                      {screen.link && (
                        <a href={screen.link} target="_blank" rel="noopener noreferrer" style={{ flex: 1, textAlign: "center", padding: "10px", background: "#0D1117", color: "#fff", borderRadius: 8, fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                          Live Site ↗
                        </a>
                      )}
                      {videoUrl && screen.id.startsWith("hero-") && (
                        <button 
                          onClick={(e) => {
                            if (isCenter) {
                              e.stopPropagation();
                              setVideoModal(true);
                            }
                          }}
                          style={{ flex: 1, padding: "10px", background: "rgba(14,91,255,0.1)", color: "#0E5BFF", border: "1px solid rgba(14,91,255,0.2)", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: isCenter ? "pointer" : "default" }}
                        >
                          ▶ Watch Demo
                        </button>
                      )}
                    </div>
                  )}

                  {/* Swipe Hint / User Guidance */}
                  {isCenter && (
                    <div style={{ marginTop: 12, flexShrink: 0, textAlign: "center", fontSize: 12, fontWeight: 600, color: "#9CA3AF", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                      ← Swipe to explore →
                    </div>
                  )}

                  {/* Feature Pills (Replaced faux UI) */}
                  {screen.subFeatures && screen.subFeatures.length > 0 && (
                    <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 6, flexShrink: 0 }}>
                      {screen.subFeatures.map((feat, idx) => (
                        <div key={idx} style={{ 
                          padding: "4px 10px", background: "#F1F5F9", color: "#334155", 
                          borderRadius: 6, fontSize: 11, fontWeight: 700, 
                          border: "1px solid #E2E8F0" 
                        }}>
                          {feat}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Glassmorphic Expanded Text Overlay */}
                {expandedTextId === screen.id && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      position: "absolute", inset: 0, background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(12px)", zIndex: 100, padding: 32,
                      display: "flex", flexDirection: "column", pointerEvents: "auto",
                      boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)"
                    }}
                  >
                    <button 
                      onClick={(e) => { e.stopPropagation(); setExpandedTextId(null); }}
                      style={{ position: "absolute", top: 16, right: 16, background: "#F1F5F9", border: "none", color: "#475569", width: 32, height: 32, borderRadius: "50%", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >✕</button>
                    <h3 style={{ fontSize: 22, fontWeight: 700, color: "#0D1117", marginBottom: 16, paddingRight: 24, lineHeight: 1.2 }}>
                      {screen.title}
                    </h3>
                    <div style={{ flex: 1, overflowY: "auto", paddingRight: 8, scrollbarWidth: "none", msOverflowStyle: "none" }}>
                      <p style={{ fontSize: 15, color: "#4B5563", lineHeight: 1.7, whiteSpace: "pre-wrap", margin: 0 }}>
                        {screen.desc}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Dots */}
        <div style={{ position: "absolute", bottom: -24, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 6, zIndex: 20 }}>
          {features.map((_, i) => (
            <div 
              key={i} 
              onClick={() => setIndex(i)}
              style={{ 
                width: i === index ? 20 : 8, height: 8, borderRadius: 4, 
                background: i === index ? "#2878E8" : "#D1D5DB",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }} 
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Image Lightbox Modal */}
      {fullscreenImage && (
        <div 
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0, 
            background: "rgba(0,0,0,0.85)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center",
            padding: 40, cursor: "zoom-out", backdropFilter: "blur(8px)"
          }}
          onClick={() => setFullscreenImage(null)}
        >
          <button 
            style={{ position: "absolute", top: 20, right: 20, background: "transparent", border: "none", color: "#fff", fontSize: 40, cursor: "pointer", opacity: 0.8 }}
            onClick={() => setFullscreenImage(null)}
          >×</button>
          <img 
            src={fullscreenImage} 
            alt="Fullscreen Preview" 
            style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 12, boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }} 
          />
        </div>
      )}

      {/* Cinematic Video Modal */}
      {videoModal && videoUrl && (
        <div 
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0, 
            background: "rgba(0,0,0,0.9)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center",
            padding: 40, backdropFilter: "blur(20px)"
          }}
          onClick={() => setVideoModal(false)}
        >
          <button 
            style={{ position: "absolute", top: 24, right: 32, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", width: 48, height: 48, borderRadius: "50%", fontSize: 24, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }}
            onClick={() => setVideoModal(false)}
          >×</button>
          
          <div style={{ width: "100%", maxWidth: 1000, aspectRatio: "16/9", background: "#000", borderRadius: 24, overflow: "hidden", boxShadow: "0 0 100px rgba(14,91,255,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <iframe 
              src={videoUrl.includes("youtube.com/watch?v=") ? videoUrl.replace("watch?v=", "embed/") : videoUrl} 
              style={{ width: "100%", height: "100%", border: "none" }} 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
