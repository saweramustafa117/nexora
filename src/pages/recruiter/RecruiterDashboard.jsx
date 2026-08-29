import { useState } from 'react';
import { Users, Target, Clock, Briefcase } from 'lucide-react';
import StatCard from '../../components/StatCard';
import { SmartScreeningTable, CandidateDetailDrawer } from '../../components/RecruiterComponents';
import { MatchDistributionChart } from '../../components/RecruiterCharts';
import { SkeletonCard } from '../../components/Skeleton';
import { useSimulatedLoading } from '../../hooks/useSimulatedLoading';
import { useJobsStore } from '../../store/useJobsStore';
import { mockCandidates } from '../../data/mockCandidates';
import { calculateMatchPercentage } from '../../utils/calculateMatchPercentage';

export default function RecruiterDashboard() {
  const loading = useSimulatedLoading(450);
  const jobs = useJobsStore((s) => s.jobs);
  const screeningStatus = useJobsStore((s) => s.screeningStatus);
  const [selectedJobId, setSelectedJobId] = useState(jobs[0]?.id);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const openJobs = jobs.filter((j) => j.status === 'open');
  const selectedJob = jobs.find((j) => j.id === selectedJobId);
  const totalApplications = mockCandidates.reduce((s, c) => s + (c.appliedJobs?.length ?? 0), 0) + Object.keys(screeningStatus).length;
  const relevant = Object.values(screeningStatus).filter((s) => s !== 'rejected').length;
  const shortlisted = Object.values(screeningStatus).filter((s) => s === 'shortlisted').length;

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>
        <p className="text-sm text-slate-500">AI-powered screening — all actions update live</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Total Applications" value={totalApplications} color="brand" />
        <StatCard icon={Target} label="Relevant Matches" value={relevant} trend={12} color="accent" />
        <StatCard icon={Clock} label="Time Saved" value={shortlisted * 6 + 40} suffix=" hrs" color="emerald" />
        <StatCard icon={Briefcase} label="Active Postings" value={openJobs.length} color="amber" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Smart Screening</h2>
            <select value={selectedJobId} onChange={(e) => setSelectedJobId(e.target.value)} className="rounded-xl border px-3 py-1.5 text-sm">
              {jobs.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
            </select>
          </div>
          <SmartScreeningTable jobId={selectedJobId} onSelectCandidate={setSelectedCandidate} />
        </div>
        {selectedJob && (
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="font-semibold">{selectedJob.title}</h3>
            <p className="text-sm text-slate-500">{selectedJob.company}</p>
            <p className="mt-2 text-sm">Avg match across pool: <span className="font-bold text-brand-600">
              {Math.round(mockCandidates.reduce((s, c) => s + calculateMatchPercentage(c.skills, selectedJob.requiredSkills), 0) / mockCandidates.length)}%
            </span></p>
            <div className="mt-4">
              <p className="mb-2 text-xs font-medium text-slate-500">Match Distribution</p>
              <MatchDistributionChart jobId={selectedJobId} />
            </div>
          </div>
        )}
      </div>

      <CandidateDetailDrawer candidate={selectedCandidate} job={selectedJob} isOpen={!!selectedCandidate} onClose={() => setSelectedCandidate(null)} />
    </div>
  );
}
