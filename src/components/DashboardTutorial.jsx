import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, LayoutDashboard, Compass, Briefcase, MessageCircle,
  Users, UserSearch, ArrowRight, ArrowLeft, X,
} from 'lucide-react';
import { useUserStore } from '../store/useUserStore';

const CANDIDATE_STEPS = [
  {
    icon: Sparkles,
    color: 'from-indigo-500 to-violet-600',
    title: 'Welcome to Nexora!',
    desc: 'Your AI-powered career cockpit. Nexora goes beyond CVs — it maps your real skills to opportunities and shows exactly where to grow.',
    tip: 'Use the role switcher in the top bar anytime to preview the Recruiter view.',
  },
  {
    icon: LayoutDashboard,
    color: 'from-cyan-500 to-blue-600',
    title: 'Your Dashboard at a Glance',
    desc: 'Summary cards show Profile Strength, Skill Match Score, Active Applications, and Career Growth — all live-calculated from your skills.',
    tip: 'Scores update instantly when you mark skills as learned in Gap Analysis.',
  },
  {
    icon: Compass,
    color: 'from-emerald-500 to-teal-600',
    title: 'Career GPS & Job Matches',
    desc: 'Career GPS walks you from current skills → dream roles → gaps → learning. Job cards show match % — click Apply or View Gap Analysis.',
    tip: 'Try Gap Analysis on any job to see a radar chart and recommended courses.',
  },
  {
    icon: Briefcase,
    color: 'from-amber-500 to-orange-600',
    title: 'Opportunities & Network',
    desc: 'Browse jobs, scholarships, fellowships, and mentorship in the Opportunities feed. Connect with people aligned to your goals in Network.',
    tip: 'Bookmark opportunities with the save icon — they persist in your session.',
  },
  {
    icon: MessageCircle,
    color: 'from-violet-500 to-purple-600',
    title: 'Ask Nexora AI',
    desc: 'The chat bubble (bottom-right) or Chat Assistant in the sidebar connects to OpenRouter AI with your profile context baked in.',
    tip: 'Try: "What skills should I learn next?" or "Explain my top job matches."',
  },
];

const RECRUITER_STEPS = [
  {
    icon: Sparkles,
    color: 'from-indigo-500 to-violet-600',
    title: 'Welcome, Recruiter!',
    desc: 'Nexora helps you cut through irrelevant applications. Screen candidates by real skills and proof of work — not just keywords on a resume.',
    tip: 'Switch to Candidate view from the top bar to see the other side of the platform.',
  },
  {
    icon: LayoutDashboard,
    color: 'from-cyan-500 to-blue-600',
    title: 'Recruiter Dashboard',
    desc: 'Track total applications, relevant matches, time saved, and active postings. Metrics update as you shortlist or reject candidates.',
    tip: 'Time Saved grows as Nexora filters out low-match applicants for you.',
  },
  {
    icon: UserSearch,
    color: 'from-emerald-500 to-teal-600',
    title: 'Smart Screening',
    desc: 'Review candidates per job with match %, key skills, and proof-of-work badges. Shortlist ✓ or Reject ✗ — tabs filter in real time.',
    tip: 'Click any row to open the detail drawer with AI summary and skill breakdown.',
  },
  {
    icon: Users,
    color: 'from-amber-500 to-orange-600',
    title: 'Talent Pool & Job Postings',
    desc: 'Talent Pool searches ALL candidates by skill, match %, and potential — hidden talent discovery. Post New Job adds listings with auto-generated matches.',
    tip: 'Analytics page shows hiring funnel and application quality charts.',
  },
  {
    icon: MessageCircle,
    color: 'from-violet-500 to-purple-600',
    title: 'Ask Nexora AI',
    desc: 'Get hiring insights, candidate comparisons, and platform help via the AI assistant — powered by OpenRouter with your workspace context.',
    tip: 'Try: "How does Nexora rank candidates?" or "Who are my top matches?"',
  },
];

export default function DashboardTutorial({ forceOpen = false, onClose }) {
  const role = useUserStore((s) => s.role);
  const name = useUserStore((s) => s.name);
  const tutorialSeen = useUserStore((s) => s.tutorialSeen);
  const tutorialForceOpen = useUserStore((s) => s.tutorialForceOpen);
  const dismissTutorial = useUserStore((s) => s.dismissTutorial);
  const clearTutorialForce = useUserStore((s) => s.clearTutorialForce);

  const steps = role === 'recruiter' ? RECRUITER_STEPS : CANDIDATE_STEPS;
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (tutorialForceOpen) setStep(0);
  }, [tutorialForceOpen, role]);

  const shouldShow = forceOpen || tutorialForceOpen || (role && !tutorialSeen[role]);
  if (!shouldShow || !role) return null;

  const current = steps[step];
  const Icon = current.icon;
  const isLast = step === steps.length - 1;

  const finish = () => {
    dismissTutorial(role);
    clearTutorialForce();
    onClose?.();
  };

  const next = () => {
    if (isLast) finish();
    else setStep((s) => s + 1);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
        >
          {/* Colorful header band */}
          <div className={`bg-gradient-to-r ${current.color} px-6 py-8 text-white`}>
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                <Icon className="h-6 w-6" />
              </div>
              <button
                onClick={finish}
                className="rounded-lg p-1.5 text-white/80 hover:bg-white/20"
                aria-label="Skip tutorial"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-white/70">
              {role === 'recruiter' ? 'Recruiter Guide' : 'Candidate Guide'} · Step {step + 1}/{steps.length}
            </p>
            <h2 className="mt-1 text-xl font-bold">{current.title}</h2>
            {step === 0 && name && (
              <p className="mt-1 text-sm text-white/80">Hey {name.split(' ')[0]}, let&apos;s take a quick tour.</p>
            )}
          </div>

          {/* Body */}
          <div className="px-6 py-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-sm leading-relaxed text-slate-600">{current.desc}</p>
                <div className="mt-4 rounded-xl border border-dashed border-brand-200 bg-brand-50/60 px-4 py-3">
                  <p className="text-xs font-semibold text-brand-700">💡 Pro tip</p>
                  <p className="mt-1 text-xs leading-relaxed text-brand-900/80">{current.tip}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Step dots */}
            <div className="mt-6 flex justify-center gap-1.5">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === step ? 'w-6 bg-brand-600' : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="mt-5 flex items-center justify-between gap-3">
              <button
                onClick={finish}
                className="text-xs font-medium text-slate-400 hover:text-slate-600"
              >
                Skip tour
              </button>
              <div className="flex gap-2">
                {step > 0 && (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="flex items-center gap-1 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                )}
                <button
                  onClick={next}
                  className={`flex items-center gap-1 rounded-xl bg-gradient-to-r ${current.color} px-4 py-2 text-sm font-semibold text-white shadow-md hover:opacity-90`}
                >
                  {isLast ? 'Get Started' : 'Next'}
                  {!isLast && <ArrowRight className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
