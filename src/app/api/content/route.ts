import { NextResponse } from "next/server";
import { isUnlocked } from "@/lib/auth";
import { getPlanContent } from "@/lib/content";

export async function GET() {
  if (!(await isUnlocked())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const content = await getPlanContent();
    return NextResponse.json({ content });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to load content" },
      { status: 500 },
    );
  }
}
