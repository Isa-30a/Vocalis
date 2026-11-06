import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const databaseId = process.env.D1_DATABASE_ID;

if (!databaseId) {
  throw new Error(
    "Set D1_DATABASE_ID to the UUID of the remote database (see `cf d1 list`).",
  );
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const seedDir = join(root, "db", "seed-data");
const parts = readdirSync(seedDir)
  .filter((file) => file.endsWith(".sql"))
  .sort();

for (const part of parts) {
  const sql = readFileSync(join(seedDir, part), "utf8");

  execFileSync("npx", ["cf", "d1", "query", databaseId, "--sql", sql], {
    stdio: "inherit",
    cwd: root,
  });
  console.log(`Applied db/seed-data/${part}`);
}

console.log(`Seeded ${parts.length} part(s) into D1 ${databaseId}.`);
