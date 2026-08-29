import { create } from 'zustand';

export const useChatStore = create((set, get) => ({
  isOpen: false,
  messages: [],
  isLoading: false,
  error: null,

  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (isOpen) => set({ isOpen }),

  addMessage: (role, content) =>
    set((state) => ({
      messages: [...state.messages, { role, content, id: `${Date.now()}-${Math.random().toString(36).slice(2)}` }],
      error: null,
    })),

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),

  clearChat: () => set({ messages: [], error: null }),

  reset: () => set({ isOpen: false, messages: [], isLoading: false, error: null }),
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
