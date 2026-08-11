import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://solforbs.com"),
  title: {
    default: "Solforbs — Software built for every industry that powers Africa",
    template: "%s | Solforbs",
  },
  description:
    "Solforbs builds intelligent, industry-specific software platforms — starting with education and expanding to every major sector across Africa.",
  keywords: ["Solforbs", "industry software Africa", "SaaS Africa"],
};

import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        </head>
        <body>
          <div className="noise-overlay" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
