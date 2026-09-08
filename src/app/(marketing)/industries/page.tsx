import type { Metadata } from "next";
import IndustriesClient from "@/app/(marketing)/industries/IndustriesClient";

export const metadata: Metadata = {
  title: "Industries | Solforbs",
  description: "Solforbs builds specialized operational software for education, hospitality, healthcare, and trade across Africa.",
};

export default function IndustriesPage() {
  return <IndustriesClient />;
}
