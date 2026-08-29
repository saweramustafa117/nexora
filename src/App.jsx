import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import CandidateDashboard from './pages/candidate/CandidateDashboard';
import CandidateOpportunities from './pages/candidate/CandidateOpportunities';
import CandidateApplications from './pages/candidate/CandidateApplications';
import CandidateCareerGPS from './pages/candidate/CandidateCareerGPS';
import CandidateNetwork from './pages/candidate/CandidateNetwork';
import CandidateSettings from './pages/candidate/CandidateSettings';
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import RecruiterCandidates from './pages/recruiter/RecruiterCandidates';
import TalentPool from './pages/recruiter/TalentPool';
import RecruiterJobs from './pages/recruiter/RecruiterJobs';
import RecruiterAnalytics from './pages/recruiter/RecruiterAnalytics';
import RecruiterSettings from './pages/recruiter/RecruiterSettings';
import ChatPage from './pages/ChatPage';
import { useUserStore } from './store/useUserStore';

function DashboardLayout({ children }) {
  return <Layout>{children}</Layout>;
}

function HomeRedirect() {
  const { onboardingComplete, role } = useUserStore();
  if (onboardingComplete) {
    return <Navigate to={role === 'recruiter' ? '/recruiter' : '/candidate'} replace />;
  }
  return <Landing />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/onboarding" element={<Onboarding />} />

      <Route path="/candidate" element={<ProtectedRoute requiredRole="candidate"><DashboardLayout><CandidateDashboard /></DashboardLayout></ProtectedRoute>} />
      <Route path="/candidate/opportunities" element={<ProtectedRoute requiredRole="candidate"><DashboardLayout><CandidateOpportunities /></DashboardLayout></ProtectedRoute>} />
      <Route path="/candidate/applications" element={<ProtectedRoute requiredRole="candidate"><DashboardLayout><CandidateApplications /></DashboardLayout></ProtectedRoute>} />
      <Route path="/candidate/career-gps" element={<ProtectedRoute requiredRole="candidate"><DashboardLayout><CandidateCareerGPS /></DashboardLayout></ProtectedRoute>} />
      <Route path="/candidate/network" element={<ProtectedRoute requiredRole="candidate"><DashboardLayout><CandidateNetwork /></DashboardLayout></ProtectedRoute>} />
      <Route path="/candidate/chat" element={<ProtectedRoute requiredRole="candidate"><DashboardLayout><ChatPage /></DashboardLayout></ProtectedRoute>} />
      <Route path="/candidate/settings" element={<ProtectedRoute requiredRole="candidate"><DashboardLayout><CandidateSettings /></DashboardLayout></ProtectedRoute>} />

      <Route path="/recruiter" element={<ProtectedRoute requiredRole="recruiter"><DashboardLayout><RecruiterDashboard /></DashboardLayout></ProtectedRoute>} />
      <Route path="/recruiter/candidates" element={<ProtectedRoute requiredRole="recruiter"><DashboardLayout><RecruiterCandidates /></DashboardLayout></ProtectedRoute>} />
      <Route path="/recruiter/talent-pool" element={<ProtectedRoute requiredRole="recruiter"><DashboardLayout><TalentPool /></DashboardLayout></ProtectedRoute>} />
      <Route path="/recruiter/jobs" element={<ProtectedRoute requiredRole="recruiter"><DashboardLayout><RecruiterJobs /></DashboardLayout></ProtectedRoute>} />
      <Route path="/recruiter/analytics" element={<ProtectedRoute requiredRole="recruiter"><DashboardLayout><RecruiterAnalytics /></DashboardLayout></ProtectedRoute>} />
      <Route path="/recruiter/chat" element={<ProtectedRoute requiredRole="recruiter"><DashboardLayout><ChatPage /></DashboardLayout></ProtectedRoute>} />
      <Route path="/recruiter/settings" element={<ProtectedRoute requiredRole="recruiter"><DashboardLayout><RecruiterSettings /></DashboardLayout></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
