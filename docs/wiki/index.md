# Project wiki

This is the durable, source-aware briefing for future agents working on the portfolio. It summarizes the repository without replacing source code, tests, or owner-authored specifications.

## Current status

The Astro portfolio is implemented and builds successfully for Cloudflare Workers. Home, Cave, MDX notes, the shared detail modal, a live public GitHub contribution heatmap, and typed content collections exist. Three portfolio projects and most Cave sections still contain intentional placeholders. Production Memoji/media, deployment acceptance, a temporary Cloudflare subdomain, and final visual/accessibility review remain open.

Status last verified: 2026-08-21 by repository inspection and the full automated validation suite: 8 tests passed, Astro reported no diagnostics, and the Cloudflare production build completed.

## Reading order

1. [Product](product.md) — audience, promise, scope, voice, and design guardrails
2. [Architecture](architecture.md) — routes, boundaries, data flow, and deployment model
3. [Implementation](implementation.md) — what exists now, important paths, and verified gaps
4. [Content](content.md) — schemas, ownership, placeholders, and editing instructions
5. [Decisions](decisions.md) — durable owner and technical decisions
6. [Roadmap](roadmap.md) — now, next, later, and explicitly deferred work
7. [Log](log.md) — reverse-chronological meaningful changes

## Evidence model

Priority is: current owner decision; reproduced runtime/tests; current implementation; maintained specification; old plan/history. Page-level Sources sections point to primary repository evidence. Labels mean:

- **verified**: directly inspected in current code/tests or reproduced
- **documented**: stated by a maintained source but not independently verified
- **inferred**: reasoned from evidence
- **unresolved**: evidence or owner input is insufficient
- **superseded**: historical direction replaced by a newer decision or implementation

## Primary sources

- [README](../../README.md)
- [Approved design specification](../superpowers/specs/2026-08-04-personal-portfolio-design.md)
- [Original implementation plan](../superpowers/plans/2026-08-04-personal-portfolio-implementation.md)
- [`src/`](../../src/)
- [`package.json`](../../package.json)
- [`wrangler.jsonc`](../../wrangler.jsonc)
