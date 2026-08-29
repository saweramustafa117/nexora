import { create } from 'zustand';
import { MOCK_NOTIFICATIONS } from '../data/mockConnections';
import { DEFAULT_CANDIDATE_SKILLS } from '../data/mockCandidates';

export const useUserStore = create((set, get) => ({
  role: null,
  name: '',
  company: '',
  industry: '',
  skills: [...DEFAULT_CANDIDATE_SKILLS],
  onboardingComplete: false,
  tutorialSeen: { candidate: false, recruiter: false },
  tutorialForceOpen: false,
  notifications: MOCK_NOTIFICATIONS.map((n) => ({ ...n })),

  setRole: (role) => set({ role }),

  completeOnboarding: ({ name, company, industry, skills, role }) =>
    set({
      name,
      company: company ?? '',
      industry: industry ?? '',
      skills: skills ?? get().skills,
      role,
      onboardingComplete: true,
    }),

  switchRole: (role) => set({ role }),

  dismissTutorial: (role) =>
    set((state) => ({
      tutorialSeen: { ...state.tutorialSeen, [role]: true },
    })),

  resetTutorial: (role) =>
    set((state) => ({
      tutorialSeen: role
        ? { ...state.tutorialSeen, [role]: false }
        : { candidate: false, recruiter: false },
    })),

  triggerTutorial: () => set({ tutorialForceOpen: true }),
  clearTutorialForce: () => set({ tutorialForceOpen: false }),

  updateSkill: (skillName, proficiency) =>
    set((state) => {
      const existing = state.skills.find(
        (s) => s.name.toLowerCase() === skillName.toLowerCase(),
      );
      if (existing) {
        return {
          skills: state.skills.map((s) =>
            s.name.toLowerCase() === skillName.toLowerCase()
              ? { ...s, proficiency: Math.min(100, proficiency) }
              : s,
          ),
        };
      }
      return {
        skills: [...state.skills, { name: skillName, proficiency: Math.min(100, proficiency) }],
      };
    }),

  markSkillLearned: (skillName, targetProficiency = 75) => {
    get().updateSkill(skillName, targetProficiency);
  },

  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n,
      ),
    })),

  addNotification: (text) =>
    set((state) => ({
      notifications: [
        { id: `n-${Date.now()}`, text, time: 'Just now', read: false },
        ...state.notifications,
      ],
    })),

  reset: () =>
    set({
      role: null,
      name: '',
      company: '',
      industry: '',
      skills: [...DEFAULT_CANDIDATE_SKILLS],
      onboardingComplete: false,
      tutorialSeen: { candidate: false, recruiter: false },
      tutorialForceOpen: false,
      notifications: MOCK_NOTIFICATIONS.map((n) => ({ ...n })),
    }),
}));
