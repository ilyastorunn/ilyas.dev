# Decisions

Durable decisions are reverse chronological. “Owner” means an explicit decision by İlyas.

## 2026-08-26 — Clean application reset

**Status:** verified

The owner chose to keep the technical foundation and remove the previous portfolio implementation and content so the site can be rebuilt from scratch. Preserved infrastructure includes Astro, TypeScript, Vitest, Wrangler, npm manifests, Git history, and repository operating instructions. Removed material includes application source, routes, content, tests, media, old design/spec documents, and generated build/tool state.

Evidence: current owner instruction; repository inventory after cleanup; [`README.md`](../../README.md).

## 2026-08-26 — Git remote status

**Status:** verified

The local Git repository has no configured remote. The local commit history was preserved, but the project is not currently connected to a GitHub repository.

Evidence: `git remote -v` returned no entries; `.git/config` contains no remote section.

## Earlier portfolio decisions

**Status:** superseded for implementation

The earlier portfolio decisions remain recoverable through Git history but no longer describe active source files. Do not use them as implementation requirements without a new owner decision.
