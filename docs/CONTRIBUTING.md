# Contributing to BetterMarawi.org

Thank you for helping make Marawi's public information clearer and easier to find. This guide explains how to set up the project, how we work, and where things go.

BetterMarawi.org is a community-run project. It is not the official city website unless the city government says so.

## Before you start

Read these first:

- `AGENTS.md`: rules for AI agents and for anyone using them
- `docs/CONTENT_GUIDE.md`: how to write content
- `docs/data-sources.md`: where data comes from

## Setup

Requirements: Node.js (current LTS), npm, and Git.

```
git clone https://github.com/mamangcao/BetterMarawi.org.git
cd BetterMarawi.org
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

Never commit `.env.local` or any real keys.

## Branch workflow

- `main` is the stable, reviewed version. Do not commit to it directly.
- `dev` is where work is done and tested.
- For larger changes, branch from `dev`: `git checkout -b feature/short-name`.

Merge steps:

1. Finish the work on `dev` (or your feature branch).
2. Run `npm run typecheck`, `npm run lint`, and `npm run build`. All three must pass.
3. Open a pull request into `main` and describe what changed.
4. Check the preview, then merge.

## Commit messages

Format:

```
Type: Brief description
```

Types:

- `Add`: new feature or content
- `Fix`: bug fix
- `Update`: changes to an existing feature
- `Remove`: removed feature or content
- `Docs`: documentation changes
- `Style`: CSS or formatting changes (no logic change)
- `Refactor`: code restructuring

Rules:

- Capitalize the type, then a colon and a space
- Start the description with a capital letter, use the imperative mood ("Add", not "Added"), no period at the end
- Keep the line under about 70 characters
- One logical change per commit

Examples:

```
Add: quick contacts marquee in header
Fix: navbar dropdown navigating on click
Update: hero search card proportions
Remove: duplicate logo from mobile drawer
Docs: add content writing guide
```

Stage only the files you changed: `git add <file>`. Avoid `git add .` so unrelated work is not bundled in.

## Where things go

| What | Where |
| --- | --- |
| New page or route | `src/app/<route>/page.tsx` |
| New component | `src/components/<domain>/` (layout, home, services, government, transparency, statistics, contact, ui) |
| New content or dataset | `src/data/` |
| Shared types | `src/types/` |
| Translations | `src/i18n/translations/` (en, fil, mrw) |
| SEO and JSON-LD helpers | `src/lib/` |
| Site constants and nav | `src/config/` |
| Images and static files | `public/` |
| Guides | `docs/` |

Rules of thumb:

- Pages stay thin: metadata, JSON-LD, and composing components.
- Use Server Components by default. Add `"use client"` only for state, effects, or browser APIs.
- Use `@/` path aliases. Keep component files under about 250 lines.
- Register new routes in `src/lib/routes.ts` so the navbar and sitemap update.

## Adding or changing data

- Never invent or guess official data: names, budgets, figures, phone numbers, hours, fees.
- Check the value against an official source and record it in `docs/data-sources.md`.
- Label anything unverified, or leave it out.
- Follow `docs/DATA_UPDATE_GUIDE.md` when it is available.

## Design rules

- Use color tokens from `src/app/globals.css`. No hardcoded hex values in components.
- Palette (Ranao): background `#F9FEFF`, primary `#1B4D3E`, accent Mosque Gold `#F2C230` (accent only, never forced). Secondary `lake-*`, `okir-*`, and `langkit-*` scales are for information, heritage, and charts. See `docs/DESIGN_SYSTEM.md`.
- Use the shared `ArrowUpRight` component for link arrows.
- Check layouts at 360, 390, 768, 1280, and 1920 px widths.
- Keep text readable: meet WCAG AA contrast.

## Before opening a pull request

- [ ] `npm run typecheck`, `npm run lint`, and `npm run build` pass
- [ ] I tested the changed pages on desktop and mobile widths
- [ ] No console errors or hydration warnings
- [ ] No secrets, keys, or `.env` files in the commit
- [ ] Data changes have a source recorded in `docs/data-sources.md`
- [ ] Content follows `docs/CONTENT_GUIDE.md`
- [ ] Commit messages follow the format above
- [ ] I did not change unrelated files

## Using AI coding agents

AI agents (Antigravity, Claude Code, and similar) read `AGENTS.md` automatically. They must follow it, including:

- Work on `dev`, never force-push
- Never undo the owner's manual edits
- Stay within the task

Review everything an agent produces before merging. You are responsible for what you commit.

## Reporting problems

Open a GitHub issue with:

- What you expected and what happened
- The page URL and your device or browser
- A screenshot, if it helps

For wrong or outdated information, include the official source that shows the correct value.

## Security

Do not post security problems or personal data in public issues. Contact the maintainer directly.