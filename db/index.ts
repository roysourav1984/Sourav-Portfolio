import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString: string | undefined = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const globalForDb = global as unknown as {
  client: ReturnType<typeof postgres> | undefined;
  db: ReturnType<typeof drizzle> | undefined;
};

const client =
  globalForDb.client ??
  postgres(connectionString, { max: 5, idle_timeout: 20 });

export const db = globalForDb.db ?? drizzle(client, { schema });

globalForDb.client = client;
globalForDb.db = db;

export type Database = typeof db;
