import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Aditya Kumar | AI/ML Engineer & Full-Stack Developer",
  description:
    "Portfolio of Aditya Kumar, an AI/ML Engineer and Full-Stack Developer pursuing Data Science at IIT Madras. Explore his machine learning, AI, data science, and full-stack projects.",
  applicationName: "Aditya Kumar Portfolio",
  authors: [{ name: "Aditya Kumar" }],
  keywords: [
    "Aditya Kumar",
    "AI/ML Engineer",
    "Full-Stack Developer",
    "Data Science",
    "IIT Madras",
    "Machine Learning",
  ],
  openGraph: {
    title: "Aditya Kumar | AI/ML Engineer & Full-Stack Developer",
    description:
      "Machine learning systems, data-driven applications, and modern web platforms.",
    type: "website",
    locale: "en_IN",
    siteName: "Aditya Kumar Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Kumar | AI/ML Engineer & Full-Stack Developer",
    description:
      "Machine learning systems, data-driven applications, and modern web platforms.",
  },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080a0c",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
