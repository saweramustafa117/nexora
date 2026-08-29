import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList,
} from 'recharts';
import { useJobsStore } from '../store/useJobsStore';
import { useCandidatesStore } from '../store/useCandidatesStore';
import { mockCandidates } from '../data/mockCandidates';
import { calculateMatchPercentage } from '../utils/calculateMatchPercentage';

export function ApplicationQualityChart() {
  const { screeningStatus } = useJobsStore();
  const statuses = Object.values(screeningStatus);
  const relevant = statuses.filter((s) => s === 'shortlisted' || s === 'new').length;
  const irrelevant = statuses.filter((s) => s === 'rejected').length;
  const data = [
    { name: 'Relevant', value: relevant || 1, color: '#6366f1' },
    { name: 'Irrelevant', value: irrelevant || 1, color: '#e2e8f0' },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
            {data.map((e, i) => <Cell key={i} fill={e.color} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-6">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-2 text-xs">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: d.color }} />
            {d.name}: {d.value}
          </div>
        ))}
      </div>
    </div>
  );
}

export function HiringFunnelChart() {
  const { screeningStatus } = useJobsStore();
  const { applications } = useCandidatesStore();
  const shortlisted = Object.values(screeningStatus).filter((s) => s === 'shortlisted').length;
  const totalApps = applications.length + mockCandidates.reduce((s, c) => s + (c.appliedJobs?.length ?? 0), 0);

  const data = [
    { stage: 'Applications', count: Math.max(totalApps, 50) },
    { stage: 'AI Screened', count: Math.round(totalApps * 0.8) || 40 },
    { stage: 'Relevant', count: Object.keys(screeningStatus).length || 30 },
    { stage: 'Shortlisted', count: shortlisted || 8 },
    { stage: 'Interview', count: Math.max(Math.round(shortlisted * 0.5), 4) },
    { stage: 'Hired', count: 2 },
  ];
  const colors = ['#6366f1', '#818cf8', '#a5b4fc', '#06b6d4', '#22d3ee', '#10b981'];

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis type="number" tick={{ fontSize: 11 }} />
          <YAxis dataKey="stage" type="category" width={72} tick={{ fontSize: 10 }} />
          <Tooltip />
          <Bar dataKey="count" radius={[0, 6, 6, 0]}>
            {data.map((_, i) => <Cell key={i} fill={colors[i]} />)}
            <LabelList dataKey="count" position="right" style={{ fontSize: 11 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MatchDistributionChart({ jobId }) {
  const job = useJobsStore.getState().jobs.find((j) => j.id === jobId);
  if (!job) return null;

  const buckets = [
    { range: '90+', count: 0 }, { range: '80-89', count: 0 },
    { range: '70-79', count: 0 }, { range: '60-69', count: 0 }, { range: '<60', count: 0 },
  ];

  mockCandidates.forEach((c) => {
    const m = calculateMatchPercentage(c.skills, job.requiredSkills);
    if (m >= 90) buckets[0].count++;
    else if (m >= 80) buckets[1].count++;
    else if (m >= 70) buckets[2].count++;
    else if (m >= 60) buckets[3].count++;
    else buckets[4].count++;
  });

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={buckets}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="range" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TalentMatchBarChart({ candidates, job }) {
  const data = candidates.slice(0, 10).map((c) => ({
    name: c.name.split(' ')[0],
    match: job ? calculateMatchPercentage(c.skills, job.requiredSkills) : 0,
  }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="name" tick={{ fontSize: 10 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
          <Tooltip />
          <Bar dataKey="match" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
