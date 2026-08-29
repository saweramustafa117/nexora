import { create } from 'zustand';
import { mockCandidates } from '../data/mockCandidates';

export const useCandidatesStore = create((set, get) => ({
  candidates: mockCandidates.map((c) => ({ ...c, skills: c.skills.map((s) => ({ ...s })) })),

  applications: [],
  savedOpportunityIds: [],
  connectionStatuses: {}, // { [personId]: 'none' | 'pending' | 'connected' }

  applyToJob: (jobId, jobTitle, company, matchPercent) => {
    const existing = get().applications.find((a) => a.jobId === jobId);
    if (existing) return false;

    set((state) => ({
      applications: [
        {
          id: `app-${Date.now()}`,
          jobId,
          jobTitle,
          company,
          matchPercent,
          status: 'Applied',
          appliedAt: new Date().toISOString(),
        },
        ...state.applications,
      ],
    }));
    return true;
  },

  updateApplicationStatus: (applicationId, status) =>
    set((state) => ({
      applications: state.applications.map((a) =>
        a.id === applicationId ? { ...a, status } : a,
      ),
    })),

  toggleSaveOpportunity: (opportunityId) =>
    set((state) => ({
      savedOpportunityIds: state.savedOpportunityIds.includes(opportunityId)
        ? state.savedOpportunityIds.filter((id) => id !== opportunityId)
        : [...state.savedOpportunityIds, opportunityId],
    })),

  connectWithPerson: (personId) => {
    const current = get().connectionStatuses[personId] ?? 'none';
    if (current === 'connected') return;
    if (current === 'pending') {
      set((state) => ({
        connectionStatuses: { ...state.connectionStatuses, [personId]: 'connected' },
      }));
      return;
    }
    set((state) => ({
      connectionStatuses: { ...state.connectionStatuses, [personId]: 'pending' },
    }));
  },

  getCandidateById: (id) => get().candidates.find((c) => c.id === id),

  reset: () =>
    set({
      candidates: mockCandidates.map((c) => ({ ...c, skills: c.skills.map((s) => ({ ...s })) })),
      applications: [],
      savedOpportunityIds: [],
      connectionStatuses: {},
    }),
}));
