import { NextResponse } from "next/server";
import {
  ACCESS_COOKIE,
  expectedAccessToken,
  isUnlocked,
  SESSION_MAX_AGE_SEC,
} from "@/lib/auth";

export async function POST() {
  if (!(await isUnlocked())) {
    return NextResponse.json({ ok: false }, { status: 401 });
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
}
