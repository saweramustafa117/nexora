import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, User, Building2, Menu } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';

export default function TopBar({ onMenuClick }) {
  const { role, name, company, switchRole, notifications, markNotificationRead } = useUserStore();
  const navigate = useNavigate();
  const [showNotifs, setShowNotifs] = useState(false);
  const notifRef = useRef(null);
  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifs(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSwitch = (newRole) => {
    switchRole(newRole);
    navigate(newRole === 'candidate' ? '/candidate' : '/recruiter');
  };

  const displayName = name || (role === 'recruiter' ? 'Recruiter' : 'Candidate');
  const avatar = displayName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-20 flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-md sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="truncate rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-semibold text-brand-700 sm:px-3 sm:text-xs">
          {role === 'candidate' ? 'Candidate' : 'Recruiter'} View
          {role === 'recruiter' && company && (
            <span className="hidden md:inline">{` · ${company}`}</span>
          )}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-0.5">
          <button
            onClick={() => handleSwitch('candidate')}
            className={`flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors sm:gap-1.5 sm:px-3 ${
              role === 'candidate'
                ? 'bg-white text-brand-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <User className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Candidate</span>
          </button>
          <button
            onClick={() => handleSwitch('recruiter')}
            className={`flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium transition-colors sm:gap-1.5 sm:px-3 ${
              role === 'recruiter'
                ? 'bg-white text-brand-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Building2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Recruiter</span>
          </button>
        </div>

        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unread > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                {unread}
              </span>
            )}
          </button>
          {showNotifs && (
            <div className="absolute right-0 z-50 mt-2 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white py-2 shadow-xl">
              <p className="px-4 py-2 text-xs font-semibold uppercase text-slate-400">Notifications</p>
              {notifications.map((n) => (
                <button
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  className={`block w-full px-4 py-3 text-left text-sm hover:bg-slate-50 ${!n.read ? 'bg-brand-50/50' : ''}`}
                >
                  <p className="text-slate-700">{n.text}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{n.time}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-white">
            {avatar}
          </div>
          <span className="hidden max-w-[100px] truncate text-sm font-medium text-slate-700 md:block lg:max-w-[140px]">
            {displayName}
          </span>
          <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
        </div>
      </div>
    </header>
  );
}
