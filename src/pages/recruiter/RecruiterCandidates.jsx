import { useState } from 'react';
import { SmartScreeningTable, CandidateDetailDrawer } from '../../components/RecruiterComponents';
import { useJobsStore } from '../../store/useJobsStore';

export default function RecruiterCandidates() {
  const jobs = useJobsStore((s) => s.jobs);
  const [jobId, setJobId] = useState(jobs[0]?.id);
  const [selected, setSelected] = useState(null);
  const job = jobs.find((j) => j.id === jobId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold sm:text-2xl">Smart Screening</h1>
          <p className="text-sm text-slate-500">Review, shortlist, and reject candidates per job posting</p>
        </div>
        <select value={jobId} onChange={(e) => setJobId(e.target.value)} className="w-full rounded-xl border px-3 py-2 text-sm sm:w-auto">
          {jobs.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
        </select>
      </div>
      <SmartScreeningTable jobId={jobId} onSelectCandidate={setSelected} />
      <CandidateDetailDrawer candidate={selected} job={job} isOpen={!!selected} onClose={() => setSelected(null)} />
    </div>
  );
}
