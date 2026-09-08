import { getProjects } from "@/lib/actions/project.actions";
import { getAdminSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import ProjectsDashboardClient from "./ProjectsDashboardClient";

export default async function AdminProjectsPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const projects = await getProjects();

  return <ProjectsDashboardClient initialProjects={projects} />;
}
