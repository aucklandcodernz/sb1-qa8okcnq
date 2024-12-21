import { Routes, Route, Navigate } from 'react-router-dom';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Recruitment from './pages/Recruitment';
import Safety from './pages/Safety';
import PayrollDashboard from './pages/payroll/PayrollDashboard';
import PayProcessing from './pages/payroll/PayProcessing';
import EmployeePay from './pages/payroll/EmployeePay';
import PayrollCompliance from './pages/payroll/PayrollCompliance';
import PayrollCalculators from './pages/payroll/PayrollCalculators';
import PayrollReports from './pages/payroll/PayrollReports';
import PayCalendar from './pages/payroll/PayCalendar';
import PayrollSettings from './pages/payroll/PayrollSettings';
import { Suspense } from 'react';
import Layout from './components/layout/Layout';
import LeaveManagement from './pages/LeaveManagement';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Organizations from './pages/Organizations';
import TimeAndAttendance from './pages/TimeAndAttendance';
import OrganizationDetails from './pages/OrganizationDetails';
import Payroll from './pages/Payroll';
import Performance from './pages/Performance';
import Training from './pages/Training';
import Documents from './pages/Documents';
import LoadingSpinner from './components/ui/LoadingSpinner';
import Team from './pages/Team';
import EmployeeProfile from './pages/EmployeeProfile'; 
import EditEmployeeForm from './components/employees/EditEmployeeForm';
import EmployeeDocuments from './pages/employee/EmployeeDocuments';
import EmployeeAttendance from './pages/employee/EmployeeAttendance';
import EmployeeQualifications from './pages/employee/EmployeeQualifications';
import EmployeeTraining from './pages/employee/EmployeeTraining'; // Import the EmployeeTraining component
import CreateEmployeeForm from './components/organizations/CreateEmployeeForm';
import OnboardingDashboard from './components/onboarding/OnboardingDashboard';

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
          <Route path="/organizations/:id/payroll/*" element={<Payroll />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<PayrollDashboard />} />
            <Route path="processing/*" element={<PayProcessing />} />
            <Route path="employees/*" element={<EmployeePay />} />
            <Route path="compliance/*" element={<PayrollCompliance />} />
            <Route path="calculators/*" element={<PayrollCalculators />} />
            <Route path="reports/*" element={<PayrollReports />} />
            <Route path="settings/*" element={<PayrollSettings />} />
          </Route>
          <Route path="/organizations/:id/recruitment/*" element={<Recruitment />} />
          <Route path="/organizations/:id/safety/*" element={<Safety />} />
          <Route path="/attendance" element={<TimeAndAttendance />} />
          <Route path="/leave" element={<LeaveManagement />} />
          <Route path="/team" element={<Team />} />
          <Route path="/employees/create" element={<CreateEmployeeForm organizationId="1" onSuccess={() => window.location.href = '/team'} />} />
          <Route path="/performance/*" element={<Performance />} />
          <Route path="/training" element={<Training />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/employees/:id/*" element={<EmployeeProfile />}>
            <Route path="documents" element={<EmployeeDocuments />} />
            <Route path="attendance" element={<EmployeeAttendance />} />
            <Route path="qualifications" element={<EmployeeQualifications />} />
            <Route path="training" element={<EmployeeTraining employeeId="emp1" />} />
            <Route path="onboarding" element={<OnboardingDashboard employeeId=":id" />} />
            <Route path="edit" element={<EditEmployeeForm />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
}