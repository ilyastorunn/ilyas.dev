# Architecture

## Runtime and build

- Astro 7 with strict TypeScript.
- Server output uses the Cloudflare adapter.
- MDX and sitemap integrations remain installed in the Astro configuration for future use.
- Wrangler configuration targets a future Cloudflare Worker and serves `dist` after a build.
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
docs/wiki/             durable project context
```

There are currently no application routes, layouts, components, content collections, API endpoints, styles, tests, or public media. The `src/` and `public/` directories are intentionally minimal.

## External services

No application-level external service is currently wired into browser or server code. Cloudflare remains configuration-only; no deployment was performed as part of the reset.

## Sources

- [`package.json`](../../package.json)
- [`astro.config.mjs`](../../astro.config.mjs)
- [`wrangler.jsonc`](../../wrangler.jsonc)
- [`tsconfig.json`](../../tsconfig.json)
- [`vitest.config.ts`](../../vitest.config.ts)
