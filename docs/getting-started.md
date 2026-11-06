# Getting started

Requires Node.js 20.9 or newer.

## Install

```bash
npm install
```

## Environment

Create `.env.local` with the variables listed in
[Authentication](authentication.md). Sign-in uses Google OAuth; there is no
email or password sign-in.

## Run locally

`npm run dev` runs the app through the Cloudflare Vite plugin, so D1 and other
bindings are emulated locally on port 3000.

In a second terminal, create and seed the local D1 database:

```bash
npm run db:local
```

Open [http://localhost:3000](http://localhost:3000). Unauthenticated visitors
are redirected to `/login`.

For UI-only work that does not touch the database, `npm run dev:next` starts
plain Next.js instead.

## Routes

| Route         | Description                        |
| ------------- | ---------------------------------- |
| `/`           | Redirects to `/dashboard`          |
| `/dashboard`  | Home dashboard, requires a session |
| `/login`      | Sign-in page (Google)              |
| `/api/auth/*` | Auth.js handlers                   |
| `/api/me`     | Returns the current user, or `401` |

## App scripts

| Command             | Description                                       |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Start the Cloudflare/Vite dev server on port 3000 |
| `npm run dev:next`  | Start plain Next.js (no D1 bindings)              |
| `npm run build`     | Build the Cloudflare Worker bundle                |
| `npm run start`     | Preview the built Worker                          |
| `npm run lint`      | Run ESLint                                        |
| `npm run typecheck` | Generate route and binding types, then run `tsc`  |

Database scripts are listed in [Database](database.md#scripts). Deploy
commands are listed in [Deployment](deployment.md).
