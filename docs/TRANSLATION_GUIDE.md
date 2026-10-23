# Translation Guide

How to add, review, and maintain Filipino (FIL) and Meranaw (MRW) text on BetterMarawi.org.

Related: `docs/CONTENT_GUIDE.md` (plain-language rules), `docs/DATA_UPDATE_GUIDE.md` (data changes).

## Languages

| Code | Language | Role |
| --- | --- | --- |
| EN | English | Source language. Write and verify this first. |
| FIL | Filipino | Translated from EN |
| MRW | Meranaw | Translated from EN, reviewed by a fluent speaker |

## Principles

1. English is the source. Every other language follows it.
2. Translate meaning, not word for word.
3. Facts must be identical in all languages: phone numbers, dates, fees, names, figures.
4. Machine translation is only a first draft. Never publish machine-translated Meranaw without a fluent reviewer.
5. If a translation is missing or not reviewed, show English rather than a poor translation.
6. Plain language applies in every language. Short sentences, active voice, "you" form.

## Where translations live

```
src/i18n/
├─ translations/
│  ├─ en.ts
│  ├─ fil.ts
│  └─ mrw.ts
├─ index.ts               # exports LanguageProvider, useTranslation, and translations
└─ LanguageProvider.tsx   # language context, persistence (localStorage), useTranslation hook
```

- Text is stored as a structured TypeScript object (`en`). `fil.ts` and `mrw.ts` are strictly typed as `typeof en` so every key in `en.ts` must exist in all three files. Keys are camelCase properties or nested objects (for example `dataStatus.unverified`).
- In components, import `useTranslation` from `@/i18n`. The hook returns `{ language, setLanguage, t }`, where `t` is the translation object accessed via property dot-notation (for example `{t.welcomeEyebrow}` or `{t.dataStatus.unverified}`).
- `en.ts` defines the key list. TypeScript flags a missing key in `fil.ts` or `mrw.ts`, so run `npm run typecheck` after every change.
- The language choice is saved in `localStorage` (`bm_lang`), defaulting to `EN`. There is no language cookie: every page is pre-rendered, so the server cannot use one. (An older `bm_lang` cookie is deleted on the next visit.)
- The server always renders English with `<html lang="en">`. After the page loads, the saved language is applied and `<html lang>` changes to `fil` or `mrw`, so a saved Filipino or Meranaw choice briefly shows English first. This avoids a server/browser mismatch.

## What is translated, and what is not

| Content | Translated? |
| --- | --- |
| Navigation, buttons, labels, form text | Yes (translation files) |
| Hero text, section headings, notices (for example the unverified notice) | Yes |
| Data content (services, officials, ordinances, budget) | English only for now |
| Metadata, page titles, JSON-LD | English only |
| Official names of offices, laws, programs | Keep the official name in every language |
| Phone numbers, dates, money, figures | Never translated, only formatted |

Translating long service content (requirements, steps, FAQs) is a larger future task. Until then, those pages show English in every language.

## Adding or changing text

1. Add or edit the key in `en.ts` first.
2. Add the same key to `fil.ts` and `mrw.ts`.
3. In a component, import `{ useTranslation } from '@/i18n';` and access `{t.yourKey}` instead of hardcoded text.
4. Run `npm run typecheck`, `npm run lint`, and `npm run dev`. Switch EN, FIL, and MRW and check the text on screen.
5. Mark any unreviewed Meranaw text (see below).
6. Commit with the format in `AGENTS.md`.

Never hardcode visible text in a component if it appears in more than one language.

## Writing good translations

- Keep UI text short. Short English translates better and fits in buttons.
- Check that translated text fits: buttons, tabs, table headers, and the language dropdown must not overflow at 360px. Filipino text is often 20 to 30 percent longer than English.
- Keep official names consistent. Spell out the acronym the first time, then use it (for example "City Disaster Risk Reduction and Management Office (CDRRMO)").
- Use the formal "you" form that fits the language and the audience.
- Avoid idioms and jokes, which rarely translate.
- Do not translate brand names: BetterMarawi.org, BetterGov.ph.
- Do not translate place names unless an official translated form exists.

## Meranaw (MRW) specific rules

- Needs a fluent Meranaw speaker to write or review. Do not publish machine output.
- Meranaw has no widely standardized spelling, so choose one spelling and keep it consistent. Record the choices in the glossary below.
- Religious and cultural terms (for example Madrasah, Padian, Kambalingan) keep their commonly used local form. Ask a reviewer when unsure.
- Placeholder rule: if a key has no reviewed Meranaw text yet, use the English text and add a comment above the key: `// TODO(mrw-review): needs fluent reviewer`.
- Track pending items in the review log below.

## Glossary

Agree on one translation per term and reuse it everywhere. Add terms as you go.

| English | Filipino | Meranaw | Notes |
| --- | --- | --- | --- |
| Citizen's Charter | Citizen's Charter | (reviewer to fill) | Keep the official name |
| City Hall | Munisipyo / Pamahalaang Lungsod | (reviewer to fill) | |
| Free of charge | Libre | (reviewer to fill) | |
| Requirements | Mga kailangan | (reviewer to fill) | |
| Fees | Bayarin | (reviewer to fill) | |
| Office hours | Oras ng opisina | (reviewer to fill) | |
| Unverified | Hindi Pa Nabeberipika | (reviewer to fill) | Used in the data status badge (`dataStatus.unverified`) |
| Home | Tahanan | (reviewer to fill) | Navigation item |
| Services | Mga Serbisyo | (reviewer to fill) | Navigation item |
| Government | Pamahalaan | (reviewer to fill) | Navigation item |
| Transparency | Transparansya | (reviewer to fill) | Navigation item |
| Statistics | Estadistika | (reviewer to fill) | Navigation item |
| Contact | Makipag-ugnayan | (reviewer to fill) | Navigation item |
| View All | Tingnan Lahat | (reviewer to fill) | Common action link |
| Directory | Direktoryo | (reviewer to fill) | Section header label |
| Download | I-download | (reviewer to fill) | Common action button |
| Quick Links | Mabilis na mga Link | (reviewer to fill) | Footer section title |
| Resources | Mga Sanggunian | (reviewer to fill) | Footer section title |
| Frontline Services | Mga Pangunahing Serbisyo | (reviewer to fill) | Department card section |
| Frequently Asked Questions (FAQs) | Mga Madalas Itanong (FAQ) | (reviewer to fill) | Service page section |
| Weather | Panahon | (reviewer to fill) | Weather widget & metrics |
| Current conditions | Kasalukuyang panahon | (reviewer to fill) | Plan Your Visit weather card |
| Feels like | Pakiramdam na parang | (reviewer to fill) | Weather metric |
| Humidity | Alinsangan | (reviewer to fill) | Weather metric |
| Wind | Hangin | (reviewer to fill) | Weather metric |

Check the Filipino terms with a native speaker too. These are suggestions.

## Review backlog

`docs/TRANSLATION_BACKLOG.md` lists every string waiting for a reviewer and the pages with English written directly in the code. Regenerate it after changing translations: `npm run check:translations -- --markdown docs/TRANSLATION_BACKLOG.md`.

## Review process

1. A contributor adds EN and a first FIL and MRW draft.
2. A fluent speaker reviews FIL and MRW against the English meaning.
3. The reviewer's name and date are added to the review log.
4. Only then is the `TODO(mrw-review)` comment removed.

### Review log

| Date | Language | Keys or area | Reviewer | Status |
| --- | --- | --- | --- | --- |
| | MRW | `dataStatus.*` | | Pending (English placeholder) |

## Checking your work

- [ ] The same keys exist in `en.ts`, `fil.ts`, and `mrw.ts`
- [ ] `npm run typecheck` passes
- [ ] Switched to FIL and MRW and looked at every page that uses the new text
- [ ] Text fits at 360px with no overflow or wrapping problems
- [ ] Numbers, dates, phone numbers, and fees are identical to English
- [ ] Official names match the glossary
- [ ] Unreviewed Meranaw is marked with `TODO(mrw-review)` (`npm run check:translations` fails if one is missing)
- [ ] The language choice still saves after a refresh

## Future improvements

- Translate service content (requirements, steps, FAQs) once English is verified.
- Add indexable language URLs (`/fil/...`, `/mrw/...`) so each language can be found in search. This is a separate task, because today the language is switched in the browser and search engines see English only.
- Set the `lang` attribute on translated sections for screen readers.