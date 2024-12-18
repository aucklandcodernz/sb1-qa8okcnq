import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Organizations from './pages/Organizations';
import TimeAndAttendance from './pages/TimeAndAttendance';
import OrganizationDetails from './pages/OrganizationDetails';
import Payroll from './pages/Payroll';
import LoadingSpinner from './components/ui/LoadingSpinner';
import Team from './pages/Team';
import EmployeeProfile from './pages/EmployeeProfile'; 
import EditEmployeeForm from './components/employees/EditEmployeeForm';
import EmployeeDocuments from './pages/employee/EmployeeDocuments';

export default function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/organizations/:id" element={<OrganizationDetails />} />
          <Route path="/organizations/:id/payroll/*" element={<Payroll />} />
          <Route path="/attendance" element={<TimeAndAttendance />} />
          <Route path="/team" element={<Team />} />
          <Route path="/employees/:id/*" element={<EmployeeProfile />}>
            <Route path="documents" element={<EmployeeDocuments />} />
            <Route path="edit" element={<EditEmployeeForm />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
}