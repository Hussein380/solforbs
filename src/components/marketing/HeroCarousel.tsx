"use client";

import { motion, PanInfo } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const screens = [
  {
    id: "edu",
    industry: "Education",
    title: "The complete OS for schools",
    desc: "Seamless admissions, real-time attendance, and automated finance tracking.",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "hosp",
    industry: "Hospitality",
    title: "Next-gen guest management",
    desc: "Reimagining reservations, POS, guest experience, and property operations for hotels.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "real",
    industry: "Real Estate",
    title: "End-to-end property platform",
    desc: "A unified platform for property listings, agent networks, and modern tenant management.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "agri",
    industry: "Agriculture",
    title: "Intelligent farm management",
    desc: "Supply chain tracking, yield reporting, and compliance tools for agribusinesses.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "health",
    industry: "Healthcare",
    title: "Modern clinic operations",
    desc: "Patient records, billing, and scheduling built for modern African hospitals.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "retail",
    industry: "Retail",
    title: "Unified retail operations",
    desc: "Inventory, POS, and customer management for fast-growing retailers.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "mfg",
    industry: "Manufacturing",
    title: "Production & supply chain",
    desc: "Production planning, quality control, and workforce management tools.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "gov",
    industry: "Government",
    title: "Public service digitization",
    desc: "Digital permits, secure records, and citizen engagement platforms.",
    image: "https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?w=800&auto=format&fit=crop&q=80",
  }
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
        setScale(window.innerWidth / 500); // Scale down proportionally on mobile
      } else if (window.innerWidth < 1024) {
        setIsMobile(false);
        setScale(0.8);
      } else {
        setIsMobile(false);
        setScale(1);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play timer that pauses when hovered
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % screens.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 40;
    if (info.offset.x < -threshold) {
      setIndex((prev) => (prev + 1) % screens.length);
    } else if (info.offset.x > threshold) {
      setIndex((prev) => (prev - 1 + screens.length) % screens.length);
    }
  };

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        position: isMobile ? "relative" : "absolute", 
        right: isMobile ? "auto" : "2%", 
        top: isMobile ? "auto" : "50%", 
        marginTop: isMobile ? 60 : 0,
        transform: isMobile ? `scale(${scale})` : `translateY(-50%) scale(${scale})`, 
        transformOrigin: isMobile ? "top center" : "right center",
        width: 500, 
        height: 600, 
        perspective: 1200, 
        zIndex: 10 
      }}
    >
      {/* Background glow */}
      <div style={{ position: "absolute", top: "20%", left: "10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(40,120,232,0.06) 0%, transparent 60%)", filter: "blur(40px)", pointerEvents: "none" }} />

      <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {screens.map((screen, i) => {
          let offset = i - index;
          if (offset < -screens.length / 2) offset += screens.length;
          if (offset > screens.length / 2) offset -= screens.length;
          
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
              }}
              whileTap={isCenter ? { cursor: "grabbing" } : {}}
            >
              {/* Bulletproof click overlay for side cards */}
              {!isCenter && (
                <div 
                  onClick={() => setIndex(i)}
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
                
                <div style={{ position: "absolute", bottom: 16, left: 20, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff" }}>
                  {screen.industry}
                </div>
              </div>

              {/* Content area */}
              <div style={{ padding: "24px 20px", flex: 1, display: "flex", flexDirection: "column", pointerEvents: "none" }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0D1117", marginBottom: 10, lineHeight: 1.25 }}>
                  {screen.title}
                </h3>
                <p style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.6, flex: 1 }}>
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
        {screens.map((_, i) => (
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
  );
}
