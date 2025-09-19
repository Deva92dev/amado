import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const KEY = "rv_pids";
const MAX = 6;

export async function POST(request: Request) {
  const { productId } = (await request.json()) as { productId?: string };
  if (!productId)
    return NextResponse.json(
      { ok: false, error: "productId required" },
      { status: 400 }
    );

  const jar = cookies();

  let current: string[] = [];
  try {
    current = JSON.parse((await jar).get(KEY)?.value ?? "[]");
  } catch {
    current = [];
  }

  const next = [productId, ...current.filter((id) => id !== productId)].slice(
    0,
    MAX
  );

  const res = NextResponse.json({ ok: true, count: next.length });
  res.cookies.set({
    name: KEY,
    value: JSON.stringify(next),
    httpOnly: false, // readable on client if ever needed
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
