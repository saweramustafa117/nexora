import { useUserStore } from '../store/useUserStore';
import { useCandidatesStore } from '../store/useCandidatesStore';
import { useJobsStore } from '../store/useJobsStore';
import { mockCandidates } from '../data/mockCandidates';
import { calculateMatchPercentage } from './calculateMatchPercentage';

function buildCandidateContext(user) {
  const { applications, savedOpportunityIds } = useCandidatesStore.getState();
  const { jobs } = useJobsStore.getState();

  const openJobs = jobs.filter((j) => j.status === 'open');
  const jobMatches = openJobs
    .map((j) => ({
      title: j.title,
      company: j.company,
      matchPercent: calculateMatchPercentage(user.skills, j.requiredSkills),
      missingSkills: j.requiredSkills
        .filter((r) => (user.skills.find((s) => s.name === r.name)?.proficiency ?? 0) < r.importance * 0.8)
        .map((r) => r.name)
        .slice(0, 3),
    }))
    .sort((a, b) => b.matchPercent - a.matchPercent)
    .slice(0, 5);

  return {
    role: 'candidate',
    name: user.name,
    skills: user.skills.map((s) => `${s.name} (${s.proficiency}%)`).join(', '),
    topMatches: jobMatches.slice(0, 3).map((j) => `${j.title} @ ${j.company}: ${j.matchPercent}%`),
    skillGaps: jobMatches[0]?.missingSkills?.join(', ') || 'none',
    applications: applications.length
      ? applications.slice(0, 3).map((a) => `${a.jobTitle} (${a.status}, ${a.matchPercent}%)`).join('; ')
      : 'none yet',
  };
}

function buildRecruiterContext(user) {
  const { jobs, screeningStatus } = useJobsStore.getState();
  const openJobs = jobs.filter((j) => j.status === 'open');
  const primaryJob = openJobs[0];

  const topCandidates = mockCandidates
    .map((c) => ({
      name: c.name,
      match: primaryJob ? calculateMatchPercentage(c.skills, primaryJob.requiredSkills) : 0,
      potential: c.potentialScore,
    }))
    .sort((a, b) => b.match - a.match)
    .slice(0, 5);

  const pending = Object.values(screeningStatus).filter((s) => s === 'new').length;
  const shortlisted = Object.values(screeningStatus).filter((s) => s === 'shortlisted').length;

  return {
    role: 'recruiter',
    name: user.name,
    company: user.company || 'Your company',
    industry: user.industry,
    openJobs: openJobs.slice(0, 4).map((j) => j.title).join(', '),
    pipeline: `${pending} pending, ${shortlisted} shortlisted`,
    topCandidates: topCandidates.map((c) => `${c.name} (${c.match}% match, ${c.potential}% potential)`).join('; '),
    bestPick: topCandidates[0] ? `${topCandidates[0].name} at ${topCandidates[0].match}%` : 'none',
  };
}

export function buildChatUserContext() {
  const user = useUserStore.getState();
  if (user.role === 'recruiter') return buildRecruiterContext(user);
  return buildCandidateContext(user);
}

export const CANDIDATE_QUICK_PROMPTS = [
  'Why am I not getting matched to Senior roles?',
  'What skills should I learn next?',
  'Explain my top job matches',
  'How can I improve my match score?',
];

export const RECRUITER_QUICK_PROMPTS = [
  'Who are my best candidates right now?',
  'How does Nexora rank applicants?',
  'Which job posting needs the most attention?',
  'How do I identify hidden talent?',
];

export function getQuickPrompts(role) {
  return role === 'recruiter' ? RECRUITER_QUICK_PROMPTS : CANDIDATE_QUICK_PROMPTS;
}
