import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Target, Users, Zap, Search, TrendingUp, Network } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';

const steps = [
  { icon: Search, title: 'Discover', desc: 'AI analyzes your real skills and proof of work — not just keywords on a CV.' },
  { icon: TrendingUp, title: 'Navigate', desc: 'Career GPS maps gaps, learning paths, and opportunities tailored to you.' },
  { icon: Network, title: 'Connect', desc: 'Match with roles and people aligned to your goals — quality over quantity.' },
];

export default function Landing() {
  const navigate = useNavigate();
  const setRole = useUserStore((s) => s.setRole);

  const enterAs = (role) => {
    setRole(role);
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 18V6l8 6 8-6v12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-xl font-bold">Nexora</span>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-8">
        <div className="text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-200">
              <Sparkles className="h-4 w-4" /> AI-Powered Talent Intelligence
            </div>
            <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
              Beyond the CV.<br />
              <span className="bg-gradient-to-r from-brand-300 to-cyan-300 bg-clip-text text-transparent">
                Discover Real Potential.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
              Nexora evaluates real skills, proof of work, and potential — bridging candidates and recruiters beyond traditional hiring.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <button onClick={() => enterAs('candidate')} className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-500 px-8 py-4 font-semibold shadow-lg shadow-brand-500/25 hover:bg-brand-400 sm:w-auto">
                Continue as Candidate <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => enterAs('recruiter')} className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-600 bg-slate-800/50 px-8 py-4 font-semibold hover:bg-slate-800 sm:w-auto">
                Continue as Recruiter <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>

        <div className="mt-20">
          <h2 className="mb-8 text-center text-sm font-semibold uppercase tracking-wider text-slate-400">How it works</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="relative rounded-2xl border border-slate-700/50 bg-slate-800/40 p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/20">
                  <Icon className="h-6 w-6 text-brand-300" />
                </div>
                <span className="text-xs font-bold text-brand-400">Step {i + 1}</span>
                <h3 className="mt-1 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-slate-400">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Target, title: 'Skill-Based Matching', desc: 'Real competencies vs role requirements.' },
            { icon: Zap, title: 'Career GPS', desc: 'Visual roadmaps with gap analysis.' },
            { icon: Users, title: 'Dual Intelligence', desc: 'Candidates and recruiters, one platform.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-slate-700/50 bg-slate-800/30 p-5">
              <Icon className="mb-3 h-6 w-6 text-brand-300" />
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-slate-400">{desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
