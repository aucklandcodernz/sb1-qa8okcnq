import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Organizations from './pages/Organizations';
import OrganizationDetails from './pages/OrganizationDetails';
import Payroll from './pages/Payroll';
import LoadingSpinner from './components/ui/LoadingSpinner';
import Team from './pages/Team';
import EmployeeProfile from './pages/EmployeeProfile'; // Added import for Team component

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
          <Route path="/team" element={<Team />} />
          <Route path="/employees/:id" element={<EmployeeProfile />} /> {/* Added Team route */}
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
}