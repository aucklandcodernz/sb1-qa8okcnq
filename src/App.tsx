import { Routes, Route, Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from './lib/auth';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Pricing from './pages/Pricing';
import RegisterOrganization from './pages/RegisterOrganization';
import Dashboard from './pages/Dashboard';
import Organizations from './pages/Organizations';
import OrganizationDetails from './pages/OrganizationDetails';
import LeaveManagement from './pages/LeaveManagement';
import TimeAndAttendance from './pages/TimeAndAttendance';
import Settings from './pages/Settings';
import EmployeeProfile from './pages/EmployeeProfile';
import Performance from './pages/Performance';
import Training from './pages/Training';
import Documents from './pages/Documents';
import Reports from './pages/Reports';
import DisciplinaryManagement from './pages/DisciplinaryManagement';
import Team from './pages/Team';
import Safety from './pages/Safety';
import Payroll from './pages/Payroll';

export default function App() {
  const [user] = useAtom(userAtom);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/register" element={<RegisterOrganization />} />

      <Route
        path="/"
        element={
          user ? <Layout /> : <Navigate to="/login" replace />
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="organizations" element={<Organizations />} />
        <Route path="organizations/:id" element={<OrganizationDetails />} />
        <Route path="organizations/:id/safety/*" element={<Safety />} />
        <Route path="organizations/:id/payroll/*" element={<Payroll />} />
        <Route path="team" element={<Team />} />
        <Route path="leave" element={<LeaveManagement />} />
        <Route path="attendance" element={<TimeAndAttendance />} />
        <Route path="settings" element={<Settings />} />
        <Route path="employees/:id/*" element={<EmployeeProfile />} />
        <Route path="performance/*" element={<Performance />} />
        <Route path="training" element={<Training />} />
        <Route path="documents" element={<Documents />} />
        <Route path="reports" element={<Reports />} />
        <Route path="disciplinary" element={<DisciplinaryManagement />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}