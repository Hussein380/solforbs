"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    id: "school",
    title: "School Management OS",
    tagline: "The intelligent operating system for modern African schools.",
    features: ["Admissions & records", "Attendance & timetabling", "Finance & fee tracking"],
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80",
    link: "/products/school-management",
    color: "#2878E8"
  },
  {
    id: "hospitality",
    title: "Hospitality Platform",
    tagline: "Next-gen guest management and property operations.",
    features: ["Reservations & booking", "Restaurant POS", "Housekeeping automation"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
    link: "/products/hospitality",
    color: "#8B5CF6"
  },
  {
    id: "realestate",
    title: "Real Estate OS",
    tagline: "End-to-end property listings and tenant management.",
    features: ["Agent networks", "Tenant billing", "Maintenance tracking"],
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80",
    link: "/products/real-estate",
    color: "#10B981"
  }
];

export default function ProjectCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % projects.length);
  const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length);

  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden", padding: "20px 0" }}>
      
      {/* Navigation Controls */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginBottom: 24, paddingRight: 10 }}>
        <button onClick={prev} style={{ width: 44, height: 44, borderRadius: "50%", background: "#fff", border: "1px solid rgba(0,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
          <ChevronLeft size={20} color="#4B5563" />
        </button>
        <button onClick={next} style={{ width: 44, height: 44, borderRadius: "50%", background: "#fff", border: "1px solid rgba(0,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
          <ChevronRight size={20} color="#4B5563" />
        </button>
      </div>

      <div style={{ display: "flex", gap: 24, transform: `translateX(calc(-${index * 100}% - ${index * 24}px))`, transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)" }}>
        {projects.map((p, i) => {
          const isActive = i === index;
          return (
            <div key={p.id} style={{ 
              minWidth: "100%", 
              maxWidth: "100%", 
              background: "#fff", 
              borderRadius: 24, 
              border: "1px solid rgba(0,0,0,0.06)", 
              boxShadow: isActive ? "0 24px 60px rgba(0,0,0,0.06)" : "0 8px 24px rgba(0,0,0,0.02)", 
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              transition: "all 0.4s ease",
              opacity: isActive ? 1 : 0.6,
              transform: isActive ? "scale(1)" : "scale(0.97)",
            }} className="stack-mobile">
              
              {/* Image Section */}
              <div style={{ height: 260, position: "relative", background: "#E5E7EB", width: "100%" }}>
                <Image src={p.image} alt={p.title} fill style={{ objectFit: "cover" }} unoptimized />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }} />
                <div style={{ position: "absolute", bottom: 20, left: 24, right: 24 }}>
                   <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.05em", color: "#fff", textTransform: "uppercase", marginBottom: 6, opacity: 0.9 }}>
                     Platform Showcase
                   </div>
                   <h3 style={{ fontSize: 26, fontWeight: 700, color: "#fff" }}>{p.title}</h3>
                </div>
              </div>

              {/* Content Section */}
              <div style={{ padding: "32px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                <p style={{ fontSize: 15, color: "#4B5563", lineHeight: 1.6, marginBottom: 24 }}>{p.tagline}</p>
                
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32, flex: 1 }}>
                  {p.features.map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                       <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.color }} />
                       <span style={{ fontSize: 14, color: "#374151", fontWeight: 500 }}>{f}</span>
                    </div>
                  ))}
                </div>

                <Link href={p.link} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 24px", background: p.color, color: "#fff", borderRadius: 12, fontSize: 15, fontWeight: 600, textDecoration: "none", width: "fit-content", transition: "all 0.2s" }}>
                   Explore Platform <ArrowRight size={18} />
                </Link>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
