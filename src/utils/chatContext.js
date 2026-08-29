import { useUserStore } from '../store/useUserStore';
import { useCandidatesStore } from '../store/useCandidatesStore';
import { useJobsStore } from '../store/useJobsStore';
import { calculateMatchPercentage } from './calculateMatchPercentage';

export function buildChatUserContext() {
  const user = useUserStore.getState();
  const { applications, savedOpportunityIds } = useCandidatesStore.getState();
  const { jobs } = useJobsStore.getState();

  const jobMatches = jobs
    .filter((j) => j.status === 'open')
    .slice(0, 8)
    .map((j) => ({
      title: j.title,
      company: j.company,
      matchPercent: calculateMatchPercentage(user.skills, j.requiredSkills),
    }))
    .sort((a, b) => b.matchPercent - a.matchPercent);

  return {
    name: user.name,
    role: user.role,
    company: user.company,
    industry: user.industry,
    skills: user.skills,
    applications,
    savedOpportunitiesCount: savedOpportunityIds.length,
    topJobMatches: jobMatches,
  };
}
