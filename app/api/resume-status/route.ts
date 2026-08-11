import { existsSync } from "node:fs";
import { join } from "node:path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  const resumePath = join(process.cwd(), "public", "resume", "aditya-kumar-resume.pdf");
  return NextResponse.json(
    { available: existsSync(resumePath) },
    { headers: { "Cache-Control": "no-store" } },
  );
}
