import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { env } from "../env";

const isPublicRoute = createRouteMatcher([
  "/",
  "/products",
  "/products/(.*)",
  "/about",
  "/api/payment",
  "/api/verify",
  "/api/webhooks(.*)",
  "/robots.txt",
  "/sitemap.xml",
  "/favicon.ico",
  "/cancellation-refunds",
  "/contact",
  "/privacy-policy",
  "/shipping-policy",
  "/terms-condition",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (isAdminRoute(req)) {
    if (userId !== env.ADMIN_USER_ID) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return;
  }

  if (!isPublicRoute(req)) {
    if (!userId) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
