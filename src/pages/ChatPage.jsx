import ChatPanel from '../components/ChatPanel';
import { useUserStore } from '../store/useUserStore';

export default function ChatPage() {
  const role = useUserStore((s) => s.role);
  const isRecruiter = role === 'recruiter';

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div>
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Chat Assistant</h1>
        <p className="mt-1 text-sm text-slate-500">
          {isRecruiter
            ? 'Nexora AI in Hiring Intelligence mode — ask about candidate screening, match scores, talent pool, and your job pipeline.'
            : 'Nexora AI in Career Coach mode — ask about skill gaps, job matches, applications, and your career path.'}
        </p>
      </div>
      <ChatPanel fullPage />
    </div>
  );
}
