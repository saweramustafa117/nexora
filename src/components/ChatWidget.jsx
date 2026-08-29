import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import { useUserStore } from '../store/useUserStore';
import ChatPanel from './ChatPanel';

export default function ChatWidget() {
  const { isOpen, toggleOpen } = useChatStore();
  const onboardingComplete = useUserStore((s) => s.onboardingComplete);
  const role = useUserStore((s) => s.role);
  const isRecruiter = role === 'recruiter';

  if (!onboardingComplete) return null;

  return (
    <>
      <motion.button
        onClick={toggleOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open Nexora AI chat"
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg ${
          isRecruiter
            ? 'bg-violet-600 shadow-violet-600/30 hover:bg-violet-700'
            : 'bg-brand-600 shadow-brand-600/30 hover:bg-brand-700'
        }`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 flex h-[520px] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          >
            <ChatPanel />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
