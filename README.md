# Vocalis

La memoria musical de tu equipo de alabanza: tonos por director, versiones de casa y setlists para el próximo servicio.

This repository contains the mobile-first dashboard and login flow. Songs,
director keys, setlists and team members are stored in Cloudflare D1 and read
through Drizzle ORM; authentication runs on Auth.js with Google OAuth.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) running on Cloudflare Workers via [vinext](https://vinext.dev)
- React 19 + TypeScript
- Tailwind CSS 4
- [daisyUI 5](https://daisyui.com) with a custom `vocalis` theme
- [Lucide](https://lucide.dev) icons
- Geist and Quicksand via `next/font`
- [Auth.js 5](https://authjs.dev) (Google OAuth, JWT sessions)
- [Drizzle ORM](https://orm.drizzle.team) on Cloudflare D1
- [Drizzle Kit](https://orm.drizzle.team/kit-docs/overview) for migrations

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
# Create .env.local with the variables listed in Authentication
npm run dev
```

In a second terminal, create the local D1 schema and seed it:

```bash
npm run db:local
```

Open [http://localhost:3000](http://localhost:3000). Unauthenticated visitors
are redirected to `/login`.

`npm run dev` runs the app through the Cloudflare Vite plugin so D1 and other
bindings are emulated locally. The old `npm run dev:next` script remains for
UI-only work that does not touch the database.

## Routes

| Route           | Description                               |
| --------------- | ----------------------------------------- |
| `/`             | Redirects to `/dashboard`                 |
| `/dashboard`    | Home dashboard, requires a session        |
| `/login`        | Sign-in page (Google)                     |
| `/api/auth/*`   | Auth.js handlers                          |
| `/api/me`       | Returns the current user, or `401`        |

## Scripts

| Command                  | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| `npm run dev`            | Start the Cloudflare/Vite dev server on port 3000        |
| `npm run build`          | Build the Cloudflare Worker bundle                       |
| `npm run start`          | Preview the built Worker                                 |
| `npm run lint`           | Run ESLint                                               |
| `npm run typecheck`      | Generate route and binding types, then run `tsc`         |
| `npm run db:generate`    | Generate a Drizzle migration from `db/schema.ts`         |
| `npm run db:local`       | Apply migrations and the seed to the running local D1    |
| `npm run db:seed:generate` | Regenerate `db/seed-data/*.sql` from the import and fixtures |
| `npm run db:migrate`     | Apply migrations to the remote D1 (`D1_DATABASE_ID`)     |
| `npm run db:seed`        | Seed the remote D1 (`D1_DATABASE_ID`)                    |
| `npm run deploy:vinext`  | Build and deploy the Cloudflare Worker                   |

## Database

The schema lives in `db/schema.ts` and generated migrations are committed under
`drizzle/`. The connection is created lazily in `db/index.ts` from the `DB` D1
binding declared in `cloudflare.config.ts`.

Tables:

- `members` — directors, musicians and singers. A director is a member with
  `role = 'director'`.
- `songs` — catalog with the original key and duration.
- `song_director_keys` — the key each director uses for a song.
- `setlists` and `setlist_items` — service order with the key chosen for it.
- `song_audio` — metadata for recordings. Files will live in R2 when uploads
  are implemented; the table is already in place.

Rehearsals are intentionally not persisted yet.

### Local database

D1 is emulated by the Cloudflare Vite plugin and persists under
`.cloudflare/state`. With `npm run dev` running, apply the schema and seed:

```bash
npm run db:local
```

The script finds the running dev server, reads the local `DB` binding, applies
any unapplied file in `drizzle/`, records them in `d1_migrations`, and then
loads the generated SQL parts in `db/seed-data/`. It is safe to run again.

### Remote database

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

### Changing the schema

```bash
npm run db:generate
npm run db:local
```

`db/seed-data/` is generated, not edited by hand. It is built from
`songs-import.json`, including the directors it references:

```bash
npm run db:seed:generate
```

Imports use `ON CONFLICT DO NOTHING`, so re-running the seed adds new rows
without overwriting edits made in the app. `db/seed-report.json` records the
import warnings (missing artists, missing keys, lost minor modes and zero
durations) for later cleanup.

## Authentication

Sign-in uses Google OAuth through Auth.js. Sessions are signed JWT cookies; no
Auth.js user records are persisted in D1 yet.

Create `.env.local` with:

```bash
AUTH_SECRET=            # openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
```

Google OAuth redirect URI: `http://localhost:3000/api/auth/callback/google`.

## Deployment

Cloudflare Workers Builds deploys through vinext, using `cloudflare.config.ts`
as the source of truth:

- Build: `npm run build:vinext`
- Production deploy: `npx vinext-cloudflare deploy --skip-build`
- Preview deploy: `npx vinext-cloudflare previews deploy`

Do not add a Wrangler configuration file. The `previews` block it asks for is
only needed by `wrangler preview`, which this project does not use.

Apply migrations before the first deploy that depends on a schema change.

## Structure

```text
app/                 Routes, layout, metadata and global theme
  api/auth/          Auth.js route handlers
  api/me/            Current-user endpoint
  dashboard/         Authenticated dashboard
  login/             Sign-in page
components/          Brand, auth, layout and shared UI components
features/            Home, songs, team and setlist code and queries
db/                  Drizzle schema, connection, seed builder and local setup
drizzle/             Generated migrations and metadata
types/               Local declarations for Cloudflare runtime modules
assets/              Vocalis brand assets
auth.ts              Auth.js configuration
middleware.ts        Route protection for /dashboard and /profile
cloudflare.config.ts Worker name, entrypoint and bindings (including D1)
vite.config.ts       Vite/vinext plugin setup
```

Brand colors and typography live in `app/globals.css`. Import aliases are
defined in `tsconfig.json`: `@/*` for the project root, `@features/*` for
`features/*` and `@ui/*` for `components/ui/*`.
