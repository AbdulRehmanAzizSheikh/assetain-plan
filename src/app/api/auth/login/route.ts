import { NextResponse } from "next/server";
import {
  ACCESS_COOKIE,
  expectedAccessToken,
  SESSION_MAX_AGE_SEC,
  verifyPassword,
} from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const password = String(body.password ?? "");

    if (!verifyPassword(password)) {
      return NextResponse.json(
        { ok: false, error: "Wrong access code" },
        { status: 401 },
      );
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set(ACCESS_COOKIE, expectedAccessToken(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_MAX_AGE_SEC,
    });
    return res;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request" },
      { status: 400 },
    );
  }
}
