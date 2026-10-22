// Elected officials of the Islamic City of Marawi, 2025–2028 term.
// Every name has a source. A name is null when no source confirms who holds the seat;
// the page then shows "To be confirmed" instead of a guess.
// Phone numbers and emails are left out until an official source publishes them.

export interface OfficialsSource {
  id: string;
  label: string;
  url: string;
}

export const OFFICIALS_SOURCES = {
  owner: {
    id: 'owner',
    label: 'Verified by the BetterMarawi.org team (current officeholders), Oct 22, 2026',
    url: '/government/local-officials-directory',
  },
  rappler: {
    id: 'rappler',
    label: 'Rappler, Marawi City 2025 election results (COMELEC transmission data)',
    url: 'https://ph.rappler.com/elections/2025/local-race/lanao-del-sur/marawi-city',
  },
  wikipedia: {
    id: 'wikipedia',
    label: 'Wikipedia, Marawi: city government 2025–2028',
    url: 'https://en.wikipedia.org/wiki/Marawi',
  },
} satisfies Record<string, OfficialsSource>;

export interface LocalOfficial {
  id: string;
  /** null when no source confirms who holds the seat */
  name: string | null;
  position: string;
  detail?: string;
  party?: string;
  term: string;
  photo?: string;
  sources: (keyof typeof OFFICIALS_SOURCES)[];
}

const TERM = '2025–2028';

export const EXECUTIVES: LocalOfficial[] = [
  {
    id: 'mayor',
    name: 'Hon. Shariff Zain Lanto Gandamra',
    position: 'City Mayor',
    detail: 'Local Chief Executive · Office of the City Mayor',
    term: TERM,
    photo: '/images/officials/mayor-shariff-zain-gandamra.webp',
    sources: ['owner', 'rappler'],
  },
  {
    id: 'vice-mayor',
    name: 'Hon. Majul Usman Gandamra',
    position: 'City Vice Mayor',
    detail: 'Presiding Officer · Sangguniang Panlungsod',
    term: TERM,
    photo: '/images/officials/vice-mayor-majul-gandamra.webp',
    sources: ['owner', 'rappler'],
  },
];

/** The 10 elected city councilors (lone district), in order of votes received. */
export const COUNCILORS: LocalOfficial[] = [
  ['Mohammad Shaquille L. Gandamra', 'Lakas–CMD'],
  ['Sajid D. Munder', 'Lakas–CMD'],
  ['Lailyn M. Dimal', 'Lakas–CMD'],
  ['Borgie B. Dalidig', 'Lakas–CMD'],
  ['Sultan Jawar R. Domato', 'Lakas–CMD'],
  ['Nasrollah M. Basman', 'Lakas–CMD'],
  ['Sihawi A. Lala, Sr.', 'Lakas–CMD'],
  ['Mohammad Khalid M. Salic', 'Lakas–CMD'],
  ['Ozamah D. Macabangon', 'Lakas–CMD'],
  ['Jackie S. Mangondato', 'Nacionalista Party'],
].map(([name, party], i) => ({
  id: `councilor-${i + 1}`,
  name: `Hon. ${name}`,
  position: 'City Councilor',
  party,
  term: TERM,
  sources: ['rappler', 'wikipedia'],
}));

/**
 * Ex-officio members. These seats come from the Liga ng mga Barangay and the SK Federation,
 * not from the city election, and no public source confirms the current holders.
 * Barangay and SK elections are scheduled for November 2, 2026, which will change these seats.
 */
export const EX_OFFICIO: LocalOfficial[] = [
  {
    id: 'liga-president',
    name: null,
    position: 'Liga ng mga Barangay President',
    detail: 'Ex-officio member, representing the 101 barangays',
    term: 'Until the next barangay elections',
    sources: [],
  },
  {
    id: 'sk-president',
    name: null,
    position: 'SK Federation President',
    detail: 'Ex-officio member, representing the Sangguniang Kabataan',
    term: 'Until the next SK elections',
    sources: [],
  },
];
