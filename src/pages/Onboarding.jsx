import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { SKILL_OPTIONS, INDUSTRY_OPTIONS } from '../data/mockCandidates';

export default function Onboarding() {
  const navigate = useNavigate();
  const { role, completeOnboarding } = useUserStore();
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [industry, setIndustry] = useState(INDUSTRY_OPTIONS[0]);
  const [selectedSkills, setSelectedSkills] = useState(['React', 'Node.js', 'TypeScript']);

  if (!role) {
    navigate('/');
    return null;
  }

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) => {
      if (prev.includes(skill)) return prev.filter((s) => s !== skill);
      if (prev.length >= 5) return prev;
      return [...prev, skill];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (role === 'candidate' && selectedSkills.length < 3) return;
    if (role === 'recruiter' && !company.trim()) return;

    completeOnboarding({
      name: name.trim(),
      company: company.trim(),
      industry,
      skills: selectedSkills.map((s) => ({ name: s, proficiency: 55 + Math.floor(Math.random() * 25) })),
      role,
    });

    navigate(role === 'candidate' ? '/candidate' : '/recruiter');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-brand-50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-xl"
      >
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white font-bold">N</div>
          <h1 className="text-2xl font-bold text-slate-900">
            {role === 'candidate' ? 'Set up your profile' : 'Set up your workspace'}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {role === 'candidate'
              ? 'Tell us about yourself so Nexora can personalize your dashboard'
              : 'Configure your recruiter workspace'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Your name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Alex Rivera"
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
              required
            />
          </div>

          {role === 'recruiter' && (
            <>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Company name</label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="TechFlow Inc."
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Industry</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none"
                >
                  {INDUSTRY_OPTIONS.map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {role === 'candidate' && (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Pick 3–5 skills ({selectedSkills.length}/5)
              </label>
              <div className="flex flex-wrap gap-2">
                {SKILL_OPTIONS.map((skill) => {
                  const selected = selectedSkills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs font-medium transition-colors ${
                        selected
                          ? 'bg-brand-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {selected && <Check className="h-3 w-3" />}
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={role === 'candidate' && selectedSkills.length < 3}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 font-semibold text-white hover:bg-brand-700 disabled:opacity-50"
          >
            Enter Nexora <ArrowRight className="h-5 w-5" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
