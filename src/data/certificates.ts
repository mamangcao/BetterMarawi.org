// Certificates and clearances available to Marawi residents, and the offices that issue them.
// Fees and rules come from the sources in CERT_SOURCES. City and barangay fees are set by local
// ordinance and are not yet published online, so they are marked as such instead of guessed.
// Processing times stay null until an office publishes them (e.g. in its Citizen's Charter).

export interface CertSource {
  id: string;
  label: string;
  url: string;
}

export const CERT_SOURCES = {
  psaOutlet: {
    id: 'psaOutlet',
    label: 'PSA BARMM, launch of the CRS Marawi City Outlet (Feb 26, 2025)',
    url: 'https://rssobarmm.psa.gov.ph/system/files/attachment-dir/PR2025-06%20PSA-BARMM%20Launches%20the%20Civil%20Registry%20System%20%28CRS%29%20Marawi%20City%20Outlet_0.pdf',
  },
  psaFees: {
    id: 'psaFees',
    label: 'PSA, civil registry document fees (outlet and PSA Serbilis)',
    url: 'https://psa.gov.ph/content/public-advisory-101',
  },
  nbi: { id: 'nbi', label: 'NBI Clearance, official portal', url: 'https://clearance.nbi.gov.ph/' },
  pnp: { id: 'pnp', label: 'PNP National Police Clearance System, official portal', url: 'https://pnpclearance.ph/' },
  ra11261: {
    id: 'ra11261',
    label: 'RA 11261, First Time Jobseekers Assistance Act',
    url: 'https://lawphil.net/statutes/repacts/ra2019/ra_11261_2019.html',
  },
  ra11032: {
    id: 'ra11032',
    label: 'RA 11032, Ease of Doing Business Act (Sec. 9)',
    url: 'https://lawphil.net/statutes/repacts/ra2018/ra_11032_2018.html',
  },
  ra9048: {
    id: 'ra9048',
    label: 'RA 9048 and RA 10172, administrative correction of civil registry entries',
    url: 'https://lawphil.net/statutes/repacts/ra2001/ra_9048_2001.html',
  },
  pd1083: {
    id: 'pd1083',
    label: 'PD 1083, Code of Muslim Personal Laws (Art. 81)',
    url: 'https://lawphil.net/statutes/presdecs/pd1977/pd_1083_1977.html',
  },
} satisfies Record<string, CertSource>;

export type CertSourceId = keyof typeof CERT_SOURCES;

/** Where a fee comes from */
export type FeeBasis = 'law' | 'agency' | 'city' | 'barangay';

export interface Office {
  id: string;
  name: string;
  /** Short name for buttons */
  short: string;
  description: string;
  /** Location only when a source confirms it */
  location?: string;
  online?: { label: string; url: string };
  /** General steps for getting a document from this office */
  steps: string[];
  /** What to bring for most requests at this office */
  bring: string[];
  notes?: string[];
  sources: CertSourceId[];
}

export interface Certificate {
  id: string;
  name: string;
  description: string;
  officeId: string;
  category: CertCategory;
  fee: string;
  feeBasis: FeeBasis;
  /** Actual duration once the office publishes it; null until then */
  processing: string | null;
  /** A simple request (e.g. a copy or a certificate). The RA 11032 limit of 3 working days applies. */
  simple?: boolean;
  /** Free once for first-time jobseekers under RA 11261 */
  freeForFirstJob?: boolean;
  /** Extra things to bring for this certificate */
  bring?: string[];
  /** Link elsewhere on the site for more detail */
  more?: { label: string; href: string };
}

export type CertCategory = 'civil' | 'psa' | 'barangay' | 'clearance' | 'city';

export const CERT_CATEGORIES: { id: CertCategory; title: string; description: string }[] = [
  { id: 'psa', title: 'PSA civil registry documents', description: 'Official PSA copies, often required for passports, school, jobs, and benefits.' },
  { id: 'civil', title: 'Local civil registry', description: 'Registration, local certified copies, and corrections of birth, marriage, and death records.' },
  { id: 'barangay', title: 'Barangay certificates', description: 'Issued at your own barangay hall.' },
  { id: 'clearance', title: 'Police and NBI clearances', description: 'Usually required for employment and travel.' },
  { id: 'city', title: 'City Hall certificates', description: 'Tax, property, and health certificates from city offices.' },
];

export const OFFICES: Office[] = [
  {
    id: 'psa',
    name: 'PSA Civil Registry System (CRS) Marawi City Outlet',
    short: 'PSA CRS Marawi',
    description: 'Philippine Statistics Authority outlet in Marawi, opened on February 26, 2025, for PSA copies of civil registry documents.',
    location: 'Ground Floor, PSA Lanao del Sur Provincial Office, Rima Building, Brgy. Datu Saber, Marawi City',
    online: { label: 'Order online (PSA Serbilis, with delivery)', url: 'https://psaserbilis.com.ph/' },
    steps: [
      'Fill out the request form with the full name, date and place of the event (birth, marriage, or death), and the parents’ names.',
      'Present your valid ID at the counter, plus an authorization letter and IDs if you are requesting for someone else.',
      'Pay the fee per copy (cash or cashless).',
      'Receive the PSA copy, or the release schedule if it cannot be printed the same day.',
    ],
    bring: ['A valid government ID', 'For another person’s record: their authorization letter and ID'],
    notes: ['Online orders through PSA Serbilis cost more because delivery is included.'],
    sources: ['psaOutlet', 'psaFees'],
  },
  {
    id: 'lcr',
    name: 'City Civil Registrar’s Office',
    short: 'City Civil Registrar',
    description: 'Registers births, marriages, and deaths in Marawi, issues local certified copies, and handles corrections of records.',
    steps: [
      'Go to the City Civil Registrar’s Office with your ID and the details of the record.',
      'Fill out the request or registration form.',
      'Pay the fee at the City Treasurer’s Office and keep the official receipt.',
      'Return the receipt to the Civil Registrar and receive your document or the release date.',
    ],
    bring: ['A valid ID', 'Details of the record (names, date, and place)'],
    sources: ['ra9048', 'ra11032'],
  },
  {
    id: 'shariah',
    name: 'Shari’a Circuit Registrar',
    short: 'Shari’a Registrar',
    description: 'Registers Muslim marriages, divorces, revocations of divorce, and conversions to Islam under the Code of Muslim Personal Laws.',
    steps: [
      'Bring the marriage, divorce, or conversion documents to the Shari’a Circuit Registrar serving Marawi.',
      'Have the entry recorded in the proper register.',
      'Ask for a certified copy of the registered entry if you need one.',
    ],
    bring: ['Documents of the marriage, divorce, or conversion', 'Valid IDs of the parties'],
    sources: ['pd1083'],
  },
  {
    id: 'barangay',
    name: 'Barangay Hall (Office of the Punong Barangay)',
    short: 'Barangay Hall',
    description: 'Each of Marawi’s 101 barangays issues certificates to its own residents.',
    steps: [
      'Go to the barangay hall of the barangay where you live.',
      'Say which certificate you need and its purpose.',
      'Pay the barangay fee, if any.',
      'Receive the certificate signed by the Punong Barangay.',
    ],
    bring: ['A valid ID', 'Proof that you live in the barangay, if asked'],
    sources: ['ra11032', 'ra11261'],
  },
  {
    id: 'pnp',
    name: 'PNP National Police Clearance System',
    short: 'PNP Police Clearance',
    description: 'Police clearances are applied for online, then completed at a police station for photo and fingerprints.',
    online: { label: 'Apply at pnpclearance.ph', url: 'https://pnpclearance.ph/' },
    steps: [
      'Register and fill out your profile at pnpclearance.ph.',
      'Choose a police station and an appointment date.',
      'Pay online and keep the reference number.',
      'Go to the station on your date for photo and fingerprint capture.',
      'Receive your police clearance.',
    ],
    bring: ['Valid IDs', 'Your payment reference number'],
    sources: ['pnp'],
  },
  {
    id: 'nbi',
    name: 'NBI Clearance',
    short: 'NBI Clearance',
    description: 'National Bureau of Investigation clearances are applied for online, with a scheduled visit to an NBI clearance site.',
    online: { label: 'Apply at clearance.nbi.gov.ph', url: 'https://clearance.nbi.gov.ph/' },
    steps: [
      'Register and fill out the application at clearance.nbi.gov.ph.',
      'Choose an NBI clearance site and an appointment date.',
      'Pay through one of the listed payment channels.',
      'Go to the site on your date for photo and fingerprint capture.',
      'Receive your clearance. If your name matches a record (a “hit”), release takes longer.',
    ],
    bring: ['Valid IDs', 'Your payment reference number'],
    sources: ['nbi'],
  },
  {
    id: 'treasurer',
    name: 'City Treasurer’s Office',
    short: 'City Treasurer',
    description: 'Collects city taxes and fees and issues tax-related certificates.',
    steps: [
      'Go to the City Treasurer’s Office at City Hall.',
      'Request the certificate and have the amount assessed.',
      'Pay and receive your official receipt and certificate.',
    ],
    bring: ['A valid ID', 'Your latest tax receipts, for tax clearances'],
    sources: ['ra11032'],
  },
  {
    id: 'assessor',
    name: 'City Assessor’s Office',
    short: 'City Assessor',
    description: 'Keeps real property records and issues property-related certificates.',
    steps: [
      'Go to the City Assessor’s Office at City Hall.',
      'Give the owner’s name and the property details (tax declaration or lot number).',
      'Pay the certification fee at the City Treasurer’s Office.',
      'Return the receipt and receive the certified document.',
    ],
    bring: ['A valid ID', 'Property details or an old tax declaration, if you have one'],
    sources: ['ra11032'],
  },
  {
    id: 'cho',
    name: 'City Health Office',
    short: 'City Health Office',
    description: 'Issues health certificates, including those required for food handlers and business permits.',
    steps: [
      'Go to the City Health Office.',
      'Undergo the required check-up or laboratory tests.',
      'Pay the fee and receive your health certificate.',
    ],
    bring: ['A valid ID', 'Recent laboratory results, if asked'],
    sources: ['ra11032'],
  },
];

const CITY_FEE = 'Set by city ordinance';
const BRGY_FEE = 'Set by barangay ordinance';

export const CERTIFICATES: Certificate[] = [
  // PSA
  { id: 'psa-birth', name: 'PSA Birth Certificate', description: 'Official PSA copy of a birth record.', officeId: 'psa', category: 'psa', fee: '₱155 per copy at the outlet (₱330 online with delivery)', feeBasis: 'agency', processing: null, simple: true, freeForFirstJob: true },
  { id: 'psa-marriage', name: 'PSA Marriage Certificate', description: 'Official PSA copy of a marriage record.', officeId: 'psa', category: 'psa', fee: '₱155 per copy at the outlet (₱330 online with delivery)', feeBasis: 'agency', processing: null, simple: true, freeForFirstJob: true },
  { id: 'psa-death', name: 'PSA Death Certificate', description: 'Official PSA copy of a death record.', officeId: 'psa', category: 'psa', fee: '₱155 per copy at the outlet (₱330 online with delivery)', feeBasis: 'agency', processing: null, simple: true },
  { id: 'psa-cenomar', name: 'CENOMAR (Certificate of No Marriage)', description: 'Shows whether a person has a marriage on record. Often needed before marrying.', officeId: 'psa', category: 'psa', fee: '₱210 per copy at the outlet (₱430 online with delivery)', feeBasis: 'agency', processing: null, simple: true },

  // Local civil registry
  { id: 'lcr-copy', name: 'Certified Copy of a Local Birth, Marriage, or Death Record', description: 'A copy from the city’s own registry, for records registered in Marawi.', officeId: 'lcr', category: 'civil', fee: CITY_FEE, feeBasis: 'city', processing: null, simple: true },
  { id: 'lcr-registration', name: 'Registration of Birth, Marriage, or Death', description: 'Recording a new birth, marriage, or death that happened in Marawi.', officeId: 'lcr', category: 'civil', fee: CITY_FEE, feeBasis: 'city', processing: null },
  { id: 'lcr-late', name: 'Delayed Registration of Birth', description: 'For births that were not registered on time.', officeId: 'lcr', category: 'civil', fee: CITY_FEE, feeBasis: 'city', processing: null, bring: ['Supporting documents showing the birth details (e.g. baptismal, school, or medical records)'] },
  { id: 'lcr-correction', name: 'Correction of a Civil Registry Entry', description: 'Fix a clerical error, change a first name, or correct the day or month of birth or sex, without going to court.', officeId: 'lcr', category: 'civil', fee: '₱1,000 for a clerical error; ₱3,000 for a change of first name or a correction of birth date or sex. Newspaper publication, when required, costs extra.', feeBasis: 'law', processing: null, bring: ['The document with the error', 'At least two public or private documents showing the correct entry'] },
  { id: 'shariah-registration', name: 'Registration of Muslim Marriage, Divorce, or Conversion', description: 'Recording of Muslim marriages, divorces, revocations, and conversions under PD 1083.', officeId: 'shariah', category: 'civil', fee: 'Set by the Shari’a court', feeBasis: 'agency', processing: null },

  // Barangay
  { id: 'brgy-clearance', name: 'Barangay Clearance', description: 'Certifies that you are a resident in good standing. Often required for jobs and permits.', officeId: 'barangay', category: 'barangay', fee: BRGY_FEE, feeBasis: 'barangay', processing: null, simple: true, freeForFirstJob: true },
  { id: 'brgy-residency', name: 'Certificate of Residency', description: 'Certifies that you live in the barangay.', officeId: 'barangay', category: 'barangay', fee: BRGY_FEE, feeBasis: 'barangay', processing: null, simple: true },
  { id: 'brgy-indigency', name: 'Certificate of Indigency', description: 'Certifies low-income status, for medical, burial, legal, or financial assistance.', officeId: 'barangay', category: 'barangay', fee: BRGY_FEE, feeBasis: 'barangay', processing: null, simple: true },
  { id: 'brgy-ftjs', name: 'First Time Jobseeker Certification', description: 'Proof that you are a first-time jobseeker, so you can get the free documents under RA 11261.', officeId: 'barangay', category: 'barangay', fee: 'Free', feeBasis: 'law', processing: null, simple: true },
  { id: 'brgy-business', name: 'Barangay Business Clearance', description: 'For businesses. Applied for and issued at the city’s Business One-Stop Shop, not at the barangay hall.', officeId: 'barangay', category: 'barangay', fee: BRGY_FEE, feeBasis: 'barangay', processing: null, more: { label: 'See business services', href: '/services/business-and-livelihood#barangay-clearance' } },

  // Clearances
  { id: 'police', name: 'Police Clearance', description: 'National police clearance, valid nationwide.', officeId: 'pnp', category: 'clearance', fee: '₱150, plus a small payment-channel fee', feeBasis: 'agency', processing: null, freeForFirstJob: true },
  { id: 'nbi', name: 'NBI Clearance', description: 'National Bureau of Investigation clearance, often required for employment abroad and government jobs.', officeId: 'nbi', category: 'clearance', fee: '₱155 (₱130 clearance fee and ₱25 e-payment fee)', feeBasis: 'agency', processing: null, freeForFirstJob: true },

  // City Hall
  { id: 'cedula', name: 'Community Tax Certificate (Cedula)', description: 'Proof of community tax payment, required for many transactions.', officeId: 'treasurer', category: 'city', fee: 'Individuals: ₱5, plus ₱1 for every ₱1,000 of income (up to ₱5,000 more)', feeBasis: 'law', processing: null, simple: true, more: { label: 'Full cedula rates', href: '/services/business-and-livelihood#cedula' } },
  { id: 'tax-clearance', name: 'Tax Clearance', description: 'Certifies that you have no unpaid city taxes.', officeId: 'treasurer', category: 'city', fee: CITY_FEE, feeBasis: 'city', processing: null, simple: true },
  { id: 'tax-declaration', name: 'Certified Copy of Tax Declaration', description: 'Official copy of a property’s tax declaration.', officeId: 'assessor', category: 'city', fee: CITY_FEE, feeBasis: 'city', processing: null, simple: true },
  { id: 'no-property', name: 'Certificate of No Property (No Landholding)', description: 'Certifies that a person has no real property declared in Marawi.', officeId: 'assessor', category: 'city', fee: CITY_FEE, feeBasis: 'city', processing: null, simple: true },
  { id: 'health-cert', name: 'Health Certificate', description: 'For food handlers and other workers whose business permit requires it.', officeId: 'cho', category: 'city', fee: CITY_FEE, feeBasis: 'city', processing: null },
];

/** Processing-time ceiling for simple transactions at government offices (RA 11032 Sec. 9) */
export const LEGAL_LIMIT_SIMPLE = 'at most 3 working days after a complete request';
