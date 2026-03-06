import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import * as relations from "./relations";

if (!process.env.DATABASE_URL) {
  throw new Error("CRITICAL: DATABASE_URL is not defined in the environment.");
}

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql, {
  schema: { ...schema, ...relations },
});

export * from "./schema";
