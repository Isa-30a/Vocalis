# Deployment

Cloudflare Workers Builds deploys through vinext, using `cloudflare.config.ts`
as the source of truth:

- Build: `npm run build:vinext`
- Production deploy: `npx vinext-cloudflare deploy --skip-build`
- Preview deploy: `npx vinext-cloudflare previews deploy`

Do not add a Wrangler configuration file. The `previews` block it asks for is
only needed by `wrangler preview`, which this project does not use.

Set `D1_DATABASE_ID` in the Workers Builds environment so the deploy binds the
production database (see [Database](database.md#remote-database)). Apply
migrations before the first deploy that depends on a schema change.

The Auth.js values described in [Authentication](authentication.md) are also
required as Worker secrets.
