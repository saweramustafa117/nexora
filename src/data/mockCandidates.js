export const SKILL_OPTIONS = [
  'React', 'Node.js', 'TypeScript', 'Python', 'System Design', 'Cloud Deployment',
  'PostgreSQL', 'Docker', 'Kubernetes', 'GraphQL', 'Next.js', 'Machine Learning',
  'API Design', 'Git', 'AWS', 'Leadership', 'UX Research', 'Figma', 'SQL',
  'Terraform', 'CI/CD', 'MongoDB', 'Java', 'Go', 'Redis', 'Testing',
];

export const INDUSTRY_OPTIONS = [
  'Technology', 'Finance', 'Healthcare', 'E-commerce', 'SaaS', 'Consulting', 'Education', 'Media',
];

export const mockCandidates = [
  {
    id: 'rc1', name: 'Sarah Chen', avatar: 'SC', title: 'Senior Frontend Engineer',
    skills: [
      { name: 'React', proficiency: 95 }, { name: 'System Design', proficiency: 88 },
      { name: 'AWS', proficiency: 85 }, { name: 'Node.js', proficiency: 90 },
      { name: 'Leadership', proficiency: 82 }, { name: 'TypeScript', proficiency: 92 },
    ],
    proofOfWork: [
      { title: 'Open-source design system', url: '#', type: 'GitHub' },
      { title: 'E-commerce platform rebuild', url: '#', type: 'Portfolio' },
    ],
    potentialScore: 88, adaptabilityScore: 91, appliedJobs: ['j1', 'j2'],
  },
  {
    id: 'rc2', name: 'Marcus Johnson', avatar: 'MJ', title: 'ML Engineer',
    skills: [
      { name: 'Python', proficiency: 92 }, { name: 'Machine Learning', proficiency: 88 },
      { name: 'SQL', proficiency: 85 }, { name: 'React', proficiency: 55 },
      { name: 'System Design', proficiency: 70 }, { name: 'Docker', proficiency: 75 },
    ],
    proofOfWork: [
      { title: 'ML fraud detection model', url: '#', type: 'Kaggle' },
      { title: 'Real-time analytics dashboard', url: '#', type: 'Portfolio' },
    ],
    potentialScore: 90, adaptabilityScore: 94, appliedJobs: ['j1', 'j7'],
  },
  {
    id: 'rc3', name: 'Priya Patel', avatar: 'PP', title: 'Full Stack Developer',
    skills: [
      { name: 'React', proficiency: 72 }, { name: 'Node.js', proficiency: 88 },
      { name: 'MongoDB', proficiency: 85 }, { name: 'Docker', proficiency: 80 },
      { name: 'System Design', proficiency: 65 }, { name: 'TypeScript', proficiency: 70 },
    ],
    proofOfWork: [{ title: 'Microservices migration case study', url: '#', type: 'Blog' }],
    potentialScore: 82, adaptabilityScore: 85, appliedJobs: ['j1', 'j4'],
  },
  {
    id: 'rc4', name: "James O'Connor", avatar: 'JO', title: 'Backend Engineer',
    skills: [
      { name: 'Java', proficiency: 90 }, { name: 'Spring Boot', proficiency: 85 },
      { name: 'Kubernetes', proficiency: 78 }, { name: 'React', proficiency: 50 },
      { name: 'Node.js', proficiency: 45 }, { name: 'SQL', proficiency: 82 },
    ],
    proofOfWork: [],
    potentialScore: 75, adaptabilityScore: 72, appliedJobs: ['j1'],
  },
  {
    id: 'rc5', name: 'Elena Volkov', avatar: 'EV', title: 'Frontend Specialist',
    skills: [
      { name: 'TypeScript', proficiency: 92 }, { name: 'Next.js', proficiency: 90 },
      { name: 'GraphQL', proficiency: 88 }, { name: 'Testing', proficiency: 85 },
      { name: 'System Design', proficiency: 75 }, { name: 'React', proficiency: 94 },
    ],
    proofOfWork: [
      { title: 'GraphQL API framework', url: '#', type: 'GitHub' },
      { title: 'Testing best practices guide', url: '#', type: 'Blog' },
    ],
    potentialScore: 86, adaptabilityScore: 89, appliedJobs: ['j2'],
  },
  {
    id: 'rc6', name: 'David Kim', avatar: 'DK', title: 'PHP Developer',
    skills: [
      { name: 'PHP', proficiency: 88 }, { name: 'Laravel', proficiency: 85 },
      { name: 'MySQL', proficiency: 80 }, { name: 'React', proficiency: 40 },
      { name: 'TypeScript', proficiency: 35 },
    ],
    proofOfWork: [],
    potentialScore: 68, adaptabilityScore: 60, appliedJobs: ['j2'],
  },
  {
    id: 'rc7', name: 'Aisha Mohammed', avatar: 'AM', title: 'Product Manager',
    skills: [
      { name: 'Product Strategy', proficiency: 95 }, { name: 'UX Research', proficiency: 92 },
      { name: 'Figma', proficiency: 90 }, { name: 'Leadership', proficiency: 88 },
      { name: 'SQL', proficiency: 65 }, { name: 'Agile', proficiency: 88 },
    ],
    proofOfWork: [
      { title: 'B2B SaaS redesign case study', url: '#', type: 'Portfolio' },
      { title: 'User research playbook', url: '#', type: 'Notion' },
    ],
    potentialScore: 91, adaptabilityScore: 93, appliedJobs: ['j3'],
  },
  {
    id: 'rc8', name: 'Tomás Herrera', avatar: 'TH', title: 'DevOps Engineer',
    skills: [
      { name: 'Terraform', proficiency: 90 }, { name: 'CI/CD', proficiency: 88 },
      { name: 'Kubernetes', proficiency: 85 }, { name: 'AWS', proficiency: 82 },
      { name: 'Python', proficiency: 75 }, { name: 'Docker', proficiency: 88 },
    ],
    proofOfWork: [{ title: 'Infrastructure-as-code templates', url: '#', type: 'GitHub' }],
    potentialScore: 84, adaptabilityScore: 86, appliedJobs: ['j4', 'j8'],
  },
  {
    id: 'rc9', name: 'Lisa Nguyen', avatar: 'LN', title: 'Content Strategist',
    skills: [
      { name: 'Content Design', proficiency: 88 }, { name: 'SEO', proficiency: 85 },
      { name: 'SQL', proficiency: 78 }, { name: 'Figma', proficiency: 70 },
      { name: 'Leadership', proficiency: 72 },
    ],
    proofOfWork: [{ title: 'Growth content campaign (+40% traffic)', url: '#', type: 'Case Study' }],
    potentialScore: 79, adaptabilityScore: 81, appliedJobs: ['j5'],
  },
  {
    id: 'rc10', name: 'Ryan Foster', avatar: 'RF', title: 'Account Executive',
    skills: [
      { name: 'Sales', proficiency: 85 }, { name: 'CRM', proficiency: 80 },
      { name: 'Leadership', proficiency: 78 }, { name: 'SQL', proficiency: 55 },
    ],
    proofOfWork: [],
    potentialScore: 72, adaptabilityScore: 74, appliedJobs: ['j6'],
  },
  {
    id: 'rc11', name: 'Yuki Tanaka', avatar: 'YT', title: 'Platform Engineer',
    skills: [
      { name: 'Go', proficiency: 88 }, { name: 'Kubernetes', proficiency: 92 },
      { name: 'System Design', proficiency: 85 }, { name: 'Terraform', proficiency: 80 },
      { name: 'CI/CD', proficiency: 86 }, { name: 'AWS', proficiency: 78 },
    ],
    proofOfWork: [
      { title: 'K8s operator for auto-scaling', url: '#', type: 'GitHub' },
      { title: 'Platform engineering blog series', url: '#', type: 'Blog' },
    ],
    potentialScore: 89, adaptabilityScore: 87, appliedJobs: ['j3', 'j8'],
  },
  {
    id: 'rc12', name: 'Amara Okonkwo', avatar: 'AO', title: 'Data Scientist',
    skills: [
      { name: 'Python', proficiency: 94 }, { name: 'Machine Learning', proficiency: 90 },
      { name: 'SQL', proficiency: 88 }, { name: 'System Design', proficiency: 60 },
      { name: 'AWS', proficiency: 72 },
    ],
    proofOfWork: [
      { title: 'NLP sentiment analysis pipeline', url: '#', type: 'GitHub' },
      { title: 'Kaggle Top 5% — tabular competition', url: '#', type: 'Kaggle' },
    ],
    potentialScore: 87, adaptabilityScore: 90, appliedJobs: ['j7'],
  },
  {
    id: 'rc13', name: 'Chris Martinez', avatar: 'CM', title: 'Junior Developer',
    skills: [
      { name: 'React', proficiency: 68 }, { name: 'Node.js', proficiency: 62 },
      { name: 'Git', proficiency: 80 }, { name: 'PostgreSQL', proficiency: 55 },
      { name: 'Docker', proficiency: 45 },
    ],
    proofOfWork: [{ title: 'Personal portfolio + todo app', url: '#', type: 'Portfolio' }],
    potentialScore: 78, adaptabilityScore: 88, appliedJobs: ['j6'],
  },
  {
    id: 'rc14', name: 'Fatima Al-Rashid', avatar: 'FA', title: 'Security Engineer',
    skills: [
      { name: 'Security Compliance', proficiency: 90 }, { name: 'Kubernetes', proficiency: 75 },
      { name: 'Terraform', proficiency: 70 }, { name: 'Python', proficiency: 78 },
      { name: 'CI/CD', proficiency: 72 },
    ],
    proofOfWork: [{ title: 'SOC 2 compliance automation tool', url: '#', type: 'GitHub' }],
    potentialScore: 83, adaptabilityScore: 82, appliedJobs: ['j8'],
  },
  {
    id: 'rc15', name: 'Oliver Wright', avatar: 'OW', title: 'Tech Lead',
    skills: [
      { name: 'React', proficiency: 88 }, { name: 'System Design', proficiency: 92 },
      { name: 'Leadership', proficiency: 90 }, { name: 'TypeScript', proficiency: 90 },
      { name: 'Node.js', proficiency: 85 }, { name: 'AWS', proficiency: 78 },
    ],
    proofOfWork: [
      { title: 'Architecture decision records collection', url: '#', type: 'Blog' },
      { title: 'Team scaling playbook', url: '#', type: 'Notion' },
    ],
    potentialScore: 92, adaptabilityScore: 85, appliedJobs: ['j1', 'j5'],
  },
];

export const DEFAULT_CANDIDATE_SKILLS = [
  { name: 'React', proficiency: 75 },
  { name: 'Node.js', proficiency: 70 },
  { name: 'TypeScript', proficiency: 65 },
  { name: 'Git', proficiency: 85 },
  { name: 'API Design', proficiency: 68 },
];
