# Roadmap

This separates current commitments from ideas. It is not permission to deploy or invent content.

## Now — content completion

- Receive and integrate the production Memoji in header and profile card.
- Replace the three placeholder projects when the owner supplies names, copy, screenshots, and links.
- Let the owner replace Photography, Uses, Cave Music, Inspirations, and notes as desired.
- Review remote Spotify cover resilience and decide whether to keep it remote or version a local asset.
- Re-run visual review from owner-provided desktop/mobile screenshots after content changes.

## Before preview publication

- Confirm the temporary Cloudflare subdomain and canonical URL.
- Run `npm run check`, `npm test`, and `npm run build`.
- Run and verify `wrangler dev` against the production build.
- Exercise GitHub success/fallback and modal flows in the Cloudflare runtime.
- Perform manual keyboard and reduced-motion checks.
- Run Lighthouse; treat the specification's 90+ performance/best-practice/SEO and 100 accessibility values as targets.
- Confirm Web Analytics configuration and whether `PUBLIC_CF_ANALYTICS_TOKEN` is set.
- Deploy only after explicit owner authorization. Keep the existing Vercel site intact until acceptance.

## Later / explicitly deferred

- Dark theme.
- CMS/dashboard.
- Live Spotify authentication or “currently playing” integration.
- Contact form or stored visitor messages.
- Redirecting or removing the old Vercel deployment.

## Important-later engineering

- Expand GitHub tests if its public HTML changes or malformed/timeout cases regress.
- Consider a content-driven home music card if manual edits become error-prone.
- Add local/responsive media pipelines when final project, Memoji, photography, and cover assets arrive.

## Sources

- [Design specification](../superpowers/specs/2026-08-04-personal-portfolio-design.md)
- [Implementation plan](../superpowers/plans/2026-08-04-personal-portfolio-implementation.md)
- [Implementation gaps](implementation.md)
- Owner decisions through 2026-08-06

