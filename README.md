# İlyas Torun — Portfolio foundation

This repository is İlyas Torun’s English-language personal portfolio, built with Astro, TypeScript, and Cloudflare Workers. Its first rebuilt screen is a restrained split hero: professional introduction on the left and a Spider-Verse visual with two editorial captions on the right. The project has not been connected to a GitHub remote.

## Local development

Use Node.js 24 or newer.

```sh
npm install
npm run dev
```

## Validation

```sh
npm run check
npm test
npm run build
```

There is currently no application test suite; add tests with the first new feature.

## Current structure

- Astro with the Cloudflare adapter
- TypeScript strict configuration
- Vitest configuration
- A responsive split hero at `/`
- A local, Astro-optimized hero image in `src/assets/`
- Wrangler configuration for `ilyastorun.site` and `www.ilyastorun.site`
- npm dependency manifests and lockfile

The rebuilt hero is local and has not been deployed. Production still serves the previous release until an explicit deployment is requested.

Deploy only after explicit owner authorization.
