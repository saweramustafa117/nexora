import { ExternalLink, BookOpen, CheckCircle } from 'lucide-react';
import Modal from './Modal';
import SkillRadarChart from './SkillRadarChart';
import CircularProgress from './CircularProgress';
import {
  calculateMatchPercentage,
  getMissingSkills,
  getGapResources,
  generateAiExplanation,
} from '../utils/calculateMatchPercentage';
import { useUserStore } from '../store/useUserStore';
import { toast } from './Toast';

export default function GapAnalysisModal({ job, isOpen, onClose }) {
  const skills = useUserStore((s) => s.skills);
  const markSkillLearned = useUserStore((s) => s.markSkillLearned);

  if (!job) return null;

  const matchPercent = calculateMatchPercentage(skills, job.requiredSkills);
  const missingSkills = getMissingSkills(skills, job.requiredSkills);
  const resources = getGapResources(missingSkills);
  const explanation = generateAiExplanation(matchPercent, missingSkills, job.title);

  const handleLearnSkill = (skillName) => {
    const req = job.requiredSkills.find((r) => r.name === skillName);
    const target = req?.importance ?? 75;
    markSkillLearned(skillName, target);
    toast(`Skill "${skillName}" updated — match scores recalculated!`, 'success');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Gap Analysis" size="lg">
      <div className="space-y-6">
        <div className="rounded-2xl bg-brand-50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">{job.title}</h3>
              <p className="text-sm text-slate-600">{job.company}</p>
            </div>
            <CircularProgress value={matchPercent} size={64} strokeWidth={5} />
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">{explanation}</p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-800">Missing Skills</h4>
          <div className="flex flex-wrap gap-2">
            {missingSkills.length === 0 ? (
              <span className="text-sm text-emerald-600">No significant gaps — great fit!</span>
            ) : (
              missingSkills.map((skill) => (
                <span key={skill} className="rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 ring-1 ring-amber-200">
                  {skill}
                </span>
              ))
            )}
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-800">Skills Comparison</h4>
          <SkillRadarChart job={job} candidateSkills={skills} />
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-slate-800">Recommended Resources</h4>
          <div className="space-y-2">
            {resources.map((resource, i) => (
              <div key={i} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-white p-2 shadow-sm">
                    <BookOpen className="h-4 w-4 text-brand-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{resource.title}</p>
                    <p className="text-xs text-slate-500">{resource.skill} · {resource.type}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleLearnSkill(resource.skill)}
                    className="flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-emerald-700"
                  >
                    <CheckCircle className="h-3 w-3" /> Mark learned
                  </button>
                  <a href={resource.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700">
                    View <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
