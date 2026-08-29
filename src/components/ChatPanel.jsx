import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, RotateCcw, Sparkles } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import { sendChatMessage } from '../utils/openRouterService';
import { buildChatUserContext } from '../utils/chatContext';

export const QUICK_PROMPTS = [
  'Why am I not getting matched to Senior roles?',
  'What skills should I learn next?',
  'Explain my top job matches',
  'How does Nexora rank candidates?',
];

export default function ChatPanel({ fullPage = false }) {
  const { messages, isLoading, error, addMessage, setLoading, setError, clearChat } = useChatStore();
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const send = useCallback(async (text) => {
    const content = text?.trim();
    if (!content || isLoading) return;

    addMessage('user', content);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const history = useChatStore.getState().messages;
      const apiMessages = history.map((m) => ({ role: m.role, content: m.content }));
      const reply = await sendChatMessage(apiMessages, buildChatUserContext());
      addMessage('assistant', reply);
    } catch (err) {
      setError(err.message ?? 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [isLoading, addMessage, setLoading, setError]);

  const retry = async () => {
    setError(null);
    setLoading(true);
    try {
      const history = useChatStore.getState().messages;
      const apiMessages = history.map((m) => ({ role: m.role, content: m.content }));
      const reply = await sendChatMessage(apiMessages, buildChatUserContext());
      addMessage('assistant', reply);
    } catch (err) {
      setError(err.message ?? 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col bg-white ${fullPage ? 'h-[calc(100vh-12rem)] rounded-2xl border border-slate-200 shadow-sm' : 'h-full'}`}>
      <div className={`flex items-center justify-between border-b px-4 py-3 ${fullPage ? 'border-slate-200' : 'border-slate-100 bg-brand-600 text-white'}`}>
        <div className="flex items-center gap-2">
          <Sparkles className={`h-5 w-5 ${fullPage ? 'text-brand-600' : ''}`} />
          <div>
            <p className={`text-sm font-semibold ${fullPage ? 'text-slate-900' : ''}`}>Ask Nexora AI</p>
            <p className={`text-xs ${fullPage ? 'text-slate-500' : 'text-brand-200'}`}>Powered by OpenRouter · free model</p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className={`rounded-lg p-1.5 ${fullPage ? 'text-slate-400 hover:bg-slate-100' : 'hover:bg-brand-700'}`}
          title="Clear chat"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="space-y-3">
            <p className="text-sm text-slate-600">
              Hi! I&apos;m Nexora AI. Ask me about your skills, job matches, career path, or hiring insights.
            </p>
            <p className="text-xs font-medium text-slate-500">Try a quick prompt:</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  disabled={isLoading}
                  className="rounded-xl border border-slate-200 px-3 py-2 text-left text-xs text-slate-600 hover:border-brand-300 hover:bg-brand-50 disabled:opacity-50"
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
                m.role === 'user' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-800'
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
            placeholder="Ask about your career, skills, or matches..."
            className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-xl bg-brand-600 p-2.5 text-white hover:bg-brand-700 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
