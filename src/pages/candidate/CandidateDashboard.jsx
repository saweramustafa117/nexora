import { Sparkles, Target, Briefcase, TrendingUp } from 'lucide-react';
import StatCard from '../../components/StatCard';
import CareerGPS from '../../components/CareerGPS';
import JobMatchList from '../../components/JobMatchList';
import OpportunitiesFeed from '../../components/OpportunitiesFeed';
import NetworkingSuggestions from '../../components/NetworkingSuggestions';
import SkillRadarChart from '../../components/SkillRadarChart';
import { SkeletonCard } from '../../components/Skeleton';
import { useSimulatedLoading } from '../../hooks/useSimulatedLoading';
import { useUserStore } from '../../store/useUserStore';
import { useCandidatesStore } from '../../store/useCandidatesStore';
import { useJobsStore } from '../../store/useJobsStore';
import { mockOpportunities } from '../../data/mockOpportunities';
import { calculateMatchPercentage } from '../../utils/calculateMatchPercentage';
import { useState } from 'react';

export default function CandidateDashboard() {
  const loading = useSimulatedLoading(450);
  const name = useUserStore((s) => s.name);
  const skills = useUserStore((s) => s.skills);
  const applications = useCandidatesStore((s) => s.applications);
  const jobs = useJobsStore((s) => s.jobs).filter((j) => j.status === 'open');
  const [compareJobId, setCompareJobId] = useState(jobs[0]?.id);

  const compareJob = jobs.find((j) => j.id === compareJobId) ?? jobs[0];
  const avgMatch = jobs.length
    ? Math.round(jobs.reduce((sum, j) => sum + calculateMatchPercentage(skills, j.requiredSkills), 0) / jobs.length)
    : 0;
  const profileStrength = Math.min(100, Math.round(skills.reduce((s, sk) => s + sk.proficiency, 0) / skills.length));
  const careerGrowth = Math.min(100, profileStrength + 5);

  if (loading) {
    return (
      <div>
        <div className="mb-6 h-8 w-48 skeleton rounded-lg" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Welcome back, {name.split(' ')[0]}</h1>
        <p className="mt-1 text-sm text-slate-500">Your talent intelligence overview — all scores update live</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Sparkles} label="Profile Strength" value={profileStrength} suffix="%" trend={5} color="brand" />
        <StatCard icon={Target} label="Skill Match Score" value={avgMatch} suffix="%" trend={3} color="accent" />
        <StatCard icon={Briefcase} label="Active Applications" value={applications.length} color="emerald" />
        <StatCard icon={TrendingUp} label="Career Growth Score" value={careerGrowth} suffix="%" trend={8} color="amber" />
      </div>

      <CareerGPS />

      {compareJob && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-semibold text-slate-900">Skill Radar — vs Job Requirements</h3>
            <select
              value={compareJobId}
              onChange={(e) => setCompareJobId(e.target.value)}
              className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm"
            >
              {jobs.map((j) => (
                <option key={j.id} value={j.id}>{j.title} @ {j.company}</option>
              ))}
            </select>
          </div>
          <SkillRadarChart job={compareJob} candidateSkills={skills} />
        </div>
      )}

      <div>
        <h2 className="mb-4 text-lg font-semibold">Top Job Matches</h2>
        <JobMatchList limit={4} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-lg font-semibold">Opportunities Feed</h2>
          <OpportunitiesFeed opportunities={mockOpportunities.slice(0, 6)} />
        </div>
        <div>
          <h2 className="mb-4 text-lg font-semibold">People Aligned With Your Goals</h2>
          <NetworkingSuggestions />
        </div>
      </div>
    </div>
  );
}
