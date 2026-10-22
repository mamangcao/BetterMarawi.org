// Shared model for "transaction directory" service pages (Certificates, Business, and more).
// A page lists transactions (what you can request), grouped into categories; each transaction
// names its responsible office, and each office carries the steps and what to bring.
// Data files live in src/data/; the UI is src/components/services/transactions/.

export interface TxSource {
  id: string;
  label: string;
  url: string;
}

/** Where a fee comes from. Shown as a small label so readers know how reliable it is. */
export type FeeBasis = 'law' | 'agency' | 'city' | 'barangay';

export interface TxCategory {
  id: string;
  title: string;
  description: string;
}

export interface TxOffice {
  id: string;
  name: string;
  description: string;
  /** Only when a source confirms it */
  location?: string;
  online?: { label: string; url: string };
  /** General steps at this office */
  steps: string[];
  /** What to bring for most requests here */
  bring: string[];
  notes?: string[];
  /** Ids into the page's source list */
  sources: string[];
}

export interface Transaction {
  /** Also the anchor id on the page (e.g. #cedula), so keep it stable */
  id: string;
  name: string;
  description: string;
  officeId: string;
  category: string;
  fee: string;
  feeBasis: FeeBasis;
  /** Actual duration from the office's Citizen's Charter; null until published */
  processing: string | null;
  /** Legal maximum (RA 11032) when one applies to this kind of request */
  legalLimit?: string;
  /** When to file or pay: a deadline or schedule, never a duration */
  schedule?: string;
  online?: { label: string; url: string };
  /** Free once for first-time jobseekers under RA 11261 */
  freeForFirstJob?: boolean;
  bring?: string[];
  notes?: string[];
  more?: { label: string; href: string };
}

/** Everything a transaction directory needs */
export interface TxDirectoryData {
  categories: TxCategory[];
  offices: TxOffice[];
  items: Transaction[];
  sources: Record<string, TxSource>;
}

/** RA 11032 Sec. 9 maximums, reused across pages */
export const LEGAL_LIMIT_SIMPLE = 'at most 3 working days after a complete request';
export const LEGAL_LIMIT_SIMPLE_OR_COMPLEX =
  'at most 3 working days (simple) or 7 working days (complex) after a complete application';
