"use client";

import { motion } from "framer-motion";

export default function HeroCards() {
  return (
    <div style={{ position: "absolute", right: "2%", top: "45%", transform: "translateY(-50%)", width: 560, height: 600, pointerEvents: "none", zIndex: 1 }}>
      
      {/* Background glow to anchor the cards */}
      <div style={{ position: "absolute", top: "20%", left: "10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(40,120,232,0.08) 0%, transparent 60%)", filter: "blur(40px)" }} />

      {/* 1. Education (School Management) - Top Left */}
      <motion.div
        initial={{ opacity: 0, y: 40, x: -20 }}
        animate={{ opacity: 1, y: [0, -8, 0], x: 0 }}
        transition={{ 
          opacity: { duration: 0.8, delay: 0.2 }, 
          x: { duration: 0.8, delay: 0.2, type: "spring" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{
          position: "absolute", top: 40, left: 20, width: 280,
          background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)",
          borderRadius: 16, padding: 20,
          boxShadow: "0 12px 40px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(40,120,232,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📚</div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#0D1117" }}>Education</p>
            <p style={{ fontSize: 11, color: "#6B7280" }}>Today's Attendance</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 12 }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#0D1117", lineHeight: 1 }}>96%</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#16A34A", paddingBottom: 3 }}>↑ 2.4%</div>
        </div>
        <div style={{ display: "flex", gap: 4, marginTop: 16 }}>
          {[92, 94, 91, 95, 96].map((val, i) => (
            <div key={i} style={{ flex: 1, background: "#F3F4F6", borderRadius: 4, height: 32, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: `${val}%`, background: i === 4 ? "linear-gradient(to top, #39A8F5, #1A3FD4)" : "#D1D5DB", borderRadius: 4 }} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* 2. Hospitality - Middle Right */}
      <motion.div
        initial={{ opacity: 0, y: 40, x: 20 }}
        animate={{ opacity: 1, y: [0, 8, 0], x: 0 }}
        transition={{ 
          opacity: { duration: 0.8, delay: 0.4 },
          x: { duration: 0.8, delay: 0.4, type: "spring" },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }
        }}
        style={{
          position: "absolute", top: 190, right: 10, width: 260,
          background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)",
          borderRadius: 16, padding: 20,
          boxShadow: "0 20px 48px rgba(0,0,0,0.1)", border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(22,163,74,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏨</div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#0D1117" }}>Hospitality</p>
            <p style={{ fontSize: 11, color: "#6B7280" }}>Room Occupancy</p>
          </div>
        </div>
        <div style={{ position: "relative", height: 60, display: "flex", alignItems: "center", gap: 16 }}>
          {/* Circular progress */}
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "conic-gradient(#16A34A 0% 82%, #F3F4F6 82% 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 44, height: 44, background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#0D1117" }}>
              82%
            </div>
          </div>
          <div>
            <p style={{ fontSize: 12, color: "#6B7280", marginBottom: 2 }}>Available</p>
            <p style={{ fontSize: 15, fontWeight: 600, color: "#0D1117" }}>14 Rooms</p>
          </div>
        </div>
      </motion.div>

      {/* 3. Agriculture - Bottom Left */}
      <motion.div
        initial={{ opacity: 0, y: 40, x: -10 }}
        animate={{ opacity: 1, y: [0, -6, 0], x: 0 }}
        transition={{ 
          opacity: { duration: 0.8, delay: 0.6 },
          x: { duration: 0.8, delay: 0.6, type: "spring" },
          y: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }
        }}
        style={{
          position: "absolute", bottom: 60, left: 60, width: 290,
          background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)",
          borderRadius: 16, padding: 20,
          boxShadow: "0 16px 40px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(245,158,11,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌾</div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#0D1117" }}>Agriculture</p>
            <p style={{ fontSize: 11, color: "#6B7280" }}>Supply Chain Fleet</p>
          </div>
          <div style={{ padding: "4px 8px", background: "rgba(245,158,11,0.1)", color: "#D97706", fontSize: 10, fontWeight: 700, borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.05em" }}>In Transit</div>
        </div>
        
        <div style={{ background: "#F9FAFB", borderRadius: 8, padding: 12, border: "1px solid #F3F4F6" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#4B5563" }}>Route Progress</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#0D1117" }}>65%</span>
          </div>
          <div style={{ height: 6, background: "#E5E7EB", borderRadius: 3, overflow: "hidden" }}>
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: "65%" }} 
              transition={{ duration: 1.5, delay: 1 }}
              style={{ height: "100%", background: "linear-gradient(90deg, #F59E0B, #D97706)", borderRadius: 3 }} 
            />
          </div>
        </div>
      </motion.div>

    </div>
  );
}
