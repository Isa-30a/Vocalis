# Vocalis

La memoria musical de tu equipo de alabanza: tonos por director, versiones de casa y setlists para el próximo servicio.

This repository contains the mobile-first dashboard and login flow. Songs,
director keys, setlists and team members live in Cloudflare D1 and are read
through Drizzle ORM; authentication uses Auth.js with Google OAuth.

## Quick start

Requires Node.js 20.9 or newer.

```bash
npm install
# Create .env.local — see docs/authentication.md
npm run dev
```

In a second terminal, with the dev server running:

```bash
npm run db:local
```

Open [http://localhost:3000](http://localhost:3000). Unauthenticated visitors
are redirected to `/login`.

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

## Documentation

| Guide                                          | Covers                                          |
| ---------------------------------------------- | ----------------------------------------------- |
| [Getting started](docs/getting-started.md)     | Environment, local D1, routes, app scripts      |
| [Database](docs/database.md)                   | Schema, tables, migrations, seeding             |
| [Authentication](docs/authentication.md)       | Google OAuth setup and session model            |
| [Deployment](docs/deployment.md)               | Cloudflare Workers Builds and migrations        |
| [Architecture](docs/architecture.md)           | Directory layout, import aliases, theme         |

Feature-level docs live under [docs/features](docs/features).

## Contributing

Create a feature branch and open a pull request. Changes reach `main` only
through a PR.
