import { create } from 'zustand';
import { useUserStore } from './useUserStore';

const emptyMessages = () => ({ candidate: [], recruiter: [] });

export const useChatStore = create((set, get) => ({
  isOpen: false,
  messagesByRole: emptyMessages(),
  isLoading: false,
  error: null,

  getMessages: () => {
    const role = useUserStore.getState().role ?? 'candidate';
    return get().messagesByRole[role] ?? [];
  },

  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (isOpen) => set({ isOpen }),

  addMessage: (msgRole, content) => {
    const userRole = useUserStore.getState().role ?? 'candidate';
    set((state) => ({
      messagesByRole: {
        ...state.messagesByRole,
        [userRole]: [
          ...state.messagesByRole[userRole],
          { role: msgRole, content, id: `${Date.now()}-${Math.random().toString(36).slice(2)}` },
        ],
      },
      error: null,
    }));
  },

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),

  clearChat: () => {
    const userRole = useUserStore.getState().role ?? 'candidate';
    set((state) => ({
      messagesByRole: { ...state.messagesByRole, [userRole]: [] },
      error: null,
    }));
  },

  reset: () =>
    set({ isOpen: false, messagesByRole: emptyMessages(), isLoading: false, error: null }),
}));

export const useToastStore = create((set) => ({
  toasts: [],
  addToast: (message, type = 'success') => {
    const id = Date.now();
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 3500);
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
