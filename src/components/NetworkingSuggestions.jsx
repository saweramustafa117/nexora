import { mockConnections } from '../data/mockConnections';
import { useCandidatesStore } from '../store/useCandidatesStore';
import { toast } from './Toast';

export default function NetworkingSuggestions() {
  const { connectionStatuses, connectWithPerson } = useCandidatesStore();
  const people = mockConnections.slice(0, 4);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {people.map((person) => {
        const status = connectionStatuses[person.id] ?? 'none';
        return (
          <div key={person.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">{person.avatar}</div>
              <div>
                <h4 className="text-sm font-semibold">{person.name}</h4>
                <p className="text-xs text-slate-500">{person.role}</p>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {person.sharedSkills.slice(0, 2).map((s) => (
                <span key={s} className="rounded bg-brand-50 px-1.5 py-0.5 text-xs text-brand-700">{s}</span>
              ))}
            </div>
            <button
              onClick={() => {
                connectWithPerson(person.id);
                toast(status === 'pending' ? `Connected with ${person.name}!` : `Request sent to ${person.name}`, 'success');
              }}
              disabled={status === 'connected'}
              className={`mt-3 w-full rounded-lg py-1.5 text-xs font-medium ${
                status === 'connected' ? 'bg-emerald-50 text-emerald-700' : 'bg-brand-600 text-white hover:bg-brand-700'
              }`}
            >
              {status === 'connected' ? 'Connected' : status === 'pending' ? 'Accept' : 'Connect'}
            </button>
          </div>
        );
      })}
    </div>
  );
}
