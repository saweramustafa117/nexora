import { mockCandidates } from './mockCandidates';

export const recruiterSummary = {
  totalApplications: 247,
  relevantMatches: 89,
  timeSavedHours: 156,
  activeJobPostings: 6,
};

export const recruiterAnalytics = {
  applicationQuality: [
    { name: 'Relevant', value: 89, color: '#6366f1' },
    { name: 'Irrelevant', value: 158, color: '#e2e8f0' },
  ],
  hiringFunnel: [
    { stage: 'Applications', count: 247 },
    { stage: 'AI Screened', count: 198 },
    { stage: 'Relevant Match', count: 89 },
    { stage: 'Shortlisted', count: 24 },
    { stage: 'Interview', count: 12 },
    { stage: 'Offer', count: 3 },
  ],
};

export const recruiterJobPostings = [
  {
    id: 'j1',
    title: 'Senior Full Stack Engineer',
    department: 'Engineering',
    applicants: 68,
    avgMatch: 74,
    matchDistribution: [
      { range: '90-100%', count: 8 },
      { range: '80-89%', count: 15 },
      { range: '70-79%', count: 22 },
      { range: '60-69%', count: 14 },
      { range: '<60%', count: 9 },
    ],
    status: 'active',
    posted: '2026-01-15',
  },
  {
    id: 'j2',
    title: 'Frontend Engineer (React/TypeScript)',
    department: 'Engineering',
    applicants: 52,
    avgMatch: 71,
    matchDistribution: [
      { range: '90-100%', count: 5 },
      { range: '80-89%', count: 12 },
      { range: '70-79%', count: 18 },
      { range: '60-69%', count: 11 },
      { range: '<60%', count: 6 },
    ],
    status: 'active',
    posted: '2026-01-20',
  },
  {
    id: 'j3',
    title: 'Senior Product Manager',
    department: 'Product',
    applicants: 41,
    avgMatch: 68,
    matchDistribution: [
      { range: '90-100%', count: 4 },
      { range: '80-89%', count: 10 },
      { range: '70-79%', count: 14 },
      { range: '60-69%', count: 9 },
      { range: '<60%', count: 4 },
    ],
    status: 'active',
    posted: '2026-02-01',
  },
  {
    id: 'j4',
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    applicants: 35,
    avgMatch: 72,
    matchDistribution: [
      { range: '90-100%', count: 6 },
      { range: '80-89%', count: 9 },
      { range: '70-79%', count: 12 },
      { range: '60-69%', count: 5 },
      { range: '<60%', count: 3 },
    ],
    status: 'active',
    posted: '2026-02-05',
  },
  {
    id: 'j5',
    title: 'Content Marketing Lead',
    department: 'Marketing',
    applicants: 28,
    avgMatch: 65,
    matchDistribution: [
      { range: '90-100%', count: 2 },
      { range: '80-89%', count: 6 },
      { range: '70-79%', count: 10 },
      { range: '60-69%', count: 7 },
      { range: '<60%', count: 3 },
    ],
    status: 'active',
    posted: '2026-02-10',
  },
  {
    id: 'j6',
    title: 'Enterprise Account Executive',
    department: 'Sales',
    applicants: 23,
    avgMatch: 61,
    matchDistribution: [
      { range: '90-100%', count: 1 },
      { range: '80-89%', count: 4 },
      { range: '70-79%', count: 8 },
      { range: '60-69%', count: 6 },
      { range: '<60%', count: 4 },
    ],
    status: 'paused',
    posted: '2026-01-28',
  },
];

export const getCandidatesForJob = (jobId) =>
  mockCandidates.filter((c) => c.jobId === jobId);

export const recruiterProfile = {
  name: 'Jamie Thornton',
  role: 'Talent Lead',
  company: 'TechFlow Inc.',
  avatar: 'JT',
};
