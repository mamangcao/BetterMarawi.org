# Code-Quality Audit Status

Status of every finding from the 2026 code-quality review: Phase 1 (`P1`), Phase 2 (`P2`), the coverage-gap audit (`CG`), and findings raised during remediation (`B8`, `B9`). Last reconciled on `dev` on 2026-10-23 (closeout after Batch 10). Each status was re-checked against the current code and the checks listed below, not copied from an earlier report.

**The audit is not closed.** The remaining open findings need things code cannot supply: official sources for civic data, fluent Filipino and Meranaw reviewers, owner decisions, and manual testing (screen readers, other browsers, real phones). Each is listed under "Still open" with what it depends on.

## Closeout summary (2026-10-23)

Tally (after the final cleanup): 41 fixed and verified, 1 fixed but not verified, 6 still open, 9 deferred with rationale, 1 checked with no defect, 0 inconclusive. Every check in "How to re-check" passed on the closeout build (`check:browser` in Chrome only). Each open and deferred item was re-checked against the code and still holds as recorded.

Remaining work, by who has to act:

| Needs | Items |
| --- | --- |
| Official source documents | P2-2b and the "Research backlog": CDRRMO and PNP numbers, FY 2026 budget, fee amounts, revenue code, FDP postings. Labels stay "Unverified" until then |
| Fluent reviewers | P1-M4: Filipino (no review recorded), Meranaw (266 placeholders, 8 strings never reviewed). See `docs/TRANSLATION_BACKLOG.md` |
| Owner or product decision | B9-4 (`lang="mrw"` on mostly English pages), P1-M4 (how to translate server-rendered pages), P2-S4b (when to enforce the CSP), P2-S1 (Next 16 upgrade plan), B9-9 (format script) |
| Manual testing | CG-cov: screen readers, Firefox, Safari, real phones, whole-site contrast, Lighthouse; CG-perf: re-measure navigation on a slow phone |
| Safe repository fixes, no outside input | B8-10b (shorten service descriptions); B8-9 only matters when FDP records are added. B8-11, B9-8 and the title half of B8-10 were fixed in the final cleanup; B9-6 was kept by owner decision |

Before public deployment:

1. Commit the working tree on `dev`; most remediation since Batch 4 is uncommitted.
2. Run every check in "How to re-check" on the commit to be deployed, from a production build.
3. Do one manual pass with a screen reader, Safari (iPhone), and a real Android phone; the automated suite does not cover them.
4. Re-confirm the decision to show the unverified CDRRMO and PNP numbers (labelled, after 911) on a public site, or confirm them with the offices.
5. Follow the launch checklist in `docs/SEO_GUIDE.md` and `docs/DEPLOYMENT.md`.

Everything else above can stay as documented follow-up.

## Statuses and severity

| Status | Meaning |
| --- | --- |
| Fixed and verified | The fix is in the code and a check in this repo (or a browser run recorded here) confirms it. |
| Fixed but not verified | The fix is in the code, but nothing measures whether it worked. |
| Still open | The problem is still present. |
| Deferred with rationale | Known and left on purpose, for the reason given. |
| Inconclusive | Not examined closely enough to say. |

Severity: High = wrong civic information or a security risk; Medium = broken for some users or a regression risk; Low = maintainability or polish.

## How to re-check

All checks need only the project's existing dependencies.

| Command | What it guards |
| --- | --- |
| `npm run check:data` | 101 barangays; published data files; verified contacts and heads; no invented emails; ordinance sources; APMC and CHO kept apart; FDP records linked to postings; no unconfirmed local laws cited for fees; no licence claimed for government data; the offline page lists only sourced or verified hotlines |
| `npm run check:security` | JSON-LD escaping, CSV quoting and formula protection, report-only CSP header config |
| `npm run check:regressions` | Titles and `buildMetadata` use; hub pages, menus, and the `/services` grid use registry links and names (rendered); the YAKAP and tourism sections render in full; no `loading.tsx`; structured-data contacts; hydration-safe first render; `<html lang>`; ARIA wiring (source); placeholder contrast; no simulated forms |
| `npm run check:translations` | Same keys in EN, FIL, MRW; every English placeholder in Meranaw marked `TODO(mrw-review)`; regenerates `docs/TRANSLATION_BACKLOG.md` with `-- --markdown docs/TRANSLATION_BACKLOG.md` |
| `npm run check:seo` (after `npm run build`) | Built HTML of every page: title, description, canonical, robots vs the route registry, Open Graph, share-image size, `lang`, JSON-LD and breadcrumbs, the 404 page, `sitemap.xml`, `robots.txt` |
| `npm run check:browser` (after `npm run build`) | Headless Chrome on the production server (38 checks): no sideways scroll at 360 and 375px on all 31 pages; the `/sitemap` inspector; content visible with JavaScript off; mobile-menu focus trap; dropdown names; search combobox; language switching, `<html lang>`, hydration, persistence; live head vs server HTML; client navigation; 404; `sitemap.xml`; CSP violations; CSV download; the error page (by injecting a failure); offline page and service-worker cache upgrade |

`check:browser` needs Google Chrome or Chromium (set `CHROME_PATH` if it is not found). It does not test screen readers, Firefox, Safari, or real phones. With `--url=` it tests a server you started and skips the offline check, which must stop the server.

## Fixed and verified

| ID | Finding | Category · Severity | Files / routes | Evidence |
| --- | --- | --- | --- | --- |
| P1-1, P2-4 | Site name repeated in page titles | SEO · Medium | `src/lib/seo.ts`, all pages | `check:regressions`; `check:seo` (one site name per title); `check:browser` (live title matches server HTML on 31 pages) |
| P1-2, P2-3 | Invented official data: emails, department heads, office hotlines, ordinances, "96 barangays", and in structured data | Civic data · High | `src/data/*`, `src/lib/jsonld.ts`, government and contact pages | `check:data` (14 checks); `check:regressions` (no phone or email in any schema) |
| P1-3 | Page text promised more than the data (barangay leaders, resolutions) | Content · Medium | `/government`, `/government/legislative`, nav descriptions | Rewritten in Batches 3 and 8; Batch 8 page-text scan of every route. One leftover link label is listed under "Still open" (B9-6) |
| P1-4, P2-5 | Server and first browser render differed (exchange rates, weather, language) | Reliability · Medium | `src/lib/fx.ts`, `src/lib/weather.ts`, `src/i18n/LanguageProvider.tsx` | `check:regressions` (first render ignores saved data); `check:browser` (no hydration errors when a saved language is restored) |
| P2-1 | Contact and FOI forms faked a submission and a tracking number | Integrity · High | `src/components/contact`, `src/components/transparency` | `check:regressions` (no `<form>`, `Math.random()`, fake reference numbers) |
| P2-2 | Hotlines unlabelled; 911 missing; CDRRMO number contradicted itself | Civic data · High | `src/config/site.ts`, header, contact page | `check:data`; CDRRMO and PNP labelled Unverified; the conflicting `520-3000` entry was removed (Batch 3) |
| P2-6 | Mobile menu did not keep keyboard focus | Accessibility · Medium | `src/components/layout/MobileNav.tsx` | `check:browser`: focus moves in, 0 of 45 Tab or Shift+Tab presses leave, Escape returns focus |
| P2-7 | Header dropdown buttons had no accessible name | Accessibility · Medium | `src/components/layout/Header.tsx` | `check:browser`: four named buttons, Enter opens, Escape closes |
| P2-8 | Stale (96-row) and invented files in `public/data` and the download buttons | Civic data · High | `public/data`, `OpenDataDownloads.tsx` | `check:data` (published files match the 101-barangay dataset); `check:browser` (downloaded CSV equals the published file) |
| P2-9 | `/sitemap` scrolled sideways at 360px (fixed in Batch 8) | Layout · Medium | `src/components/seo/SitemapInspector.tsx` | `check:browser`: no overflow at 360 and 375px on all 31 pages, and on `/sitemap` after selecting each route at 360 and 1280px |
| P2-S2, CG-10 | JSON-LD could be closed by `</script>` in data | Security · High | `src/lib/jsonld.ts`, `JsonLd.tsx` | `check:security`; `check:seo` (no raw `<` in any built JSON-LD block) |
| P2-S3 | CSV exports lacked quoting and formula protection | Security · Medium | `src/lib/csv.ts` | `check:security` (RFC 4180 round-trip, formula guard); `check:browser` (download) |
| P2-S4, CG-9 | No Content Security Policy | Security · Low | `next.config.ts` | Report-only CSP added. `check:security` (header config); `check:browser` (header sent; 0 violations on 31 pages with the rates and weather APIs called). Enforcement is deferred, see below |
| P2-S5 | Server-side exposure: API routes, server actions, secrets | Security · Info | whole repo | Re-checked Batch 9: no `src/app/api`, no middleware, 0 server actions; the only environment variable is `NEXT_PUBLIC_SITE_URL` |
| P2-S6, B9-1 | Offline, every address showed a copy of the home page saved at install time and never refreshed | Offline · Medium | `public/sw.js`, `public/offline.html` | Batch 9: the worker now serves a self-contained offline page (911, BFP, APMC) and never a saved copy of another page; the old cache is deleted; the offline copy refreshes once per worker start. `check:browser` (offline page shown for `/contact`, old cache removed); `check:data` (offline hotlines match the verified list) |
| CG-1 | Page content hidden behind a loading screen until JavaScript ran | Reliability · High | `src/app/loading.tsx` (removed) | `check:regressions`; `check:browser` (content visible with JavaScript off on all 31 pages) |
| CG-2 | No automated tests | Testing · Medium | `scripts/` | Six `check:*` scripts, including the in-repo browser suite (Batch 9). Fault injection: 11 of 11 planted browser faults, 25 of 25 SEO faults, and the data, security and regression faults from earlier batches were caught |
| CG-3 | `<html lang>` stayed "en" after switching language | Accessibility · Medium | `LanguageProvider.tsx` | `check:browser` (fil, mrw, back to en); `check:regressions`. See B9-4 for the Meranaw caveat |
| CG-4 | Unverified City Health Office number on the home carousel | Civic data · Medium | `FeatureCarousel.tsx` | `check:regressions`; `check:data` |
| CG-6 | Home search lacked combobox roles | Accessibility · Low | `HeroSearchCard.tsx` | `check:browser` at 360 and 1280px: roles, arrow keys, Enter navigates, empty results announced |
| CG-7 | Low-contrast barangay table placeholders | Accessibility · Low | `BarangayUnits.tsx` | `check:regressions` (at least 4.5:1) |
| CG-8a, B9-2 | `bm_lang` cookie written but never read | Privacy / i18n · Low | `LanguageProvider.tsx`, `docs/TRANSLATION_GUIDE.md` | Pages are static, so the server cannot read it; it was sent with every request for nothing. Batch 9 stopped writing it and deletes old copies after the page loads. `check:browser` (choice saved in localStorage, no cookie) |
| P1-M1, CG-12 | Dead code and 33 unused strings | Maintainability · Low | see "Batch 7 dead-code removal" | Removed in Batch 7; typecheck, lint, build pass. The unused UI kit was removed later (B9-7) |
| CG-err, B9-3 | Error page never exercised; it kept the page's title and `index, follow` | Error handling · Low | `src/app/error.tsx` | Batch 9: the error page sets its own title and a `noindex` tag. `check:browser` causes a real runtime error (by replacing the `/sitemap` page script in the browser) and checks the page, its buttons, title, and robots tag |
| B9-5 | 106 Meranaw English placeholders had no `TODO(mrw-review)` marker | i18n · Low | `src/i18n/translations/mrw.ts` | 69 comment lines added (no text changed); `check:translations` fails if one goes missing |
| P1-M2 | Duplicated card and header markup (Batch 10) | Maintainability · Low | `src/components/ui/LinkCard.tsx`, `src/components/ui/PageHeader.tsx`, `SectionHub.tsx`, `ServiceCard.tsx`, `/services` | `ServiceCard` and the hub cards were the same card except the top-right detail; `/services` repeated the hub header. Both now use `LinkCard` and `PageHeader`. The built `<main>` of `/services` and `/government` is byte-identical before and after |
| P1-M3 | Navigation defined in several places; labels drifted (Batch 10) | Maintainability · Low | `src/lib/routes.ts` (`getRoute`), `src/config/site.ts`, hub pages | Hub cards take a registry `path` and show the registry label; the menus read label, link, and description from the registry (21 of 24 descriptions were copies, 3 had drifted). Visible changes are limited to 4 hub titles ("Competitiveness Profile" to "DTI CMCI Profile", "Open Data Downloads" to "Open Data PH", "(FDP)", "(FOI)") and 3 menu descriptions; two registry labels were aligned with the rest of the site ("Garbage and Waste Disposal", "Legislative"). `getRoute` fails the build on an unknown path. `check:regressions` renders the hubs and fails on a wrong link, missing card, or drifting label (5 of 5 planted faults caught) |
| P1-M5a | The generic service template inlined two services' own sections (Batch 10) | Maintainability · Low | `services/[slug]/page.tsx`, `YakapLabTests.tsx`, `TourismDirectory.tsx` | The YAKAP lab-test panel and the tourism directory moved into components, like `HealthFacilities` already was (template 264 to 166 lines). The built `<main>` of all 12 service pages is byte-identical before and after; `check:regressions` renders both sections in full |
| P2-G1 | Language switcher keyboard handling never run in a browser | Accessibility · Low | `LanguageSwitcher.tsx` | `check:browser`: Enter opens the language list, Escape closes it; switching languages works |
| B8-1 | Share image declared 1200 x 630 but was a 2000 x 2000, 2.7 MB file | SEO · Medium | `src/lib/seo.ts`, `src/app/opengraph-image.png` | `check:seo` compares the declared size with the real file |
| B8-2 | 404 page inherited the home page's canonical and title; conflicting robots tags | SEO · Medium | `src/app/not-found.tsx`, `layout.tsx` | `check:seo`; `check:browser` (HTTP 404, noindex, no canonical) |
| B8-3 | Page and nav descriptions promised content the pages do not show | SEO / content · Medium | 8 routes, `routes.ts`, `site.ts` | `check:seo` (no peso figures, unique, not the site default) |
| B8-4 | `/sitemap` inspector showed guessed metadata (why Services and Certificates looked untreated) | SEO · Medium | `SitemapInspector.tsx` | `check:browser`: the inspector matches each page's real tags on all 31 routes |
| B8-5 | Pages with no content were indexable | SEO · Low | `routes.ts` (`noindex`), `sitemap.ts` | `check:seo`; `check:browser` (`sitemap.xml` lists exactly the 29 indexable pages) |
| B8-6 | Fabricated FDP records; unsourced "verified" scorecard (owner decision) | Civic data · High | `src/data/fdp.ts`, `DocumentsList.tsx` | Removed. `check:data` fails on an FDP record without a source link |
| B8-7 | "Creative Commons CC0" label on government data | Legal / content · Medium | translations | Removed. `check:data` fails on any CC0 claim |
| B8-8 | Fees cited local laws that could not be found (owner decision) | Civic data · High | `src/data/services.ts` | 14 citations now "To be confirmed". `check:data` |
| B8-10a | Service-page titles were 69 to 91 characters (final cleanup) | SEO · Low | `services/[slug]/page.tsx` | Now "<Service> in Marawi City \| BetterMarawi.org" (41 to 63 characters), the same pattern as `/services/certificates`; the suffix "Citizen's Charter & Guide" was dropped. `check:seo` (unique titles, site name once, matching `og:title`) on the production build |
| B8-11 | Stray "4." in the FAQ heading outside the service pages (final cleanup) | Content · Low | `ServiceFAQ.tsx`, `services/[slug]/page.tsx` | Only the service pages, which number their sections, pass `numbered`; the translation strings are unchanged. Built HTML: "4. Frequently Asked Questions" on service pages, no number on Certificates, FDP and Budget |
| B9-7 | Unused UI kit (final cleanup, owner decision to remove) | Maintainability · Low | `src/components/ui/index.tsx`, `docs/DESIGN_SYSTEM.md` | `Card`, `Button`, `Badge`, `Input` were never imported; removed, and the design-system doc lists only components that exist (`PageHeader`, `LinkCard`). Typecheck, lint, and build pass |
| B9-8 | `docs/SEO_GUIDE.md` ended with a duplicated bullet (final cleanup) | Docs · Low | `docs/SEO_GUIDE.md` | The repeat is removed; the bullet appears once |

## Fixed but not verified

| ID | Finding | Category · Severity | Files | Evidence | Remaining action |
| --- | --- | --- | --- | --- | --- |
| CG-perf | Slow client navigation (context re-renders) | Performance · Medium | `LanguageProvider.tsx` | Context value memoized; `setLanguage` stable (source) | Re-measure on a throttled CPU or a real phone. No automated performance check exists |

## Still open

| ID | Finding | Category · Severity | Files / routes | Evidence (re-checked at closeout) | Remaining action · dependency |
| --- | --- | --- | --- | --- | --- |
| P2-2b | Unverified civic data still shown, labelled (owner decision, Batch 8) | Civic data · High | `site.ts` hotlines; `budget.ts`; `services.ts` fees | CDRRMO `(063) 352-0117`, PNP `0998-598-6678`, FY 2026 budget figures, service fee amounts all carry "Unverified" | Needs official sources; see "Research backlog". Keep the labels until then |
| P1-M4, CG-5 | Partial translation | i18n · Medium | 40 files with English written in JSX; `fil.ts`, `mrw.ts` | `docs/TRANSLATION_BACKLOG.md`: Filipino 262 of 274 strings translated, none with a recorded review; Meranaw 8 of 274 in Meranaw (review not recorded), 266 English placeholders; server-rendered pages are English only | Fluent Filipino and Meranaw reviewers (do not machine-translate Meranaw). Translating server-rendered page text needs a design decision (client components or per-language routes) |
| B9-4 | `<html lang="mrw">` while 97% of the interface is still English | Accessibility · Low | `LanguageProvider.tsx` | 266 of 274 Meranaw strings are English placeholders, and page bodies are English, but the whole page is declared Meranaw. Filipino has the same issue for English page bodies (WCAG 3.1.2, parts in another language) | Owner decision: mark untranslated text with `lang="en"`, or keep `en` for MRW until coverage improves. Not changed in Batch 9 to avoid guessing |
| B8-9 | FDP rows would export a CSV of the row, not the document | Transparency · Low | `FDPTable.tsx` | The list is empty, so nothing shows | Link to the official file before adding records |
| B8-10b | Long service-page descriptions | SEO · Low | `services/[slug]/page.tsx` | About 230 characters (the SEO guide suggests about 160); titles were shortened in the final cleanup | Shorten when the service pages are next edited |
| CG-cov | Test coverage gaps | Testing · Medium | n/a | Not tested: screen readers, Firefox, Safari, real phones, whole-site contrast (only sampled pages and the barangay table are measured), Lighthouse or Core Web Vitals | Manual screen-reader and cross-browser pass before launch; consider a bundle analyzer or Lighthouse run (new dependency, needs approval) |

## Deferred with rationale

| ID | Finding | Category · Severity | Rationale | Revisit when |
| --- | --- | --- | --- | --- |
| P2-S4b | CSP is report-only, not enforced | Security · Medium | Report-only first, to catch breakage without blocking. `'unsafe-inline'` is required by statically generated Next.js pages. `check:browser` finds 0 violations | After a period of clean checks, rename the header to `Content-Security-Policy` |
| P2-S1, CG-11 | Next.js advisory (bundled `postcss`) | Dependencies · Medium | `npm audit` flags `next` 15.5.28 through its own `postcss`, which processes the site's own CSS at build time. The fix needs Next 16, a major upgrade | A planned Next 16 upgrade with its own testing |
| CG-11b | Dev-tool advisories (`braces`, `micromatch`, `fast-glob` via `eslint-config-next`) | Dependencies · Low | Lint tooling only; not shipped | With the Next 16 upgrade |
| CG-8b | A saved Filipino or Meranaw choice shows English first | i18n · Low | Pages are pre-rendered in English; applying the saved language before hydration would cause a server/browser mismatch. `check:browser` confirms no hydration errors | With per-language routes (`/fil`, `/mrw`), a future task in `docs/SEO_GUIDE.md` |
| CG-perf2 | Splitting translation and data bundles; `content-visibility` | Performance · Low | All languages ship in the shared bundle by design; `content-visibility` was tried and rejected (it hid content from screen readers) | If the bundle grows noticeably, with measurements |
| P1-M5b | Other large files (Batch 10 assessment) | Maintainability · Low | Assessed, not split: `services.ts` (785 lines) is data, and its real risk (sourced and unsourced records side by side) is handled by labels and `check:data`; splitting it would only move lines. `Header.tsx` (342), `MobileNav.tsx` (283), and `HeroSearchCard.tsx` (262) hold interactive logic that `check:browser` now covers end to end, so a split would add risk without fixing a defect. `routes.ts`, `certificates.ts`, and the translation files are long lists by nature | When one of them next needs a functional change, or a defect traces to its size |
| B9-6 | SP office link labelled "Ordinances and resolutions" while the Legislative page lists none | Content · Low | Kept by owner decision (final cleanup): the label names what the council produces, and ordinances will be listed once sourced (`src/data/cityOffices.ts`) | If the owner changes the decision, or when ordinances are added |
| P1-5 | Repeated barangay phone numbers | Civic data · n/a | Not a defect: DILG publishes some numbers for more than one barangay; kept as published (owner) | Only if a source shows a specific entry is wrong |
| B9-9 | `prettier` has no config or script | Tooling · Low | Kept: the owner's editor formats with the Prettier VS Code extension, which uses the project's copy when present. Removing it would silently change the formatter version | If the project adds a `format` script or `.prettierrc`, or the owner stops using it |

## Inconclusive

None.

## Checked, no defect

| ID | Finding | Evidence |
| --- | --- | --- |
| P1-M6 | TypeScript escape hatches | Re-checked Batch 10: no `any`, `@ts-ignore`, `@ts-expect-error`, or `eslint-disable` in `src/` or `scripts/` |

## Ledger changes

Repository tidy-up before commit:

- B9-7 fixed: the owner asked to remove files and code that are no longer needed, so the unused UI kit was deleted (fixed 40 to 41, still open 7 to 6).
- Also removed, not tracked as findings: five branding files that were exact duplicates of others (including a second 2.7 MB copy of `logo.png`), and `src/data/index.ts`, a re-export file nothing imported that listed only 9 of the 17 data files.

Final cleanup:

- B8-10 split: the title half (B8-10a) is fixed; the description half (B8-10b) stays open.
- B8-11 and B9-8 fixed. B9-6 moved to "Deferred": the owner chose to keep the label.
- Counts: fixed and verified 37 to 40, still open 10 to 7 (four rows closed or moved, one added for descriptions), deferred 8 to 9.

Closeout (after Batch 10):

- The ID token `B8` appeared alone on two rows (`P2-9, B8` and `P2-2b, B8`), so IDs were not unique. Both rows keep their original IDs; the batch is now named in the finding text. No status changed.
- The "Still open" evidence column was headed "Batch 9"; every row was re-checked at closeout and still holds, so the heading now says so.
- Added the closeout summary and the before-deployment list above. Counts are unchanged from Batch 10.

Batch 10:

- P1-M2 and P1-M3 moved from "Still open" to "Fixed and verified" after the refactor, with before-and-after HTML comparisons and new rendered checks.
- P1-M5 split into P1-M5a (fixed: the service template) and P1-M5b (deferred with rationale), because only one large file had a concrete defect.
- P2-G1 (language switcher keyboard, a Phase 2 coverage gap) was missing from the ledger; added, verified by `check:browser`.
- P1-M6 (no TypeScript escape hatches, a Phase 1 observation) was missing; added under "Checked, no defect".
- B9-7 narrowed: the documentation mismatch is fixed; the unused kit remains an owner decision.
- Discrepancy found and corrected: the Batch 9 ledger said the menu descriptions duplicated the registry's; 21 of 24 were identical copies and 3 had drifted. All 24 now come from the registry.

## Research backlog (official sources needed)

Nothing below may be filled in from memory or guesses. Keep the "Unverified" labels until a source is recorded in `docs/VERIFICATION_CHECKLIST.md`.

| Item | Where it is used | Likely source | Status |
| --- | --- | --- | --- |
| Marawi City revenue code (title, ordinance number) | 14 fee citations now "To be confirmed"; BPLO notes in `businessServices.ts` | Sangguniang Panlungsod secretariat; City Treasurer's Office | Not found online (2026-10-23) |
| City fee schedule (amounts) | `services.ts` fee tables (labelled Unverified) | BPLO, City Treasurer, each office's Citizen's Charter | Not found |
| FY 2026 appropriation ordinance | `/transparency/annual-budget` (figures labelled Unverified) | Sangguniang Panlungsod; DBM local budget records | Not found |
| Marawi's FDP postings | FDP and Transparency Documents pages (empty) | DILG FDP Portal (fdpp.dilg.gov.ph); City Hall posting boards | Not found; the portal is live but was not searchable from here |
| CDRRMO and PNP contact numbers | Hotline chips, contact page (labelled Unverified); kept off the offline page | The offices themselves; PNP Lanao del Sur Police Provincial Office; OCD BARMM | Not found online |

## Public information review (Batch 8)

Searched on 2026-10-23 for primary sources (city publications, ordinances, Citizen's Charters, DILG and DBM records, news). None were found for the items below. Decisions marked "owner" were made by the site owner.

| Item | Where | Evidence found | Decision |
| --- | --- | --- | --- |
| CDRRMO `(063) 352-0117`, PNP `0998-598-6678` | `EMERGENCY_HOTLINES` in `src/config/site.ts`; contact page, hotline chips | None in the repo or on the web (results were 2017 siege news only) | Kept, labelled Unverified, 911 listed first (owner) |
| FY 2026 budget (₱1,845,200,000; NTA and local split; 5 sectors) | `src/data/budget.ts`; `/transparency/annual-budget` | None. No appropriation ordinance or DBM record found. A PIA article (Aug 2023, seen only as a search summary) puts 2022 locally sourced revenue at about ₱38.3M; that is a different year, so it neither confirms nor contradicts the figures | Kept on the page, labelled Unverified; removed from the meta description and FAQ JSON-LD (owner) |
| FDP documents (8 records) | `src/data/fdp.ts`; FDP and Transparency Documents pages | No postings found; the files did not exist; "Compliant" status, dates and sizes unsourced | Removed; empty state points to the DILG FDP Portal (owner) |
| FDP FAQ | FDP page | DILG MC 2024-021 (revised FDP guidelines; full text not retrievable, HTTP 403) and MC 2019-149 (portal address) via search summaries | Rewritten to the general rule only; the unsourced Marawi posting locations and "14 documents" claim removed |
| Reports scorecard (4 figures, "Verified indicators") | `DocumentsList.tsx`; Reports page | None | Removed; page set to noindex until reports are added (owner) |
| Service fees | `src/data/services.ts` fee tables | National laws cited are real (RA 9514, RA 11223, RA 10121 and others). No source for the amounts or for 14 local citations | Amounts kept with their Unverified label; the 14 local citations now "To be confirmed" (owner) |
| Ordinances | Legislative page | Already removed in Batch 3 (empty state) | No change; page description no longer promises ordinances |
| CC0 licence label | Open data page | `docs/LICENSING.md`; PSA content is CC BY 4.0 | Removed |

## Batch 7 dead-code removal

Every item had zero references in `src/`, `scripts/` and `docs/` (apart from its own definition) before removal.

- `src/lib/utils.ts`: `formatNumber`, `formatCurrency`
- `src/lib/verification.ts`: `isVerified`
- `src/lib/weather.ts`: `MARAWI_COORDINATES` (the fetch URL has its own coordinates)
- `src/lib/csv.ts`: `generateFDPCSV` (the FDP table uses `generateFDPDocumentCSV`)
- `src/types/index.ts`: `TourismPlace`, `TourismCategory`, `BudgetSector`, `BudgetBreakdown`
- `src/i18n/useTranslation.ts`: duplicate re-export (`src/i18n/index.ts` already exports both names)
- 33 translation keys not read anywhere, removed from all three languages (232 top-level keys remained in each; `check:translations` counted 276 strings at the time because it includes nested ones; 274 after the verified-badge keys were removed)
