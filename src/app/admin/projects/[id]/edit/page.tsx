import { getProjectById } from "@/lib/actions/project.actions";
import EditProjectForm from "./EditProjectForm";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = await getProjectById(resolvedParams.id);

  if (!project) {
    notFound();
  }

  return <EditProjectForm project={project} />;
}
