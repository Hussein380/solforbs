"use server";

import connectToDatabase from "@/lib/db";
import Project from "@/models/Project";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { IProject } from "@/types/project";

export async function getProjects() {
  noStore();
  try {
    await connectToDatabase();
    // Return lean documents so they can be passed to client components
    const projects = await Project.find().sort({ sortOrder: 1 }).lean();
    
    // Convert ObjectIds to strings to avoid Next.js serialization errors
    return projects.map((project: any): IProject => {
      project._id = project._id.toString();
      if (project.createdAt) project.createdAt = project.createdAt.toISOString();
      if (project.updatedAt) project.updatedAt = project.updatedAt.toISOString();
      if (project.launchDate) project.launchDate = project.launchDate.toISOString();
      return project;
    });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  noStore();
  try {
    await connectToDatabase();
    const project = await Project.findOne({ slug }).lean();
    if (!project) return null;
    
    project._id = project._id.toString();
    if (project.createdAt) project.createdAt = project.createdAt.toISOString();
    if (project.updatedAt) project.updatedAt = project.updatedAt.toISOString();
    if (project.launchDate) project.launchDate = project.launchDate.toISOString();
    return project;
  } catch (error) {
    console.error("Failed to fetch project by slug:", error);
    return null;
  }
}

export async function getFeaturedProject() {
  noStore();
  try {
    await connectToDatabase();
    const project = await Project.findOne({ featured: true }).lean();
    if (!project) return null;
    
    project._id = project._id.toString();
    if (project.createdAt) project.createdAt = project.createdAt.toISOString();
    if (project.updatedAt) project.updatedAt = project.updatedAt.toISOString();
    if (project.launchDate) project.launchDate = project.launchDate.toISOString();
    return project;
  } catch (error) {
    console.error("Failed to fetch featured project:", error);
    return null;
  }
}

export async function createProject(data: Partial<IProject>) {
  try {
    await connectToDatabase();
    const newProject = await Project.create(data);
    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true, id: newProject._id.toString() };
  } catch (error: unknown) {
    console.error("Failed to create project:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}

export async function getProjectById(id: string) {
  noStore();
  try {
    await connectToDatabase();
    const project = await Project.findById(id).lean();
    if (!project) return null;
    
    project._id = project._id.toString();
    if (project.createdAt) project.createdAt = project.createdAt.toISOString();
    if (project.updatedAt) project.updatedAt = project.updatedAt.toISOString();
    if (project.launchDate) project.launchDate = project.launchDate.toISOString();
    
    return project;
  } catch (error) {
    console.error("Failed to fetch project by ID:", error);
    return null;
  }
}

export async function updateProject(id: string, data: Partial<IProject>) {
  try {
    await connectToDatabase();
    await Project.findByIdAndUpdate(id, data);
    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error: unknown) {
    console.error("Failed to update project:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}

export async function deleteProject(id: string) {
  try {
    await connectToDatabase();
    await Project.findByIdAndDelete(id);
    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error: unknown) {
    console.error("Failed to delete project:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}
