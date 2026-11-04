import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type LocalWorkersResponse = {
  result?: Array<{
    name: string;
    bindings?: {
      d1?: Array<{ id: string; bindingName: string }>;
    };
  }>;
};

type D1RawResponse = {
  success: boolean;
  errors?: Array<{ message?: string }>;
  result?: Array<{
    success: boolean;
    error?: string;
  }>;
};

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const candidates = [
  process.env.VOCALIS_DEV_URL,
  "http://localhost:3000",
  "http://localhost:3001",
].filter((value): value is string => Boolean(value));

async function findDevServer(): Promise<string> {
  for (const base of candidates) {
    try {
      const response = await fetch(
        `${base}/cdn-cgi/local/explorer/api/local/workers`,
      );

      if (!response.ok) {
        continue;
      }

      const data = (await response.json()) as LocalWorkersResponse;
      const worker = data.result?.find((entry) => entry.name === "vocalis");

      if (worker) {
        return base;
      }
    } catch {
      // Try the next candidate.
    }
  }

  throw new Error(
    "No local Vocalis dev server found. Start it with `npm run dev` and run this script again.",
  );
}

async function findDatabaseId(base: string): Promise<string> {
  const response = await fetch(
    `${base}/cdn-cgi/local/explorer/api/local/workers`,
  );
  const data = (await response.json()) as LocalWorkersResponse;
  const worker = data.result?.find((entry) => entry.name === "vocalis");
  const database = worker?.bindings?.d1?.find(
    (entry) => entry.bindingName === "DB",
  );

  if (!database) {
    throw new Error("The local Worker has no DB binding.");
  }

  return database.id;
}

async function execute(
  base: string,
  databaseId: string,
  sql: string,
): Promise<void> {
  const response = await fetch(
    `${base}/cdn-cgi/local/explorer/api/d1/database/${databaseId}/raw`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sql }),
    },
  );

  const data = (await response.json()) as D1RawResponse;

  if (!response.ok || !data.success) {
    const message =
      data.errors?.map((error) => error.message).filter(Boolean).join("\n") ||
      data.result
        ?.map((entry) => entry.error)
        .filter(Boolean)
        .join("\n") ||
      response.statusText;

    throw new Error(message);
  }

  for (const entry of data.result ?? []) {
    if (!entry.success) {
      throw new Error(entry.error || "D1 statement failed");
    }
  }
}

const base = await findDevServer();
const databaseId = await findDatabaseId(base);

await execute(
  base,
  databaseId,
  `CREATE TABLE IF NOT EXISTS d1_migrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
  );`,
);

const appliedResponse = await fetch(
  `${base}/cdn-cgi/local/explorer/api/d1/database/${databaseId}/raw`,
  {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ sql: "SELECT name FROM d1_migrations;" }),
  },
);

const appliedData = (await appliedResponse.json()) as {
  result?: Array<{
    results?: { columns: string[]; rows: unknown[][] };
  }>;
};

const nameIndex =
  appliedData.result?.[0]?.results?.columns.indexOf("name") ?? -1;
const applied = new Set(
  nameIndex === -1
    ? []
    : (appliedData.result?.[0]?.results?.rows ?? []).map((row) =>
        String(row[nameIndex]),
      ),
);

const migrationsDir = join(root, "drizzle");
const migrations = readdirSync(migrationsDir)
  .filter((file) => file.endsWith(".sql"))
  .sort();

for (const migration of migrations) {
  if (applied.has(migration)) {
    continue;
  }

  const sql = readFileSync(join(migrationsDir, migration), "utf8");
  await execute(base, databaseId, sql);
  await execute(
    base,
    databaseId,
    `INSERT INTO d1_migrations (name) VALUES ('${migration.replace(/'/g, "''")}');`,
  );
  console.log(`Applied ${migration}`);
}

const seedDir = join(root, "db", "seed-data");
const seedParts = readdirSync(seedDir)
  .filter((file) => file.endsWith(".sql"))
  .sort();

for (const part of seedParts) {
  await execute(base, databaseId, readFileSync(join(seedDir, part), "utf8"));
  console.log(`Applied db/seed-data/${part}`);
}

console.log(`Local database ready at ${base} (${databaseId}).`);
