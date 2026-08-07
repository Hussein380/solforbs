import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Solforbs — Software built for every industry that powers Africa",
  description:
    "Solforbs builds intelligent platforms that help organizations run better — starting with education, expanding across every sector in Africa.",
};

export default function HomePage() {
  return <HomeClient />;
}
