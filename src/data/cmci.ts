import { CMCIPillar, Verification } from '@/types';

export const cmciVerification: Verification = {
  level: 'sourced',
  source: 'DTI Cities and Municipalities Competitiveness Index (CMCI)',
  sourceUrl: 'https://cmci.dti.gov.ph',
  retrievedOn: '2024',
};

export const CMCI_SUMMARY = {
  cycleYear: 2024,
  category: 'Component Cities',
  compositeScore: 33.3515,
  overallRank: 98,
};

export const CMCI_PILLARS: CMCIPillar[] = [
  {
    pillar: 'Economic Dynamism',
    score: 4.3606,
    rank: 51,
    year: 2024,
    summary: 'Evaluates local economy size, growth, employment generation, and business registration dynamism.',
    level: 'sourced',
    source: 'DTI CMCI Portal (2024 Cycle)',
    sourceUrl: 'https://cmci.dti.gov.ph',
    retrievedOn: '2024',
  },
  {
    pillar: 'Government Efficiency',
    score: 8.1133,
    rank: 113,
    year: 2024,
    summary: 'Measures LGU administrative capacity, transparency compliance, revenue generation, and public service delivery.',
    level: 'sourced',
    source: 'DTI CMCI Portal (2024 Cycle)',
    sourceUrl: 'https://cmci.dti.gov.ph',
    retrievedOn: '2024',
  },
  {
    pillar: 'Infrastructure',
    score: 3.0089,
    rank: 110,
    year: 2024,
    summary: 'Assesses physical connectivity, basic utilities, healthcare facilities, education infrastructure, and road networks.',
    level: 'sourced',
    source: 'DTI CMCI Portal (2024 Cycle)',
    sourceUrl: 'https://cmci.dti.gov.ph',
    retrievedOn: '2024',
  },
  {
    pillar: 'Resiliency',
    score: 11.3701,
    rank: 67,
    year: 2024,
    summary: 'Evaluates disaster risk reduction preparedness, emergency response systems, budget allocation, and social safety nets.',
    level: 'sourced',
    source: 'DTI CMCI Portal (2024 Cycle)',
    sourceUrl: 'https://cmci.dti.gov.ph',
    retrievedOn: '2024',
  },
  {
    pillar: 'Innovation',
    score: 6.4986,
    rank: 80,
    year: 2024,
    summary: 'Reflects ICT development, digital civil governance, educational institutions, intellectual property, and innovation ecosystem.',
    level: 'sourced',
    source: 'DTI CMCI Portal (2024 Cycle)',
    sourceUrl: 'https://cmci.dti.gov.ph',
    retrievedOn: '2024',
  },
];
