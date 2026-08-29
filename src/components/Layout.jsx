import Sidebar from './Sidebar';
import TopBar from './TopBar';
import ChatWidget from './ChatWidget';
import ToastContainer from './Toast';
import DashboardTutorial from './DashboardTutorial';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="ml-64 flex min-h-screen flex-col">
        <TopBar />
        <main className="flex-1 p-6">{children}</main>
      </div>
      <DashboardTutorial />
      <ChatWidget />
      <ToastContainer />
    </div>
  );
}
