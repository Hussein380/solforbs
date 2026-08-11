"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectFeatureCarousel from "./ProjectFeatureCarousel";

export default function PlatformShowcase({ projects = [] }: { projects?: any[] }) {
  const [activeTab, setActiveTab] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  // If no projects are loaded yet (e.g. empty database), show a fallback
  if (!projects || projects.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "100px 0" }}>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, color: "#0D1117" }}>Products</h2>
        <p style={{ color: "#6B7280", marginTop: 12 }}>Check back soon as we launch our first platforms.</p>
      </div>
    );
  }

  // Filter only 'live' or 'in_development' projects for the showcase if desired, or just show all.
  // The user requested: "only appear what we added". So we show all projects passed from DB.
  const displayProjects = projects.filter(p => p.status === 'live'); // Or don't filter if you want to show all

  // Map the DB projects into the shape expected by the UI. 
  // We now have rich feature objects straight from the DB!
  const formattedProjects = displayProjects.map(proj => {
    
    // Map the database features to the carousel's expected shape.
    const mappedFeatures = proj.features && proj.features.length > 0 
      ? proj.features.map((f: any, i: number) => ({
          id: `f-${proj.slug}-${i+1}`,
          industry: f.subtitle, // the frontend expects 'industry' as the subtitle label
          title: f.title,
          desc: f.desc,
          image: f.image
        }))
      : []; 
      
    // Automatically create a "Cover Card" for the project itself
    const coverCard = {
      id: `hero-${proj.slug}`,
      industry: proj.industry,
      title: proj.name,
      desc: proj.summary,
      image: proj.heroImageUrl || "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80",
      subFeatures: proj.features ? proj.features.map((f: any) => f.title) : [],
      link: proj.subdomain ? `https://${proj.subdomain}` : proj.liveUrl ? proj.liveUrl : null
    };

    // Map the gallery images into Carousel Cards
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

    // Combine the cover card, the dynamic features, and the gallery screenshots into the carousel
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

  useEffect(() => {
    if (isHovered || userInteracted || formattedProjects.length === 0) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % formattedProjects.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered, userInteracted, formattedProjects.length]);

  if (formattedProjects.length === 0) return null;

  return (
    <div 
      style={{ display: "flex", flexDirection: "column", gap: 32 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Section Header */}
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, color: "#0D1117", letterSpacing: "-0.02em" }}>
          Products
        </h2>
        <p style={{ fontSize: 16, color: "#6B7280", marginTop: 8 }}>
          Explore our suite of intelligent operating systems.
        </p>
      </div>

      {/* Tabs Row */}
      <div style={{ display: "flex", justifyContent: "center", width: "100%", padding: "0 10px" }}>
        <div 
          style={{ 
            display: "flex", gap: 6, overflowX: "auto", padding: 6, background: "#F3F4F6", 
            borderRadius: 100, maxWidth: "100%", scrollbarWidth: "none",
            border: "1px solid rgba(0,0,0,0.04)"
          }}
          className="hide-scrollbar"
        >
          {formattedProjects.map((proj, i) => {
            const isActive = activeTab === i;
            return (
              <button 
                key={proj.id} 
                onClick={() => {
                  setUserInteracted(true);
                  setActiveTab(i);
                }}
                style={{
                  padding: "10px 20px",
                  borderRadius: 100,
                  border: "none",
                  background: isActive ? "linear-gradient(135deg, #39A8F5, #1A3FD4)" : "transparent",
                  color: isActive ? "#fff" : "#6B7280",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: isActive ? "0 6px 16px rgba(40,120,232,0.25)" : "none",
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.02em"
                }}
                onMouseEnter={(e) => { if(!isActive) e.currentTarget.style.color = "#0D1117"; }}
                onMouseLeave={(e) => { if(!isActive) e.currentTarget.style.color = "#6B7280"; }}
              >
                {proj.tab}
              </button>
            )
          })}
        </div>
      </div>

      {/* Active Carousel Content */}
      <div style={{ minHeight: 650, position: "relative" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.4 }}
          >
            <ProjectFeatureCarousel 
              title={formattedProjects[activeTab].title}
              description={formattedProjects[activeTab].description}
              link={formattedProjects[activeTab].link}
              videoUrl={formattedProjects[activeTab].videoUrl}
              status={formattedProjects[activeTab].status}
              features={formattedProjects[activeTab].features}
              onInteract={() => setUserInteracted(true)}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
