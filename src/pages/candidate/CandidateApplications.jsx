import { RefreshCw } from 'lucide-react';
import { useCandidatesStore } from '../../store/useCandidatesStore';
import { toast } from '../../components/Toast';

const STATUSES = ['Applied', 'Under Review', 'Shortlisted', 'Rejected'];
const statusColors = {
  Applied: 'bg-blue-50 text-blue-700',
  'Under Review': 'bg-amber-50 text-amber-700',
  Shortlisted: 'bg-emerald-50 text-emerald-700',
  Rejected: 'bg-red-50 text-red-700',
};

export default function CandidateApplications() {
  const { applications, updateApplicationStatus } = useCandidatesStore();

  const simulateUpdate = (app) => {
    const idx = STATUSES.indexOf(app.status);
    const next = STATUSES[(idx + 1) % STATUSES.length];
    updateApplicationStatus(app.id, next);
    toast(`Status updated: ${next}`, 'info');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">My Applications</h1>
        <p className="mt-1 text-sm text-slate-500">Track your job applications — click simulate to demo status changes</p>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 py-12 text-center sm:py-16">
          <p className="text-sm text-slate-500 sm:text-base">No applications yet. Apply to jobs from the Opportunities page!</p>
        </div>
      ) : (
        <>
          {/* Mobile cards */}
          <div className="space-y-3 md:hidden">
            {applications.map((app) => (
              <div key={app.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900">{app.jobTitle}</p>
                    <p className="text-sm text-slate-500">{app.company}</p>
                  </div>
                  <span className="shrink-0 font-bold text-brand-600">{app.matchPercent}%</span>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[app.status]}`}>
                    {app.status}
                  </span>
                  <span className="text-xs text-slate-400">{new Date(app.appliedAt).toLocaleDateString()}</span>
                </div>
                <button
                  onClick={() => simulateUpdate(app)}
                  className="mt-3 flex w-full items-center justify-center gap-1 rounded-xl border border-slate-200 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  <RefreshCw className="h-3 w-3" /> Simulate update
                </button>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  <th className="px-4 py-3 font-semibold text-slate-600">Job</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Company</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Match</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Status</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Applied</th>
                  <th className="px-4 py-3 font-semibold text-slate-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-medium text-slate-800">{app.jobTitle}</td>
                    <td className="px-4 py-3 text-slate-600">{app.company}</td>
                    <td className="px-4 py-3 font-semibold text-brand-600">{app.matchPercent}%</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[app.status]}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{new Date(app.appliedAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => simulateUpdate(app)}
                        className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100"
                      >
                        <RefreshCw className="h-3 w-3" /> Simulate update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
