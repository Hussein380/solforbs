import { getProjectById } from "@/lib/actions/project.actions";
import { getAdminSession } from "@/lib/auth/session";
import EditProjectForm from "./EditProjectForm";
import { notFound, redirect } from "next/navigation";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const resolvedParams = await params;
  const project = await getProjectById(resolvedParams.id);

  if (!project) {
    notFound();
  }

  return <EditProjectForm project={project} />;
}
