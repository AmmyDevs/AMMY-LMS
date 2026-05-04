export const CONTENT_FILES: Record<string, string> = {
  'welcome': '# Welcome to AMMY LMS\n\nThis is your first module.',
  'introduction': '# Introduction\n\nLearn the basics here.',
}

export const SLUG_TO_FILE: Record<string, string> = {
  'welcome': 'welcome',
  'intro': 'introduction',
}

export const CONTENT_NAV: Array<{
  id: string;
  type: 'lecture' | 'self-study' | 'further';
  label: string;
  subtitle?: string;
  children?: Array<{
    id: string;
    label: string;
    slug: string;
  }>;
}> = [
  {
    id: 'lecture-1',
    type: 'lecture',
    label: 'Lecture 1',
    children: [
      { id: 'lecture-1-1', label: 'Introduction', slug: 'welcome' },
      { id: 'lecture-1-2', label: 'Basics', slug: 'introduction' },
    ],
  },
  {
    id: 'self-study-1',
    type: 'self-study',
    label: 'Self Study',
    children: [
      { id: 'self-study-1-1', label: 'Practice', slug: 'welcome' },
    ],
  },
  {
    id: 'further-1',
    type: 'further',
    label: 'Further Reading',
    children: [],
  },
];