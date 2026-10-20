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
| Accent | `#FFE135` | Highlights only (see rules below) |

The rest of the palette is derived in `globals.css`:

- Brand scale (50 to 950) built from `#1B4D3E`
- Surface tint for cards and alternate sections
- Border and divider tone
- Foreground text (dark green-black, not pure black) and muted text
- Status colors: success, warning, error, info. These stay distinct from the brand green.

Add the exact token names here once confirmed:

| Token | Hex | Use |
| --- | --- | --- |
| (fill from `globals.css`) | | |

### Contrast (approximate, recheck after any change)

| Pair | Ratio | Result |
| --- | --- | --- |
| `#1B4D3E` text on `#F9FEFF` | about 9:1 | Passes AA and AAA |
| `#FFE135` on `#1B4D3E` | about 7:1 | Passes AA |
| `#FFE135` text on `#F9FEFF` | about 1.1:1 | Fails. Never do this |

### Accent (yellow) rules

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