export type LanguageCode = 'EN' | 'FIL' | 'MRW';

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

export interface ServicePageData {
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
}

export interface DepartmentRecord {
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

export interface ElectedOfficial {
  initials: string;
  name: string;
  role: string;
  term: string;
  committeeOrOffice: string;
  phone: string;
  email: string;
}

export interface OrdinanceRecord {
  number: string;
  title: string;
  dateEnacted: string;
  category: string;
  sponsor: string;
  status: string;
}

export interface FDPDocument {
  code: string;
  title: string;
  frequency: 'Quarterly' | 'Annual';
  latestPeriod: string;
  datePosted: string;
  officeResponsible: string;
  fileSize: string;
  status: 'Compliant · Posted on DILG FDP Portal';
}

export interface BarangayRecord {
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
