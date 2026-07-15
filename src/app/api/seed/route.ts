import { readFileSync } from "fs";
import { join } from "path";
import { NextResponse } from "next/server";
import { isUnlocked } from "@/lib/auth";
import { savePlanContent } from "@/lib/content";
import type { PlanContent } from "@/lib/types";

export const runtime = "nodejs";

export async function POST() {
  if (!(await isUnlocked())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const raw = readFileSync(
      join(process.cwd(), "data", "seed-plan.json"),
      "utf8",
    );
    const content = JSON.parse(raw) as PlanContent;
    await savePlanContent(content);
    return NextResponse.json({ ok: true, message: "Plan seeded into MongoDB" });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        error:
          e instanceof Error ? e.message : "Seed failed — check MongoDB URI",
      },
      { status: 500 },
    );
  }
}
