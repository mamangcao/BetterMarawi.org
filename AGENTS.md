# AGENTS.md

Instructions for AI coding agents (Antigravity, Claude Code, Codex, Cursor) working on BetterMarawi.org.
Keep this file short. Details live in `docs/`. Read a doc only when the task needs it.

## Project

BetterMarawi.org is a community-run civic transparency and citizen services portal for the Islamic City of Marawi, Lanao del Sur, BARMM (under BetterGov.ph).

- Stack: Next.js (App Router), TypeScript (strict), Tailwind CSS v4, lucide-react
- Fonts: Fraunces (display), Plus Jakarta Sans (body), JetBrains Mono (numbers)
- Languages: English (EN), Filipino (FIL), Meranaw (MRW). English is the source.
- Not deployed yet. Hosting target: Vercel.

## Commands

```
npm run dev         # http://localhost:3000
npm run typecheck
npm run lint
npm run build
npm run check:data        # civic data rules (101 barangays, sources, hotlines)
npm run check:security    # JSON-LD and CSV encoding, CSP header
npm run check:regressions # titles, hydration, accessibility wiring
npm run check:translations  # same keys in EN/FIL/MRW, Meranaw placeholders marked
npm run check:seo         # after build: SEO of the built HTML
npm run check:browser     # after build: headless Chrome checks (needs Chrome installed)
```

Before finishing any task, `typecheck`, `lint`, and `build` must pass. Run the `check:*` scripts that cover what you changed; `check:seo` and `check:browser` need a production build. Never run `npm run build` in a folder where `npm run dev` is running (they share `.next`); use a separate checkout and pass its path, for example `npm run check:browser -- ../copy`.

## Structure

```
src/app/          routes (thin pages: metadata + JSON-LD + compose components)
src/components/   layout, seo, home, services, government, transparency, statistics, contact, ui
src/data/         content data
src/i18n/         LanguageProvider and translations
src/lib/          seo, jsonld, routes registry, csv, utils
src/types/        shared types
src/config/       site constants
docs/             guides (read on demand)
```

- Default to Server Components. Add `"use client"` only when needed.
- Use `@/` path aliases. Keep component files under about 250 lines.
- One route registry: `src/lib/routes.ts` feeds the navbar, sitemap.xml, and /sitemap page.

## Manual edits protection (IMPORTANT)

The owner edits files by hand between tasks. Those edits are intentional and must never be undone.

1. Before changing anything, run `git status`, `git diff`, and `git log --oneline -10`.
2. Never revert, overwrite, reformat, or "clean up" the owner's edits. Do not run `git checkout -- <file>`, `git restore`, `git reset --hard`, `git stash`, or `git clean`.
3. Never re-create a file that already exists. Edit it in place with minimal changes.
4. If a task conflicts with a manual edit, stop and ask.
5. Do not undo manual edits when fixing lint, type, or build errors. Report and propose a fix.
6. List any manually edited files you found in your summary.

## Git workflow

- Work on `dev`. Never commit to `main`. Never force-push.
- Commit only the files the task changed: `git add <specific files>`. Never `git add .` or `git commit -a`.
- If push authentication fails, stop and tell the owner what to do. Never ask for a token in chat.

### Commit message format

Type: Brief description

Types:
- `Add`: new feature or content
- `Fix`: bug fix
- `Update`: changes to existing feature
- `Remove`: removed feature or content
- `Docs`: documentation changes
- `Style`: CSS or formatting changes (no logic change)
- `Refactor`: code restructuring

Rules:
- Capitalize the type, then a colon and a space: `Fix: dropdown closes before click`
- Start the description with a capital letter, in the imperative mood ("Add", not "Added"), no period at the end
- Keep the whole line under about 70 characters
- One logical change per commit

## Data and content

- Never invent or alter official data: names, budgets, figures, phone numbers, hours, fees.
- Writing and copy follow `docs/CONTENT_GUIDE.md`.
- Unverified data must be labeled or left out.
- Keep existing service names and slugs unless the task says otherwise.

## Design and branding

For any UI, color, font, logo, hero, icon, or copy change, follow `.agents/skills/branding-consistency/SKILL.md`.
Short version: tokens only (no hardcoded hex), Ranao palette (Pine `brand-*`, Mosque Gold `accent`, Lanao Blue `lake-*`, Okir `okir-*`, Langkit `langkit-*`, Mist neutrals `mist-*`), gold is accent only, shared colour choices in `src/lib/palette.ts`, shared `ArrowUpRight` for link arrows, never copy Indang names or colors.

## SEO for public pages (mandatory)

SEO is part of every new public page. A page is not done until:

1. Its indexing is decided in `src/lib/routes.ts`. A page with no content of its own gets `noindex: true` and a `noindexReason`; that sets its robots tag and removes it from `sitemap.xml`.
2. Its metadata comes from `buildMetadata` (`src/lib/seo.ts`): a unique, descriptive title and a description written for that page, with no unverified figures. Canonical, Open Graph, Twitter, robots, and the share image come from the helper; do not set them by hand.
3. JSON-LD is added only where the page qualifies (breadcrumbs always; FAQ or service data only for visible, verified content), through `<JsonLd>`.
4. Related pages link to it.
5. `npm run build` and `npm run check:seo` pass, and the page source shows the expected tags.
6. Anything intentionally left out is documented with a reason (`METADATA_EXCEPTIONS` in `scripts/check-regressions.ts`, `SPECIAL_PAGES` in `scripts/check-seo.ts`).

When changing an existing route, keep its title, description, canonical, robots, and sitemap entry correct and rerun `npm run check:seo`. Never leave default, duplicated, empty, or placeholder metadata. Details: `docs/SEO_GUIDE.md`.

## Security

- No API keys in client code, in `NEXT_PUBLIC_*` variables, or in the repo.
- Secrets go in `.env.local` (gitignored). `.env.example` has placeholders only.
- Any AI or API call runs server-side only.

## Scope

- Do only what the task asks. No redesigns, renames, dependency changes, or refactors outside it.
- If something else looks wrong, mention it in the summary instead of fixing it.

## Token efficiency

Search before reading. Read only the line ranges you need. Edit in place. Run `build` once at the end. Keep the final summary under 15 lines.