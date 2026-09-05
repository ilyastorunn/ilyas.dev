# Content guide

Photo captions were replaced verbatim in row-major order with the owner’s final nine strings on 2026-09-05, including lowercase styling and “skyscrapper, really”.

Cave content is now maintained in `src/content/data/cave.ts` (2026-09-05). The owner confirmed the existing book front/back/spine photos are correct; exact dimensions remain estimated. Photo notes and film ratings are retained. The Inspiration portrait and exact quote were supplied by the owner; Tools and the placeholder were removed.

Historical reset context: The previous JSON collections, MDX notes, project copy, Cave content, music references, and placeholder media were removed on 2026-08-26.

When rebuilding:

- Keep editable content under `src/content/` when the new schema supports it.
- Inspect and update `src/content.config.ts` only after deciding that Astro content collections are needed.
- Do not invent personal details or replace supplied content with placeholders without an explicit decision.
- Keep public copy English-only unless the owner changes that decision.

No current content schema, collection IDs, route slugs, project names, external profile links, or media assets should be treated as active.

## Sources

- [`README.md`](../../README.md)
- [`AGENTS.md`](../../AGENTS.md)
- Current source inventory inspected on 2026-08-26