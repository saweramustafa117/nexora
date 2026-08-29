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
        className={`fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg sm:bottom-6 sm:right-6 sm:h-14 sm:w-14 ${
          isRecruiter
            ? 'bg-violet-600 shadow-violet-600/30 hover:bg-violet-700'
            : 'bg-brand-600 shadow-brand-600/30 hover:bg-brand-700'
        }`}
      >
        {isOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed inset-x-3 bottom-[4.5rem] top-16 z-50 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:inset-x-auto sm:bottom-24 sm:right-6 sm:top-auto sm:h-[520px] sm:w-[min(380px,calc(100vw-2rem))]"
          >
            <ChatPanel />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
