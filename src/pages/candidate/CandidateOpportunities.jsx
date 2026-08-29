import JobMatchList from '../../components/JobMatchList';
import OpportunitiesFeed from '../../components/OpportunitiesFeed';
import { mockOpportunities } from '../../data/mockOpportunities';

export default function CandidateOpportunities() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">Opportunities</h1>
        <p className="mt-1 text-sm text-slate-500">Jobs, scholarships, fellowships, and more — filter and save what interests you</p>
      </div>
      <OpportunitiesFeed opportunities={mockOpportunities} />
      <div>
        <h2 className="mb-4 text-base font-semibold sm:text-lg">All Job Matches</h2>
        <JobMatchList />
      </div>
    </div>
  );
}
