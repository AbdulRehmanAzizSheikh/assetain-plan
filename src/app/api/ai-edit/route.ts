import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { isUnlocked } from "@/lib/auth";
import { getPlanContent, savePlanContent } from "@/lib/content";
import type { PlanContent } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM_PROMPT = `You are the editor for the Assetain startup blueprint website.
You receive the current plan content as JSON and a user instruction (add, edit, delete, rewrite, or discuss updates).

Rules:
1. Return ONLY valid JSON matching the same schema. No markdown fences, no commentary.
2. Preserve the overall schema keys. You may change any text values.
3. For new topics that do not fit existing fields, add objects to extraSections: { id, title, body, listItems? }.
4. To delete something: remove from arrays or clear relevant fields; remove extraSections items by omitting them.
5. Keep tone professional and clear. URLs like mailto: are allowed in ctaHref.
6. Never invent unrelated products; stay focused on Assetain asset-management SaaS plan.
7. If the user shares meeting/discussion notes, merge useful decisions into the right sections.`;

function extractJson(text: string): string {
  const trimmed = text.trim();
  if (trimmed.startsWith("{")) return trimmed;
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence?.[1]) return fence[1].trim();
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");
  if (start >= 0 && end > start) return trimmed.slice(start, end + 1);
  return trimmed;
}

export async function POST(request: Request) {
  if (!(await isUnlocked())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing GROQ_API_KEY" },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();
    const message = String(body.message ?? "").trim();
    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 },
      );
    }

    const current = await getPlanContent();
    const groq = new Groq({ apiKey });

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Current plan JSON:\n${JSON.stringify(current, null, 2)}\n\nUser instruction:\n${message}\n\nReturn the full updated plan JSON.`,
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "";
    const parsed = JSON.parse(extractJson(raw)) as PlanContent;

    if (!parsed.hero || !parsed.features || !Array.isArray(parsed.extraSections)) {
      if (!parsed.extraSections) {
        parsed.extraSections = [];
      }
    }

    const merged: PlanContent = {
      ...current,
      ...parsed,
      extraSections: parsed.extraSections ?? [],
    };

    await savePlanContent(merged);

    return NextResponse.json({
      ok: true,
      summary: "Plan updated and saved to MongoDB.",
      content: merged,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        error:
          e instanceof Error ? e.message : "AI edit failed. Try again.",
      },
      { status: 500 },
    );
  }
}
