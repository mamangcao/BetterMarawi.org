# Data Verification Checklist

This document tracks verification for public civic data displayed on BetterMarawi.org, including emergency hotlines, elected officials, department leadership, and city budget figures.

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
