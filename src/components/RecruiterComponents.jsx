import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, XCircle, Award, ExternalLink, Sparkles, Brain,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell,
} from 'recharts';
import CircularProgress from './CircularProgress';
import { calculateMatchPercentage, generateRecruiterAiSummary } from '../utils/calculateMatchPercentage';
import { useJobsStore } from '../store/useJobsStore';
import { toast } from './Toast';

export function CandidateDetailDrawer({ candidate, job, isOpen, onClose }) {
  if (!isOpen || !candidate) return null;

  const match = job ? calculateMatchPercentage(candidate.skills, job.requiredSkills) : 0;
  const summary = generateRecruiterAiSummary(candidate, job);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className={`relative z-10 h-full w-full overflow-y-auto bg-white shadow-2xl sm:max-w-lg`}
          >
            <div className="sticky top-0 border-b bg-white px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{candidate.name}</h2>
                <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">✕</button>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <CircularProgress value={match} size={48} strokeWidth={4} />
                <div>
                  <p className="text-sm font-medium">Match Score</p>
                  <p className="text-xs text-slate-500">Potential: {candidate.potentialScore}%</p>
                </div>
              </div>
            </div>

            <div className="space-y-6 p-4 sm:p-6">
              <div className="rounded-2xl bg-brand-50 p-4">
                <div className="mb-2 flex items-center gap-2"><Sparkles className="h-4 w-4 text-brand-600" /><span className="text-sm font-semibold text-brand-800">AI Summary</span></div>
                <p className="text-sm leading-relaxed text-slate-700">{summary}</p>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold">Skill Breakdown</h4>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={candidate.skills.map((s) => ({ name: s.name.slice(0, 8), score: s.proficiency ?? s.score }))} layout="vertical">
                      <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10 }} />
                      <YAxis dataKey="name" type="category" width={70} tick={{ fontSize: 10 }} />
                      <Bar dataKey="score" radius={[0, 4, 4, 0]}>
                        {candidate.skills.map((_, i) => <Cell key={i} fill="#6366f1" />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold">Proof of Work</h4>
                {candidate.proofOfWork?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {candidate.proofOfWork.map((item, i) => (
                      <a key={i} href={item.url} className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium hover:border-brand-300">
                        <Award className="h-3.5 w-3.5 text-amber-500" /> {item.title}
                        <ExternalLink className="h-3 w-3 text-slate-400" />
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400">No proof of work submitted</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border p-4 text-center">
                  <Brain className="mx-auto h-5 w-5 text-violet-500" />
                  <p className="mt-2 text-2xl font-bold">{candidate.adaptabilityScore}%</p>
                  <p className="text-xs text-slate-500">Adaptability</p>
                </div>
                <div className="rounded-2xl border p-4 text-center">
                  <Sparkles className="mx-auto h-5 w-5 text-cyan-500" />
                  <p className="mt-2 text-2xl font-bold">{candidate.learningPotential ?? candidate.potentialScore}%</p>
                  <p className="text-xs text-slate-500">Learning Potential</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function SmartScreeningTable({ jobId, onSelectCandidate }) {
  const { getApplicantsForJob, setScreeningStatus } = useJobsStore();
  const [tab, setTab] = useState('new');
  const applicants = getApplicantsForJob(jobId);
  const job = useJobsStore.getState().jobs.find((j) => j.id === jobId);

  const filtered = applicants.filter((c) => {
    const status = c.screeningStatus ?? 'new';
    if (tab === 'new') return status === 'new';
    return status === tab;
  });

  const handleAction = (candidateId, status, name) => {
    setScreeningStatus(candidateId, jobId, status);
    toast(`${name} ${status === 'shortlisted' ? 'shortlisted' : 'rejected'}`, status === 'shortlisted' ? 'success' : 'info');
  };

  return (
    <div>
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {['new', 'shortlisted', 'rejected'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium capitalize ${
              tab === t ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {t} ({applicants.filter((c) => (c.screeningStatus ?? 'new') === t).length})
          </button>
        ))}
      </div>

      {/* Mobile card view */}
      <div className="space-y-3 md:hidden">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white py-8 text-center text-sm text-slate-400">
            No candidates in this tab
          </div>
        ) : filtered.map((c) => {
          const match = job ? calculateMatchPercentage(c.skills, job.requiredSkills) : 0;
          const keySkills = c.skills.sort((a, b) => b.proficiency - a.proficiency).slice(0, 3).map((s) => s.name);
          return (
            <div
              key={c.id}
              onClick={() => onSelectCandidate(c)}
              className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-4 shadow-sm active:bg-brand-50/30"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">{c.avatar}</div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{c.name}</p>
                    <p className="text-xs text-slate-500">Potential: {c.potentialScore}%</p>
                  </div>
                </div>
                <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-bold ${match >= 85 ? 'bg-emerald-50 text-emerald-700' : match >= 70 ? 'bg-brand-50 text-brand-700' : 'bg-amber-50 text-amber-700'}`}>
                  {match}%
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {keySkills.map((s) => <span key={s} className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">{s}</span>)}
              </div>
              <div className="mt-3 flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                {c.proofOfWork?.length ? (
                  <span className="inline-flex items-center gap-1 text-xs text-amber-700"><Award className="h-3 w-3" /> {c.proofOfWork.length} PoW</span>
                ) : <span className="text-xs text-slate-400">No PoW</span>}
                <div className="flex gap-1">
                  <button onClick={() => handleAction(c.id, 'shortlisted', c.name)} className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600" title="Shortlist"><CheckCircle2 className="h-4 w-4" /></button>
                  <button onClick={() => handleAction(c.id, 'rejected', c.name)} className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600" title="Reject"><XCircle className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="px-4 py-3 font-semibold text-slate-600">Candidate</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Match</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Key Skills</th>
              <th className="px-4 py-3 font-semibold text-slate-600">PoW</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Potential</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">No candidates in this tab</td></tr>
            ) : filtered.map((c) => {
              const match = job ? calculateMatchPercentage(c.skills, job.requiredSkills) : 0;
              const keySkills = c.skills.sort((a, b) => b.proficiency - a.proficiency).slice(0, 3).map((s) => s.name);
              return (
                <tr key={c.id} onClick={() => onSelectCandidate(c)} className="cursor-pointer border-b hover:bg-brand-50/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">{c.avatar}</div>
                      <span className="font-medium">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${match >= 85 ? 'bg-emerald-50 text-emerald-700' : match >= 70 ? 'bg-brand-50 text-brand-700' : 'bg-amber-50 text-amber-700'}`}>
                      {match}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">{keySkills.map((s) => <span key={s} className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">{s}</span>)}</div>
                  </td>
                  <td className="px-4 py-3">
                    {c.proofOfWork?.length ? (
                      <span title={`${c.proofOfWork.length} proof of work items`} className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs text-amber-700"><Award className="h-3 w-3" /> {c.proofOfWork.length}</span>
                    ) : <span className="text-xs text-slate-400">—</span>}
                  </td>
                  <td className="px-4 py-3 font-medium">{c.potentialScore}%</td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-1">
                      <button onClick={() => handleAction(c.id, 'shortlisted', c.name)} className="rounded-lg p-1.5 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600" title="Shortlist"><CheckCircle2 className="h-4 w-4" /></button>
                      <button onClick={() => handleAction(c.id, 'rejected', c.name)} className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600" title="Reject"><XCircle className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
