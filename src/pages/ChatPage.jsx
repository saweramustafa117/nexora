import ChatPanel from '../components/ChatPanel';

export default function ChatPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Chat Assistant</h1>
        <p className="mt-1 text-sm text-slate-500">
          Ask Nexora AI about your profile, skill gaps, job matches, and career advice — powered by OpenRouter.
        </p>
      </div>
      <ChatPanel fullPage />
    </div>
  );
}
