import { Bell, Building2, Users } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';

export default function RecruiterSettings() {
  const { name, company, industry } = useUserStore();
  const avatar = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-lg font-bold text-white">{avatar}</div>
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-slate-500">{company} · {industry}</p>
          </div>
        </div>
      </div>
      {[
        { icon: Building2, title: 'Company Profile', desc: 'Branding and job templates' },
        { icon: Users, title: 'Team Management', desc: 'Invite recruiters' },
        { icon: Bell, title: 'Screening Alerts', desc: 'High-match notifications' },
      ].map(({ icon: Icon, title, desc }) => (
        <div key={title} className="flex items-center justify-between rounded-2xl border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-slate-100 p-2"><Icon className="h-5 w-5" /></div>
            <div><p className="font-medium">{title}</p><p className="text-xs text-slate-500">{desc}</p></div>
          </div>
          <button className="rounded-lg border px-3 py-1.5 text-xs font-medium hover:bg-slate-50">Configure</button>
        </div>
      ))}
    </div>
  );
}
