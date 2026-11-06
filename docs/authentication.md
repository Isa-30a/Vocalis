# Authentication

Sign-in uses Google OAuth through Auth.js. Google is the only provider: there
is no email magic-link or password sign-in. Sessions are signed JWT cookies;
Auth.js user records are not persisted in D1 yet.

## Environment

Create `.env.local` with:

```bash
AUTH_SECRET=            # openssl rand -base64 32
AUTH_URL=http://localhost:3000
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
```

Google OAuth redirect URI: `http://localhost:3000/api/auth/callback/google`.

In production, these four values are bound as Worker secrets in
`cloudflare.config.ts`.

## Route protection

`proxy.ts` verifies the session for `/dashboard` and `/profile`, and sends
unauthenticated visitors to `/login`. The session callback in `auth.ts` copies
the token subject to `session.user.id`.
