# Design System

The visual rules for BetterMarawi.org. The short version for AI agents is in `.agents/skills/branding-consistency/SKILL.md`. This file is the full reference.

**Source of truth:** `src/app/globals.css`. If this file and `globals.css` disagree, `globals.css` wins. Update this file in the same commit.

## Principles

- Clear before clever: citizens find information fast
- Calm and trustworthy, like a public institution
- Accessible: WCAG AA contrast, keyboard friendly, readable on small phones
- Consistent: one pattern per job, reused everywhere
- Tokens only: no hardcoded hex values in components

## Colors

| Role | Hex | Use |
| --- | --- | --- |
| Background | `#F9FEFF` | Page background, light surfaces |
| Primary | `#1B4D3E` | Brand, headings accents, links, primary buttons, dark bands |
| Accent (Mosque Gold) | `#F2C230` | Highlights only (see rules below) |
| Secondary (Lanao Blue) | `#1E5F74` | Information, statistics, lake and weather content |
| Heritage (Okir Maroon) | `#8C2F39` | Heritage tags and markers only, sparingly |
| Chart (Langkit Violet) | `#5B3A7A` | Charts and category colour-coding only |

This is the **Ranao palette**, adopted on 2026-10-22: Highland Pine (MSU's pine highlands), Mosque Gold (the Grand Mosque dome and Maranao *kuning*), Lanao Blue (Lake Lanao), Okir Maroon (the red of *langkit* weaving and *okir*), and Langkit Violet (the *malong landap*). The previous palette is tagged in git as `palette-before-ranao`.

The rest of the palette is derived in `globals.css`:

- Brand scale (50 to 950) built from `#1B4D3E`
- Surface tint for cards and alternate sections
- Border and divider tone
- Foreground text (dark green-black, not pure black) and muted text
- Status colors: success, warning, error, info. These stay distinct from the brand green.

### Color tokens

Defined in `src/app/globals.css`. Use these names in components, never raw hex.

**Brand scale**

| Token | Hex | Use |
| --- | --- | --- |
| `--color-brand-50` | `#EBF5F1` | Soft tint (icon boxes, hover backgrounds) |
| `--color-brand-100` | `#D4EAE2` | Tint |
| `--color-brand-200` | `#ACD5C5` | Tint |
| `--color-brand-300` | `#7FBFA7` | Tint |
| `--color-brand-400` | `#52A98A` | Mid tone |
| `--color-brand-500` | `#358F70` | Mid tone |
| `--color-brand-600` | `#29745B` | Shade |
| `--color-brand-700` | `#225E4A` | Shade |
| `--color-brand-800` | `#1D5341` | Shade |
| `--color-brand-900` | `#1B4D3E` | Primary brand color (exact) |
| `--color-brand-950` | `#0E2921` | Deepest shade |

**Primary actions**

| Token | Hex | Use |
| --- | --- | --- |
| `--color-primary` | `#1B4D3E` | Primary buttons, links, active states |
| `--color-primary-hover` | `#163F33` | Hover |
| `--color-primary-active` | `#0E2921` | Pressed |

**Accent (use sparingly)**

| Token | Hex | Use |
| --- | --- | --- |
| `--color-accent` | `#F2C230` | Accent base (Mosque Gold) |
| `--color-accent-hover` | `#E5B21F` | Hover |
| `--color-accent-active` | `#CF9C12` | Pressed |
| `--color-accent-light` | `#FDF3D2` | Light tint |
| `--color-accent-muted` | `#E0A91B` | Muted |
| `--color-accent-deep` | `#8A6510` | Gold text or icons on white (5.3:1) |

**Secondary scales (50 to 950)**

| Scale | Base | Use |
| --- | --- | --- |
| `lake-*` | `lake-700` `#1E5F74` | Lanao Blue: info, statistics, lake and weather. `status-info` uses it |
| `okir-*` | `okir-700` `#8C2F39` | Okir Maroon: heritage tags and markers, sparingly |
| `langkit-*` | `langkit-600` `#5B3A7A` | Langkit Violet: charts and categories only |

**Surfaces and borders**

| Token | Hex | Use |
| --- | --- | --- |
| `--color-surface` | `#F9FEFF` | Page background |
| `--color-surface-card` | `#F0F7F4` | Cards |
| `--color-surface-elevated` | `#E4EFEA` | Raised areas |
| `--color-surface-highlight` | `#D8E7E0` | Highlighted rows or areas |
| `--color-surface-border` | `#D3E2DC` | Standard border |
| `--color-surface-border-subtle` | `#E8F1ED` | Subtle divider |
| `--color-surface-border-strong` | `#A8C2B7` | Strong border |

**Text**

| Token | Hex | Use |
| --- | --- | --- |
| `--color-foreground` | `#0E1A16` | Main text and headings |
| `--color-foreground-secondary` | `#243831` | Secondary text |
| `--color-foreground-muted` | `#3D544C` | Muted text |
| `--color-foreground-subtle` | `#567067` | Placeholders, least important text |
| `--color-foreground-inverse` | `#F9FEFF` | Text on dark green |

**Status**

| Token | Hex | Use |
| --- | --- | --- |
| `--color-status-success` / `-bg` / `-text` | `#227D52` / `#EAF5EE` / `#145334` | Success |
| `--color-status-warning` / `-bg` / `-text` | `#C07706` / `#FEF6E9` / `#7C4600` | Warning |
| `--color-status-error` / `-bg` / `-text` | `#C53030` / `#FDF2F2` / `#821818` | Error |
| `--color-status-info` / `-bg` / `-text` | `#1E6B8C` / `#EFF8FA` / `#13445A` | Info |

Use the `-text` token for status text and the base token for icons and borders. The base warning color is too light for small text.

**Compatibility aliases**

`--color-emerald-*` maps to the brand scale, and `--color-stone-*` is a green-tinted neutral scale. They exist so classes carried over from the AI Studio version keep working. In new code, use the `brand`, `surface`, and `foreground` tokens above, and do not add new uses of `emerald` or `stone`.

| Token | Hex | Use |
| --- | --- | --- |
| (fill from `globals.css`) | | |

### Contrast (approximate, recheck after any change)

| Pair | Ratio | Result |
| --- | --- | --- |
| `#1B4D3E` text on `#F9FEFF` | about 9:1 | Passes AA and AAA |
| `#F2C230` (gold) on `#1B4D3E` | 5.8:1 | Passes AA |
| Dark text `#0E2921` on `#F2C230` | 9.2:1 | Passes AA and AAA |
| `#F2C230` text on `#F9FEFF` | 1.7:1 | Fails. Never do this |
| `#8A6510` (accent-deep) on white | 5.3:1 | Passes AA |
| `#1E5F74` (lake-700) on `#F9FEFF` | 7.0:1 | Passes AA |
| `#8C2F39` (okir-700) on `#F9FEFF` | 8.0:1 | Passes AA |
| `#8C2F39` on `#1B4D3E` | 1.2:1 | Fails. Never do this |
| `#5B3A7A` (langkit-600) on `#F9FEFF` | 8.9:1 | Passes AA |

### Accent (gold) rules

- Use it as a filled shape with dark green text, or on dark green surfaces
- Never as text or thin lines on light backgrounds
- At most 1 to 2 uses per screen
- If an element has no natural place for yellow, do not force it
- Current uses: hero button hover, popular service tile hover, hotline icons, active indicators

## Typography

| Font | Role | Examples |
| --- | --- | --- |
| Fraunces | Display | Site name, page titles, big headline numbers |
| Plus Jakarta Sans | UI and body | Body text, buttons, card headings, nav |
| JetBrains Mono | Tabular figures | Hotlines, exchange rates, clock, fee and budget tables |

Rules:

- Load fonts only through `next/font` (include the `latin-ext` subset so the peso sign renders correctly)
- Use `font-variant-numeric: tabular-nums` for money and statistics
- The peso sign must match the digit height and baseline
- Do not add a fourth font

## Layout

- Container: same max width and side padding as the header, in every section
- Hero band: dark green, faint dot pattern, text on the left, compact "Search Services" card on the right, fits above the fold
- Alternate light and dark sections to create rhythm. Do not make everything green.
- Page structure: header, page title, short summary, content, related links
- Breakpoints to test: 360, 390, 768, 1280, 1920 px

## Components

| Component | Location | Notes |
| --- | --- | --- |
| Header, NavDropdown, MobileDrawer | `components/layout/` | Dropdowns open on hover and click, one open at a time. The drawer starts with "Home" and has no duplicate logo or language selector. |
| QuickContacts | `components/layout/` | One line. Marquee only when the chips overflow. |
| Language dropdown | `components/layout/` | EN, FIL, MRW. Persists the choice. |
| FX ticker | `components/layout/` | One currency at a time, rotates about every 3 seconds, pauses on hover. |
| Footer | `components/layout/` | Quick links, official resources, cost-to-citizens note |
| Hero and HeroSearchCard | `components/home/` | Popular services come from `src/data/services.ts` |
| ArrowUpRight | `components/ui/` | The only link and CTA arrow |
| Accordion, Card, Button, Badge, PageHeader, Section | `components/ui/` | Reuse before creating new ones |

## Buttons

- Primary: solid brand color, light text, visible focus ring
- Secondary: outlined, same height and radius as primary
- On dark green: light fill with dark green text, yellow on hover
- Link and CTA arrows: `ArrowUpRight` (SVG, inherits text color)

## Icons and arrows

- Library: `lucide-react`, consistent stroke width, sized with the text
- Never use the text character `↗`. Phones can turn it into a colored emoji.
- Dropdown and accordion indicators stay as chevrons
- Breadcrumb separators stay as they are

## Cards and tiles

- Radius: rounded-2xl or rounded-3xl
- Soft shadow, token border
- Equal heights inside a grid
- Hover and focus: border turns brand color, slight lift, respect reduced motion

## Forms

- Inputs about 52px tall, rounded-xl, token border, visible label or clear placeholder
- Focus: 2px brand ring
- Error text uses the error token and explains how to fix the problem
- Never rely on color alone to show an error

## Motion

- Short and subtle (about 150 to 300ms)
- Wrap movement in `motion-safe:`. Respect `prefers-reduced-motion`.
- Auto-moving content (marquee, ticker) must pause on hover and focus

## Accessibility checklist

- [ ] Text contrast at least 4.5:1, large text and UI at least 3:1
- [ ] Visible focus ring on every interactive element, on light and dark sections
- [ ] Everything works with keyboard only
- [ ] Images have alt text, decorative icons use `aria-hidden`
- [ ] Touch targets at least 44px where possible
- [ ] No horizontal page scroll at 360px
- [ ] Moving content can be paused

## Changing the design system

1. Change the token in `globals.css` first
2. Update this file and the branding-consistency skill
3. Check the pages listed in the accessibility checklist
4. Commit with `Style:` or `Update:`