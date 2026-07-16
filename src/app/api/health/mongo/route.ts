import { NextResponse } from "next/server";
import { getDb, mongoEnvHint } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const hint = mongoEnvHint();
  if (hint) {
    return NextResponse.json(
      { ok: false, step: "env", error: hint },
      { status: 500 },
    );
  }

  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    const plan = await db.collection("plan").findOne({ _id: "main" as never });
    return NextResponse.json({
      ok: true,
      database: db.databaseName,
      hasPlanDoc: Boolean(plan),
    });
  } catch (e) {
    return NextResponse.json(
      {
        ok: false,
        step: "connect",
        error: e instanceof Error ? e.message : String(e),
        tip: "Atlas → Network Access → 0.0.0.0/0 allow karo. Vercel pe MONGODB_URI set karo.",
      },
      { status: 500 },
    );
  }
}
