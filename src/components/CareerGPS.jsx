import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target, Briefcase, MapPin, BookOpen, TrendingUp, ArrowRight,
} from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { useJobsStore } from '../store/useJobsStore';
import { calculateMatchPercentage } from '../utils/calculateMatchPercentage';

const STEPS = [
  { key: 'currentSkills', label: 'Current Skills', icon: Target, color: 'bg-brand-600' },
  { key: 'potentialCareers', label: 'Potential Careers', icon: Briefcase, color: 'bg-cyan-500' },
  { key: 'skillGaps', label: 'Skill Gaps', icon: MapPin, color: 'bg-amber-500' },
  { key: 'learning', label: 'Learning Resources', icon: BookOpen, color: 'bg-emerald-500' },
  { key: 'opportunities', label: 'Opportunities', icon: TrendingUp, color: 'bg-violet-500' },
];

export default function CareerGPS() {
  const [activeStep, setActiveStep] = useState(0);
  const skills = useUserStore((s) => s.skills);
  const jobs = useJobsStore((s) => s.jobs);

  const topSkills = skills.sort((a, b) => b.proficiency - a.proficiency).slice(0, 5).map((s) => s.name);
  const jobMatches = jobs
    .filter((j) => j.status === 'open')
    .map((j) => ({ ...j, match: calculateMatchPercentage(skills, j.requiredSkills) }))
    .sort((a, b) => b.match - a.match);

  const potentialCareers = ['Senior Full Stack Engineer', 'Platform Engineer', 'Tech Lead'];
  const skillGaps = jobMatches[0]
    ? jobMatches[0].requiredSkills
        .filter((r) => (skills.find((s) => s.name === r.name)?.proficiency ?? 0) < r.importance * 0.8)
        .map((r) => r.name)
    : [];
  const learning = skillGaps.slice(0, 3).map((s) => ({ title: `${s} Fundamentals`, provider: 'Nexora Learning', progress: 0 }));
  const opportunities = jobMatches.slice(0, 3).map((j) => `${j.title} @ ${j.company} (${j.match}%)`);

  const panelContent = {
    0: topSkills,
    1: potentialCareers,
    2: skillGaps.length ? skillGaps : ['No major gaps detected'],
    3: learning.map((l) => l.title),
    4: opportunities,
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Career GPS</h3>
        <p className="text-sm text-slate-500">Click each step to explore your career roadmap</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          return (
            <button
              key={step.key}
              onClick={() => setActiveStep(idx)}
              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                activeStep === idx
                  ? `${step.color} text-white shadow-md`
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              {step.label}
              {idx < STEPS.length - 1 && activeStep !== idx && (
                <ArrowRight className="hidden h-3 w-3 sm:inline" />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="rounded-xl border border-slate-100 bg-slate-50/50 p-4"
        >
          <h4 className="mb-3 text-sm font-semibold text-slate-800">{STEPS[activeStep].label}</h4>
          <div className="flex flex-wrap gap-2">
            {panelContent[activeStep].map((item) => (
              <span key={item} className="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
