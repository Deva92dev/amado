// app/api/cart-count/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getCartCount } from "@/lib/cart/cart"; // your file containing getCartCount

export async function GET() {
  const { userId } = await auth();
  const count = userId ? await getCartCount(userId) : 0;
  return NextResponse.json({ count });
}
