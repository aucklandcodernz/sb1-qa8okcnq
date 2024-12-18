import { Routes, Route, Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from './lib/auth';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Pricing from './pages/Pricing';
import RegisterOrganization from './pages/RegisterOrganization';
import LoadingSpinner from './components/ui/LoadingSpinner';
import { Suspense } from 'react';
import Dashboard from './pages/Dashboard';
import Organizations from './pages/Organizations';
import OrganizationDetails from './pages/OrganizationDetails';
import Team from './pages/Team';
import LeaveManagement from './pages/LeaveManagement';
import TimeAndAttendance from './pages/TimeAndAttendance';
import Settings from './pages/Settings';
import EmployeeProfile from './pages/EmployeeProfile';
import Performance from './pages/Performance';
import Training from './pages/Training';
import Documents from './pages/Documents';
import Reports from './pages/Reports';
import DisciplinaryManagement from './pages/DisciplinaryManagement'; // Imported Dashboard component
import CreateEmployeeForm from './components/employees/CreateEmployeeForm';
import EditEmployeeForm from './components/employees/EditEmployeeForm';

const AuthenticatedRoute = ({ children }: { children: React.ReactNode }) => {
  const [user] = useAtom(userAtom);
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/register" element={<RegisterOrganization />} />

        <Route
          path="/"
          element={
            <AuthenticatedRoute>
              <Layout />
            </AuthenticatedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          {/* Authenticated routes */}
          <Route path="dashboard" element={<Suspense fallback={<LoadingSpinner />}><Dashboard /></Suspense>} />
          <Route path="organizations" element={<Suspense fallback={<LoadingSpinner />}><Organizations /></Suspense>} />
          <Route path="organizations/:id" element={<Suspense fallback={<LoadingSpinner />}><OrganizationDetails /></Suspense>} />
          <Route path="team" element={<Suspense fallback={<LoadingSpinner />}><Team /></Suspense>} />
          <Route path="leave" element={<Suspense fallback={<LoadingSpinner />}><LeaveManagement /></Suspense>} />
          <Route path="attendance" element={<Suspense fallback={<LoadingSpinner />}><TimeAndAttendance /></Suspense>} />
          <Route path="settings" element={<Suspense fallback={<LoadingSpinner />}><Settings /></Suspense>} />
          <Route path="employees/:id/*" element={<Suspense fallback={<LoadingSpinner />}><EmployeeProfile /></Suspense>} />
          <Route path="performance/*" element={<Suspense fallback={<LoadingSpinner />}><Performance /></Suspense>} />
          <Route path="training" element={<Suspense fallback={<LoadingSpinner />}><Training /></Suspense>} />
          <Route path="documents" element={<Suspense fallback={<LoadingSpinner />}><Documents /></Suspense>} />
          <Route path="reports" element={<Suspense fallback={<LoadingSpinner />}><Reports /></Suspense>} />
          <Route path="disciplinary" element={<Suspense fallback={<LoadingSpinner />}><DisciplinaryManagement /></Suspense>} />
          <Route path="/employees/create" element={<CreateEmployeeForm />} />
          <Route path="/employees/:id/edit" element={<Suspense fallback={<LoadingSpinner />}><EditEmployeeForm /></Suspense>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}