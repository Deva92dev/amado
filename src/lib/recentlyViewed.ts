import { cookies } from "next/headers";

const KEY = "rv_pids";
const MAX = 6;

export async function readRecentlyViewed(): Promise<string[]> {
  const raw = (await cookies()).get(KEY)?.value ?? "[]";
  try {
    const arr = JSON.parse(raw) as string[];
    return Array.isArray(arr) ? arr.slice(0, MAX) : [];
  } catch {
    return [];
  }
}
