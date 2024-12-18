
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from './lib/auth';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Organizations from './pages/Organizations';
import OrganizationDetails from './pages/OrganizationDetails';
import Login from './pages/Login';
import Pricing from './pages/Pricing';
import RegisterOrganization from './pages/RegisterOrganization';
import Team from './pages/Team';
import TimeAndAttendance from './pages/TimeAndAttendance';
import LeaveManagement from './pages/LeaveManagement';
import Settings from './pages/Settings';
import Performance from './pages/Performance';
import Training from './pages/Training';
import Documents from './pages/Documents';
import Reports from './pages/Reports';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { Suspense } from 'react';

const AuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  const [user] = useAtom(userAtom);
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/register" element={<RegisterOrganization />} />
          
          <Route element={<AuthenticatedRoute><Layout /></AuthenticatedRoute>}>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="organizations" element={<Organizations />} />
            <Route path="organizations/:id" element={<OrganizationDetails />} />
            <Route path="team" element={<Team />} />
            <Route path="attendance" element={<TimeAndAttendance />} />
            <Route path="leave" element={<LeaveManagement />} />
            <Route path="settings" element={<Settings />} />
            <Route path="performance/*" element={<Performance />} />
            <Route path="training" element={<Training />} />
            <Route path="documents" element={<Documents />} />
            <Route path="reports" element={<Reports />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
