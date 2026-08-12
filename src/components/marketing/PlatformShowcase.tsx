/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectFeatureCarousel from "./ProjectFeatureCarousel";
import { ArrowRight, Globe } from "lucide-react";
import Link from "next/link";

export default function PlatformShowcase({ projects = [] }: { projects?: any[] }) {
  const [activeFilter, setActiveFilter] = useState("All");

  // If no projects are loaded yet (e.g. empty database), show a fallback
  if (!projects || projects.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "100px 0" }}>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, color: "#0D1117" }}>Products</h2>
        <p style={{ color: "#6B7280", marginTop: 12 }}>Check back soon as we launch our first platforms.</p>
      </div>
    );
  }

  // Extract unique industries for the filters
  const industries = ["All", ...Array.from(new Set(projects.map((p: any) => p.industry)))];
  
  // Filter projects based on the active tab
  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter((p: any) => p.industry === activeFilter);

  // Map the filtered database projects into the shape expected by the UI.
  const formattedProjects = filteredProjects.map((proj: any) => {
    
    // Map the database features to the carousel's expected shape.
    const mappedFeatures = proj.features && proj.features.length > 0 
      ? proj.features.map((f: any, i: number) => ({
          id: `f-${proj.slug}-${i+1}`,
          industry: f.subtitle,
          title: f.title,
          desc: f.desc,
          image: f.image
        }))
      : []; 
      
    const coverCard = {
      id: `hero-${proj.slug}`,
      industry: proj.industry,
      title: proj.name,
      desc: proj.summary,
      image: proj.heroImageUrl || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80",
      subFeatures: proj.features ? proj.features.map((f: any) => f.title) : [],
      link: proj.subdomain ? `https://${proj.subdomain}` : proj.liveUrl ? proj.liveUrl : null
    };

    const galleryCards = proj.gallery && proj.gallery.length > 0 
      ? proj.gallery.map((img: any, i: number) => ({
          id: `gallery-${proj.slug}-${i}`,
          industry: "INTERFACE",
          title: "Platform Preview",
          desc: "A screenshot of the platform interface in action.",
          image: img.url,
          subFeatures: []
        }))
      : [];

    const finalFeatures = [coverCard, ...mappedFeatures, ...galleryCards].slice(0, 8);

    return {
      id: proj.slug,
      tab: proj.industry,
      title: proj.name,
      description: proj.summary,
      link: proj.subdomain ? `https://${proj.subdomain}` : proj.liveUrl ? proj.liveUrl : "#",
      videoUrl: proj.videoUrl,
      status: proj.status,
      features: finalFeatures
    };
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      
      {/* Section Header */}
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, color: "#0D1117", letterSpacing: "-0.02em" }}>
          Products
        </h2>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontSize: "clamp(18px, 2vw, 22px)", color: "#94A3B8", maxWidth: 600, margin: "8px auto 0", lineHeight: 1.6 }}
        >
          Explore our suite of enterprise-grade applications, custom-built for specific industries.
        </motion.div>
      </div>

      {/* CATEGORY FILTERS */}
      {industries.length > 2 && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 60, flexWrap: "wrap", gap: 12, padding: "0 24px" }}>
          {industries.map((industry: any) => (
            <button
              key={industry}
              onClick={() => setActiveFilter(industry)}
              style={{
                position: "relative", padding: "10px 24px", fontSize: 14, fontWeight: 600, 
                color: activeFilter === industry ? "#0D1117" : "#64748B", background: "transparent", 
                border: "none", cursor: "pointer", transition: "color 0.3s ease", zIndex: 1
              }}
            >
              {activeFilter === industry && (
                <motion.div
                  layoutId="activeFilterBg"
                  style={{ position: "absolute", inset: 0, background: "#F1F5F9", borderRadius: 30, zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {industry}
            </button>
          ))}
        </div>
      )}

      {/* SHOWCASE CAROUSELS */}
      <div style={{ display: "flex", flexDirection: "column", gap: 100 }}>
        <AnimatePresence mode="popLayout">
          {formattedProjects.map((project: any, idx: number) => (
            <motion.div 
              key={project.id}
              layout
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }}
              style={{ position: "relative" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, padding: "0 20px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <h3 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, color: "#0D1117", letterSpacing: "-0.02em" }}>
                      {project.title}
                    </h3>
                    <div style={{ 
                      padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, textTransform: "uppercase",
                      background: project.status === 'live' ? "#DCFCE7" : "#FEF9C3",
                      color: project.status === 'live' ? "#166534" : "#854D0E"
                    }}>
                      {project.status.replace('_', ' ')}
                    </div>
                  </div>
                  <p style={{ fontSize: 18, color: "#4B5563", maxWidth: 600, lineHeight: 1.6 }}>
                    {project.description}
                  </p>
                </div>
                
                {project.link !== "#" && (
                  <a 
                    href={project.link} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", background: "#0D1117", color: "#fff", borderRadius: 30, fontSize: 14, fontWeight: 700, textDecoration: "none" }}
                  >
                    Explore {project.title} <ArrowRight size={16} />
                  </a>
                )}
              </div>

              <ProjectFeatureCarousel 
                title={project.title}
                description={project.description}
                link={project.link === "#" ? undefined : project.link}
                videoUrl={project.videoUrl}
                status={project.status}
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
