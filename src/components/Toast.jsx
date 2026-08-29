import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useToastStore } from '../store/useChatStore';

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

const colors = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  info: 'bg-brand-50 border-brand-200 text-brand-800',
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-20 left-3 right-3 z-[60] flex flex-col gap-2 sm:bottom-24 sm:left-auto sm:right-6 sm:max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type] ?? Info;
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40 }}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg ${colors[toast.type]}`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="text-sm font-medium">{toast.message}</span>
              <button onClick={() => removeToast(toast.id)} className="ml-2 opacity-60 hover:opacity-100">
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export function toast(message, type = 'success') {
  useToastStore.getState().addToast(message, type);
}
