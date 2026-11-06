import { drizzle } from "drizzle-orm/d1";
import { env } from "cloudflare:workers";
import * as schema from "./schema";

export function getDb() {
  if (!env.DB) {
    throw new Error(
      "The D1 binding DB is missing. Run the app with `vite dev` or configure DB in cloudflare.config.ts.",
    );
  }

  return drizzle(env.DB, { schema });
}

export type Database = ReturnType<typeof getDb>;
