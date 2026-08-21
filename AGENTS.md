# Agent operating guide

This repository is İlyas Torun's English-only personal portfolio and digital home.

## Before meaningful work

Read, in order:

1. [`docs/wiki/index.md`](docs/wiki/index.md)
2. The wiki page that owns the area you will change
3. Relevant source files and tests
4. The original design specification only when historical intent is needed

Treat current user decisions, reproduced behavior, tests, and implementation as stronger evidence than old plans. Never silently resolve a conflict; record material uncertainty in the wiki.

## Product guardrails

- Preserve the quiet, refined Apple/Braun/Dieter Rams/Jony Ive direction.
- Keep the site English-only unless the owner explicitly changes that decision.
- Projects remain the primary professional content; Cave is the personal archive.
- Home navigation stays centered on desktop. Version one is light-only.
- Motion must be restrained and honor `prefers-reduced-motion`.
- Do not replace project or Cave placeholders without explicit content from the owner.
- Do not deploy, bind a domain, redirect the old Vercel site, or add external services without explicit authorization.

## Implementation rules

- Use Astro and TypeScript; do not introduce Next.js or a heavyweight UI library.
- Keep editable content in `src/content/data/` and notes in `src/content/notes/` when the current schema supports it.
- Keep secrets server-side. Never expose a GitHub or Cloudflare token to browser code.
- Inspect `src/content.config.ts` before changing collection data.
- Preserve accessible keyboard behavior, focus handling, semantic structure, and no-JavaScript fallbacks.
- Do not use browser automation unless it is necessary or the owner requests it; screenshots from the owner are acceptable for visual review.

## Verification

Use Node.js 24 or newer. For meaningful code or content-model changes, run:

```sh
npm run check
npm test
npm run build
```

Run focused checks first when useful. Do not claim runtime, Cloudflare preview, Lighthouse, keyboard, screen-reader, or visual verification unless actually performed.

## Durable context

After meaningful work, update only the affected pages under `docs/wiki/` and prepend one entry to `docs/wiki/log.md`. Include changed areas, durable decisions, verification, and follow-ups. Mechanical edits do not need a log entry.

