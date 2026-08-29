import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
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

export default function Sidebar({ isOpen, onClose }) {
  const role = useUserStore((s) => s.role);
  const navItems = role === 'candidate' ? candidateNav : recruiterNav;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[min(280px,85vw)] flex-col bg-slate-900 text-white transition-transform duration-300 ease-in-out lg:z-30 lg:w-64 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-700/60 px-5 py-4 lg:px-6 lg:py-5">
          <div className="flex items-center gap-3">
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
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
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
            <MessageSquare className="h-4 w-4 shrink-0 text-brand-400" />
            <span className="hidden sm:inline">Chat Assistant available ↘</span>
            <span className="sm:hidden">Ask Nexora AI ↘</span>
          </div>
        </div>
      </aside>
    </>
  );
}
