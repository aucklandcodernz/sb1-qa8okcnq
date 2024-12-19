
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import Login from './pages/Login';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Organizations from './pages/Organizations';
import OrganizationDetails from './pages/OrganizationDetails';
import Payroll from './pages/Payroll';
import Recruitment from './pages/Recruitment';
import Safety from './pages/Safety';
import TimeAndAttendance from './pages/TimeAndAttendance';
import LeaveManagement from './pages/LeaveManagement';
import Team from './pages/Team';
import Performance from './pages/Performance';
import Training from './pages/Training';
import Documents from './pages/Documents';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import EmployeeProfile from './pages/EmployeeProfile';
import LoadingSpinner from './components/ui/LoadingSpinner';
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
      { path: 'employees/create', 
        element: <CreateEmployeeForm 
          organizationId="1" 
          onSuccess={() => window.location.href = '/team'} 
        /> 
      },
      { path: 'performance', element: <Performance /> },
      { path: 'training', element: <Training /> },
      { path: 'documents', element: <Documents /> },
      { path: 'reports', element: <Reports /> },
      { path: 'settings', element: <Settings /> },
      {
        path: 'employees/:id',
        element: <EmployeeProfile />,
        children: [
          { path: 'documents', element: <EmployeeProfile /> },
          { path: 'attendance', element: <EmployeeProfile /> },
          { path: 'qualifications', element: <EmployeeProfile /> },
          { path: 'training', element: <EmployeeProfile /> }
        ]
      }
    ]
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

export default function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
