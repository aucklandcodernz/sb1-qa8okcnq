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
  
  const profile = id ? employeeProfiles[id] : null;

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