import { useState } from 'react';
import { MapPin, Building2, ArrowRight } from 'lucide-react';
import CircularProgress from './CircularProgress';
import GapAnalysisModal from './GapAnalysisModal';
import { useUserStore } from '../store/useUserStore';
import { useCandidatesStore } from '../store/useCandidatesStore';
import { useJobsStore } from '../store/useJobsStore';
import { calculateMatchPercentage, getMissingSkills } from '../utils/calculateMatchPercentage';
import { toast } from './Toast';

export default function JobMatchList({ limit }) {
  const [selectedJob, setSelectedJob] = useState(null);
  const skills = useUserStore((s) => s.skills);
  const applyToJob = useCandidatesStore((s) => s.applyToJob);
  const applications = useCandidatesStore((s) => s.applications);
  const jobs = useJobsStore((s) => s.jobs).filter((j) => j.status === 'open');

  const enriched = jobs
    .map((job) => ({
      ...job,
      matchPercent: calculateMatchPercentage(skills, job.requiredSkills),
      missingSkills: getMissingSkills(skills, job.requiredSkills),
    }))
    .sort((a, b) => b.matchPercent - a.matchPercent);

  const displayJobs = limit ? enriched.slice(0, limit) : enriched;

  const handleApply = (job) => {
    const alreadyApplied = applications.some((a) => a.jobId === job.id);
    if (alreadyApplied) {
      toast('You already applied to this job', 'info');
      return;
    }
    const ok = applyToJob(job.id, job.title, job.company, job.matchPercent);
    if (ok) toast(`Application submitted to ${job.company}!`, 'success');
  };

  return (
    <>
      <div className="space-y-4">
        {displayJobs.map((job) => {
          const applied = applications.some((a) => a.jobId === job.id);
          return (
            <div key={job.id} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-brand-200 hover:shadow-md">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-sm font-bold text-brand-700">
                      {job.companyLogo}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{job.title}</h4>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><Building2 className="h-3 w-3" /> {job.company}</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.location}</span>
                        <span>{job.salary}</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-600">
                    You&apos;re <span className="font-semibold text-brand-600">{job.matchPercent}% aligned</span>
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {job.missingSkills.slice(0, 3).map((skill) => (
                      <span key={skill} className="rounded-md bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">
                        Missing: {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CircularProgress value={job.matchPercent} size={56} strokeWidth={4} />
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleApply(job)}
                      disabled={applied}
                      className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                        applied
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-brand-600 text-white hover:bg-brand-700'
                      }`}
                    >
                      {applied ? 'Applied ✓' : 'Apply'}
                    </button>
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="flex items-center justify-center gap-1 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Gap Analysis <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <GapAnalysisModal job={selectedJob} isOpen={!!selectedJob} onClose={() => setSelectedJob(null)} />
    </>
  );
}
