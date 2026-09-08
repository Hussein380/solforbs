"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { logoutAdminAction } from "@/lib/actions/adminAuth.actions";
import { LogOut, User, ExternalLink, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function AdminHeader({ email }: { email: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await logoutAdminAction();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header
      style={{
        background: "#FFFFFF",
        padding: "0 32px",
        height: 64,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid rgba(0, 0, 0, 0.07)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Left: Brand + Navigation */}
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        <Link href="/admin/projects" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/logo.png" alt="Solforbs" width={110} height={30} style={{ height: 26, width: "auto", objectFit: "contain" }} />
          <span
            style={{
              fontSize: 10.5,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "#0E5BFF",
              background: "rgba(14, 91, 255, 0.08)",
              padding: "2px 8px",
              borderRadius: 6,
            }}
          >
            Console
          </span>
        </Link>

        {/* Separator */}
        <div style={{ width: 1, height: 20, background: "#E2E8F0" }} />

        {/* Navigation tabs */}
        <nav style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Link
            href="/admin/projects"
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: pathname?.startsWith("/admin/projects") ? "#0E5BFF" : "#64748B",
              background: pathname?.startsWith("/admin/projects") ? "rgba(14, 91, 255, 0.06)" : "transparent",
              padding: "6px 12px",
              borderRadius: 6,
              textDecoration: "none",
              transition: "all 0.15s ease",
            }}
          >
            Platforms
          </Link>
        </nav>
      </div>

      {/* Right: Environment status, View Site, User, Logout */}
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {/* Production health indicator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 10px",
            borderRadius: 100,
            background: "#F0FDF4",
            border: "1px solid #BBF7D0",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A" }} />
          <span style={{ fontSize: 11.5, fontWeight: 700, color: "#166534" }}>Production</span>
        </div>

        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            fontSize: 13,
            fontWeight: 600,
            color: "#64748B",
            textDecoration: "none",
            transition: "color 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#0F172A")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
        >
          <span>Live Site</span>
          <ExternalLink size={12} />
        </Link>

        {/* Separator */}
        <div style={{ width: 1, height: 18, background: "#E2E8F0" }} />

        {/* User Identity Chip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "4px 10px 4px 6px",
            background: "#F8FAFC",
            borderRadius: 100,
            border: "1px solid #E2E8F0",
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #0E5BFF 0%, #0043CE 100%)",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <User size={12} />
          </div>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: "#1E293B" }}>
            {email}
          </span>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          title="Sign out of Solforbs Console"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: "none",
            border: "1px solid #E2E8F0",
            borderRadius: 8,
            padding: "6px 12px",
            color: "#64748B",
            fontSize: 12.5,
            fontWeight: 600,
            cursor: loggingOut ? "not-allowed" : "pointer",
            transition: "all 0.15s ease",
          }}
          onMouseEnter={(e) => {
            if (!loggingOut) {
              e.currentTarget.style.borderColor = "#FCA5A5";
              e.currentTarget.style.color = "#DC2626";
              e.currentTarget.style.background = "#FEF2F2";
            }
          }}
          onMouseLeave={(e) => {
            if (!loggingOut) {
              e.currentTarget.style.borderColor = "#E2E8F0";
              e.currentTarget.style.color = "#64748B";
              e.currentTarget.style.background = "none";
            }
          }}
        >
          <LogOut size={13} />
          <span>{loggingOut ? "Signing out..." : "Sign Out"}</span>
        </button>
      </div>
    </header>
  );
}
