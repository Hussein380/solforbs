"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectFeatureCarousel from "./ProjectFeatureCarousel";

const projectsData = [
  {
    id: "school",
    tab: "Education",
    title: "School Management Platform",
    description: "An AI-powered platform for everything a school runs on.",
    link: "/products/school-management",
    features: [
      { id: "s-overview", industry: "Platform Overview", title: "School Management OS", desc: "The intelligent operating system for modern African schools.", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80" },
      { id: "s-bio", industry: "Attendance", title: "Biometric clock-ins", desc: "Integrated with ZKTeco. Parents get automated SMS notifications.", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80" },
      { id: "s-fin", industry: "Finance & Fees", title: "Automated fee collection", desc: "Seamless invoicing, mobile money integrations, and reporting.", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80" },
    ]
  },
  {
    id: "hosp",
    tab: "Hospitality",
    title: "Hospitality Management",
    description: "Next-gen guest management and property operations for hotels.",
    link: "/products/hospitality",
    features: [
      { id: "h-overview", industry: "Platform Overview", title: "Hospitality OS", desc: "Reimagining reservations, POS, and guest experience.", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80" },
      { id: "h-res", industry: "Reservations", title: "Smart Booking Engine", desc: "Real-time room availability and channel manager sync.", image: "https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?w=800&auto=format&fit=crop&q=80" },
      { id: "h-hk", industry: "Housekeeping", title: "Automated Dispatch", desc: "Assign rooms instantly and track cleaning status live.", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80" },
    ]
  },
  {
    id: "retail",
    tab: "Retail & POS",
    title: "Retail & POS System",
    description: "Unified retail operations for fast-growing businesses.",
    link: "/products/retail",
    features: [
      { id: "r-overview", industry: "Platform Overview", title: "Unified Retail OS", desc: "Inventory, POS, and customer management.", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80" },
      { id: "r-inv", industry: "Inventory", title: "Multi-store Sync", desc: "Track stock levels across branches in real-time.", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=80" },
      { id: "r-loy", industry: "Customers", title: "Loyalty Programs", desc: "Reward frequent shoppers and track purchase history.", image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=800&auto=format&fit=crop&q=80" },
    ]
  },
  {
    id: "realestate",
    tab: "Real Estate",
    title: "Real Estate OS",
    description: "A unified platform for property listings, agent networks, and modern tenant management.",
    link: "/products/real-estate",
    features: [
      { id: "re-overview", industry: "Platform Overview", title: "End-to-end Property OS", desc: "Centralize your listings and tenant data.", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80" },
      { id: "re-ten", industry: "Tenants", title: "Tenant Portals", desc: "Automated billing and maintenance requests.", image: "https://images.unsplash.com/photo-1554469295-d227eb954845?w=800&auto=format&fit=crop&q=80" },
      { id: "re-ag", industry: "Agents", title: "Agent Networks", desc: "Track commissions and property viewings seamlessly.", image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=800&auto=format&fit=crop&q=80" },
    ]
  },
  {
    id: "agriculture",
    tab: "Agriculture",
    title: "Agri-Business Platform",
    description: "Supply chain tracking, yield reporting, and compliance tools for agribusinesses.",
    link: "/products/agriculture",
    features: [
      { id: "ag-overview", industry: "Platform Overview", title: "Intelligent Farm OS", desc: "Digitize your supply chain from farm to table.", image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop&q=80" },
      { id: "ag-yield", industry: "Yield", title: "Predictive Analytics", desc: "Forecast crop yields based on climate and soil data.", image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80" },
      { id: "ag-sup", industry: "Supply Chain", title: "Logistics Tracking", desc: "Real-time visibility into your agricultural transport.", image: "https://images.unsplash.com/photo-1586528116311-ad8ed745091c?w=800&auto=format&fit=crop&q=80" },
    ]
  },
  {
    id: "healthcare",
    tab: "Healthcare",
    title: "Clinic Operations",
    description: "Patient records, billing, and scheduling built for modern African hospitals.",
    link: "/products/healthcare",
    features: [
      { id: "hc-overview", industry: "Platform Overview", title: "Modern Clinic OS", desc: "A unified system for all medical and operational records.", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop&q=80" },
      { id: "hc-emr", industry: "Records", title: "Electronic Health Records", desc: "Secure, fast, and compliant patient data access.", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80" },
      { id: "hc-bil", industry: "Billing", title: "Insurance Integration", desc: "Direct APIs with major insurance providers for instant claims.", image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&auto=format&fit=crop&q=80" },
    ]
  },
  {
    id: "manufacturing",
    tab: "Manufacturing",
    title: "Production Platform",
    description: "Production planning, quality control, and workforce management tools.",
    link: "/products/manufacturing",
    features: [
      { id: "mfg-overview", industry: "Platform Overview", title: "Production OS", desc: "Complete visibility into your factory floor.", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80" },
      { id: "mfg-qc", industry: "Quality", title: "Quality Control Checks", desc: "Automated QA workflows and compliance auditing.", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop&q=80" },
      { id: "mfg-wf", industry: "Workforce", title: "Shift Management", desc: "Optimize shift schedules and track machine uptime.", image: "https://images.unsplash.com/photo-1504917595217-d4f3915ce110?w=800&auto=format&fit=crop&q=80" },
    ]
  },
  {
    id: "government",
    tab: "Government",
    title: "Citizen Services",
    description: "Digital permits, secure records, and citizen engagement platforms.",
    link: "/products/government",
    features: [
      { id: "gov-overview", industry: "Platform Overview", title: "E-Gov OS", desc: "Bringing public services into the digital age.", image: "https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?w=800&auto=format&fit=crop&q=80" },
      { id: "gov-permits", industry: "Permits", title: "Digital Licensing", desc: "Issue and verify licenses securely online.", image: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=800&auto=format&fit=crop&q=80" },
      { id: "gov-id", industry: "Identity", title: "Secure Citizen ID", desc: "Biometric and encrypted digital identity solutions.", image: "https://images.unsplash.com/photo-1628121110057-013110904838?w=800&auto=format&fit=crop&q=80" },
    ]
  }
];

export default function PlatformShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    if (isHovered || userInteracted) return;
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % projectsData.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered, userInteracted]);

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
          {projectsData.map((proj, i) => {
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
              title={projectsData[activeTab].title}
              description={projectsData[activeTab].description}
              link={projectsData[activeTab].link}
              features={projectsData[activeTab].features}
              onInteract={() => setUserInteracted(true)}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
