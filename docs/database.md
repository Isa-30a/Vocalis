# Database

The schema lives in `db/schema.ts` and generated migrations are committed under
`drizzle/`. The connection is created lazily in `db/index.ts` from the `DB` D1
binding declared in `cloudflare.config.ts`.

## Tables

- `members` — directors, musicians and singers. A director is a member with
  `role = 'director'`.
- `songs` — catalog with the original key and duration.
- `song_director_keys` — the key each director uses for a song.
- `setlists` and `setlist_items` — service order with the key chosen for it.
- `song_audio` — metadata for recordings. Files will live in R2 when uploads
  are implemented; the table is already in place.

Rehearsals are intentionally not persisted yet.

## Local database

D1 is emulated by the Cloudflare Vite plugin and persists under
`.cloudflare/state`. With `npm run dev` running, apply the schema and seed:

```bash
npm run db:local
```

The script finds the running dev server, reads the local `DB` binding, applies
any unapplied file in `drizzle/`, records them in `d1_migrations`, and then
loads the generated SQL parts in `db/seed-data/`. It is safe to run again.

## Remote database

Create the D1 database once and note its UUID:

```bash
cf d1 create --name vocalis
```

Set `D1_DATABASE_ID` in your shell to apply the schema and seed, and keep it in
the Cloudflare Workers Builds environment so the deploy binds the same database:

```bash
export D1_DATABASE_ID=<database-uuid>
npm run db:migrate
npm run db:seed
```

## Changing the schema

```bash
npm run db:generate
npm run db:local
```

## Seeding

`db/seed-data/` is generated, not edited by hand. It is built from
`songs-import.json`, including the directors it references:

```bash
npm run db:seed:generate
```

Imports use `ON CONFLICT DO NOTHING`, so re-running the seed adds new rows
without overwriting edits made in the app. `db/seed-report.json` records the
import warnings (missing artists, missing keys, lost minor modes and zero
durations) for later cleanup.

## Scripts

| Command                   | Description                                                  |
| ------------------------- | ------------------------------------------------------------ |
| `npm run db:generate`     | Generate a Drizzle migration from `db/schema.ts`             |
| `npm run db:local`        | Apply migrations and the seed to the running local D1        |
| `npm run db:seed:generate`| Regenerate `db/seed-data/*.sql` from the import and fixtures  |
| `npm run db:migrate`      | Apply migrations to the remote D1 (`D1_DATABASE_ID`)         |
| `npm run db:seed`         | Seed the remote D1 (`D1_DATABASE_ID`)                        |
