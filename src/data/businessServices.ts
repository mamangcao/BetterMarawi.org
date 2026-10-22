// Business-related services in the Islamic City of Marawi, in the shared transactions format.
// Figures come from the city's official BPLO portal or from national law (sources below).
// Marawi's own fee schedule (city Revenue Code) is not yet published online, so city-set
// amounts are marked "set by the city" instead of guessed. Do not add amounts without a source.
// Transaction ids are anchors (e.g. #cedula, #barangay-clearance) linked from other pages: keep them stable.

import {
  LEGAL_LIMIT_SIMPLE,
  LEGAL_LIMIT_SIMPLE_OR_COMPLEX,
  type Transaction,
  type TxCategory,
  type TxDirectoryData,
  type TxOffice,
  type TxSource,
} from '@/types/transactions';

export const BUSINESS_SOURCES = {
  portal: {
    id: 'portal',
    label: 'Marawi City BPLO System (official online portal)',
    url: 'https://www.bplomarawicity.com/',
  },
  ra11032: {
    id: 'ra11032',
    label: 'RA 11032, Ease of Doing Business Act (Sec. 9 and 11)',
    url: 'https://lawphil.net/statutes/repacts/ra2018/ra_11032_2018.html',
  },
  ra7160: {
    id: 'ra7160',
    label: 'RA 7160, Local Government Code (Sec. 145, 157–161, 165–168)',
    url: 'https://lawphil.net/statutes/repacts/ra1991/ra_7160_1991.html',
  },
} satisfies Record<string, TxSource>;

export const BUSINESS_CATEGORIES: TxCategory[] = [
  { id: 'permits', title: 'Business permits', description: 'Starting, renewing, and closing a business in Marawi.' },
  { id: 'taxes', title: 'Taxes and payments', description: 'Local taxes you pay to the City Treasurer, online or at the counter.' },
];

export const BUSINESS_OFFICES: TxOffice[] = [
  {
    id: 'bplo',
    name: 'Business Permits and Licensing Office (BPLO) · Business One-Stop Shop',
    description:
      'Handles new permits, renewals, and closures. The treasury, permits, zoning, and fire safety desks work together in the Business One-Stop Shop, so most steps happen in one place.',
    online: { label: 'Apply or renew at bplomarawicity.com', url: 'https://www.bplomarawicity.com/apply-for-business-permit' },
    steps: [
      'Fill out the single unified business application form, online on the Marawi City BPLO System or at the Business One-Stop Shop.',
      'Submit your requirements. The BPLO checks them, and the City Treasurer assesses your business tax and fees.',
      'Pay the assessed amount online or at the City Treasurer’s desk in the One-Stop Shop.',
      'Receive your Mayor’s Permit. Sanitary, environmental, and agricultural clearances, and the barangay business clearance, are issued together with it.',
      'Track your application anytime with your Business Identification Number (BIN) on the city portal.',
    ],
    bring: [
      'A valid ID of the owner or authorized representative',
      'Your business registration: DTI (sole proprietorship), SEC (corporation or partnership), or CDA (cooperative)',
      'For renewals: your previous Mayor’s Permit and a statement of last year’s gross sales or receipts',
    ],
    sources: ['portal', 'ra11032'],
  },
  {
    id: 'treasurer',
    name: 'City Treasurer’s Office',
    description: 'Collects business tax, community tax (cedula), and real property tax.',
    online: { label: 'Pay online at bplomarawicity.com', url: 'https://www.bplomarawicity.com/' },
    steps: [
      'Get your assessment online on the Marawi City BPLO System, or at the City Treasurer’s counter.',
      'Pay online or at the counter.',
      'Keep your official receipt as proof of payment.',
    ],
    bring: [
      'A valid ID',
      'For business tax: your BIN or Mayor’s Permit',
      'For real property tax: your tax declaration or property details',
    ],
    sources: ['portal', 'ra7160'],
  },
];

export const BUSINESS_TRANSACTIONS: Transaction[] = [
  {
    id: 'new-permit',
    name: "New Business Permit (Mayor's Permit)",
    description: 'Required before a business can operate in Marawi. Valid for one year.',
    officeId: 'bplo',
    category: 'permits',
    fee: 'Business tax and regulatory fees, assessed by the BPLO and City Treasurer based on business type and declared capital',
    feeBasis: 'city',
    processing: null,
    legalLimit: LEGAL_LIMIT_SIMPLE_OR_COMPLEX,
    schedule: 'Any time of the year, before starting operations.',
    online: { label: 'Apply online (New)', url: 'https://www.bplomarawicity.com/apply-for-business-permit' },
  },
  {
    id: 'renewal',
    name: 'Business Permit Renewal',
    description: 'Renews your Mayor’s Permit for the new year.',
    officeId: 'bplo',
    category: 'permits',
    fee: 'Business tax for the year (based on the previous year’s gross sales or receipts) plus regulatory fees, assessed by the city',
    feeBasis: 'city',
    processing: null,
    legalLimit: LEGAL_LIMIT_SIMPLE_OR_COMPLEX,
    schedule: 'Within the first 20 days of January, or of each quarter if paying in installments.',
    online: { label: 'Renew online', url: 'https://www.bplomarawicity.com/apply-for-business-permit' },
    notes: [
      'If the city does not act on a complete renewal within the legal processing time, the permit is automatically extended.',
    ],
  },
  {
    id: 'barangay-clearance',
    name: 'Barangay Business Clearance',
    description:
      'No separate trip to the barangay hall: it is applied for, issued, and paid at the city’s Business One-Stop Shop, which remits the barangay’s share.',
    officeId: 'bplo',
    category: 'permits',
    fee: 'Set by barangay and city ordinance',
    feeBasis: 'barangay',
    processing: null,
    legalLimit: LEGAL_LIMIT_SIMPLE_OR_COMPLEX,
    schedule: 'Together with your business permit application or renewal.',
  },
  {
    id: 'retirement',
    name: 'Business Retirement (Closure)',
    description: 'Officially closes a business so no further taxes accrue.',
    officeId: 'bplo',
    category: 'permits',
    fee: 'Any business tax still due on the current year’s actual gross sales or receipts',
    feeBasis: 'law',
    processing: null,
    legalLimit: LEGAL_LIMIT_SIMPLE_OR_COMPLEX,
    schedule: 'When the business stops operating.',
    bring: ['A sworn statement of the year’s gross sales or receipts'],
    notes: ['If the tax already paid is lower than what is due, pay the difference before the business is officially retired.'],
  },
  {
    id: 'business-tax',
    name: 'Business Tax Payment',
    description: 'The local tax on business gross sales or receipts.',
    officeId: 'treasurer',
    category: 'taxes',
    fee: 'Assessed by the city on gross sales or receipts, per the Marawi City Revenue Code',
    feeBasis: 'city',
    processing: null,
    schedule: 'Once a year within the first 20 days of January, or quarterly within the first 20 days of each quarter.',
    online: { label: 'Pay online', url: 'https://www.bplomarawicity.com/' },
  },
  {
    id: 'cedula',
    name: 'Community Tax Certificate (Cedula)',
    description: 'Proof of community tax payment, required for many transactions.',
    officeId: 'treasurer',
    category: 'taxes',
    fee: 'Individuals: ₱5 basic, plus ₱1 for every ₱1,000 of income (additional tax up to ₱5,000). Businesses and other juridical persons: ₱500 basic, plus ₱2 for every ₱5,000 of gross receipts or real property value (additional tax up to ₱10,000).',
    feeBasis: 'law',
    processing: null,
    legalLimit: LEGAL_LIMIT_SIMPLE,
    schedule: 'By the last day of February each year.',
    notes: [
      'Pay where you live (individuals) or where the business has its principal office.',
      'Late payment adds 24% interest per year.',
    ],
  },
  {
    id: 'real-property-tax',
    name: 'Real Property Tax Payment',
    description: 'The yearly tax on land and buildings.',
    officeId: 'treasurer',
    category: 'taxes',
    fee: 'Assessed by the city on the property’s assessed value',
    feeBasis: 'city',
    processing: null,
    schedule: 'Once a year, or in four quarterly installments.',
    online: { label: 'Pay online', url: 'https://www.bplomarawicity.com/' },
  },
];

/** Everything the transactions directory needs for this page */
export const BUSINESS_DIRECTORY: TxDirectoryData = {
  categories: BUSINESS_CATEGORIES,
  offices: BUSINESS_OFFICES,
  items: BUSINESS_TRANSACTIONS,
  sources: BUSINESS_SOURCES,
};

/** Late-payment rules for local taxes and fees (RA 7160 Sec. 168). The city sets the exact rates up to these limits. */
export const LATE_PAYMENT_RULE =
  'Late local taxes and fees may carry a surcharge of up to 25%, plus interest of up to 2% per month on the unpaid amount (the city sets the exact rates within these limits).';
