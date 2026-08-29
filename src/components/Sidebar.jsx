import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Briefcase, Compass, Users, Settings,
  BarChart3, UserSearch, MessageSquare, FileText,
} from 'lucide-react';
import { useUserStore } from '../store/useUserStore';

const candidateNav = [
  { to: '/candidate', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/candidate/opportunities', icon: Briefcase, label: 'Opportunities' },
  { to: '/candidate/applications', icon: FileText, label: 'My Applications' },
  { to: '/candidate/career-gps', icon: Compass, label: 'Career GPS' },
  { to: '/candidate/network', icon: Users, label: 'Network' },
  { to: '/candidate/chat', icon: MessageSquare, label: 'Chat Assistant' },
  { to: '/candidate/settings', icon: Settings, label: 'Settings' },
];

const recruiterNav = [
  { to: '/recruiter', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/recruiter/candidates', icon: UserSearch, label: 'Smart Screening' },
  { to: '/recruiter/talent-pool', icon: Users, label: 'Talent Pool' },
  { to: '/recruiter/jobs', icon: Briefcase, label: 'Job Postings' },
  { to: '/recruiter/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/recruiter/chat', icon: MessageSquare, label: 'Chat Assistant' },
  { to: '/recruiter/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const role = useUserStore((s) => s.role);
  const navItems = role === 'candidate' ? candidateNav : recruiterNav;

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-64 flex-col bg-slate-900 text-white">
      <div className="flex items-center gap-3 border-b border-slate-700/60 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M4 18V6l8 6 8-6v12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <span className="text-lg font-bold tracking-tight">Nexora</span>
          <p className="text-xs text-slate-400">Talent Intelligence</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-brand-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-700/60 p-4">
        <div className="flex items-center gap-2 rounded-xl bg-slate-800/60 px-3 py-2.5 text-xs text-slate-400">
          <MessageSquare className="h-4 w-4 text-brand-400" />
          Chat Assistant available ↘
        </div>
      </div>
    </aside>
  );
}
