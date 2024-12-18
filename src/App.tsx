
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Organizations from './pages/Organizations';
import OrganizationDetails from './pages/OrganizationDetails';
import Login from './pages/Login';
import Settings from './pages/Settings';
import DashboardLayout from './components/layout/DashboardLayout';
import Users from './pages/Users';
import TimeAndAttendance from './pages/TimeAndAttendance';
import LeaveManagement from './pages/LeaveManagement';
import Performance from './pages/Performance';
import Training from './pages/Training';
import Documents from './pages/Documents';
import Reports from './pages/Reports';

export default function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="organizations" element={<Organizations />} />
        <Route path="organizations/:id" element={<OrganizationDetails />} />
        <Route path="users" element={<Users />} />
        <Route path="attendance" element={<TimeAndAttendance />} />
        <Route path="leave" element={<LeaveManagement />} />
        <Route path="performance/*" element={<Performance />} />
        <Route path="training" element={<Training />} />
        <Route path="documents" element={<Documents />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
