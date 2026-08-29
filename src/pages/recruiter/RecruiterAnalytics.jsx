import { ApplicationQualityChart, HiringFunnelChart, TalentMatchBarChart } from '../../components/RecruiterCharts';
import { useCandidatesStore } from '../../store/useCandidatesStore';
import { useJobsStore } from '../../store/useJobsStore';

export default function RecruiterAnalytics() {
  const candidates = useCandidatesStore((s) => s.candidates);
  const jobs = useJobsStore((s) => s.jobs);
  const refJob = jobs[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold sm:text-2xl">Analytics</h1>
        <p className="text-sm text-slate-500">Hiring pipeline insights — updates as you screen candidates</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white p-4 shadow-sm sm:p-6">
          <h3 className="font-semibold">Application Quality</h3>
          <p className="mb-4 text-sm text-slate-500">Relevant vs irrelevant (live from screening state)</p>
          <ApplicationQualityChart />
        </div>
        <div className="rounded-2xl border bg-white p-4 shadow-sm sm:p-6">
          <h3 className="font-semibold">Hiring Funnel</h3>
          <p className="mb-4 text-sm text-slate-500">Pipeline conversion at each stage</p>
          <HiringFunnelChart />
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-4 shadow-sm sm:p-6">
        <h3 className="mb-1 font-semibold">Match Quality Distribution</h3>
        <p className="mb-4 text-sm text-slate-500">Top candidates vs {refJob?.title ?? 'selected role'}</p>
        <TalentMatchBarChart candidates={candidates} job={refJob} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Screen Efficiency', value: '63%', desc: 'Reduction in manual review' },
          { label: 'Shortlist Rate', value: '27%', desc: 'Of relevant matches shortlisted' },
          { label: 'Hidden Talent Found', value: '15', desc: 'High-potential candidates surfaced' },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">{item.label}</p>
            <p className="mt-1 text-2xl font-bold text-brand-600">{item.value}</p>
            <p className="mt-1 text-xs text-slate-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
