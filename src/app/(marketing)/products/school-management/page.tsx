import type { Metadata } from "next";
import SchoolClient from "./SchoolClient";

export const metadata: Metadata = {
  title: "School Management Platform — Solforbs",
  description:
    "An AI-powered school management system for admissions, attendance, finance, and communication. Trusted by schools across Kenya and Africa.",
  keywords: [
    "school management system Kenya",
    "school management system Africa",
    "school ERP Kenya",
    "student management software",
    "school software Africa",
  ],
};

export default function SchoolManagementPage() {
  return <SchoolClient />;
}
