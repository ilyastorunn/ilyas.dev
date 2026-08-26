# Project log

Meaningful changes are recorded newest-first. Git remains the source for exact diffs.

## 2026-08-26 — Clean application reset

- Removed the previous portfolio routes, components, layouts, styles, content schemas/data, notes, API/GitHub logic, tests, media, old specs/plans, and generated build/tool state.
- Preserved Astro, TypeScript, Vitest, Wrangler, npm manifests, Git history, `AGENTS.md`, and the wiki.
- Updated `README.md`, `package.json`, and `astro.config.mjs` for an empty starting scaffold.
- Recorded that `git remote -v` has no configured GitHub remote.
- Verification: `npm run check` passed with 0 diagnostics; `npm test` passed with no test files; `npm run build` completed successfully with expected missing-pages/sitemap warnings.
- Follow-up: define and implement the new product from the surviving foundation.

## Earlier history

The detailed implementation history remains in Git commits. Earlier wiki entries were replaced because they described files intentionally removed during the reset.
