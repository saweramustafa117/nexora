import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import Modal from '../../components/Modal';
import { MatchDistributionChart } from '../../components/RecruiterCharts';
import { useJobsStore } from '../../store/useJobsStore';
import { mockCandidates } from '../../data/mockCandidates';
import { calculateMatchPercentage } from '../../utils/calculateMatchPercentage';
import { toast } from '../../components/Toast';
import { SKILL_OPTIONS } from '../../data/mockCandidates';

export default function RecruiterJobs() {
  const { jobs, addJob, toggleJobStatus } = useJobsStore();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [skillTags, setSkillTags] = useState([]);
  const [skillInput, setSkillInput] = useState('');

  const addSkill = (skill) => {
    if (skill && !skillTags.includes(skill) && skillTags.length < 8) {
      setSkillTags([...skillTags, skill]);
      setSkillInput('');
    }
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (!title.trim() || skillTags.length === 0) return;

    addJob({
      title: title.trim(),
      company: company.trim() || 'Your Company',
      description: description.trim() || 'New opportunity posted via Nexora.',
      requiredSkills: skillTags.map((name, i) => ({
        name,
        importance: 70 + (i % 3) * 10,
        weight: 1,
      })),
    });

    toast('Job posted! Mock applicants auto-matched.', 'success');
    setShowForm(false);
    setTitle('');
    setCompany('');
    setDescription('');
    setSkillTags([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Job Postings</h1>
          <p className="text-sm text-slate-500">Manage listings — post new jobs to auto-generate applicant matches</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700">
          <Plus className="h-4 w-4" /> Post New Job
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="px-4 py-3 font-semibold text-slate-600">Title</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Company</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Applicants</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Avg Match</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Status</th>
              <th className="px-4 py-3 font-semibold text-slate-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => {
              const avg = Math.round(
                mockCandidates.reduce((s, c) => s + calculateMatchPercentage(c.skills, job.requiredSkills), 0) / mockCandidates.length,
              );
              const applicants = mockCandidates.filter((c) => calculateMatchPercentage(c.skills, job.requiredSkills) >= 50).length;
              return (
                <tr key={job.id} className="border-b hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-medium">{job.title}</td>
                  <td className="px-4 py-3 text-slate-600">{job.company}</td>
                  <td className="px-4 py-3">{applicants}</td>
                  <td className="px-4 py-3 font-semibold text-brand-600">{avg}%</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${job.status === 'open' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => { toggleJobStatus(job.id); toast(`Job ${job.status === 'open' ? 'closed' : 'reopened'}`, 'info'); }} className="text-xs font-medium text-brand-600 hover:underline">
                      {job.status === 'open' ? 'Close' : 'Reopen'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {jobs.filter((j) => j.status === 'open').slice(0, 4).map((job) => (
          <div key={job.id} className="rounded-2xl border bg-white p-4 shadow-sm">
            <h3 className="font-semibold">{job.title}</h3>
            <p className="text-xs text-slate-500">Match quality distribution</p>
            <MatchDistributionChart jobId={job.id} />
          </div>
        ))}
      </div>

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Post New Job" size="md">
        <form onSubmit={handlePost} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Job Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full rounded-xl border px-3 py-2 text-sm" placeholder="Senior Engineer" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Company</label>
            <input value={company} onChange={(e) => setCompany(e.target.value)} className="w-full rounded-xl border px-3 py-2 text-sm" placeholder="Your Company" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full rounded-xl border px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Required Skills (tags)</label>
            <div className="mb-2 flex flex-wrap gap-1">
              {skillTags.map((s) => (
                <span key={s} className="flex items-center gap-1 rounded-lg bg-brand-50 px-2 py-1 text-xs text-brand-700">
                  {s}
                  <button type="button" onClick={() => setSkillTags(skillTags.filter((t) => t !== s))}><X className="h-3 w-3" /></button>
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {SKILL_OPTIONS.filter((s) => !skillTags.includes(s)).slice(0, 12).map((s) => (
                <button key={s} type="button" onClick={() => addSkill(s)} className="rounded-lg bg-slate-100 px-2 py-1 text-xs hover:bg-slate-200">{s}</button>
              ))}
            </div>
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(skillInput.trim()); } }}
              placeholder="Type skill + Enter"
              className="mt-2 w-full rounded-xl border px-3 py-2 text-sm"
            />
          </div>
          <button type="submit" disabled={skillTags.length === 0} className="w-full rounded-xl bg-brand-600 py-2.5 font-medium text-white hover:bg-brand-700 disabled:opacity-50">
            Post Job
          </button>
        </form>
      </Modal>
    </div>
  );
}
