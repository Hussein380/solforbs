/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Plus, 
  Search, 
  ExternalLink, 
  Edit3, 
  Layers, 
  Activity, 
  Server, 
  FolderKanban,
  GraduationCap,
  Hotel,
  Building2,
  Tractor,
  Stethoscope,
  ShoppingBag,
  Factory,
  Landmark,
  CheckCircle2,
  Clock,
  Sparkles
} from "lucide-react";
import DeleteProjectButton from "./DeleteProjectButton";
import { IProject } from "@/types/project";

const INDUSTRY_ICONS: Record<string, any> = {
  education: GraduationCap,
  hospitality: Hotel,
  "real estate": Building2,
  agriculture: Tractor,
  healthcare: Stethoscope,
  retail: ShoppingBag,
  manufacturing: Factory,
  government: Landmark,
};

export default function ProjectsDashboardClient({
  initialProjects = [],
}: {
  initialProjects: IProject[];
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Metrics
  const metrics = useMemo(() => {
    const total = initialProjects.length;
    const live = initialProjects.filter((p) => p.status === "live").length;
    const inDev = initialProjects.filter((p) => p.status === "in_development").length;
    const industries = new Set(initialProjects.map((p) => p.industry?.toLowerCase())).size;
    const totalFeatures = initialProjects.reduce((acc, p) => acc + (p.features?.length || 0), 0);

    return { total, live, inDev, industries, totalFeatures };
  }, [initialProjects]);

  // Filtered list
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((p) => {
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      const query = search.toLowerCase().trim();
      const matchesQuery =
        !query ||
        p.name?.toLowerCase().includes(query) ||
        p.slug?.toLowerCase().includes(query) ||
        p.industry?.toLowerCase().includes(query) ||
        p.subdomain?.toLowerCase().includes(query);
      return matchesStatus && matchesQuery;
    });
  }, [initialProjects, statusFilter, search]);

  const getIndustryIcon = (industry: string): any => {
    const key = industry?.toLowerCase() || "";
    return INDUSTRY_ICONS[key] || FolderKanban;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      
      {/* ── Top Header Section (Stripe / Linear style) ─────────────── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Operations
            </span>
            <span style={{ color: "#CBD5E1" }}>/</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#0E5BFF", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Registry
            </span>
          </div>
          <h1 style={{ fontSize: "clamp(26px, 3vw, 32px)", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.03em", margin: 0 }}>
            Platform Registry
          </h1>
          <p style={{ fontSize: 14, color: "#64748B", margin: "6px 0 0 0" }}>
            Monitor and manage sector software modules, domains, and feature releases.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "11px 20px",
            background: "linear-gradient(135deg, #0E5BFF 0%, #0043CE 100%)",
            color: "#FFFFFF",
            borderRadius: 10,
            fontSize: 13.5,
            fontWeight: 700,
            textDecoration: "none",
            boxShadow: "0 4px 14px rgba(14, 91, 255, 0.28)",
            transition: "all 0.2s ease",
          }}
        >
          <Plus size={16} strokeWidth={2.5} />
          <span>Add Platform</span>
        </Link>
      </div>

      {/* ── Filter & Search Command Bar (Vercel style) ─────────────── */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: 16,
          border: "1px solid rgba(0, 0, 0, 0.06)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 14,
          }}
        >
          {/* Search Input */}
          <div style={{ position: "relative", minWidth: 260, flex: "1 1 300px" }}>
            <Search size={16} color="#94A3B8" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              placeholder="Search by product name, subdomain, slug..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px 10px 38px",
                borderRadius: 8,
                border: "1px solid #E2E8F0",
                fontSize: 13.5,
                color: "#0F172A",
                outline: "none",
                background: "#F8FAFC",
                transition: "border-color 0.2s ease, background 0.2s ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#0E5BFF";
                e.currentTarget.style.background = "#FFFFFF";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#E2E8F0";
                e.currentTarget.style.background = "#F8FAFC";
              }}
            />
          </div>

          {/* Status Filter Chips */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[
              { label: "All", value: "all", count: metrics.total },
              { label: "Live", value: "live", count: metrics.live },
              { label: "In Development", value: "in_development", count: metrics.inDev },
            ].map((tab) => {
              const active = statusFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setStatusFilter(tab.value)}
                  style={{
                    padding: "7px 12px",
                    borderRadius: 8,
                    border: active ? "1px solid #0E5BFF" : "1px solid #E2E8F0",
                    background: active ? "rgba(14, 91, 255, 0.08)" : "#FFFFFF",
                    color: active ? "#0E5BFF" : "#64748B",
                    fontSize: 12.5,
                    fontWeight: active ? 700 : 500,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    transition: "all 0.15s ease",
                  }}
                >
                  <span>{tab.label}</span>
                  <span
                    style={{
                      padding: "1px 6px",
                      borderRadius: 100,
                      fontSize: 10.5,
                      fontWeight: 700,
                      background: active ? "#0E5BFF" : "#F1F5F9",
                      color: active ? "#FFFFFF" : "#64748B",
                    }}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Enterprise Table ────────────────────────────────────── */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "#F8FAFC", borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}>
                <th style={{ padding: "14px 24px", fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Platform & Deployment
                </th>
                <th style={{ padding: "14px 20px", fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Sector
                </th>
                <th style={{ padding: "14px 20px", fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Status
                </th>
                <th style={{ padding: "14px 20px", fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Features
                </th>
                <th style={{ padding: "14px 24px", fontSize: 11, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "64px 24px", textAlign: "center" }}>
                    <div style={{ display: "inline-flex", width: 48, height: 48, borderRadius: 12, background: "#F1F5F9", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                      <FolderKanban size={24} color="#94A3B8" />
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", margin: "0 0 6px 0" }}>
                      No platforms found
                    </h3>
                    <p style={{ fontSize: 13.5, color: "#64748B", margin: 0 }}>
                      {search ? "No platforms match your search term." : "Get started by registering your first sector platform."}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredProjects.map((proj) => {
                  const Icon = getIndustryIcon(proj.industry);
                  const rawUrl = proj.subdomain ? `https://${proj.subdomain}` : proj.liveUrl;
                  const hasValidLink = rawUrl && rawUrl !== "#" && rawUrl !== "https://#" && rawUrl.startsWith("http");

                  return (
                    <tr
                      key={proj._id}
                      style={{
                        borderBottom: "1px solid rgba(0, 0, 0, 0.04)",
                        transition: "background 0.15s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#FBFCFE")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      {/* Column 1: Platform Entity & Domain */}
                      <td style={{ padding: "16px 24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          {/* Thumbnail / Icon Badge */}
                          <div
                            style={{
                              width: 44,
                              height: 44,
                              borderRadius: 10,
                              background: proj.heroImageUrl ? "#F1F5F9" : "linear-gradient(135deg, rgba(14,91,255,0.08) 0%, rgba(8,150,253,0.12) 100%)",
                              border: "1px solid rgba(0, 0, 0, 0.06)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              overflow: "hidden",
                              position: "relative",
                            }}
                          >
                            {proj.heroImageUrl ? (
                              <Image src={proj.heroImageUrl} alt={proj.name} fill unoptimized style={{ objectFit: "cover" }} />
                            ) : (
                              <Icon size={20} color="#0E5BFF" strokeWidth={2} />
                            )}
                          </div>

                          <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <span style={{ fontSize: 14.5, fontWeight: 700, color: "#0F172A" }}>
                                {proj.name}
                              </span>
                              {proj.featured && (
                                <span style={{ fontSize: 10, fontWeight: 700, color: "#D97706", background: "#FEF3C7", padding: "1px 6px", borderRadius: 4 }}>
                                  Featured
                                </span>
                              )}
                            </div>

                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3 }}>
                              {hasValidLink ? (
                                <a
                                  href={rawUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    fontSize: 12,
                                    color: "#0E5BFF",
                                    textDecoration: "none",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 3,
                                    fontWeight: 500,
                                  }}
                                >
                                  <span>{proj.subdomain || rawUrl?.replace("https://", "")}</span>
                                  <ExternalLink size={11} />
                                </a>
                              ) : (
                                <span style={{ fontSize: 12, color: "#94A3B8" }}>/{proj.slug}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Column 2: Industry Sector */}
                      <td style={{ padding: "16px 20px" }}>
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "4px 10px",
                            borderRadius: 6,
                            background: "#F1F5F9",
                            color: "#475569",
                            fontSize: 12.5,
                            fontWeight: 600,
                          }}
                        >
                          <Icon size={14} color="#64748B" />
                          <span>{proj.industry}</span>
                        </div>
                      </td>

                      {/* Column 3: Live Status Indicator */}
                      <td style={{ padding: "16px 20px" }}>
                        {proj.status === "live" ? (
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                              padding: "4px 10px",
                              borderRadius: 100,
                              background: "#DCFCE7",
                              color: "#166534",
                              fontSize: 12,
                              fontWeight: 700,
                            }}
                          >
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A" }} />
                            <span>Live Production</span>
                          </div>
                        ) : proj.status === "in_development" ? (
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                              padding: "4px 10px",
                              borderRadius: 100,
                              background: "#FEF9C3",
                              color: "#854D0E",
                              fontSize: 12,
                              fontWeight: 700,
                            }}
                          >
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#D97706" }} />
                            <span>In Development</span>
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 6,
                              padding: "4px 10px",
                              borderRadius: 100,
                              background: "#F1F5F9",
                              color: "#475569",
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                          >
                            <span>Roadmap</span>
                          </div>
                        )}
                      </td>

                      {/* Column 4: Features */}
                      <td style={{ padding: "16px 20px" }}>
                        <span style={{ fontSize: 13, color: "#64748B", fontWeight: 500 }}>
                          {proj.features?.length || 0} Modules
                        </span>
                      </td>

                      {/* Column 5: Actions */}
                      <td style={{ padding: "16px 24px", textAlign: "right" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, justifyContent: "flex-end" }}>
                          {hasValidLink && (
                            <a
                              href={rawUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Visit live deployment"
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 32,
                                height: 32,
                                borderRadius: 6,
                                border: "1px solid #E2E8F0",
                                background: "#FFFFFF",
                                color: "#64748B",
                                transition: "all 0.15s ease",
                              }}
                            >
                              <ExternalLink size={14} />
                            </a>
                          )}

                          <Link
                            href={`/admin/projects/${proj._id}/edit`}
                            title="Edit Platform"
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 5,
                              padding: "6px 12px",
                              borderRadius: 6,
                              border: "1px solid rgba(14, 91, 255, 0.2)",
                              background: "rgba(14, 91, 255, 0.05)",
                              color: "#0E5BFF",
                              fontSize: 12.5,
                              fontWeight: 600,
                              textDecoration: "none",
                              transition: "all 0.15s ease",
                            }}
                          >
                            <Edit3 size={13} />
                            <span>Edit</span>
                          </Link>

                          <DeleteProjectButton projectId={proj._id} projectName={proj.name} />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Summary */}
        <div
          style={{
            padding: "12px 24px",
            background: "#F8FAFC",
            borderTop: "1px solid rgba(0, 0, 0, 0.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 12.5,
            color: "#64748B",
          }}
        >
          <span>
            Showing <strong>{filteredProjects.length}</strong> of <strong>{metrics.total}</strong> platforms
          </span>
          <span style={{ fontSize: 11.5, color: "#94A3B8" }}>
            Solforbs Multi-Sector Cloud Infrastructure
          </span>
        </div>
      </div>
    </div>
  );
}
