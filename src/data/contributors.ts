// People who build and look after BetterMarawi.org, shown in the footer's
// Contributors window. Each person has exactly one public contact.
// Only add contact details the person has agreed to publish.

export type ContributorCategory =
  | 'maintainers'
  | 'software'
  | 'design'
  | 'content'
  | 'marketing'
  | 'translation';

export type ContributorContact =
  | { type: 'website'; url: string }
  | { type: 'email'; address: string }
  | { type: 'github'; username: string }
  | { type: 'phone'; number: string };

export interface Contributor {
  name: string;
  role: string;
  category: ContributorCategory;
  contact: ContributorContact;
  /** Optional square photo in /public, cropped to head and shoulders, about 256px, served as-is (shown as a 48px circle). Initials are shown without one. */
  photo?: string;
}

/** Display order of categories in the window */
export const CONTRIBUTOR_CATEGORIES: ContributorCategory[] = [
  'maintainers',
  'software',
  'design',
  'content',
  'marketing',
  'translation',
];

export const CONTRIBUTORS: Contributor[] = [
  {
    name: 'Abdul Haleem Mamangcao',
    role: 'Project Lead & Maintainer',
    category: 'maintainers',
    contact: { type: 'website', url: 'https://mamangcao.com/' },
    photo: '/images/contributors/abdul-haleem-mamangcao.webp',
  },
];
