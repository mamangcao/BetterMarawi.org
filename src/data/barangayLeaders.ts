// Punong Barangay (barangay captain) and public contact number for each of Marawi's barangays.
// Keyed by the barangay's 10-digit PSA PSGC code (see src/data/barangays.ts).
// Leave a barangay out until its leader is confirmed; the page shows "To be added".
// Barangay and SK elections are scheduled for November 2, 2026: update this list after the new
// officials take office, and change BARANGAY_LEADERS_AS_OF.

export interface BarangayLeader {
  punongBarangay: string;
  /** Public contact number, only if the barangay publishes one */
  contact?: string;
}

/** When the list was last confirmed, e.g. 'October 2026'. null until the first list is added. */
export const BARANGAY_LEADERS_AS_OF: string | null = null;

/** Who provided or confirmed the list, e.g. 'City DILG office' or 'BetterMarawi.org team' */
export const BARANGAY_LEADERS_SOURCE: string | null = null;

export const BARANGAY_LEADERS: Record<string, BarangayLeader> = {
  // '1903617001': { punongBarangay: 'Hon. Juan Dela Cruz', contact: '0917 000 0000' },
};
