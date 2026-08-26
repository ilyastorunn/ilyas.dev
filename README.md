# İlyas Torun — Portfolio foundation

This repository is a clean Astro, TypeScript, and Cloudflare Workers foundation for a new personal portfolio. The previous portfolio implementation and its content were intentionally removed on 2026-08-26 at the owner's request. The project has not been connected to a GitHub remote.

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

The test command accepts an empty test suite while the new application is being built.

## Surviving infrastructure

- Astro with the Cloudflare adapter
- TypeScript strict configuration
- Vitest configuration
- Wrangler configuration for local preview and a future Worker deployment
- npm dependency manifests and lockfile

Application routes, components, styles, content schemas, data, notes, tests, and media are intentionally absent. Add them under `src/`, `public/`, and the relevant configuration files as the new product takes shape.

Deploy only after the site, Cloudflare account, and hostname are explicitly confirmed.
