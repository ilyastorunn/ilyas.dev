# Personal Portfolio Implementation Plan

**Design:** `docs/superpowers/specs/2026-08-04-personal-portfolio-design.md`

## Phase 1 — Foundation

1. Scaffold an Astro TypeScript project configured for Cloudflare Workers.
2. Add MDX, sitemap, testing, and lint/type-check tooling.
3. Define global design tokens, typography, reset styles, and the responsive site shell.
4. Add shared metadata, SEO defaults, structured data, and custom 404 handling.

## Phase 2 — Typed content

1. Define schemas for projects, books, photography, uses, music, inspirations, and notes.
2. Add polished placeholder data for three projects and all initial Cave collections.
3. Add placeholder media assets with stable aspect ratios and accessible descriptions.
4. Verify content schema failures stop the build with useful messages.

## Phase 3 — Home experience

1. Build the centered header, responsive mobile navigation, and email action.
2. Build the quiet multiline hero and availability treatment.
3. Build the responsive six-item bento grid and card variants.
4. Build the shared accessible soft-focus detail modal.
5. Build the physical bookshelf preview and detail interaction.
6. Add restrained reveal and tactile hover motion with reduced-motion fallbacks.

## Phase 4 — Cave and Notes

1. Build `/cave` with Bookshelf, Photography, Uses, Notes, Music, and Inspirations.
2. Build the Notes index and `/cave/notes/[slug]` MDX routes.
3. Reuse the shared modal and collection components where appropriate.
4. Verify keyboard, touch, and narrow-screen behavior.

## Phase 5 — GitHub and analytics

1. Implement a site-owned GitHub activity endpoint for `ilyastorunn`.
2. Normalize public GitHub data and add Cloudflare cache headers.
3. Implement timeout, rate-limit, malformed-response, and static fallback behavior.
4. Add Cloudflare Web Analytics configuration without adding a custom tracker.

## Phase 6 — Verification and Cloudflare readiness

1. Add unit/component tests for content validation, modal behavior, and GitHub normalization/fallback.
2. Run Astro checks, tests, production build, and Cloudflare local-runtime verification.
3. Inspect desktop and mobile screenshots against the approved direction.
4. Fix accessibility, responsive, and visual discrepancies.
5. Prepare Wrangler preview deployment; do not bind a domain or replace Vercel without explicit deployment authorization.
