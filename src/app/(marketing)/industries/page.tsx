import type { Metadata } from "next";
import IndustriesClient from "@/app/(marketing)/industries/IndustriesClient";

export const metadata: Metadata = {
  title: "Industries — Solforbs",
  description: "Solforbs is building intelligent software platforms for every major sector — education, hospitality, healthcare, real estate, agriculture, and beyond.",
};

export default function IndustriesPage() {
  return <IndustriesClient />;
}
