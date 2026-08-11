import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { getProjects } from "@/lib/actions/project.actions";

export const metadata: Metadata = {
  title: "Solforbs — Software built for every industry that powers Africa",
  description:
    "Solforbs builds intelligent platforms that help organizations run better — starting with education, expanding across every sector in Africa.",
};

export default async function HomePage() {
  const projects = await getProjects();
  return <HomeClient projects={projects} />;
}
