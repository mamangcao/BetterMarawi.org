# Data Sources

All public information on BetterMarawi.org comes from official government sources. This file records where each dataset came from and when it was last verified.

**Rule:** never publish a figure, name, or phone number that is not traceable to a source below. If a value is a placeholder or sample, label it clearly or leave it out.

## How to use this file

- Add a row whenever you add or change data.
- Record the exact page or document, not just the website.
- Update "Last verified" every time you check the value against the source.
- Follow the three verification levels:
  - **Unverified:** Default state. Not yet checked against an official document or source.
  - **Sourced:** Checked against an authoritative national portal or published dataset. **Rule:** "sourced" requires a recorded source URL and retrieval date, and a comparison against the official file.
  - **Confirmed:** Rigorously confirmed directly with City Hall, official local gazette, enacted ordinance, or tested live line.

## National sources

| Source | Website | Covers | Used in |
| --- | --- | --- | --- |
| Bureau of Local Government Finance (BLGF) | blgf.gov.ph | City income, spending, and special funds | `src/data/finances.ts`, Annual Budget page |
| Philippine Statistics Authority (PSA) | psa.gov.ph | Population, census, demographics. Content is CC BY 4.0: attribute "Philippine Statistics Authority" wherever it is shown | `src/data/barangays.ts`, city profile |
| DTI CMCI Portal | cmci.dti.gov.ph | Cities and Municipalities Competitiveness Index | `src/data/cmci.ts`, DTI CMCI page |
| Department of the Interior and Local Government (DILG) | dilg.gov.ph | Full Disclosure Policy, SGLG, local government rules | `src/data/fdp.ts`, transparency pages |
| Commission on Audit (COA) | coa.gov.ph | Annual audit reports | Transparency documents |
| PhilGEPS | philgeps.gov.ph | Government procurement notices | Transparency documents |
| Philippine Statistics Authority: PSGC | psa.gov.ph | Official barangay codes and names | `src/data/barangays.ts` |
| PhilHealth | philhealth.gov.ph | YAKAP and health benefits | Health services page |
| DICT eFOI Portal | foi.gov.ph | Freedom of Information requests | FOI page |
| PAGASA | pagasa.dost.gov.ph | Climate profile and severe weather warnings | City profile |
| Open-Meteo | open-meteo.com | Real-time weather and forecast data (CC BY 4.0). Forecast-model data, not official PAGASA readings | Header ticker, Plan Your Visit (CultureSpotlight), Footer |
| ExchangeRate-API | exchangerate-api.com | Daily currency exchange rates (USD, SAR, AED, JPY, etc.) | FX ticker, Footer |

## Local and regional sources (Marawi City, Lanao del Sur, BARMM)

| Source | Covers | Used in |
| --- | --- | --- |
| Islamic City of Marawi city government (City Hall) | Officials, departments, ordinances, Citizen's Charter, fees, office hours | `officials.ts`, `departments.ts`, `ordinances.ts`, `services.ts` |
| Sangguniang Panlungsod of Marawi | Ordinances, resolutions, committees | Legislative page |
| City Disaster Risk Reduction and Management Office (CDRRMO) | Hotlines, evacuation hubs, hazard info | Disaster preparedness, QuickContacts |
| City Health Office and Amai Pakpak Medical Center (APMC) | Health services, hotlines | Health services, QuickContacts |
| City Social Welfare and Development Office (CSWDO) | Social welfare programs | Social welfare page |
| Business Permits and Licensing Office (BPLO) | Permit steps and fees | Business and livelihood page |
| City Planning and Development Office (CPDO) | Zoning, land use, city profile | Housing and land use page |
| Bureau of Fire Protection and Philippine National Police (Marawi) | Station hotlines | QuickContacts |
| BARMM Ministry of Social Services and Development (MSSD) | AICS and social assistance | Social welfare page |
| BARMM Ministry of Basic, Higher and Technical Education (MBHTE) | Schools, Madrasah (ALIVE) | Education page |
| BARMM Ministry of Agriculture, Fisheries and Agrarian Reform (MAFAR) | Agriculture and fisheries services | Agriculture page |
| Mindanao State University (MSU) Marawi | Scholarships, tourism and cultural information | Education, tourism |
| Task Force Bangon Marawi | Rehabilitation, shelter sites | Housing page |
| Marawi City Water District (MCWD) | Water connection | Infrastructure page |
| Department of Tourism and city tourism office | Visitor information | Tourism page |

## Verification log

Use one row per data file or dataset. Status must be **Unverified**, **Sourced**, or **Confirmed**.

| Data file | Dataset | Source and exact page or document | Date of source | Verified by | Last verified | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `finances.ts` | City finances 2021–2025, spending by sector (2025), LDRRMF and SEF (2018–2025) | BLGF LGU fiscal data, https://blgf.gov.ph/lgu-fiscal-data/ | 2021–2025 (FY2025 preliminary) | Claude Code | October 23, 2026 | Sourced. Replaces the unsourced FY 2026 budget (`budget.ts`, deleted) |
| `reports.ts` | COA FY2020 audit summary; LGSF projects; 13 NCA and SARO releases | COA annual audit report (MarawiCity_LDS_ES2020.pdf, archived copy on web.archive.org); DBM NCA and SARO release files (dbm.gov.ph) | 2020–2025 | Claude Code | October 23, 2026 | Sourced |
| `cityProfile.ts` | City history (1940, 1956), density, and growth since 2020 | CA 592 (lawyerly.ph); RA 1552 (lawphil.net); PSA 2020 and 2024 census and PSGC land area | 1940–2024 | Claude Code | October 23, 2026 | Sourced (density and growth computed from PSA figures) |
| `ordinanceGuide.ts` | How an ordinance becomes law (4 steps) and 6 FAQs on the Legislative page | Bangsamoro Local Governance Code of 2023 (BAA No. 49), BARMM Official Gazette PDF, ss. 56, 57, 62–65, 67, 212, 213, 576 | 2023 | Claude Code | October 24, 2026 | Sourced (each step and answer cites its section) |
| `officials.ts` | Mayor, Vice Mayor (owner-verified), 10 City Councilors (2025 results), ex-officio seats (to be confirmed) | Rappler 2025 Marawi results (COMELEC transmission data); Wikipedia, Marawi; site owner | 2025-05-12 election | Claude Code | October 22, 2026 | Sourced (ex-officio unverified; confirm councilors against COMELEC canvass) |
| `barangayLeaders.ts` | Punong Barangay (98 of 101), SK Chairperson (76), and barangay contact numbers (36) | DILG Barangay Officials Directory (https://www.dilg.gov.ph/barangay-officials-directory/search), compiled by the site owner | 2023–2026 term, as of September 2026 | Site owner, Claude Code | October 22, 2026 | Sourced. 3 barangays not in DILG directory. Update after the November 2, 2026 barangay elections |
| `cityOffices.ts` | City offices for the officials directory: names and descriptions from departments.ts, handled transactions from the sourced certificates and business data | departments.ts (descriptions unverified); certificates.ts and businessServices.ts | | Claude Code | October 22, 2026 | Heads, locations, phones, emails not shown (unverified) |
| `departments.ts` | Office names, mandates, locations, key services; heads only for the Mayor and Vice Mayor | Heads: see `officials.ts` | | Claude Code | October 23, 2026 | Phones and emails removed (unsourced; marawicity.gov.ph does not resolve). Other heads show "To be confirmed". Mandates and locations still unverified |
| `barangays.ts` | 101 Barangays (names, 10-digit and correspondence codes, Urban/Rural, 2024 POPCEN) | PSA PSGC page for the City of Marawi, https://psa.gov.ph/classification/psgc/barangays/1903617000 (table pasted by site owner; PSA blocks automated fetch). CC BY 4.0, attribute PSA | 2025-07-31 (PSGC), 2024 POPCEN | Claude Code | October 21, 2026 | Sourced. Total of 101 corroborated by PSA PSGC updates: Datu Dalidigan and Boganga II added Q1 2023 (https://psa.gov.ph/classification/psgc/node/176698); Sultan Corobong, Sultan Panoroganan, and Angoyao added Q1 2024 (https://psa.gov.ph/system/files/scd/Final-Press-Release-1Q2024PSGC.pdf). 96 + 5 = 101 |
| `services.ts` | Requirements, fees, steps, locations, hours | Citizen's Charter | | Claude Code | October 23, 2026 | Hotlines and emails removed (unsourced). Fees, steps, processing times, and cited local ordinances still unverified; pages show a notice |
| `healthFacilities.ts` | Hospitals and infirmaries (9), RHUs (4), barangay health stations and centers (30 + 24), City Health Unit, Marawi City General Hospital status | PhilHealth List of Accredited Hospitals and Infirmaries CY 2026 (HOSP_093026.pdf, as of Sept 30, 2026); PIA June 9, 2023 (CHO report); BARMM Sept 28, 2021 (BHS turnover); PIA Oct 2026 (MCGH); RA 12207 | 2021–2026 | Claude Code | October 22, 2026 | Sourced (BHS and RHU counts are from 2023 and should be re-confirmed with the City Health Office) |
| `businessServices.ts` | Business services in the shared transactions format (7 transactions, BPLO and City Treasurer offices with steps): new permit, renewal, business tax, cedula, barangay business clearance, retirement, real property tax | Marawi City BPLO System portal (bplomarawicity.com); RA 11032 Sec. 9 and 11; RA 7160 Sec. 145, 157–161, 165–168 (LawPhil) | 1991–2026 | Claude Code | October 22, 2026 | Sourced for national-law figures; city-set fees (Marawi Revenue Code) not yet published, shown as "set by the city" |
| `certificates.ts` | Certificates and clearances (21) and issuing offices (9): PSA documents, local civil registry, Shari'a registrar, barangay certificates, police and NBI clearances, city certificates | PSA BARMM press release on the CRS Marawi City Outlet (Feb 26, 2025); PSA fee notice and Serbilis advisory; NBI and PNP clearance portals; RA 11261; RA 11032; RA 9048/10172; PD 1083 | 1977–2026 | Claude Code | October 22, 2026 | Sourced for national and agency fees; city and barangay fees and all processing times not yet published; office steps are general guides |
| `fdp.ts` | FDP documents posted for 2026 (14 documents, links to each posted file) | DILG FDP Portal, https://fdpp.dilg.gov.ph/ (Marawi City) | 2026 | Claude Code | October 23, 2026 | Sourced |
| `ordinances.ts` | Enacted ordinances (list is empty) | Sangguniang Panlungsod records | | Claude Code | October 23, 2026 | Emptied: the 6 earlier entries had no source and their sponsors contradicted the 2025 election results. Add only from official copies |
| `cmci.ts` | CMCI 5 Pillars & Composite (2024 Cycle) | DTI CMCI LGU profile, https://cmci.dti.gov.ph/lgu-profile.php?lgu=Marawi (re-checked, all values match) | 2024 | Claude Code | October 21, 2026 | Sourced |
| `site.ts`, `jsonld.ts` | City Hall address and official Facebook page | DTI CMCI LGU profile, https://cmci.dti.gov.ph/lgu-profile.php?lgu=Marawi. Address also confirmed by the site owner from local knowledge | 2026-10-21 | Claude Code | October 21, 2026 | Sourced |
| `site.ts` | Emergency hotlines | 911: EO No. 56, s. 2018 (https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/5/83090). CDRRMO, BFP, PNP, CHO: no source | | Claude Code | October 23, 2026 | 911 sourced; local numbers labelled Unverified on the site. Unused unsourced trunkline, emergency, CDRRMO, and Gmail entries removed |
| `verification.ts` | City Profile (Demographics & Baseline) | PSA PSGC & 2024 POPCEN (psa.gov.ph) | 2025-07-31 | Antigravity | October 21, 2026 | Sourced |

## Open questions

- Items waiting on a reply from City Hall or another office:
  - (add here)
