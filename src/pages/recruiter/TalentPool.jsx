import { useState } from 'react';
import { Search } from 'lucide-react';
import { CandidateDetailDrawer } from '../../components/RecruiterComponents';
import { useCandidatesStore } from '../../store/useCandidatesStore';
import { useJobsStore } from '../../store/useJobsStore';
import { calculateMatchPercentage } from '../../utils/calculateMatchPercentage';
import { SKILL_OPTIONS } from '../../data/mockCandidates';

export default function TalentPool() {
  const candidates = useCandidatesStore((s) => s.candidates);
  const jobs = useJobsStore((s) => s.jobs);
  const [search, setSearch] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [minMatch, setMinMatch] = useState(0);
  const [minPotential, setMinPotential] = useState(0);
  const [selected, setSelected] = useState(null);
  const refJob = jobs[0];

  const enriched = candidates.map((c) => ({
    ...c,
    match: refJob ? calculateMatchPercentage(c.skills, refJob.requiredSkills) : 0,
  }));

  const filtered = enriched.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (skillFilter && !c.skills.some((s) => s.name === skillFilter)) return false;
    if (c.match < minMatch) return false;
    if (c.potentialScore < minPotential) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Talent Pool</h1>
        <p className="text-sm text-slate-500">Discover hidden talent across the full candidate database</p>
      </div>

      <div className="flex flex-wrap gap-3 rounded-2xl border bg-white p-4 shadow-sm">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or title..." className="w-full rounded-xl border pl-9 pr-3 py-2 text-sm" />
        </div>
        <select value={skillFilter} onChange={(e) => setSkillFilter(e.target.value)} className="rounded-xl border px-3 py-2 text-sm">
          <option value="">All skills</option>
          {SKILL_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <div className="flex items-center gap-2 text-sm">
          <label>Min match:</label>
          <input type="range" min={0} max={100} value={minMatch} onChange={(e) => setMinMatch(+e.target.value)} className="w-24" />
          <span className="w-8 font-medium">{minMatch}%</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <label>Min potential:</label>
          <input type="range" min={0} max={100} value={minPotential} onChange={(e) => setMinPotential(+e.target.value)} className="w-24" />
          <span className="w-8 font-medium">{minPotential}%</span>
        </div>
      </div>

      <p className="text-sm text-slate-500">{filtered.length} candidates found</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelected(c)}
            className="rounded-2xl border bg-white p-4 text-left shadow-sm hover:border-brand-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">{c.avatar}</div>
              <div>
                <h4 className="font-semibold">{c.name}</h4>
                <p className="text-xs text-slate-500">{c.title}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-4 text-sm">
              <span className="font-bold text-brand-600">{c.match}% match</span>
              <span className="text-slate-500">Potential: {c.potentialScore}%</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {c.skills.slice(0, 4).map((s) => (
                <span key={s.name} className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">{s.name}</span>
              ))}
            </div>
            {c.proofOfWork?.length > 0 && (
              <span className="mt-2 inline-block text-xs text-amber-600">✓ {c.proofOfWork.length} proof of work</span>
            )}
          </button>
        ))}
      </div>

      <CandidateDetailDrawer candidate={selected} job={refJob} isOpen={!!selected} onClose={() => setSelected(null)} />
    </div>
  );
}
