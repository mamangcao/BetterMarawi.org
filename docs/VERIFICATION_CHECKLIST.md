# Data Verification Checklist

This document tracks verification for public civic data displayed on BetterMarawi.org, including emergency hotlines, elected officials, department leadership, city budget figures, city profile demographics, DTI CMCI competitiveness indicators, and the 101 barangays master directory.

## How to Use This File

1. Check the official government source (e.g., place a call, inspect the official gazette or enacted ordinance, or verify against official government portals).
2. Record the exact source (URL, ordinance number, or phone log), confirmed value, verifier name, and date.
3. Update the `Status` column from `Unverified` to `Verified` only when confirmed.
4. **Never mark Verified without a source and a date.**
5. Once verified in this document, update the corresponding data file in `src/` to reflect verified status (`verified: true`).

---

## 1. Hotlines

> **Suggested source:** Call each department and emergency service office directly during regular government business hours (Monday–Friday, 8:00 AM–5:00 PM), or verify against official notices published by the Marawi City Hall, CDRRMO, BFP, PNP, or CHO.

| Item | Current value in code | File | Official source | Confirmed value | Verified by | Date | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| City Hall Trunkline / General Hotline | `+63 (063) 520-2100` | `src/config/site.ts` | | | | | Unverified |
| Emergency Hotline | `911 / (063) 520-2911` | `src/config/site.ts` | | | | | Unverified |
| CDRRMO Hotline (contact config) | `+63 (063) 520-3000` | `src/config/site.ts` | | | | | Unverified |
| CDRRMO Emergency Hotline | `(063) 352-0117` | `src/config/site.ts` | | | | | Unverified |
| City Fire Station (BFP) | `0907-022-4843` (was `0917-842-9910`) | `src/config/site.ts` | Site owner | 0907-022-4843 | Site owner | 2026-10-23 | Verified |
| City Police Station (PNP) | `0998-598-6678` | `src/config/site.ts` | | | | | Unverified |
| Amai Pakpak Medical Center (APMC) | `(063) 876 0001` (was CHO / APMC `(063) 221-2536`) | `src/config/site.ts` | Site owner | (063) 876 0001 | Site owner | 2026-10-23 | Verified. `(063) 221-2536` is no longer attributed to APMC; it remains on the home slide as the CHO number, unverified |

---

## 2. Officials

> **Suggested source:** City Hall Executive Office, Sangguniang Panlungsod records, the official COMELEC certificate of canvass and proclamation, or the DILG BARMM official directory of local elected officials.

| Item | Current value in code | File | Official source | Confirmed value | Verified by | Date | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Hon. Shariff Zain Lanto Gandamra (Name) | `Hon. Shariff Zain Lanto Gandamra` | `src/data/officials.ts` | Site owner (local knowledge, current officeholders); photos from the official Facebook group photo | Hon. Shariff Zain Lanto Gandamra | Site owner | 2026-10-22 | Verified by site owner (not yet checked against COMELEC or DILG records) |
| Hon. Shariff Zain Lanto Gandamra (Position) | `City Mayor` | `src/data/officials.ts` | Site owner (local knowledge, current officeholders); photos from the official Facebook group photo | City Mayor · Local Chief Executive, Office of the City Mayor | Site owner | 2026-10-22 | Verified by site owner (not yet checked against COMELEC or DILG records) |
| Hon. Shariff Zain Lanto Gandamra (Term) | `2025–2028` | `src/data/officials.ts` | Site owner (local knowledge, current officeholders); photos from the official Facebook group photo | 2025–2028 | Site owner | 2026-10-22 | Verified by site owner (not yet checked against COMELEC or DILG records) |
| Hon. Majul Usman Gandamra (Name) | `Hon. Majul Usman Gandamra` | `src/data/officials.ts` | Site owner (local knowledge, current officeholders); photos from the official Facebook group photo | Hon. Majul Usman Gandamra | Site owner | 2026-10-22 | Verified by site owner (not yet checked against COMELEC or DILG records) |
| Hon. Majul Usman Gandamra (Position) | `City Vice Mayor` | `src/data/officials.ts` | Site owner (local knowledge, current officeholders); photos from the official Facebook group photo | City Vice Mayor · Presiding Officer, Sangguniang Panlungsod | Site owner | 2026-10-22 | Verified by site owner (not yet checked against COMELEC or DILG records) |
| Hon. Majul Usman Gandamra (Term) | `2025–2028` | `src/data/officials.ts` | Site owner (local knowledge, current officeholders); photos from the official Facebook group photo | 2025–2028 | Site owner | 2026-10-22 | Verified by site owner (not yet checked against COMELEC or DILG records) |
| Hon. Mohammad Shaquille L. Gandamra (City Councilor) | `Hon. Mohammad Shaquille L. Gandamra` | `src/data/officials.ts` | Rappler 2025 results (COMELEC transmission data) and Wikipedia, Marawi | Elected City Councilor, 2025–2028 | Claude Code | 2026-10-22 | Sourced (confirm against COMELEC canvass) |
| Hon. Sajid D. Munder (City Councilor) | `Hon. Sajid D. Munder` | `src/data/officials.ts` | Rappler 2025 results (COMELEC transmission data) and Wikipedia, Marawi | Elected City Councilor, 2025–2028 | Claude Code | 2026-10-22 | Sourced (confirm against COMELEC canvass) |
| Hon. Lailyn M. Dimal (City Councilor) | `Hon. Lailyn M. Dimal` | `src/data/officials.ts` | Rappler 2025 results (COMELEC transmission data) and Wikipedia, Marawi | Elected City Councilor, 2025–2028 | Claude Code | 2026-10-22 | Sourced (confirm against COMELEC canvass) |
| Hon. Borgie B. Dalidig (City Councilor) | `Hon. Borgie B. Dalidig` | `src/data/officials.ts` | Rappler 2025 results (COMELEC transmission data) and Wikipedia, Marawi | Elected City Councilor, 2025–2028 | Claude Code | 2026-10-22 | Sourced (confirm against COMELEC canvass) |
| Hon. Sultan Jawar R. Domato (City Councilor) | `Hon. Sultan Jawar R. Domato` | `src/data/officials.ts` | Rappler 2025 results (COMELEC transmission data) and Wikipedia, Marawi | Elected City Councilor, 2025–2028 | Claude Code | 2026-10-22 | Sourced (confirm against COMELEC canvass) |
| Hon. Nasrollah M. Basman (City Councilor) | `Hon. Nasrollah M. Basman` | `src/data/officials.ts` | Rappler 2025 results (COMELEC transmission data) and Wikipedia, Marawi | Elected City Councilor, 2025–2028 | Claude Code | 2026-10-22 | Sourced (confirm against COMELEC canvass) |
| Hon. Sihawi A. Lala, Sr. (City Councilor) | `Hon. Sihawi A. Lala, Sr.` | `src/data/officials.ts` | Rappler 2025 results (COMELEC transmission data) and Wikipedia, Marawi | Elected City Councilor, 2025–2028 | Claude Code | 2026-10-22 | Sourced (confirm against COMELEC canvass) |
| Hon. Mohammad Khalid M. Salic (City Councilor) | `Hon. Mohammad Khalid M. Salic` | `src/data/officials.ts` | Rappler 2025 results (COMELEC transmission data) and Wikipedia, Marawi | Elected City Councilor, 2025–2028 | Claude Code | 2026-10-22 | Sourced (confirm against COMELEC canvass) |
| Hon. Ozamah D. Macabangon (City Councilor) | `Hon. Ozamah D. Macabangon` | `src/data/officials.ts` | Rappler 2025 results (COMELEC transmission data) and Wikipedia, Marawi | Elected City Councilor, 2025–2028 | Claude Code | 2026-10-22 | Sourced (confirm against COMELEC canvass) |
| Hon. Jackie S. Mangondato (City Councilor) | `Hon. Jackie S. Mangondato` | `src/data/officials.ts` | Rappler 2025 results (COMELEC transmission data) and Wikipedia, Marawi | Elected City Councilor, 2025–2028 | Claude Code | 2026-10-22 | Sourced (confirm against COMELEC canvass) |
| Liga ng mga Barangay President (Ex-Officio) | `To be confirmed` (name hidden) | `src/data/officials.ts` | | | | | Unverified, no source found. Seat changes after the November 2, 2026 barangay elections |
| SK Federation President (Ex-Officio) | `To be confirmed` (name hidden) | `src/data/officials.ts` | | | | | Unverified, no source found. Seat changes after the November 2, 2026 SK elections |


> **Note (2026-10-22):** The councilor and ex-officio names in the original data did not match the 2025 election results and had no source (one, "Abdani T. Alonto", ran but placed 13th). They were replaced with the 10 winners listed by Rappler and Wikipedia. Rank 10 (Jackie S. Mangondato) led rank 11 by about 98 votes in Rappler's partial count, so confirm it against the COMELEC canvass.

---

## 3. Departments

> **Suggested source:** Marawi City Hall administrative directory, Civil Service Commission (CSC) appointment records, or direct verification with the Office of the City Mayor.

| Item | Current value in code | File | Official source | Confirmed value | Verified by | Date | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Office of the City Mayor (Head) | `Hon. Shariff Zain Lanto Gandamra` | `src/data/departments.ts` (`headVerification`) | Site owner (current officeholder); 2025 election results, https://ph.rappler.com/elections/2025/local-race/lanao-del-sur/marawi-city | Hon. Shariff Zain Lanto Gandamra, City Mayor (2025–2028) | Site owner | 2026-10-23 | Verified (head only; office mandate, location, and services verified separately) |
| Office of the Vice Mayor & Sangguniang Panlungsod (Head) | `Hon. Majul Usman Gandamra` | `src/data/departments.ts` (`headVerification`) | Site owner (current officeholder); 2025 election results, https://ph.rappler.com/elections/2025/local-race/lanao-del-sur/marawi-city | Hon. Majul Usman Gandamra, City Vice Mayor (2025–2028) | Site owner | 2026-10-23 | Verified (head only; office mandate, location, and services verified separately) |
| Business Permits and Licensing Office (Head) | `Norodin M. Alonto, MPA` | `src/data/departments.ts` | | | | | Unverified |
| City Health Office (Head) | `Dr. Aliya B. Lucman, MD, MPH` | `src/data/departments.ts` | | | | | Unverified |
| City Social Welfare and Development Office (Head) | `Sittie Haniah M. Balindong, RSW` | `src/data/departments.ts` | | | | | Unverified |
| City Disaster Risk Reduction and Management Office (Head) | `Amerodin S. Maruhom, RN, EMT` | `src/data/departments.ts` | | | | | Unverified |
| City Planning and Development Office (Head) | `Engr. Anwar T. Mindalano, EnP` | `src/data/departments.ts` | | | | | Unverified |
| City Engineering Office & Office of the Building Official (Head) | `Engr.Rasul D. Pacasum, CE` | `src/data/departments.ts` | | | | | Unverified |
| Office of the City Treasurer (Head) | `ashary M. Disomimba, CPA` | `src/data/departments.ts` | | | | | Unverified |
| Office of the City Civil Registrar (Head) | `Rohanie P.Guro, LLB` | `src/data/departments.ts` | | | | | Unverified |

---

## 4. Budget

> **Suggested source:** Enacted General Appropriation Ordinance (GAO) of the Islamic City of Marawi, DILG Full Disclosure Policy Portal (FDPP), or the Bureau of Local Government Finance (BLGF) certified reports of revenues and expenditures.

| Item | Current value in code | File | Official source | Confirmed value | Verified by | Date | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Fiscal Year | `2026` | `src/data/budget.ts` | | | | | Unverified |
| Total Budget | `₱1,845,200,000` | `src/data/budget.ts` | | | | | Unverified |
| NTA Share | `₱1,692,400,000 (91.7%)` | `src/data/budget.ts` | | | | | Unverified |
| Local Sources | `₱152,800,000 (8.3%)` | `src/data/budget.ts` | | | | | Unverified |
| General Public Services & Good Governance (Sector Amount) | `₱572,012,000` | `src/data/budget.ts` | | | | | Unverified |
| Social Services (Health, Education, CSWDO & Housing) (Sector Amount) | `₱535,108,000` | `src/data/budget.ts` | | | | | Unverified |
| Economic Services & Infrastructure Development (20% DF) (Sector Amount) | `₱461,300,000` | `src/data/budget.ts` | | | | | Unverified |
| Disaster Risk Reduction & Management Fund (5% CDRRMF) (Sector Amount) | `₱92,260,000` | `src/data/budget.ts` | | | | | Unverified |
| Gender and Development (5% GAD) & Sectoral Allocations (Senior/PWD/LCPC) (Sector Amount) | `₱184,520,000` | `src/data/budget.ts` | | | | | Unverified |

---

## 5. City Profile Figures

> **Official Sources:** Philippine Statistics Authority (PSA) 2020 Census of Population and Housing (CPH) via Presidential Proclamation No. 1179 (`https://psa.gov.ph`) and PSA Philippine Standard Geographic Code (PSGC) portal (`https://psa.gov.ph/classification/psgc`).

> **Re-check on October 21, 2026:** The PSA page blocks automated fetching (HTTP 403), so the site owner pasted its barangay table in. That table confirms 101 barangays and a 2024 POPCEN sum of 259,993. The city header lines (PSGC code, correspondence code, income class) were not in the paste. Those rows still rest on the earlier PSA reading recorded below and were not re-checked. DTI CMCI also shows a population of 259,993. Land area and 2020 census figures are kept from the URLs recorded below. PSA content is CC BY 4.0 and needs attribution.

| Item | Current value in code | File | Official source URL | Source date | Official quote (<15 words) | Status |
| --- | --- | --- | --- | --- | --- | --- |
| PSGC 10-Digit Code | `1903617000` (Correspondence: `153617000`) | `src/components/statistics/DemographicsBlock.tsx` | https://psa.gov.ph/classification/psgc/barangays/1903617000 | 2025-07-31 | "City of Marawi: 1903617000" | Matches |
| Income Classification | `3rd Class Component City` | `src/components/statistics/DemographicsBlock.tsx` | https://psa.gov.ph/classification/psgc/barangays/1903617000 | 2025-07-31 | "Income Class: 3rd" | Matches |
| Latest Population (2024 POPCEN) | `259,993` | `src/components/statistics/DemographicsBlock.tsx` | https://psa.gov.ph/classification/psgc/barangays/1903617000 | 2025-07-31 | "Population (2024 POPCEN): 259993" | Matches |
| Total Barangay Count | `101 Barangays` | `src/components/statistics/DemographicsBlock.tsx` | https://psa.gov.ph/classification/psgc/barangays/1903617000 | 2025-07-31 | "Barangays: 101" | Matches |
| 2020 Census Population | `207,010` | `src/components/statistics/DemographicsBlock.tsx` | https://psa.gov.ph/content/2020-census-population-and-housing-2020-cph-population-counts-declared-official-president | 2021-07-07 | "population of the Islamic City of Marawi was 207,010" | Matches |
| 2020 Census Households | `34,444` | `src/components/statistics/DemographicsBlock.tsx` | https://psa.gov.ph/content/2020-census-population-and-housing-2020-cph-population-counts-declared-official-president | 2021-07-07 | "average household size in BARMM was 6.0" | Matches |
| Land Area | `87.55 km²` | `src/components/statistics/DemographicsBlock.tsx` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Land Area: 87.55 sq. km." | Matches |
| Geographic Coordinates | `8.0034, 124.2851` | `src/components/statistics/DemographicsBlock.tsx` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Coordinates: 8.0034, 124.2851" | Matches |
| Elevation | `~700 meters ASL` | `src/components/statistics/DemographicsBlock.tsx` | https://psa.gov.ph | 2024 | N/A | No source found (Flagged: physical topographic datum, not published in PSA census or PSGC tables) |

---

## 6. DTI CMCI Pillars and Scores

> **Official Source:** Department of Trade and Industry (DTI) Cities and Municipalities Competitiveness Index (CMCI) Portal (`https://cmci.dti.gov.ph`). Checked on 2026-10-21: The latest published rankings cycle on the CMCI portal is the **2024 cycle** (2025 cycle data collection is underway; no official 2025 or 2026 scores/rankings have been published).

| Item | Current value in code | File | Official source URL | Source date | Official quote (<15 words) | Status |
| --- | --- | --- | --- | --- | --- | --- |
Re-checked on October 21, 2026 against `https://cmci.dti.gov.ph/lgu-profile.php?lgu=Marawi`. The profile page does not print a composite score or label the year (it lists 2016 to 2024, with 2024 first). The five pillar scores sum to 33.3515.

| Item | Current value in code | File | Official source URL | Source date | Official quote (<15 words) | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Economic Dynamism | Rank `51`, score `4.3606` | `src/data/cmci.ts` | https://cmci.dti.gov.ph/lgu-profile.php?lgu=Marawi | 2024 | "Economic Dynamism: 51st, 4.3606" | Sourced (matches) |
| Government Efficiency | Rank `113`, score `8.1133` | `src/data/cmci.ts` | https://cmci.dti.gov.ph/lgu-profile.php?lgu=Marawi | 2024 | "Government Efficiency: 113th, 8.1133" | Sourced (matches) |
| Infrastructure | Rank `110`, score `3.0089` | `src/data/cmci.ts` | https://cmci.dti.gov.ph/lgu-profile.php?lgu=Marawi | 2024 | "Infrastructure: 110th, 3.0089" | Sourced (matches) |
| Resiliency | Rank `67`, score `11.3701` | `src/data/cmci.ts` | https://cmci.dti.gov.ph/lgu-profile.php?lgu=Marawi | 2024 | "Resiliency: 67th, 11.3701" | Sourced (matches) |
| Innovation | Rank `80`, score `6.4986` | `src/data/cmci.ts` | https://cmci.dti.gov.ph/lgu-profile.php?lgu=Marawi | 2024 | "Innovation: 80th, 6.4986" | Sourced (matches) |
| Overall Rank | `98` | `src/data/cmci.ts` | https://cmci.dti.gov.ph/lgu-profile.php?lgu=Marawi | 2024 | "Overall rank: 98th" | Sourced (matches) |
| Overall Composite Score | `33.3515` | `src/data/cmci.ts` | https://cmci.dti.gov.ph/lgu-profile.php?lgu=Marawi | 2024 | Not printed on profile page; equals sum of pillar scores | Sourced (unchanged) |

---

## 7. Barangays (Names, PSGC Codes, Urban/Rural, 2024 POPCEN)

> **Official Source:** Philippine Statistics Authority (PSA) PSGC page for the City of Marawi (`https://psa.gov.ph/classification/psgc/barangays/1903617000`), barangay table with 10-digit code, correspondence code, Urban/Rural, and Population (2024 POPCEN). Retrieved on October 21, 2026. The PSA site blocks automated fetching (HTTP 403), so the table was copied from the page by the site owner and pasted in. PSA content is licensed CC BY 4.0 and must be attributed ("Source: Philippine Statistics Authority").

### 7.1 Aggregate Barangay Dataset Verification

| Item | Current value in code | File | Official source URL | Source date | Official quote (<15 words) | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Total Barangay Count | `101` rows | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc/barangays/1903617000 | 2025-07-31 | 101 barangay rows in PSA table | Sourced (matches) |
| 2024 POPCEN (sum of barangays) | `259,993` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc/barangays/1903617000 | 2024 POPCEN | Row sum equals city total 259,993 | Sourced (matches) |
| Duplicate codes | none (101 unique 10-digit codes) | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc/barangays/1903617000 | 2025-07-31 | N/A | Checked |
| Correspondence codes | 96 present, 5 empty (Boganga II, Datu Dalidigan, Angoyao, Sultan Corobong, Sultan Panoroganan) | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc/barangays/1903617000 | 2025-07-31 | Blank in PSA table for these five | Sourced (left empty, not invented) |
| Urban/Rural | 12 Urban, 89 Rural | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc/barangays/1903617000 | 2025-07-31 | N/A | Sourced (matches) |
| District, zone status, 2020 population, households | Removed | `src/data/barangays.ts` | N/A | N/A | Not on PSA page; earlier values had no source | Removed |

**Name changes from the previous 96-row data.** Removed (not on PSA list): Bacong, Cadayonan II, Datu Saber, Dimalna, Dulag-Angoyao, Larkin (Loksadato), Marantao-Poona, Navarro (Datu Saber). Added from PSA: Angoyao, Bacolod Chico Proper, Boto Ambolong, Buadi Sacayo, Bubong Lumbac, Cadayonan I, Datu Dalidigan, Dimaluna, Gadongan Mapantao, Navarro, Panggao Saduc, Sultan Corobong, Sultan Panoroganan. Some are likely respellings (Dimalna to Dimaluna, Navarro (Datu Saber) to Navarro), but that was not confirmed. All previous 9-digit codes were sequential placeholders and were replaced with PSA codes.

### 7.2 All 101 Barangays

All rows: source https://psa.gov.ph/classification/psgc/barangays/1903617000, retrieved October 21, 2026, status Sourced.

| # | Barangay (PSA spelling) | 10-digit code | Correspondence code | Urban/Rural | 2024 POPCEN |
| --- | --- | --- | --- | --- | --- |
| 1 | Ambolong | `1903617001` | `153617001` | Rural | 1313 |
| 2 | Bacolod Chico Proper | `1903617003` | `153617003` | Rural | 1145 |
| 3 | Banga | `1903617006` | `153617006` | Rural | 1492 |
| 4 | Bangco | `1903617007` | `153617007` | Rural | 3642 |
| 5 | Banggolo Poblacion | `1903617008` | `153617008` | Rural | 3342 |
| 6 | Bangon | `1903617009` | `153617009` | Rural | 3289 |
| 7 | Beyaba-Damag | `1903617010` | `153617010` | Rural | 3163 |
| 8 | Bito Buadi Itowa | `1903617012` | `153617012` | Rural | 1020 |
| 9 | Bito Buadi Parba | `1903617013` | `153617013` | Rural | 1607 |
| 10 | Bubonga Pagalamatan | `1903617014` | `153617014` | Rural | 912 |
| 11 | Bubonga Lilod Madaya | `1903617015` | `153617015` | Rural | 3341 |
| 12 | Boganga | `1903617016` | `153617016` | Rural | 1860 |
| 13 | Boto Ambolong | `1903617017` | `153617017` | Rural | 2031 |
| 14 | Bubonga Cadayonan | `1903617019` | `153617019` | Rural | 1089 |
| 15 | Bubong Lumbac | `1903617021` | `153617021` | Rural | 808 |
| 16 | Bubonga Marawi | `1903617022` | `153617022` | Rural | 2156 |
| 17 | Bubonga Punod | `1903617023` | `153617023` | Rural | 1132 |
| 18 | Cabasaran | `1903617024` | `153617024` | Rural | 3254 |
| 19 | Cabingan | `1903617025` | `153617025` | Rural | 5129 |
| 20 | Cadayonan | `1903617026` | `153617026` | Rural | 4157 |
| 21 | Cadayonan I | `1903617027` | `153617027` | Rural | 1547 |
| 22 | Calocan East | `1903617029` | `153617029` | Rural | 1856 |
| 23 | Calocan West | `1903617030` | `153617030` | Rural | 1492 |
| 24 | Kormatan Matampay | `1903617032` | `153617032` | Rural | 1598 |
| 25 | Daguduban | `1903617033` | `153617033` | Urban | 5810 |
| 26 | Dansalan | `1903617035` | `153617035` | Rural | 2510 |
| 27 | Datu Sa Dansalan | `1903617036` | `153617036` | Rural | 3553 |
| 28 | Dayawan | `1903617037` | `153617037` | Rural | 1406 |
| 29 | Dimaluna | `1903617039` | `153617039` | Urban | 7116 |
| 30 | Dulay | `1903617040` | `153617040` | Rural | 2229 |
| 31 | Dulay West | `1903617042` | `153617042` | Rural | 1414 |
| 32 | East Basak | `1903617043` | `153617043` | Rural | 2528 |
| 33 | Emie Punud | `1903617044` | `153617044` | Rural | 2056 |
| 34 | Fort | `1903617045` | `153617045` | Rural | 2356 |
| 35 | Gadongan | `1903617046` | `153617046` | Urban | 2026 |
| 36 | Buadi Sacayo | `1903617048` | `153617048` | Rural | 2889 |
| 37 | Guimba | `1903617049` | `153617049` | Rural | 2465 |
| 38 | Kapantaran | `1903617051` | `153617051` | Rural | 2658 |
| 39 | Kilala | `1903617052` | `153617052` | Rural | 1526 |
| 40 | Lilod Madaya | `1903617057` | `153617057` | Rural | 3202 |
| 41 | Lilod Saduc | `1903617058` | `153617058` | Rural | 4505 |
| 42 | Lomidong | `1903617060` | `153617060` | Urban | 5679 |
| 43 | Lumbaca Madaya | `1903617062` | `153617062` | Rural | 2431 |
| 44 | Lumbac Marinaut | `1903617063` | `153617063` | Rural | 1350 |
| 45 | Lumbaca Toros | `1903617064` | `153617064` | Rural | 679 |
| 46 | Malimono | `1903617065` | `153617065` | Rural | 3286 |
| 47 | Basak Malutlut | `1903617066` | `153617066` | Rural | 4496 |
| 48 | Gadongan Mapantao | `1903617068` | `153617068` | Rural | 2108 |
| 49 | Amito Marantao | `1903617069` | `153617069` | Rural | 1940 |
| 50 | Marinaut East | `1903617070` | `153617070` | Rural | 1198 |
| 51 | Marinaut West | `1903617071` | `153617071` | Rural | 2193 |
| 52 | Matampay | `1903617072` | `153617072` | Rural | 4536 |
| 53 | Pantaon | `1903617074` | `153617074` | Rural | 966 |
| 54 | Mipaga Proper | `1903617075` | `153617075` | Rural | 2526 |
| 55 | Moncado Colony | `1903617076` | `153617076` | Rural | 4042 |
| 56 | Moncado Kadingilan | `1903617077` | `153617077` | Urban | 5573 |
| 57 | Moriatao Loksadato | `1903617079` | `153617079` | Rural | 2446 |
| 58 | Datu Naga | `1903617080` | `153617080` | Rural | 2145 |
| 59 | Navarro | `1903617083` | `153617083` | Rural | 5580 |
| 60 | Olawa Ambolong | `1903617085` | `153617085` | Rural | 836 |
| 61 | Pagalamatan Gambai | `1903617086` | `153617086` | Rural | 2163 |
| 62 | Pagayawan | `1903617089` | `153617089` | Rural | 1859 |
| 63 | Panggao Saduc | `1903617090` | `153617090` | Urban | 4926 |
| 64 | Papandayan | `1903617097` | `153617097` | Rural | 2793 |
| 65 | Paridi | `1903617098` | `153617098` | Rural | 1129 |
| 66 | Patani | `1903617099` | `153617099` | Rural | 2781 |
| 67 | Pindolonan | `1903617101` | `153617101` | Rural | 1150 |
| 68 | Poona Marantao | `1903617103` | `153617103` | Rural | 3495 |
| 69 | Pugaan | `1903617105` | `153617105` | Rural | 2003 |
| 70 | Rapasun MSU | `1903617107` | `153617107` | Rural | 4896 |
| 71 | Raya Madaya I | `1903617109` | `153617109` | Rural | 3100 |
| 72 | Raya Madaya II | `1903617110` | `153617110` | Rural | 1583 |
| 73 | Raya Saduc | `1903617111` | `153617111` | Rural | 3258 |
| 74 | Rorogagus Proper | `1903617112` | `153617112` | Urban | 5589 |
| 75 | Rorogagus East | `1903617113` | `153617113` | Rural | 1593 |
| 76 | Sabala Manao | `1903617116` | `153617116` | Rural | 2553 |
| 77 | Sabala Manao Proper | `1903617117` | `153617117` | Rural | 1740 |
| 78 | Saduc Proper | `1903617118` | `153617118` | Rural | 2676 |
| 79 | Sagonsongan | `1903617119` | `153617119` | Rural | 1650 |
| 80 | Sangcay Dansalan | `1903617120` | `153617120` | Rural | 2947 |
| 81 | Somiorang | `1903617123` | `153617123` | Rural | 926 |
| 82 | South Madaya Proper | `1903617124` | `153617124` | Rural | 1299 |
| 83 | Sugod Proper | `1903617125` | `153617125` | Rural | 4299 |
| 84 | Tampilong | `1903617126` | `153617126` | Rural | 2599 |
| 85 | Timbangalan | `1903617127` | `153617127` | Rural | 2088 |
| 86 | Tuca Ambolong | `1903617129` | `153617129` | Rural | 1815 |
| 87 | Tolali | `1903617131` | `153617131` | Rural | 3019 |
| 88 | Toros | `1903617133` | `153617133` | Rural | 1854 |
| 89 | Tuca | `1903617134` | `153617134` | Rural | 1195 |
| 90 | Tuca Marinaut | `1903617136` | `153617136` | Rural | 1330 |
| 91 | Tongantongan-Tuca Timbangalan | `1903617137` | `153617137` | Rural | 509 |
| 92 | Wawalayan Calocan | `1903617138` | `153617138` | Rural | 3407 |
| 93 | Wawalayan Marinaut | `1903617139` | `153617139` | Rural | 2331 |
| 94 | Marawi Poblacion | `1903617141` | `153617141` | Rural | 4892 |
| 95 | Norhaya Village | `1903617142` | `153617142` | Rural | 3375 |
| 96 | Papandayan Caniogan | `1903617143` | `153617143` | Rural | 3912 |
| 97 | Boganga II | `1903617144` | (none) | Urban | 2062 |
| 98 | Datu Dalidigan | `1903617145` | (none) | Urban | 2318 |
| 99 | Angoyao | `1903617146` | (none) | Urban | 2013 |
| 100 | Sultan Corobong | `1903617147` | (none) | Urban | 2062 |
| 101 | Sultan Panoroganan | `1903617148` | (none) | Urban | 2170 |

---

## 8. Contact and Social

> **Official Source:** DTI CMCI LGU profile (`https://cmci.dti.gov.ph/lgu-profile.php?lgu=Marawi`), retrieved on October 21, 2026.

| Item | Current value in code | File | Official source URL | Source date | Official quote (<15 words) | Status |
| --- | --- | --- | --- | --- | --- | --- |
| City Hall address | `City Hall Complex, Brgy. Fort, Marawi City, Lanao del Sur` | `src/config/site.ts`, `src/lib/jsonld.ts`, `src/components/contact/MapCard.tsx` | https://cmci.dti.gov.ph/lgu-profile.php?lgu=Marawi | 2026-10-21 | "City Hall Complex, Brgy. Fort, Marawi City, Lanao del Sur" | Sourced (also confirmed by the site owner from local knowledge; not marked Confirmed) |
| Official Facebook page | `https://www.facebook.com/marawicitygovernment` | `src/config/site.ts`, Footer, Contact page, JSON-LD `sameAs` | https://cmci.dti.gov.ph/lgu-profile.php?lgu=Marawi | 2026-10-21 | Listed as the LGU link on the CMCI profile | Sourced. Page title: "City Government of Marawi". The city has no official website |
| LGU phone | Not published | N/A | https://cmci.dti.gov.ph/lgu-profile.php?lgu=Marawi | 2026-10-21 | "NDA" | Not published |
| LGU email on CMCI | Not published | N/A | https://cmci.dti.gov.ph/lgu-profile.php?lgu=Marawi | 2026-10-21 | Personal address shown | Not published |
| Postal code `9700` in JSON-LD | Kept | `src/lib/jsonld.ts` | Wikipedia (Marawi), PhilAtlas (Marawi), FilipiKnow (Lanao del Sur ZIP codes) | 2026-10-23 | 9700 in all three | Sourced from secondary references; not yet confirmed against PHLPost |


---

## 9. Data Integrity Review (2026-10-23)

Decisions from the Batch 3 review. Each item was removed or qualified because no source supports it; nothing was replaced with a guess.

| Item | Was | Now | Evidence |
| --- | --- | --- | --- |
| `@marawicity.gov.ph` emails (22: departments, services, contact directory) | Shown as office emails | Removed | No source; the domain does not resolve on Google, Cloudflare, or Quad9 DNS (SERVFAIL), so mail cannot be delivered. DTI CMCI lists no official LGU email |
| Office hotlines (departments, services, City Hall trunkline `(063) 352-0117`) | Shown as office numbers | Removed; City Hall shows "to be confirmed" | No source; the same number is also listed as the CDRRMO emergency line. DTI CMCI lists the LGU phone as "NDA" |
| Heads of the Office of the City Mayor and the Office of the Vice Mayor & SP | Shown, but the Local Officials Directory said "To be confirmed" | Shown as "Verified current officeholder" on both pages | Site owner verification; names match officials.ts and the 2025 results. Only the head is verified; each office's other details are labelled separately |
| Department heads other than the Mayor and Vice Mayor (8) | Named | "To be confirmed" | No source |
| Ordinances (6) and their sponsors | Listed on the Legislative page and in downloads | Removed; empty state shown | No record found; sponsors contradict the 2025 election results (Abdani T. Alonto placed 13th; Soraya M. Lucman is not a councilor) |
| "City Ordinance No. 2024-027" (FOI) and its 15-working-day deadline and fee FAQs | FOI page label and FAQs | Removed | No Marawi FOI ordinance found (searched 2026-10-23) |
| "General Appropriation Ordinance No. 2025-042" | Budget page label and summary line | Removed / "to be confirmed" | Same fabricated ordinance list |
| Contact directory "Response within 2 business days" and "Mon–Fri, 8:00 AM – 5:00 PM" | Shown | Removed | No source |
| "Frontline windows open 8:00 AM – 5:00 PM under RA 11032" | Shown | Restated as what RA 11032 says | RA 11032 requires serving people inside before closing, even during lunch break; it sets no 8–5 hours (https://lawphil.net/statutes/repacts/ra2018/ra_11032_2018.html) |
| "96 barangays" (services FAQ, budget, ordinance title, data guide, public files) | 96 | 101 | PSA PSGC (see section 7 and docs/data-sources.md) |
| `public/data` budget, ordinance, and FDP files; Open Data budget and ordinance downloads | Published | Removed | Unsourced contents. Barangay files regenerated from PSA data (101 rows) |
| JSON-LD `alternateName: BetterMarawi.org` for the City Government | Present | Removed | This site is community-run, not a name of the City Government |
| Barangay contact numbers repeated across barangays | Kept | Kept | Published that way by DILG; a shared number is not treated as an error without a source |

**Still unverified (labelled on the site):** emergency numbers for CDRRMO, BFP, PNP, and CHO/APMC; FY 2026 budget figures; FDP documents and their compliance status; service fees, steps, processing times, locations, hours, and the local ordinances they cite; department mandates, locations, and key services; committee names.