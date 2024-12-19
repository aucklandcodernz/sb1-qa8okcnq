
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Recruitment from './pages/Recruitment';
import Safety from './pages/Safety';
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
import EmployeeTraining from './pages/employee/EmployeeTraining';
import CreateEmployeeForm from './components/organizations/CreateEmployeeForm';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'organizations', element: <Organizations /> },
      { path: 'organizations/:id', element: <OrganizationDetails /> },
      { path: 'organizations/:id/payroll', element: <Payroll /> },
      { path: 'organizations/:id/recruitment', element: <Recruitment /> },
      { path: 'organizations/:id/safety', element: <Safety /> },
      { path: 'attendance', element: <TimeAndAttendance /> },
      { path: 'leave', element: <LeaveManagement /> },
      { path: 'team', element: <Team /> },
      { path: 'employees/create', element: <CreateEmployeeForm organizationId="1" onSuccess={() => window.location.href = '/team'} /> },
      { path: 'performance', element: <Performance /> },
      { path: 'training', element: <Training /> },
      { path: 'documents', element: <Documents /> },
      { path: 'reports', element: <Reports /> },
      { path: 'settings', element: <Settings /> },
      {
        path: 'employees/:id',
        element: <EmployeeProfile />,
        children: [
          { path: 'documents', element: <EmployeeDocuments /> },
          { path: 'attendance', element: <EmployeeAttendance /> },
          { path: 'qualifications', element: <EmployeeQualifications /> },
          { path: 'training', element: <EmployeeTraining employeeId="emp1" /> },
          { path: 'edit', element: <EditEmployeeForm /> }
        ]
      }
    ]
  }
]);

export default function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
