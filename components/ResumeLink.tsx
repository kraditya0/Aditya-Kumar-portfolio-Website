"use client";

import { Download } from "lucide-react";

const resumePath = "/resume/aditya-kumar-resume.pdf";

export function ResumeLink({ compact = false }: { compact?: boolean }) {
  async function handleDownload(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const response = await fetch("/api/resume-status", { cache: "no-store" });
    const status = (await response.json()) as { available: boolean };
    if (status.available) {
      const anchor = document.createElement("a");
      anchor.href = resumePath;
      anchor.download = "aditya-kumar-resume.pdf";
      anchor.click();
      return;
    }

    window.dispatchEvent(
      new CustomEvent("portfolio-notice", {
        detail: "Resume PDF is being updated. Please email Aditya for the latest copy.",
      }),
    );
  }

  return (
    <a
      href={resumePath}
      download
      onClick={handleDownload}
      className={compact ? "text-link" : "button button-secondary"}
    >
      <Download size={compact ? 15 : 17} aria-hidden="true" />
      Download Resume
    </a>
  );
}
