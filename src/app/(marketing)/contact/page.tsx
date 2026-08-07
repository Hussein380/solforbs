import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact — Solforbs",
  description: "Get in touch with the Solforbs team. We'll get back within one business day.",
};

export default function ContactPage() {
  return <ContactClient />;
}
