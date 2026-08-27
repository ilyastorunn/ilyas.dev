# Product

## Current status

The active direction keeps the restrained white editorial canvas and centered desktop navigation while letting the horizontal Spider-Verse image occupy the full hero width. Sections behave like a vertical card carousel driven by native scrolling: each card remains sticky, recedes slightly, and is covered by the next. Two comic captions carry the hero's visible copy.

## Retained context

The repository still describes an English-only personal portfolio and digital home in [`AGENTS.md`](../../AGENTS.md). Its quiet, refined Apple/Braun-inspired direction and content ownership rules remain context, not an implemented design contract. The owner may revise them while rebuilding.

## Current scope

- `/` contains the responsive header and full-width visual hero.
- The semantic page introduction remains available to assistive technology while the visible hero is image-led.
- The hero header omits the owner's name because it already appears in the visual caption. It exposes working Work/About card navigation, a deliberately disabled Cave label until that card exists, and a human-readable “Contact me” mail action.
- A handwritten comic-style “swipe down, please :)” cue and arrow teach the card-scroll interaction on first view.
- The hero canvas is height-aware as well as width-responsive: short desktop/laptop viewports constrain the Spider-Verse frame so it retains visible breathing room above and below instead of meeting the card edge.
- About uses an asymmetric comic-scrapbook bento with a comic issue-style title, dominant story panel, live GitHub activity, spinning-record music slot, folder-inspired three-app reveal, and stacked-browser website deck.
- GitHub activity targets the owner's verified public profile, `ilyastorunn`. The Rare UI/shadcn source was used as interaction reference but not installed because its React, Tailwind, and Motion dependencies conflict with the lightweight Astro-native foundation; the implementation uses native markup, CSS, and a public contributions endpoint instead.
- The About story now uses owner-supplied biography material condensed into a short introduction and a 2018-to-present summary. The longer interests paragraph remains available for later Cave/About refinement.
- The music card is set to Madvillain, Madlib & MF DOOM's “All Caps.” The owner-supplied Doctor Doom panel fills the background without a dark overlay and is top-aligned so its original “THIS LAND IS MINE!” title remains visible; a CSS-built black vinyl enters from the card's lower-right while retaining enough of the disc to read immediately as a record, and uses the Madvillainy cover only as its center label. The compact track name sits just above the visible vinyl in a red, cyan, white, and black comic caption sampled from the panel; auxiliary “On repeat”/“villain mode” labels are intentionally omitted.
- The card requests Apple's official preview at 50% volume when About becomes active. Because browsers may block audible autoplay, it retries on the first non-player interaction within the active About state; the play button always remains the explicit pause/resume control. The record spins only during playback.
- The app reveal uses verified App Store content for Unscroll and Memento, including official 512 px icons and owner-supplied links. Hover/focus fans compact product cards beyond the source panel; the third app remains an explicit in-review placeholder until its name, icon, and destination are supplied.
- Website previews remain provisional. Their approved direction is a stronger stacked browser-sheet reveal rather than icon-sized previews; final screenshots, names, and URLs are still required.
- Work, About, and Cave are visible labels but intentionally remain inert until those sections exist.
- Public GitHub contribution activity, All Caps preview playback, App Store links, and the contact mail action are active. Cave, notes, final website carousel controls, and analytics are not yet active.
- Production uses Cloudflare Workers at `ilyastorun.site` and `www.ilyastorun.site`.

## Sources and status

- **verified:** current source, responsive browser renders, and build configuration inspected through 2026-08-27
- **documented:** retained product guardrails in [`AGENTS.md`](../../AGENTS.md)
- **superseded:** the folder-first landing prototype and its interaction model
- **superseded:** the removed portfolio specification and implementation plan; their files are no longer present, while their Git history remains locally available
