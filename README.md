# İlyas Torun — Personal Portfolio

An English-only personal portfolio and digital home built with Astro, TypeScript, and Cloudflare Workers.

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

## Content

- Projects and Cave collections: `src/content/data/`
- Notes: `src/content/notes/`
- Memoji and final media: replace the CSS placeholders with assets in `public/`

All collections are schema validated in `src/content.config.ts`.

## Cloudflare

The repository includes a Workers configuration in `wrangler.jsonc`. Preview locally after a production build:

```sh
npm run build
npx wrangler dev
```

Set `PUBLIC_CF_ANALYTICS_TOKEN` in the Cloudflare build environment to enable Web Analytics. A future GitHub API token, if needed for higher rate limits, must be stored as a Cloudflare secret and never exposed to the browser.

Deploy only after the temporary subdomain and Cloudflare account are confirmed:

```sh
npm run deploy
```
