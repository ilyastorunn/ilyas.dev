# Architecture

## Runtime and build

- Astro 7 with strict TypeScript.
- Server output uses the Cloudflare adapter.
- MDX and sitemap integrations remain installed in the Astro configuration for future use.
- Wrangler configuration deploys the `ilyas-dev-portfolio` Worker, serves `dist`, and binds the apex and `www` custom domains.
- Node.js 24 or newer is required.

## Current repository shape

```text
AGENTS.md              repository operating instructions
astro.config.mjs       Astro and Cloudflare build configuration
package.json           scripts and dependencies
package-lock.json      dependency lockfile
tsconfig.json          strict TypeScript configuration
vitest.config.ts       test runner configuration
wrangler.jsonc         Cloudflare Worker configuration
src/env.d.ts           Astro and client type references
src/pages/             current home route
src/assets/            locally processed source media
docs/wiki/             durable project context
```

The home implementation is currently self-contained in `src/pages/index.astro`. It imports the horizontal Spider-Verse PNG from `src/assets/` through Astro's image pipeline and uses page-scoped CSS for the first responsive layout. No content collection, API endpoint, or shared component system is active yet.

## External services

No application-level external service is wired into browser or server code. Cloudflare hosts the production Worker, its assets, an Astro-provisioned session KV namespace, and the DNS zone for `ilyastorun.site`.

## Sources

- [`package.json`](../../package.json)
- [`astro.config.mjs`](../../astro.config.mjs)
- [`wrangler.jsonc`](../../wrangler.jsonc)
- [`tsconfig.json`](../../tsconfig.json)
- [`vitest.config.ts`](../../vitest.config.ts)
