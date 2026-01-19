import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import * as relations from "./relations";

const connectionString = process.env.DATABASE_URL!;

// Disable "prepare" because Supabase Transaction Mode (Port 6543) doesn't support it
const client = postgres(connectionString, {
  prepare: false,
});

export const db = drizzle(client, {
  schema: { ...schema, ...relations },
});
