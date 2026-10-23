# Known Issues and Help Wanted

What is still unfinished on BetterMarawi.org, and how you can help. Fixed issues are in the Git history; verified facts and their sources are in `docs/VERIFICATION_CHECKLIST.md`.

## Information that needs an official source

Most of these are shown on the site with an **Unverified** label or "To be confirmed" (the SP session time is not labelled yet). Do not fill them in from memory or other websites. If you have an official document, open an issue with a link or a photo of it.

| Information | Where it appears | Where to find a source |
| --- | --- | --- |
| CDRRMO and PNP phone numbers | Contact page, hotline bar | The offices themselves; PNP Lanao del Sur Provincial Office; OCD BARMM |
| Service fees | Each service page | Each office's Citizen's Charter; BPLO; City Treasurer |
| City revenue code (shown as "To be confirmed" on fees) | Service pages | Sangguniang Panlungsod; City Treasurer |
| Heads of 8 city departments ("To be confirmed") | Government › Departments | City Hall; Civil Service Commission records |
| SP session schedule ("Tuesdays, 9:00 AM") | Government sidebar | Sangguniang Panlungsod secretariat |

## Translation

Filipino is mostly translated but has not been reviewed by a fluent speaker. Meranaw is mostly English placeholders waiting for a fluent speaker. Do not use machine translation for Meranaw. The full list of strings is in `docs/TRANSLATION_BACKLOG.md`, and the rules are in `docs/TRANSLATION_GUIDE.md`.

Text written directly in the server-rendered pages is English only. Translating it needs a design decision first (for example `/fil` and `/mrw` page addresses).

## Testing that needs a person

The automated checks (`npm run check:*`) run in Chrome only. Not yet done:

- A screen reader pass (NVDA, VoiceOver, or TalkBack)
- Safari on an iPhone and Chrome on a real Android phone
- Firefox
- A Lighthouse or Core Web Vitals check, and timing page navigation on a slow phone

## Small fixes anyone can pick up

- Service page descriptions are about 230 characters; aim for about 160 (`src/app/services/[slug]/page.tsx`).
- Phone numbers in the contact page's emergency panel wrap in the middle of the number on narrow screens.
- `ContactForm` and `FOIRequestForm` no longer contain a form, only a notice; rename them to match.
- Section 3 of `docs/VERIFICATION_CHECKLIST.md` lists names for the 8 unconfirmed department heads that the site no longer shows.
- The tourism directory says "Registered", but there is no source for an official registry.
- The 2026 Annual Budget Report download on the DILG FDP Portal (id 227136) returned a server error on 2026-10-23. Re-check it and update `src/data/fdp.ts` if DILG reposts the file.

## Decisions for the maintainers

- **Meranaw page language:** in Meranaw mode the page is marked `lang="mrw"`, but most of the text is still English. Options: mark untranslated text as English, or keep `lang="en"` until more is translated.
- **Content Security Policy:** it reports problems but does not block anything yet. Switch to enforcing it after a period with no reported problems.
- **Next.js 16 upgrade:** needed to clear a security advisory in a build-time dependency (low practical risk) and to replace the deprecated `next lint`. Plan it as its own change with full testing.

## Kept on purpose

- **Repeated barangay phone numbers:** DILG publishes some numbers for more than one barangay. They are kept as published unless a source shows one is wrong.
- **"Ordinances and resolutions" link label:** kept by the maintainers; ordinances will be listed once sourced.
- **English shows first:** a saved Filipino or Meranaw choice shows English for a moment on page load. That avoids a server/browser mismatch on pre-rendered pages.

## Before public launch

1. Run every check in "Commands" in `AGENTS.md` on the commit you will deploy.
2. Do one manual pass with a screen reader, an iPhone (Safari), and an Android phone.
3. Confirm the CDRRMO and PNP numbers with the offices, or confirm the decision to show them labelled "Unverified".
4. Follow the launch checklists in `docs/SEO_GUIDE.md` and `docs/DEPLOYMENT.md`.
