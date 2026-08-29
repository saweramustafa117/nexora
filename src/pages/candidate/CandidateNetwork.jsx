import { UserPlus, Users } from 'lucide-react';
import { mockConnections } from '../../data/mockConnections';
import { useCandidatesStore } from '../../store/useCandidatesStore';
import { toast } from '../../components/Toast';

export default function CandidateNetwork() {
  const { connectionStatuses, connectWithPerson } = useCandidatesStore();

  const connected = mockConnections.filter((p) => connectionStatuses[p.id] === 'connected');
  const pending = mockConnections.filter((p) => connectionStatuses[p.id] === 'pending');

  const handleConnect = (person) => {
    const status = connectionStatuses[person.id] ?? 'none';
    connectWithPerson(person.id);
    if (status === 'none') toast(`Connection request sent to ${person.name}`, 'success');
    else if (status === 'pending') toast(`You're now connected with ${person.name}!`, 'success');
  };

  const btnLabel = (id) => {
    const s = connectionStatuses[id] ?? 'none';
    if (s === 'connected') return 'Connected ✓';
    if (s === 'pending') return 'Accept Connection';
    return 'Connect';
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Network</h1>
        <p className="mt-1 text-sm text-slate-500">Quality connections aligned to your goals — click Connect, then Accept to simulate</p>
      </div>

      {(connected.length > 0 || pending.length > 0) && (
        <div className="grid gap-4 sm:grid-cols-2">
          {connected.length > 0 && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-800">
                <Users className="h-4 w-4" /> Connected ({connected.length})
              </div>
              {connected.map((p) => (
                <p key={p.id} className="text-sm text-emerald-700">{p.name} — {p.role}</p>
              ))}
            </div>
          )}
          {pending.length > 0 && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <div className="mb-2 text-sm font-semibold text-amber-800">Pending ({pending.length})</div>
              {pending.map((p) => (
                <p key={p.id} className="text-sm text-amber-700">{p.name}</p>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {mockConnections.map((person) => {
          const status = connectionStatuses[person.id] ?? 'none';
          return (
            <div key={person.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-cyan-500 text-xs font-bold text-white">
                  {person.avatar}
                </div>
                <div>
                  <h4 className="font-semibold">{person.name}</h4>
                  <p className="text-xs text-slate-500">{person.role}</p>
                  <span className="mt-1 inline-block text-xs font-medium text-brand-600">{person.matchPercent}% aligned</span>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {person.sharedSkills.map((s) => (
                  <span key={s} className="rounded bg-brand-50 px-2 py-0.5 text-xs text-brand-700">{s}</span>
                ))}
              </div>
              <button
                onClick={() => handleConnect(person)}
                disabled={status === 'connected'}
                className={`mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-sm font-medium ${
                  status === 'connected' ? 'bg-emerald-50 text-emerald-700' :
                  status === 'pending' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' :
                  'bg-brand-600 text-white hover:bg-brand-700'
                }`}
              >
                <UserPlus className="h-4 w-4" /> {btnLabel(person.id)}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
