# Project wiki

This is the durable, source-aware briefing for the repository as the portfolio is rebuilt screen by screen with the owner.

## Current status

The rebuilt `/` route uses a full-width comic-led hero and a pinned native-scroll transition through the asymmetric About scrapbook and movable Cave cork board. Cave contains the owner's books, watched films, photograph stamps, three-item Tech stack, and an Inspiration placeholder.

The complete current site was deployed to Cloudflare Workers on 2026-08-30 and is live at `ilyastorun.site` and `www.ilyastorun.site`.

The local Git history is preserved. The checkout is connected to `https://github.com/ilyastorunn/ilyas.dev.git` as the `origin` fetch and push remote, verified on 2026-08-27.

## Reading order

1. [Product](product.md) — retained product context and current scope
2. [Architecture](architecture.md) — surviving runtime and tooling foundation
3. [Implementation](implementation.md) — what is currently present and absent
4. [Content](content.md) — clean content starting point
5. [Decisions](decisions.md) — durable owner decisions, newest first
6. [Roadmap](roadmap.md) — next steps for rebuilding
7. [Log](log.md) — reverse-chronological meaningful changes

## Evidence model

Priority is: current owner decision; reproduced tests/builds; current implementation; maintained documentation; historical material. Use `verified`, `documented`, `inferred`, `unresolved`, and `superseded` precisely.

## Primary sources

- [README](../../README.md)
- [AGENTS.md](../../AGENTS.md)
- [`package.json`](../../package.json)
- [`astro.config.mjs`](../../astro.config.mjs)
- [`wrangler.jsonc`](../../wrangler.jsonc)
- [`tsconfig.json`](../../tsconfig.json)
