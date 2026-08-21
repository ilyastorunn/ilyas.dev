# Product

## Purpose and audience

The site is İlyas Torun's English-only personal digital home and, secondarily, professional portfolio. A visitor should quickly understand that İlyas is an indie developer building thoughtful digital products for the web and Apple platforms. Selected projects carry professional weight; books, music, notes, photography, tools, and inspirations express personal taste.

Primary audiences are prospective collaborators/clients and people interested in İlyas's work and references.

## Experience

- **Home `/`**: identity/navigation, restrained multiline introduction, six-item bento grid, bookshelf preview, footer, shared detail modal.
- **Cave `/cave`**: Bookshelf, Photography, Uses, Notes, Music, and Inspirations.
- **Notes `/cave/notes/[slug]/`**: focused, shareable MDX reading pages.
- **Contact**: `mailto:ilyastorun.dev@gmail.com`; no contact form or stored messages.

## Design language

- Quiet and refined; influenced by Apple, Braun, Dieter Rams, and Jony Ive.
- Light-only for the first published version.
- Cool-gray viewport, warm-white site surface, charcoal copy, quiet borders/shadows, amber used sparingly.
- Centered desktop navigation and generous side margins.
- The hero is a controlled paragraph, not a large marketing headline.
- Bento cards are compact. The layout underwent two density passes after the initial implementation.
- Motion is tactile but subtle: 1–2 px hover movement, soft-focus modal, low-distance reveals, no perpetual decorative animation.

## Product language

- Public site copy is English-only.
- Positioning: “Independent developer crafting thoughtful digital products, useful tools and small experiments for the web and Apple platforms.”
- Prefer plain, specific copy over marketing language.

## Scope guardrails

- Projects remain placeholders until the owner supplies final data.
- Cave content is owner-editable and mostly placeholder; do not invent personal facts.
- Bookshelf currently contains four owner-selected books.
- The home music card currently links to “Loser” by Tame Impala.
- GitHub activity represents public activity for `ilyastorunn`; it must not imply access to private contributions.

## Success and quality targets

The specification targets strong performance/SEO, accessible semantic structure, keyboard operation, reduced-motion behavior, stable layouts, graceful GitHub/media failures, and content replacement without component restructuring. Lighthouse 90+ and accessibility 100 are targets, not verified results.

## Sources

- Owner decisions recorded in the conversation through 2026-08-06.
- [Design specification](../superpowers/specs/2026-08-04-personal-portfolio-design.md)
- [Home implementation](../../src/pages/index.astro)
- [Cave implementation](../../src/pages/cave/index.astro)
- [Global design tokens](../../src/styles/global.css)

