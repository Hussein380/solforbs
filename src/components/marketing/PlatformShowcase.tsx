/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectFeatureCarousel from "./ProjectFeatureCarousel";
import { Layers } from "lucide-react";

/** Returns a valid http(s) URL or undefined: strictly checks hostname so "https://#" never passes */
function safeLink(url: string | undefined | null): string | undefined {
  if (!url) return undefined;
  const t = url.trim();
  if (!t || t === "#" || t === "https://#" || t === "http://#" || !t.startsWith("http")) return undefined;
  try {
    const parsed = new URL(t);
    if ((parsed.protocol !== "http:" && parsed.protocol !== "https:") || !parsed.hostname || parsed.hostname === "#") {
      return undefined;
    }
    return t;
  } catch {
    return undefined;
  }
}

export default function PlatformShowcase({ projects = [] }: { projects?: any[] }) {
  const [activeFilter, setActiveFilter] = useState("All");

  // If no projects are loaded yet (e.g. empty database), show a clean fallback
  if (!projects || projects.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "100px 20px" }}>
        <div 
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "var(--brand-tint-8)",
            color: "var(--brand-mid)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <Layers size={32} />
        </div>
        <h2 style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, color: "var(--text-primary)" }}>
          Platforms & Products
        </h2>
        <p style={{ color: "var(--text-secondary)", marginTop: 10, maxWidth: 460, margin: "10px auto 0", lineHeight: 1.6 }}>
          Our industry-specific platforms are being provisioned. Check back soon for live platform access.
        </p>
      </div>
    );
  }

  // Extract unique industries for the filters
  const industries = ["All", ...Array.from(new Set(projects.map((p: any) => p.industry).filter(Boolean)))];
  
  // Filter projects based on the active tab
  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter((p: any) => p.industry === activeFilter);

  // Map the filtered database projects into the structured shape expected by the studio.
  const formattedProjects = filteredProjects.map((proj: any) => {
    const mappedFeatures = proj.features && proj.features.length > 0 
      ? proj.features.map((f: any, i: number) => ({
          id: `f-${proj.slug || proj._id}-${i+1}`,
          industry: f.subtitle || proj.industry,
          title: f.title,
          desc: f.desc,
          image: f.image || proj.heroImageUrl || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
          subFeatures: []
        }))
      : []; 
      
    const coverCard = {
      id: `hero-${proj.slug || proj._id}`,
      industry: proj.industry || "ENTERPRISE",
      title: mappedFeatures.length > 0 ? "Platform Overview" : proj.name,
      desc: proj.summary,
      image: proj.heroImageUrl || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&auto=format&fit=crop&q=80",
      subFeatures: proj.features ? proj.features.map((f: any) => f.title).slice(0, 4) : [],
      link: safeLink(proj.subdomain ? `https://${proj.subdomain}` : proj.liveUrl)
    };

    const galleryCards = proj.gallery && proj.gallery.length > 0 
      ? proj.gallery.map((img: any, i: number) => ({
          id: `gallery-${proj.slug || proj._id}-${i}`,
          industry: "INTERFACE",
          title: img.alt || "Interface Preview",
          desc: "High-resolution interface view of the live platform system.",
          image: img.url,
          subFeatures: []
        }))
      : [];

    const finalFeatures = [coverCard, ...mappedFeatures, ...galleryCards];

    return {
      id: proj.slug || proj._id,
      industry: proj.industry,
      title: proj.name,
      description: proj.summary,
      link: safeLink(proj.subdomain ? `https://${proj.subdomain}` : proj.liveUrl),
      videoUrl: proj.videoUrl,
      status: proj.status,
      features: finalFeatures
    };
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
      
      {/* ── Section Header ────────────────────────────────────────── */}
      <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
        <span 
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--brand-mid)",
            background: "var(--brand-tint-8)",
            padding: "5px 14px",
            borderRadius: 20,
            display: "inline-block",
            marginBottom: 16,
          }}
        >
          Product Suite
        </span>

        <h2 
          style={{ 
            fontSize: "clamp(30px, 4.2vw, 48px)", 
            fontWeight: 800, 
            color: "var(--text-primary)", 
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          Engineered for African Scale
        </h2>

        <motion.p 
          initial={{ opacity: 0, y: 16 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ 
            fontSize: "clamp(15px, 1.8vw, 18px)", 
            color: "var(--text-secondary)", 
            marginTop: 14, 
            lineHeight: 1.6,
          }}
        >
          Explore dedicated enterprise software architectures designed specifically for the workflows of critical sectors.
        </motion.p>
      </div>

      {/* ── Category / Industry Filters ───────────────────────────── */}
      {industries.length > 2 && (
        <div 
          style={{ 
            display: "flex", 
            justifyContent: "center", 
            flexWrap: "wrap", 
            gap: 8, 
            padding: "6px",
            background: "#FFFFFF",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            borderRadius: 14,
            maxWidth: "max-content",
            margin: "0 auto 16px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
          }}
        >
          {industries.map((industry: any) => {
            const isSelected = activeFilter === industry;
            const count = industry === "All" 
              ? projects.length 
              : projects.filter((p: any) => p.industry === industry).length;

            return (
              <button
                key={industry}
                onClick={() => setActiveFilter(industry)}
                style={{
                  position: "relative",
                  padding: "8px 18px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: isSelected ? "var(--text-primary)" : "var(--text-secondary)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 10,
                  transition: "color 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeFilterBg"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(8, 150, 253, 0.08)",
                      border: "1px solid var(--border-brand)",
                      borderRadius: 10,
                      zIndex: -1,
                    }}
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span>{industry}</span>
                <span 
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "1px 6px",
                    borderRadius: 10,
                    background: isSelected ? "var(--brand-mid)" : "rgba(0,0,0,0.06)",
                    color: isSelected ? "#FFFFFF" : "var(--text-tertiary)",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* ── Product Studios ───────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
        <AnimatePresence mode="popLayout">
          {formattedProjects.map((project: any) => (
            <motion.div 
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.98 }} 
              transition={{ duration: 0.4 }}
              style={{ position: "relative" }}
            >
              <ProjectFeatureCarousel 
                title={project.title}
                description={project.description}
                link={project.link}
                videoUrl={project.videoUrl}
                status={project.status}
                industry={project.industry}
                features={project.features}
                onInteract={() => {}}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
