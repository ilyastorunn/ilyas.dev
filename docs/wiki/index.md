# Project wiki

This is the durable, source-aware briefing for the repository. It describes the clean foundation that remains after the previous portfolio implementation was removed at the owner's request.

## Current status

The repository contains project/tooling infrastructure only: Astro, TypeScript, Vitest, Wrangler, npm manifests, and operating documentation. The previous routes, components, styles, content, integrations, tests, media, design specification, and implementation plan were removed on 2026-08-26. No new product implementation exists yet.

The clean scaffold was verified on 2026-08-26: Astro check reported 0 errors, warnings, or hints; the empty test suite exited successfully; and the Cloudflare build completed. The build reports only expected missing-pages/sitemap warnings for this intentionally empty state.

The local Git history is preserved. `git remote -v` was inspected on 2026-08-26 and returned no remote, so this checkout is not currently connected to a GitHub repository.

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
