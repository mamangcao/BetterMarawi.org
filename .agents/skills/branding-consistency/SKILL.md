---
name: branding-consistency
description: Use when building or editing any BetterMarawi.org portal UI (pages, components, colors, fonts, logos, hero bands, icons, or user-facing copy) to keep visuals and naming consistent with the Islamic City of Marawi brand. Do not use for data-only or backend changes.
---

# Branding Consistency

Keep every screen recognizably BetterMarawi.org. Never copy names, colors, or numbers from BetterIndang.org or other reference sites.

## Naming

- Site name: **BetterMarawi.org** (capital B, capital M, lowercase ".org"). Never "Better Marawi", "BetterMarawi", or "Bettermarawi.org" in visible text.
- Place: **Islamic City of Marawi**, Lanao del Sur, BARMM. Use "city government" in plain copy.
- Community model: "community-run", under the BetterGov.ph movement. Never imply it is the official city website unless the owner says so.
- Never write "Indang", "Cavite", or "Municipality" anywhere in this project. Search for these whenever something is copied from a reference.
- Languages: English (EN), Filipino (FIL), Meranaw (MRW). Write copy per `docs/CONTENT_GUIDE.md`.

## Logo

- Source file: `public/branding/logo.png`. Do not edit, recolor, stretch, or redraw it.
- Render with `next/image` with explicit width and height, linked to `/`, alt text "BetterMarawi.org logo".
- Same logo in header and footer, with clear space around it.

## Colors (tokens only)

- Use tokens from `src/app/globals.css`. No hardcoded hex in components.
- Ranao palette (adopted 2026-10-22): background `#F9FEFF`, primary Highland Pine `#1B4D3E`, accent Mosque Gold `#F2C230`.
- Secondary colours, used on purpose and sparingly:
  - Lanao Blue (`lake-*`, base `lake-700` `#1E5F74`): information, statistics, lake and weather content. Also the `status-info` colour.
  - Okir Maroon (`okir-*`, base `okir-700` `#8C2F39`): heritage tags and markers only. Never on the brand green (1.2:1).
  - Langkit Violet (`langkit-*`, base `langkit-600` `#5B3A7A`): charts and category colour-coding only.
- Dark green bands use light text. Light surfaces use dark green or dark foreground text.
- Gold is an accent: a filled shape with dark text, or on dark green. Never gold text or thin lines on light backgrounds; use `accent-deep` (`#8A6510`, 5.3:1) when gold text or an icon must sit on white. At most 1 to 2 uses per screen. Do not force it.
- Status colors (success, warning, error, info) stay distinct from the brand green.
- All text and UI must meet WCAG AA contrast.

## Typography

- Fraunces: display only (site name, page titles, big headline numbers).
- Plus Jakarta Sans: UI and body text, including card headings and buttons.
- JetBrains Mono: tabular figures (hotlines, rates, clock, fee and budget tables).
- Load fonts through `next/font` only. The peso sign must match the digit height and baseline.

## Layout patterns

- Hero band: dark green, faint dot pattern, text left, compact "Search Services" card right that fits above the fold.
- Same max width and side padding as the header in every section.
- Cards: rounded-2xl or 3xl, soft shadow, token borders, equal heights in grids.
- Buttons: primary is solid with a visible focus ring, secondary is outlined, same height and radius everywhere.
- Follow existing page structure. Do not invent a new pattern when one exists.

## Icons and arrows

- Icons: `lucide-react`, consistent stroke width, sized with the text.
- Link and CTA arrows use the shared `ArrowUpRight` component. Never the text character "↗" (it becomes an emoji on mobile).
- Dropdown chevrons and breadcrumb separators stay as they are.

## Before finishing

1. Search changed files for hardcoded hex values, "Indang", "Cavite", and stray text arrows.
2. Check 360, 390, 768, 1280, and 1920 px widths.
3. If a request conflicts with these rules, say so and ask before changing the brand.