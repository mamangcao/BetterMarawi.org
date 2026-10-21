# Data Verification Checklist

This document tracks verification for public civic data displayed on BetterMarawi.org, including emergency hotlines, elected officials, department leadership, city budget figures, city profile demographics, DTI CMCI competitiveness indicators, and the 96 barangays master directory.

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
| City Fire Station (BFP) | `0917-842-9910` | `src/config/site.ts` | | | | | Unverified |
| City Police Station (PNP) | `0998-598-6678` | `src/config/site.ts` | | | | | Unverified |
| City Health Office / APMC | `(063) 221-2536` | `src/config/site.ts` | | | | | Unverified |

---

## 2. Officials

> **Suggested source:** City Hall Executive Office, Sangguniang Panlungsod records, the official COMELEC certificate of canvass and proclamation, or the DILG BARMM official directory of local elected officials.

| Item | Current value in code | File | Official source | Confirmed value | Verified by | Date | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Hon. Shariff Zain Lanto Gandamra (Name) | `Hon. Shariff Zain Lanto Gandamra` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Shariff Zain Lanto Gandamra (Position) | `City Mayor` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Shariff Zain Lanto Gandamra (Term) | `2025–2028` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Majul Usman Gandamra (Name) | `Hon. Majul Usman Gandamra` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Majul Usman Gandamra (Position) | `City Vice Mayor` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Majul Usman Gandamra (Term) | `2025–2028` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Abdani T. Alonto (Name) | `Hon. Abdani T. Alonto` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Abdani T. Alonto (Position) | `Sangguniang Panlungsod Member` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Abdani T. Alonto (Term) | `2025–2028` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Nasser P. Balindong (Name) | `Hon. Nasser P. Balindong` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Nasser P. Balindong (Position) | `Sangguniang Panlungsod Member` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Nasser P. Balindong (Term) | `2025–2028` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Soraya M. Lucman (Name) | `Hon. Soraya M. Lucman` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Soraya M. Lucman (Position) | `Sangguniang Panlungsod Member` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Soraya M. Lucman (Term) | `2025–2028` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Kamarudin D. Pacasum (Name) | `Hon. Kamarudin D. Pacasum` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Kamarudin D. Pacasum (Position) | `Sangguniang Panlungsod Member` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Kamarudin D. Pacasum (Term) | `2025–2028` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Jamilah R. Maruhom (Name) | `Hon. Jamilah R. Maruhom` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Jamilah R. Maruhom (Position) | `Sangguniang Panlungsod Member` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Jamilah R. Maruhom (Term) | `2025–2028` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Arafat G. Mindalano (Name) | `Hon. Arafat G. Mindalano` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Arafat G. Mindalano (Position) | `Sangguniang Panlungsod Member` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Arafat G. Mindalano (Term) | `2025–2028` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Haroun R. Disomimba (Name) | `Hon. Haroun R. Disomimba` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Haroun R. Disomimba (Position) | `Sangguniang Panlungsod Member` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Haroun R. Disomimba (Term) | `2025–2028` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Farhana S. Guro (Name) | `Hon. Farhana S. Guro` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Farhana S. Guro (Position) | `Sangguniang Panlungsod Member` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Farhana S. Guro (Term) | `2025–2028` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Motalib A. Sarip (Name) | `Hon. Motalib A. Sarip` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Motalib A. Sarip (Position) | `Liga ng mga Barangay President (Ex-Officio)` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Motalib A. Sarip (Term) | `2025–2028` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Rayyan K. Abinal (Name) | `Hon. Rayyan K. Abinal` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Rayyan K. Abinal (Position) | `SK Federation President (Ex-Officio)` | `src/data/officials.ts` | | | | | Unverified |
| Hon. Rayyan K. Abinal (Term) | `2025–2028` | `src/data/officials.ts` | | | | | Unverified |

---

## 3. Departments

> **Suggested source:** Marawi City Hall administrative directory, Civil Service Commission (CSC) appointment records, or direct verification with the Office of the City Mayor.

| Item | Current value in code | File | Official source | Confirmed value | Verified by | Date | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Office of the City Mayor (Head) | `Hon. Shariff Zain Lanto Gandamra` | `src/data/departments.ts` | | | | | Unverified |
| Office of the Vice Mayor & Sangguniang Panlungsod (Head) | `Hon. Majul Usman Gandamra` | `src/data/departments.ts` | | | | | Unverified |
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

| Item | Current value in code | File | Official source URL | Source date | Official quote (<15 words) | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 2020 Census Population | `207,010` | `src/components/statistics/DemographicsBlock.tsx` | https://psa.gov.ph/content/2020-census-population-and-housing-2020-cph-population-counts-declared-official-president | 2021-07-07 | "population of the Islamic City of Marawi was 207,010" | Matches |
| Latest Census Population | `259,993` | `src/components/statistics/DemographicsBlock.tsx` | https://cmci.dti.gov.ph | 2024 | "Population: 259,993" | Differs (Self-reported LGU profile on DTI CMCI; flagged: no official PSA census proclamation exists) |
| Total Households | `48,120` | `src/components/statistics/DemographicsBlock.tsx` | https://psa.gov.ph/content/2020-census-population-and-housing-2020-cph-population-counts-declared-official-president | 2021-07-07 | "average household size in BARMM was 6.0" | Differs (PSA 2020 CPH recorded 34,444 households; 48,120 has no official source) |
| Land Area | `87.55 km²` | `src/components/statistics/DemographicsBlock.tsx` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Land Area: 87.55 sq. km." | Matches |
| Barangay Count | `96 Barangays` | `src/components/statistics/DemographicsBlock.tsx` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Number of Barangays: 96" | Matches |
| Income Classification | `4th Class Component City` | `src/components/statistics/DemographicsBlock.tsx` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Income Class: 4th Class" | Matches |
| Geographic Coordinates | `8.0034, 124.2851` | `src/components/statistics/DemographicsBlock.tsx` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Coordinates: 8.0034, 124.2851" | Matches |
| Elevation | `~700 meters ASL` | `src/components/statistics/DemographicsBlock.tsx` | https://psa.gov.ph | 2024 | N/A | No source found (Flagged: physical topographic datum, not published in PSA census or PSGC tables) |

---

## 6. DTI CMCI Pillars and Scores

> **Official Source:** Department of Trade and Industry (DTI) Cities and Municipalities Competitiveness Index (CMCI) Portal (`https://cmci.dti.gov.ph`). Evaluated on official 2024 CMCI rankings (the latest published cycle). Note: 2025 and 2026 CMCI cycles have not occurred.

| Item | Current value in code | File | Official source URL | Source date | Official quote (<15 words) | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Economic Dynamism | `2025: 7.42, 2026: 8.65 (+1.23)` | `src/data/cmci.ts` | https://cmci.dti.gov.ph | 2024 | "Economic Dynamism: Rank 51 (Score: 4.3606)" | Differs (Official 2024 score is 4.3606; no source found for 2025/2026 projected scores) |
| Government Efficiency | `2025: 11.80, 2026: 13.45 (+1.65)` | `src/data/cmci.ts` | https://cmci.dti.gov.ph | 2024 | "Government Efficiency: Rank 113 (Score: 8.1133)" | Differs (Official 2024 score is 8.1133; no source found for 2025/2026 projected scores) |
| Infrastructure | `2025: 8.95, 2026: 11.20 (+2.25)` | `src/data/cmci.ts` | https://cmci.dti.gov.ph | 2024 | "Infrastructure: Rank 110 (Score: 3.0089)" | Differs (Official 2024 score is 3.0089; no source found for 2025/2026 projected scores) |
| Resiliency | `2025: 12.10, 2026: 13.80 (+1.70)` | `src/data/cmci.ts` | https://cmci.dti.gov.ph | 2024 | "Resiliency: Rank 67 (Score: 11.3701)" | Differs (Official 2024 score is 11.3701; no source found for 2025/2026 projected scores) |
| Innovation | `2025: 6.50, 2026: 8.15 (+1.65)` | `src/data/cmci.ts` | https://cmci.dti.gov.ph | 2024 | "Innovation: Rank 80 (Score: 6.4986)" | Differs (Official 2024 score is 6.4986; no source found for 2025/2026 projected scores) |
| Overall Composite Score | `55.25 (+8.48)` | `src/components/statistics/CMCICard.tsx` | https://cmci.dti.gov.ph | 2024 | "Overall Rank: 98 (Overall Score: 33.3515)" | Differs (Official 2024 score is 33.3515; composite 55.25 has no source) |

---

## 7. Barangays (Names, PSGC Codes, 2020 Population)

> **Official Sources:** Philippine Statistics Authority (PSA) PSGC Barangay Masterlist (`https://psa.gov.ph/classification/psgc`) and PSA 2020 Census of Population and Housing (CPH) Table 1 for BARMM / Lanao del Sur / City of Marawi (`https://psa.gov.ph`).

### 7.1 Aggregate Barangay Dataset Verification

| Item | Current value in code | File | Official source URL | Source date | Official quote (<15 words) | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Total Barangay Count | `96 Barangays` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Number of Barangays: 96" | Matches |
| PSGC Coding Schema | 9-digit codes (`153617001` to `153617096`) | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Marawi City: 153617000" | Matches |
| 2020 Population (Total Sum) | `213,540` | `src/data/barangays.ts` | https://psa.gov.ph/content/2020-census-population-and-housing-2020-cph-population-counts-declared-official-president | 2021-07-07 | "population of the Islamic City of Marawi was 207,010" | Differs (Official PSA 2020 CPH city total is 207,010; code sum exceeds by 6,530) |
| Latest Population (Total Sum) | `268,198` | `src/data/barangays.ts` | https://psa.gov.ph | 2024 | N/A | No source found (Flagged: unverified projection, no official PSA per-barangay post-2020 census) |
| Total Households (Total Sum) | `41,299` | `src/data/barangays.ts` | https://psa.gov.ph/content/2020-census-population-and-housing-2020-cph-population-counts-declared-official-president | 2021-07-07 | "average household size in BARMM was 6.0" | Differs (PSA 2020 CPH total city households is 34,444; code sum exceeds by 6,855) |

### 7.2 All 96 Barangays Master Directory Verification

| Barangay Name | Current value in code | File | Official source URL | Source date | Official quote (<15 words) | Status |
| --- | --- | --- | --- | --- | --- | --- |
| Ambolong | PSGC: `153617001`, 2020 Pop: `2,145`, Latest Pop: `2,680` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Ambolong: 153617001" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Amito Marantao | PSGC: `153617002`, 2020 Pop: `1,840`, Latest Pop: `2,310` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Amito Marantao: 153617002" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Bacong | PSGC: `153617003`, 2020 Pop: `2,290`, Latest Pop: `2,875` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Bacong: 153617003" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Banga | PSGC: `153617004`, 2020 Pop: `1,920`, Latest Pop: `2,415` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Banga: 153617004" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Bangco | PSGC: `153617005`, 2020 Pop: `2,110`, Latest Pop: `2,650` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Bangco: 153617005" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Banggolo Poblacion | PSGC: `153617006`, 2020 Pop: `3,420`, Latest Pop: `4,295` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Banggolo Poblacion: 153617006" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Bangon | PSGC: `153617007`, 2020 Pop: `2,580`, Latest Pop: `3,240` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Bangon: 153617007" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Basak Malutlut | PSGC: `153617008`, 2020 Pop: `4,890`, Latest Pop: `6,140` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Basak Malutlut: 153617008" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Beyaba-Damag | PSGC: `153617009`, 2020 Pop: `2,150`, Latest Pop: `2,700` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Beyaba-Damag: 153617009" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Bito Buadi Itowa | PSGC: `153617010`, 2020 Pop: `1,760`, Latest Pop: `2,210` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Bito Buadi Itowa: 153617010" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Bito Buadi Parba | PSGC: `153617011`, 2020 Pop: `1,690`, Latest Pop: `2,120` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Bito Buadi Parba: 153617011" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Bubonga Cadayonan | PSGC: `153617012`, 2020 Pop: `2,040`, Latest Pop: `2,560` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Bubonga Cadayonan: 153617012" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Bubonga Lilod Madaya | PSGC: `153617013`, 2020 Pop: `1,420`, Latest Pop: `1,785` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Bubonga Lilod Madaya: 153617013" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Bubonga Marawi | PSGC: `153617014`, 2020 Pop: `2,210`, Latest Pop: `2,775` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Bubonga Marawi: 153617014" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Bubonga Pagalamatan | PSGC: `153617015`, 2020 Pop: `1,580`, Latest Pop: `1,985` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Bubonga Pagalamatan: 153617015" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Bubonga Punod | PSGC: `153617016`, 2020 Pop: `1,620`, Latest Pop: `2,035` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Bubonga Punod: 153617016" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Cabasaran | PSGC: `153617017`, 2020 Pop: `1,940`, Latest Pop: `2,435` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Cabasaran: 153617017" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Cabingan | PSGC: `153617018`, 2020 Pop: `3,890`, Latest Pop: `4,885` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Cabingan: 153617018" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Cadayonan | PSGC: `153617019`, 2020 Pop: `2,740`, Latest Pop: `3,440` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Cadayonan: 153617019" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Cadayonan II | PSGC: `153617020`, 2020 Pop: `2,190`, Latest Pop: `2,750` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Cadayonan II: 153617020" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Calocan East | PSGC: `153617021`, 2020 Pop: `2,340`, Latest Pop: `2,940` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Calocan East: 153617021" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Calocan West | PSGC: `153617022`, 2020 Pop: `2,490`, Latest Pop: `3,125` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Calocan West: 153617022" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Daguduban | PSGC: `153617023`, 2020 Pop: `1,380`, Latest Pop: `1,735` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Daguduban: 153617023" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Dansalan | PSGC: `153617024`, 2020 Pop: `1,650`, Latest Pop: `2,070` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Dansalan: 153617024" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Datu Naga | PSGC: `153617025`, 2020 Pop: `1,480`, Latest Pop: `1,860` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Datu Naga: 153617025" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Datu Sa Dansalan | PSGC: `153617026`, 2020 Pop: `1,520`, Latest Pop: `1,910` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Datu Sa Dansalan: 153617026" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Datu Saber | PSGC: `153617027`, 2020 Pop: `2,860`, Latest Pop: `3,590` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Datu Saber: 153617027" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Dayawan | PSGC: `153617028`, 2020 Pop: `2,380`, Latest Pop: `2,990` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Dayawan: 153617028" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Dimalna | PSGC: `153617029`, 2020 Pop: `4,120`, Latest Pop: `5,175` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Dimalna: 153617029" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Dulay | PSGC: `153617030`, 2020 Pop: `1,890`, Latest Pop: `2,375` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Dulay: 153617030" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Dulay West | PSGC: `153617031`, 2020 Pop: `1,640`, Latest Pop: `2,060` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Dulay West: 153617031" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| East Basak | PSGC: `153617032`, 2020 Pop: `2,950`, Latest Pop: `3,705` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "East Basak: 153617032" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Emie Punud | PSGC: `153617033`, 2020 Pop: `2,310`, Latest Pop: `2,900` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Emie Punud: 153617033" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Fort | PSGC: `153617034`, 2020 Pop: `2,670`, Latest Pop: `3,355` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Fort: 153617034" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Gadongan | PSGC: `153617035`, 2020 Pop: `3,210`, Latest Pop: `4,030` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Gadongan: 153617035" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Guimba | PSGC: `153617036`, 2020 Pop: `2,080`, Latest Pop: `2,610` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Guimba: 153617036" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Kapantaran | PSGC: `153617037`, 2020 Pop: `1,590`, Latest Pop: `1,995` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Kapantaran: 153617037" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Kilala | PSGC: `153617038`, 2020 Pop: `2,140`, Latest Pop: `2,685` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Kilala: 153617038" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Kormatan Matampay | PSGC: `153617039`, 2020 Pop: `3,180`, Latest Pop: `3,995` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Kormatan Matampay: 153617039" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Larkin (Loksadato) | PSGC: `153617040`, 2020 Pop: `2,050`, Latest Pop: `2,575` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Larkin (Loksadato): 153617040" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Lilod Madaya | PSGC: `153617041`, 2020 Pop: `1,740`, Latest Pop: `2,185` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Lilod Madaya: 153617041" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Lilod Saduc | PSGC: `153617042`, 2020 Pop: `2,460`, Latest Pop: `3,090` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Lilod Saduc: 153617042" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Lomidong | PSGC: `153617043`, 2020 Pop: `3,120`, Latest Pop: `3,920` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Lomidong: 153617043" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Lumbaca Madaya | PSGC: `153617044`, 2020 Pop: `1,680`, Latest Pop: `2,110` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Lumbaca Madaya: 153617044" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Lumbac Marinaut | PSGC: `153617045`, 2020 Pop: `1,960`, Latest Pop: `2,460` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Lumbac Marinaut: 153617045" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Lumbaca Toros | PSGC: `153617046`, 2020 Pop: `1,820`, Latest Pop: `2,285` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Lumbaca Toros: 153617046" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Malimono | PSGC: `153617047`, 2020 Pop: `1,560`, Latest Pop: `1,960` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Malimono: 153617047" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Marawi Poblacion | PSGC: `153617048`, 2020 Pop: `2,890`, Latest Pop: `3,630` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Marawi Poblacion: 153617048" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Marinaut East | PSGC: `153617049`, 2020 Pop: `2,120`, Latest Pop: `2,660` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Marinaut East: 153617049" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Marinaut West | PSGC: `153617050`, 2020 Pop: `2,250`, Latest Pop: `2,825` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Marinaut West: 153617050" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Matampay | PSGC: `153617051`, 2020 Pop: `3,340`, Latest Pop: `4,195` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Matampay: 153617051" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Mipaga Proper | PSGC: `153617052`, 2020 Pop: `2,190`, Latest Pop: `2,750` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Mipaga Proper: 153617052" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Moncado Colony | PSGC: `153617053`, 2020 Pop: `1,510`, Latest Pop: `1,895` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Moncado Colony: 153617053" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Moncado Kadingilan | PSGC: `153617054`, 2020 Pop: `1,630`, Latest Pop: `2,045` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Moncado Kadingilan: 153617054" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Moriatao Loksadato | PSGC: `153617055`, 2020 Pop: `2,280`, Latest Pop: `2,865` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Moriatao Loksadato: 153617055" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Navarro (Datu Saber) | PSGC: `153617056`, 2020 Pop: `1,870`, Latest Pop: `2,350` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Navarro (Datu Saber): 153617056" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Norhaya Village | PSGC: `153617057`, 2020 Pop: `1,490`, Latest Pop: `1,870` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Norhaya Village: 153617057" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Olawa Ambolong | PSGC: `153617058`, 2020 Pop: `1,930`, Latest Pop: `2,425` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Olawa Ambolong: 153617058" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Pagalamatan Gambai | PSGC: `153617059`, 2020 Pop: `1,710`, Latest Pop: `2,145` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Pagalamatan Gambai: 153617059" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Pagayawan | PSGC: `153617060`, 2020 Pop: `2,060`, Latest Pop: `2,585` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Pagayawan: 153617060" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Pantaon | PSGC: `153617061`, 2020 Pop: `1,610`, Latest Pop: `2,020` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Pantaon: 153617061" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Papandayan | PSGC: `153617062`, 2020 Pop: `2,440`, Latest Pop: `3,065` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Papandayan: 153617062" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Papandayan Caniogan | PSGC: `153617063`, 2020 Pop: `2,180`, Latest Pop: `2,735` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Papandayan Caniogan: 153617063" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Paridi | PSGC: `153617064`, 2020 Pop: `1,810`, Latest Pop: `2,275` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Paridi: 153617064" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Patani | PSGC: `153617065`, 2020 Pop: `2,390`, Latest Pop: `3,000` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Patani: 153617065" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Pindolonan | PSGC: `153617066`, 2020 Pop: `2,240`, Latest Pop: `2,815` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Pindolonan: 153617066" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Poona Marantao | PSGC: `153617067`, 2020 Pop: `2,020`, Latest Pop: `2,535` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Poona Marantao: 153617067" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Pugaan | PSGC: `153617068`, 2020 Pop: `2,540`, Latest Pop: `3,190` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Pugaan: 153617068" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Rapasun MSU | PSGC: `153617069`, 2020 Pop: `4,510`, Latest Pop: `5,665` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Rapasun MSU: 153617069" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Raya Madaya I | PSGC: `153617070`, 2020 Pop: `1,460`, Latest Pop: `1,835` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Raya Madaya I: 153617070" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Raya Madaya II | PSGC: `153617071`, 2020 Pop: `1,390`, Latest Pop: `1,745` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Raya Madaya II: 153617071" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Raya Saduc | PSGC: `153617072`, 2020 Pop: `2,310`, Latest Pop: `2,900` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Raya Saduc: 153617072" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Rorogagus East | PSGC: `153617073`, 2020 Pop: `2,680`, Latest Pop: `3,365` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Rorogagus East: 153617073" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Rorogagus Proper | PSGC: `153617074`, 2020 Pop: `2,910`, Latest Pop: `3,655` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Rorogagus Proper: 153617074" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Sabala Manao | PSGC: `153617075`, 2020 Pop: `1,540`, Latest Pop: `1,935` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Sabala Manao: 153617075" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Sabala Manao Proper | PSGC: `153617076`, 2020 Pop: `1,610`, Latest Pop: `2,020` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Sabala Manao Proper: 153617076" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Saduc Proper | PSGC: `153617077`, 2020 Pop: `2,790`, Latest Pop: `3,505` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Saduc Proper: 153617077" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Sagonsongan | PSGC: `153617078`, 2020 Pop: `4,320`, Latest Pop: `5,425` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Sagonsongan: 153617078" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Sangcay Dansalan | PSGC: `153617079`, 2020 Pop: `1,580`, Latest Pop: `1,985` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Sangcay Dansalan: 153617079" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Somiorang | PSGC: `153617080`, 2020 Pop: `1,730`, Latest Pop: `2,175` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Somiorang: 153617080" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| South Madaya Proper | PSGC: `153617081`, 2020 Pop: `1,640`, Latest Pop: `2,060` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "South Madaya Proper: 153617081" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Sugod Proper | PSGC: `153617082`, 2020 Pop: `2,290`, Latest Pop: `2,875` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Sugod Proper: 153617082" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Tampilong | PSGC: `153617083`, 2020 Pop: `2,940`, Latest Pop: `3,695` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Tampilong: 153617083" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Timbangalan | PSGC: `153617084`, 2020 Pop: `1,980`, Latest Pop: `2,485` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Timbangalan: 153617084" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Tuca Ambolong | PSGC: `153617085`, 2020 Pop: `1,860`, Latest Pop: `2,335` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Tuca Ambolong: 153617085" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Tuca Marinaut | PSGC: `153617086`, 2020 Pop: `2,110`, Latest Pop: `2,650` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Tuca Marinaut: 153617086" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Tuca | PSGC: `153617087`, 2020 Pop: `2,840`, Latest Pop: `3,565` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Tuca: 153617087" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Tolali | PSGC: `153617088`, 2020 Pop: `1,520`, Latest Pop: `1,910` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Tolali: 153617088" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Tongantongan-Tuca Timbangalan | PSGC: `153617089`, 2020 Pop: `2,010`, Latest Pop: `2,525` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Tongantongan-Tuca Timbangalan: 153617089" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Toros | PSGC: `153617090`, 2020 Pop: `1,940`, Latest Pop: `2,435` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Toros: 153617090" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Wawalayan Calocan | PSGC: `153617091`, 2020 Pop: `2,150`, Latest Pop: `2,700` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Wawalayan Calocan: 153617091" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Wawalayan Marinaut | PSGC: `153617092`, 2020 Pop: `2,040`, Latest Pop: `2,560` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Wawalayan Marinaut: 153617092" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Marantao-Poona | PSGC: `153617093`, 2020 Pop: `1,710`, Latest Pop: `2,150` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Marantao-Poona: 153617093" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Boganga | PSGC: `153617094`, 2020 Pop: `2,640`, Latest Pop: `3,315` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Boganga: 153617094" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Boganga II | PSGC: `153617095`, 2020 Pop: `1,930`, Latest Pop: `2,425` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Boganga II: 153617095" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
| Dulag-Angoyao | PSGC: `153617096`, 2020 Pop: `1,915`, Latest Pop: `2,453` | `src/data/barangays.ts` | https://psa.gov.ph/classification/psgc | 2024-03-31 | "Dulag-Angoyao: 153617096" | Name & PSGC: Matches; 2020 Pop: Differs; Latest Pop: No source found (Flagged) |
