import { useState } from 'react';
import {
  Briefcase, GraduationCap, Trophy, Heart, Users, Calendar, Bookmark,
} from 'lucide-react';
import CircularProgress from './CircularProgress';
import { useUserStore } from '../store/useUserStore';
import { useCandidatesStore } from '../store/useCandidatesStore';
import { useJobsStore } from '../store/useJobsStore';
import { calculateMatchPercentage } from '../utils/calculateMatchPercentage';
import { toast } from './Toast';

const typeConfig = {
  job: { icon: Briefcase, label: 'Jobs', color: 'text-brand-600 bg-brand-50' },
  scholarship: { icon: GraduationCap, label: 'Scholarships', color: 'text-emerald-600 bg-emerald-50' },
  fellowship: { icon: Heart, label: 'Fellowships', color: 'text-violet-600 bg-violet-50' },
  competition: { icon: Trophy, label: 'Competitions', color: 'text-amber-600 bg-amber-50' },
  mentorship: { icon: Users, label: 'Mentorship', color: 'text-cyan-600 bg-cyan-50' },
};

export default function OpportunitiesFeed({ opportunities }) {
  const [filter, setFilter] = useState('all');
  const skills = useUserStore((s) => s.skills);
  const jobs = useJobsStore((s) => s.jobs);
  const { savedOpportunityIds, toggleSaveOpportunity } = useCandidatesStore();

  const filters = ['all', ...Object.keys(typeConfig)];
  const filtered = filter === 'all' ? opportunities : opportunities.filter((o) => o.type === filter);

  const getMatch = (opp) => {
    if (opp.jobId) {
      const job = jobs.find((j) => j.id === opp.jobId);
      if (job) return calculateMatchPercentage(skills, job.requiredSkills);
    }
    return 60 + (opp.id.charCodeAt(1) % 30);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              filter === f ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {f === 'all' ? 'All' : typeConfig[f].label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((opp) => {
          const config = typeConfig[opp.type];
          const Icon = config.icon;
          const saved = savedOpportunityIds.includes(opp.id);
          const match = getMatch(opp);

          return (
            <div key={opp.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md">
              <div className="flex items-start justify-between">
                <div className={`rounded-xl p-2 ${config.color}`}><Icon className="h-4 w-4" /></div>
                <div className="flex items-center gap-2">
                  <CircularProgress value={match} size={44} strokeWidth={3} />
                  <button
                    onClick={() => {
                      toggleSaveOpportunity(opp.id);
                      toast(saved ? 'Removed from saved' : 'Opportunity saved!', saved ? 'info' : 'success');
                    }}
                    className={`rounded-lg p-1.5 ${saved ? 'text-brand-600 bg-brand-50' : 'text-slate-400 hover:bg-slate-100'}`}
                  >
                    <Bookmark className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
              <h4 className="mt-3 font-semibold text-slate-900">{opp.title}</h4>
              <p className="text-sm text-slate-500">{opp.organization}</p>
              <p className="mt-2 text-xs text-slate-600 line-clamp-2">{opp.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {opp.tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{tag}</span>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs text-slate-400">
                <Calendar className="h-3 w-3" /> Deadline: {opp.deadline}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
