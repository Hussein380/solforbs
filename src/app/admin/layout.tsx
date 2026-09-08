import { getAdminSession } from "@/lib/auth/session";
import AdminHeader from "./AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // If no session is active, render children without the admin dashboard header.
  // (Proxy handles redirecting unauthenticated protected requests to /admin/login)
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#F8FAFC" }}>
      <AdminHeader email={session.email} />
      <main style={{ flex: 1, padding: "40px 32px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        {children}
      </main>
    </div>
  );
}
