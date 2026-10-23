import { OrdinanceRecord } from '@/types';

// City ordinances of the Islamic City of Marawi. Add an entry only from an official copy
// (Sangguniang Panlungsod records, the city's official page, or another government source),
// with `source`, `sourceUrl`, and `retrievedOn` set.
//
// Six earlier entries (Nos. 2026-014, 2026-009, 2025-042, 2025-031, 2025-018, 2024-027) were
// removed on Oct 23, 2026: none had a source, no record of them was found, and their sponsors
// contradicted the 2025 election results (e.g. "Hon. Abdani T. Alonto", who placed 13th, and
// "Hon. Soraya M. Lucman", who is not one of the 10 elected councilors). One title also gave
// "96 barangays"; PSA lists 101.
export const ORDINANCES_LIST: OrdinanceRecord[] = [];
