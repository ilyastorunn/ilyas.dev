# Project log

Meaningful changes are recorded newest-first. Git remains the source for exact diffs.

## 2026-08-21 — Source-aware project wiki setup

- Added root `AGENTS.md` and the `docs/wiki/` operating knowledge base.
- Inspected README, design specification, implementation plan, configuration, content schemas/data, routes, layouts, components, libraries, tests, and recent Git history through `e744e98`.
- Captured implemented behavior separately from documented targets, intentional placeholders, deployment constraints, and unresolved owner inputs.
- Verification: all relative links across 9 Markdown files resolved; `git diff --check` passed; 8 tests passed; Astro check reported 0 errors, warnings, or hints; Cloudflare production build succeeded.

## 2026-08-06 — Live portfolio content

- Added a real public GitHub contribution heatmap with a cached site-owned endpoint and REST-rate-limit tolerance.
- Replaced home music placeholder with “Loser” by Tame Impala and a Spotify destination.
- Replaced the bookshelf set with four owner-selected books.
- Projects and most Cave content remained placeholders by decision.
- Verification: 8 tests passed, Astro check had no diagnostics, production build succeeded, and a live parser smoke test returned 458 contributions/368 days at that time.
- Git: `e744e98`.

## 2026-08-05 — Second compact layout pass

- Further reduced hero rhythm, bento width/gaps, project mockups, supporting cards, and bookshelf scale.
- Verification: 6 tests passed, Astro check clean, production build succeeded.
- Git: `3f0a370`.

## 2026-08-05 — First compact layout pass

- Reworked desktop bento rows and reduced card, bookshelf, header, hero, and footer scale to shorten the page.
- Verification: 6 tests passed, Astro check clean, production build succeeded.
- Git: `e816e4e`.

## 2026-08-04 — Initial implementation

- Built the Astro/Cloudflare portfolio, typed content collections, Home/Cave/Notes routes, bento cards, modal, bookshelf, GitHub endpoint, metadata, and tests.
- Git: `f930ddb`.

## 2026-08-04 — Specification and plan

- Captured the approved product/design specification and implementation plan.
- Git: `14bf198`, `743bf23`.
