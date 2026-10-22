// Business-related services in the Islamic City of Marawi.
// Figures come from the city's official BPLO portal or from national law (sources below).
// Marawi's own fee schedule (city Revenue Code) is not yet published online, so city-set
// amounts are marked "set by the city" instead of guessed. Do not add amounts without a source.

export interface BusinessSource {
  id: string;
  label: string;
  url: string;
}

export const BUSINESS_SOURCES: Record<string, BusinessSource> = {
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
};

/** How a figure is backed: national law applies in Marawi as written; city-set amounts are not yet published. */
export type FigureBasis = 'law' | 'city' | 'portal';

export interface BusinessService {
  id: string;
  name: string;
  office: string;
  fee: string;
  feeBasis: FigureBasis;
  time: string;
  timeBasis: FigureBasis;
  how: string;
  /** Link to apply or pay online, when the city offers it */
  online?: { label: string; url: string };
  notes?: string[];
  sources: (keyof typeof BUSINESS_SOURCES)[];
}

const SIMPLE_COMPLEX =
  'Up to 3 working days (simple) or 7 working days (complex) from a complete application';

export const BUSINESS_SERVICES: BusinessService[] = [
  {
    id: 'new-permit',
    name: "New Business Permit (Mayor's Permit)",
    office: 'Business Permits and Licensing Office (BPLO), at the Business One-Stop Shop',
    fee: 'Business tax and regulatory fees, assessed by the BPLO and City Treasurer based on business type and declared capital',
    feeBasis: 'city',
    time: SIMPLE_COMPLEX,
    timeBasis: 'law',
    how: 'Apply online with a single unified form, or at the Business One-Stop Shop. Sanitary, environmental, and agricultural clearances are issued together with the permit.',
    online: { label: 'Apply online (New)', url: 'https://www.bplomarawicity.com/apply-for-business-permit' },
    notes: ['A business permit is valid for one year.'],
    sources: ['portal', 'ra11032'],
  },
  {
    id: 'renewal',
    name: 'Business Permit Renewal',
    office: 'BPLO and City Treasurer’s Office',
    fee: 'Business tax for the year (based on the previous year’s gross sales or receipts) plus regulatory fees, assessed by the city',
    feeBasis: 'city',
    time: SIMPLE_COMPLEX,
    timeBasis: 'law',
    how: 'Renew online or at the Business One-Stop Shop. Taxes may be paid for the whole year or in quarterly installments.',
    online: { label: 'Renew online', url: 'https://www.bplomarawicity.com/apply-for-business-permit' },
    notes: [
      'Due within the first 20 days of January, or of each quarter if paying in installments.',
      'If the city does not act on a complete renewal within the processing time, the permit is automatically extended.',
    ],
    sources: ['portal', 'ra11032', 'ra7160'],
  },
  {
    id: 'business-tax',
    name: 'Business Tax Payment',
    office: 'City Treasurer’s Office',
    fee: 'Assessed by the city on gross sales or receipts, per the Marawi City Revenue Code',
    feeBasis: 'city',
    time: 'Annual, or quarterly within the first 20 days of each quarter',
    timeBasis: 'law',
    how: 'Pay online through the Marawi City BPLO System, or at the City Treasurer’s Office.',
    online: { label: 'Pay online', url: 'https://www.bplomarawicity.com/' },
    sources: ['portal', 'ra7160'],
  },
  {
    id: 'cedula',
    name: 'Community Tax Certificate (Cedula)',
    office: 'City Treasurer’s Office',
    fee: 'Individuals: ₱5 basic, plus ₱1 for every ₱1,000 of income (additional tax up to ₱5,000). Businesses and other juridical persons: ₱500 basic, plus ₱2 for every ₱5,000 of gross receipts or real property value (additional tax up to ₱10,000).',
    feeBasis: 'law',
    time: 'Due by the last day of February each year',
    timeBasis: 'law',
    how: 'Pay where you live (individuals) or where the business has its principal office.',
    notes: ['Late payment adds 24% interest per year.'],
    sources: ['ra7160'],
  },
  {
    id: 'barangay-clearance',
    name: 'Barangay Business Clearance',
    office: 'Applied for and issued at the city’s Business One-Stop Shop, on behalf of the barangay',
    fee: 'Set by barangay and city ordinance',
    feeBasis: 'city',
    time: SIMPLE_COMPLEX,
    timeBasis: 'law',
    how: 'No separate trip to the barangay hall is needed: it is applied for, issued, and paid at the city, which remits the barangay’s share.',
    sources: ['ra11032'],
  },
  {
    id: 'retirement',
    name: 'Business Retirement (Closure)',
    office: 'BPLO and City Treasurer’s Office',
    fee: 'Any business tax still due on the current year’s actual gross sales or receipts',
    feeBasis: 'law',
    time: SIMPLE_COMPLEX,
    timeBasis: 'law',
    how: 'Submit a sworn statement of the year’s gross sales or receipts. If the tax already paid is lower than what is due, pay the difference before the business is officially retired.',
    sources: ['ra7160', 'ra11032'],
  },
  {
    id: 'real-property-tax',
    name: 'Real Property Tax Payment',
    office: 'City Treasurer’s Office',
    fee: 'Assessed by the city on the property’s assessed value',
    feeBasis: 'city',
    time: 'Annual, or in quarterly installments',
    timeBasis: 'law',
    how: 'Look up property details, compute dues, and pay online through the Marawi City BPLO System.',
    online: { label: 'Pay online', url: 'https://www.bplomarawicity.com/' },
    sources: ['portal', 'ra7160'],
  },
];

/** Late-payment rules for local taxes and fees (RA 7160 Sec. 168). The city sets the exact rates up to these limits. */
export const LATE_PAYMENT_RULE =
  'Late local taxes and fees may carry a surcharge of up to 25%, plus interest of up to 2% per month on the unpaid amount (the city sets the exact rates within these limits).';
