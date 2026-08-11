import { redirect } from "next/navigation";

export default function AdminIndex() {
  // Redirect the base /admin route to the projects dashboard
  redirect("/admin/projects");
}
