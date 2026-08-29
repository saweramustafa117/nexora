import { create } from 'zustand';
import { mockJobs } from '../data/mockJobs';
import { mockCandidates } from '../data/mockCandidates';
import { calculateMatchPercentage } from '../utils/calculateMatchPercentage';

const initialScreening = {};
mockCandidates.forEach((c) => {
  if (c.appliedJobs?.length) {
    c.appliedJobs.forEach((jobId) => {
      initialScreening[`${c.id}-${jobId}`] = 'new';
    });
  }
});
// Pre-shortlist a couple for demo
initialScreening['rc1-j1'] = 'shortlisted';
initialScreening['rc7-j3'] = 'shortlisted';
initialScreening['rc6-j2'] = 'rejected';

export const useJobsStore = create((set, get) => ({
  jobs: mockJobs.map((j) => ({ ...j, requiredSkills: j.requiredSkills.map((s) => ({ ...s })) })),
  screeningStatus: { ...initialScreening },

  addJob: (jobData) => {
    const id = `j-${Date.now()}`;
    const newJob = {
      id,
      ...jobData,
      companyLogo: jobData.company?.slice(0, 2).toUpperCase() ?? 'NW',
      status: 'open',
      posted: new Date().toISOString().split('T')[0],
      location: jobData.location ?? 'Remote',
      type: jobData.type ?? 'Full-time',
      salary: jobData.salary ?? 'Competitive',
    };

    // Auto-generate mock applicant matches from candidate pool
    const newScreening = { ...get().screeningStatus };
    mockCandidates.slice(0, 6).forEach((c) => {
      const match = calculateMatchPercentage(c.skills, newJob.requiredSkills);
      if (match >= 50) {
        newScreening[`${c.id}-${id}`] = 'new';
      }
    });

    set((state) => ({
      jobs: [newJob, ...state.jobs],
      screeningStatus: newScreening,
    }));
    return id;
  },

  setScreeningStatus: (candidateId, jobId, status) =>
    set((state) => ({
      screeningStatus: {
        ...state.screeningStatus,
        [`${candidateId}-${jobId}`]: status,
      },
    })),

  getScreeningStatus: (candidateId, jobId) =>
    get().screeningStatus[`${candidateId}-${jobId}`] ?? 'new',

  getApplicantsForJob: (jobId) => {
    const { screeningStatus } = get();
    return mockCandidates.filter((c) => {
      const key = `${c.id}-${jobId}`;
      return screeningStatus[key] !== undefined || c.appliedJobs?.includes(jobId);
    }).map((c) => ({
      ...c,
      screeningStatus: screeningStatus[`${c.id}-${jobId}`] ?? 'new',
    }));
  },

  toggleJobStatus: (jobId) =>
    set((state) => ({
      jobs: state.jobs.map((j) =>
        j.id === jobId
          ? { ...j, status: j.status === 'open' ? 'closed' : 'open' }
          : j,
      ),
    })),

  reset: () =>
    set({
      jobs: mockJobs.map((j) => ({ ...j, requiredSkills: j.requiredSkills.map((s) => ({ ...s })) })),
      screeningStatus: { ...initialScreening },
    }),
}));
