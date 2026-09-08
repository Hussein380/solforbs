import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    return redirectToSignIn();
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
      {/* Admin Header */}
      <header style={{ 
        background: "#fff", 
        padding: "16px 32px", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <Link href="/admin/projects" style={{ fontWeight: 800, fontSize: 20, color: "#0F172A", textDecoration: "none" }}>
            Solforbs Admin
          </Link>
          <nav style={{ display: "flex", gap: 16 }}>
            <Link href="/admin/projects" style={{ fontSize: 14, fontWeight: 600, color: "var(--brand-mid)", textDecoration: "none" }}>
              Projects
            </Link>
          </nav>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/" style={{ fontSize: 13, color: "#64748B", textDecoration: "none" }}>
            View Site ↗
          </Link>
          <UserButton />
        </div>
      </header>

      {/* Admin Content */}
      <main style={{ flex: 1, padding: "40px 32px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        {children}
      </main>
    </div>
  );
}
