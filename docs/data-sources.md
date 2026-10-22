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
| Bureau of Local Government Finance (BLGF) | blgf.gov.ph | Budget, financial reports, revenue data | `src/data/budget.ts`, reports pages |
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
| `budget.ts` | FY 2026 General Appropriation Ordinance | | | | | Unverified |
| `officials.ts` | Mayor, Vice Mayor, SP members | | | | | Unverified |
| `departments.ts` | Department heads and mandates | | | | | Unverified |
| `barangays.ts` | 101 Barangays (names, 10-digit and correspondence codes, Urban/Rural, 2024 POPCEN) | PSA PSGC page for the City of Marawi, https://psa.gov.ph/classification/psgc/barangays/1903617000 (table pasted by site owner; PSA blocks automated fetch). CC BY 4.0, attribute PSA | 2025-07-31 (PSGC), 2024 POPCEN | Claude Code | October 21, 2026 | Sourced |
| `services.ts` | Requirements, fees, steps | Citizen's Charter | | | | Unverified |
| `healthFacilities.ts` | Hospitals and infirmaries (9), RHUs (4), barangay health stations and centers (30 + 24), City Health Unit, Marawi City General Hospital status | PhilHealth List of Accredited Hospitals and Infirmaries CY 2026 (HOSP_093026.pdf, as of Sept 30, 2026); PIA June 9, 2023 (CHO report); BARMM Sept 28, 2021 (BHS turnover); PIA Oct 2026 (MCGH); RA 12207 | 2021–2026 | Claude Code | October 22, 2026 | Sourced (BHS and RHU counts are from 2023 and should be re-confirmed with the City Health Office) |
| `fdp.ts` | FDP disclosures | DILG FDP portal | | | | Unverified |
| `ordinances.ts` | Enacted ordinances | Sangguniang Panlungsod records | | | | Unverified |
| `cmci.ts` | CMCI 5 Pillars & Composite (2024 Cycle) | DTI CMCI LGU profile, https://cmci.dti.gov.ph/lgu-profile.php?lgu=Marawi (re-checked, all values match) | 2024 | Claude Code | October 21, 2026 | Sourced |
| `site.ts`, `jsonld.ts` | City Hall address and official Facebook page | DTI CMCI LGU profile, https://cmci.dti.gov.ph/lgu-profile.php?lgu=Marawi. Address also confirmed by the site owner from local knowledge | 2026-10-21 | Claude Code | October 21, 2026 | Sourced |
| `site.ts` | Hotline numbers | CDRRMO, BFP, PNP, CHO | | | | Unverified |
| `verification.ts` | City Profile (Demographics & Baseline) | PSA PSGC & 2024 POPCEN (psa.gov.ph) | 2025-07-31 | Antigravity | October 21, 2026 | Sourced |

## Open questions

- Items waiting on a reply from City Hall or another office:
  - (add here)
