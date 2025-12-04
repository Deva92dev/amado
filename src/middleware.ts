import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { env } from "../env";

const isProtectedRoute = createRouteMatcher([
  "/admin/(.*)",
  "/orders/(.*)",
  "/favorites",
  "/reviews",
  "/checkout",
  "/cart",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Admin routes - always check auth
  if (isAdminRoute(req)) {
    const { userId } = await auth();
    if (userId !== env.ADMIN_USER_ID) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // Only call auth() for protected routes
  if (isProtectedRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // public no auth() call at all
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/orders/:path*",
    "/favorites/:path*",
    "/reviews/:path*",
    "/checkout/:path*",
    "/cart/:path*",
    "/products/:path*",
    // API & Backend Routes (Always run)
    "/api/:path*",
    "/trpc/:path*",
  ],
};
