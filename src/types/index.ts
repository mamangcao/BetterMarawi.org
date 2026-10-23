export type LanguageCode = 'EN' | 'FIL' | 'MRW';

export type VerificationLevel = 'sourced' | 'confirmed';

export type Verification = {
  verified?: boolean; // missing or false = unverified; true counts as "confirmed"
  level?: VerificationLevel;
  source?: string; // exact document or page
  sourceUrl?: string;
  verifiedOn?: string; // YYYY-MM-DD
  retrievedOn?: string; // YYYY-MM-DD or Month DD, YYYY
};

export interface NavSubItem {
  label: string;
  href: string;
  description: string;
  badge?: string;
}

export interface CharterStep {
  stepNumber: number;
  title: string;
  clientAction: string;
  agencyAction: string;
  officeWindow: string;
  processingTime: string;
  personResponsible: string;
}

export interface FeeItem {
  particular: string;
  amount: string;
  legalBasis: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServicePageData extends Verification {
  slug: string;
  title: string;
  shortDescription: string;
  heroSummary: string;
  responsibleOffice: string;
  officeAcronym: string;
  officeLocation: string;
  operatingHours: string;
  totalProcessingTime: string;
  classification: 'Simple Transaction' | 'Complex Transaction' | 'Highly Technical';
  whoMayAvail: string;
  requirements: string[];
  charterSteps: CharterStep[];
  fees: FeeItem[];
  faqs: FAQItem[];
  highlights: { label: string; value: string }[];
  popular?: boolean;
  popularRank?: number;
}

export interface DepartmentRecord extends Verification {
  id: string;
  name: string;
  acronym: string;
  /** Only when sourced; otherwise the UI shows "To be confirmed" */
  head?: string;
  /** Source for the head only. The rest of the record (mandate, location, services) is verified separately. */
  headVerification?: Verification;
  designation: string;
  mandate: string;
  location: string;
  phone?: string;
  email?: string;
  keyServices: string[];
}

export interface OrdinanceRecord extends Verification {
  number: string;
  title: string;
  dateEnacted: string;
  category: string;
  sponsor: string;
  status: string;
}

export type FDPPeriod = 'Annual' | 'Q1' | 'Q2' | 'Q3' | 'Q4';

/** One posted file on the DILG Full Disclosure Policy Portal */
export interface FDPFile {
  period: FDPPeriod;
  url: string;
}

/** A Full Disclosure Policy document type for one year. No files means it is not posted. */
export interface FDPDocument extends Verification {
  /** DILG portal document_filter value */
  filterId: number;
  title: string;
  frequency: 'Annual' | 'Quarterly';
  /** Also listed on the Transparency Documents page (procurement plans and bid results) */
  procurement: boolean;
  files: FDPFile[];
}

export interface BarangayRecord extends Verification {
  id: number;
  name: string;
  /** PSA 10-digit PSGC code */
  psgcCode: string;
  /** PSA correspondence (9-digit) code; empty when PSA lists none */
  correspondenceCode: string;
  /** 2024 Census of Population (POPCEN), PSA */
  populationLatest: number;
  classification: 'Urban' | 'Rural';
}

export interface HotlineItem extends Verification {
  id: string;
  label: string;
  shortLabel: string;
  number: string;
  telHref: string;
  icon: 'Siren' | 'Flame' | 'Shield' | 'HeartPulse';
}

export interface CMCIPillar extends Verification {
  pillar: string;
  score: number;
  rank?: number;
  year: number;
  summary?: string;
}
