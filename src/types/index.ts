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
  hotline: string;
  email: string;
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
  head: string;
  designation: string;
  mandate: string;
  location: string;
  phone: string;
  email: string;
  keyServices: string[];
}

export interface ElectedOfficial extends Verification {
  initials: string;
  name: string;
  role: string;
  term: string;
  committeeOrOffice: string;
  phone: string;
  email: string;
}

export interface OrdinanceRecord extends Verification {
  number: string;
  title: string;
  dateEnacted: string;
  category: string;
  sponsor: string;
  status: string;
}

export interface FDPDocument extends Verification {
  code: string;
  title: string;
  frequency: 'Quarterly' | 'Annual';
  latestPeriod: string;
  datePosted: string;
  officeResponsible: string;
  fileSize: string;
  status: 'Compliant · Posted on DILG FDP Portal';
}

export interface BarangayRecord extends Verification {
  id: number;
  name: string;
  psgcCode: string;
  district:
    | 'Central Poblacion'
    | 'Angoyao & East Basin'
    | 'Basak & MSU Corridor'
    | 'Northwest Highland'
    | 'Lakefront & Saduc';
  population2020: number;
  populationLatest: number;
  households: number;
  classification: 'Urban' | 'Rural';
  zoneStatus: 'Regular Barangay' | 'MAA Rehabilitated Sector';
}

export interface HotlineItem extends Verification {
  id: string;
  label: string;
  shortLabel: string;
  number: string;
  telHref: string;
  icon: 'Siren' | 'Flame' | 'Shield' | 'HeartPulse';
}

export interface TourismPlace extends Verification {
  name: string;
  barangay: string;
  note: string;
}

export interface TourismCategory extends Verification {
  id: string;
  title: string;
  countLabel: string;
  summary: string;
  places: TourismPlace[];
}

export interface BudgetSector {
  sector: string;
  amount: string;
  percentage: number;
  description: string;
}

export interface BudgetBreakdown extends Verification {
  fiscalYear: number;
  totalBudget: string;
  ntaShare: string;
  localSources: string;
  sectors: BudgetSector[];
  verification?: Verification;
}

export interface CMCIPillar extends Verification {
  pillar: string;
  score: number;
  rank?: number;
  year: number;
  summary?: string;
}
