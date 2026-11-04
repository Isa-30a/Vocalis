# Vocalis

La memoria musical de tu equipo de alabanza: tonos por director, versiones de casa y setlists para el próximo servicio.

This repository currently contains the mobile-first dashboard and login flow. Dashboard content still comes from mock data in `features/*/data`; authentication and user persistence run on Auth.js with a local SQLite database.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, `proxy.ts` for route protection)
- React 19 + TypeScript
- Tailwind CSS 4
- [daisyUI 5](https://daisyui.com) with a custom `vocalis` theme
- [Lucide](https://lucide.dev) icons
- Geist and Quicksand via `next/font`
- [Auth.js 5](https://authjs.dev) (Google OAuth + email magic links)
- [Drizzle ORM](https://orm.drizzle.team) on SQLite via `better-sqlite3`
- [Nodemailer](https://nodemailer.com) for magic-link email

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
# Create .env.local with the variables listed in Authentication
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). It redirects to `/dashboard`,
which sends unauthenticated visitors to `/login`.

## Routes

| Route                   | Description                                  |
| ----------------------- | -------------------------------------------- |
| `/`                     | Redirects to `/dashboard`                    |
| `/dashboard`            | Home dashboard, requires a session           |
| `/login`                | Sign-in page (Google or email magic link)    |
| `/login/verify-request` | "Check your email" confirmation              |
| `/api/auth/*`           | Auth.js handlers                             |
| `/api/me`               | Returns the current user, or `401`           |

## Scripts

| Command               | Description                                     |
| --------------------- | ----------------------------------------------- |
| `npm run dev`         | Start the dev server                            |
| `npm run build`       | Create a production build                       |
| `npm start`           | Serve the production build                      |
| `npm run lint`        | Run ESLint                                      |
| `npm run build:vinext` | Build the Cloudflare Worker bundle             |
| `npm run deploy:vinext` | Build and deploy the Cloudflare Worker        |
| `npm run db:generate` | Generate Drizzle migrations from `db/schema.ts` |
| `npm run db:migrate`  | Apply pending migrations to the SQLite database |
| `npm run db:studio`   | Open Drizzle Studio                             |

`npm run dev` and `npm start` apply pending migrations automatically through
`predev`/`prestart`.

## Deployment

Cloudflare Workers Builds deploys through vinext, using `cloudflare.config.ts`
as the source of truth:

- Build: `npm run build:vinext`
- Production deploy: `npx vinext-cloudflare deploy --skip-build`
- Preview deploy: `npx vinext-cloudflare previews deploy`

Do not add a Wrangler configuration file. The `previews` block it asks for is
only needed by `wrangler preview`, which this project does not use.

## Authentication

Sign-in supports Google OAuth and email magic links (Auth.js + Drizzle on SQLite).

Create `.env.local` with:

```bash
AUTH_SECRET=            # openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# SQLite file used by Auth.js (defaults to ./data/vocalis.db)
DATABASE_PATH=./data/vocalis.db

# SMTP server for magic links. When omitted, the link is printed to the
# server console instead of being sent, so the flow still works locally.
EMAIL_SERVER=smtp://user:password@smtp.example.com:587
EMAIL_FROM="Vocalis <no-reply@example.com>"
```

Google OAuth redirect URI: `http://localhost:3000/api/auth/callback/google`.

The Google button is hidden behind a toast in production until the OAuth
consent screen domain is verified. Set `NEXT_PUBLIC_GOOGLE_AUTH_ENABLED=true`
to re-enable it.

Sessions are stored in a signed JWT cookie, while users, linked accounts and
verification tokens are persisted in SQLite.

## Database

The schema lives in `db/schema.ts`; the connection is created in `db/index.ts`
and enables WAL mode and foreign keys. Generated migrations are committed under
`drizzle/`.

After changing the schema:

```bash
npm run db:generate
npm run db:migrate
```

Local database files (`data/*.db`, `data/*.db-*`) are gitignored.

## Structure

```text
app/                 Routes, layout, metadata and global theme
  api/auth/          Auth.js route handlers
  api/me/            Current-user endpoint
  dashboard/         Authenticated home dashboard
  login/             Sign-in and verify-request pages
components/          Brand, auth, layout and shared UI components
features/            Home, songs, team and setlist code (with mock data)
db/                  Drizzle schema and SQLite connection
drizzle/             Generated migrations and metadata
lib/                 Email delivery for magic links
assets/              Vocalis brand assets
auth.ts              Auth.js configuration
proxy.ts             Route protection for /dashboard and /profile
```

Brand colors and typography live in `app/globals.css`. Import aliases are
defined in `tsconfig.json`: `@/*` for the project root, `@features/*` for
`features/*` and `@ui/*` for `components/ui/*`. Dashboard data is mocked in
`features/*/data`.
