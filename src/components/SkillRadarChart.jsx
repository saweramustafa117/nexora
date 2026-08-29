import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend,
  ResponsiveContainer, Tooltip,
} from 'recharts';

export default function SkillRadarChart({ job, candidateSkills }) {
  const skillMap = Object.fromEntries(
    (candidateSkills ?? []).map((s) => [s.name.toLowerCase(), s.proficiency ?? s.score ?? 0]),
  );

  const data = job.requiredSkills.map((rs) => ({
    skill: rs.name.length > 12 ? `${rs.name.slice(0, 10)}…` : rs.name,
    fullName: rs.name,
    candidate: skillMap[rs.name.toLowerCase()] ?? 0,
    required: rs.importance ?? rs.required ?? 80,
  }));

  return (
    <div className="h-64 w-full sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="65%">
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: '#64748b' }} />
          <Radar name="Your Skills" dataKey="candidate" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
          <Radar name="Required" dataKey="required" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.1} strokeWidth={2} strokeDasharray="4 4" />
          <Legend />
          <Tooltip
            content={({ payload }) => {
              if (!payload?.length) return null;
              const d = payload[0].payload;
              return (
                <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg">
                  <p className="font-semibold">{d.fullName}</p>
                  <p className="text-brand-600">You: {d.candidate}%</p>
                  <p className="text-cyan-600">Required: {d.required}%</p>
                </div>
              );
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
