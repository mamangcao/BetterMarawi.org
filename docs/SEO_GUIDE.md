# SEO Guide

How BetterMarawi.org is found in search engines and shared on social media. Pages are rendered on the server, so search engines see titles, descriptions, and structured data without running JavaScript.

Related: `docs/CONTENT_GUIDE.md` (writing), `docs/DEPLOYMENT.md` (domain and Search Console).

## Principles

1. Helpful content for citizens comes first. SEO follows from clear, accurate pages.
2. Every page has a unique title, description, and canonical URL.
3. Structured data (JSON-LD) must match what is visible on the page. Never add data that is not shown.
4. Do not publish unverified facts to improve ranking.
5. Language switching is browser-side, so search engines see English only (see "Languages").

## Where SEO lives

| What | Where |
| --- | --- |
| Site constants (name, URL, geo, contact) | `src/config/site.ts` (`SITE_CONFIG`) |
| Metadata builder, breadcrumb helper | `src/lib/seo.ts` (`buildMetadata`, `getRouteBreadcrumbs`) |
| JSON-LD builders | `src/lib/jsonld.ts` |
| Route list (navbar, sitemap) | `src/lib/routes.ts` (`APP_ROUTES`) |
| Sitemap | `src/app/sitemap.ts` (serves `/sitemap.xml`) |
| Robots | `src/app/robots.ts` (serves `/robots.txt`) |
| Icons and share images | `src/app/icon.png`, `src/app/apple-icon.png`, `src/app/opengraph-image.png`, `public/branding/logo.png` |
| Per-page metadata | `metadata` or `generateMetadata` export in each `page.tsx` |

Production URL: `https://bettermarawi.org`. It is set as `metadataBase`, so relative URLs resolve correctly.

## Page metadata

Each `page.tsx` exports metadata built with the `buildMetadata` helper in `src/lib/seo.ts` (or `generateMetadata` for dynamic routes like `/services/[slug]`).

| Field | Rule |
| --- | --- |
| Title | Unique, about 50 to 60 characters, page topic first. `buildMetadata` appends ` \| BetterMarawi.org` automatically (matching the title template in `src/app/layout.tsx`). |
| Description | Unique, about 140 to 160 characters, says what the page helps you do. Plain language. |
| Canonical | One URL per page, no trailing slash, no query strings. |
| Open Graph | Title, description, URL, site name, share image (`/branding/logo.png`, 1200 x 630 px). |
| Twitter | Large summary card (`summary_large_image`) with the same title, description, and share image. |

Good examples:

```
Title:       Business Permits and Livelihood
Description: Apply for a Mayor's Permit in Marawi City. See the requirements, steps, fees, and where to go.
```

Avoid:

- Same title or description on several pages
- Keyword stuffing ("Marawi services best city government Marawi")
- Titles that are only the site name
- Descriptions copied from official documents

## Structured data (JSON-LD)

Rendered via the `<JsonLd data={...} />` component (`src/components/seo/JsonLd.tsx`) in server components, using builders from `src/lib/jsonld.ts`.

| Type | Builder | Where | Notes |
| --- | --- | --- | --- |
| `GovernmentOrganization` | `buildGovernmentOrganizationSchema()` | Root layout (`src/app/layout.tsx`) | Official city government entity with name, alternate names, URL, address, geo coordinates from `SITE_CONFIG.geo` (8.0034, 124.2851), and contact info. |
| `BreadcrumbList` | `buildBreadcrumbSchema(breadcrumbs)` | All pages (`page.tsx`) | Built from `getRouteBreadcrumbs(pathname)` (or `[{ name: 'Home', url }]` on the home page) in order: Home, section, page. |
| `GovernmentService` | `buildGovernmentServiceSchema(service, pageUrl)` | The 11 `/services/[slug]` pages | Service operator, area served, audience, requirements in terms of service. |
| `FAQPage` | `buildFAQSchema(faqs)` | Pages that show FAQs (`/services/[slug]`, `/transparency/*`) | Only questions and answers shown on the page. |

Rules:

- Every value in JSON-LD must also appear on the page or come from the same data.
- Phone numbers, hours, and fees come from the data files, never typed separately.
- Test every new type with Google's Rich Results Test and the Schema.org validator.
- Do not mark up unverified data as official. If a page is mostly unverified, keep JSON-LD minimal until it is checked.

## Sitemap and robots

- `sitemap.xml` is generated from `APP_ROUTES` in `src/lib/routes.ts`. Add a new page to the route registry and it appears in the sitemap and navbar automatically.
- Each entry includes `url`, `lastModified` (dynamically set to current date in `src/app/sitemap.ts`), `changeFrequency`, and `priority` from `APP_ROUTES`.
- `robots.txt` allows crawling (`allow: '/'`) for all user agents and points to `${SITE_CONFIG.url}/sitemap.xml`.
- The `/sitemap` page is a human-readable list of pages. It is not the XML file.
- Block anything private or temporary (for example preview or admin paths) in `src/app/robots.ts`.

## URLs

- Lowercase, hyphens, no spaces, readable: `/services/health-services`
- Never change a published URL. If you must, add a permanent redirect in `next.config.ts` from the old path to the new one.
- A removed page should redirect to the closest topic page, not return an error.
- Service slugs are fixed once published (see `docs/DATA_UPDATE_GUIDE.md`).

## Content for search

- One clear H1 per page. Use H2 and H3 in order.
- Put the answer first: who it is for, what to bring, where to go.
- Use the words citizens search for: "business permit", "birth certificate", "garbage collection schedule", not internal office jargon.
- Write descriptive link text ("Read the Citizen's Charter"), never "click here".
- Add alt text to every meaningful image.
- Show a "Last updated" date. Fresh, correct pages earn trust.
- Link related pages to each other (service to department, service to FAQ).

## Images and share previews

- Use `next/image` so images are sized and optimized.
- Share image: 1200 x 630 px, readable text, logo, brand colors (`public/branding/logo.png`).
- Test shared links on Facebook (Sharing Debugger) and Messenger, since most Philippine sharing happens there.

## Performance and accessibility

Search engines reward fast, accessible pages.

- Target Core Web Vitals in the "good" range (LCP under 2.5 s, CLS under 0.1, INP under 200 ms).
- Load fonts through `next/font`. Avoid layout shift from images and tickers.
- Keep pages mobile friendly. Most visitors will use phones.
- Keep contrast and keyboard access passing (see `docs/DESIGN_SYSTEM.md`).

## Languages

- The EN, FIL, and MRW switch changes text in the browser. Metadata and JSON-LD stay in English.
- Search engines see only the English version today.
- Indexable language URLs (`/fil/...`, `/mrw/...`) with `hreflang` tags are a future task. Do not add `hreflang` until those pages exist.

## Launch checklist (once, at deployment)

- [ ] `metadataBase` is `https://bettermarawi.org`
- [ ] `/sitemap.xml` and `/robots.txt` load on the live site
- [ ] Every page has a unique title, description, and canonical
- [ ] JSON-LD passes the Rich Results Test on a service page, a breadcrumb page, and the home page
- [ ] Share image works on Facebook and Messenger
- [ ] Site added to Google Search Console and the domain verified
- [ ] `sitemap.xml` submitted in Search Console
- [ ] Optional: Bing Webmaster Tools added
- [ ] No placeholder or "noindex" settings left from development

## Ongoing checklist (when you add or change a page)

- [ ] Title and description are unique and accurate
- [ ] Route added to `src/lib/routes.ts`
- [ ] JSON-LD matches visible content
- [ ] Breadcrumbs show the right path
- [ ] Links to the page from related pages
- [ ] `npm run build` passes
- [ ] Checked the rendered HTML (View Source) for the title, description, and JSON-LD

## Monitoring

After launch, check Search Console monthly:

- Pages not indexed, and why
- Search queries people use (feeds the "popular services" choice)
- Core Web Vitals and mobile usability errors
- Structured data errors

## Do not

- Do not hide text or links for search engines
- Do not buy links or use link schemes
- Do not copy content from other sites
- Do not use unverified claims in titles or descriptions
- Do not change the canonical domain after launch without redirects

- Do not change the canonical domain after launch without redirects