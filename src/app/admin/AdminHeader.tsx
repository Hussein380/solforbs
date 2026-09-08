"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutAdminAction } from "@/lib/actions/adminAuth.actions";
import { LogOut, User } from "lucide-react";
import { useState } from "react";

export default function AdminHeader({ email }: { email: string }) {
  const router = useRouter();
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
        padding: "14px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid rgba(0, 0, 0, 0.07)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        <Link href="/admin/projects" style={{ fontWeight: 800, fontSize: 18, color: "#0F172A", textDecoration: "none" }}>
          Solforbs Admin
        </Link>
        <nav style={{ display: "flex", gap: 16 }}>
          <Link
            href="/admin/projects"
            style={{ fontSize: 13.5, fontWeight: 600, color: "var(--brand-mid)", textDecoration: "none" }}
          >
            Projects
          </Link>
        </nav>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <Link href="/" target="_blank" style={{ fontSize: 13, color: "#64748B", textDecoration: "none" }}>
          View Site ↗
        </Link>

        {/* Admin Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "5px 12px",
            background: "#F8FAFC",
            borderRadius: 100,
            border: "1px solid #E2E8F0",
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "#0E5BFF",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <User size={12} />
          </div>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: "#334155" }}>
            {email}
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "1px solid #E2E8F0",
            borderRadius: 8,
            padding: "6px 12px",
            color: "#64748B",
            fontSize: 12.5,
            fontWeight: 600,
            cursor: loggingOut ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#FCA5A5";
            e.currentTarget.style.color = "#DC2626";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#E2E8F0";
            e.currentTarget.style.color = "#64748B";
          }}
        >
          <LogOut size={13} />
          <span>{loggingOut ? "Signing out..." : "Sign Out"}</span>
        </button>
      </div>
    </header>
  );
}
