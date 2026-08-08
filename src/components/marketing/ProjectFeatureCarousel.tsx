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
};

export type ProjectFeatureCarouselProps = {
  title: string;
  description: string;
  link?: string;
  features: ProjectFeature[];
  onInteract?: () => void;
};

export default function ProjectFeatureCarousel({ title, description, link, features, onInteract }: ProjectFeatureCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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
        <h3 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, marginBottom: 10, color: "#0D1117" }}>
          {title}
        </h3>
        <p style={{ fontSize: 16, color: "#4B5563", maxWidth: 500, margin: "0 auto", marginBottom: 20 }}>
          {description}
        </p>
        {link && (
          <Link href={link} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 20px", background: "#F3F4F6", color: "#0D1117", borderRadius: 8, fontSize: 14, fontWeight: 600, border: "1px solid rgba(0,0,0,0.05)", transition: "background 0.2s" }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#E5E7EB"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#F3F4F6"}
          >
            Explore the {title} →
          </Link>
        )}
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
                <div style={{ height: 200, position: "relative", background: "#E5E7EB", pointerEvents: "none" }}>
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
                <div style={{ padding: "24px 20px", flex: 1, display: "flex", flexDirection: "column", pointerEvents: "none" }}>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: "#0D1117", marginBottom: 10, lineHeight: 1.25 }}>
                    {screen.title}
                  </h3>
                  <p style={{ fontSize: 15, color: "#4B5563", lineHeight: 1.6, flex: 1 }}>
                    {screen.desc}
                  </p>

                  {/* Faux UI elements */}
                  <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ height: 42, borderRadius: 10, background: "#F3F4F6", display: "flex", alignItems: "center", padding: "0 12px", gap: 12 }}>
                       <div style={{ width: 22, height: 22, borderRadius: 6, background: "#E5E7EB" }} />
                       <div style={{ flex: 1, height: 6, borderRadius: 3, background: "#E5E7EB" }} />
                    </div>
                    <div style={{ height: 42, borderRadius: 10, background: "#F3F4F6", display: "flex", alignItems: "center", padding: "0 12px", gap: 12 }}>
                       <div style={{ width: 22, height: 22, borderRadius: 6, background: "#E5E7EB" }} />
                       <div style={{ flex: 1, height: 6, borderRadius: 3, background: "#E5E7EB" }} />
                    </div>
                  </div>
                </div>
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
    </div>
  );
}
