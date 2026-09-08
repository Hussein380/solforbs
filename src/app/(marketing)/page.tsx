import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { getProjects } from "@/lib/actions/project.actions";

export const metadata: Metadata = {
  title: "Solforbs | Software built for every industry that powers Africa",
  description:
    "Solforbs builds cloud management software for key African industries, starting with education and expanding across primary economic sectors.",
};

export default async function HomePage() {
  const projects = await getProjects();
  return <HomeClient projects={projects} />;
}
