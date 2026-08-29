import CareerGPS from '../../components/CareerGPS';
import SkillRadarChart from '../../components/SkillRadarChart';
import { useUserStore } from '../../store/useUserStore';
import { useJobsStore } from '../../store/useJobsStore';
import { useState } from 'react';

export default function CandidateCareerGPS() {
  const skills = useUserStore((s) => s.skills);
  const jobs = useJobsStore((s) => s.jobs).filter((j) => j.status === 'open');
  const [jobId, setJobId] = useState(jobs[0]?.id);
  const job = jobs.find((j) => j.id === jobId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Career GPS</h1>
        <p className="mt-1 text-sm text-slate-500">Navigate from where you are to where you want to be</p>
      </div>
      <CareerGPS />
      {job && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-semibold">Skill Analysis</h3>
            <select value={jobId} onChange={(e) => setJobId(e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm sm:w-auto sm:py-1.5">
              {jobs.map((j) => <option key={j.id} value={j.id}>{j.title}</option>)}
            </select>
          </div>
          <SkillRadarChart job={job} candidateSkills={skills} />
        </div>
      )}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <h3 className="mb-4 font-semibold">Your Skill Profile</h3>
        <div className="space-y-3">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium">{skill.name}</span>
                <span className="text-slate-500">{skill.proficiency}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-cyan-500 transition-all duration-500" style={{ width: `${skill.proficiency}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
