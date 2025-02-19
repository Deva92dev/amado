import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DB_PASSWORD: z.string(),
    DATABASE_URL: z.string().url(),
    DIRECT_URL: z.string().url(),
    SUPABASE_URL: z.string().url(),
    SUPABASE_KEY: z.string().min(1, "Supabase key is required"),
    CLERK_SECRET_KEY: z.string().min(1, "Clerk secret key is required"),
    ADMIN_USER_ID: z.string().min(1, "Clerk Admin Id is required"),
    RAZORPAY_KEY_SECRET: z.string().min(1, "RazorPat Key secret is required"),
    NODE_ENV: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
    NEXT_PUBLIC_WEBSITE_URL: z.string(),
    NEXT_PUBLIC_RAZORPAY_KEY_ID: z
      .string()
      .min(1, "Razorpay Key ID is required"),
  },
  runtimeEnv: {
    DB_PASSWORD: process.env.DB_PASSWORD,
    DIRECT_URL: process.env.DIRECT_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    ADMIN_USER_ID: process.env.ADMIN_USER_ID,
    RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
    NEXT_PUBLIC_RAZORPAY_KEY_ID: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  },
});
