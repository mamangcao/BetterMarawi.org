import type { FAQItem, Verification } from '@/types';

/**
 * How ordinances work in Marawi, from the Bangsamoro Local Governance Code of 2023
 * (Bangsamoro Autonomy Act No. 49). Each step and answer cites its BLGC section.
 */
export const BLGC_SOURCE: Verification = {
  level: 'sourced',
  source: 'Bangsamoro Local Governance Code of 2023 (BAA No. 49), BARMM Official Gazette',
  sourceUrl: 'https://officialgazette.bangsamoro.gov.ph/wp-content/uploads/2024/01/BAA-No.-49-BLGC-For-Publication.pdf',
  retrievedOn: '2026-10-24',
};

export interface OrdinanceStep {
  title: string;
  text: string;
  /** BLGC sections, shown under the step */
  sections: string;
}

export const ORDINANCE_STEPS: OrdinanceStep[] = [
  {
    title: 'Passed',
    text: 'The Sangguniang Panlungsod (City Council) votes it through. The City Vice Mayor presides and votes only to break a tie.',
    sections: 'BLGC ss. 56, 57',
  },
  {
    title: 'Signed or vetoed',
    text: 'The Mayor signs every page or vetoes it in writing within 10 days. If the Mayor does neither, it counts as signed. Two-thirds of all council members can override a veto.',
    sections: 'BLGC ss. 62, 63',
  },
  {
    title: 'Reviewed by the province',
    text: 'The Sangguniang Panlalawigan of Lanao del Sur has 30 days to review it. If it takes no action, the ordinance stands.',
    sections: 'BLGC s. 64',
  },
  {
    title: 'In force',
    text: 'Unless it says otherwise, it takes effect 10 days after it is posted at the City Hall entrance and in at least 2 other public places, in Filipino or English and in the language most people in the city understand.',
    sections: 'BLGC s. 67',
  },
];

export const ORDINANCE_FAQS: FAQItem[] = [
  {
    question: 'What is an ordinance, and who makes them in Marawi?',
    answer:
      'An ordinance is a local law. In Marawi, the Sangguniang Panlungsod (City Council) makes them, with the City Vice Mayor presiding. Examples include the yearly appropriations ordinance (the city budget) and tax ordinances. (BLGC ss. 56 and 57)',
  },
  {
    question: 'Can the Mayor veto any ordinance?',
    answer:
      'No. The Mayor may veto an ordinance only if it goes beyond the council’s powers or harms the public welfare, and must give the reasons in writing. The Mayor can veto an ordinance only once, and two-thirds of all council members can override the veto. In the budget and other money ordinances, the Mayor can veto single items. (BLGC s. 63)',
  },
  {
    question: 'Who reviews barangay ordinances?',
    answer:
      'The Sangguniang Panlungsod. A barangay sends copies within 10 days of passing an ordinance. If the city council takes no action within 30 days, the ordinance is approved. If it finds the ordinance inconsistent with the law or city ordinances, it sends it back for changes, and the ordinance is suspended until it is revised. (BLGC s. 65)',
  },
  {
    question: 'What are the penalties for breaking a tax ordinance?',
    answer:
      'The city can set a fine of ₱40,000 to ₱1,200,000, imprisonment of 1 to 6 months, or both, at the court’s discretion. A barangay can set a fine of ₱1,000 to ₱10,000. (BLGC s. 576)',
  },
  {
    question: 'Can I question a tax ordinance?',
    answer:
      'Yes. Public hearings must be held before a tax ordinance is passed. Within 30 days after it takes effect, you can appeal to the Secretary of Justice, who has 60 days to decide. The tax is still collected while the appeal is pending. Within 30 days after the decision, or after the 60 days pass with no decision, you can go to court. (BLGC s. 212)',
  },
  {
    question: 'Where can I read Marawi’s ordinances?',
    answer:
      'Ordinances are posted at the City Hall entrance and in at least two other public places. Tax ordinances must also be published in a local newspaper (or posted in public places where there is none) and posted online, including on the Bangsamoro Online Register of Ordinances. This page will list Marawi’s ordinances once official copies are available. (BLGC ss. 67 and 213)',
  },
];
