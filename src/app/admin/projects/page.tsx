import { getProjects } from "@/lib/actions/project.actions";
import Link from "next/link";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "#0F172A", marginBottom: 8 }}>Projects</h1>
          <p style={{ color: "#64748B" }}>Manage your platform ecosystem and products.</p>
        </div>
        
        {/* We haven't built the 'new' form yet, but this is the button for it */}
        <Link href="/admin/projects/new" style={{
          padding: "10px 20px", background: "#0E5BFF", color: "#fff", 
          borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: "none",
          boxShadow: "0 4px 12px rgba(14,91,255,0.2)"
        }}>
          + Add Project
        </Link>
      </div>

      <div style={{ background: "#fff", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F8FAFC", borderBottom: "1px solid rgba(0,0,0,0.06)", textAlign: "left" }}>
              <th style={{ padding: "16px 24px", fontSize: 12, fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Name</th>
              <th style={{ padding: "16px 24px", fontSize: 12, fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Industry</th>
              <th style={{ padding: "16px 24px", fontSize: 12, fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Status</th>
              <th style={{ padding: "16px 24px", fontSize: 12, fontWeight: 700, color: "#64748B", textTransform: "uppercase", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: "40px 24px", textAlign: "center", color: "#94A3B8" }}>
                  No projects found. Add one to populate the homepage.
                </td>
              </tr>
            ) : (
              projects.map((proj) => (
                <tr key={proj._id} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                  <td style={{ padding: "16px 24px", fontSize: 14, fontWeight: 600, color: "#0F172A" }}>{proj.name}</td>
                  <td style={{ padding: "16px 24px", fontSize: 14, color: "#475569" }}>{proj.industry}</td>
                  <td style={{ padding: "16px 24px" }}>
                    <span style={{ 
                      padding: "4px 10px", borderRadius: 100, fontSize: 12, fontWeight: 600,
                      background: proj.status === 'live' ? "#DCFCE7" : proj.status === 'in_development' ? "#FEF9C3" : "#F1F5F9",
                      color: proj.status === 'live' ? "#166534" : proj.status === 'in_development' ? "#854D0E" : "#475569"
                    }}>
                      {proj.status.replace("_", " ")}
                    </span>
                  </td>
                  <td style={{ padding: "16px 24px", textAlign: "right" }}>
                    <Link href={`/admin/projects/${proj._id}/edit`} style={{ fontSize: 13, fontWeight: 600, color: "#0E5BFF", textDecoration: "none" }}>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
