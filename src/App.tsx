
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Organizations from './pages/Organizations';
import OrganizationDetails from './pages/OrganizationDetails';
import Payroll from './pages/Payroll';
import PayrollDashboard from './pages/payroll/PayrollDashboard';
import PayProcessing from './pages/payroll/PayProcessing';
import EmployeePay from './pages/payroll/EmployeePay';
import PayrollCalculators from './pages/payroll/PayrollCalculators';
import PayrollReports from './pages/payroll/PayrollReports';
import PayCalendar from './pages/payroll/PayCalendar';
import PayrollSettings from './pages/payroll/PayrollSettings';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/organizations/:id" element={<OrganizationDetails />} />
        <Route path="/organizations/:id/payroll/*" element={<Payroll />}>
          <Route index element={<PayrollDashboard />} />
          <Route path="processing" element={<PayProcessing />} />
          <Route path="employees" element={<EmployeePay />} />
          <Route path="calculators" element={<PayrollCalculators />} />
          <Route path="reports" element={<PayrollReports />} />
          <Route path="calendar" element={<PayCalendar />} />
          <Route path="settings" element={<PayrollSettings />} />
        </Route>
      </Route>
    </Routes>
  );
}
