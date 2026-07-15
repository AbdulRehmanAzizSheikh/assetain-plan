import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ACCESS_COOKIE = "assetain_access";

/** Session lasts 60s after last keep-alive; leaving the site stops keep-alive → auto logout. */
export const SESSION_MAX_AGE_SEC = 60;

export function expectedAccessToken(): string {
  const password = process.env.SITE_PASSWORD || "";
  return createHash("sha256")
    .update(`assetain:${password}`)
    .digest("hex");
}

export function verifyPassword(input: string): boolean {
  const expected = process.env.SITE_PASSWORD || "";
  if (!expected || !input) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isUnlocked(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(ACCESS_COOKIE)?.value;
  if (!token) return false;
  try {
    const expected = expectedAccessToken();
    const a = Buffer.from(token);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
