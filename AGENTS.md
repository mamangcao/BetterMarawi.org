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
```

Before finishing any task, `typecheck`, `lint`, and `build` must pass.

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
- Conventional Commits: `feat:`, `fix:`, `style:`, `refactor:`, `docs:`, `chore:`.
- If push authentication fails, stop and tell the owner what to do. Never ask for a token in chat.

## Data and content

- Never invent or alter official data: names, budgets, figures, phone numbers, hours, fees.
- Writing and copy follow `docs/CONTENT_GUIDE.md`.
- Unverified data must be labeled or left out.
- Keep existing service names and slugs unless the task says otherwise.

## Design

- Colors come from tokens in `src/app/globals.css`. No hardcoded hex in components.
- Palette: background `#F9FEFF`, primary `#1B4D3E`, accent `#FFE135` (accent only, never forced).
- Link and CTA arrows use the shared `ArrowUpRight` component, never the text character `↗`.
- Never copy names, colors, or numbers from BetterIndang.org.

## Security

- No API keys in client code, in `NEXT_PUBLIC_*` variables, or in the repo.
- Secrets go in `.env.local` (gitignored). `.env.example` has placeholders only.
- Any AI or API call runs server-side only.

## Scope

- Do only what the task asks. No redesigns, renames, dependency changes, or refactors outside it.
- If something else looks wrong, mention it in the summary instead of fixing it.

## Token efficiency

Search before reading. Read only the line ranges you need. Edit in place. Run `build` once at the end. Keep the final summary under 15 lines.