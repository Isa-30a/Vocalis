# Architecture

## Directory layout

```text
app/                 Routes, layout, metadata and global theme
  api/auth/          Auth.js route handlers
  api/me/            Current-user endpoint
  dashboard/         Authenticated dashboard
  login/             Sign-in page
components/          Auth, brand, layout and shared UI components
features/            Feature code and queries: canciones, equipo, inicio, setlists
db/                  Drizzle schema, connection, seed builder and local setup
drizzle/             Generated migrations and metadata
hooks/               Shared React hooks
lib/                 Shared helpers
types/               Local declarations for Cloudflare runtime modules
assets/              Vocalis brand assets
auth.ts              Auth.js configuration
proxy.ts             Route protection for /dashboard and /profile
cloudflare.config.ts Worker name, entrypoint and bindings (including D1)
vite.config.ts       Vite/vinext plugin setup
```

## Imports and theme

Brand colors and typography live in `app/globals.css`. Import aliases are
defined in `tsconfig.json`: `@/*` for the project root, `@features/*` for
`features/*` and `@ui/*` for `components/ui/*`.
