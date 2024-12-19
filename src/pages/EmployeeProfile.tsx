import React from 'react';
import { useParams, Outlet, Routes, Route, Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { employeeProfilesAtom } from '../lib/employees';
import { userAtom } from '../lib/auth';
import EmployeeProfileNav from '../components/employees/EmployeeProfileNav';
import EmployeeOverview from './employee/EmployeeOverview';
import EmployeeDocuments from './employee/EmployeeDocuments';
import EmployeeAgreements from './employee/EmployeeAgreements';
import EmployeeQualifications from './employee/EmployeeQualifications';
import EmployeeAttendance from './employee/EmployeeAttendance';
import LeaveManagementSection from '../components/leave/LeaveManagementSection';
import EmployeePayroll from './employee/EmployeePayroll';
import EmployeeTraining from './employee/EmployeeTraining';
import EmployeeVisa from './employee/EmployeeVisa';
import EditEmployeeForm from '../components/employees/EditEmployeeForm'; // Added import
import LoadingSpinner from '../components/ui/LoadingSpinner'; // Added import
import { ErrorBoundary } from '../components/layout/ErrorBoundary';

export default function EmployeeProfile() {
  return (
    <ErrorBoundary>
      <EmployeeProfileContent />
    </ErrorBoundary>
  );
}

function EmployeeProfileContent() {
  const { id } = useParams<{ id: string }>();
  const [employeeProfiles] = useAtom(employeeProfilesAtom);
  const [user] = useAtom(userAtom);
  const [onboardingTasks] = useAtom(onboardingChecklistsAtom);
  
  const profile = id ? employeeProfiles[id] : null;
  const employeeOnboarding = onboardingTasks.find(task => task.employeeId === id);

  if (!profile) {
    return <LoadingSpinner />;
  }

  // Check if user has access to this employee's profile
  const hasAccess = 
    user?.role === 'SUPER_ADMIN' ||
    (user?.organizationId === profile.organizationId &&
      ['ORG_ADMIN', 'HR_MANAGER'].includes(user?.role || '')) ||
    (user?.departmentId === profile.departmentId &&
      ['DEPT_MANAGER', 'SUPERVISOR'].includes(user?.role || '')) ||
    user?.id === profile.userId;

  if (!hasAccess) {
    return <Navigate to="/dashboard" replace />;
  }

  // Check if user has payroll access
  const hasPayrollAccess = ['SUPER_ADMIN', 'ORG_ADMIN', 'HR_MANAGER'].includes(user?.role || '');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Employee Profile</h2>
          <p className="mt-1 text-sm text-gray-500">View and manage employee information</p>
        </div>
        <span className={`px-3 py-1 text-sm rounded-full ${profile.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
          {profile.status}
        </span>
      </div>

      {employeeOnboarding && (
        <div className="mb-6 bg-blue-50 p-6 rounded-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-blue-900">Onboarding Status</h3>
            <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
              {employeeOnboarding.currentPhase}
            </span>
          </div>
          <div className="mt-4">
            <div className="flex items-center mb-2">
              <div className="w-full bg-blue-200 rounded-full h-2.5 mr-2">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${(employeeOnboarding.completedTasks / employeeOnboarding.totalTasks) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-blue-900">
                {Math.round((employeeOnboarding.completedTasks / employeeOnboarding.totalTasks) * 100)}%
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <span className="text-sm text-gray-500">Completed Tasks</span>
                <p className="text-2xl font-semibold text-blue-600">{employeeOnboarding.completedTasks}</p>
              </div>
              <div className="bg-white p-4 rounded-md shadow-sm">
                <span className="text-sm text-gray-500">Remaining Tasks</span>
                <p className="text-2xl font-semibold text-orange-600">
                  {employeeOnboarding.totalTasks - employeeOnboarding.completedTasks}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <EmployeeProfileNav employeeId={id} />
        
        <div className="p-6">
          <Routes>
            <Route index element={<EmployeeOverview profile={profile} />} />
            <Route path="edit" element={<EditEmployeeForm />} />
            <Route path="documents" element={<EmployeeDocuments profile={profile} />} />
            <Route path="agreements" element={<EmployeeAgreements employeeId={id} />} />
            <Route path="qualifications" element={<EmployeeQualifications profile={profile} />} />
            <Route path="training" element={<EmployeeTraining employeeId={id} />} />
            <Route path="attendance" element={<EmployeeAttendance employeeId={id} />} />
            <Route path="leave" element={<LeaveManagementSection employeeId={id} />} />
            <Route path="visa" element={<EmployeeVisa employeeId={id} />} />
            {hasPayrollAccess && (
              <Route path="payroll" element={<EmployeePayroll employeeId={id} />} />
            )}
            <Route path="*" element={<Navigate to={`/employees/${id}`} replace />} />
          </Routes>
          <Outlet />
        </div>
      </div>
    </div>
  );
}