# BetterMarawi.org

A community-run civic transparency and citizen services portal for the Islamic City of Marawi, Lanao del Sur, BARMM. It helps residents find city services, government information, budgets, and statistics in plain language.

> **BetterMarawi.org is community-run. It is not the official website of the Islamic City of Marawi** unless the city government states otherwise. Always confirm with City Hall before relying on any information.

Part of the [BetterGov.ph](https://bettergov.ph) community model, inspired by BetterIndang.org.

## Features

- 12 citizen services (11 Citizen's Charter services plus Certificates & Clearances) with requirements, steps, fees, offices, and FAQs
- Government directory: departments, officials, and the Sangguniang Panlungsod
- Transparency pages: Full Disclosure Policy, annual budget, FOI guide
- Statistics: city profile, DTI CMCI, all 101 barangays, open data downloads (CSV and JSON)
- Service search and popular services on the home page
- Languages: English, Filipino, and Meranaw (interface text)
- Quick contacts bar for emergency hotlines
- Data status badges that mark information not yet verified against official sources
- Server-rendered SEO: metadata, sitemap, robots, and JSON-LD

## Tech stack

- Next.js (App Router) and React
- TypeScript (strict)
- Tailwind CSS v4
- lucide-react icons
- Fonts via `next/font`: Fraunces, Plus Jakarta Sans, JetBrains Mono
- Hosting target: Vercel

## Quick start

Requirements: Node.js (current LTS), npm, and Git.

```
git clone https://github.com/mamangcao/BetterMarawi.org.git
cd BetterMarawi.org
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript checks |
| `npm run check:data` | Civic data rules (101 barangays, sources, verified hotlines) |
| `npm run check:security` | Safe JSON-LD and CSV output, CSP header |
| `npm run check:regressions` | Titles, navigation, hydration, accessibility wiring |
| `npm run check:translations` | Same keys in EN, FIL, MRW; untranslated Meranaw marked |
| `npm run check:seo` | After a build: SEO tags of every page, `sitemap.xml`, `robots.txt` |
| `npm run check:browser` | After a build: headless Chrome checks (needs Chrome installed) |

Stop the dev server before running `npm run build`, because a running server can lock the `.next` folder. Which checks to run for a change: see "Commands" in [AGENTS.md](AGENTS.md).

## Environment variables

The site is static today and needs no secrets. If a `.env.example` file exists, copy it to `.env.local` and fill in values. Never commit `.env.local`. Never put a key in a `NEXT_PUBLIC_*` variable.

## Project structure

```
src/
├─ app/          routes, metadata, sitemap, robots, icons
├─ components/   layout, home, services, government, transparency, statistics, contact, ui
├─ data/         services, departments, officials, ordinances, budget, barangays, and more
├─ i18n/         language provider and translations (en, fil, mrw)
├─ lib/          SEO, JSON-LD, route registry, helpers
├─ types/        shared TypeScript types
└─ config/       site constants
docs/            guides for contributors
public/          images and static files (public/branding/ holds the logo)
```

## Documentation

| Guide | Purpose |
| --- | --- |
| [AGENTS.md](AGENTS.md) | Rules for AI coding agents |
| [CONTRIBUTING.md](docs/CONTRIBUTING.md) | Workflow, branches, commit format |
| [CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md) | How to write content |
| [DATA_UPDATE_GUIDE.md](docs/DATA_UPDATE_GUIDE.md) | Updating data safely |
| [data-sources.md](docs/data-sources.md) | Where data comes from and verification status |
| [VERIFICATION_CHECKLIST.md](docs/VERIFICATION_CHECKLIST.md) | What has been verified, by whom, and when |
| [DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) | Colors, fonts, components |
| [TRANSLATION_GUIDE.md](docs/TRANSLATION_GUIDE.md) | Filipino and Meranaw text |
| [TRANSLATION_BACKLOG.md](docs/TRANSLATION_BACKLOG.md) | Strings waiting for a Filipino or Meranaw reviewer |
| [SEO_GUIDE.md](docs/SEO_GUIDE.md) | Metadata, JSON-LD, sitemap |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md) | Vercel and domain setup |
| [LICENSING.md](docs/LICENSING.md) | What each part is licensed under |
| [AUDIT_STATUS.md](docs/AUDIT_STATUS.md) | Known issues, their status, and what is left to do |

## Data and accuracy

All public information should come from official government sources, listed in `docs/data-sources.md`. Items not yet checked are labeled **Unverified** on the site. If you find a wrong or outdated value, open an issue and include the official source that shows the correct one.

## Contributing

Read `docs/CONTRIBUTING.md` first. Work on the `dev` branch, use the commit format `Type: Brief description`, and make sure `typecheck`, `lint`, and `build` pass before opening a pull request.

## License

Code is MIT licensed (see `LICENSE`). Original content is CC BY 4.0. Official data stays subject to its sources, and the logo is excluded. Details: `docs/LICENSING.md`.