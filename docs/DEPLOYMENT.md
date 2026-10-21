# Deployment Guide

How to publish BetterMarawi.org on Vercel, connect the domain, and keep it healthy after launch.

Related: `docs/SEO_GUIDE.md` (Search Console, sitemap), `docs/DATA_UPDATE_GUIDE.md` (data checks), `docs/data-sources.md` (verification log).

## Overview

| Item | Value |
| --- | --- |
| Host | Vercel |
| Framework | Next.js (App Router), detected automatically |
| Production branch | `main` |
| Working branch | `dev` (preview deployments) |
| Domain | `bettermarawi.org` |
| Node.js | Current LTS (set in Vercel project settings) |

How it works: every push to `main` deploys to production. Every push to another branch or pull request gets its own preview URL. Vercel installs dependencies and runs `next build` itself, so `node_modules` and `.next` are never uploaded.

## Before the first deploy (go-live gate)

Do not launch until these are done.

### Data
- [ ] Hotline numbers (CDRRMO, BFP, PNP, City Health Office/APMC) confirmed with each office and marked verified
- [ ] Mayor, Vice Mayor, and Sangguniang Panlungsod members confirmed against an official list
- [ ] Budget figures checked against the official ordinance or BLGF report
- [ ] Remaining unverified items still show the "Unverified" notice (never remove the badge without a source)
- [ ] `docs/data-sources.md` verification log is up to date

### Content and brand
- [ ] The site clearly says it is community-run, not the official city website (footer, About text, JSON-LD)
- [ ] No "Indang", "Cavite", or "Municipality" text anywhere: `grep -rni "indang\|cavite" src/ public/`
- [ ] Meranaw text is either reviewed by a fluent speaker or clearly falls back to English
- [ ] Share image looks right (see `docs/SEO_GUIDE.md`)

### Code
- [ ] Stop the dev server first (a running `next dev` can lock `.next` and fail the build)
- [ ] `npm run typecheck`, `npm run lint`, and `npm run build` pass locally
- [ ] All routes load, and the 404 page works
- [ ] No console errors or hydration warnings
- [ ] Tested on a real phone, including the QuickContacts bar and mobile menu
- [ ] `.env.local` is not in the repo, and no keys are in the code

### Repository
- [ ] `dev` is merged into `main` through a pull request
- [ ] `main` builds cleanly from a fresh clone: `git clone`, `npm install`, `npm run build`
- [ ] The repo is public. Make sure nothing private is in the files or history.

## Step 1: Merge to main

1. On GitHub, open a pull request from `dev` into `main`.
2. Read the file list. It should contain only work you recognize.
3. Merge. Do not force-push.

## Step 2: Create the Vercel project

1. Sign in at vercel.com with your GitHub account.
2. Choose **Add New, Project**, and import `mamangcao/BetterMarawi.org`. If the repo is missing, grant Vercel access to it under GitHub App permissions.
3. Leave the framework as Next.js and the defaults for build command and output.
4. Set **Production Branch** to `main` (Project Settings, Git).
5. Add environment variables if any exist (next section), then deploy.

You get a URL like `bettermarawi-org.vercel.app`. Test it before connecting the domain.

## Environment variables

| Variable | Needed? | Notes |
| --- | --- | --- |
| (none required today) | | The site is static and has no secrets |
| `NEXT_PUBLIC_SITE_URL` | Optional | Only if the code reads it. Production value: `https://bettermarawi.org` |

Rules:
- Add variables in Vercel under Project Settings, Environment Variables. Never commit them.
- A variable starting with `NEXT_PUBLIC_` is visible to everyone. Never put a key in one.
- Server-only keys (for example a future contact form email service) have no prefix and are used only in route handlers or server actions.
- Keep `.env.example` updated with placeholder names only.
- After changing a variable, redeploy so it takes effect.

## Step 3: Connect the domain

1. In Vercel, open the project, then **Settings, Domains**, and add `bettermarawi.org`.
2. Also add `www.bettermarawi.org` and set it to redirect to `bettermarawi.org`.
3. Vercel shows the DNS records to create. At your domain registrar, add exactly those (typically an A record for the root domain and a CNAME for `www`). Use the values Vercel displays, not values from memory.
4. Wait for DNS to propagate (minutes to a few hours). Vercel issues the HTTPS certificate automatically.
5. Confirm both `https://bettermarawi.org` and the `www` redirect load with a padlock.

Make sure `metadataBase` and `SITE_CONFIG` use `https://bettermarawi.org` (see `docs/SEO_GUIDE.md`).

## Step 4: Check the live site

On the production URL:

- [ ] Home, one page from each menu (Services, Government, Transparency, Statistics), Contact, and the 404 page load
- [ ] `/sitemap.xml` and `/robots.txt` load and use the `bettermarawi.org` domain
- [ ] The page title, description, and canonical are correct (View Source)
- [ ] JSON-LD passes Google's Rich Results Test on the home page and one service page
- [ ] The share image shows correctly in Facebook's Sharing Debugger and in Messenger
- [ ] Language switcher, mobile menu, dropdowns, QuickContacts, and the FX ticker work
- [ ] CSV and JSON downloads work
- [ ] Phone numbers open the dialer on a phone
- [ ] Unverified badges and notices appear where expected

## Step 5: Get found

Follow the launch checklist in `docs/SEO_GUIDE.md`:

1. Add the site to Google Search Console and verify the domain (a DNS TXT record at the registrar).
2. Submit `https://bettermarawi.org/sitemap.xml`.
3. Optional: add Bing Webmaster Tools.

## Preview deployments (the `dev` branch)

- Every push to `dev` creates a preview URL in the Vercel dashboard and on GitHub pull requests.
- Use previews to check changes on a real phone before merging.
- Preview URLs are not meant for sharing publicly. Vercel marks previews as not indexable by default, but confirm that in the project's settings and do not link to them.

## Updating the live site

1. Work on `dev`, following `docs/CONTRIBUTING.md`.
2. Check the preview URL.
3. Open a pull request into `main` and merge.
4. Vercel deploys automatically. Check the live pages you changed.

For urgent fixes (wrong hotline, wrong fee), fix the data on `dev`, merge quickly, and note the correction in `docs/data-sources.md`.

## Rollback

If a deploy breaks the site:

1. In Vercel, open **Deployments**, find the last good production deployment, and choose **Promote to Production** (or **Instant Rollback**).
2. Then fix the problem on `dev` and merge again.

Do not use `git push --force` to undo a bad merge. Use `git revert` on `main` through a pull request.

## Troubleshooting

| Problem | Likely cause and fix |
| --- | --- |
| Build fails on Vercel but works locally | Vercel runs Linux, where file names are case-sensitive. Check import paths and file name capitalization. Also compare Node versions. |
| Build fails locally with a locked `.next` file | `next dev` is still running. Stop it and run `rm -rf .next`. |
| Page shows old content | Hard refresh, then check that the deploy finished and used `main`. |
| Domain shows "Invalid configuration" | DNS records do not match Vercel's. Re-check each value at the registrar. |
| HTTPS certificate pending | DNS has not propagated. Wait, and make sure no old records conflict. |
| Environment variable is undefined | It is missing for the Production environment, or the site was not redeployed after adding it. |
| Share preview shows the wrong image | Facebook caches previews. Use Sharing Debugger and choose Scrape Again. |
| Fonts or peso sign look wrong | Check the `next/font` subsets include `latin-ext`. |

## Security and privacy

- Never commit `.env*` files (except `.env.example`) or tokens.
- The repository is public. Do not store personal data of residents in code, data files, or commit messages.
- Rotate any key that was ever exposed. Anything that appeared in a public commit counts as exposed, even after deletion.
- Use GitHub two-factor authentication on the accounts that can merge to `main` and manage Vercel.
- Contact forms (eFOI, public assistance) do not send data anywhere yet. Before launch, either connect a real backend or state clearly on the page that submissions are not sent. Never collect personal data without a privacy notice and a safe place to store it.

## Costs and ownership

- Vercel's free Hobby plan is meant for personal, non-commercial projects. A community civic project may fit, but check Vercel's current terms, and consider the Pro plan or an alternative host if the project grows or accepts funding.
- The domain renews yearly. Put the renewal date in a calendar and turn on auto-renew.
- Keep at least two trusted people with access to the domain registrar, Vercel, and GitHub, so the site does not depend on one person.
- Record who owns each account in a private place, not in this repo.

## After launch (monthly)

- [ ] Check Search Console for errors and indexing problems
- [ ] Re-check hotline numbers and officials
- [ ] Review the verification log and clear "Unverified" items as sources are confirmed
- [ ] Review Vercel for failed deployments
- [ ] Update dependencies and run the full build