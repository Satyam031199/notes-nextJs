import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL;
if (!databaseUrl) {
  throw new Error("No database connection string was provided.");
}

const sql = neon(databaseUrl);

export const db = drizzle(sql, { schema });
