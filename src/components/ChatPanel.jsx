import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, RotateCcw, Sparkles, User, Building2 } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import { useUserStore } from '../store/useUserStore';
import { sendChatMessage } from '../utils/openRouterService';
import { buildChatUserContext, getQuickPrompts } from '../utils/chatContext';

const WELCOME = {
  candidate: {
    title: 'Career Coach Mode',
    text: "Hi! I'm your Nexora career coach. I can explain your job matches, skill gaps, applications, and what to learn next — all based on your live profile.",
    placeholder: 'Ask about skills, job matches, or career path…',
  },
  recruiter: {
    title: 'Hiring Intelligence Mode',
    text: "Hi! I'm your Nexora hiring assistant. I can help you screen candidates, interpret match scores, find hidden talent, and optimize your job pipeline.",
    placeholder: 'Ask about candidates, screening, or hiring insights…',
  },
};

export default function ChatPanel({ fullPage = false }) {
  const userRole = useUserStore((s) => s.role) ?? 'candidate';
  const name = useUserStore((s) => s.name);
  const messagesByRole = useChatStore((s) => s.messagesByRole);
  const messages = messagesByRole[userRole] ?? [];
  const { isLoading, error, addMessage, setLoading, setError, clearChat } = useChatStore();
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  const welcome = WELCOME[userRole];
  const quickPrompts = getQuickPrompts(userRole);
  const isRecruiter = userRole === 'recruiter';

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, userRole]);

  const send = useCallback(async (text) => {
    const content = text?.trim();
    if (!content || isLoading) return;

    addMessage('user', content);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const history = useChatStore.getState().messagesByRole[userRole] ?? [];
      const apiMessages = history.map((m) => ({ role: m.role, content: m.content }));
      const reply = await sendChatMessage(apiMessages, buildChatUserContext());
      if (!reply?.trim()) throw new Error('Empty response from AI. Please retry.');
      addMessage('assistant', reply);
    } catch (err) {
      setError(err.message ?? 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [isLoading, addMessage, setLoading, setError, userRole]);

  const retry = async () => {
    setError(null);
    setLoading(true);
    try {
      const history = useChatStore.getState().messagesByRole[userRole] ?? [];
      const apiMessages = history.map((m) => ({ role: m.role, content: m.content }));
      const reply = await sendChatMessage(apiMessages, buildChatUserContext());
      if (!reply?.trim()) throw new Error('Empty response from AI. Please retry.');
      addMessage('assistant', reply);
    } catch (err) {
      setError(err.message ?? 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const headerBg = fullPage
    ? 'border-slate-200 bg-white'
    : isRecruiter
      ? 'border-slate-100 bg-gradient-to-r from-violet-600 to-indigo-600 text-white'
      : 'border-slate-100 bg-gradient-to-r from-brand-600 to-cyan-600 text-white';

  const RoleIcon = isRecruiter ? Building2 : User;

  return (
    <div className={`flex flex-col bg-white ${fullPage ? 'h-[calc(100dvh-10rem)] sm:h-[calc(100vh-12rem)] rounded-2xl border border-slate-200 shadow-sm' : 'h-full min-h-0'}`}>
      <div className={`flex items-center justify-between border-b px-4 py-3 ${headerBg}`}>
        <div className="flex items-center gap-2">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${fullPage ? (isRecruiter ? 'bg-violet-100' : 'bg-brand-100') : 'bg-white/20'}`}>
            {fullPage ? (
              <RoleIcon className={`h-4 w-4 ${isRecruiter ? 'text-violet-600' : 'text-brand-600'}`} />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className={`text-sm font-semibold ${fullPage ? 'text-slate-900' : ''}`}>Ask Nexora AI</p>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                fullPage
                  ? isRecruiter ? 'bg-violet-100 text-violet-700' : 'bg-brand-100 text-brand-700'
                  : 'bg-white/20 text-white'
              }`}>
                {isRecruiter ? 'Recruiter' : 'Candidate'}
              </span>
            </div>
            <p className={`text-xs ${fullPage ? 'text-slate-500' : 'text-white/80'}`}>
              {welcome.title} · OpenRouter
            </p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className={`rounded-lg p-1.5 ${fullPage ? 'text-slate-400 hover:bg-slate-100' : 'hover:bg-white/20'}`}
          title="Clear chat"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="space-y-3">
            {name && (
              <p className={`text-sm font-medium ${isRecruiter ? 'text-violet-700' : 'text-brand-700'}`}>
                Hello, {name.split(' ')[0]}!
              </p>
            )}
            <p className="text-sm text-slate-600">{welcome.text}</p>
            <p className="text-xs font-medium text-slate-500">Quick prompts for {isRecruiter ? 'recruiters' : 'candidates'}:</p>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  disabled={isLoading}
                  className={`rounded-xl border px-3 py-2 text-left text-xs transition-colors disabled:opacity-50 ${
                    isRecruiter
                      ? 'border-violet-200 text-violet-800 hover:border-violet-400 hover:bg-violet-50'
                      : 'border-brand-200 text-brand-800 hover:border-brand-400 hover:bg-brand-50'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm ${
                m.role === 'user'
                  ? isRecruiter ? 'bg-violet-600 text-white' : 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-800'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-500">
              Nexora AI is thinking<span className="animate-pulse">...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            <p className="font-medium">Couldn&apos;t reach Nexora AI</p>
            <p className="mt-1">{error}</p>
            <button onClick={retry} className="mt-2 font-semibold text-red-800 underline">
              Retry
            </button>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-slate-100 p-3">
        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={welcome.placeholder}
            className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`rounded-xl p-2.5 text-white disabled:opacity-50 ${
              isRecruiter ? 'bg-violet-600 hover:bg-violet-700' : 'bg-brand-600 hover:bg-brand-700'
            }`}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
