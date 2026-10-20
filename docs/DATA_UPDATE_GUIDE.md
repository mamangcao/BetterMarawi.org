# Data Update Guide

How to add, change, or remove information in `src/data/` safely. Official data must be correct, sourced, and dated.

Related: `docs/data-sources.md` (sources and verification log), `docs/CONTENT_GUIDE.md` (how to write the text).

## Golden rules

1. Never invent, guess, or estimate official data: names, budgets, figures, phone numbers, hours, fees.
2. Every value must trace to an official source recorded in `docs/data-sources.md`.
3. If you cannot verify it, label it as unverified or leave it out.
4. Change data only. Do not rename files, fields, or slugs in the same commit.
5. One dataset per commit, so a mistake is easy to find and undo.

## Where data lives

| File | Contents |
| --- | --- |
| `src/data/services.ts` | The 11 citizen services: requirements, steps, fees, office, FAQs |
| `src/data/departments.ts` | City Hall departments, heads, mandates, hotlines |
| `src/data/officials.ts` | Mayor, Vice Mayor, SP members, ex-officio members |
| `src/data/ordinances.ts` | Enacted ordinances and resolutions |
| `src/data/fdp.ts` | Full Disclosure Policy disclosures |
| `src/data/budget.ts` | Annual budget and sector breakdown |
| `src/data/cmci.ts` | DTI CMCI pillars and scores |
| `src/data/tourism.ts` | Tourism categories and listings |
| `src/data/barangays.ts` | All 96 barangays and population |
| `src/config/site.ts` | Hotlines, site constants, navigation |
| `src/i18n/translations/` | EN, FIL, MRW text (see `docs/TRANSLATION_GUIDE.md`) |

Types live in `src/types/`. If you add a field, update the type first so TypeScript flags every place that needs it.

## Update workflow

1. **Get the source.** Find the official document or page. Note its title, URL, and date.
2. **Open the right file.** Search for the item instead of scrolling (for example, search the official's name).
3. **Edit in place.** Change only the values that changed. Keep the existing structure and formatting.
4. **Match the formats** below.
5. **Update both language versions** if the value appears in translations, or flag that FIL and MRW need review.
6. **Record the source** in `docs/data-sources.md`: exact page or document, source date, your name, today's date, status Verified.
7. **Test.** Run `npm run typecheck`, `npm run lint`, and `npm run dev`. Open every page that shows the data.
8. **Commit** with the format in `AGENTS.md`.

## Formats

| Type | Format | Example |
| --- | --- | --- |
| Money | Number in the data, formatted on display. Peso sign added by the UI. | `1845200000` shown as ₱1,845,200,000 |
| Phone | Full number with area code, plus a separate `tel:` value without spaces | `(063) 352-0117` and `+63633520117` |
| Dates | ISO format in data: `YYYY-MM-DD`. Shown as "October 19, 2026". | `2026-10-19` |
| Time and hours | Plain text with AM/PM | `8:00 AM to 5:00 PM` |
| Population | Integer, with the source and year stated nearby | `207010` (2020 Census, PSA) |
| Percentages | Number only when stored, `%` added on display | `20` |
| Slugs | Lowercase, hyphens, no spaces, never changed once published | `health-services` |
| Free services | Store as free, show "Free". Do not store `0.00` text. | |

Match the format already used in that file. If the file differs from this table, follow the file and note the difference.

## Common tasks

### Change a hotline number

1. Confirm the number with the office, or from an official page.
2. Update it in `src/config/site.ts` (QuickContacts) and anywhere else it appears. Search for the old number to catch every copy: `grep -rn "old-number" src/`.
3. Check the `tel:` link works.
4. Record the verification in `docs/data-sources.md`.

### Update the annual budget

1. Use the official General Appropriation Ordinance or BLGF report.
2. Update `src/data/budget.ts`.
3. Check that sector amounts add up to the total.
4. Check the budget page, charts, and any home page figure.
5. Update the fiscal year label everywhere it appears.

### Update officials after an election or appointment

1. Use the official proclamation, COMELEC result, or City Hall list.
2. Update `src/data/officials.ts`: name, position, term, committee.
3. Update `departments.ts` if a department head changed.
4. Check JSON-LD output (organization and contact data).
5. Remove people who left office. Do not leave old terms.

### Add or change a service

1. Use the current Citizen's Charter as the source.
2. Keep the existing slug. Changing a slug breaks links and search results.
3. Fill every part of the service structure from `docs/CONTENT_GUIDE.md`: requirements, steps, fees, processing time, office, hours, contact, FAQs.
4. Check the service page, the services list, the hero search, and the sitemap.
5. For a new service, add its route to the route registry in `src/lib/routes.ts` and add it to the services list.

### Mark a service as popular

Set `popular: true` and `popularRank` in `src/data/services.ts`. Up to 6 show in the hero grid. Base the choice on real inquiry data from City Hall or analytics when available.

### Add a barangay or fix a population

1. Use PSA 2020 Census and the PSGC for names and codes.
2. Keep the list sorted the way the file already is.
3. Check that the total population still matches the city figure.
4. Test the barangay table search and CSV export.

### Add an ordinance or FDP item

1. Use the Sangguniang Panlungsod record or the DILG FDP portal.
2. Include the number, title, date, and a link to the document if public.
3. Do not publish documents that have not been cleared for release.

### Remove outdated data

1. Remove or archive the item. Do not leave expired announcements or old figures.
2. Search for other places that mention it.
3. If a page or link will disappear, add a redirect in `next.config.ts`.

## Unverified or pending data

- Keep a clear marker in the data, for example `verified: false`, or leave the field out.
- Never show unverified values as if they were official.
- List pending items under "Open questions" in `docs/data-sources.md`.

## Check before committing

- [ ] The value matches the official source exactly
- [ ] Source and date recorded in `docs/data-sources.md`
- [ ] Format matches the table above
- [ ] I searched for other copies of the old value and updated them
- [ ] FIL and MRW updated, or flagged for review
- [ ] Totals add up (budget, population)
- [ ] Phone numbers and links tested
- [ ] `npm run typecheck`, `npm run lint`, and `npm run build` pass
- [ ] The pages that show this data look correct on desktop and mobile
- [ ] Only data files were changed in this commit

## Commit examples

```
Update: FY 2026 budget sector amounts
Fix: wrong CDRRMO hotline number
Add: Barangay Dimaluna population
Remove: expired scholarship announcement
Docs: record budget source verification
```

## Using AI agents for data work

- Give the agent the source text and tell it exactly which file and fields to change.
- Tell it not to change values that are not in the source.
- Review the diff (`git diff`) yourself. Check every changed number against the source.
- Agents can misread tables and swap digits, so verify figures by hand.