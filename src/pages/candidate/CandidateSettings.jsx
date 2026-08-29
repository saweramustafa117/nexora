import { Bell, Shield, User, GraduationCap } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';

export default function CandidateSettings() {
  const { name, skills, triggerTutorial } = useUserStore();
  const avatar = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-xl font-bold sm:text-2xl">Settings</h1>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white">{avatar}</div>
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-slate-500">{skills.length} skills tracked</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 rounded-2xl border border-brand-200 bg-gradient-to-r from-brand-50 to-cyan-50 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="shrink-0 rounded-lg bg-brand-100 p-2"><GraduationCap className="h-5 w-5 text-brand-600" /></div>
          <div><p className="font-medium">Dashboard Tutorial</p><p className="text-xs text-slate-500">Replay the quick tour of Nexora features</p></div>
        </div>
        <button onClick={triggerTutorial} className="w-full rounded-lg bg-brand-600 px-3 py-2 text-xs font-medium text-white hover:bg-brand-700 sm:w-auto sm:py-1.5">Replay tour</button>
      </div>
      {[
        { icon: User, title: 'Profile Visibility', desc: 'Control who sees your skill profile' },
        { icon: Bell, title: 'Notifications', desc: 'Job matches and opportunity alerts' },
        { icon: Shield, title: 'Privacy', desc: 'Data sharing preferences' },
      ].map(({ icon: Icon, title, desc }) => (
        <div key={title} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="shrink-0 rounded-lg bg-slate-100 p-2"><Icon className="h-5 w-5 text-slate-600" /></div>
            <div><p className="font-medium">{title}</p><p className="text-xs text-slate-500">{desc}</p></div>
          </div>
          <button className="w-full rounded-lg border px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 sm:w-auto sm:py-1.5">Configure</button>
        </div>
      ))}
    </div>
  );
}
